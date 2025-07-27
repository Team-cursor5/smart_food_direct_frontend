'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserTypeSelector from '../components/UserTypeSelector';

type UserType = 'Business' | 'Individual' | 'Charity';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState<UserType>('Individual');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simulate user data - in real app, this would come from API
  useEffect(() => {
    // Check localStorage for user type or default to Individual
    const storedUserType = localStorage.getItem('userType') as UserType;
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserType) {
      setUserType(storedUserType);
    }
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    setLoading(false);
  }, []);

  const handleUserTypeChange = (newType: UserType) => {
    setUserType(newType);
    localStorage.setItem('userType', newType);
  };

  const navigationItems = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard', active: true },
    { name: 'Profile', icon: '👤', href: '/profile', active: false },
    { name: 'Navigate', icon: '🗺️', href: '/navigate', active: false },
    { name: 'Giveaways', icon: '🎁', href: '/giveaways', active: false },
    { name: 'Donations', icon: '❤️', href: '/donations', active: false },
    { name: 'Settings', icon: '⚙️', href: '/settings', active: false }
  ];

  const getWelcomeMessage = () => {
    switch (userType) {
      case 'Business':
        return {
          title: 'Welcome back!',
          subtitle: 'Tasty Bites Restaurant',
          icon: '🏪',
          description: 'Manage your business donations and help your community'
        };
      case 'Charity':
        return {
          title: 'Welcome back!',
          subtitle: 'Mekedonia Organization',
          icon: '❤️',
          description: 'Manage your organization and receive donations'
        };
      default:
        return {
          title: 'Welcome back!',
          subtitle: 'John Doe',
          icon: '👤',
          description: 'Browse donations and help your community'
        };
    }
  };

  const getStats = () => {
    switch (userType) {
      case 'Business':
        return [
          { label: 'Total Donations', value: '26', icon: '🎁', color: 'text-red-500', bgColor: 'bg-red-100' },
          { label: 'This Month', value: '8', icon: '📅', color: 'text-blue-500', bgColor: 'bg-blue-100' },
          { label: 'People Helped', value: '156', icon: '👥', color: 'text-green-500', bgColor: 'bg-green-100' }
        ];
      case 'Charity':
        return [
          { label: 'Donations Received', value: '42', icon: '📦', color: 'text-purple-500', bgColor: 'bg-purple-100' },
          { label: 'This Month', value: '12', icon: '📅', color: 'text-blue-500', bgColor: 'bg-blue-100' },
          { label: 'People Served', value: '89', icon: '👥', color: 'text-green-500', bgColor: 'bg-green-100' }
        ];
      default:
        return [
          { label: 'Donations Made', value: '15', icon: '❤️', color: 'text-red-500', bgColor: 'bg-red-100' },
          { label: 'This Month', value: '3', icon: '📅', color: 'text-blue-500', bgColor: 'bg-blue-100' },
          { label: 'Organizations Helped', value: '7', icon: '🏢', color: 'text-green-500', bgColor: 'bg-green-100' }
        ];
    }
  };

  const getQuickActions = () => {
    switch (userType) {
      case 'Business':
        return [
          { name: 'Make Donation', icon: '🎁', href: '/donations/create', color: 'from-orange-500 to-red-500' },
          { name: 'View Requests', icon: '📋', href: '/requests', color: 'from-purple-500 to-pink-500' },
          { name: 'Update Profile', icon: '✏️', href: '/profile', color: 'from-emerald-500 to-blue-600' }
        ];
      case 'Charity':
        return [
          { name: 'Create Request', icon: '📝', href: '/requests/create', color: 'from-blue-500 to-purple-500' },
          { name: 'View Donations', icon: '📦', href: '/donations', color: 'from-green-500 to-emerald-500' },
          { name: 'Update Profile', icon: '✏️', href: '/profile', color: 'from-emerald-500 to-blue-600' }
        ];
      default:
        return [
          { name: 'Browse Donations', icon: '🔍', href: '/donations', color: 'from-emerald-500 to-blue-600' },
          { name: 'Make Donation', icon: '❤️', href: '/donations/create', color: 'from-orange-500 to-red-500' },
          { name: 'View Organizations', icon: '🏢', href: '/organizations', color: 'from-purple-500 to-pink-500' }
        ];
    }
  };

  const getRecentActivities = () => {
    switch (userType) {
      case 'Business':
        return [
          { action: 'Donated food to Children\'s Home', time: '2 days ago', icon: '🎁' },
          { action: 'Updated business profile', time: '3 days ago', icon: '✏️' },
          { action: 'Received donation request', time: '1 week ago', icon: '📋' }
        ];
      case 'Charity':
        return [
          { action: 'Received food donation', time: '1 day ago', icon: '📦' },
          { action: 'Created donation request', time: '3 days ago', icon: '📝' },
          { action: 'Updated organization profile', time: '1 week ago', icon: '✏️' }
        ];
      default:
        return [
          { action: 'Donated to local charity', time: '2 days ago', icon: '❤️' },
          { action: 'Received notification', time: '3 days ago', icon: '🔔' },
          { action: 'Updated profile information', time: '1 week ago', icon: '✏️' }
        ];
    }
  };

  const welcome = getWelcomeMessage();
  const stats = getStats();
  const quickActions = getQuickActions();
  const recentActivities = getRecentActivities();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{welcome.subtitle.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{welcome.subtitle}</p>
              <p className="text-xs text-gray-500 truncate">{userType} Account</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <UserTypeSelector 
                currentType={userType} 
                onTypeChange={handleUserTypeChange} 
              />
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{welcome.title}</h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-lg">{welcome.icon}</span>
              <span className="font-medium">{welcome.subtitle}</span>
            </div>
            <p className="text-gray-500 mt-2">{welcome.description}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-gray-500">{stat.label}</div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="font-semibold">{action.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
