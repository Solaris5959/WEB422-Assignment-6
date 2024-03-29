import { atom } from 'jotai';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const favouritesAtom = atom([]);

// Custom hook to sync atom with local storage
export function usePersistedAtom(atom, key) {
    const [value, setValue] = useAtom(atom);

    // Load from local storage on mount
    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            setValue(JSON.parse(storedValue));
        }
    }, [setValue, key]);

    // Save to local storage on value change
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
