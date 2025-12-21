import { RarityConfig, CollectionItem } from './types';

// Pixel icon options for items
export const PIXEL_ICONS = [
  '/item/bag.png',
  '/item/books.png',
  '/item/car.png',
  '/item/figure.png',
  '/item/game.png',
  '/item/green.png',
  '/item/pc.png',
  '/item/phone.png',
  '/item/watch.png'
];

// Rarity colors configuration
export const RARITY_COLORS: Record<string, RarityConfig> = {
  common: { bg: '#9ca3af', border: '#6b7280', label: 'COMMON' },
  rare: { bg: '#3b82f6', border: '#1d4ed8', label: 'RARE' },
  epic: { bg: '#a855f7', border: '#7c3aed', label: 'EPIC' },
  legendary: { bg: '#f59e0b', border: '#d97706', label: 'LEGEND' },
};

// Default collection items
export const DEFAULT_ITEMS: CollectionItem[] = [
  {
    id: 1,
    name: "Retro PC",
    icon: '/item/pc.png',
    rarity: 'rare',
    description: 'A vintage computer station.',
    price: 5000,
    purchaseDate: '2023-12-01'
  },
  {
    id: 2,
    name: "Sports Car",
    icon: '/item/car.png',
    rarity: 'legendary',
    description: 'Fastest car in the bit-world.',
    price: 15000,
    purchaseDate: '2023-12-10'
  },
  {
    id: 3,
    name: "Smart Watch",
    icon: '/item/watch.png',
    rarity: 'common',
    description: 'Keeps track of your steps.',
    price: 300,
    purchaseDate: '2023-12-15'
  },
];
