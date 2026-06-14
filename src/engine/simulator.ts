import type { Metrics, Mode, LogEntry, MetricType, DecayConfigs, Behavior, DynamicEffect, TimeState } from '../types';
import { MODES, DECAY_CONFIGS } from '../config/modes';

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateDynamicEffect(
  currentMetrics: Metrics,
  metric: MetricType,
  dynamicEffect: DynamicEffect
): number {
  switch (dynamicEffect.type) {
    case 'fixed':
      return dynamicEffect.base;

    case 'proportional': {
      const currentValue = currentMetrics[metric];
      const distance = dynamicEffect.factor! > 0
        ? 100 - currentValue
        : currentValue;
      return dynamicEffect.base + (distance * Math.abs(dynamicEffect.factor!)) * Math.sign(dynamicEffect.factor!);
    }

    case 'contextual': {
      if (dynamicEffect.condition && !dynamicEffect.condition(currentMetrics)) {
        return 0;
      }
      if (dynamicEffect.dependsOn) {
        const dependentValue = currentMetrics[dynamicEffect.dependsOn];
        return dynamicEffect.base + (dependentValue * (dynamicEffect.factor ?? 0.1));
      }
      return dynamicEffect.base;
    }

    default:
      return dynamicEffect.base;
  }
}

export function calculateBehaviorEffect(
  currentMetrics: Metrics,
  behavior: Behavior
): Partial<Metrics> {
  const effect: Partial<Metrics> = {};

  for (const key of Object.keys(behavior.effect) as MetricType[]) {
    const dynamicEffect = behavior.dynamicEffect?.[key];
    if (dynamicEffect) {
      effect[key] = calculateDynamicEffect(currentMetrics, key, dynamicEffect);
    } else {
      effect[key] = behavior.effect[key]!;
    }
  }

  return effect;
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

export function applyDecay(
  currentMetrics: Metrics,
  hoursElapsed: number,
  decayConfigs: DecayConfigs = DECAY_CONFIGS
): Metrics {
  const metrics: MetricType[] = ['dopamine', 'stress', 'attention', 'fatigue'];
  const result = { ...currentMetrics };

  for (const metric of metrics) {
    const config = decayConfigs[metric];
    const currentValue = currentMetrics[metric];
    const baseline = config.baseline;
    const rate = config.ratePerHour * hoursElapsed;

    let newValue: number;

    switch (config.direction) {
      case 'towards_baseline': {
        const distance = baseline - currentValue;
        const decayAmount = Math.sign(distance) * Math.min(Math.abs(distance), Math.abs(rate));
        newValue = currentValue + decayAmount;
        break;
      }

      case 'always_down': {
        newValue = currentValue - Math.abs(rate);
        break;
      }

      case 'always_up': {
        newValue = currentValue + Math.abs(rate);
        break;
      }

      default:
        newValue = currentValue;
    }

    result[metric] = clamp(newValue, config.min, config.max);
  }

  return result;
}

export function computeActualEffect(
  before: Metrics,
  after: Metrics,
  configuredEffect: Partial<Metrics>
): Partial<Metrics> {
  const actual: Partial<Metrics> = {};
  for (const key of Object.keys(configuredEffect) as MetricType[]) {
    const delta = after[key] - before[key];
    if (delta !== 0) {
      actual[key] = Math.round(delta * 10) / 10;
    }
  }
  return actual;
}

export function evaluateMode(metrics: Metrics, modes: Mode[] = MODES): Mode['id'] | null {
  for (const mode of modes) {
    if (mode.check(metrics)) {
      return mode.id;
    }
  }
  return null;
}

export function advanceTime(time: TimeState, hours: number): TimeState {
  const totalHours = time.totalHoursElapsed + hours;
  const newHour = (time.hour + hours) % 24;
  const dayIncrement = Math.floor((time.hour + hours) / 24);

  return {
    day: time.day + dayIncrement,
    hour: newHour,
    totalHoursElapsed: totalHours,
  };
}

export function createLogEntry(
  behaviorId: string,
  behaviorName: string,
  behaviorEmoji: string,
  actualEffect: Partial<Metrics>,
  day: number,
  hour: number,
  isDayTransition = false,
  isTimeSkip = false,
  timeSkipHours?: number
): LogEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    behaviorId,
    behaviorName,
    behaviorEmoji,
    effect: actualEffect,
    timestamp: Date.now(),
    day,
    hour,
    isDayTransition,
    isTimeSkip,
    timeSkipHours,
  };
}

export function isSleepTime(hour: number): boolean {
  return hour >= 22 || hour < 6;
}
