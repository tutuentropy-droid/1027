import { create } from 'zustand';
import type { SimulatorState, Behavior } from '../types';
import { INITIAL_METRICS } from '../config/modes';
import { applyBehaviorEffect, evaluateMode, createLogEntry } from '../engine/simulator';

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
      const logEntry = createLogEntry(behavior, state.day);
      return {
        metrics: newMetrics,
        currentMode: evaluateMode(newMetrics),
        logs: [logEntry, ...state.logs],
      };
    }),

  nextDay: () =>
    set((state) => ({
      day: state.day + 1,
    })),

  reset: () => set(createInitialState()),
}));
