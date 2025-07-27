"use client";
import { useState } from "react";
import { loginUser, getCurrentUser, logout } from "../api-client";

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);

  const testLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const userData = await loginUser("test@example.com", "TestPass123!");
      setUser(userData);
      setMessage("✅ Login successful!");
    } catch (error: any) {
      setMessage(`❌ Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetUser = async () => {
    setLoading(true);
    setMessage("");
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setMessage("✅ Get user successful!");
    } catch (error: any) {
      setMessage(`❌ Get user failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogout = () => {
    logout();
    setUser(null);
    setMessage("✅ Logout successful!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🔧 Backend Integration Test</h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Credentials</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p><strong>Email:</strong> test@example.com</p>
            <p><strong>Password:</strong> TestPass123!</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={testLogin}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test Login"}
            </button>
            
            <button
              onClick={testGetUser}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test Get Current User"}
            </button>
            
            <button
              onClick={testLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl"
            >
              Test Logout
            </button>
          </div>
        </div>

        {message && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">Result</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-mono">{message}</p>
            </div>
          </div>
        )}

        {user && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">User Data</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm overflow-auto">{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 