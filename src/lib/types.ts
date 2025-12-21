// Quest Types
export interface Quest {
  id: number;
  title: string;
  xp: number;
  completed: boolean;
  type: 'Health' | 'Intellect' | 'Strength' | 'Spirit' | 'Skill';
}

export type QuestType = Quest['type'];

// Quest Log Types
export interface QuestLog {
  id: number;
  questTitle: string;
  questType: QuestType;
  xp: number;
  completedAt: string;
}

// Collection Item Types
export interface CollectionItem {
  id: number;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  price: number;
  purchaseDate: string;
}

export type ItemRarity = CollectionItem['rarity'];

// Location Types
export interface Location {
  id: number;
  name: string;
  x: number;
  y: number;
  icon: string;
  type: string;
  desc: string;
  unlocked: boolean;
  size: string;
}

// Rarity Config
export interface RarityConfig {
  bg: string;
  border: string;
  label: string;
}
