import { useState } from 'react';
import type { EncyclopediaTopic } from '../config/encyclopedia';
import {
  TOPIC_META,
  TOPIC_ORDER,
  getEntriesByTopic,
  ENCYCLOPEDIA_ENTRIES,
} from '../config/encyclopedia';
import { BookOpen, ChevronRight, Grid3X3 } from 'lucide-react';

interface Props {
  onOpenEntry: (id: string) => void;
}

const TYPE_ICON = {
  neurotransmitter: '🧪',
  brain_region: '🧠',
  system: '🕸️',
  concept: '💡',
} as const;

export function NeuroEncyclopedia({ onOpenEntry }: Props) {
  const [activeTopic, setActiveTopic] = useState<EncyclopediaTopic | 'all'>('all');

  const entries = activeTopic === 'all'
    ? ENCYCLOPEDIA_ENTRIES
    : getEntriesByTopic(activeTopic);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white/90">
            <BookOpen size={18} className="text-amber-400" />
            神经系统百科
          </h2>
          <p className="text-[11px] text-white/40">
            点击条目学习背后的神经科学知识 · 共 {ENCYCLOPEDIA_ENTRIES.length} 个词条
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <TopicTab
          label="全部"
          emoji={<Grid3X3 size={12} />}
          active={activeTopic === 'all'}
          color="#94a3b8"
          onClick={() => setActiveTopic('all')}
        />
        {TOPIC_ORDER.map((t) => {
          const meta = TOPIC_META[t];
          const count = getEntriesByTopic(t).length;
          return (
            <TopicTab
              key={t}
              label={`${meta.name} ${count}`}
              emoji={meta.emoji}
              active={activeTopic === t}
              color={meta.color}
              onClick={() => setActiveTopic(t)}
            />
          );
        })}
      </div>

      {activeTopic !== 'all' && (
        <div
          className="mb-3 rounded-lg border p-2.5 text-[11px] leading-relaxed"
          style={{
            borderColor: `${TOPIC_META[activeTopic].color}25`,
            backgroundColor: `${TOPIC_META[activeTopic].color}0a`,
            color: `${TOPIC_META[activeTopic].color}cc`,
          }}
        >
          {TOPIC_META[activeTopic].description}
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {entries.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onOpenEntry(entry.id)}
            className="group relative rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.05]"
            style={{
              boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset',
            }}
          >
            <div
              className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, ${entry.color}10 0%, transparent 60%)`,
              }}
            />
            <div className="relative flex items-start gap-2.5">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: `${entry.color}15`,
                  border: `1px solid ${entry.color}30`,
                }}
              >
                {entry.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-1.5">
                  <span className="truncate text-[12px] font-semibold text-white/85 group-hover:text-white">
                    {entry.title}
                  </span>
                  <ChevronRight
                    size={12}
                    className="shrink-0 text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-white/60"
                  />
                </div>
                <div className="mb-1 flex flex-wrap items-center gap-1">
                  <span className="rounded-md px-1.5 py-px text-[9px] font-medium text-white/40 bg-white/5">
                    {TYPE_ICON[entry.type]} {entry.type === 'neurotransmitter' ? '神经递质' : entry.type === 'brain_region' ? '脑区' : entry.type === 'system' ? '系统' : '概念'}
                  </span>
                </div>
                <p className="line-clamp-2 text-[10px] leading-relaxed text-white/40 group-hover:text-white/55">
                  {entry.summary}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 border-t border-white/5 pt-3 text-center text-[9px] text-white/25">
        💡 提示：在神经报告中点击任意状态也可快速打开对应知识卡片
      </div>
    </div>
  );
}

function TopicTab({
  label,
  emoji,
  active,
  color,
  onClick,
}: {
  label: string;
  emoji: React.ReactNode | string;
  active: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all"
      style={{
        backgroundColor: active ? `${color}18` : 'transparent',
        borderColor: active ? `${color}50` : 'rgba(255,255,255,0.06)',
        color: active ? color : 'rgba(255,255,255,0.5)',
      }}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
