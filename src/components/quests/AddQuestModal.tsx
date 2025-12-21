'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Quest, QuestType } from '@/lib/types';
import { QuestTypeIcon } from '@/components/common/QuestTypeIcon';

interface AddQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (quest: Omit<Quest, 'id' | 'completed'>) => void;
}

const questTypes: QuestType[] = ['Health', 'Intellect', 'Strength', 'Spirit', 'Skill'];

export function AddQuestModal({ isOpen, onClose, onAdd }: AddQuestModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<QuestType>('Health');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title, xp: 50, type });
    setTitle('');
    setType('Health');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content retro-border animate-bob">
        {/* Modal Header */}
        <div className="modal-header">
          <h3>NEW QUEST</h3>
          <button onClick={onClose} className="text-white hover:text-red-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-bold uppercase mb-1" style={{ color: 'var(--pixel-accent)' }}>
              Mission Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-4 p-2 font-pixel text-xl outline-none focus:bg-amber-50"
              style={{ borderColor: 'var(--pixel-border)' }}
              placeholder="e.g. Save the Princess"
              autoFocus
            />
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-bold uppercase mb-1" style={{ color: 'var(--pixel-accent)' }}>
              Class
            </label>
            <div className="flex justify-between gap-1">
              {questTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 p-2 border-2 flex items-center justify-center transition-all ${
                    type === t
                      ? 'bg-amber-200 border-[var(--pixel-border)] translate-y-[2px]'
                      : 'border-transparent hover:bg-slate-200 border-b-2 border-slate-300'
                  }`}
                  title={t}
                >
                  <QuestTypeIcon type={t} />
                </button>
              ))}
            </div>
            <div className="text-center mt-1 text-sm text-slate-500 font-bold uppercase">{type}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 btn-primary btn-success btn-press py-3 text-xl"
            >
              ACCEPT
            </button>
            <button
              onClick={onClose}
              className="flex-1 btn-primary btn-danger btn-press py-3 text-xl"
            >
              FLEE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
