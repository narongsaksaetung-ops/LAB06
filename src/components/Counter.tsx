import { useState } from 'react';

function Counter() {
    // useState คืนค่าเป็น Array: [ค่าปัจจุบัน, ฟังก์ชันอัพเดท]
    const [count, setCount] = useState(0);
    //    ^        ^                   ^
    //    |        |                   |
    //    |        |                   ค่าเริ่มต้น
    //    |        ฟังก์ชันสำหรับอัพเดท state
    //    ค่า state ปัจจุบัน

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                เพิ่ม
            </button>
            <button onClick={() => setCount(count - 1)}>
                ลด
            </button>
            <button onClick={() => setCount(0)}>
                รีเซ็ต
            </button>
        </div>
    );
}

export default Counter;
