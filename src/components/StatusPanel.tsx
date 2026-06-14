import { useSimulator } from '../hooks/useSimulator';
import { METRIC_CONFIGS } from '../config/modes';
import { StatusBar } from './StatusBar';

export function StatusPanel() {
  const metrics = useSimulator((s) => s.metrics);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white/90">
        <span className="text-lg">📊</span>
        神经状态
      </h2>
      <div className="space-y-4">
        {METRIC_CONFIGS.map((config) => (
          <StatusBar key={config.key} config={config} value={metrics[config.key]} />
        ))}
      </div>
    </div>
  );
}
