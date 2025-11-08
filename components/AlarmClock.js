import React, { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, StopIcon, BellIcon } from '@heroicons/react/24/solid';

const AlarmClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [alarms, setAlarms] = useState([]);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const [alarmAudio] = useState(new Audio('/alarm.mp3'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = currentTime.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    alarms.forEach((alarm, index) => {
      if (alarm.time === now && alarm.active && !isAlarmRinging) {
        setIsAlarmRinging(true);
        alarmAudio.play().catch(e => console.log('Audio play failed:', e));
      }
    });
  }, [currentTime, alarms, isAlarmRinging, alarmAudio]);

  const addAlarm = () => {
    if (alarmTime) {
      const newAlarm = {
        id: Date.now(),
        time: alarmTime,
        active: true
      };
      setAlarms([...alarms, newAlarm]);
      setAlarmTime('');
    }
  };

  const toggleAlarm = (id) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    ));
  };

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const stopAlarm = () => {
    setIsAlarmRinging(false);
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
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
        {/* Red sections */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-red-600"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-red-600"></div>
        
        {/* Yellow middle section */}
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-yellow-400"></div>
        
        {/* Sun in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 bg-yellow-500 rounded-full relative">
            {/* Sun rays */}
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-8 bg-yellow-500"
                style={{
                  top: '-16px',
                  left: '50%',
                  transformOrigin: '50% 80px',
                  transform: `translateX(-50%) rotate(${i * 22.5}deg)`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="bg-black bg-opacity-70 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl">
          {/* Digital Clock Display */}
          <div className="text-center mb-8">
            <div className="text-6xl font-mono font-bold text-white mb-2 tracking-wider">
              {formatTime(currentTime)}
            </div>
            <div className="text-lg text-gray-300">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Alarm Input Section */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Set Alarm Time
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={addAlarm}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <BellIcon className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* HelloWorld Button */}
          <div className="mb-6">
            <button
              onClick={() => alert('Hello World!')}
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Hello World
            </button>
          </div>

          {/* Alarms List */}
          {alarms.length > 0 && (
            <div className="mb-6">
              <h3 className="text-white text-sm font-medium mb-3">Active Alarms</h3>
              <div className="space-y-2">
                {alarms.map((alarm) => (
                  <div key={alarm.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                    <span className={`font-mono text-lg ${alarm.active ? 'text-green-400' : 'text-gray-500'}`}>
                      {alarm.time}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleAlarm(alarm.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          alarm.active 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                      >
                        {alarm.active ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteAlarm(alarm.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                      >
                        <StopIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alarm Ringing Alert */}
          {isAlarmRinging && (
            <div className="bg-red-600 text-white p-4 rounded-lg mb-4 text-center animate-pulse">
              <div className="text-xl font-bold mb-2">⏰ ALARM RINGING! ⏰</div>
              <button
                onClick={stopAlarm}
                className="px-6 py-2 bg-red-800 hover:bg-red-900 text-white rounded-lg transition-colors duration-200"
              >
                Stop Alarm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlarmClock;