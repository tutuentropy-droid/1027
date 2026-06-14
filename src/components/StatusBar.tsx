import type { MetricConfig } from '../types';

interface StatusBarProps {
  config: MetricConfig;
  value: number;
}

export function StatusBar({ config, value }: StatusBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{config.emoji}</span>
          <span className="text-sm font-medium text-white/90">{config.name}</span>
          <span className="text-xs text-white/40">({config.description})</span>
        </div>
        <span className="text-sm font-mono text-white/80 tabular-nums">{value}</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-700 ease-out`}
          style={{ width: `${value}%` }}
        >
          <div className="h-full w-full animate-pulse bg-white/20" />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center px-1">
          {[25, 50, 75].map((tick) => (
            <div
              key={tick}
              className="absolute h-1.5 w-px bg-white/20"
              style={{ left: `${tick}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
