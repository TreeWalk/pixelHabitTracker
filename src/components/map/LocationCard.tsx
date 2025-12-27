import { Location } from '@/lib/types';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="location-details retro-border-sm p-3!">
      <div className="corner-bl" />
      <div className="corner-br" />

      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-bold uppercase" style={{ color: 'var(--pixel-border)' }}>
          {location.name}
        </h3>
        <div className="text-white text-[10px] px-2 py-0.5 font-bold" style={{ background: 'var(--pixel-blue)' }}>
          ZONE {location.id}
        </div>
      </div>

      <p className="text-sm font-bold leading-tight" style={{ color: 'var(--pixel-wood-dark)' }}>
        {location.desc}
      </p>

      {location.unlocked ? (
        <button className="btn-primary mt-3 py-1.5! text-sm! btn-press">
          CONFIRM TRAVEL
        </button>
      ) : (
        <div className="mt-3 text-center text-red-500 text-xs font-bold border-2 border-red-200 bg-red-50 py-1">
          LOCKED
        </div>
      )}
    </div>
  );
}
