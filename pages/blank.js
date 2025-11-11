import { HomeIcon, MagnifyingGlassIcon, BookmarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const navigation = [
  { name: 'Home', icon: HomeIcon, current: true },
  { name: 'Search', icon: MagnifyingGlassIcon, current: false },
  { name: 'Your Library', icon: BookmarkIcon, current: false },
  { name: 'Profile', icon: UserIcon, current: false }
];

const recentlyPlayed = [
  { name: 'Liked Songs', artist: '5 songs', cover: 'bg-gradient-to-br from-purple-700 to-blue-300' },
  { name: 'Daily Mix 1', artist: 'Made for you', cover: 'bg-gradient-to-br from-orange-400 to-pink-400' },
  { name: 'Discover Weekly', artist: 'Made for you', cover: 'bg-gradient-to-br from-green-400 to-blue-500' },
  { name: 'Release Radar', artist: 'Made for you', cover: 'bg-gradient-to-br from-red-400 to-yellow-400' },
  { name: 'Chill Hits', artist: 'Spotify', cover: 'bg-gradient-to-br from-indigo-400 to-purple-400' },
  { name: 'Rock Classics', artist: 'Spotify', cover: 'bg-gradient-to-br from-gray-700 to-gray-900' }
];

const madeForYou = [
  { name: 'Daily Mix 2', artist: 'Ariana Grande, Dua Lipa and more', cover: 'bg-gradient-to-br from-pink-400 to-red-400' },
  { name: 'Daily Mix 3', artist: 'The Weeknd, Drake and more', cover: 'bg-gradient-to-br from-blue-600 to-purple-600' },
  { name: 'Discover Weekly', artist: 'Your weekly mixtape of fresh music', cover: 'bg-gradient-to-br from-green-500 to-green-700' }
];

export default function SpotifyClone() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-800 to-black px-4 pt-12pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Good evening</h1>
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
        </div>
        
        {/* Recently Played Grid */}
        <div className="grid grid-cols-2 gap-2">
          {recentlyPlayed.slice(0, 6).map((item, index) => (
            <div key={index} className="flex items-center bg-gray-800 bg-opacity-60 rounded-md p-2">
              <div className={`w-12 h-12 rounded ${item.cover} mr-3`}></div>
              <p className="text-sm font-medium truncate">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-24">
        {/* Made for you section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Made for you</h2>
            <button className="text-gray-400 text-sm font-medium">See all</button>
          </div>
          <div className="flex space-x-4overflow-x-auto">
            {madeForYou.map((playlist, index) => (
              <div key={index} className="flex-shrink-0 w-36">
                <div className={`w-36 h-36 rounded-lg ${playlist.cover} mb-2`}></div>
                <h3 className="text-sm font-medium mb-1 truncate">{playlist.name}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{playlist.artist}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Jump back in section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Jump back in</h2>
            <button className="text-gray-400 text-sm font-medium">See all</button>
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            {recentlyPlayed.slice(0, 4).map((item, index) => (
              <div key={index} className="flex-shrink-0 w-36">
                <div className={`w-36 h-36 rounded-lg ${item.cover} mb-2`}></div>
                <h3 className="text-sm font-medium mb-1 truncate">{item.name}</h3>
                <p className="text-xs text-gray-400">{item.artist}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-16 left-0 right-0 bg-gray-900 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium truncate">Blinding Lights</p>
              <p className="text-xs text-gray-400 truncate">The Weeknd</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button>
              <BackwardIcon className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6 text-black" />
              ) : (
                <PlayIcon className="w-6 h-6 text-black ml-0.5" />
              )}
            </button>
            <button>
              <ForwardIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2">
          <div className="w-full bg-gray-600 rounded-full h-1">
            <div className="bg-white h-1 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="flex justify-around py-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center py-2 px-3 ${
                activeTab === item.name ? 'text-white' : 'text-gray-400'
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${
                activeTab === item.name ? 'text-white' : 'text-gray-400'
              }`} />
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}