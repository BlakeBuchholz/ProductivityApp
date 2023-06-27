import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);


    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const handleStartStop = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setSeconds(0);
        setIsActive(false);
    };


    return (
        <div>
            <h2>Timer: {seconds}s</h2>
            <button onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Timer;