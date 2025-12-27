'use client';

import { useState } from 'react';
import { Location } from '@/lib/types';
import { LocationCard } from './LocationCard';

const locations: Location[] = [
  {
    id: 1,
    name: "Home Base",
    x: 74,
    y: 22,
    icon: "/image/home.png",
    banner: "/buildings/homeLong.png",
    type: "Rest",
    desc: "Safe zone. Recover HP here.",
    unlocked: true,
    size: "w-40",
    width: "152px"
  },
  {
    id: 2,
    name: "Gym",
    x: 70,
    y: 70,
    icon: "/image/gyn.png",
    banner: "/buildings/gymLong.png",
    type: "Strength",
    desc: "Train your strength stats.",
    unlocked: true,
    size: "w-32",
    width: "135px"
  },
  {
    id: 3,
    name: "Library",
    x: 26,
    y: 72,
    icon: "/image/library.png",
    banner: "/buildings/libraryLongMorning.png",
    type: "Intellect",
    desc: "Ancient knowledge lies here.",
    unlocked: true,
    size: "w-48",
    width: "216px"
  },
  {
    id: 4,
    name: "Company",
    x: 26,
    y: 22,
    icon: "/image/company.png",
    banner: "/buildings/companyLongMorning.png",
    type: "Skill",
    desc: "Level up your career skills.",
    unlocked: true,
    size: "w-36",
    width: "150px"
  },
];

import { useLogs } from '@/context/LogContext';

export function MapView() {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedId, setSelectedId] = useState(1);
  const { addLog, getLogs } = useLogs();
  const [inputText, setInputText] = useState('');

  const selected = locations.find(l => l.id === selectedId);

  const handleAddRecord = () => {
    if (!inputText.trim()) return;
    addLog(selectedId, inputText);
    setInputText('');
  };

  const currentLogs = getLogs(selectedId);

  if (viewMode === 'detail' && selected) {
    return (
      <div className="h-full w-full flex flex-col animate-in fade-in slide-in-from-right duration-300 bg-dither">
        {/* Detail Header - Internal Padding */}
        <div className="px-5 pt-8 mb-6 flex items-center justify-between">
          <button
            onClick={() => setViewMode('list')}
            className="btn-primary py-1.5 px-4! text-sm! w-auto! btn-press flex items-center gap-2"
          >
            <span className="text-lg">←</span> BACK
          </button>
          <div className="text-right">
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-shadow-retro line-clamp-1">
              {selected.name}
            </h2>
            <div className="flex justify-end items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              <p className="text-xs text-yellow-600 font-bold tracking-widest uppercase">
                {selected.type}
              </p>
            </div>
          </div>
        </div>

        {/* Banner Section - With side margins */}
        <div className="px-5 mb-6">
          <div
            className="w-full h-44 retro-border-sm overflow-hidden"
            style={{
              backgroundImage: selected.banner ? `url(${selected.banner})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: !selected.banner ? 'var(--pixel-bg-alt)' : 'transparent',
              imageRendering: 'pixelated',
            }}
          >
            {!selected.banner && (
              <div className="w-full h-full flex items-center justify-center opacity-20">
                <img src={selected.icon} className="w-24 h-24 pixelated" />
              </div>
            )}
          </div>
        </div>

        {/* Journal Section - With side margins */}
        <div className="flex-1 flex flex-col min-h-0 px-5 pb-24">
          <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm retro-border-sm p-5!">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-shadow-retro">
              <span className="w-2 h-4 bg-blue-500" />
              ADVENTURE LOG
            </h3>

            {/* Record Input */}
            <div className="mb-6 space-y-3">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="What happened here today?"
                className="w-full h-24 p-4 text-sm bg-white/90 retro-border-sm focus:outline-none ring-2 ring-transparent focus:ring-yellow-400 transition-all placeholder:opacity-50 resize-none font-pixel"
              />
              <button
                onClick={handleAddRecord}
                className="btn-primary py-2.5! text-base! btn-press bg-yellow-400! hover:brightness-105 active:brightness-95 transition-all"
              >
                LOG ENTRY
              </button>
            </div>

            {/* Record List */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
              {currentLogs.length > 0 ? (
                currentLogs.map(rec => (
                  <div key={rec.id} className="bg-white p-4 retro-border-sm border-l-4 border-l-blue-400">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] bg-blue-50 px-2 py-0.5 font-bold text-blue-600 tracking-tighter">
                        LOGGED AT {rec.date}
                      </span>
                    </div>
                    <p className="text-base font-bold leading-tight break-words text-slate-700">
                      {rec.text}
                    </p>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-30 grayscale italic text-sm text-center">
                  <p className="mb-1">No entries recorded...</p>
                  <p>Every step is a story.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col animate-in fade-in duration-300">
      {/* Map Header - Internal Padding added here because parent is p-0 */}
      <div className="section-header px-4 pt-8 mb-6">
        <h2 className="section-title text-shadow-retro uppercase">World Map</h2>
        <p className="section-subtitle">Select a destination to explore</p>
      </div>

      {/* Building List Area - Full Width, Scrollable inside h-full */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 px-4 pb-24">
        {locations.map(loc => (
          <div
            key={loc.id}
            onClick={() => {
              setSelectedId(loc.id);
              setViewMode('detail');
            }}
            className={`
              relative cursor-pointer group transition-all duration-200
              hover:scale-[1.02] active:scale-95
              retro-border-sm overflow-hidden
            `}
            style={{
              height: '140px',
              backgroundColor: 'var(--pixel-wood-light)',
            }}
          >
            {/* Background Banner */}
            <div
              className={`absolute inset-0 transition-transform duration-500 group-hover:scale-110`}
              style={{
                backgroundImage: loc.banner ? `url(${loc.banner})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: !loc.banner ? 'var(--pixel-bg-alt)' : 'transparent',
                imageRendering: 'pixelated',
              }}
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center px-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent">
              <div className="flex items-center space-x-6">
                <img
                  src={loc.icon}
                  alt={loc.name}
                  className="w-16 h-16 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="text-shadow-retro">
                  <h3 className="text-white font-bold text-2xl uppercase tracking-tighter">
                    {loc.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">
                      {loc.type}
                    </span>
                    <span className="w-1 h-1 bg-white/50 rounded-full" />
                    <span className="text-white/70 text-xs font-bold font-mono">MAP UNIT {loc.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tap Indicator */}
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[10px] font-bold tracking-widest animate-pulse">TAP TO ENTER →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
