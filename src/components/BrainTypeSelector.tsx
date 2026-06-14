import { useState } from 'react';
import { BRAIN_TYPES } from '../config/brainTypes';
import type { BrainTypeId } from '../types';
import { useSimulator } from '../hooks/useSimulator';
import { ChevronRight, Sparkles, Activity, Brain, Zap } from 'lucide-react';

interface Props {
  onClose?: () => void;
  showCloseButton?: boolean;
}

const STEPS = [
  {
    title: '欢迎来到神经奖励系统实验室',
    subtitle: '在开始模拟之前，请选择你的大脑类型档案',
    description:
      '不同的大脑有着截然不同的神经化学特征。同样是刷一条短视频，ADHD 倾向大脑获得的多巴胺奖励可能是高自控型大脑的 3 倍以上。选择最贴近你的类型，让模拟结果更有参考价值。',
  },
];

export function BrainTypeSelector({ onClose, showCloseButton = false }: Props) {
  const setBrainType = useSimulator((s) => s.setBrainType);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<BrainTypeId | null>(null);
  const [hovered, setHovered] = useState<BrainTypeId | null>(null);

  const handleSelect = (id: BrainTypeId) => {
    setSelected(id);
  };

  const handleConfirm = () => {
    if (!selected) return;
    setBrainType(selected);
    onClose?.();
  };

  const activeBrainType = BRAIN_TYPES.find((b) => b.id === (hovered ?? selected)) ?? null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => showCloseButton && onClose?.()}
      />
      <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1230] to-[#0a0e27] p-6 shadow-2xl sm:p-8">
        <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        )}

        <div className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-violet-400">
          <Brain size={14} />
          <span>神经档案 · 初始化</span>
          <span className="text-white/30">—</span>
          <span className="text-white/40">Step 1 / 1</span>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
          {STEPS[step].title}
        </h2>
        <p className="mb-1 text-sm font-medium text-violet-300 sm:text-base">
          {STEPS[step].subtitle}
        </p>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
          {STEPS[step].description}
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BRAIN_TYPES.map((bt) => {
            const isSelected = selected === bt.id;
            const isHovered = hovered === bt.id;
            return (
              <button
                key={bt.id}
                onMouseEnter={() => setHovered(bt.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleSelect(bt.id)}
                className={`
                  group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300
                  ${isSelected
                    ? 'border-white/30 bg-white/10 scale-[1.02]'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                  }
                `}
                style={{
                  boxShadow: isSelected ? `0 0 40px ${bt.color}30` : isHovered ? `0 0 30px ${bt.color}15` : 'none',
                }}
              >
                {isSelected && (
                  <div
                    className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-black"
                    style={{ backgroundColor: bt.color }}
                  >
                    ✓
                  </div>
                )}
                <div className="mb-2 text-3xl transition-transform group-hover:scale-110">
                  {bt.emoji}
                </div>
                <h3
                  className="mb-1 text-base font-semibold transition-colors"
                  style={{ color: isSelected ? bt.color : '#fff' }}
                >
                  {bt.name}
                </h3>
                <p className="text-xs text-white/50">{bt.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {bt.traits.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-white/50"
                    >
                      {t.split('，')[0].split('、')[0]}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {activeBrainType && (
          <div
            className="mt-6 rounded-2xl border p-4 sm:p-5 transition-all duration-300"
            style={{
              borderColor: `${activeBrainType.color}40`,
              backgroundColor: `${activeBrainType.color}08`,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-2xl"
                style={{ backgroundColor: `${activeBrainType.color}20` }}
              >
                {activeBrainType.emoji}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <h4 className="text-lg font-semibold text-white">
                    {activeBrainType.name}
                  </h4>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: `${activeBrainType.color}20`,
                      color: activeBrainType.color,
                    }}
                  >
                    {activeBrainType.shortName}
                  </span>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-white/70">
                  {activeBrainType.description}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <Zap size={14} className="mt-0.5 shrink-0 text-amber-400" />
                    <div>
                      <div className="text-[11px] font-semibold text-amber-300">初始值偏移</div>
                      <div className="text-[11px] text-white/50">
                        DA {activeBrainType.baselineOffsets.dopamine > 0 ? '+' : ''}
                        {activeBrainType.baselineOffsets.dopamine} · 压力{' '}
                        {activeBrainType.baselineOffsets.stress > 0 ? '+' : ''}
                        {activeBrainType.baselineOffsets.stress} · 注意力{' '}
                        {activeBrainType.baselineOffsets.attention > 0 ? '+' : ''}
                        {activeBrainType.baselineOffsets.attention} · 疲劳{' '}
                        {activeBrainType.baselineOffsets.fatigue > 0 ? '+' : ''}
                        {activeBrainType.baselineOffsets.fatigue}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Activity size={14} className="mt-0.5 shrink-0 text-cyan-400" />
                    <div>
                      <div className="text-[11px] font-semibold text-cyan-300">衰减速率系数</div>
                      <div className="text-[11px] text-white/50">
                        DA ×{activeBrainType.decayMultipliers.dopamine} · 压力 ×
                        {activeBrainType.decayMultipliers.stress} · 注意力 ×
                        {activeBrainType.decayMultipliers.attention} · 疲劳 ×
                        {activeBrainType.decayMultipliers.fatigue}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          {showCloseButton && (
            <button
              onClick={onClose}
              className="
                inline-flex items-center gap-1.5 rounded-full border border-white/10
                bg-white/[0.04] px-5 py-2 text-sm font-medium text-white/70
                transition hover:bg-white/10 hover:text-white
              "
            >
              取消
            </button>
          )}
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="
              inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-semibold text-black
              transition-all duration-200
              disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30
              bg-gradient-to-r from-violet-400 to-pink-400 hover:from-violet-300 hover:to-pink-300
              hover:shadow-lg hover:shadow-violet-500/25 active:scale-95
            "
          >
            <Sparkles size={16} />
            确认并开始模拟
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
