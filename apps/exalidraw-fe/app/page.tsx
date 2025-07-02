"use client"
import React, { useState, useEffect } from 'react';
import { Pen, Users, Zap, Download, Github, Twitter, ArrowRight, Play, Check } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Pen className="w-8 h-8" />,
      title: "Intuitive Drawing",
      description: "Create beautiful diagrams with our hand-drawn aesthetic. Perfect for wireframes, flowcharts, and creative sketches."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team. See changes instantly as multiple people edit the same canvas."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Built for performance with smooth interactions and instant response. No lag, just pure creative flow."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden relative">
      

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-purple-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-lavender-200 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-purple-200 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-10 w-3 h-3 bg-purple-300 rounded-full opacity-30 animate-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

     
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/6 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-72 h-72 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      
      <header className="relative z-10 px-6 py-6 backdrop-blur-sm">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <Pen className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">Excalidraw</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-purple-200 transition-all duration-300 text-purple-100">Features</a>
            <a href="signin" className="hover:text-purple-200 transition-all duration-300 text-purple-100">Sign In</a>
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-2 rounded-full text-white font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

    
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-200 via-purple-100 to-white bg-clip-text text-transparent">
                Draw Ideas
              </span>
              <br />
              <span className="text-5xl md:text-7xl bg-gradient-to-r from-indigo-200 to-purple-300 bg-clip-text text-transparent">
                Into Bloom
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Like delicate lilacs in spring, watch your creative ideas flourish and bloom. 
              The collaborative whiteboard that nurtures creativity with elegance and grace.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 px-10 py-5 rounded-full text-lg font-semibold hover:from-purple-600 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center shadow-2xl hover:shadow-purple-500/30">
                Start Creating
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="group border-2 border-purple-300 px-10 py-5 rounded-full text-lg font-semibold hover:bg-purple-300 hover:text-purple-900 transition-all duration-300 flex items-center backdrop-blur-sm">
                <Play className="mr-3 w-6 h-6" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

     <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="bg-white rounded-xl p-8 min-h-96 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
              <div className="relative z-10">
                <div className="text-gray-800 mb-4 font-semibold">Live Canvas Preview</div>
                <svg viewBox="0 0 400 200" className="w-full h-48">
                  <path d="M50 150 Q 100 50 150 150 T 250 150" stroke="#8b5cf6" strokeWidth="3" fill="none" className="animate-pulse" />
                  <circle cx="80" cy="100" r="30" fill="#f59e0b" fillOpacity="0.7" className="animate-bounce" />
                  <rect x="200" y="80" width="60" height="40" fill="#10b981" fillOpacity="0.7" rx="5" className="animate-pulse" />
                  <path d="M300 120 L340 120 L320 140 Z" fill="#ef4444" fillOpacity="0.7" className="animate-bounce" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section id="features" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-purple-200 via-white to-indigo-200 bg-clip-text text-transparent">
            Elegant Features
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white/5 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-2xl ${
                  activeFeature === index 
                    ? 'border-purple-300/40 shadow-purple-500/20 shadow-2xl' 
                    : 'border-purple-300/20'
                }`}
              >
                <div className="text-purple-300 mb-6 p-4 bg-purple-500/10 rounded-2xl w-fit">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-6 text-purple-100">{feature.title}</h3>
                <p className="text-purple-200 leading-relaxed text-lg font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <footer className="relative z-10 border-t border-purple-300/20 px-6 py-16 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Pen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">Draw-app</span>
              </div>
              <p className="text-purple-200 leading-relaxed">
                The collaborative whiteboard tool that brings your ideas to life with elegance and grace.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-purple-100 text-lg">Product</h4>
              <ul className="space-y-3 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-purple-100 text-lg">Company</h4>
              <ul className="space-y-3 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-purple-100 text-lg">Connect</h4>
              <div className="flex space-x-6">
                <Github className="w-6 h-6 text-purple-200 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
                <Twitter className="w-6 h-6 text-purple-200 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
              </div>
            </div>
          </div>
          <div className="border-t border-purple-300/20 mt-12 pt-8 text-center text-purple-300">
            © 2025 Excalidraw. All rights reserved. • Crafted with love and creativity
          </div>
        </div>
      </footer>
    </div>
  );
}