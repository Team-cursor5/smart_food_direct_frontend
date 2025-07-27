'use client';

import { useState } from 'react';
import Link from 'next/link';

type UserType = 'Business' | 'Individual' | 'Charity';

interface UserTypeSelectorProps {
  currentType: UserType;
  onTypeChange: (type: UserType) => void;
}

export default function UserTypeSelector({ currentType, onTypeChange }: UserTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const userTypes = [
    {
      type: 'Business' as UserType,
      name: 'Business',
      icon: '🏪',
      description: 'Restaurants, markets, and food businesses',
      color: 'from-orange-400 to-pink-500',
      href: '/dashboard/business'
    },
    {
      type: 'Individual' as UserType,
      name: 'Individual',
      icon: '👤',
      description: 'Individual donors and volunteers',
      color: 'from-blue-400 to-purple-500',
      href: '/dashboard/individual'
    },
    {
      type: 'Charity' as UserType,
      name: 'Charity',
      icon: '❤️',
      description: 'Non-profit organizations and charities',
      color: 'from-red-400 to-pink-500',
      href: '/dashboard/charity'
    }
  ];

  const currentUserType = userTypes.find(ut => ut.type === currentType);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
      >
        <div className={`w-10 h-10 bg-gradient-to-r ${currentUserType?.color} rounded-full flex items-center justify-center`}>
          <span className="text-white font-bold">{currentUserType?.icon}</span>
        </div>
        <div className="text-left">
          <div className="font-medium text-gray-900">{currentUserType?.name}</div>
          <div className="text-sm text-gray-500">{currentUserType?.description}</div>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-2 space-y-1">
            {userTypes.map((userType) => (
              <Link
                key={userType.type}
                href={userType.href}
                onClick={() => {
                  onTypeChange(userType.type);
                  setIsOpen(false);
                  localStorage.setItem('userType', userType.type);
                }}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  currentType === userType.type
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 bg-gradient-to-r ${userType.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-sm">{userType.icon}</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">{userType.name}</div>
                  <div className="text-sm text-gray-500">{userType.description}</div>
                </div>
                {currentType === userType.type && (
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 