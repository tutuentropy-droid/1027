import { useSimulator } from '../hooks/useSimulator';
import { Sun, RotateCcw } from 'lucide-react';

export function ControlBar() {
  const day = useSimulator((s) => s.day);
  const nextDay = useSimulator((s) => s.nextDay);
  const reset = useSimulator((s) => s.reset);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg">📅</span>
        <span className="text-sm text-white/70">当前</span>
        <span className="rounded-full bg-violet-500/20 px-3 py-1 text-sm font-semibold text-violet-300">
          第 {day} 天
        </span>
      </div>
      <div className="flex items-center gap-2">
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
