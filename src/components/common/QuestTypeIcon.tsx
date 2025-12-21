import { Droplet, BookOpen, Dumbbell, Brain, Code } from 'lucide-react';
import { QuestType } from '@/lib/types';

interface QuestTypeIconProps {
  type: QuestType;
}

export function QuestTypeIcon({ type }: QuestTypeIconProps) {
  const iconClass = "w-4 h-4";

  switch (type) {
    case 'Health':
      return <Droplet className={`${iconClass} text-blue-500`} />;
    case 'Intellect':
      return <BookOpen className={`${iconClass} text-purple-500`} />;
    case 'Strength':
      return <Dumbbell className={`${iconClass} text-red-500`} />;
    case 'Spirit':
      return <Brain className={`${iconClass} text-teal-500`} />;
    case 'Skill':
      return <Code className={`${iconClass} text-amber-600`} />;
    default:
      return null;
  }
}
