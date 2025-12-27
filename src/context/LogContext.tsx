'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface LogEntry {
    id: string;
    text: string;
    date: string;
}

interface LogContextType {
    logs: Record<number, LogEntry[]>;
    addLog: (locationId: number, text: string) => void;
    getLogs: (locationId: number) => LogEntry[];
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export function LogProvider({ children }: { children: ReactNode }) {
    const [logs, setLogs] = useState<Record<number, LogEntry[]>>({});

    const addLog = useCallback((locationId: number, text: string) => {
        const newEntry: LogEntry = {
            id: Math.random().toString(36).substr(2, 9),
            text,
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setLogs(prev => ({
            ...prev,
            [locationId]: [newEntry, ...(prev[locationId] || [])]
        }));
    }, []);

    const getLogs = useCallback((locationId: number) => {
        return logs[locationId] || [];
    }, [logs]);

    return (
        <LogContext.Provider value={{ logs, addLog, getLogs }}>
            {children}
        </LogContext.Provider>
    );
}

export function useLogs() {
    const context = useContext(LogContext);
    if (!context) {
        throw new Error('useLogs must be used within a LogProvider');
    }
    return context;
}
