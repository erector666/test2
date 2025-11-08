import { useState, useEffect } from 'react';
import { ClockIcon, BellIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isAlarmTriggered, setIsAlarmTriggered] = useState(false);
  const [isSettingAlarm, setIsSettingAlarm] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAlarmSet && alarmTime) {
      const now = new Date();
      const [hours, minutes] = alarmTime.split(':');
      const alarmDate = new Date();
      alarmDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
      }
      
      if (now.getHours() === alarmDate.getHours() && 
          now.getMinutes() === alarmDate.getMinutes()) {
        setIsAlarmTriggered(true);
      }
    }
  }, [currentTime, alarmTime, isAlarmSet]);

  const handleSetAlarm = () => {
    if (alarmTime) {
      setIsSettingAlarm(true);
      
      // Simulate setting process with animation
      setTimeout(() => {
        setIsAlarmSet(true);
        setIsSettingAlarm(false);
        setShowSuccessAnimation(true);
        
        // Hide success animation after 2 seconds
        setTimeout(() => {
          setShowSuccessAnimation(false);
        }, 2000);
      }, 1000);
    }
  };

  const handleCancelAlarm = () => {
    setIsAlarmSet(false);
    setIsAlarmTriggered(false);
    setAlarmTime('');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ClockIcon className="w-8 h-8 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">Alarm Clock</h1>
          </div>
        </div>

        {/* Current Time Display */}
        <div className="text-center mb-8">
          <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
            <p className="text-4xl font-mono font-bold text-white mb-2">
              {formatTime(currentTime)}
            </p>
            <p className="text-white/70 text-sm">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Alarm Setting */}
        <div className="space-y-6">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Set Alarm Time
            </label>
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
              disabled={isAlarmSet}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isAlarmSet ? (
              <button
                onClick={handleSetAlarm}
                disabled={!alarmTime || isSettingAlarm}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSettingAlarm
                    ? 'bg-yellow-500/20 text-yellow-300 animate-pulse cursor-not-allowed'
                    : alarmTime
                    ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:scale-105 transform'
                    : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSettingAlarm ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-300"></div>
                    <span>Setting Alarm...</span>
                  </>
                ) : (
                  <>
                    <BellIcon className="w-5 h-5" />
                    <span>Set Alarm</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleCancelAlarm}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform flex items-center justify-center space-x-2"
              >
                <span>Cancel Alarm</span>
              </button>
            )}
          </div>

          {/* Alarm Status with Animation */}
          {isAlarmSet && (
            <div className={`bg-green-500/20 border border-green-400/30 rounded-xl p-4 transition-all duration-500 ${
              showSuccessAnimation ? 'animate-pulse scale-105' : 'animate-slide-in'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`transition-all duration-500 ${
                  showSuccessAnimation ? 'animate-bounce' : ''
                }`}>
                  {showSuccessAnimation ? (
                    <CheckIcon className="w-6 h-6 text-green-300" />
                  ) : (
                    <BellIcon className="w-6 h-6 text-green-300 animate-pulse" />
                  )}
                </div>
                <div>
                  <p className="text-green-300 font-medium">
                    {showSuccessAnimation ? 'Alarm Set Successfully!' : 'Alarm Set'}
                  </p>
                  <p className="text-green-200/80 text-sm">
                    Will ring at {alarmTime}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Alarm Triggered */}
          {isAlarmTriggered && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 animate-bounce">
              <div className="flex items-center space-x-3">
                <BellIcon className="w-6 h-6 text-red-300 animate-ping" />
                <div>
                  <p className="text-red-300 font-bold animate-pulse">ALARM RINGING!</p>
                  <p className="text-red-200/80 text-sm">Time to wake up!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}