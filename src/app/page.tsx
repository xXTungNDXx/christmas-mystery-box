import React from 'react';
import ChristmasMysteryBox from '@/components/ChristmasMysteryBox';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 dark:from-red-950 dark:to-green-950">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-400 mb-4">
            🎄 Christmas Mystery Box 🎁
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Pick a box and discover your special holiday surprise!
          </p>
        </header>
        
        <main className="max-w-6xl mx-auto">
          <ChristmasMysteryBox />
        </main>

        <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Christmas Mystery Box. Made with ❤️ for the holidays</p>
        </footer>
      </div>
    </div>
  );
}