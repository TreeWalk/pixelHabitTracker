import { CollectionItem } from '@/lib/types';
import { RARITY_COLORS } from '@/lib/constants';

interface CollectionGridProps {
  items: CollectionItem[];
  onSelectItem: (item: CollectionItem) => void;
}

export function CollectionGrid({ items, onSelectItem }: CollectionGridProps) {
  return (
    <div
      className="grid grid-cols-4 gap-2 mb-4 p-3"
      style={{
        background: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
        border: '4px solid var(--pixel-border)',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 4px 4px 0 rgba(45,27,0,0.3)',
      }}
    >
      {/* Empty slots */}
      {Array.from({ length: 16 }).map((_, index) => {
        const item = items[index];
        return (
          <div
            key={index}
            onClick={() => item && onSelectItem(item)}
            className="aspect-square flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-105"
            style={{
              background: item ? RARITY_COLORS[item.rarity].bg : '#3d2914',
              border: `3px solid ${item ? RARITY_COLORS[item.rarity].border : '#2d1b00'}`,
              boxShadow: item
                ? 'inset 0 0 10px rgba(255,255,255,0.2)'
                : 'inset 2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {item ? (
              <div className="w-full h-full p-2 flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            ) : (
              <span className="text-2xl opacity-20">+</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
