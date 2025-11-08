import { useState, useEffect } from 'react';
import { ClockIcon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Check if any alarm should ring
      const currentTimeString = now.toTimeString().slice(0, 5);
      alarms.forEach(alarm => {
        if (alarm.time === currentTimeString && alarm.active && !isAlarmRinging) {
          setIsAlarmRinging(true);
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms, isAlarmRinging]);

  const setAlarm = () => {
    if (alarmTime) {
      const newAlarm = {
        id: Date.now(),
        time: alarmTime,
        active: true
      };
      setAlarms([...alarms, newAlarm]);
      setAlarmTime('');
      setIsAlarmSet(true);
    }
  };

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const stopAlarm = () => {
    setIsAlarmRinging(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Macedonian Flag Background */}
      <div className="absolute inset-0 z-0">
        {/* Red stripe */}
        <div className="h-1/3 w-full bg-red-600"></div>
        {/* White stripe */}
        <div className="h-1/3 w-full bg-white"></div>
        {/* Red stripe */}
        <div className="h-1/3 w-full bg-red-600"></div>
        
        {/* Sun design in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Sun rays */}
            <div className="absolute inset-0">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-16 bg-yellow-400 origin-bottom"
                  style={{
                    transform: `rotate(${i * 22.5}deg)`,
                    left: '50%',
                    bottom: '50%',
                    transformOrigin: '50% 100%'
                  }}
                />
              ))}
            </div>
            {/* Sun circle */}
            <div className="w-24 h-24 bg-yellow-400 rounded-full border-4 border-yellow-500 relative z-10"></div>
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen bg-black bg-opacity-30 flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <ClockIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Alarm Clock</h1>
            <p className="text-gray-600">{formatDate(currentTime)}</p>
          </div>

          {/* Current Time Display */}
          <div className="text-center mb-8">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-2">
              {formatTime(currentTime)}
            </div>
          </div>

          {/* Hello World Button */}
          <div className="text-center mb-6">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">
              Hello World
            </button>
          </div>

          {/* Alarm Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Set Alarm Time
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={setAlarm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <BellIcon className="h-4 w-4" />
                Set
              </button>
            </div>
          </div>

          {/* Active Alarms */}
          {alarms.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Active Alarms</h3>
              <div className="space-y-2">
                {alarms.map(alarm => (
                  <div key={alarm.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="font-mono text-gray-800">{alarm.time}</span>
                    <button
                      onClick={() => deleteAlarm(alarm.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alarm Ringing Modal */}
          {isAlarmRinging && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 text-center animate-pulse">
                <BellIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">ALARM!</h2>
                <p className="text-gray-600 mb-6">Time to wake up!</p>
                <button
                  onClick={stopAlarm}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Stop Alarm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}