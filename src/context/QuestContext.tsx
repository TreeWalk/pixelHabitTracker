'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Quest } from '@/lib/types';

interface QuestContextType {
    quests: Quest[];
    totalGold: number;
    completionPercentage: number;
    toggleQuest: (id: number) => void;
    addQuest: (quest: Omit<Quest, 'id' | 'completed'>) => void;
    resetQuests: () => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

// Default quests - daily habits as RPG quests
const defaultQuests: Quest[] = [
    { id: 1, title: "Drink Water", xp: 50, completed: false, type: "Health" },
    { id: 2, title: "Read Book", xp: 100, completed: false, type: "Intellect" },
    { id: 3, title: "Exercise", xp: 150, completed: true, type: "Strength" },
    { id: 4, title: "Meditate", xp: 50, completed: false, type: "Spirit" },
    { id: 5, title: "Code", xp: 200, completed: false, type: "Skill" },
    { id: 6, title: "Walk Dog", xp: 75, completed: false, type: "Strength" },
];

export function QuestProvider({ children }: { children: ReactNode }) {
    const [quests, setQuests] = useState<Quest[]>(defaultQuests);

    const toggleQuest = useCallback((id: number) => {
        setQuests(prev =>
            prev.map(quest =>
                quest.id === id ? { ...quest, completed: !quest.completed } : quest
            )
        );
    }, []);

    const addQuest = useCallback((quest: Omit<Quest, 'id' | 'completed'>) => {
        setQuests(prev => [
            ...prev,
            { ...quest, id: Date.now(), completed: false }
        ]);
    }, []);

    const resetQuests = useCallback(() => {
        setQuests(prev => prev.map(q => ({ ...q, completed: false })));
    }, []);

    const completedQuests = quests.filter(q => q.completed);
    const totalGold = completedQuests.reduce((sum, q) => sum + q.xp, 0);
    const completionPercentage = quests.length > 0
        ? Math.round((completedQuests.length / quests.length) * 100)
        : 0;

    return (
        <QuestContext.Provider value={{
            quests,
            totalGold,
            completionPercentage,
            toggleQuest,
            addQuest,
            resetQuests
        }}>
            {children}
        </QuestContext.Provider>
    );
}

export function useQuests() {
    const context = useContext(QuestContext);
    if (!context) {
        throw new Error('useQuests must be used within a QuestProvider');
    }
    return context;
}
