'use client';

import { useState } from 'react';
import { CollectionItem } from '@/lib/types';
import { useItems } from '@/context/ItemContext';
import { CollectionGrid } from './CollectionGrid';
import { ItemDetail } from './ItemDetail';

interface ItemsViewProps {
  onOpenModal: () => void;
}

export function ItemsView({ onOpenModal }: ItemsViewProps) {
  const { items, totalValue, deleteItem } = useItems();
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);

  const handleDelete = (id: number) => {
    deleteItem(id);
    setSelectedItem(null);
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header */}
      <div className="section-header flex justify-between items-end">
        <div>
          <h2 className="section-title text-shadow-retro">COLLECTION</h2>
          <p className="section-subtitle">{items.length} Items Found · Total Value: {totalValue} G</p>
        </div>
        <button onClick={onOpenModal} className="btn-primary btn-press !w-28 py-2 text-sm">
          + ADD
        </button>
      </div>

      {/* Collection Grid */}
      <CollectionGrid items={items} onSelectItem={setSelectedItem} />

      {/* Selected Item Details */}
      <ItemDetail item={selectedItem} onDelete={handleDelete} />
    </div>
  );
}
