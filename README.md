# Spotify Mobile Clone

A modern web application that replicates the Spotify mobile interface, built with Next.js and Tailwind CSS.

## Features

🎵 **Spotify-inspired UI/UX**
- Dark theme with signature green accents
- Mobile-first responsive design
- Bottom navigation bar
- Music player controls

🎨 **Modern Design Elements**
- Recently played albums grid
- "Made for you" playlists section
- "Jump back in" recommendations
- Clean typography and spacing

📱 **Mobile Optimized**
- Touch-friendly interface
- Responsive grid layouts
- Optimized for various screen sizes

## Tech Stack

- **Framework:** Next.js 16
- **Styling:** Tailwind CSS
- **Icons:** Heroicons
- **Language:** JavaScript/React

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/erector666/test2.git
cd test2
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run start` - Runs the built app in production mode

## Project Structure

```
├── components/
│   └── AlarmClock.js    # Original alarm clock component
├── pages/
│   ├── _app.js          # App wrapper
│   ├── index.js         # Home page with alarm clock
│   └── blank.js         # Spotify mobile clone dashboard
├── styles/
│   └── globals.css      # Global styles and Tailwind imports
└── README.md
```

## Features Overview

### Navigation
- **Home:** Main dashboard view
- **Search:** Music search interface (UI only)
- **Library:** Personal music library (UI only)
- **Profile:** User profile section (UI only)

### Music Player
- Play/pause controls
- Previous/next track buttons
- Progress bar (visual only)
- Current song display

### Content Sections
- **Recently Played:** Grid of recently listened albums
- **Made For You:** Personalized playlist recommendations
- **Jump Back In:** Quick access to recent content

## Deployment

The app is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main
3. Environment is automatically configured

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is for educational purposes and is not affiliated with Spotify.

## Acknowledgments

- Design inspiration from Spotify's mobile app
- Icons provided by Heroicons
- Built with Next.js and Tailwind CSS
