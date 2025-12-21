import { Location } from '@/lib/types';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="location-details retro-border-sm">
      <div className="corner-bl" />
      <div className="corner-br" />

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold uppercase" style={{ color: 'var(--pixel-border)' }}>
          {location.name}
        </h3>
        <div className="text-white text-xs px-2 py-1 font-bold" style={{ background: 'var(--pixel-blue)' }}>
          ZONE {location.id}
        </div>
      </div>
      <p className="font-bold leading-tight" style={{ color: 'var(--pixel-wood-dark)' }}>
        {location.desc}
      </p>

      {location.unlocked ? (
        <button className="btn-primary mt-4 btn-press">
          TRAVEL
        </button>
      ) : (
        <div className="mt-4 text-center text-red-500 font-bold border-2 border-red-200 bg-red-50 py-2">
          LOCKED
        </div>
      )}
    </div>
  );
}
