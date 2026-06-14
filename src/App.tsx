import { useState, useEffect } from 'react';
import { StatusPanel } from './components/StatusPanel';
import { ModeDisplay } from './components/ModeDisplay';
import { BehaviorGrid } from './components/BehaviorGrid';
import { ActionLog } from './components/ActionLog';
import { ControlBar } from './components/ControlBar';
import { BrainTypeSelector } from './components/BrainTypeSelector';
import { NeuroReport } from './components/NeuroReport';
import { useSimulator } from './hooks/useSimulator';

function App() {
  const brainTypeId = useSimulator((s) => s.brainTypeId);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    if (!brainTypeId) {
      setShowSelector(true);
    }
  }, [brainTypeId]);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white text-glow-violet sm:text-4xl">
            🧠 神经奖励系统模拟器
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/50 sm:text-base">
            通过模拟日常行为，观察多巴胺、压力值、注意力、疲劳值的动态变化，理解你的大脑状态
          </p>
        </header>

        <div className="mb-6">
          <ControlBar onOpenSelector={() => setShowSelector(true)} />
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <ModeDisplay />
            <StatusPanel />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <BehaviorGrid />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <NeuroReport />
            <div className="h-full lg:max-h-[calc(100vh-700px)]">
              <ActionLog />
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-xs text-white/30">
          数据仅供模拟参考 · 神经科学科普向交互实验
        </footer>
      </div>

      {showSelector && (
        <BrainTypeSelector
          onClose={() => setShowSelector(false)}
          showCloseButton={!!brainTypeId}
        />
      )}
    </div>
  );
}

export default App;
