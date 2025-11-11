import { HomeIcon, MagnifyingGlassIcon, BookmarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function SpotifyClone() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="bg-gradient-to-b from-gray-800 to-black p-4">
          <h1 className="text-2xl font-bold mb-4">Good evening</h1>
        </div>

        {/* Recently Played */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">Recently played</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Liked Songs', color: 'bg-gradient-to-br from-purple-700 to-blue-500' },
              { name: 'Daily Mix 1', color: 'bg-gradient-to-br from-green-600 to-blue-600' },
              { name: 'Discover Weekly', color: 'bg-gradient-to-br from-orange-500 to-pink-500' },
              { name: 'Release Radar', color: 'bg-gradient-to-br from-red-500 to-yellow-500' },
              { name: 'Chill Hits', color: 'bg-gradient-to-br from-teal-500 to-green-500' },
              { name: 'Rock Classics', color: 'bg-gradient-to-br from-gray-700 to-gray-900' }
            ].map((item, i) => (
              <div key={i} className="flex items-center bg-gray-800 rounded-md overflow-hidden">
                <div className={`w-12 h-12 ${item.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">♪</span>
                </div>
                <span className="px-3 text-sm font-medium truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Made For You */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">Made for you</h2>
          <div className="flex gap-4 overflow-x-auto">
            {[
              { name: 'Daily Mix 1', artist: 'Made for you', color: 'bg-gradient-to-br from-purple-600 to-pink-600' },
              { name: 'Daily Mix 2', artist: 'Made for you', color: 'bg-gradient-to-br from-blue-600 to-purple-600' },
              { name: 'Daily Mix 3', artist: 'Made for you', color: 'bg-gradient-to-br from-green-600 to-teal-600' }
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-40">
                <div className={`w-40 h-40 rounded-lg ${item.color} flex items-center justify-center mb-2`}>
                  <span className="text-white text-4xl">♪</span>
                </div>
                <h3 className="font-medium text-sm truncate">{item.name}</h3>
                <p className="text-gray-400 text-xs truncate">{item.artist}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Jump Back In */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">Jump back in</h2>
          <div className="flex gap-4 overflow-x-auto">
            {[
              { name: 'Liked Songs', artist: 'Playlist', color: 'bg-gradient-to-br from-purple-700 to-blue-500' },
              { name: 'Pop Mix', artist: 'Playlist', color: 'bg-gradient-to-br from-pink-500 to-orange-500' }
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-40">
                <div className={`w-40 h-40 rounded-lg ${item.color} flex items-center justify-center mb-2`}>
                  <span className="text-white text-4xl">♪</span>
                </div>
                <h3 className="font-medium text-sm truncate">{item.name}</h3>
                <p className="text-gray-400 text-xs truncate">{item.artist}</p>
              </div>
            ))}
          </div>
        </div>
</div>

      {/* Music Player Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-gray-900 border-t border-gray-800 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-md flex items-center justify-center mr-3">
              <span className="text-white font-bold">♪</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white text-sm font-medium">Song Title</h4>
              <p className="text-gray-400 text-xs">Artist Name</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white">
              <BackwardIcon className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white text-black rounded-full p-2"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </button>
            <button className="text-white">
              <ForwardIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="flex justify-around py-2">
          {[
            { name: 'Home', icon: HomeIcon, id: 'home' },
            { name: 'Search', icon: MagnifyingGlassIcon, id: 'search' },
            { name: 'Library', icon: BookmarkIcon, id: 'library' },
            { name: 'Profile', icon: UserIcon, id: 'profile' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-4 ${
                activeTab === tab.id ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              <tab.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}