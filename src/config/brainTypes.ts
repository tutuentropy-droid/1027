import type { BrainType, BrainTypeId } from '../types';

export const BRAIN_TYPES: BrainType[] = [
  {
    id: 'adhd',
    name: '注意力缺陷倾向',
    shortName: 'ADHD 型',
    emoji: '🦋',
    tagline: '多巴胺猎人，注意力如风',
    color: '#f59e0b',
    description:
      '你的多巴胺基线较低，需要更多刺激才能获得满足感。短视频和游戏能给你带来强烈的奖励快感，但注意力的维持时间明显短于常人，容易陷入"寻求刺激→崩溃→再寻求"的循环。',
    initialMetrics: {
      dopamine: 38,
      stress: 45,
      attention: 35,
      fatigue: 45,
    },
    baselineOffsets: {
      dopamine: -12,
      stress: 0,
      attention: -15,
      fatigue: 0,
    },
    decayMultipliers: {
      dopamine: 1.6,
      stress: 1.0,
      attention: 2.2,
      fatigue: 1.1,
    },
    behaviorModifiers: {
      categoryMultipliers: {
        entertainment: { dopamine: 1.7, stress: 1.0, attention: 1.9, fatigue: 1.2 },
        growth: { dopamine: 0.6, stress: 1.3, attention: 0.5, fatigue: 1.4 },
      },
      behaviorMultipliers: {
        scroll_videos: { dopamine: 1.9, stress: 1.0, attention: 2.0, fatigue: 1.3 },
        gaming: { dopamine: 1.8, stress: 1.1, attention: 1.7, fatigue: 1.3 },
        study: { dopamine: 0.5, stress: 1.5, attention: 0.4, fatigue: 1.5 },
        coffee: { dopamine: 1.5, stress: 1.3, attention: 1.4, fatigue: 0.8 },
      },
    },
    traits: [
      '多巴胺基线偏低，需要更高刺激',
      '注意力衰减速率约为常人 2.2 倍',
      '娱乐类行为奖励感更强但代价更大',
      '学习和深度工作需要更强意志力',
    ],
    neuroporcelain: {
      dopamineSystem: '中脑边缘通路多巴胺受体密度偏低（DRD4 7R 型），奖励阈值高，对新颖刺激反应强烈。',
      attentionNetwork: '背外侧前额叶皮层（DLPFC）唤醒水平不足，默认模式网络（DMN）过度活跃，注意力切换频繁。',
      stressAxis: '下丘脑-垂体-肾上腺轴（HPA 轴）基础活性正常，但在无聊状态下易触发应激反应。',
      controlCircuit: '前扣带回皮层（ACC）冲突监测功能偏弱，抑制控制能力低于平均水平。',
    },
  },
  {
    id: 'anxiety',
    name: '焦虑型',
    shortName: '焦虑型',
    emoji: '🦉',
    tagline: '高警觉性大脑，压力如影随形',
    color: '#ef4444',
    description:
      '你的杏仁核活跃度较高，对威胁信号异常敏感。压力基线高于常人，容易进入焦虑状态。社交和学习行为带来额外的压力负担，但也因此更有危机感和责任心。睡眠质量受压力影响显著。',
    initialMetrics: {
      dopamine: 45,
      stress: 68,
      attention: 52,
      fatigue: 55,
    },
    baselineOffsets: {
      dopamine: -5,
      stress: +25,
      attention: +2,
      fatigue: +8,
    },
    decayMultipliers: {
      dopamine: 1.2,
      stress: 0.6,
      attention: 1.3,
      fatigue: 1.3,
    },
    behaviorModifiers: {
      categoryMultipliers: {
        social: { dopamine: 0.7, stress: 1.8, attention: 1.0, fatigue: 1.5 },
        growth: { dopamine: 0.8, stress: 1.7, attention: 1.2, fatigue: 1.4 },
        physiology: { dopamine: 1.0, stress: 0.7, attention: 1.0, fatigue: 1.2 },
      },
      behaviorMultipliers: {
        study: { dopamine: 0.7, stress: 1.9, attention: 1.1, fatigue: 1.5 },
        socialize: { dopamine: 0.6, stress: 2.0, attention: 1.0, fatigue: 1.6 },
        sleep: { dopamine: 1.0, stress: 0.5, attention: 0.8, fatigue: 0.7 },
        exercise: { dopamine: 1.4, stress: 1.5, attention: 1.2, fatigue: 1.3 },
        stay_up: { dopamine: 0.9, stress: 1.7, attention: 1.2, fatigue: 1.4 },
      },
    },
    traits: [
      '压力基线显著偏高（+25）',
      '压力衰减缓慢，不易放松',
      '社交和学习会显著加剧焦虑',
      '运动和睡眠的减压效果打折扣',
    ],
    neuroporcelain: {
      dopamineSystem: '多巴胺转运体（DAT）表达正常，但前额叶 GABA 能抑制不足，导致多巴胺信号易被焦虑干扰。',
      attentionNetwork: '杏仁核过度激活，对情绪性刺激优先加工，丘脑-皮层通路警觉性上调。',
      stressAxis: 'HPA 轴负反馈敏感性降低，皮质醇基础水平高且清除缓慢，蓝斑核去甲肾上腺素持续释放。',
      controlCircuit: '腹内侧前额叶皮层（vmPFC）对杏仁核调控减弱，安全信号识别困难，威胁泛化。',
    },
  },
  {
    id: 'high_control',
    name: '高自控型',
    shortName: '高自控型',
    emoji: '🦅',
    tagline: '前额叶掌权，延迟满足大师',
    color: '#10b981',
    description:
      '你的前额叶皮层功能强大，具备出色的延迟满足和冲动抑制能力。学习和工作的注意力回报率高，疲劳积累较慢。缺点是娱乐活动带来的快感相对平淡，容易陷入"高效但不快乐"的状态。',
    initialMetrics: {
      dopamine: 48,
      stress: 42,
      attention: 62,
      fatigue: 40,
    },
    baselineOffsets: {
      dopamine: -2,
      stress: -8,
      attention: +12,
      fatigue: -10,
    },
    decayMultipliers: {
      dopamine: 0.9,
      stress: 1.1,
      attention: 0.6,
      fatigue: 0.7,
    },
    behaviorModifiers: {
      categoryMultipliers: {
        growth: { dopamine: 1.6, stress: 0.7, attention: 1.5, fatigue: 0.6 },
        entertainment: { dopamine: 0.6, stress: 1.0, attention: 0.7, fatigue: 1.0 },
      },
      behaviorMultipliers: {
        study: { dopamine: 1.8, stress: 0.6, attention: 1.8, fatigue: 0.5 },
        scroll_videos: { dopamine: 0.5, stress: 1.2, attention: 0.6, fatigue: 1.0 },
        gaming: { dopamine: 0.55, stress: 1.0, attention: 0.65, fatigue: 1.0 },
        exercise: { dopamine: 1.3, stress: 1.3, attention: 1.2, fatigue: 0.8 },
        sleep: { dopamine: 1.1, stress: 1.4, attention: 1.3, fatigue: 1.4 },
      },
    },
    traits: [
      '注意力衰减极慢，专注状态稳定',
      '成长类行为效率高、代价低',
      '娱乐行为奖励感钝化，不易成瘾',
      '疲劳累积速率低于常人',
    ],
    neuroporcelain: {
      dopamineSystem: '多巴胺 D2 受体密度高，前额叶多巴胺信号清晰，纹状体对即时奖励反应温和。',
      attentionNetwork: '额顶叶控制网络（FPN）连接强，默认模式网络抑制良好，持续注意力佳。',
      stressAxis: 'HPA 轴反馈调节灵敏，皮质醇唤醒反应（CAR）精准，压力源清除效率高。',
      controlCircuit: '前额叶皮层灰质体积较大，腹侧被盖区-伏隔核通路调控能力强，延迟满足优势显著。',
    },
  },
  {
    id: 'dopamine_sensitive',
    name: '多巴胺敏感型',
    shortName: '敏感型',
    emoji: '🌸',
    tagline: '奖励系统敏锐，点滴即是幸福',
    color: '#ec4899',
    description:
      '你的多巴胺受体敏感度高，微小的快乐也能带来强烈的满足感。社交、咖啡、运动的愉悦感被放大，但同时也更容易在刷短视频和游戏时快速进入奖励依赖状态，多巴胺飙升后容易陷入低迷。',
    initialMetrics: {
      dopamine: 55,
      stress: 40,
      attention: 48,
      fatigue: 42,
    },
    baselineOffsets: {
      dopamine: +5,
      stress: -10,
      attention: -2,
      fatigue: -8,
    },
    decayMultipliers: {
      dopamine: 1.5,
      stress: 1.3,
      attention: 1.2,
      fatigue: 1.0,
    },
    behaviorModifiers: {
      categoryMultipliers: {
        social: { dopamine: 1.7, stress: 1.5, attention: 1.2, fatigue: 1.1 },
        entertainment: { dopamine: 1.5, stress: 1.4, attention: 1.4, fatigue: 1.2 },
        physiology: { dopamine: 1.5, stress: 1.3, attention: 1.2, fatigue: 1.2 },
      },
      behaviorMultipliers: {
        scroll_videos: { dopamine: 1.6, stress: 1.3, attention: 1.5, fatigue: 1.1 },
        gaming: { dopamine: 1.7, stress: 1.5, attention: 1.4, fatigue: 1.3 },
        socialize: { dopamine: 1.8, stress: 0.5, attention: 1.3, fatigue: 1.0 },
        coffee: { dopamine: 1.7, stress: 1.8, attention: 1.5, fatigue: 1.4 },
        exercise: { dopamine: 1.6, stress: 1.5, attention: 1.3, fatigue: 1.2 },
      },
    },
    traits: [
      '多巴胺基线偏高（+5）',
      '几乎所有行为的奖励感都被放大',
      '多巴胺波动剧烈，快乐后易低迷',
      '社交和咖啡的愉悦感尤其强烈',
    ],
    neuroporcelain: {
      dopamineSystem: 'DRD4 受体多态性导致突触间隙多巴胺清除较慢，伏隔核神经元对奖励刺激兴奋性高。',
      attentionNetwork: '岛叶皮层内感性敏锐，对躯体感受放大，情绪色彩渲染显著。',
      stressAxis: '杏仁核-前额叶通路情绪传导增强，正性反馈易扩大化，负性反馈也易扩大。',
      controlCircuit: '眶额叶皮层（OFC）价值评估功能敏感，微小奖惩差异即可触发决策偏向。',
    },
  },
];

export function getBrainTypeById(id: BrainTypeId | null): BrainType | null {
  if (!id) return null;
  return BRAIN_TYPES.find((b) => b.id === id) ?? null;
}
