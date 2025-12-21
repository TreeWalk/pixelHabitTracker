import { Settings } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="h-full flex flex-col items-center justify-center opacity-50" style={{ color: 'var(--pixel-wood-dark)' }}>
      <Settings className="w-16 h-16 mb-4" />
      <p className="text-xl font-bold">WORK IN PROGRESS...</p>
    </div>
  );
}
