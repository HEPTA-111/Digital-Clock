import { useState, useEffect } from 'react';

function DigitalClock() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timerID);
    }, []);

    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }

    function formatTime() {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    return (
        <div className="digital-clock">
            <div className="clock">
                <span>{formatTime()}</span>
            </div>
        </div>
    );

}

export default DigitalClock;