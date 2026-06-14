export type EncyclopediaTopic =
  | 'reward_system'
  | 'attention_mechanism'
  | 'memory_formation'
  | 'addiction_mechanism'
  | 'sleep_neuroscience'
  | 'stress_mechanism';

export type EntryType = 'neurotransmitter' | 'brain_region' | 'system' | 'concept';

export interface EncyclopediaEntry {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  type: EntryType;
  topics: EncyclopediaTopic[];
  color: string;
  summary: string;
  function: string;
  mechanism: string;
  clinical: string;
  funFacts: string[];
  relatedIds: string[];
}

export const TOPIC_META: Record<
  EncyclopediaTopic,
  { name: string; emoji: string; description: string; color: string }
> = {
  reward_system: {
    name: '奖励系统',
    emoji: '🎁',
    description: '大脑如何感知、预测和寻求奖励的神经回路',
    color: '#ec4899',
  },
  attention_mechanism: {
    name: '注意力机制',
    emoji: '🎯',
    description: '我们如何选择性地关注信息、过滤干扰的神经基础',
    color: '#10b981',
  },
  memory_formation: {
    name: '记忆形成',
    emoji: '📚',
    description: '从短期记忆到长期记忆的巩固过程与关键脑区',
    color: '#8b5cf6',
  },
  addiction_mechanism: {
    name: '成瘾机制',
    emoji: '⚠️',
    description: '从滥用、依赖到成瘾的神经可塑性变化',
    color: '#ef4444',
  },
  sleep_neuroscience: {
    name: '睡眠神经学',
    emoji: '🌙',
    description: '睡眠周期、脑内清除系统与记忆巩固的奥秘',
    color: '#3b82f6',
  },
  stress_mechanism: {
    name: '压力机制',
    emoji: '⚡',
    description: 'HPA 轴、皮质醇与情绪反应的神经基础',
    color: '#f97316',
  },
};

export const ENCYCLOPEDIA_ENTRIES: EncyclopediaEntry[] = [
  {
    id: 'dopamine',
    title: '多巴胺',
    subtitle: 'Dopamine · C₈H₁₁NO₂',
    emoji: '🧠',
    type: 'neurotransmitter',
    topics: ['reward_system', 'addiction_mechanism', 'attention_mechanism'],
    color: '#ec4899',
    summary:
      '多巴胺是大脑中最重要的儿茶酚胺类神经递质之一，常被误解为"快乐分子"，但它真正的角色是驱动动机、预测奖励和强化学习。',
    function:
      '多巴胺主要由中脑腹侧被盖区（VTA）和黑质致密部（SNc）的多巴胺能神经元合成，通过四条主要通路投射到大脑不同区域：中脑边缘通路（奖励与动机）、中脑皮层通路（认知控制与决策）、黑质纹状体通路（运动控制）、结节漏斗通路（内分泌调节）。',
    mechanism:
      '当大脑预测到即将获得奖励时，VTA 多巴胺神经元会产生短暂的放电增加（正预测误差）；如果实际奖励低于预期，则放电受到抑制（负预测误差）。这种信号编码方式被称为「奖励预测误差」（Reward Prediction Error），是强化学习的核心神经机制。多巴胺通过与 D1 类（D1、D5）和 D2 类（D2、D3、D4）受体结合，分别产生兴奋性和抑制性效应。',
    clinical:
      '多巴胺功能失调与多种精神疾病密切相关：中脑边缘通路多巴胺过度活跃被认为是精神分裂症阳性症状的基础；黑质多巴胺能神经元进行性退变导致帕金森病；中脑皮层通路多巴胺不足与抑郁症的快感缺失、动机缺乏直接相关。此外，几乎所有成瘾物质都会直接或间接升高伏隔核的多巴胺浓度。',
    funFacts: [
      '多巴胺不是"快乐分子"，而是"想要分子"——它驱动你去追求，而不是让你在得到后感到满足。',
      '音乐引起的"寒战"（frisson）与纹状体多巴胺释放峰值精确对应。',
      '帕金森病患者服用左旋多巴后，部分人会出现冲动控制障碍（如病理性赌博），这是多巴胺过量的典型表现。',
    ],
    relatedIds: ['vta', 'nucleus_accumbens', 'reward_prediction_error', 'addiction_neuroadaptation'],
  },
  {
    id: 'cortisol',
    title: '皮质醇',
    subtitle: 'Cortisol · 压力激素',
    emoji: '💢',
    type: 'neurotransmitter',
    topics: ['stress_mechanism', 'sleep_neuroscience', 'memory_formation'],
    color: '#ef4444',
    summary:
      '皮质醇是肾上腺皮质分泌的主要糖皮质激素，被称为"压力激素"。它调节新陈代谢、免疫反应和记忆功能，短期有益但长期有害。',
    function:
      '皮质醇的释放由下丘脑-垂体-肾上腺轴（HPA 轴）调控：下丘脑释放 CRH → 垂体分泌 ACTH → 肾上腺合成皮质醇。正常情况下皮质醇呈昼夜节律，早晨 6-8 点达到峰值（皮质醇觉醒反应 CAR），午夜降至最低点。',
    mechanism:
      '皮质醇通过穿透血脑屏障与大脑中的糖皮质激素受体（GR）和盐皮质激素受体（MR）结合。海马体含有大脑中最高密度的 GR，因此对皮质醇极为敏感。适度皮质醇增强杏仁核的警觉信号并促进海马体记忆巩固；但过高水平会导致海马神经元树突萎缩、抑制神经发生，并损害前额叶皮层的工作记忆。',
    clinical:
      '长期慢性压力导致的皮质醇升高与众多疾病相关：包括海马体体积缩小、前额叶皮层变薄、抑郁症、焦虑障碍、代谢综合征、免疫抑制、心血管疾病等。有趣的是，长期压力还会导致皮质醇节律变平（早晨峰值下降），这被称为 HPA 轴功能紊乱。',
    funFacts: [
      '拥抱可以降低皮质醇——催产素会抑制 HPA 轴的活性。',
      '早晨的 Cortisol Awakening Response（CAR）会让你在闹钟响起后 30-60 分钟皮质醇飙升 50-75%。',
      '有记录的最长冥想者，其基线皮质醇水平比对照组低 20-30%。',
    ],
    relatedIds: ['hpa_axis', 'hippocampus', 'amygdala', 'prefrontal_cortex'],
  },
  {
    id: 'prefrontal_cortex',
    title: '前额叶皮层',
    subtitle: 'Prefrontal Cortex (PFC)',
    emoji: '🧭',
    type: 'brain_region',
    topics: ['attention_mechanism', 'memory_formation', 'addiction_mechanism'],
    color: '#6366f1',
    summary:
      '前额叶皮层位于大脑额叶最前端，是人类演化中最晚发育、个体发育中最晚成熟的脑区，负责执行功能：决策、计划、冲动控制、工作记忆和社会行为。',
    function:
      '前额叶皮层可细分为多个功能亚区：背外侧前额叶（DLPFC）负责工作记忆和认知灵活性；腹内侧前额叶（vmPFC）参与价值评估和情感决策；眶额皮层（OFC）编码期望结果的价值并反转学习；前扣带回（ACC）监测冲突和错误信号。前额叶通过与顶叶形成额顶叶控制网络来调控注意力。',
    mechanism:
      '前额叶皮层的功能高度依赖多巴胺的精细调节——所谓的「倒 U 型曲线」：多巴胺 D1 受体激活过低或过高都会损害工作记忆，只有在中等浓度时表现最佳。5-羟色胺和去甲肾上腺素也通过不同受体亚型对前额叶功能进行调节。前额叶通过自上而下的投射抑制杏仁核和伏隔核的过度活跃，实现情绪和冲动的调控。',
    clinical:
      '前额叶功能低下与 ADHD（背外侧通路多巴胺不足）、精神分裂症（前额叶皮层活动减退，即「hypofrontality」）、抑郁症（vmPFC 和 ACC 活动异常）、成瘾（眶额皮层价值评估系统紊乱，对药物线索过度估值）、反社会人格障碍（腹内侧前额叶损伤导致决策异常）等多种精神障碍相关。',
    funFacts: [
      '前额叶皮层要到 25 岁左右才完全髓鞘化成熟——这就是为什么青少年更容易做出冲动决定。',
      '著名的菲尼亚斯·盖奇案例：一根铁棒穿透了他的前额叶，他的智力完好但人格剧变——从谦和友善变得冲动粗俗。',
      '神经科学家用「抑制控制任务」（如 Stroop 任务和 Go/No-Go 任务）来客观测量前额叶的功能。',
    ],
    relatedIds: ['dopamine', 'attention_network', 'amygdala', 'addiction_neuroadaptation'],
  },
  {
    id: 'hippocampus',
    title: '海马体',
    subtitle: 'Hippocampus · 记忆之门',
    emoji: '🐚',
    type: 'brain_region',
    topics: ['memory_formation', 'sleep_neuroscience', 'stress_mechanism'],
    color: '#8b5cf6',
    summary:
      '海马体因形似海马而得名，是内侧颞叶的核心结构，被誉为「大脑的记忆搜索引擎」——负责将短期记忆巩固为长期记忆，并支持空间导航。',
    function:
      '海马体由 CA1、CA2、CA3、齿状回（DG）等亚区组成，是著名的「三突触回路」所在地：内嗅皮层 → 齿状回（穿通通路）→ CA3（苔状纤维）→ CA1（Schaffer 侧支）→ 内嗅皮层。海马体与新皮层之间通过「对话」实现记忆的长期巩固。',
    mechanism:
      '记忆形成的核心机制是长时程增强（LTP）：高频刺激突触后神经元，NMDA 受体打开允许 Ca²⁺ 内流，触发 AMPA 受体插入突触后膜，使突触传递效率持久增强。海马体还通过「尖波涟漪」（Sharp-Wave Ripples, SWRs）在睡眠和安静清醒时重放白天的神经活动模式，将记忆转移到新皮层进行长期存储。',
    clinical:
      '海马体是阿尔茨海默病最早和最严重受损的脑区之一，内嗅皮层和海马体萎缩是该病的早期生物标志物。双侧海马体切除术（如治疗癫痫的 HM 患者）会导致顺行性遗忘症——无法形成新的陈述性记忆。慢性压力通过升高皮质醇导致海马体神经元萎缩、神经发生减少和体积缩小。',
    funFacts: [
      '伦敦出租车司机的海马体体积比普通人更大——他们需要记住 2.5 万条街道的导航信息，这锻炼了海马体。',
      'HM（Henry Molaison）是神经科学史上最重要的病人之一，切除海马体后他无法记住任何新事物，但运动技能学习完好——证明了不同记忆系统的存在。',
      '位置细胞（Place Cells）在你处于环境中的特定位置时放电，这一发现获得了 2014 年诺贝尔生理学或医学奖。',
    ],
    relatedIds: ['memory_consolidation', 'long_term_potentiation', 'sleep_neuroplasticity', 'cortisol'],
  },
  {
    id: 'reward_prediction_error',
    title: '奖励预测误差',
    subtitle: 'Reward Prediction Error (RPE)',
    emoji: '🎰',
    type: 'concept',
    topics: ['reward_system', 'addiction_mechanism'],
    color: '#f59e0b',
    summary:
      'RPE 是中脑多巴胺神经元编码的核心信号：实际获得的奖励与预期奖励之间的差值。这一发现彻底改变了我们对学习和成瘾的理解。',
    function:
      '奖励预测误差理论由 Wolfram Schultz 等人在 1990 年代通过对猴子的经典实验确立。他们发现：当猴子意外获得果汁奖励时，VTA 多巴胺神经元短暂爆发（正 RPE）；当奖励完全被预测时，神经元对奖励本身没有反应，只对预测线索反应；当预测奖励未出现时，神经元在预期时刻受到抑制（负 RPE）。',
    mechanism:
      'RPE 构成了时序差分学习（Temporal Difference Learning）的基础。伏隔核中的中型多棘神经元（MSN）表达 D1 或 D2 受体，分别编码「去做」（Go，趋向行为）和「不要做」（No-Go，回避行为）。正 RPE 强化导致奖励的行为链，负 RPE 弱化导致失望的行为链。这个机制使得大脑能够逐步构建出精确的环境价值模型。',
    clinical:
      '成瘾物质会人为制造超大的正 RPE：它们绕过正常的奖励预测机制，直接让伏隔核多巴胺浓度飙升 2-10 倍，远超自然奖励。这导致大脑的学习系统误以为药物是生存必需的、极有价值的事物，并将所有与用药相关的线索（地点、人物、用具）都赋予极高的激励显著性（Incentive Salience）。',
    funFacts: [
      'AlphaGo 的核心算法（强化学习 + 蒙特卡洛树搜索）正是基于 RPE 原理——奖励预测误差也是 AI 领域最重要的灵感来源之一。',
      '多巴胺神经元编码 RPE 的发现者 Wolfram Schultz 被誉为「神经经济学之父」。',
      '赌博的本质是人为操纵 RPE：偶尔出现的大额奖励（正 RPE）会让大脑过度估计赢面，强化赌博行为。',
    ],
    relatedIds: ['dopamine', 'vta', 'nucleus_accumbens', 'addiction_neuroadaptation'],
  },
  {
    id: 'vta',
    title: '腹侧被盖区',
    subtitle: 'Ventral Tegmental Area (VTA)',
    emoji: '⚡',
    type: 'brain_region',
    topics: ['reward_system', 'addiction_mechanism', 'attention_mechanism'],
    color: '#a855f7',
    summary:
      'VTA 是中脑的一小块区域，是大脑多巴胺系统的两大发源地之一，负责向伏隔核、前额叶皮层、杏仁核等脑区发送多巴胺投射，是奖励和动机的核心起点。',
    function:
      'VTA 的多巴胺能神经元通过中脑边缘通路（mesolimbic pathway）投射到伏隔核（NAc）——编码奖励的动机属性；通过中脑皮层通路（mesocortical pathway）投射到前额叶皮层（PFC）——调节认知控制和工作记忆。除多巴胺神经元外，VTA 还含有 GABA 能神经元和谷氨酸能神经元，它们共同精细调节多巴胺的释放时机和幅度。',
    mechanism:
      'VTA 多巴胺神经元接收来自杏仁核、前额叶、外侧缰核（LHb）等多个脑区的输入。外侧缰核编码「厌恶预测误差」，通过激活 VTA 中的 GABA 能中间神经元来抑制多巴胺释放。而杏仁核的基底外侧核则编码情绪显著刺激，在情绪唤醒时激活多巴胺系统。几乎所有成瘾性物质都通过不同机制激活 VTA→NAc 通路。',
    clinical:
      'VTA 多巴胺功能的个体差异与人格特质高度相关：D2 受体密度较低的个体更倾向于追求即时满足和高风险行为（D2 受体假说）。抑郁症患者常表现为中脑皮层通路多巴胺释放减少，导致快感缺失和动机缺乏。在成瘾发展过程中，VTA 神经元的突触可塑性发生改变，形成「成瘾记忆」。',
    funFacts: [
      '当你看到美食图片时，你的 VTA 已经开始放电——它对奖励线索的反应甚至比获得奖励本身更早。',
      '巧克力、性高潮、音乐寒战……这些看似不同的愉悦体验最终都会激活同一条 VTA→NAc 通路。',
      'VTA 仅约 0.04% 的脑体积，但它释放的多巴胺却深刻影响着我们的每一个决策。',
    ],
    relatedIds: ['dopamine', 'nucleus_accumbens', 'reward_prediction_error', 'addiction_neuroadaptation'],
  },
  {
    id: 'nucleus_accumbens',
    title: '伏隔核',
    subtitle: 'Nucleus Accumbens (NAc)',
    emoji: '🎁',
    type: 'brain_region',
    topics: ['reward_system', 'addiction_mechanism'],
    color: '#f43f5e',
    summary:
      '伏隔核位于基底神经节的腹侧纹状体，是中脑边缘奖励通路的核心接收站，被称为「大脑的愉悦中心」——但更准确地说，它是「动机中心」。',
    function:
      'NAc 接收来自 VTA 的多巴胺能投射（奖励信号）、来自杏仁核的谷氨酸能投射（情绪显著信息）、来自海马体的谷氨酸能投射（情境记忆）、以及来自前额叶的谷氨酸能投射（认知控制信号）。这些输入在这里整合，决定了「在当前情境下，我是否应该投入精力去追求某个目标」。',
    mechanism:
      'NAc 的主要神经元是中型多棘神经元（MSN），约 90-95%。它们分为两类：表达 D1 受体的「直接通路」MSN（Go 系统：编码趋向行为，「我想要」）和表达 D2 受体的「间接通路」MSN（No-Go 系统：编码回避行为，「我不想要」）。多巴胺的 D1 受体激活降低直接通路阈值，D2 受体抑制间接通路，两者共同增强动机输出。',
    clinical:
      '成瘾的关键神经改变发生在 NAc：长期滥用药物导致 D2 受体密度下降（纹状体 D2 受体低表达是成瘾的脆弱性标志）、谷氨酸能突触发生可塑性变化、对药物线索的反应过度增强（「想要」变得压倒性）而对自然奖励的反应减弱（「喜欢」变得麻木）。这个恶性循环使得戒断极其困难。',
    funFacts: [
      '1950 年代，Olds 和 Milner 在大鼠 NAc 附近植入电极，发现大鼠会反复按压杠杆自我刺激该区域，甚至不吃不喝直到精疲力竭——这一发现开启了奖励系统的研究。',
      '人类被试在颅内自我刺激实验中报告「感到一种期待感、一种想要更多的冲动」，而不是纯粹的快感。',
      '金钱奖励和食物奖励在 NAc 中激活的模式几乎完全相同——大脑把钱当作一种「通用奖励货币」。',
    ],
    relatedIds: ['dopamine', 'vta', 'addiction_neuroadaptation', 'amygdala'],
  },
  {
    id: 'attention_network',
    title: '注意力网络',
    subtitle: 'Attention Networks',
    emoji: '🎯',
    type: 'system',
    topics: ['attention_mechanism'],
    color: '#14b8a6',
    summary:
      '注意力不是单一系统，而是由三个功能独立但相互作用的神经网络组成：警觉网络、定向网络和执行控制网络。',
    function:
      'Michael Posner 提出的注意力网络理论是现代认知神经科学的基石：（1）警觉网络（Alerting）——维持一般性的唤醒状态，由蓝斑核去甲肾上腺素系统调控，让你对输入保持敏感；（2）定向网络（Orienting）——将注意力资源转移到特定空间位置或感觉通道，涉及顶上小叶、颞顶联合区和上丘；（3）执行控制网络（Executive Control）——解决冲突、抑制不适当反应、在任务间切换，涉及背外侧前额叶（DLPFC）和前扣带回（ACC）。',
    mechanism:
      '注意力的神经机制本质上是「信号放大」和「噪声过滤」：前额叶通过自上而下的投射增强目标脑区的活动（放大任务相关信息），同时抑制其他脑区的活动（过滤干扰信息）。这个过程被称为「偏置竞争」（Bias Competition）。当注意力高度集中时，默认模式网络（DMN）会被有效抑制——DMN 和执行控制网络构成了大脑的「跷跷板」。',
    clinical:
      '注意力缺陷多动障碍（ADHD）被认为是警觉网络（去甲肾上腺素不足）和执行控制网络（多巴胺不足）双重功能低下的结果。焦虑障碍则是警觉网络过度激活——蓝斑核持续放电导致对威胁性信息的过度定向。精神分裂症患者的执行控制网络和默认模式网络之间的拮抗关系受损，表现为无法有效抑制内源性的思维噪声。',
    funFacts: [
      '「注意瞬脱」（Attentional Blink）现象：如果你在 1 秒内连续看到两个目标，第二个经常被大脑「漏掉」——因为你的注意力资源还在处理第一个。',
      '你每天大约有 47% 的时间在「走神」（Mind Wandering）——这是默认模式网络的功劳。',
      '有经验的冥想者可以显著增强三个注意力网络的功能，尤其是执行控制网络。',
    ],
    relatedIds: ['prefrontal_cortex', 'locus_coeruleus', 'default_mode_network', 'dopamine'],
  },
  {
    id: 'locus_coeruleus',
    title: '蓝斑核',
    subtitle: 'Locus Coeruleus (LC)',
    emoji: '🔵',
    type: 'brain_region',
    topics: ['attention_mechanism', 'stress_mechanism', 'sleep_neuroscience'],
    color: '#0ea5e9',
    summary:
      '蓝斑核是脑中合成去甲肾上腺素的主要核团，位于脑干上部的脑桥，被称为「大脑的唤醒开关」——每一秒的警觉都与它有关。',
    function:
      '蓝斑核虽然只有约 22,000-50,000 个神经元，但它的轴突投射范围极为广泛，几乎到达中枢神经系统的每一个角落：新皮层、海马体、杏仁核、丘脑、小脑、脊髓。去甲肾上腺素（NE）的释放通过 α₁、α₂、β₁、β₂ 等不同受体亚型产生广泛而多样的生理和心理效应。',
    mechanism:
      '蓝斑核的放电模式决定了去甲肾上腺素的作用：静息状态下低频紧张性放电（tonic firing，0.5-5Hz）维持基础唤醒水平；遇到显著或威胁性刺激时爆发式时相性放电（phasic firing，20-80Hz），短暂聚焦注意力并调动应激反应。持续的高张力放电与慢性压力和焦虑相关；时相性放电受损则与 ADHD 和抑郁有关。',
    clinical:
      '蓝斑核在阿尔茨海默病早期即出现严重的神经元丢失和 tau 蛋白神经原纤维缠结，甚至早于海马体受累——这解释了为什么睡眠紊乱和注意力下降常是 AD 的最早症状。抑郁症患者蓝斑核的酪氨酸羟化酶（去甲肾上腺素合成酶）活性降低，导致 NE 合成不足。PTSD 患者蓝斑核过度活跃，对威胁线索过度敏感。',
    funFacts: [
      '蓝斑核在 REM 睡眠时完全停止放电——这是你肌肉松弛、不会把梦做出来的原因之一。',
      '一次强烈的惊恐发作本质上就是蓝斑核的一次「短路」——突然、无原因的大量去甲肾上腺素爆发。',
      '咖啡因通过阻断腺苷受体间接增强蓝斑核的放电，这就是为什么咖啡能提神。',
    ],
    relatedIds: ['attention_network', 'cortisol', 'amygdala', 'sleep_cycle'],
  },
  {
    id: 'amygdala',
    title: '杏仁核',
    subtitle: 'Amygdala · 情绪哨兵',
    emoji: '🔶',
    type: 'brain_region',
    topics: ['stress_mechanism', 'memory_formation', 'attention_mechanism'],
    color: '#f97316',
    summary:
      '杏仁核是颞叶内侧的杏仁状核团，是大脑的「情绪处理中心」和「威胁探测器」，在恐惧条件反射、情绪记忆和社交行为中发挥核心作用。',
    function:
      '杏仁核由多个亚核组成：外侧核（LA）接收来自丘脑和皮层的感觉输入；基底核（BA）与前额叶、海马体相互连接；中央核（CeA）是输出站，向下丘脑和脑干发送信号启动应激反应。杏仁核通过两条通路处理威胁：「低路」（丘脑→杏仁核，快速但粗糙）和「高路」（丘脑→皮层→杏仁核，慢速但精确）。',
    mechanism:
      '当威胁出现时，外侧杏仁核在 120 毫秒内被激活——在你还没意识到之前，杏仁核已经让你心跳加速、手心出汗了。情绪唤醒会触发杏仁核→蓝斑核→海马体的连锁反应：杏仁核激活蓝斑核释放 NE，蓝斑核激活海马体的 β-肾上腺素受体，显著增强情绪事件的记忆巩固。这就是为什么「闪光灯记忆」（9/11、婚礼等）如此鲜活持久。',
    clinical:
      '焦虑障碍和 PTSD 的核心神经异常是杏仁核过度活跃 + 前额叶调控不足。PTSD 患者的杏仁核对创伤线索反应异常强烈，而腹内侧前额叶对杏仁核的抑制性控制减弱。自闭症和精神病态（psychopathy）则表现为杏仁核对恐惧表情的识别障碍——他们难以感知他人的恐惧情绪。乌尔巴赫-维特综合征（Urbach-Wiethe）导致双侧杏仁核钙化，患者无法体验恐惧。',
    funFacts: [
      '杏仁核可以「记住」你已经遗忘的恐惧——即使你不记得童年被狗咬过，看到狗时杏仁核还是会让你紧张。',
      '看恐怖电影时，你的杏仁核几乎和真的遇到危险时一样活跃。',
      '有研究发现，杏仁核在看到可口的高热量食物时也会异常活跃——它既是威胁探测器，也是奖励探测器。',
    ],
    relatedIds: ['locus_coeruleus', 'prefrontal_cortex', 'hippocampus', 'hpa_axis'],
  },
  {
    id: 'hpa_axis',
    title: 'HPA 轴',
    subtitle: '下丘脑-垂体-肾上腺轴',
    emoji: '⚖️',
    type: 'system',
    topics: ['stress_mechanism', 'sleep_neuroscience'],
    color: '#dc2626',
    summary:
      'HPA 轴是神经内分泌系统的核心应激轴，由下丘脑、垂体和肾上腺组成，是压力反应的「总开关」，也是身心医学研究最深入的通路。',
    function:
      '当感知到压力时，下丘脑室旁核（PVN）释放促肾上腺皮质激素释放激素（CRH）和精氨酸加压素（AVP）→ 垂体前叶释放促肾上腺皮质激素（ACTH）→ 肾上腺皮质合成并释放糖皮质激素（主要是皮质醇）。皮质醇通过负反馈机制抑制下丘脑和垂体的分泌，形成一个自稳回路。',
    mechanism:
      'HPA 轴的负反馈高度依赖海马体——海马体有高密度的糖皮质激素受体（GR），当皮质醇水平过高时，海马体激活并抑制下丘脑 CRH 的释放。但慢性压力会损害这个负反馈系统：持续的高皮质醇导致海马神经元萎缩，海马体对 HPA 轴的抑制减弱，形成「皮质醇越多→海马受损越多→负反馈越弱→皮质醇更多」的恶性循环。',
    clinical:
      'HPA 轴失调是抑郁症的核心生物标记之一：约 40-60% 的抑郁症患者皮质醇水平升高、昼夜节律紊乱、地塞米松抑制试验（DST）阳性（即负反馈失败）。长期的慢性压力和创伤（如童年虐待）会导致 HPA 轴的「程序化改变」——这种表观遗传改变甚至可以跨代传递。而 PTSD 则呈现双向异常：静息时 HPA 轴低下（皮质醇偏低），但遇到创伤线索时反应过激。',
    funFacts: [
      '养育行为会影响后代的 HPA 轴：被母鼠高频率舔舐梳理的幼鼠，成年后海马 GR 表达更高，HPA 轴负反馈更强，更能抗压。',
      '瑜伽、正念冥想、有氧运动都可以改善 HPA 轴的调节功能，降低基线皮质醇水平。',
      '地塞米松抑制试验（DST）曾经是抑郁症的「生物学标志物」——但它只在约 50% 的患者中呈阳性。',
    ],
    relatedIds: ['cortisol', 'hippocampus', 'amygdala', 'prefrontal_cortex'],
  },
  {
    id: 'memory_consolidation',
    title: '记忆巩固',
    subtitle: 'Memory Consolidation',
    emoji: '🔗',
    type: 'concept',
    topics: ['memory_formation', 'sleep_neuroscience'],
    color: '#7c3aed',
    summary:
      '记忆巩固是将不稳定的短期记忆转化为持久的长期记忆的神经过程，依赖海马体与新皮层之间在睡眠中的「对话」——这就是为什么好好睡觉才能记住东西。',
    function:
      '记忆巩固分为两个阶段：（1）系统巩固（Systems Consolidation）——海马体将记忆「转移」到新皮层长期存储，这个过程需要数周到数年；（2）突触巩固（Synaptic Consolidation）——在分子和突触水平上发生的可塑性变化，通常在数小时内完成。近年来的研究更强调「多重痕迹理论」，即情景记忆始终依赖海马体，语义记忆则逐渐转移到新皮层。',
    mechanism:
      '记忆巩固的核心发生在慢波睡眠（SWS）期间：海马体在清醒时编码的神经活动模式（位置细胞序列）会在 SWS 的「尖波涟漪」（Sharp-Wave Ripples）中被反复重放（Replay），而新皮层在慢波振荡的「上升状态」同步激活。海马体的涟漪事件与新皮层的慢波振荡以及丘脑的纺锤波（Sleep Spindles）精准耦合，形成三重对话，将记忆痕迹从海马体「写入」新皮层。',
    clinical:
      '阿尔茨海默病的记忆丧失正是记忆巩固系统的全面崩溃：淀粉样蛋白-β 沉积首先损害内嗅皮层和海马体→ 无法编码新记忆→ 睡眠中尖波涟漪减少→ 无法巩固→ 原有记忆也随皮层萎缩而丢失。慢性睡眠剥夺会严重损害记忆巩固——熬夜学习是效率最低的策略，因为你学了也记不住。',
    funFacts: [
      '「间隔重复」（Spaced Repetition）的学习方法之所以有效，是因为每次间隔后重新激活记忆都会触发新一轮巩固，就像「打了多层补丁」一样更牢固。',
      '睡眠时的记忆重放不仅回放空间路径，还会回放抽象的规则和模式——这就是为什么「睡一觉再想」有时会灵感迸发。',
      '睡前 1 小时是学习的黄金时间——因为接下来的睡眠会立刻开始巩固你刚学的内容。',
    ],
    relatedIds: ['hippocampus', 'long_term_potentiation', 'sleep_neuroplasticity', 'sleep_cycle'],
  },
  {
    id: 'long_term_potentiation',
    title: '长时程增强',
    subtitle: 'Long-Term Potentiation (LTP)',
    emoji: '⚡',
    type: 'concept',
    topics: ['memory_formation'],
    color: '#a855f7',
    summary:
      'LTP 是两个神经元之间突触连接强度的持久增强，是学习和记忆在细胞水平上的核心机制——可以说「LTP 就是记忆的分子基础」。',
    function:
      '1973 年 Bliss 和 Lømo 在兔海马体中首次发现 LTP：高频电刺激穿通通路后，海马齿状回神经元对后续相同刺激的反应显著增强，且这种增强可持续数小时到数周。根据 Hebb 法则（「一起放电的神经元连在一起」），LTP 是突触可塑性最经典的实验范式。',
    mechanism:
      'LTP 的核心分子机制涉及 NMDA 受体和 AMPA 受体的协调作用：（1）基础状态下，NMDA 受体被 Mg²⁺ 阻塞；（2）突触前释放谷氨酸结合 AMPA 受体，引起突触后轻度去极化；（3）强刺激导致突触后膜充分去极化，Mg²⁺ 被驱逐，NMDA 受体通道打开，Ca²⁺ 内流；（4）Ca²⁺ 激活 CaMKII 和 PKC 等激酶，触发 AMPA 受体磷酸化和更多 AMPA 受体插入突触后膜；（5）突触后释放神经营养因子（BDNF），诱导突触前释放更多神经递质，并促进树突棘生长——最终突触传递效率长久增强。',
    clinical:
      'NMDA 受体功能异常与精神分裂症密切相关——「谷氨酸假说」认为，NMDA 受体功能低下（特别是在前额叶和海马体）导致 LTP 受损，引起认知症状和工作记忆障碍。阿尔茨海默病中，淀粉样蛋白-β 寡聚体通过干扰 NMDA 受体 trafficking 和突触后致密区（PSD）的结构来抑制 LTP，直接导致记忆丧失。',
    funFacts: [
      'LTP 甚至存在于昆虫的蘑菇体中——说明这个记忆机制在进化上非常古老且保守。',
      '记忆的反向机制是长时程抑制（LTD）——弱刺激或低频刺激会削弱突触连接。大脑既需要增强有用连接，也需要修剪无用连接。',
      '脑源性神经营养因子（BDNF）是 LTP 的「肥料」——运动能显著提升 BDNF 水平，这就是为什么运动改善记忆力。',
    ],
    relatedIds: ['hippocampus', 'memory_consolidation', 'sleep_neuroplasticity'],
  },
  {
    id: 'addiction_neuroadaptation',
    title: '成瘾神经适应',
    subtitle: 'Neuroadaptations in Addiction',
    emoji: '⚠️',
    type: 'concept',
    topics: ['addiction_mechanism', 'reward_system'],
    color: '#dc2626',
    summary:
      '成瘾不是意志力的问题，而是长期滥用药物后大脑发生的深刻、持久的神经可塑性改变。这种「病理学习」让大脑从「喜欢药物」变成「需要药物」。',
    function:
      '成瘾的发展经历三个阶段：（1）娱乐性使用阶段——VTA→NAc 多巴胺通路被激活，产生强烈快感；（2）依赖/耐受阶段——大脑为对抗过度刺激产生代偿性适应（D2 受体下调、谷氨酸突触重塑），需要更大剂量才能达到相同效果（耐受），停药则出现戒断；（3）成瘾阶段——前额叶控制能力下降，决策系统偏向短期奖励，对药物线索产生强迫性寻求（Compulsive Seeking），即使无快感仍持续使用。',
    mechanism:
      '成瘾的核心神经适应包括：（1）伏隔核 D2 受体密度下降，导致自然奖励（美食、社交、性）的愉悦感全面钝化（「喜欢」通路麻木），患者只能从药物中获得微弱满足；（2）杏仁核-NAc 通路谷氨酸突触发生可塑性变化，将药物相关线索赋予极端高的激励显著性（Incentive Salience），导致「看见=想要」；（3）前额叶皮层（尤其是眶额皮层 OFC 和前扣带回 ACC）结构和功能受损，导致价值评估偏差和冲动控制失败；（4）HPA 轴长期失调，应激成为复发的最强触发因素。',
    clinical:
      '理解成瘾是脑疾病而非道德缺陷，是治疗的第一步。目前有效的药物治疗包括：美沙酮（阿片类替代治疗）、丁丙诺啡（部分激动剂）、纳曲酮（阿片受体拮抗剂，用于酒精和阿片成瘾）、伐尼克兰（尼古丁受体部分激动剂，用于戒烟）。心理治疗方面，线索暴露治疗（Cue Exposure Therapy）通过反复呈现药物线索而不提供药物，来逐渐消退条件化的渴望反应。',
    funFacts: [
      '尼古丁的成瘾性甚至比可卡因更强——约 32% 尝试尼古丁的人会发展为依赖，而可卡因约 17%。',
      '吸烟者的 D2 受体密度比非吸烟者低 15-20%——戒烟后至少需要 3-6 个月才能部分恢复。',
      '约 40-60% 的成瘾风险来自遗传因素——基因（如 COMT、DRD2、5-HTTLPR）决定了大脑奖励系统和应激系统的敏感性。',
    ],
    relatedIds: ['dopamine', 'nucleus_accumbens', 'vta', 'prefrontal_cortex', 'hpa_axis'],
  },
  {
    id: 'default_mode_network',
    title: '默认模式网络',
    subtitle: 'Default Mode Network (DMN)',
    emoji: '💭',
    type: 'system',
    topics: ['attention_mechanism', 'memory_formation'],
    color: '#06b6d4',
    summary:
      'DMN 是大脑在清醒休息、不专注外部任务时激活的神经网络，负责自传体记忆、心理时间旅行、换位思考和白日梦——即「思维漫游」。',
    function:
      'DMN 的核心节点包括：内侧前额叶皮层（mPFC，自我参照思维）、后扣带回/楔前叶（PCC/Precuneus，整合自我与记忆）、角回（语义加工和情境建构）、海马体/海马旁回（自传体记忆提取）。DMN 与执行控制网络（任务正性网络）呈反相关——当一个激活时，另一个就被抑制，构成大脑的「跷跷板」。',
    mechanism:
      'DMN 并非只在「无所事事」时工作——它在自发的认知活动中扮演关键角色：回忆过去（自传体记忆）、想象未来（心理模拟）、理解他人想法和感受（心智理论，Theory of Mind）、进行道德判断。这种「时间旅行」能力让人类能够反思过去、规划未来、建立复杂的社会关系——这是人类意识的重要组成部分。',
    clinical:
      'DMN 异常与多种精神疾病相关：抑郁症患者 DMN 过度连接且过度活跃，导致反复自我反思和反刍思维（rumination）；精神分裂症患者 DMN 和执行网络之间的反相关消失，出现思维插入和幻觉；阿尔茨海默病早期 PCC 区域的淀粉样蛋白沉积和低代谢是最早的生物标志之一；ADHD 患者 DMN 和任务网络之间切换不灵，导致注意力涣散和频繁走神。',
    funFacts: [
      '大脑在做白日梦时消耗的能量和做复杂数学题时几乎一样多——DMN 是大脑的「默认」高耗能状态。',
      '创造力高的人通常表现出 DMN 和执行控制网络更好的「灵活切换」能力——他们可以在发散思维（DMN）和评估思维（ECN）之间高效转换。',
      '约 47% 的清醒时间你在走神——哈佛大学的 Killingsworth 和 Gilbert 研究发现，走神的快乐程度通常低于专注于当下的任务。',
    ],
    relatedIds: ['attention_network', 'prefrontal_cortex', 'hippocampus'],
  },
  {
    id: 'sleep_cycle',
    title: '睡眠周期',
    subtitle: 'Sleep Cycle & Architecture',
    emoji: '🌙',
    type: 'concept',
    topics: ['sleep_neuroscience'],
    color: '#2563eb',
    summary:
      '睡眠不是单一状态，而是由 NREM（非快速眼动）和 REM（快速眼动）睡眠交替组成的 90 分钟周期，每个阶段都承担着独特的神经修复和记忆加工功能。',
    function:
      '一个完整的睡眠周期约 90 分钟，每晚重复 4-5 次：（1）N1（入睡期，1-5%）——过渡到睡眠，脑波从 α 转为 θ；（2）N2（浅睡期，45-55%）——出现睡眠纺锤波和 K 复合波，是睡眠的大部分时间；（3）N3（深睡/慢波睡眠，15-25%）——高振幅慢波（δ 波），身体修复、记忆巩固的黄金期，前半夜占比高；（4）REM（快速眼动，20-25%）——脑波类似清醒，肌肉失张力，眼球快速运动，绝大多数梦境发生于此，后半夜占比递增。',
    mechanism:
      '睡眠-觉醒周期由两个相互拮抗的系统调控：（1）昼夜节律系统（Circadian Rhythm）——下丘脑视交叉上核（SCN）根据光线信号，通过松果体分泌褪黑素调节 24 小时节律；（2）睡眠稳态压力（Sleep Homeostasis）——清醒时大脑不断积累腺苷（adenosine），腺苷浓度越高越困（睡眠压力），咖啡因通过阻断腺苷受体发挥提神作用。两个系统的「跷跷板」决定了你何时犯困、何时清醒。',
    clinical:
      '睡眠不足会损害所有认知功能：注意力下降 40%、工作记忆容量减少、情绪调节崩溃（杏仁核与前额叶连接减弱 60%）、决策风险偏好改变（更倾向冒险）。长期睡眠不足是阿尔茨海默病的重要风险因素——因为大脑的垃圾清除系统（类淋巴系统）只在 N3 深睡时高效工作。失眠症患者常表现为过度兴奋（hyperarousal），入睡时前额叶和默认模式网络活动异常升高。',
    funFacts: [
      'N3 深睡时你的脑电波比全麻时更慢、更深——大脑真的在「关机修复」。',
      'REM 睡眠时，你的脑桥（Pons）会随机向大脑皮层发射信号，大脑皮层试图把这些随机信号「编织成故事」——这可能就是梦境荒诞的原因之一（激活-合成假说）。',
      '你每晚会做 4-6 个梦，但 95% 你会在醒来后立即忘记——因为 REM 时海马体不工作，无法巩固梦境记忆。',
    ],
    relatedIds: ['sleep_neuroplasticity', 'glymphatic_system', 'memory_consolidation', 'locus_coeruleus'],
  },
  {
    id: 'glymphatic_system',
    title: '类淋巴系统',
    subtitle: 'Glymphatic System',
    emoji: '🧹',
    type: 'system',
    topics: ['sleep_neuroscience'],
    color: '#0ea5e9',
    summary:
      '类淋巴系统是大脑特有的废物清除通路，只在睡眠时（尤其是 N3 深睡）高效运作，通过脑脊液-间质液交换清除代谢废物（包括阿尔茨海默病的淀粉样蛋白-β）。',
    function:
      '2012 年由丹麦科学家 Maiken Nedergaard 首次发现，类淋巴系统（Glymphatic System = Glia + Lymphatic）的工作机制：（1）清醒时，星形胶质细胞的终足收缩，血管周围间隙（Virchow-Robin space）狭窄，脑脊液流入受阻；（2）进入 N3 深睡时，神经元放电同步化（慢波振荡），星形胶质细胞终足放松，血管周围间隙扩大 60%；（3）动脉搏动驱动脑脊液沿血管周围间隙高速流入脑实质，与间质液充分混合；（4）携带代谢废物的间质液沿静脉周围间隙流出，最终汇入颈部淋巴系统排出大脑。',
    mechanism:
      '类淋巴系统最著名的功能是清除淀粉样蛋白-β（Aβ）——这是阿尔茨海默病的核心病理蛋白。研究表明，小鼠在睡眠时 Aβ 的清除率是清醒时的 2 倍。类淋巴系统还清除 tau 蛋白、α-突触核蛋白等神经退行性疾病相关的毒性蛋白。脑脊液-间质液的交换速度在 N3 深睡时最快，在 REM 睡眠时较慢，清醒时最慢。',
    clinical:
      '类淋巴系统的发现彻底改变了我们对睡眠和神经退行性疾病的理解：长期睡眠剥夺 → Aβ 清除减少 → Aβ 寡聚体积累 → 损害突触和神经元 → 进一步损害类淋巴系统功能 → 恶性循环。这解释了为什么睡眠障碍是阿尔茨海默病最早的症状之一，也是重要的预防靶点。类淋巴功能还与中风、帕金森病、创伤性脑损伤（TBI）的预后密切相关。',
    funFacts: [
      '头朝右侧睡比平躺或朝左侧睡更有利于类淋巴系统的清除——小鼠实验证实了这一点。',
      '酒精会显著抑制类淋巴系统的清除功能——这解释了为什么「断片」后第二天大脑昏昏沉沉。',
      '类淋巴系统的发现者 Maiken Nedergaard 也是星形胶质细胞研究的先驱——她认为神经科学家长期忽视了神经胶质细胞的重要性。',
    ],
    relatedIds: ['sleep_cycle', 'sleep_neuroplasticity', 'memory_consolidation'],
  },
  {
    id: 'sleep_neuroplasticity',
    title: '睡眠与神经可塑性',
    subtitle: 'Sleep & Neuroplasticity',
    emoji: '🔁',
    type: 'concept',
    topics: ['sleep_neuroscience', 'memory_formation'],
    color: '#7c3aed',
    summary:
      '睡眠是大脑进行突触重塑和记忆巩固的黄金时间——NREM 深睡进行「记忆转移」和「垃圾清除」，REM 睡眠进行「创造性整合」和「情绪调节」。',
    function:
      '不同睡眠阶段支持不同类型的可塑性：（1）N3 慢波睡眠（SWS）——主要支持陈述性记忆（事实、知识、事件）的巩固，以及运动技能学习的早期巩固阶段。尖波涟漪+慢波振荡+纺锤波的三重耦合将海马体的记忆写入新皮层；（2）N2 浅睡——睡眠纺锤波（Sleep Spindles）与运动技能的精细调节有关，夜间 N2 纺锤波密度高的人，第二天运动技能表现提升更明显；（3）REM 睡眠——主要支持程序性记忆（技能、习惯）、情绪记忆的去情境化加工，以及创造性的远距离联想。',
    mechanism:
      '突触稳态假说（Synaptic Homeostasis Hypothesis, SHY）由 Giulio Tononi 和 Chiara Cirelli 提出：清醒时大脑因学习活动产生大量突触增强（LTP），导致能量消耗和「噪声」增加；而睡眠（特别是 SWS）通过广泛的突触弱化（LTD）来「修剪」那些不重要的突触连接，只保留最强、最有意义的那些——相当于对硬盘进行「碎片整理」，为下一天的学习腾出空间。',
    clinical:
      '大量研究证实：学习后睡眠比继续复习效果更好。一项音乐学习研究发现，钢琴学习者在学习新曲目后睡 12 小时再测试，比连续练习 12 小时的对照组准确度高 20%。睡眠不足的学生记忆保留量比睡眠充足者少 40% 以上。睡眠障碍（特别是失眠和睡眠呼吸暂停）加速认知老化，是轻度认知障碍（MCI）进展为阿尔茨海默病的风险倍增因素。',
    funFacts: [
      '德国心理学家 Jan Born 的实验：睡前学习词汇表 + 夜间慢波振荡的声音刺激（BiPhaS 技术），第二天记忆量提升 37%。',
      'REM 睡眠会选择性保留与情绪相关的记忆细节——「记住感受，遗忘细节」可能是进化出来帮助我们适应压力的机制。',
      '睡眠是「免费的创造力加速器」——凯库勒梦见蛇咬尾发现苯环结构、门捷列夫梦见元素周期表，都被认为是 REM 睡眠的「远程联想」在起作用。',
    ],
    relatedIds: ['memory_consolidation', 'long_term_potentiation', 'sleep_cycle', 'glymphatic_system'],
  },
];

export function getEntryById(id: string): EncyclopediaEntry | undefined {
  return ENCYCLOPEDIA_ENTRIES.find((e) => e.id === id);
}

export function getEntriesByTopic(topic: EncyclopediaTopic): EncyclopediaEntry[] {
  return ENCYCLOPEDIA_ENTRIES.filter((e) => e.topics.includes(topic));
}

export const TOPIC_ORDER: EncyclopediaTopic[] = [
  'reward_system',
  'attention_mechanism',
  'memory_formation',
  'addiction_mechanism',
  'sleep_neuroscience',
  'stress_mechanism',
];
