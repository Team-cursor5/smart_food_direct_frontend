'use client';

import Link from 'next/link';
import { useState } from 'react';

type UserType = 'Individual' | 'Business' | 'Charity';

interface FormData {
  name: string;
  email: string;
  password: string;
  location?: string;
  businessLicense?: string;
  category?: string;
}

interface FormField {
  name: keyof FormData;
  label: string;
  type: 'text' | 'email' | 'password' | 'select';
  placeholder: string;
  required: boolean;
  options?: string[];
}

const businessCategories = [
  'Cooked Meals',
  'Drinks', 
  'Dairy Products',
  'Bakery',
  'Fruits & Veggies'
];

const charityCategories = [
  'Children Center',
  'Elders Center', 
  'Special Needs Center',
  'Food Bank'
];

export default function SignUpPage() {
  const [selectedType, setSelectedType] = useState<UserType>('Individual');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    location: '',
    businessLicense: '',
    category: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { userType: selectedType, ...formData });
    // Handle form submission here
  };

  const userTypeConfig: Record<UserType, {
    icon: string;
    title: string;
    description: string;
    fields: FormField[];
  }> = {
    Individual: {
      icon: '🧍‍♂️',
      title: 'Join as an Individual',
      description: 'Sign up to receive and share food items in your community',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email address', required: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a strong password', required: true }
      ]
    },
    Business: {
      icon: '🏪',
      title: 'Join as a Business',
      description: 'Connect with your community by sharing surplus food and products',
      fields: [
        { name: 'name', label: 'Business Name', type: 'text', placeholder: 'Enter your business name', required: true },
        { name: 'email', label: 'Business Email', type: 'email', placeholder: 'Enter your business email', required: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a strong password', required: true },
        { name: 'location', label: 'Business Location', type: 'text', placeholder: 'Enter your business address', required: true },
        { name: 'businessLicense', label: 'Business License Number', type: 'text', placeholder: 'Enter your license number', required: true },
        { name: 'category', label: 'Business Category', type: 'select', placeholder: 'Select business category', options: businessCategories, required: true }
      ]
    },
    Charity: {
      icon: '❤️',
      title: 'Join as a Charity',
      description: 'Help distribute food and resources to those who need them most',
      fields: [
        { name: 'name', label: 'Organization Name', type: 'text', placeholder: 'Enter your organization name', required: true },
        { name: 'email', label: 'Organization Email', type: 'email', placeholder: 'Enter your organization email', required: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a strong password', required: true },
        { name: 'location', label: 'Organization Location', type: 'text', placeholder: 'Enter your organization address', required: true },
        { name: 'category', label: 'Organization Category', type: 'select', placeholder: 'Select organization category', options: charityCategories, required: true }
      ]
    }
  };

  const currentConfig = userTypeConfig[selectedType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center mb-6 group">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Food Bridge
            </span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-lg text-gray-600">
            Join our community and start making a difference
          </p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Choose Your Account Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['Individual', 'Business', 'Charity'] as UserType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedType === type
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">{userTypeConfig[type].icon}</div>
                <div className="font-medium text-gray-900">{type}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-3xl mb-3">{currentConfig.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentConfig.title}
            </h2>
            <p className="text-gray-600">
              {currentConfig.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentConfig.fields.map((field) => (
                <div
                  key={field.name}
                  className={field.name === 'category' ? 'md:col-span-2' : ''}
                >
                  <label 
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      value={formData[field.name as keyof FormData] || ''}
                      onChange={(e) => handleInputChange(field.name as keyof FormData, e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white"
                    >
                      <option value="">Select a category</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      value={formData[field.name as keyof FormData] || ''}
                      onChange={(e) => handleInputChange(field.name as keyof FormData, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/signin" 
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our community guidelines and safety standards.
          </p>
        </div>
      </div>
    </div>
  );
}
