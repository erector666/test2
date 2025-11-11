import { HomeIcon, SearchIcon, LibraryIcon, UserIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PauseIcon, RewindIcon, FastForwardIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const navigation = [
{ name: 'Home', icon: HomeIcon },
{ name: 'Search', icon: SearchIcon },
{ name: 'Library', icon: LibraryIcon },
{ name: 'Profile', icon: UserIcon }
];

export default function SpotifyClone() {
const [isPlaying, setIsPlaying] = useState(false);

return (
<div className="bg-black text-white">
{/* Bottom Navigation */}
<nav className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700">
<ul className="flex justify-around py-2">
{navigation.map((item) => (
<li key={item.name} className="flex flex-col items-center">
<item.icon className="h-6 w-6 text-gray-300" />
<span className="text-xs font-medium">{item.name}</span>
</li>
))}
</ul>
</nav>

{/* Main Content */}
<div className="pt-20">
{/* Recently Played */}
<div className="px-4">
<h2 className="text-xl font-semibold mb-2">Recently Played</h2>
<div className="flex overflow-x-auto">{/* Add album cards here */}{/* Example Album Card */}
<div className="w-48 h-48 bg-gray-800 rounded-lg mr-4">
{/* Album Artwork */}
<img src="https://via.placeholder.com/150" alt="Album Cover" className="object-cover h-full w-full" />
</div>
</div>
</div>

{/* Made For You */}
<div className="px-4 mt-4">
<h2 className="text-xl font-semibold mb-2">Made For You</h2>
{/* Playlist Cards */}
<div className="flex overflow-x-auto">{/* Add playlist cards here */}
<div className="w-48 h-48 bg-gray-800 rounded-lg mr-4">
{/* Playlist Artwork */}
<img src="https://via.placeholder.com/150" alt="Playlist Cover" className="object-cover h-full w-full" />
</div>
</div>
</div>

{/* Jump Back In */}
<div className="px-4 mt-4">
<h2 className="text-xl font-semibold mb-2">Jump Back In</h2>
{/* Podcast/Episode Cards */}
<div className="flex overflow-x-auto">{/* Add podcast/episode cards here */}
<div className="w-48 h-48 bg-gray-800 rounded-lg mr-4">
{/* Podcast/Episode Artwork */}
<img src="https://via.placeholder.com/150" alt="Podcast Cover" className="object-cover h-full w-full" />
</div>
</div>
</div>
</div>

{/* Music Player Bar */}
<div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 py-2">
<div className="flex justify-between items-center px-4">
{/* Song Info */}
<div className="flex items-center">
<img src="https://via.placeholder.com/50" alt="Song Artwork" className="mr-2" />
<div>
<h3 className="text-sm font-semibold">Song Title</h3>
<p className="text-xs text-gray-400">Artist Name</p>
</div>
</div>

{/* Controls */}
<div className="flex items-center">
<RewindIcon className="h-5 w-5 text-gray-300 cursor-pointer mr-2" />
{isPlaying ? (
<PauseIcon className="h-6 w-6 text-green-500 cursor-pointer" onClick={() => setIsPlaying(false)} />
) : (
<PlayIcon className="h-6 w-6 text-green-500 cursor-pointer" onClick={() => setIsPlaying(true)} />
)}
<FastForwardIcon className="h-5 w-5 text-gray-300 cursor-pointer ml-2" />
</div>
</div>
</div>
</div>
);
}
