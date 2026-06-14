import { useEffect } from 'react';
import type { EncyclopediaEntry } from '../config/encyclopedia';
import { getEntryById, TOPIC_META } from '../config/encyclopedia';
import { X, BookOpen, Cpu, Lightbulb, Stethoscope, Network, ArrowRight } from 'lucide-react';

const TYPE_META = {
  neurotransmitter: { label: '神经递质', icon: '🧪' },
  brain_region: { label: '脑区', icon: '🧠' },
  system: { label: '神经系统', icon: '🕸️' },
  concept: { label: '科学概念', icon: '💡' },
} as const;

interface Props {
  entryId: string | null;
  onClose: () => void;
  onSelectEntry: (id: string) => void;
}

export function EncyclopediaModal({ entryId, onClose, onSelectEntry }: Props) {
  const entry = entryId ? getEntryById(entryId) : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!entry) return null;

  const relatedEntries = entry.relatedIds
    .map((id) => getEntryById(id))
    .filter((e): e is EncyclopediaEntry => !!e);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0b1020] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 25px 50px -12px ${entry.color}30`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white/80"
        >
          <X size={18} />
        </button>

        <div className="mb-6 flex items-start gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
            style={{
              backgroundColor: `${entry.color}18`,
              border: `1px solid ${entry.color}40`,
            }}
          >
            {entry.emoji}
          </div>
          <div className="flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${entry.color}18`,
                  color: entry.color,
                  border: `1px solid ${entry.color}30`,
                }}
              >
                {TYPE_META[entry.type].icon} {TYPE_META[entry.type].label}
              </span>
              {entry.topics.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${TOPIC_META[t].color}14`,
                    color: TOPIC_META[t].color,
                    border: `1px solid ${TOPIC_META[t].color}30`,
                  }}
                >
                  {TOPIC_META[t].emoji} {TOPIC_META[t].name}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{entry.title}</h2>
            <p className="mt-0.5 text-xs text-white/40">{entry.subtitle}</p>
          </div>
        </div>

        <div
          className="mb-6 rounded-xl border p-4"
          style={{
            borderColor: `${entry.color}25`,
            backgroundColor: `${entry.color}0a`,
          }}
        >
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold" style={{ color: entry.color }}>
            <BookOpen size={13} />
            概述
          </div>
          <p className="text-sm leading-relaxed text-white/75">{entry.summary}</p>
        </div>

        <div className="space-y-5">
          <Section
            color={entry.color}
            icon={<Network size={14} />}
            title="主要功能"
            content={entry.function}
          />
          <Section
            color={entry.color}
            icon={<Cpu size={14} />}
            title="作用机制"
            content={entry.mechanism}
          />
          <Section
            color={entry.color}
            icon={<Stethoscope size={14} />}
            title="临床意义"
            content={entry.clinical}
          />

          <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
            <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Lightbulb size={14} />
              有趣的事实
            </div>
            <ul className="space-y-1.5">
              {entry.funFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-white/70">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/60" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {relatedEntries.length > 0 && (
          <div className="mt-6 border-t border-white/5 pt-5">
            <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              <Network size={12} />
              相关条目 · 点击探索
            </div>
            <div className="flex flex-wrap gap-2">
              {relatedEntries.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => onSelectEntry(rel.id)}
                  className="group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition"
                  style={{
                    borderColor: `${rel.color}30`,
                    backgroundColor: `${rel.color}0a`,
                  }}
                >
                  <span>{rel.emoji}</span>
                  <span className="text-white/75 group-hover:text-white">{rel.title}</span>
                  <ArrowRight size={11} className="text-white/30 group-hover:text-white/60" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] text-white/25">
          <span>神经科学科普向 · 仅供参考</span>
          <span>按 ESC 关闭</span>
        </div>
      </div>
    </div>
  );
}

function Section({
  color,
  icon,
  title,
  content,
}: {
  color: string;
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold" style={{ color }}>
        {icon}
        {title}
      </div>
      <p className="text-sm leading-relaxed text-white/65">{content}</p>
    </div>
  );
}
