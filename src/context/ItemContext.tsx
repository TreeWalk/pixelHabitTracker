'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { CollectionItem } from '@/lib/types';
import { DEFAULT_ITEMS } from '@/lib/constants';

interface ItemContextType {
  items: CollectionItem[];
  totalValue: number;
  addItem: (item: Omit<CollectionItem, 'id'>) => void;
  deleteItem: (id: number) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CollectionItem[]>(DEFAULT_ITEMS);

  const totalValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const addItem = useCallback((item: Omit<CollectionItem, 'id'>) => {
    setItems(prev => [...prev, { ...item, id: Date.now() }]);
  }, []);

  const deleteItem = useCallback((id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <ItemContext.Provider value={{ items, totalValue, addItem, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
}
