import React, { useState, useEffect } from 'react';

function AlarmClock() {
const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
const intervalId = setInterval(() => {
setCurrentTime(new Date());
},1000);

return () => clearInterval(intervalId);
}, []);

const hours = currentTime.getHours().toString().padStart(2, '0');
const minutes = currentTime.getMinutes().toString().padStart(2, '0');
const seconds = currentTime.getSeconds().toString().padStart(2, '0');

return (
<div className="flex flex-col items-center justify-center h-screen bg-black text-white">
<h2 className="text-2xl font-semibold mb-4">Alarm Clock</h2>
<p className="text-6xl font-bold">{hours}:{minutes}:{seconds}</p>
</div>
);
}

export default AlarmClock;