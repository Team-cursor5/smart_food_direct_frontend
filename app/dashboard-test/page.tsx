'use client';

import { useState } from 'react';
import Link from 'next/link';

type UserType = 'Business' | 'Individual' | 'Charity';

export default function DashboardTestPage() {
  const [selectedType, setSelectedType] = useState<UserType>('Individual');

  const userTypes = [
    {
      type: 'Business' as UserType,
      name: 'Business Dashboard',
      icon: '🏪',
      description: 'For restaurants, markets, and food businesses',
      color: 'from-orange-400 to-pink-500',
      href: '/dashboard/business',
      features: ['Manage business profile', 'Track donations made', 'View donation requests', 'Business analytics']
    },
    {
      type: 'Individual' as UserType,
      name: 'Individual Dashboard',
      icon: '👤',
      description: 'For individual donors and volunteers',
      color: 'from-blue-400 to-purple-500',
      href: '/dashboard/individual',
      features: ['Browse available donations', 'Make donations', 'Track donation history', 'View organizations']
    },
    {
      type: 'Charity' as UserType,
      name: 'Charity Dashboard',
      icon: '❤️',
      description: 'For non-profit organizations and charities',
      color: 'from-red-400 to-pink-500',
      href: '/dashboard/charity',
      features: ['Create donation requests', 'Track received donations', 'Manage organization profile', 'View donor analytics']
    }
  ];

  const handleTypeSelect = (type: UserType) => {
    setSelectedType(type);
    localStorage.setItem('userType', type);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard Test Page</h1>
          <p className="text-xl text-gray-600">
            Test different dashboard types for Business, Individual, and Charity users
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {userTypes.map((userType) => (
            <div
              key={userType.type}
              className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                selectedType === userType.type
                  ? 'border-emerald-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleTypeSelect(userType.type)}
            >
              <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${userType.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-3xl">{userType.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                  {userType.name}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {userType.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {userType.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={userType.href}
                  className={`block w-full text-center py-3 px-6 rounded-xl font-medium transition-colors duration-200 ${
                    selectedType === userType.type
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedType === userType.type ? 'View Dashboard' : 'Select & View'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-3xl mb-3">📊</div>
              <div className="font-semibold">Main Dashboard</div>
              <div className="text-sm opacity-90">Dynamic dashboard</div>
            </Link>
            
            <Link
              href="/dashboard/business"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-3xl mb-3">🏪</div>
              <div className="font-semibold">Business</div>
              <div className="text-sm opacity-90">Business dashboard</div>
            </Link>
            
            <Link
              href="/dashboard/individual"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-3xl mb-3">👤</div>
              <div className="font-semibold">Individual</div>
              <div className="text-sm opacity-90">Individual dashboard</div>
            </Link>
            
            <Link
              href="/dashboard/charity"
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-3xl mb-3">❤️</div>
              <div className="font-semibold">Charity</div>
              <div className="text-sm opacity-90">Charity dashboard</div>
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Select a user type from the cards above</li>
            <li>Click "View Dashboard" to see the specific dashboard</li>
            <li>Use the user type selector in the top bar to switch between types</li>
            <li>Each dashboard has different features and content based on user type</li>
            <li>Test the responsive design on different screen sizes</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 