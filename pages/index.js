import Head from 'next/head';
import styles from '../styles/globals.css';

export default function Home() {
const weatherData = {
location: 'London',
temperature:20,
condition: 'Sunny',
};

return (
<div className="bg-black text-white">
<Head>
<title>Spotify Clone</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
</Head>

<main className="container mx-auto py-8">
<h1>Spotify Mobile Clone</h1>

<section className="mt-8">
<h2>Weather</h2>
<div className="bg-gray-800 rounded-lg p-4 shadow-md">
<p className="text-lg font-semibold">{weatherData.location}</p>
<p className="text-xl">Temperature: {weatherData.temperature}°C</p>
<p>Condition: {weatherData.condition}</p>
</div>
</section>
</main>
</div>
);
}
