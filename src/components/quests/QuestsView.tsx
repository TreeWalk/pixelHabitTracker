'use client';

import { Plus } from 'lucide-react';
import { useQuests } from '@/context/QuestContext';
import { QuestCard } from './QuestCard';

interface QuestsViewProps {
  onOpenModal: () => void;
}

export function QuestsView({ onOpenModal }: QuestsViewProps) {
  const { quests, totalGold, toggleQuest } = useQuests();

  return (
    <>
      {/* Section Header */}
      <div className="section-header flex justify-between items-end">
        <div>
          <h2 className="section-title text-shadow-retro">DAILY QUESTS</h2>
          <p className="section-subtitle">Lvl 5. Freelancer</p>
        </div>
        <div className="gold-badge retro-border-sm">
          <span className="text-xl">💰</span>
          <span className="font-bold text-2xl" style={{ color: 'var(--pixel-border)' }}>
            {totalGold} G
          </span>
        </div>
      </div>

      {/* Quest List */}
      <div className="space-y-4">
        {quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} onToggle={() => toggleQuest(quest.id)} />
        ))}
      </div>

      {/* Floating Add Button */}
      <button onClick={onOpenModal} className="fab retro-border btn-press">
        <Plus className="w-10 h-10" strokeWidth={4} />
      </button>
    </>
  );
}
