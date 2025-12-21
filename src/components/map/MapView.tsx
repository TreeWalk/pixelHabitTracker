'use client';

import { useState } from 'react';
import { Location } from '@/lib/types';
import { LocationCard } from './LocationCard';

const locations: Location[] = [
  {
    id: 1,
    name: "Home Base",
    x: 78,
    y: 22,
    icon: "/image/home.png",
    type: "Rest",
    desc: "Safe zone. Recover HP here.",
    unlocked: true,
    size: "w-36 h-36"
  },
  {
    id: 2,
    name: "Gym",
    x: 78,
    y: 78,
    icon: "/image/gyn.png",
    type: "Strength",
    desc: "Train your strength stats.",
    unlocked: true,
    size: "w-36 h-36"
  },
  {
    id: 3,
    name: "Library",
    x: 22,
    y: 78,
    icon: "/image/library.png",
    type: "Intellect",
    desc: "Ancient knowledge lies here.",
    unlocked: true,
    size: "w-36 h-36"
  },
  {
    id: 4,
    name: "Company",
    x: 22,
    y: 22,
    icon: "/image/company.png",
    type: "Skill",
    desc: "Level up your career skills.",
    unlocked: true,
    size: "w-36 h-36"
  },
];

export function MapView() {
  const [selectedLocation, setSelectedLocation] = useState(1);

  const selected = locations.find(l => l.id === selectedLocation);

  return (
    <div className="h-full w-full flex flex-col">
      {/* Map Header */}
      <div className="section-header">
        <h2 className="section-title text-shadow-retro">WORLD MAP</h2>
        <p className="section-subtitle">Select a Zone</p>
      </div>

      {/* Map Area with Background Image */}
      <div
        className="w-full aspect-square relative overflow-hidden mb-4"
        style={{
          backgroundImage: 'url(/image/map.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0',
          border: '4px solid var(--pixel-border)',
          boxShadow: '4px 4px 0px 0px rgba(45, 27, 0, 0.3)',
        }}
      >
        {/* Locations */}
        {locations.map(loc => (
          <div
            key={loc.id}
            onClick={() => setSelectedLocation(loc.id)}
            className="absolute cursor-pointer transition-transform duration-200"
            style={{
              left: `${loc.x}%`,
              top: `${loc.y}%`,
              transform: `translate(-50%, -50%) ${selectedLocation === loc.id ? 'scale(1.2)' : 'scale(1)'}`,
              zIndex: selectedLocation === loc.id ? 10 : 1,
            }}
          >
            <div
              className="relative"
              style={{
                filter: selectedLocation === loc.id ? 'drop-shadow(0 0 8px rgba(255,215,0,0.8))' : 'none',
              }}
            >
              <img
                src={loc.icon}
                alt={loc.name}
                className={`${loc.size} object-contain`}
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Location Details Box */}
      {selected && <LocationCard location={selected} />}
    </div>
  );
}
