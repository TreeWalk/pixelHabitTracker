import { Check } from 'lucide-react';
import { Quest } from '@/lib/types';
import { QuestTypeIcon } from '@/components/common/QuestTypeIcon';

interface QuestCardProps {
  quest: Quest;
  onToggle: () => void;
}

export function QuestCard({ quest, onToggle }: QuestCardProps) {
  return (
    <div
      onClick={onToggle}
      className={`quest-card retro-border ${quest.completed ? 'completed' : ''}`}
    >
      <div className="corner-bl" />
      <div className="corner-br" />

      <div className="flex items-center justify-between pl-2">
        <div className="flex items-center gap-4">
          <div className={`pixel-checkbox ${quest.completed ? 'checked' : ''}`}>
            {quest.completed && <Check className="w-8 h-8 text-white" strokeWidth={4} />}
          </div>

          <div>
            <h3
              className={`text-2xl font-bold ${quest.completed ? 'line-through' : ''}`}
              style={{ color: quest.completed ? 'var(--pixel-green)' : 'var(--pixel-border)' }}
            >
              {quest.title}
            </h3>
            <div className="flex items-center gap-2 text-sm mt-1">
              <div className="type-badge">
                <QuestTypeIcon type={quest.type} />
                <span>{quest.type}</span>
              </div>
              <span className="xp-badge">+{quest.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Pixel Heart Image */}
        <img
          src="/image/heart.png"
          alt="heart"
          className="w-8 h-8"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}
