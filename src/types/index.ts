export type MetricType = 'dopamine' | 'stress' | 'attention' | 'fatigue';

export interface Metrics {
  dopamine: number;
  stress: number;
  attention: number;
  fatigue: number;
}

export type BehaviorCategory = 'entertainment' | 'growth' | 'physiology' | 'social';

export interface Behavior {
  id: string;
  name: string;
  emoji: string;
  category: BehaviorCategory;
  effect: Partial<Metrics>;
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
  isDayTransition?: boolean;
}

export interface SimulatorState {
  metrics: Metrics;
  day: number;
  logs: LogEntry[];
  currentMode: ModeId | null;
}

export type SimulatorAction =
  | { type: 'APPLY_BEHAVIOR'; behavior: Behavior }
  | { type: 'NEXT_DAY' }
  | { type: 'RESET' };

export interface MetricConfig {
  key: MetricType;
  name: string;
  emoji: string;
  gradient: string;
  description: string;
}
