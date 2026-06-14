import type { Metrics, Mode, LogEntry, Behavior } from '../types';
import { MODES } from '../config/modes';

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function applyBehaviorEffect(
  currentMetrics: Metrics,
  effect: Partial<Metrics>
): Metrics {
  return {
    dopamine: clamp(currentMetrics.dopamine + (effect.dopamine ?? 0)),
    stress: clamp(currentMetrics.stress + (effect.stress ?? 0)),
    attention: clamp(currentMetrics.attention + (effect.attention ?? 0)),
    fatigue: clamp(currentMetrics.fatigue + (effect.fatigue ?? 0)),
  };
}

export function evaluateMode(metrics: Metrics, modes: Mode[] = MODES): Mode['id'] | null {
  for (const mode of modes) {
    if (mode.check(metrics)) {
      return mode.id;
    }
  }
  return null;
}

export function createLogEntry(behavior: Behavior, day: number): LogEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    behaviorId: behavior.id,
    behaviorName: behavior.name,
    behaviorEmoji: behavior.emoji,
    effect: { ...behavior.effect },
    timestamp: Date.now(),
    day,
  };
}
