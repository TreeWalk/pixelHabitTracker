'use client';

import { useMemo, useState } from 'react';
import { Plus, ScrollText } from 'lucide-react';
import { useQuests } from '@/context/QuestContext';
import { QuestCard } from './QuestCard';
import { QuestLogModal } from './QuestLogModal';

interface QuestsViewProps {
  onOpenModal: () => void;
}

export function QuestsView({ onOpenModal }: QuestsViewProps) {
  const { quests, questLog, toggleQuest } = useQuests();
  const [isLogOpen, setIsLogOpen] = useState(false);

  // Sort quests: incomplete first, completed last
  const sortedQuests = useMemo(() => {
    return [...quests].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  }, [quests]);

  return (
    <>
      {/* Section Header */}
      <div className="section-header flex justify-between items-end">
        <div>
          <h2 className="section-title text-shadow-retro">DAILY QUESTS</h2>
          <p className="section-subtitle">Lvl 5. Freelancer</p>
        </div>
        <button
          onClick={() => setIsLogOpen(true)}
          className="btn-primary btn-press !w-20 py-2 flex flex-col items-center justify-center gap-0.5"
          title="View Quest Log"
        >
          <ScrollText className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-xs font-bold leading-none">LOG</span>
        </button>
      </div>

      {/* Quest List */}
      <div className="space-y-4">
        {sortedQuests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} onToggle={() => toggleQuest(quest.id)} />
        ))}
      </div>

      {/* Floating Add Button */}
      <button onClick={onOpenModal} className="fab retro-border btn-press">
        <Plus className="w-10 h-10" strokeWidth={4} />
      </button>

      {/* Quest Log Modal */}
      <QuestLogModal
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        questLog={questLog}
      />
    </>
  );
}
