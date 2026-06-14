import { create } from 'zustand';
import type { SimulatorState, Behavior, TimeSkipDuration, BrainTypeId } from '../types';
import {
  INITIAL_METRICS,
  INITIAL_TIME,
  DAY_TRANSITION_EFFECT,
  DAY_TRANSITION_META,
  TIME_SKIP_META,
} from '../config/modes';
import { getBrainTypeById } from '../config/brainTypes';
import {
  applyBehaviorEffect,
  evaluateMode,
  computeActualEffect,
  createLogEntry,
  applyDecay,
  advanceTime,
  calculateBehaviorEffect,
  isSleepTime,
} from '../engine/simulator';

interface SimulatorStore extends SimulatorState {
  applyBehavior: (behavior: Behavior) => void;
  nextDay: () => void;
  timeSkip: (hours: TimeSkipDuration) => void;
  reset: () => void;
  setBrainType: (brainTypeId: BrainTypeId) => void;
}

const createInitialState = (): SimulatorState => ({
  metrics: { ...INITIAL_METRICS },
  time: { ...INITIAL_TIME },
  logs: [],
  currentMode: evaluateMode(INITIAL_METRICS),
  brainTypeId: null,
});

function getSleepDecayBonus(currentHour: number, hours: number): Partial<{ dopamine: number; stress: number; attention: number; fatigue: number }> | null {
  const startHour = currentHour;
  const endHour = (currentHour + hours) % 24;
  let sleepHours = 0;

  for (let h = 0; h < hours; h++) {
    const checkHour = (startHour + h) % 24;
    if (isSleepTime(checkHour)) {
      sleepHours++;
    }
  }

  if (sleepHours >= 4) {
    const bonusFactor = Math.min(sleepHours / 8, 1);
    return {
      dopamine: 5 * bonusFactor,
      stress: -8 * bonusFactor,
      attention: 8 * bonusFactor,
      fatigue: -15 * bonusFactor,
    };
  }
  return null;
}

export const useSimulator = create<SimulatorStore>((set, get) => ({
  ...createInitialState(),

  setBrainType: (brainTypeId: BrainTypeId) =>
    set(() => {
      const brainType = getBrainTypeById(brainTypeId);
      const initialMetrics = brainType ? { ...brainType.initialMetrics } : { ...INITIAL_METRICS };
      return {
        brainTypeId,
        metrics: initialMetrics,
        time: { ...INITIAL_TIME },
        logs: [],
        currentMode: evaluateMode(initialMetrics),
      };
    }),

  applyBehavior: (behavior: Behavior) =>
    set((state) => {
      const brainType = getBrainTypeById(state.brainTypeId);
      const dynamicEffect = calculateBehaviorEffect(state.metrics, behavior, brainType);
      const metricsAfterBehavior = applyBehaviorEffect(state.metrics, dynamicEffect);

      const durationHours = behavior.durationHours ?? 1;
      const newTime = advanceTime(state.time, durationHours);
      const metricsAfterDecay = applyDecay(metricsAfterBehavior, durationHours, brainType);

      let finalMetrics = metricsAfterDecay;
      let finalEffect = computeActualEffect(state.metrics, finalMetrics, dynamicEffect);

      const sleepBonus = getSleepDecayBonus(state.time.hour, durationHours);
      if (sleepBonus && behavior.id === 'sleep') {
        finalMetrics = applyBehaviorEffect(finalMetrics, sleepBonus);
        finalEffect = computeActualEffect(state.metrics, finalMetrics, { ...dynamicEffect, ...sleepBonus });
      }

      const logEntry = createLogEntry(
        behavior.id,
        behavior.name,
        behavior.emoji,
        finalEffect,
        newTime.day,
        newTime.hour
      );

      return {
        time: newTime,
        metrics: finalMetrics,
        currentMode: evaluateMode(finalMetrics),
        logs: [logEntry, ...state.logs],
      };
    }),

  nextDay: () =>
    set((state) => {
      const brainType = getBrainTypeById(state.brainTypeId);
      const hoursToNextDay = 24 - state.time.hour;
      const newTime = advanceTime(state.time, hoursToNextDay);

      const metricsAfterDecay = applyDecay(state.metrics, hoursToNextDay, brainType);
      const metricsAfterTransition = applyBehaviorEffect(metricsAfterDecay, DAY_TRANSITION_EFFECT);

      const combinedEffect: typeof DAY_TRANSITION_EFFECT = {};
      for (const key of Object.keys(DAY_TRANSITION_EFFECT) as (keyof typeof DAY_TRANSITION_EFFECT)[]) {
        const decayDelta = metricsAfterDecay[key]! - state.metrics[key]!;
        const transitionDelta = metricsAfterTransition[key]! - metricsAfterDecay[key]!;
        combinedEffect[key] = decayDelta + transitionDelta;
      }

      const actualEffect = computeActualEffect(state.metrics, metricsAfterTransition, combinedEffect);

      const logEntry = createLogEntry(
        DAY_TRANSITION_META.id,
        DAY_TRANSITION_META.name,
        DAY_TRANSITION_META.emoji,
        actualEffect,
        newTime.day,
        newTime.hour,
        true
      );

      return {
        time: newTime,
        metrics: metricsAfterTransition,
        currentMode: evaluateMode(metricsAfterTransition),
        logs: [logEntry, ...state.logs],
      };
    }),

  timeSkip: (hours: TimeSkipDuration) =>
    set((state) => {
      const brainType = getBrainTypeById(state.brainTypeId);
      const newTime = advanceTime(state.time, hours);
      const metricsAfterDecay = applyDecay(state.metrics, hours, brainType);

      let finalMetrics = metricsAfterDecay;
      const decayEffect: Partial<typeof state.metrics> = {};
      for (const key of Object.keys(state.metrics) as (keyof typeof state.metrics)[]) {
        decayEffect[key] = finalMetrics[key] - state.metrics[key];
      }

      const sleepBonus = getSleepDecayBonus(state.time.hour, hours);
      if (sleepBonus) {
        finalMetrics = applyBehaviorEffect(finalMetrics, sleepBonus);
        for (const key of Object.keys(sleepBonus) as (keyof typeof sleepBonus)[]) {
          if (sleepBonus[key] !== undefined && decayEffect[key] !== undefined) {
            decayEffect[key] = (decayEffect[key] ?? 0) + sleepBonus[key]!;
          }
        }
      }

      const actualEffect = computeActualEffect(state.metrics, finalMetrics, decayEffect);

      const logEntry = createLogEntry(
        TIME_SKIP_META.id,
        `${TIME_SKIP_META.name} +${hours}h`,
        TIME_SKIP_META.emoji,
        actualEffect,
        newTime.day,
        newTime.hour,
        false,
        true,
        hours
      );

      return {
        time: newTime,
        metrics: finalMetrics,
        currentMode: evaluateMode(finalMetrics),
        logs: [logEntry, ...state.logs],
      };
    }),

  reset: () => {
    const currentBrainTypeId = get().brainTypeId;
    if (currentBrainTypeId) {
      const brainType = getBrainTypeById(currentBrainTypeId);
      const initialMetrics = brainType ? { ...brainType.initialMetrics } : { ...INITIAL_METRICS };
      set({
        metrics: initialMetrics,
        time: { ...INITIAL_TIME },
        logs: [],
        currentMode: evaluateMode(initialMetrics),
        brainTypeId: currentBrainTypeId,
      });
    } else {
      set(createInitialState());
    }
  },
}));
