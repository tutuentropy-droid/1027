import { useSimulator } from '../hooks/useSimulator';
import { getBrainTypeById } from '../config/brainTypes';
import { Sun, RotateCcw, Clock, Brain } from 'lucide-react';
import type { TimeSkipDuration } from '../types';

interface Props {
  onOpenSelector: () => void;
}

const TIME_SKIP_OPTIONS: { hours: TimeSkipDuration; label: string }[] = [
  { hours: 1, label: '+1h' },
  { hours: 6, label: '+6h' },
  { hours: 24, label: '+24h' },
];

function formatHour(hour: number): string {
  return `${hour.toString().padStart(2, '0')}:00`;
}

function getTimeEmoji(hour: number): string {
  if (hour >= 5 && hour < 8) return '🌅';
  if (hour >= 8 && hour < 12) return '☀️';
  if (hour >= 12 && hour < 14) return '🌤️';
  if (hour >= 14 && hour < 18) return '🌞';
  if (hour >= 18 && hour < 21) return '🌆';
  return '🌙';
}

export function ControlBar({ onOpenSelector }: Props) {
  const time = useSimulator((s) => s.time);
  const brainTypeId = useSimulator((s) => s.brainTypeId);
  const nextDay = useSimulator((s) => s.nextDay);
  const timeSkip = useSimulator((s) => s.timeSkip);
  const reset = useSimulator((s) => s.reset);

  const brainType = getBrainTypeById(brainTypeId);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <span className="text-sm text-white/70">第</span>
          <span className="rounded-full bg-violet-500/20 px-3 py-1 text-sm font-semibold text-violet-300">
            {time.day} 天
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{getTimeEmoji(time.hour)}</span>
          <span className="text-sm text-white/70">时间</span>
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-300">
            {formatHour(time.hour)}
          </span>
        </div>
        {brainType && (
          <button
            onClick={onOpenSelector}
            className="
              flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-all
              hover:brightness-110 active:scale-95
            "
            style={{
              borderColor: `${brainType.color}40`,
              backgroundColor: `${brainType.color}12`,
              color: brainType.color,
            }}
          >
            <Brain size={14} />
            <span>{brainType.emoji}</span>
            <span>{brainType.shortName}</span>
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {TIME_SKIP_OPTIONS.map((opt) => (
            <button
              key={opt.hours}
              onClick={() => timeSkip(opt.hours)}
              className="
                inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-white/85
                transition-all duration-200
                hover:bg-cyan-400/20 hover:text-cyan-300
                active:scale-95
              "
            >
              <Clock size={14} />
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={nextDay}
          className="
            inline-flex items-center gap-1.5 rounded-full border border-white/10
            bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/85
            transition-all duration-200
            hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300
            active:scale-95
          "
        >
          <Sun size={16} />
          新的一天
        </button>
        <button
          onClick={reset}
          className="
            inline-flex items-center gap-1.5 rounded-full border border-white/10
            bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/85
            transition-all duration-200
            hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-300
            active:scale-95
          "
        >
          <RotateCcw size={16} />
          重置模拟
        </button>
      </div>
    </div>
  );
}
