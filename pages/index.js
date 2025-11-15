import Head from 'next/head';
import AlarmClock from '../components/AlarmClock';

export default function Home() {
return (
<div>
<Head>
<title>Spotify Clone</title>
<link rel="icon" href="/favicon.ico" />
</Head>

<main className="bg-black min-h-screen">
<AlarmClock />

{/* Weather Panel */} 
<div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
<h2 className="text-lg font-semibold">Weather</h2>
<p>Temperature:25°C</p>
<p>Condition: Sunny</p>
<p>Location: London</p>
</div>
</main>
</div>
);
}
