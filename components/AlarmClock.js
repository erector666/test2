import { useState, useEffect } from 'react';
import { ClockIcon, BellIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (isAlarmSet && alarmTime) {
        const currentTimeStr = now.toTimeString().slice(0, 5);
        if (currentTimeStr === alarmTime && !isAlarmRinging) {
          setIsAlarmRinging(true);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [alarmTime, isAlarmSet, isAlarmRinging]);

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

  const handleSetAlarm = () => {
    if (alarmTime) {
      setIsAlarmSet(true);
    }
  };

  const handleStopAlarm = () => {
    setIsAlarmRinging(false);
    setIsAlarmSet(false);
    setAlarmTime('');
  };

  const handleSnooze = () => {
    setIsAlarmRinging(false);
    // Snooze for 5 minutes
    const snoozeTime = new Date();
    snoozeTime.setMinutes(snoozeTime.getMinutes() + 5);
    setAlarmTime(snoozeTime.toTimeString().slice(0, 5));
  };

  const handleHelloWorld = () => {
    alert('Hello World!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        {/* Current Time Display */}
        <div className="text-center mb-8">
          <div className="text-6xl font-mono font-bold text-white mb-2 tracking-wider">
            {formatTime(currentTime)}
          </div>
          <div className="text-white/80 text-lg">
            {formatDate(currentTime)}
          </div>
        </div>

        {/* Alarm Status */}
        {isAlarmRinging && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 animate-pulse">
            <div className="flex items-center justify-center text-red-300 mb-4">
              <BellIcon className="h-8 w-8 mr-2" />
              <span className="text-xl font-semibold">ALARM RINGING!</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSnooze}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
              >
                <PauseIcon className="h-5 w-5 inline mr-2" />
                Snooze
              </button>
              <button
                onClick={handleStopAlarm}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
              >
                Stop
              </button>
            </div>
          </div>
        )}

        {/* Alarm Setting */}
        <div className="space-y-4">
          <div className="flex items-center text-white/90 mb-3">
            <ClockIcon className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">Set Alarm</span>
          </div>
          
          <div className="flex gap-3">
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <button
              onClick={handleSetAlarm}
              disabled={!alarmTime}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <PlayIcon className="h-5 w-5 mr-2" />
              Set
            </button>
          </div>

          {isAlarmSet && !isAlarmRinging && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center">
              <span className="text-green-300 font-semibold">
                Alarm set for {alarmTime}
              </span>
            </div>
          )}
        </div>

        {/* HelloWorld Button */}
        <div className="mt-6">
          <button
            onClick={handleHelloWorld}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Hello World
          </button>
        </div>
      </div>
    </div>
  );
}