import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // ตั้ง timer เพื่อ delay การอัพเดท
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: ยกเลิก timer ถ้า value เปลี่ยนก่อน delay หมด
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
