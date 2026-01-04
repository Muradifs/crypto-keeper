import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Ako koristiš Shadcn/UI, prilagodi path
import { RotateCcw } from 'lucide-react'; // Za ikonu

export default function CryptoKeeperGame() {
  const [currentLevel, setCurrentLevel] = useState(0); // Početni level

  // Primjer funkcije za load level (zamijeni sa stvarnom logikom igre)
  const loadLevel = (level: number) => {
    console.log(`Loading level ${level}`);
    // Ovdje dodaj logiku za reset igre, npr. ucitaj mapu levela
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Crypto Keeper Game</h1>
      
      {/* Glavni sadržaj igre - dodaj grid ili canvas ovdje */}
      <div className="w-96 h-96 bg-white border-2 border-orange-500 mb-8">
        {/* Primjer: Game grid here - implementiraj puzzle logiku */}
        <p className="text-center pt-40">Level {currentLevel + 1}: Push blocks to targets</p>
      </div>
      
      {/* Dugmad */}
      <div className="flex space-x-4">
        <Button 
          onClick={() => loadLevel(currentLevel)} 
          size="lg" 
          className="flex-1 bg-orange-500 hover:bg-orange-600"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
        
        {currentLevel < 49 && (
          <Button 
            onClick={() => setCurrentLevel(currentLevel + 1)} 
            size="lg" 
            variant="outline"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}