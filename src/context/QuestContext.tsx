'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Quest, QuestLog } from '@/lib/types';

interface QuestContextType {
    quests: Quest[];
    questLog: QuestLog[];
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

// Default quest log - some historical data
const defaultQuestLog: QuestLog[] = [
    { id: 101, questTitle: "Code", questType: "Skill", xp: 200, completedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() }, // 30min ago
    { id: 102, questTitle: "Drink Water", questType: "Health", xp: 50, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() }, // 2h ago
    { id: 103, questTitle: "Exercise", questType: "Strength", xp: 150, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() }, // 5h ago
    { id: 104, questTitle: "Read Book", questType: "Intellect", xp: 100, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }, // 1 day ago
    { id: 105, questTitle: "Meditate", questType: "Spirit", xp: 50, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }, // 1 day ago
    { id: 106, questTitle: "Walk Dog", questType: "Strength", xp: 75, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() }, // 2 days ago
    { id: 107, questTitle: "Code", questType: "Skill", xp: 200, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() }, // 3 days ago
    { id: 108, questTitle: "Drink Water", questType: "Health", xp: 50, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() }, // 5 days ago
    { id: 109, questTitle: "Exercise", questType: "Strength", xp: 150, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString() }, // 6 days ago
    { id: 110, questTitle: "Practice Piano", questType: "Skill", xp: 120, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() }, // 10 days ago
];

export function QuestProvider({ children }: { children: ReactNode }) {
    const [quests, setQuests] = useState<Quest[]>(defaultQuests);
    const [questLog, setQuestLog] = useState<QuestLog[]>(defaultQuestLog);

    const toggleQuest = useCallback((id: number) => {
        // Find the quest first to check if we need to log
        const quest = quests.find(q => q.id === id);
        if (!quest) return;

        const shouldLog = !quest.completed; // Only log when completing (false -> true)

        // Update quest status
        setQuests(prev =>
            prev.map(q =>
                q.id === id ? { ...q, completed: !q.completed } : q
            )
        );

        // Log completion if needed
        if (shouldLog) {
            setQuestLog(prevLog => [
                {
                    id: Date.now(),
                    questTitle: quest.title,
                    questType: quest.type,
                    xp: quest.xp,
                    completedAt: new Date().toISOString()
                },
                ...prevLog
            ]);
        }
    }, [quests]);

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
            questLog,
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
