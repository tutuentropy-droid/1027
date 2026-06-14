import { useSimulator } from '../hooks/useSimulator';
import { getModeById } from '../config/modes';

export function ModeDisplay() {
  const currentMode = useSimulator((s) => s.currentMode);
  const mode = getModeById(currentMode);

  if (!mode) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
        <div className="text-center text-white/60">状态波动中...</div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border p-5 backdrop-blur-sm transition-all duration-500"
      style={{
        borderColor: `${mode.color}55`,
        backgroundColor: `${mode.color}10`,
        boxShadow: `0 0 40px ${mode.color}22`,
      }}
    >
      <div className="text-center">
        <div className="mb-2 text-5xl transition-all duration-500">{mode.emoji}</div>
        <h2
          className="mb-2 text-xl font-bold transition-colors duration-500"
          style={{ color: mode.color }}
        >
          {mode.name}
        </h2>
        <p className="text-sm leading-relaxed text-white/70">{mode.description}</p>
      </div>
    </div>
  );
}
