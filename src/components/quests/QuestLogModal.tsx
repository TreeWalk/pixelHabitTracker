'use client';

import { useState, useMemo } from 'react';
import { X, ScrollText, Calendar } from 'lucide-react';
import { QuestLog } from '@/lib/types';
import { QuestTypeIcon } from '@/components/common/QuestTypeIcon';
import { PixelCalendar } from '@/components/common/PixelCalendar';

interface QuestLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  questLog: QuestLog[];
}

export function QuestLogModal({ isOpen, onClose, questLog }: QuestLogModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Get dates that have logs
  const highlightedDates = useMemo(() => {
    return questLog.map(log => new Date(log.completedAt));
  }, [questLog]);

  // Filter logs by selected date
  const filteredLogs = useMemo(() => {
    if (!selectedDate) return questLog;

    return questLog.filter(log => {
      const logDate = new Date(log.completedAt);
      return (
        logDate.getDate() === selectedDate.getDate() &&
        logDate.getMonth() === selectedDate.getMonth() &&
        logDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [questLog, selectedDate]);

  if (!isOpen) return null;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const clearFilter = () => {
    setSelectedDate(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content retro-border animate-bob" style={{ maxWidth: '600px', maxHeight: '85vh' }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <ScrollText className="w-6 h-6" />
            <h3>QUEST LOG</h3>
          </div>
          <button onClick={onClose} className="text-white hover:text-red-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Calendar Toggle & Filter Info */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className={`btn-primary btn-press px-3 py-2 text-sm flex items-center gap-2 ${showCalendar ? 'bg-amber-300' : ''}`}
            >
              <Calendar className="w-4 h-4" />
              {showCalendar ? 'HIDE' : 'SHOW'} CALENDAR
            </button>

            {selectedDate && (
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-bold" style={{ color: 'var(--pixel-accent)' }}>
                  Showing: {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <button
                  onClick={clearFilter}
                  className="text-xs px-2 py-1 border-2 hover:bg-red-100"
                  style={{ borderColor: 'var(--pixel-red)', color: 'var(--pixel-red)' }}
                >
                  CLEAR
                </button>
              </div>
            )}
          </div>

          {/* Calendar */}
          {showCalendar && (
            <div className="animate-bob">
              <PixelCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                highlightedDates={highlightedDates}
              />
            </div>
          )}

          {/* Log Content */}
          <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '40vh' }}>
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xl font-bold" style={{ color: 'var(--pixel-accent)' }}>
                  {selectedDate ? 'No quests completed on this date!' : 'No quests completed yet!'}
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--pixel-accent)' }}>
                  {selectedDate ? 'Try selecting another date.' : 'Complete some quests to see them here.'}
                </p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="retro-border bg-white p-3 hover:bg-amber-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="type-badge">
                        <QuestTypeIcon type={log.questType} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold" style={{ color: 'var(--pixel-border)' }}>
                          {log.questTitle}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="xp-badge text-xs">+{log.xp} XP</span>
                          <span className="text-xs" style={{ color: 'var(--pixel-accent)' }}>
                            {formatDate(log.completedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl">✓</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Stats */}
          {filteredLogs.length > 0 && (
            <div className="p-3 border-t-4 bg-amber-50" style={{ borderColor: 'var(--pixel-border)' }}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm" style={{ color: 'var(--pixel-accent)' }}>
                  {selectedDate ? 'Day Total' : 'All-Time Total'}
                </span>
                <span className="text-lg font-bold" style={{ color: 'var(--pixel-border)' }}>
                  {filteredLogs.length} Quests
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="font-bold text-sm" style={{ color: 'var(--pixel-accent)' }}>
                  XP Earned
                </span>
                <span className="text-lg font-bold" style={{ color: 'var(--pixel-green)' }}>
                  {filteredLogs.reduce((sum, log) => sum + log.xp, 0)} XP
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
