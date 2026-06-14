import { create } from 'zustand';
import type { SimulatorState, Behavior } from '../types';
import { INITIAL_METRICS, DAY_TRANSITION_EFFECT, DAY_TRANSITION_META } from '../config/modes';
import {
  applyBehaviorEffect,
  evaluateMode,
  computeActualEffect,
  createLogEntry,
} from '../engine/simulator';

interface SimulatorStore extends SimulatorState {
  applyBehavior: (behavior: Behavior) => void;
  nextDay: () => void;
  reset: () => void;
}

const createInitialState = (): SimulatorState => ({
  metrics: { ...INITIAL_METRICS },
  day: 1,
  logs: [],
  currentMode: evaluateMode(INITIAL_METRICS),
});

export const useSimulator = create<SimulatorStore>((set) => ({
  ...createInitialState(),

  applyBehavior: (behavior: Behavior) =>
    set((state) => {
      const newMetrics = applyBehaviorEffect(state.metrics, behavior.effect);
      const actualEffect = computeActualEffect(state.metrics, newMetrics, behavior.effect);
      const logEntry = createLogEntry(
        behavior.id,
        behavior.name,
        behavior.emoji,
        actualEffect,
        state.day
      );
      return {
        metrics: newMetrics,
        currentMode: evaluateMode(newMetrics),
        logs: [logEntry, ...state.logs],
      };
    }),

  nextDay: () =>
    set((state) => {
      const newMetrics = applyBehaviorEffect(state.metrics, DAY_TRANSITION_EFFECT);
      const actualEffect = computeActualEffect(state.metrics, newMetrics, DAY_TRANSITION_EFFECT);
      const nextDayNum = state.day + 1;
      const logEntry = createLogEntry(
        DAY_TRANSITION_META.id,
        DAY_TRANSITION_META.name,
        DAY_TRANSITION_META.emoji,
        actualEffect,
        nextDayNum,
        true
      );
      return {
        day: nextDayNum,
        metrics: newMetrics,
        currentMode: evaluateMode(newMetrics),
        logs: [logEntry, ...state.logs],
      };
    }),

  reset: () => set(createInitialState()),
}));
