import type { Behavior } from '../types';

export const BEHAVIORS: Behavior[] = [
  {
    id: 'scroll_videos',
    name: '刷短视频',
    emoji: '📱',
    category: 'entertainment',
    effect: { dopamine: 20, stress: 5, attention: -15, fatigue: 5 },
    description: '多巴胺↑ 注意力↓',
  },
  {
    id: 'study',
    name: '学习',
    emoji: '📚',
    category: 'growth',
    effect: { dopamine: 5, stress: 10, attention: 20, fatigue: 10 },
    description: '注意力↑ 压力↑',
  },
  {
    id: 'exercise',
    name: '运动',
    emoji: '🏃',
    category: 'physiology',
    effect: { dopamine: 10, stress: -5, attention: 10, fatigue: 15 },
    description: '多巴胺↑ 压力↓',
  },
  {
    id: 'coffee',
    name: '喝咖啡',
    emoji: '☕',
    category: 'physiology',
    effect: { dopamine: 5, stress: 15, attention: 15, fatigue: -10 },
    description: '注意力↑ 疲劳↓',
  },
  {
    id: 'sleep',
    name: '睡觉',
    emoji: '😴',
    category: 'physiology',
    effect: { dopamine: -5, stress: -15, attention: 10, fatigue: -25 },
    description: '疲劳↓↓ 压力↓',
  },
  {
    id: 'stay_up',
    name: '熬夜',
    emoji: '🌙',
    category: 'physiology',
    effect: { dopamine: 10, stress: 20, attention: -20, fatigue: 20 },
    description: '疲劳↑↑ 压力↑',
  },
  {
    id: 'gaming',
    name: '打游戏',
    emoji: '🎮',
    category: 'entertainment',
    effect: { dopamine: 25, stress: 10, attention: -5, fatigue: 10 },
    description: '多巴胺↑↑',
  },
  {
    id: 'socialize',
    name: '社交',
    emoji: '👥',
    category: 'social',
    effect: { dopamine: 15, stress: -10, attention: 5, fatigue: 5 },
    description: '多巴胺↑ 压力↓',
  },
];

export const CATEGORY_LABELS: Record<Behavior['category'], string> = {
  entertainment: '娱乐',
  growth: '成长',
  physiology: '生理',
  social: '社交',
};
