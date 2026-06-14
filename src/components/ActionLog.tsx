import { useSimulator } from '../hooks/useSimulator';
import type { MetricType } from '../types';
import { METRIC_CONFIGS } from '../config/modes';

const METRIC_EMOJI_MAP: Record<MetricType, string> = {
  dopamine: '🧠',
  stress: '💢',
  attention: '✨',
  fatigue: '⚡',
};

function formatHour(hour: number): string {
  return `${hour.toString().padStart(2, '0')}:00`;
}

export function ActionLog() {
  const logs = useSimulator((s) => s.logs);

  return (
    <div className="flex h-full min-h-[300px] flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white/90">
        <span className="text-lg">📝</span>
        行为日志
      </h2>
      {logs.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-sm text-white/40">
          暂无记录，点击行为按钮开始模拟
        </div>
      ) : (
        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`
                rounded-xl border p-3 transition-colors
                ${log.isDayTransition
                  ? 'border-amber-500/20 bg-amber-500/[0.05] hover:bg-amber-500/[0.08]'
                  : log.isTimeSkip
                  ? 'border-cyan-500/20 bg-cyan-500/[0.05] hover:bg-cyan-500/[0.08]'
                  : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                }
              `}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{log.behaviorEmoji}</span>
                  <span className={`text-sm font-medium ${
                    log.isDayTransition
                      ? 'text-amber-300'
                      : log.isTimeSkip
                      ? 'text-cyan-300'
                      : 'text-white/85'
                  }`}>
                    {log.behaviorName}
                  </span>
                  {log.isDayTransition && (
                    <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-400">
                      日切
                    </span>
                  )}
                  {log.isTimeSkip && (
                    <span className="rounded-full bg-cyan-500/15 px-1.5 py-0.5 text-[10px] text-cyan-400">
                      +{log.timeSkipHours}h
                    </span>
                  )}
                </div>
                <span className="text-xs text-white/30">
                  D{log.day} {formatHour(log.hour)}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {METRIC_CONFIGS.map((mc) => {
                  const delta = log.effect[mc.key];
                  if (delta === undefined || delta === 0) return null;
                  const positive = delta > 0;
                  return (
                    <span
                      key={mc.key}
                      className={`
                        inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs
                        ${positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}
                      `}
                    >
                      <span>{METRIC_EMOJI_MAP[mc.key]}</span>
                      <span>
                        {positive ? '+' : ''}
                        {delta}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
