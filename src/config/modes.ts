import type { Mode, Metrics, MetricConfig, DecayConfigs, TimeState } from '../types';

export const MODES: Mode[] = [
  {
    id: 'fatigue',
    name: '疲劳模式',
    emoji: '😵',
    description: '身心俱疲，急需休息恢复。此时效率低下，建议睡觉或放松。',
    color: '#78716c',
    check: (m: Metrics) => m.fatigue >= 70,
  },
  {
    id: 'anxiety',
    name: '焦虑模式',
    emoji: '😰',
    description: '压力过大，皮质醇水平过高。建议运动、社交或休息来缓解。',
    color: '#ef4444',
    check: (m: Metrics) => m.stress >= 75,
  },
  {
    id: 'reward_dependency',
    name: '奖励依赖模式',
    emoji: '🎰',
    description: '多巴胺飙升但注意力涣散，沉迷即时奖励难以专注。警惕成瘾！',
    color: '#ec4899',
    check: (m: Metrics) => m.dopamine >= 80 && m.attention <= 40,
  },
  {
    id: 'focus',
    name: '专注模式',
    emoji: '🎯',
    description: '注意力高度集中，疲劳和压力适中。这是最佳工作学习状态！',
    color: '#10b981',
    check: (m: Metrics) => m.attention >= 70 && m.fatigue <= 50 && m.stress <= 60,
  },
  {
    id: 'low',
    name: '低迷模式',
    emoji: '😔',
    description: '多巴胺低落，注意力涣散。需要运动、社交或咖啡来激活状态。',
    color: '#64748b',
    check: (m: Metrics) => m.dopamine <= 25 && m.attention <= 40,
  },
  {
    id: 'balance',
    name: '平衡模式',
    emoji: '🧘',
    description: '各项指标处于健康范围，身心状态稳定。继续保持良好节奏！',
    color: '#7c3aed',
    check: (m: Metrics) =>
      m.dopamine >= 30 && m.dopamine <= 70 &&
      m.stress >= 30 && m.stress <= 70 &&
      m.attention >= 30 && m.attention <= 70 &&
      m.fatigue >= 30 && m.fatigue <= 70,
  },
];

export const METRIC_CONFIGS: MetricConfig[] = [
  {
    key: 'dopamine',
    name: '多巴胺',
    emoji: '🧠',
    gradient: 'from-pink-500 to-purple-500',
    description: '奖励与愉悦感',
  },
  {
    key: 'stress',
    name: '压力值',
    emoji: '💢',
    gradient: 'from-orange-500 to-red-500',
    description: '皮质醇水平',
  },
  {
    key: 'attention',
    name: '注意力',
    emoji: '✨',
    gradient: 'from-emerald-500 to-cyan-500',
    description: '专注能力',
  },
  {
    key: 'fatigue',
    name: '疲劳值',
    emoji: '⚡',
    gradient: 'from-yellow-500 to-stone-500',
    description: '身心疲惫程度',
  },
];

export const INITIAL_METRICS: Metrics = {
  dopamine: 50,
  stress: 50,
  attention: 50,
  fatigue: 50,
};

export const INITIAL_TIME: TimeState = {
  day: 1,
  hour: 8,
  totalHoursElapsed: 0,
};

export const DECAY_CONFIGS: DecayConfigs = {
  dopamine: {
    baseline: 50,
    ratePerHour: 3,
    min: 10,
    max: 95,
    direction: 'towards_baseline',
  },
  stress: {
    baseline: 40,
    ratePerHour: 2,
    min: 15,
    max: 95,
    direction: 'towards_baseline',
  },
  attention: {
    baseline: 50,
    ratePerHour: 1.5,
    min: 10,
    max: 95,
    direction: 'towards_baseline',
  },
  fatigue: {
    baseline: 50,
    ratePerHour: 1,
    min: 5,
    max: 98,
    direction: 'towards_baseline',
  },
};

export function getModeById(id: Mode['id'] | null): Mode | null {
  if (!id) return null;
  return MODES.find((m) => m.id === id) ?? null;
}

export const DAY_TRANSITION_EFFECT: Partial<Metrics> = {
  dopamine: -15,
  stress: -10,
  attention: 15,
  fatigue: -20,
};

export const DAY_TRANSITION_META = {
  id: '__day_transition__',
  name: '新的一天',
  emoji: '🌅',
} as const;

export const TIME_SKIP_META = {
  id: '__time_skip__',
  name: '时间流逝',
  emoji: '⏳',
} as const;
