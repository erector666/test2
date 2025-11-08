import { useState } from 'react';
import { BellIcon } from '@heroicons/react/outline';

const AlarmClock = () => {
  const [time, setTime] = useState('');
  const [alarmTime, setAlarmTime] = useState(null);
  const [isRinging, setIsRinging] = useState(false);

  const handleSetAlarm = () => {
    setAlarmTime(new Date().setHours(...time.split(':')));
    setIsRinging(false);
  };

  const stopAlarm = () => {
    setIsRinging(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <BellIcon className="h-24 w-24 text-gray-500" />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSetAlarm}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Set Alarm
      </button>
      {isRinging && (
        <div className="mt-4">
          <p>Alarm is ringing!</p>
          <button
            onClick={stopAlarm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};

export default AlarmClock;
