import { CollectionItem } from '@/lib/types';
import { RARITY_COLORS } from '@/lib/constants';

interface ItemDetailProps {
  item: CollectionItem | null;
  onDelete: (id: number) => void;
}

export function ItemDetail({ item, onDelete }: ItemDetailProps) {
  if (!item) {
    return (
      <div className="location-details retro-border-sm flex-1 flex items-center justify-center">
        <p className="text-sm opacity-50" style={{ color: 'var(--pixel-wood-dark)' }}>
          Select an item to view details
        </p>
      </div>
    );
  }

  return (
    <div className="location-details retro-border-sm flex-1">
      <div className="corner-bl" />
      <div className="corner-br" />

      <div className="flex items-start gap-3 mb-2">
        <div
          className="w-16 h-16 flex items-center justify-center p-2"
          style={{
            background: RARITY_COLORS[item.rarity].bg,
            border: `3px solid ${RARITY_COLORS[item.rarity].border}`,
          }}
        >
          <img
            src={item.icon}
            alt={item.name}
            className="w-full h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold uppercase" style={{ color: 'var(--pixel-border)' }}>
            {item.name}
          </h3>
          <span
            className="text-xs px-2 py-0.5 font-bold text-white inline-block"
            style={{ background: RARITY_COLORS[item.rarity].border }}
          >
            {RARITY_COLORS[item.rarity].label}
          </span>
        </div>
      </div>
      <p className="text-sm mb-1" style={{ color: 'var(--pixel-wood-dark)' }}>
        {item.description}
      </p>
      <div className="flex justify-between text-xs font-bold mb-3 border-t border-dashed border-amber-900/20 pt-2">
        <span style={{ color: 'var(--pixel-accent)' }}>PRICE: {item.price} G</span>
        <span style={{ color: 'var(--pixel-wood-dark)' }}>DATE: {item.purchaseDate}</span>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="btn-primary btn-danger btn-press w-full py-2 text-sm"
      >
        DISCARD
      </button>
    </div>
  );
}
