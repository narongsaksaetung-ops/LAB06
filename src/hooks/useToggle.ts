import { useState, useCallback } from 'react';

interface UseToggleReturn {
    value: boolean;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
}

function useToggle(initialValue: boolean = false): UseToggleReturn {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(prev => !prev);
    }, []);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    return { value, toggle, setTrue, setFalse };
}

export default useToggle;
