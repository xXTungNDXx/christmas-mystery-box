"use client"

import React, { useState } from 'react';
import { Gift, GiftIcon, Share2, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ChristmasMysteryBox = () => {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [revealedGift, setRevealedGift] = useState<{ name: string; description: string } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const gifts = [
    { name: "Holiday Cruise", description: "A magical 7-day Caribbean cruise!" },
    { name: "Gaming Console", description: "The latest gaming console with virtual reality!" },
    { name: "Smart Home Bundle", description: "Transform your home with smart devices!" },
    { name: "Luxury Watch", description: "A premium timepiece for your collection!" },
    { name: "Adventure Package", description: "Skydiving and wilderness expedition!" },
    { name: "Tech Gadget Set", description: "Latest smartphone and accessories!" }
  ];

  const handleBoxSelect = (boxNumber: number) => {
    if (isAnimating || revealedGift) return;
    
    setIsAnimating(true);
    setSelectedBox(boxNumber);
    
    setTimeout(() => {
      const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
      setRevealedGift(randomGift);
      setIsAnimating(false);
    }, 2000);
  };

  const handleShare = () => {
    if (!revealedGift) return;
    alert('Sharing functionality would be implemented here!');
  };

  const resetGame = () => {
    setSelectedBox(null);
    setRevealedGift(null);
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Christmas Mystery Box
        </h1>
        
        {revealedGift ? (
          <div className="space-y-4">
            <Alert className="bg-green-100 border-green-200">
              <GiftIcon className="h-4 w-4" />
              <AlertTitle>Congratulations!</AlertTitle>
              <AlertDescription>
                You won: {revealedGift.name}
                <p className="mt-2">{revealedGift.description}</p>
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleShare}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              
              <Button
                onClick={resetGame}
                className="bg-green-500 hover:bg-green-600"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((boxNum) => (
              <Card
                key={boxNum}
                className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  selectedBox === boxNum ? 'ring-4 ring-green-500' : ''
                } ${isAnimating && selectedBox === boxNum ? 'animate-bounce' : ''}`}
                onClick={() => handleBoxSelect(boxNum)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <Gift
                      className={`w-24 h-24 ${
                        selectedBox === boxNum ? 'text-green-500' : 'text-red-500'
                      }`}
                    />
                    <p className="text-lg font-semibold">Mystery Box {boxNum}</p>
                    <Button
                      disabled={isAnimating}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Choose This Box
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChristmasMysteryBox;