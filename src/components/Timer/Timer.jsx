import { Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import './Timer.scss';

const Timer = ({ initialValue = 0, value, onChange }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentValue((prevValue) => {
          const newValue = prevValue + 1;
          onChange(newValue);
          return newValue;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, onChange]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="timer-container">
      <div className="timer">
        <span className="value">
          {dayjs().startOf('day').second(currentValue).format('mm:ss')}
        </span>
        <ClockCircleOutlined className="icon" />
      </div>
      <Button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</Button>
    </div>
  );
};

export default Timer;
