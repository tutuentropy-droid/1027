export type MetricType = 'dopamine' | 'stress' | 'attention' | 'fatigue';

export interface Metrics {
  dopamine: number;
  stress: number;
  attention: number;
  fatigue: number;
}

export interface DecayConfig {
  baseline: number;
  ratePerHour: number;
  min: number;
  max: number;
  direction: 'towards_baseline' | 'always_down' | 'always_up';
}

export interface DecayConfigs {
  dopamine: DecayConfig;
  stress: DecayConfig;
  attention: DecayConfig;
  fatigue: DecayConfig;
}

export type BehaviorCategory = 'entertainment' | 'growth' | 'physiology' | 'social';

export interface DynamicEffect {
  type: 'fixed' | 'proportional' | 'contextual';
  base: number;
  factor?: number;
  dependsOn?: MetricType;
  condition?: (metrics: Metrics) => boolean;
}

export interface Behavior {
  id: string;
  name: string;
  emoji: string;
  category: BehaviorCategory;
  effect: Partial<Metrics>;
  dynamicEffect?: Partial<Record<MetricType, DynamicEffect>>;
  durationHours?: number;
  description: string;
}

export type ModeId = 'focus' | 'fatigue' | 'reward_dependency' | 'anxiety' | 'balance' | 'low';

export interface Mode {
  id: ModeId;
  name: string;
  emoji: string;
  description: string;
  color: string;
  check: (metrics: Metrics) => boolean;
}

export interface LogEntry {
  id: string;
  behaviorId: string;
  behaviorName: string;
  behaviorEmoji: string;
  effect: Partial<Metrics>;
  timestamp: number;
  day: number;
  hour: number;
  isDayTransition?: boolean;
  isTimeSkip?: boolean;
  timeSkipHours?: number;
}

export interface TimeState {
  day: number;
  hour: number;
  totalHoursElapsed: number;
}

export interface SimulatorState {
  metrics: Metrics;
  time: TimeState;
  logs: LogEntry[];
  currentMode: ModeId | null;
}

export type TimeSkipDuration = 1 | 6 | 24;

export type SimulatorAction =
  | { type: 'APPLY_BEHAVIOR'; behavior: Behavior }
  | { type: 'NEXT_DAY' }
  | { type: 'TIME_SKIP'; hours: TimeSkipDuration }
  | { type: 'TICK'; hours: number }
  | { type: 'RESET' };

export interface MetricConfig {
  key: MetricType;
  name: string;
  emoji: string;
  gradient: string;
  description: string;
}
