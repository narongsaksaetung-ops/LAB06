import { useEffect, useState } from 'react';

// Custom hook สำหรับเก็บค่าก่อนหน้า
function usePrevious<T>(value: T): T | undefined {
    const [previous, setPrevious] = useState<T | undefined>(undefined);

    useEffect(() => {
        setPrevious(value);
    }, [value]);

    return previous;
}

export default usePrevious;
