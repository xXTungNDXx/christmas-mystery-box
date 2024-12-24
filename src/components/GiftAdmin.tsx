"use client"

import React, { useState } from 'react';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Gift {
  id: number;
  name: string;
  description: string;
  probability: number;
}

const GiftAdmin = () => {
  const [gifts, setGifts] = useState<Gift[]>([
    { id: 1, name: "Holiday Cruise", description: "A magical 7-day Caribbean cruise!", probability: 5 },
    { id: 2, name: "Gaming Console", description: "The latest gaming console with virtual reality!", probability: 15 },
    { id: 3, name: "Smart Home Bundle", description: "Transform your home with smart devices!", probability: 20 },
    { id: 4, name: "Luxury Watch", description: "A premium timepiece for your collection!", probability: 10 },
    { id: 5, name: "Adventure Package", description: "Skydiving and wilderness expedition!", probability: 20 },
    { id: 6, name: "Tech Gadget Set", description: "Latest smartphone and accessories!", probability: 30 }
  ]);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [newGift, setNewGift] = useState<Omit<Gift, 'id'>>({
    name: '',
    description: '',
    probability: 0
  });

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (gift: Gift) => {
    setEditingId(gift.id);
    setNewGift({
      name: gift.name,
      description: gift.description,
      probability: gift.probability
    });
  };

  const handleSave = (id: number | null) => {
    if (!newGift.name || !newGift.description || !newGift.probability) {
      showMessage('Please fill all fields');
      return;
    }

    const totalProb = gifts.reduce((sum, gift) => 
      gift.id !== id ? sum + gift.probability : sum, 0) + Number(newGift.probability);

    if (totalProb !== 100) {
      showMessage('Total probability must equal 100%');
      return;
    }

    if (id) {
      setGifts(gifts.map(gift => 
        gift.id === id ? { ...gift, ...newGift } : gift
      ));
    } else {
      setGifts([...gifts, { 
        id: Math.max(...gifts.map(g => g.id)) + 1,
        ...newGift 
      }]);
    }
    
    setEditingId(null);
    setNewGift({ name: '', description: '', probability: 0 });
    showMessage('Gift saved successfully!');
  };

  const handleDelete = (id: number) => {
    setGifts(gifts.filter(gift => gift.id !== id));
    showMessage('Gift deleted successfully!');
  };

  const handleAddNew = () => {
    setEditingId(0);
    setNewGift({ name: '', description: '', probability: 0 });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold mb-4">Gift Management</CardTitle>
        <Button 
          onClick={handleAddNew}
          className="bg-green-500 hover:bg-green-600 mb-4"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Gift
        </Button>
      </CardHeader>

      {message && (
        <Alert className="mb-4 bg-blue-100">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {gifts.map(gift => (
          <Card key={gift.id} className="p-4">
            {editingId === gift.id ? (
              <div className="space-y-4">
                <Input
                  placeholder="Gift Name"
                  value={newGift.name}
                  onChange={e => setNewGift({...newGift, name: e.target.value})}
                  className="mb-2"
                />
                <Input
                  placeholder="Description"
                  value={newGift.description}
                  onChange={e => setNewGift({...newGift, description: e.target.value})}
                  className="mb-2"
                />
                <Input
                  type="number"
                  placeholder="Probability (%)"
                  value={newGift.probability}
                  onChange={e => setNewGift({...newGift, probability: Number(e.target.value)})}
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <Button onClick={() => handleSave(gift.id)} className="bg-green-500 hover:bg-green-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button onClick={() => setEditingId(null)} className="bg-gray-500 hover:bg-gray-600">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{gift.name}</h3>
                  <p className="text-gray-600">{gift.description}</p>
                  <p className="text-sm text-gray-500">Probability: {gift.probability}%</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(gift)} className="bg-blue-500 hover:bg-blue-600">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleDelete(gift.id)} className="bg-red-500 hover:bg-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}

        {editingId === 0 && (
          <Card className="p-4">
            <div className="space-y-4">
              <Input
                placeholder="Gift Name"
                value={newGift.name}
                onChange={e => setNewGift({...newGift, name: e.target.value})}
                className="mb-2"
              />
              <Input
                placeholder="Description"
                value={newGift.description}
                onChange={e => setNewGift({...newGift, description: e.target.value})}
                className="mb-2"
              />
              <Input
                type="number"
                placeholder="Probability (%)"
                value={newGift.probability}
                onChange={e => setNewGift({...newGift, probability: Number(e.target.value)})}
                className="mb-2"
              />
              <div className="flex gap-2">
                <Button onClick={() => handleSave(0)} className="bg-green-500 hover:bg-green-600">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button onClick={() => setEditingId(null)} className="bg-gray-500 hover:bg-gray-600">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GiftAdmin;