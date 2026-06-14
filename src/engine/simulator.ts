import type { Metrics, Mode, LogEntry, MetricType, DecayConfigs, Behavior, DynamicEffect, TimeState, BrainType, BrainTypeModifier } from '../types';
import { MODES, DECAY_CONFIGS } from '../config/modes';
import { getBrainTypeById } from '../config/brainTypes';

const DEFAULT_MODIFIER: BrainTypeModifier = {
  dopamine: 1,
  stress: 1,
  attention: 1,
  fatigue: 1,
};

export function getBehaviorModifier(brainType: BrainType | null, behavior: Behavior): BrainTypeModifier {
  if (!brainType) return DEFAULT_MODIFIER;
  const behaviorSpecific = brainType.behaviorModifiers.behaviorMultipliers?.[behavior.id];
  if (behaviorSpecific) return behaviorSpecific;
  const categorySpecific = brainType.behaviorModifiers.categoryMultipliers?.[behavior.category];
  if (categorySpecific) return categorySpecific;
  return DEFAULT_MODIFIER;
}

export function applyBrainTypeModifier(
  baseEffect: Partial<Metrics>,
  modifier: BrainTypeModifier
): Partial<Metrics> {
  const result: Partial<Metrics> = {};
  for (const key of Object.keys(baseEffect) as MetricType[]) {
    const val = baseEffect[key];
    if (val !== undefined) {
      result[key] = val * modifier[key];
    }
  }
  return result;
}

export function getDecayMultipliers(brainType: BrainType | null): BrainTypeModifier {
  if (!brainType) return DEFAULT_MODIFIER;
  return brainType.decayMultipliers;
}

export function getEffectiveDecayConfigs(brainType: BrainType | null, baseConfigs: DecayConfigs = DECAY_CONFIGS): DecayConfigs {
  if (!brainType) return baseConfigs;
  const multipliers = brainType.decayMultipliers;
  const offsets = brainType.baselineOffsets;
  const result: DecayConfigs = { ...baseConfigs };
  for (const metric of ['dopamine', 'stress', 'attention', 'fatigue'] as MetricType[]) {
    result[metric] = {
      ...baseConfigs[metric],
      baseline: clamp(baseConfigs[metric].baseline + offsets[metric], baseConfigs[metric].min, baseConfigs[metric].max),
      ratePerHour: baseConfigs[metric].ratePerHour * multipliers[metric],
    };
  }
  return result;
}

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
  behavior: Behavior,
  brainType: BrainType | null = null
): Partial<Metrics> {
  const baseEffect: Partial<Metrics> = {};

  for (const key of Object.keys(behavior.effect) as MetricType[]) {
    const dynamicEffect = behavior.dynamicEffect?.[key];
    if (dynamicEffect) {
      baseEffect[key] = calculateDynamicEffect(currentMetrics, key, dynamicEffect);
    } else {
      baseEffect[key] = behavior.effect[key]!;
    }
  }

  const modifier = getBehaviorModifier(brainType, behavior);
  return applyBrainTypeModifier(baseEffect, modifier);
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
  decayConfigsOrBrainType: DecayConfigs | BrainType | null = DECAY_CONFIGS
): Metrics {
  let decayConfigs: DecayConfigs;
  if (decayConfigsOrBrainType && 'id' in decayConfigsOrBrainType && typeof decayConfigsOrBrainType.id === 'string') {
    decayConfigs = getEffectiveDecayConfigs(decayConfigsOrBrainType as BrainType);
  } else {
    decayConfigs = (decayConfigsOrBrainType as DecayConfigs) || DECAY_CONFIGS;
  }
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
