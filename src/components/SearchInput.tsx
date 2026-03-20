import { useRef, useEffect } from 'react';

function SearchInput() {
    // สร้าง ref สำหรับ input element
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto focus เมื่อ component mount
    useEffect(() => {
        // inputRef.current คือ DOM element จริง
        inputRef.current?.focus();
    }, []);

    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.focus();
        }
    };

    return (
        <div className="search-container">
            <input
                ref={inputRef}  {/* เชื่อม ref กับ element */}
                type="text"
                placeholder="ค้นหา Pokemon..."
            />
            <button onClick={handleClear}>ล้าง</button>
        </div>
    );
}

export default SearchInput;
