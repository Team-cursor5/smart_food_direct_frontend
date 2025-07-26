'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Enhanced dummy data for food & drink giveaways
const allGiveaways = [
  {
    id: 1,
    title: "Fresh Baked Bread & Croissants",
    description: "Freshly baked artisan bread, croissants, and pastries from our morning batch. Perfect for families.",
    donor: "Addis Artisan Bakery",
    location: "Bole, Addis Ababa",
    category: "Bakery",
    available: true,
    expires: "Today",
    image: "/images/food/bread.jpg"
  },
  {
    id: 2,
    title: "Organic Fresh Vegetables Bundle",
    description: "Fresh organic vegetables including tomatoes, onions, carrots, and leafy greens from our garden.",
    donor: "Community Garden Co.",
    location: "Yeka, Addis Ababa",
    category: "Fruits & Veggies",
    available: true,
    expires: "Tomorrow",
    image: "/images/food/vegetables.jpg"
  },
  {
    id: 3,
    title: "Traditional Ethiopian Coffee",
    description: "Freshly roasted Ethiopian coffee beans and traditional coffee ceremony supplies.",
    donor: "Ethiopian Coffee House",
    location: "Kazanchis, Addis Ababa",
    category: "Drinks",
    available: true,
    expires: "3 days",
    image: "/images/food/coffee.jpg"
  },
  {
    id: 4,
    title: "Fresh Milk & Dairy Products",
    description: "Fresh cow milk, yogurt, and cheese from local dairy farms. Pasteurized and safe.",
    donor: "Addis Dairy Farm",
    location: "Kolfe, Addis Ababa",
    category: "Dairy Products",
    available: true,
    expires: "Today",
    image: "/images/food/dairy.jpg"
  },
  {
    id: 5,
    title: "Hot Traditional Lunch Meals",
    description: "Freshly prepared traditional Ethiopian meals including injera, wot, and vegetables.",
    donor: "Mekedonia Charity Kitchen",
    location: "Meskel Square, Addis Ababa",
    category: "Cooked Meals",
    available: true,
    expires: "Today",
    image: "/images/food/lunch.jpg"
  },
  {
    id: 6,
    title: "Fresh Fruits Basket",
    description: "Assorted fresh fruits including bananas, oranges, apples, and seasonal fruits.",
    donor: "Fresh Fruit Market",
    location: "Saris, Addis Ababa",
    category: "Fruits & Veggies",
    available: true,
    expires: "2 days",
    image: "/images/food/fruits.jpg"
  },
  {
    id: 7,
    title: "Fresh Juice & Smoothies",
    description: "Freshly squeezed fruit juices and healthy smoothies made with local fruits.",
    donor: "Healthy Juice Bar",
    location: "Bole, Addis Ababa",
    category: "Drinks",
    available: true,
    expires: "Today",
    image: "/images/food/juice.jpg"
  },
  {
    id: 8,
    title: "Homemade Cakes & Desserts",
    description: "Delicious homemade cakes, cookies, and desserts perfect for special occasions.",
    donor: "Sweet Treats Bakery",
    location: "Kazanchis, Addis Ababa",
    category: "Bakery",
    available: true,
    expires: "Tomorrow",
    image: "/images/food/cakes.jpg"
  },
  {
    id: 9,
    title: "Fresh Eggs & Poultry",
    description: "Fresh farm eggs and poultry products from local farms. High quality and safe.",
    donor: "Addis Poultry Farm",
    location: "Yeka, Addis Ababa",
    category: "Dairy Products",
    available: true,
    expires: "3 days",
    image: "/images/food/eggs.jpg"
  },
  {
    id: 10,
    title: "Traditional Breakfast Meals",
    description: "Hot traditional breakfast including ful, eggs, and fresh bread with tea.",
    donor: "Morning Delights Cafe",
    location: "Kolfe, Addis Ababa",
    category: "Cooked Meals",
    available: true,
    expires: "Today",
    image: "/images/food/breakfast.jpg"
  },
  {
    id: 11,
    title: "Fresh Herbs & Spices",
    description: "Fresh herbs, spices, and seasoning blends for traditional Ethiopian cooking.",
    donor: "Spice Garden Market",
    location: "Saris, Addis Ababa",
    category: "Fruits & Veggies",
    available: true,
    expires: "4 days",
    image: "/images/food/herbs.jpg"
  },
  {
    id: 12,
    title: "Traditional Tea & Coffee Service",
    description: "Complete traditional Ethiopian tea and coffee service with snacks and sweets.",
    donor: "Ethiopian Tea House",
    location: "Bole, Addis Ababa",
    category: "Drinks",
    available: true,
    expires: "2 days",
    image: "/images/food/tea.jpg"
  },
  {
    id: 13,
    title: "Fresh Pasta & Italian Food",
    description: "Fresh homemade pasta, sauces, and Italian dishes prepared by local chef.",
    donor: "Italian Kitchen",
    location: "Kazanchis, Addis Ababa",
    category: "Cooked Meals",
    available: true,
    expires: "Tomorrow",
    image: "/images/food/pasta.jpg"
  },
  {
    id: 14,
    title: "Artisan Cheese Selection",
    description: "Premium artisan cheeses including mozzarella, cheddar, and local varieties.",
    donor: "Cheese Artisans",
    location: "Yeka, Addis Ababa",
    category: "Dairy Products",
    available: true,
    expires: "3 days",
    image: "/images/food/cheese.jpg"
  },
  {
    id: 15,
    title: "Fresh Baked Pizza",
    description: "Freshly baked pizzas with various toppings. Hot and ready for pickup.",
    donor: "Pizza Palace",
    location: "Meskel Square, Addis Ababa",
    category: "Bakery",
    available: true,
    expires: "Today",
    image: "/images/food/pizza.jpg"
  }
];

// Category colors
const categoryColors = {
  "Cooked Meals": "bg-orange-100 text-orange-800 border-orange-200",
  "Drinks": "bg-blue-100 text-blue-800 border-blue-200",
  "Dairy Products": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Bakery": "bg-amber-100 text-amber-800 border-amber-200",
  "Fruits & Veggies": "bg-green-100 text-green-800 border-green-200"
};

const categories = ["All", "Cooked Meals", "Drinks", "Dairy Products", "Bakery", "Fruits & Veggies"];

export default function FoodGiveawaysPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(6);

  // Filter items based on selected category
  const filteredItems = selectedCategory === "All" 
    ? allGiveaways 
    : allGiveaways.filter(item => item.category === selectedCategory);

  // Get items to display based on visibleItems count
  const displayedItems = filteredItems.slice(0, visibleItems);

  // Load more function
  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, filteredItems.length));
  };

  // Reset visible items when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleItems(6);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free Food & Drink Near You
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover fresh, delicious food and drinks being shared by generous community members and local businesses. 
              From fresh produce to hot meals, find what you need for free.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Giveaways Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {displayedItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later for new items.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-orange-100 to-green-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">
                          {item.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[item.category as keyof typeof categoryColors]}`}>
                        {item.category}
                      </span>
                    </div>
                    {/* Expires Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        Expires: {item.expires}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Donor Info */}
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">
                          {item.donor.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 font-medium truncate">
                        {item.donor}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center mb-4">
                      <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-gray-600 truncate">
                        {item.location}
                      </span>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                      Claim Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleItems < filteredItems.length && (
              <div className="text-center mt-12">
                <button 
                  onClick={loadMore}
                  className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Load More Items ({filteredItems.length - visibleItems} remaining)
                </button>
              </div>
            )}

            {/* Show all items loaded message */}
            {visibleItems >= filteredItems.length && filteredItems.length > 0 && (
              <div className="text-center mt-8">
                <p className="text-gray-500 text-sm">
                  You've seen all {filteredItems.length} items in this category
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-green-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have Food to Share?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join our community of generous food donors and help reduce waste while supporting those in need.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-orange-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Sharing Food Today
          </Link>
        </div>
      </div>
    </div>
  );
}
