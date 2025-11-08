import { useState, useEffect } from 'react';
import { ClockIcon, BellIcon, PlusIcon, TrashIcon, PlayIcon, StopIcon } from '@heroicons/react/24/outline';

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarms, setAlarms] = useState([]);
  const [newAlarmTime, setNewAlarmTime] = useState('');
  const [activeAlarms, setActiveAlarms] = useState(new Set());
  const [ringingAlarm, setRingingAlarm] = useState(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check for alarms
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentTimeString = now.toTimeString().slice(0, 5);
      
      alarms.forEach(alarm => {
        if (alarm.time === currentTimeString && activeAlarms.has(alarm.id) && !ringingAlarm) {
          setRingingAlarm(alarm);
          // Play alarm sound (browser beep)
          if (typeof window !== 'undefined') {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms, activeAlarms, ringingAlarm]);

  const addAlarm = () => {
    if (newAlarmTime) {
      const newAlarm = {
        id: Date.now(),
        time: newAlarmTime,
        label: `Alarm at ${newAlarmTime}`
      };
      setAlarms([...alarms, newAlarm]);
      setActiveAlarms(new Set([...activeAlarms, newAlarm.id]));
      setNewAlarmTime('');
    }
  };

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
    setActiveAlarms(new Set([...activeAlarms].filter(alarmId => alarmId !== id)));
  };

  const toggleAlarm = (id) => {
    const newActiveAlarms = new Set(activeAlarms);
    if (newActiveAlarms.has(id)) {
      newActiveAlarms.delete(id);
    } else {
      newActiveAlarms.add(id);
    }
    setActiveAlarms(newActiveAlarms);
  };

  const stopRinging = () => {
    setRingingAlarm(null);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
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
    <div className="max-w-4xl mx-auto">
      {/* Ringing Alarm Modal */}
      {ringingAlarm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center animate-pulse">
            <BellIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Alarm Ringing!</h2>
            <p className="text-gray-600 mb-6">{ringingAlarm.label}</p>
            <button
              onClick={stopRinging}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Stop Alarm
            </button>
          </div>
        </div>
      )}

      {/* Current Time Display */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 text-center border border-white/20">
        <ClockIcon className="w-12 h-12 mx-auto text-white/80 mb-4" />
        <div className="text-6xl md:text-8xl font-mono font-bold text-white mb-2">
          {formatTime(currentTime).slice(0, -3)}
        </div>
        <div className="text-xl text-white/60 font-mono">
          {formatTime(currentTime).slice(-2)}
        </div>
        <div className="text-white/80 text-lg mt-4">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Add New Alarm */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <PlusIcon className="w-6 h-6 mr-2" />
          Add New Alarm
        </h2>
        <div className="flex gap-4">
          <input
            type="time"
            value={newAlarmTime}
            onChange={(e) => setNewAlarmTime(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            onClick={addAlarm}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Alarm
          </button>
        </div>
      </div>

      {/* Alarms List */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <BellIcon className="w-6 h-6 mr-2" />
          Your Alarms ({alarms.length})
        </h2>
        
        {alarms.length === 0 ? (
          <div className="text-center py-8">
            <ClockIcon className="w-16 h-16 mx-auto text-white/40 mb-4" />
            <p className="text-white/60 text-lg">No alarms set</p>
            <p className="text-white/40">Add your first alarm above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alarms.map(alarm => (
              <div
                key={alarm.id}
                className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                  activeAlarms.has(alarm.id)
                    ? 'bg-green-500/20 border border-green-400/30'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <BellIcon className={`w-6 h-6 ${
                    activeAlarms.has(alarm.id) ? 'text-green-400' : 'text-white/60'
                  }`} />
                  <div>
                    <div className={`text-lg font-mono font-semibold ${
                      activeAlarms.has(alarm.id) ? 'text-white' : 'text-white/60'
                    }`}>
                      {alarm.time}
                    </div>
                    <div className={`text-sm ${
                      activeAlarms.has(alarm.id) ? 'text-green-300' : 'text-white/40'
                    }`}>
                      {alarm.label}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleAlarm(alarm.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      activeAlarms.has(alarm.id)
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white/60'
                    }`}
                  >
                    {activeAlarms.has(alarm.id) ? (
                      <StopIcon className="w-5 h-5" />
                    ) : (
                      <PlayIcon className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteAlarm(alarm.id)}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}