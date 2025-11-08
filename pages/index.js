import { useState, useEffect } from 'react';
import AlarmClock from '../components/AlarmClock';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Alarm Clock
          </h1>
          <p className="text-gray-300 text-lg">
            Set your alarms and wake up on time
          </p>
        </div>
        <AlarmClock />
      </div>
    </div>
  );
}