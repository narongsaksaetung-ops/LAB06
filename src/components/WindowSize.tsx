import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

function WindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // Event handler
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup: Remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty deps = ทำงานครั้งเดียว

    return (
        <div>
            <p>Width: {windowSize.width}px</p>
            <p>Height: {windowSize.height}px</p>
        </div>
    );
}

export default WindowSize;
