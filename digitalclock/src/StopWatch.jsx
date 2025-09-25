// src/StopWatch.jsx
import React, { useState, useEffect, useRef } from 'react';

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // milliseconds
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      // Start interval updating elapsedTime from startTimeRef
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10); // 10ms resolution
    } else {
      // ensure interval is cleared when not running
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    // cleanup on unmount or isRunning change
    return () => {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    };
  }, [isRunning]);

  function start() {
    // set start time so that we continue from previous elapsedTime
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
    // elapsedTime is in milliseconds
    const totalMilliseconds = elapsedTime;
    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const centiseconds = Math.floor((totalMilliseconds % 1000) / 10); // two-digit hundredths

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
