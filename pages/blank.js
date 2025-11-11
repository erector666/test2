import { HomeIcon, MagnifyingGlassIcon, BookmarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const navigation = [
  { name: 'Home', icon: HomeIcon },
  { name: 'Search', icon: MagnifyingGlassIcon },
  { name: 'Library', icon: BookmarkIcon },
  { name: 'Profile', icon: UserIcon }
];

export default function SpotifyClone() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold">Good evening</h1>
      </div>

      {/* Recently Played */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recently played</h2>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-3flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center">
                <span className="text-xs font-bold">{i}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Playlist {i}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Made For You */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Made for you</h2>
        <div className="flex space-x-4overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-shrink-0 w-36">
              <div className="w-36 h-36 bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-lg font-bold">{i}</span>
              </div>
              <p className="text-sm font-medium">Daily Mix {i}</p>
              <p className="text-xs text-gray-400">Made for you</p>
            </div>
          ))}
        </div>
      </div>

      {/* Jump Back In */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Jump back in</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-36">
              <div className="w-36 h-36 bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-lg font-bold">P{i}</span>
              </div>
              <p className="text-sm font-medium">Podcast {i}</p>
              <p className="text-xs text-gray-400">Last played 2 days ago</p>
            </div>
          ))}
        </div>
      </div>

      {/* Music Player Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center flex-1 min-w-0">
            <div className="w-12 h-12 bg-gray-600 rounded-md mr-3 flex items-center justify-center">
              <span className="text-xs font-bold">♪</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Song Title</p>
              <p className="text-xs text-gray-400 truncate">Artist Name</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <BackwardIcon className="h-6 w-6 text-gray-300" />
            <button onClick={() => setIsPlaying(!isPlaying)} className="p-2">
              {isPlaying ?(
                <PauseIcon className="h-8 w-8 text-white" />
              ) : (
                <PlayIcon className="h-8 w-8 text-white" />
              )}
            </button>
            <ForwardIcon className="h-6 w-6 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
        <div className="flex justify-around py-2">
          {navigation.map((item) => (
            <div key={item.name} className="flex flex-col items-center py-1">
              <item.icon className="h-6 w-6 text-gray-300" />
              <span className="text-xs text-gray-300mt-1">{item.name}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}