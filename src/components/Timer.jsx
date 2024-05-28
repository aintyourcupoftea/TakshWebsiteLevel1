import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';

const Timer = ({ startFrom, onTimerEnd }) => {
  const [time, setTime] = useState(startFrom); // Initialize with the startFrom prop

  useEffect(() => {
    const savedStartTime = localStorage.getItem("timerStartTime");
    if (savedStartTime) {
      const startTime = new Date(savedStartTime).getTime();
      const currentTime = new Date().getTime();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      setTime((prevTime) => prevTime - elapsedTime);
    } else {
      localStorage.setItem("timerStartTime", new Date());
    }

    const countdown = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(countdown);
          if (onTimerEnd) onTimerEnd(); // Call onTimerEnd when timer ends
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [onTimerEnd]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>
        Timer: <Badge bg="secondary">{formatTime(time)}</Badge>
      </h2>
    </div>
  );
};

export default Timer;
