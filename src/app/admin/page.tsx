"use client"

import { useState } from 'react';
import AdminLogin from '@/components/AdminLogin';
import GiftAdmin from '@/components/GiftAdmin';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        {!isAuthenticated ? (
          <AdminLogin onLogin={handleLogin} />
        ) : (
          <GiftAdmin />
        )}
      </div>
    </div>
  );
}