'use client';

import { useState } from 'react';
import { QuestProvider } from '@/context/QuestContext';
import { ItemProvider } from '@/context/ItemContext';
import { BottomNav } from '@/components/layout/BottomNav';
import { MapView } from '@/components/map/MapView';
import { QuestsView } from '@/components/quests/QuestsView';
import { AddQuestModal } from '@/components/quests/AddQuestModal';
import { ItemsView } from '@/components/items/ItemsView';
import { AddItemModal } from '@/components/items/AddItemModal';
import { SettingsView } from '@/components/settings/SettingsView';
import { useQuests } from '@/context/QuestContext';
import { useItems } from '@/context/ItemContext';

import { LogProvider } from '@/context/LogContext';

// App Content Component
function AppContent() {
  const [activeTab, setActiveTab] = useState('quests');
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const { addQuest } = useQuests();
  const { addItem } = useItems();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-pixel text-slate-800 p-4">
      {/* Mobile Device Container */}
      <div className="mobile-container bg-dither shadow-2xl">
        {/* Body Content */}
        <div className={`flex-1 bg-dither relative ${activeTab === 'map' ? 'p-0 overflow-hidden' : 'p-4 overflow-y-auto pb-24 pt-8'}`}>
          {/* Quests View */}
          {activeTab === 'quests' && (
            <QuestsView onOpenModal={() => setIsQuestModalOpen(true)} />
          )}

          {/* Map View */}
          {activeTab === 'map' && <MapView />}

          {/* Items View (Collection Cabinet) */}
          {activeTab === 'inv' && (
            <ItemsView onOpenModal={() => setIsItemModalOpen(true)} />
          )}

          {/* Settings View */}
          {activeTab === 'settings' && <SettingsView />}
        </div>

        {/* Add Quest Modal */}
        <AddQuestModal
          isOpen={isQuestModalOpen}
          onClose={() => setIsQuestModalOpen(false)}
          onAdd={addQuest}
        />

        {/* Add Item Modal */}
        <AddItemModal
          isOpen={isItemModalOpen}
          onClose={() => setIsItemModalOpen(false)}
          onAdd={addItem}
        />

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

// Main Page Component with Providers
export default function Home() {
  return (
    <QuestProvider>
      <ItemProvider>
        <LogProvider>
          <AppContent />
        </LogProvider>
      </ItemProvider>
    </QuestProvider>
  );
}
