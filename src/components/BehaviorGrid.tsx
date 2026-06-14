import { BEHAVIORS, CATEGORY_LABELS } from '../config/behaviors';
import type { BehaviorCategory } from '../types';
import { BehaviorButton } from './BehaviorButton';

const CATEGORY_ORDER: BehaviorCategory[] = [
  'entertainment',
  'growth',
  'physiology',
  'social',
];

export function BehaviorGrid() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white/90">
        <span className="text-lg">🎬</span>
        选择行为
      </h2>
      <div className="space-y-4">
        {CATEGORY_ORDER.map((category) => {
          const behaviors = BEHAVIORS.filter((b) => b.category === category);
          if (behaviors.length === 0) return null;
          return (
            <div key={category}>
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
                {CATEGORY_LABELS[category]}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {behaviors.map((behavior) => (
                  <BehaviorButton key={behavior.id} behavior={behavior} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
