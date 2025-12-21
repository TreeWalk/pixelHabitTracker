import { Map, Backpack, Sword, Settings } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems: NavItem[] = [
  { id: 'map', icon: Map, label: 'Map' },
  { id: 'inv', icon: Backpack, label: 'Items' },
  { id: 'quests', icon: Sword, label: 'Quests' },
  { id: 'settings', icon: Settings, label: 'Gear' }
];

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="bottom-nav bg-dither">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
        >
          <item.icon
            className={`w-8 h-8 mb-1 ${
              activeTab === item.id
                ? 'text-[var(--pixel-border)]'
                : 'text-[var(--pixel-accent)]'
            }`}
            strokeWidth={2.5}
          />
          <span
            className={`text-sm uppercase font-bold ${
              activeTab === item.id
                ? 'text-[var(--pixel-border)]'
                : 'text-[var(--pixel-accent)]'
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
