"use client";

import React, { useState } from 'react';
import { Pen, Mail, Lock, Eye, EyeOff, Github } from 'lucide-react';

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex justify-center items-center p-4 relative overflow-hidden">
      

      {/* Decorative Lilac Illustrations */}
      <div className="absolute top-10 left-10 opacity-100">
        <svg width="120" height="180" viewBox="0 0 120 180" className="animate-pulse">
          <path d="M60 20 Q 50 10 40 20 Q 45 25 50 30 Q 55 25 60 20" fill="#a855f7" opacity="0.8"/>
          <path d="M65 25 Q 55 15 45 25 Q 50 30 55 35 Q 60 30 65 25" fill="#8b5cf6" opacity="0.9"/>
          <path d="M70 30 Q 60 20 50 30 Q 55 35 60 40 Q 65 35 70 30" fill="#7c3aed" opacity="0.7"/>
          <rect x="58" y="40" width="4" height="60" fill="#16a34a" opacity="0.8"/>
          <ellipse cx="50" cy="50" rx="8" ry="3" fill="#22c55e" opacity="0.7"/>
          <ellipse cx="70" cy="45" rx="6" ry="2" fill="#22c55e" opacity="0.8"/>
        </svg>
      </div>

      <div className="absolute bottom-10 right-10 opacity-100">
        <svg width="100" height="150" viewBox="0 0 100 150" className="animate-pulse" style={{animationDelay: '1s'}}>
          <path d="M50 15 Q 42 8 35 15 Q 40 20 45 25 Q 50 20 50 15" fill="#9333ea" opacity="0.8"/>
          <path d="M55 20 Q 47 13 40 20 Q 45 25 50 30 Q 55 25 55 20" fill="#a855f7" opacity="0.9"/>
          <path d="M60 25 Q 52 18 45 25 Q 50 30 55 35 Q 60 30 60 25" fill="#8b5cf6" opacity="0.7"/>
          <rect x="48" y="35" width="4" height="50" fill="#16a34a" opacity="0.8"/>
          <ellipse cx="42" cy="42" rx="6" ry="2" fill="#22c55e" opacity="0.7"/>
          <ellipse cx="58" cy="38" rx="5" ry="2" fill="#22c55e" opacity="0.8"/>
        </svg>
      </div>

      {/* Main Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-900/80 opacity-100 rounded-2xl p-8 border border-purple-500/20 shadow-2xl relative overflow-hidden">
          
          {/* Logo and Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Pen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isSignin ? 'Welcome Back' : 'Join Excalidraw'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isSignin 
                ? 'Sign in to continue your creative journey' 
                : 'Create your account and start drawing'
              }
            </p>
          </div>

        

    

          {/* Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800/50 border border-purple-500/20 focus:border-purple-400/60 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/50 border border-purple-500/20 focus:border-purple-400/60 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-purple-400 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

        

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 hover:from-purple-700 hover:via-purple-600 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/25 ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  {isSignin ? 'Sign In' : 'Create Account'}
                </span>
              )}
            </button>
          </div>

          {/* Switch between signin/signup */}
          <div className="mt-6 text-center text-sm text-gray-400">
            {isSignin ? "Don't have an account? " : "Already have an account? "}
            <a
              href={isSignin ? "/signup" : "/signin"}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              {isSignin ? 'Sign up' : 'Sign in'}
            </a>
          </div>

          {/* Terms for signup */}
          {!isSignin && (
            <div className="mt-4 text-xs text-gray-500 text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Privacy Policy
              </a>
            </div>
          )}
        </div>

        {/* Bottom decoration with floral elements */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-3 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              <div className="w-1 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
              <div className="w-1 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
            </div>
            <span>Secure authentication powered by Excalidraw</span>
            <div className="flex items-center space-x-1">
              <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse delay-600"></div>
              <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse delay-800"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;