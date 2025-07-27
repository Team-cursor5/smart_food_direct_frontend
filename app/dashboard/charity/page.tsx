'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CharityDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    organizationName: 'Mekedonia Organization',
    email: 'contact@mekedonia.org',
    location: 'Addis Ababa, Ethiopia',
    category: 'Elders Center',
    phoneNumber: '+251 911 234 567',
    description: 'Supporting elderly people in need'
  });

  const navigationItems = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard', active: false },
    { name: 'Charity', icon: '❤️', href: '/dashboard/charity', active: true },
    { name: 'Profile', icon: '👤', href: '/profile', active: false },
    { name: 'Map', icon: '🗺️', href: '/map', active: false },
    { name: 'Requests', icon: '📝', href: '/requests', active: false },
    { name: 'Donations', icon: '📦', href: '/donations', active: false }
  ];

  const charityCategories = [
    'Children Center',
    'Elders Center',
    'Special Needs Center',
    'Food Bank'
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

  const receivedDonations = [
    {
      id: 1,
      title: 'Fresh Vegetables',
      donor: 'Fresh Market',
      quantity: '50 kg',
      date: '1 day ago',
      status: 'Received',
      icon: '🥬'
    },
    {
      id: 2,
      title: 'Bread and Pastries',
      donor: 'Bakery Corner',
      quantity: '100 pieces',
      date: '2 days ago',
      status: 'Received',
      icon: '🥖'
    },
    {
      id: 3,
      title: 'Canned Goods',
      donor: 'Super Market',
      quantity: '25 cans',
      date: '3 days ago',
      status: 'In Transit',
      icon: '🥫'
    }
  ];

  const activeRequests = [
    {
      id: 1,
      title: 'Urgent: Fresh Food Needed',
      description: 'Need fresh vegetables and fruits for 50 elderly people',
      category: 'Fruits & Veggies',
      priority: 'High',
      status: 'Active',
      icon: '🚨'
    },
    {
      id: 2,
      title: 'Daily Bread Request',
      description: 'Regular bread supply for our daily meal program',
      category: 'Bakery',
      priority: 'Medium',
      status: 'Active',
      icon: '🥖'
    },
    {
      id: 3,
      title: 'Canned Food Collection',
      description: 'Canned goods for emergency food storage',
      category: 'Groceries',
      priority: 'Low',
      status: 'Active',
      icon: '🥫'
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
            <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{profileData.organizationName}</p>
              <p className="text-xs text-gray-500 truncate">Charity Account</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Charity Dashboard</h1>
                <p className="text-gray-600">Welcome back, {profileData.organizationName}!</p>
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
              <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl shadow-sm border border-red-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">❤️</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Charity Dashboard</h2>
                <p className="text-gray-600">Manage your organization and receive donations</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Welcome to your charity dashboard! Here you can manage donation requests, 
              track received donations, and update your organization profile. 
              Connect with donors and help more people in need.
            </p>
          </div>

          {/* Organization Profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Organization Profile</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organization Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {profileData.organizationName}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {profileData.email}
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {profileData.location}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {profileData.phoneNumber}
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Category
                </label>
                {isEditing ? (
                  <select
                    value={profileData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    {charityCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {profileData.category}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {profileData.description}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Received Donations */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recently Received Donations</h3>
              <Link
                href="/donations"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {receivedDonations.map((donation) => (
                <div key={donation.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">{donation.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{donation.title}</h4>
                    <p className="text-sm text-gray-500">
                      {donation.donor} • {donation.quantity} • {donation.date}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    donation.status === 'Received' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {donation.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Requests */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Active Donation Requests</h3>
              <Link
                href="/requests/create"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Create Request
              </Link>
            </div>
            
            <div className="space-y-4">
              {activeRequests.map((request) => (
                <div key={request.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-xl">{request.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{request.title}</h4>
                      <p className="text-sm text-gray-600">{request.description}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      request.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : request.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {request.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Category: {request.category}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl shadow-sm border border-purple-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-600">42</div>
                  <div className="text-purple-700 font-medium">Donations Received</div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-600">89</div>
                  <div className="text-green-700 font-medium">People Served</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-blue-600">12</div>
                  <div className="text-blue-700 font-medium">This Month</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/requests/create"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📝</div>
                <div className="font-semibold">Create Request</div>
              </div>
            </Link>
            <Link
              href="/donations"
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📦</div>
                <div className="font-semibold">View Donations</div>
              </div>
            </Link>
            <Link
              href="/profile"
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">✏️</div>
                <div className="font-semibold">Update Profile</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
