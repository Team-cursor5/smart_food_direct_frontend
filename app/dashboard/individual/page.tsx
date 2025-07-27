'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function IndividualDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    location: 'Addis Ababa, Ethiopia',
    phoneNumber: '+251 912 345 678'
  });

  const navigationItems = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard', active: false },
    { name: 'Individual', icon: '👤', href: '/dashboard/individual', active: true },
    { name: 'Profile', icon: '👤', href: '/profile', active: false },
    { name: 'Map', icon: '🗺️', href: '/map', active: false },
    { name: 'Giveaways', icon: '🎁', href: '/giveaways', active: false },
    { name: 'Donations', icon: '❤️', href: '/donations', active: false }
  ];

  const handleInputChange = (field: keyof typeof profileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const availableDonations = [
    {
      id: 1,
      title: 'Fresh Vegetables',
      description: 'Fresh vegetables from local market',
      donor: 'Fresh Market',
      location: 'Addis Ababa',
      category: 'Fruits & Veggies',
      icon: '🥬',
      distance: '2.3 km',
      expiresIn: '2 hours'
    },
    {
      id: 2,
      title: 'Bread and Pastries',
      description: 'Day-old bread and pastries',
      donor: 'Bakery Corner',
      location: 'Addis Ababa',
      category: 'Bakery',
      icon: '🥖',
      distance: '1.8 km',
      expiresIn: '4 hours'
    },
    {
      id: 3,
      title: 'Canned Goods',
      description: 'Various canned food items',
      donor: 'Super Market',
      location: 'Addis Ababa',
      category: 'Groceries',
      icon: '🥫',
      distance: '3.1 km',
      expiresIn: '1 day'
    }
  ];

  const recentDonations = [
    {
      id: 1,
      title: 'Donated to Children\'s Home',
      amount: '500 ETB',
      date: '2 days ago',
      status: 'Completed',
      icon: '❤️'
    },
    {
      id: 2,
      title: 'Food donation to Elderly Center',
      items: 'Fresh vegetables and bread',
      date: '1 week ago',
      status: 'Completed',
      icon: '🥬'
    },
    {
      id: 3,
      title: 'Monetary donation to Food Bank',
      amount: '1000 ETB',
      date: '2 weeks ago',
      status: 'Completed',
      icon: '💰'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Food Bridge</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">J</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{profileData.fullName}</p>
              <p className="text-xs text-gray-500 truncate">Individual Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Individual Dashboard</h1>
                <p className="text-gray-600">Welcome back, {profileData.fullName}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-sm border border-blue-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">👤</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Individual Dashboard</h2>
                <p className="text-gray-600">Browse donations and help your community</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Welcome to your individual dashboard! Here you can browse available donations, 
              make donations to organizations in need, and track your donation history. 
              Every contribution helps make a difference in your community.
            </p>
          </div>

          {/* Available Donations */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Available Donations Near You</h3>
              <Link
                href="/donations"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableDonations.map((donation) => (
                <div key={donation.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{donation.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{donation.title}</h4>
                      <p className="text-sm text-gray-500">{donation.donor}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{donation.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>📍 {donation.distance}</span>
                    <span>⏰ {donation.expiresIn}</span>
                  </div>
                  <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    Request Donation
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Donations */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Your Recent Donations</h3>
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div key={donation.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">{donation.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{donation.title}</h4>
                    <p className="text-sm text-gray-500">
                      {donation.amount && `${donation.amount} • `}
                      {donation.items && `${donation.items} • `}
                      {donation.date}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {donation.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl shadow-sm border border-red-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-red-600">15</div>
                  <div className="text-red-700 font-medium">Donations Made</div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-blue-600">7</div>
                  <div className="text-blue-700 font-medium">Organizations Helped</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-600">3</div>
                  <div className="text-green-700 font-medium">This Month</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/donations"
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-semibold">Browse Donations</div>
              </div>
            </Link>
            <Link
              href="/donations/create"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">❤️</div>
                <div className="font-semibold">Make Donation</div>
              </div>
            </Link>
            <Link
              href="/organizations"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🏢</div>
                <div className="font-semibold">View Organizations</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
