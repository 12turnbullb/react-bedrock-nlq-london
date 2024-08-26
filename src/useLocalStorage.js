import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from local storage:', error);
            return initialValue;
        }
    });

    useEffect(() => {
        if (storedValue === undefined) {
            localStorage.removeItem(key);
        } else {
            try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.error('Error writing to local storage:', error);
            }
        }
    }, [key, storedValue]);

    const removeValue = () => {
        setStoredValue(undefined);
    };

    return [storedValue, setStoredValue, removeValue];
}

export default useLocalStorage;