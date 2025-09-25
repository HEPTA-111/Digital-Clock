import React, { useState, useEffect, useRef } from 'react';

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); 
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10); 
    } else {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    return () => {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    };
  }, [isRunning]);

  function start() {
    startTimeRef.current = Date.now() - elapsedTime;
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setElapsedTime(0);
    startTimeRef.current = 0;
  }

  function pad(num, size = 2) {
    return String(num).padStart(size, '0');
  }

  function formatTime() {
    const totalMilliseconds = elapsedTime;
    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const centiseconds = Math.floor((totalMilliseconds % 1000) / 10); 

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(centiseconds, 2)}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls-button">
        <button className="start-button" onClick={start}>Start</button>
        <button className="stop-button" onClick={stop}>Stop</button>
        <button className="reset-button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default StopWatch;
