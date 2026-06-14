import { useState } from 'react';
import type { Behavior } from '../types';
import { useSimulator } from '../hooks/useSimulator';

interface BehaviorButtonProps {
  behavior: Behavior;
}

export function BehaviorButton({ behavior }: BehaviorButtonProps) {
  const applyBehavior = useSimulator((s) => s.applyBehavior);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    applyBehavior(behavior);
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group relative flex flex-col items-center justify-center gap-1.5 rounded-2xl
        border border-white/10 bg-white/[0.04] p-4
        transition-all duration-200 ease-out
        hover:border-white/20 hover:bg-white/[0.08] hover:shadow-lg
        active:scale-95
        ${isPressed ? 'scale-95' : ''}
      `}
    >
      <div className="text-3xl transition-transform duration-200 group-hover:scale-110">
        {behavior.emoji}
      </div>
      <div className="text-sm font-medium text-white/90">{behavior.name}</div>
      <div className="text-xs text-white/40">{behavior.description}</div>
      <div
        className={`
          pointer-events-none absolute inset-0 rounded-2xl opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        `}
        style={{
          background:
            'radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
        }}
      />
    </button>
  );
}
