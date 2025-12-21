'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { CollectionItem, ItemRarity } from '@/lib/types';
import { PIXEL_ICONS, RARITY_COLORS } from '@/lib/constants';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<CollectionItem, 'id'>) => void;
}

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('/item/car.png');
  const [rarity, setRarity] = useState<ItemRarity>('common');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({
      name,
      icon,
      rarity,
      description: description || 'A mysterious item...',
      price: parseInt(price) || 0,
      purchaseDate: purchaseDate || new Date().toISOString().split('T')[0]
    });
    setName('');
    setIcon('/item/car.png');
    setRarity('common');
    setDescription('');
    setPrice('0');
    setPurchaseDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content retro-border animate-bob" style={{ maxWidth: '340px' }}>
        <div className="modal-header">
          <h3>ADD ITEM</h3>
          <button onClick={onClose} className="text-white hover:text-red-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--pixel-accent)' }}>
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-4 p-2 font-pixel text-lg outline-none focus:bg-amber-50"
              style={{ borderColor: 'var(--pixel-border)' }}
              placeholder="Ancient Sword"
              autoFocus
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--pixel-accent)' }}>
              Icon
            </label>
            <div
              className="grid grid-cols-5 gap-1 p-2 max-h-32 overflow-y-auto"
              style={{ background: '#f5f5f5', border: '2px solid var(--pixel-border)' }}
            >
              {PIXEL_ICONS.map((ico) => (
                <button
                  key={ico}
                  onClick={() => setIcon(ico)}
                  className={`p-1 transition-all ${icon === ico ? 'bg-amber-300 scale-110' : 'hover:bg-amber-100'}`}
                >
                  <img src={ico} alt="icon" className="w-8 h-8 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Rarity */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--pixel-accent)' }}>
              Rarity
            </label>
            <div className="flex gap-1">
              {(Object.keys(RARITY_COLORS) as ItemRarity[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRarity(r)}
                  className={`flex-1 py-1 text-xs font-bold text-white transition-all ${
                    rarity === r ? 'scale-105' : 'opacity-60'
                  }`}
                  style={{ background: RARITY_COLORS[r].bg, border: `2px solid ${RARITY_COLORS[r].border}` }}
                >
                  {RARITY_COLORS[r].label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--pixel-accent)' }}>
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-4 p-2 font-pixel text-sm outline-none focus:bg-amber-50"
              style={{ borderColor: 'var(--pixel-border)' }}
              placeholder="A legendary weapon..."
            />
          </div>

          {/* Price & Date */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--pixel-accent)' }}>
                Price (G)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border-4 p-2 font-pixel text-sm outline-none"
                style={{ borderColor: 'var(--pixel-border)' }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--pixel-accent)' }}>
                Date
              </label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full border-4 p-2 font-pixel text-xs outline-none"
                style={{ borderColor: 'var(--pixel-border)' }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button onClick={handleSubmit} className="flex-1 btn-primary btn-success btn-press py-2">
              ADD
            </button>
            <button onClick={onClose} className="flex-1 btn-primary btn-danger btn-press py-2">
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
