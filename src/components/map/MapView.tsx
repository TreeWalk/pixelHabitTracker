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
    type: "Skill",
    desc: "Level up your career skills.",
    unlocked: true,
    size: "w-36",
    width: "150px"
  },
];

export function MapView() {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedId, setSelectedId] = useState(1);
  const [records, setRecords] = useState<Record<number, { id: string, text: string, date: string }[]>>({});
  const [inputText, setInputText] = useState('');

  const selected = locations.find(l => l.id === selectedId);

  const handleAddRecord = () => {
    if (!inputText.trim()) return;
    const newRecord = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputText,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setRecords(prev => ({
      ...prev,
      [selectedId]: [newRecord, ...(prev[selectedId] || [])]
    }));
    setInputText('');
  };

  if (viewMode === 'detail' && selected) {
    return (
      <div className="h-full w-full flex flex-col animate-in fade-in slide-in-from-right duration-300">
        {/* Detail Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setViewMode('list')}
            className="btn-primary py-1 px-4! text-sm! w-auto! btn-press flex items-center gap-2"
          >
            <span>←</span> BACK
          </button>
          <div className="text-right">
            <h2 className="text-xl font-bold uppercase tracking-tighter text-shadow-retro line-clamp-1">
              {selected.name}
            </h2>
            <p className="text-[10px] text-yellow-600 font-bold tracking-widest leading-none">
              {selected.type.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Banner Section */}
        <div
          className="w-full h-48 retro-border-sm overflow-hidden mb-6"
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

        {/* Journal Section */}
        <div className="flex-1 flex flex-col min-h-0 bg-white/50 retro-border-sm p-4!">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-4 bg-yellow-400" />
            ADVENTURE LOG
          </h3>

          {/* Record Input */}
          <div className="mb-4 space-y-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="What happened here today?"
              className="w-full h-20 p-3 text-sm bg-white retro-border-sm focus:outline-none focus:ring-2 ring-yellow-400 placeholder:opacity-50 resize-none font-pixel"
            />
            <button
              onClick={handleAddRecord}
              className="btn-primary py-2! text-sm! btn-press bg-yellow-400!"
            >
              LOG ENTRY
            </button>
          </div>

          {/* Record List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {(records[selectedId] || []).length > 0 ? (
              records[selectedId].map(rec => (
                <div key={rec.id} className="bg-white p-3 retro-border-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] bg-blue-100 px-2 py-0.5 font-bold text-blue-600">
                      {rec.date}
                    </span>
                  </div>
                  <p className="text-sm font-bold leading-snug break-words">
                    {rec.text}
                  </p>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 grayscale italic text-sm">
                <p>No records yet...</p>
                <p>Start your legend.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col animate-in fade-in duration-300">
      {/* Map Header */}
      <div className="section-header">
        <h2 className="section-title text-shadow-retro uppercase">World Map</h2>
        <p className="section-subtitle">Select a destination to explore</p>
      </div>

      {/* Building List Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-4">
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
                <div className="p-2 bg-black/40 retro-border-sm backdrop-blur-sm">
                  <img
                    src={loc.icon}
                    alt={loc.name}
                    className="w-14 h-14 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
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
