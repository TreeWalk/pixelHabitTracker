const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface Quest {
    id: number;
    title: string;
    description: string;
    goldReward: number;
    completed: boolean;
    createdAt: string;
    completedAt: string | null;
}

export interface QuestsResponse {
    quests: Quest[];
    totalQuests: number;
    completedCount: number;
    totalGold: number;
    completionPercentage: number;
}

/**
 * Fetch all quests from the backend
 */
export async function fetchQuests(): Promise<QuestsResponse> {
    const response = await fetch(`${API_BASE_URL}/quests`);
    if (!response.ok) {
        throw new Error('Failed to fetch quests');
    }
    return response.json();
}

/**
 * Toggle quest completion status
 */
export async function toggleQuest(id: number): Promise<Quest> {
    const response = await fetch(`${API_BASE_URL}/quests/toggle/${id}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to toggle quest');
    }
    return response.json();
}

/**
 * Mark a quest as complete
 */
export async function completeQuest(id: number): Promise<Quest> {
    const response = await fetch(`${API_BASE_URL}/quests/complete/${id}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to complete quest');
    }
    return response.json();
}

/**
 * Create a new quest
 */
export async function createQuest(quest: Omit<Quest, 'id' | 'completed' | 'createdAt' | 'completedAt'>): Promise<Quest> {
    const response = await fetch(`${API_BASE_URL}/quests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quest),
    });
    if (!response.ok) {
        throw new Error('Failed to create quest');
    }
    return response.json();
}

/**
 * Reset all quests to incomplete
 */
export async function resetQuests(): Promise<Quest[]> {
    const response = await fetch(`${API_BASE_URL}/quests/reset`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to reset quests');
    }
    return response.json();
}

/**
 * Delete a quest
 */
export async function deleteQuest(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/quests/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete quest');
    }
}
