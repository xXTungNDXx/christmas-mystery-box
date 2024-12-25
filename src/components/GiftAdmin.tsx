"use client"

import React, { useState } from 'react';
import { Save, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useGiftStore, Gift } from '../store/giftStore';

const GiftAdmin = () => {
  const { gifts: initialGifts, setGifts } = useGiftStore();
  const [gifts, setLocalGifts] = useState<Gift[]>(initialGifts);
  const [message, setMessage] = useState('');

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGiftChange = (id: number, field: keyof Omit<Gift, 'id'>, value: string | number) => {
    setLocalGifts(gifts.map(gift => 
      gift.id === id ? { ...gift, [field]: field === 'probability' ? Number(value) : value } : gift
    ));
  };

  const handleAddGift = () => {
    const newId = Math.max(...gifts.map(g => g.id)) + 1;
    setLocalGifts([...gifts, {
      id: newId,
      name: '',
      description: '',
      probability: 0
    }]);
  };

  const handleRemoveGift = (id: number) => {
    setLocalGifts(gifts.filter(gift => gift.id !== id));
  };

  const handleSaveAll = () => {
    // Validate all fields are filled
    if (gifts.some(gift => !gift.name || !gift.description || !gift.probability)) {
      showMessage('Please fill all fields for all gifts');
      return;
    }

    // Validate total probability equals 100
    const totalProbability = gifts.reduce((sum, gift) => sum + gift.probability, 0);
    if (totalProbability !== 100) {
      showMessage(`Total probability must equal 100%. Current total: ${totalProbability}%`);
      return;
    }

    setGifts(gifts);
    showMessage('All gifts saved successfully!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <CardHeader className="px-0">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-2xl font-bold">Gift Management</CardTitle>
          <div className="flex gap-2">
            <Button 
              onClick={handleAddGift}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Gift
            </Button>
            <Button 
              onClick={handleSaveAll}
              className="bg-green-500 hover:bg-green-600"
            >
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </Button>
          </div>
        </div>
      </CardHeader>

      {message && (
        <Alert className="mb-4 bg-blue-100">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Card className="p-4">
          <div className="grid grid-cols-12 gap-4 font-bold mb-2">
            <div className="col-span-3">Name</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Probability (%)</div>
            <div className="col-span-2">Actions</div>
          </div>
        </Card>

        {gifts.map(gift => (
          <Card key={gift.id} className="p-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <Input
                  value={gift.name}
                  onChange={e => handleGiftChange(gift.id, 'name', e.target.value)}
                  placeholder="Gift Name"
                />
              </div>
              <div className="col-span-5">
                <Input
                  value={gift.description}
                  onChange={e => handleGiftChange(gift.id, 'description', e.target.value)}
                  placeholder="Description"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={gift.probability}
                  onChange={e => handleGiftChange(gift.id, 'probability', e.target.value)}
                  placeholder="Probability"
                />
              </div>
              <div className="col-span-2">
                <Button
                  onClick={() => handleRemoveGift(gift.id)}
                  variant="destructive"
                  className="w-full"
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Total Probability: {gifts.reduce((sum, gift) => sum + gift.probability, 0)}%
          </div>
          <Button 
            onClick={handleSaveAll}
            className="bg-green-500 hover:bg-green-600"
          >
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GiftAdmin;