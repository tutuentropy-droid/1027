import { useSimulator } from '../hooks/useSimulator';
import { getBrainTypeById } from '../config/brainTypes';
import { getModeById, METRIC_CONFIGS } from '../config/modes';
import type { MetricType } from '../types';
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  Cpu,
  Shield,
  History,
} from 'lucide-react';

function getMetricLevel(value: number): { label: string; tone: 'low' | 'normal' | 'high' | 'extreme'; color: string } {
  if (value >= 80) return { label: '极高', tone: 'extreme', color: '#ef4444' };
  if (value >= 65) return { label: '偏高', tone: 'high', color: '#f59e0b' };
  if (value <= 20) return { label: '极低', tone: 'extreme', color: '#ef4444' };
  if (value <= 35) return { label: '偏低', tone: 'low', color: '#3b82f6' };
  return { label: '正常', tone: 'normal', color: '#10b981' };
}

function getMetricTrendIcon(value: number) {
  if (value >= 70) return <TrendingUp size={12} className="text-rose-400" />;
  if (value <= 30) return <TrendingDown size={12} className="text-blue-400" />;
  return <Minus size={12} className="text-white/40" />;
}

function getNeurochemicalNote(key: MetricType, value: number): string {
  switch (key) {
    case 'dopamine':
      if (value >= 80) return '伏隔核多巴胺浓度远超基线，奖励预测误差信号放大，易产生冲动决策与成瘾行为。';
      if (value >= 65) return '纹状体多巴胺处于较高水平，寻求新奇刺激的驱动力增强，注意力易分散。';
      if (value <= 20) return '中脑边缘通路多巴胺严重匮乏，默认模式网络过度激活，认知灵活性显著受损。';
      if (value <= 35) return '前额叶皮层多巴胺不足，工作记忆与动机水平下降，可能出现快感缺失（anhedonia）症状。';
      return '多巴胺系统维持稳态，奖励信号正常传导，动机与愉悦感处于基线水平。';
    case 'stress':
      if (value >= 80) return '皮质醇浓度持续处于高位，HPA 轴负反馈回路饱和，海马神经元树突萎缩风险上升。';
      if (value >= 65) return '蓝斑核去甲肾上腺素持续释放，杏仁核警觉性上调，交感神经张力增高。';
      if (value <= 20) return 'HPA 轴低唤醒状态，可能伴随肾上腺素能受体脱敏，精力与动机双低。';
      if (value <= 35) return '皮质醇基础水平偏低，下丘脑-垂体-肾上腺轴活性不足，应激反应迟钝。';
      return '压力系统处于生理基线，交感-副交感神经平衡良好。';
    case 'attention':
      if (value >= 80) return '额顶叶控制网络高度激活，默认模式网络被有效抑制，具备超专注（hyperfocus）潜力。';
      if (value >= 65) return '背外侧前额叶皮层唤醒良好，选择性注意与持续注意功能在线，适合深度工作。';
      if (value <= 20) return '注意力资源严重耗竭，前扣带回冲突监测功能失活，认知控制几乎瘫痪。';
      if (value <= 35) return '警觉网络（alerting network）唤醒不足，定向注意与执行控制功能退化，分心阈值降低。';
      return '注意网络处于常态激活水平，任务切换与目标维持能力正常。';
    case 'fatigue':
      if (value >= 80) return '中枢疲劳已达极限，腺苷受体大量占据，糖原储备耗尽，需立即启动睡眠修复程序。';
      if (value >= 65) return '大脑腺苷浓度累积，基底前脑促觉醒神经元活性下降，反应时显著延长。';
      if (value <= 20) return '处于高度恢复态，脑内淋巴系统（glymphatic system）清洁效率高，代谢废物充分清除。';
      if (value <= 35) return '躯体与精神能量充沛，蓝斑核去甲肾上腺素能神经元放电稳定，清醒状态维持良好。';
      return '能量代谢与清除过程平衡，中枢疲劳处于生理可接受范围。';
    default:
      return '';
  }
}

function formatDate(): string {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function NeuroReport() {
  const metrics = useSimulator((s) => s.metrics);
  const time = useSimulator((s) => s.time);
  const currentMode = useSimulator((s) => s.currentMode);
  const brainTypeId = useSimulator((s) => s.brainTypeId);
  const logs = useSimulator((s) => s.logs);

  const brainType = getBrainTypeById(brainTypeId);
  const mode = getModeById(currentMode);

  if (!brainType) return null;

  const abnormalCount = (['dopamine', 'stress', 'attention', 'fatigue'] as MetricType[]).filter(
    (k) => getMetricLevel(metrics[k]).tone !== 'normal'
  ).length;

  const riskFlags: { icon: React.ReactNode; text: string; color: string }[] = [];
  if (metrics.dopamine >= 80 && metrics.attention <= 40) {
    riskFlags.push({ icon: <AlertTriangle size={12} />, text: '奖励依赖风险升高，伏隔核多巴胺过载', color: '#ec4899' });
  }
  if (metrics.stress >= 75) {
    riskFlags.push({ icon: <AlertTriangle size={12} />, text: 'HPA 轴过度激活，皮质醇毒性累积', color: '#ef4444' });
  }
  if (metrics.fatigue >= 80) {
    riskFlags.push({ icon: <AlertTriangle size={12} />, text: '中枢疲劳临界，脑内腺苷浓度过高', color: '#f59e0b' });
  }
  if (metrics.attention >= 70 && metrics.fatigue <= 50) {
    riskFlags.push({ icon: <CheckCircle size={12} />, text: '进入心流窗口，前额叶-顶叶网络同步', color: '#10b981' });
  }
  if (metrics.dopamine <= 25) {
    riskFlags.push({ icon: <AlertTriangle size={12} />, text: '多巴胺基线以下，中脑边缘通路活性不足', color: '#64748b' });
  }

  const recentBehaviors = logs.slice(0, 3);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white/90">
            <FileText size={18} className="text-cyan-400" />
            神经报告
          </h2>
          <div className="flex items-center gap-2 text-[11px] text-white/40">
            <span>NR-{time.day.toString().padStart(3, '0')}-{time.hour.toString().padStart(2, '0')}</span>
            <span>·</span>
            <span>{formatDate()}</span>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium"
          style={{
            borderColor: `${brainType.color}40`,
            backgroundColor: `${brainType.color}10`,
            color: brainType.color,
          }}
        >
          <span>{brainType.emoji}</span>
          <span>{brainType.shortName}</span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-2">
        {METRIC_CONFIGS.map((mc) => {
          const val = metrics[mc.key];
          const level = getMetricLevel(val);
          return (
            <div
              key={mc.key}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] text-white/50">{mc.name}</span>
                {getMetricTrendIcon(val)}
              </div>
              <div className="mb-1 flex items-baseline gap-1">
                <span
                  className="text-base font-bold"
                  style={{ color: level.color }}
                >
                  {Math.round(val)}
                </span>
                <span className="text-[9px] text-white/30">/100</span>
              </div>
              <div
                className="h-1 w-full overflow-hidden rounded-full bg-white/10"
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${val}%`,
                    background: `linear-gradient(90deg, ${level.color}aa, ${level.color})`,
                  }}
                />
              </div>
              <div className="mt-1 text-[9px] font-medium" style={{ color: level.color }}>
                {level.label}
              </div>
            </div>
          );
        })}
      </div>

      {riskFlags.length > 0 && (
        <div className="mb-4 space-y-1.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
            风险标记 / Risk Flags
          </div>
          {riskFlags.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11px]"
              style={{
                borderColor: `${f.color}30`,
                backgroundColor: `${f.color}08`,
                color: f.color,
              }}
            >
              {f.icon}
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mb-4">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          <Brain size={11} className="text-violet-400" />
          神经化学速览
        </div>
        <div className="space-y-2">
          {METRIC_CONFIGS.map((mc) => (
            <div
              key={mc.key}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5"
            >
              <div className="mb-1 flex items-center gap-1.5">
                <span>{mc.emoji}</span>
                <span className="text-[11px] font-semibold text-white/80">{mc.name}</span>
                <span className="text-[9px] text-white/30">{mc.description}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-white/50">
                {getNeurochemicalNote(mc.key, metrics[mc.key])}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          <Cpu size={11} className="text-pink-400" />
          当前脑状态
        </div>
        {mode ? (
          <div
            className="rounded-lg border p-3"
            style={{
              borderColor: `${mode.color}30`,
              backgroundColor: `${mode.color}08`,
            }}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xl">{mode.emoji}</span>
              <span className="text-sm font-semibold" style={{ color: mode.color }}>
                {mode.name}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-white/60">{mode.description}</p>
          </div>
        ) : (
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-[11px] text-white/40">
            状态波动中，各项指标尚未落入典型模式区间。
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          <Shield size={11} className="text-emerald-400" />
          脑档案 · {brainType.name}
        </div>
        <div className="space-y-1.5 text-[11px] text-white/60">
          {brainType.traits.map((t, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: brainType.color }} />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {recentBehaviors.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            <History size={11} className="text-amber-400" />
            近期神经事件
          </div>
          <div className="space-y-1">
            {recentBehaviors.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{log.behaviorEmoji}</span>
                  <span className="text-[11px] text-white/70">{log.behaviorName}</span>
                </div>
                <span className="text-[10px] text-white/30">
                  D{log.day} {log.hour.toString().padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 border-t border-white/5 pt-3">
        <div className="flex items-center justify-between text-[9px] text-white/30">
          <span>神经科学科普向 · 仅供参考</span>
          <span>异常指标: {abnormalCount}/4</span>
        </div>
      </div>
    </div>
  );
}
