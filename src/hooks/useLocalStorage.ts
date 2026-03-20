import { useState, useEffect } from 'react';

function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
    // ดึงค่าจาก localStorage หรือใช้ค่าเริ่มต้น
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading localStorage:', error);
            return initialValue;
        }
    });

    // บันทึกลง localStorage เมื่อค่าเปลี่ยน
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error writing localStorage:', error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;

// ตัวอย่างการใช้งาน
// function App() {
//   const [favorites, setFavorites] = useLocalStorage<number[]>(
//     'pokemon-favorites',
//     []
//   );
//
//   const addFavorite = (id: number) => {
//     setFavorites(prev => [...prev, id]);
//   };
//
//   return <div>Favorites: {favorites.length}</div>;
// }
