import React from 'react';
import { Clock, Zap } from 'lucide-react';

export default function InterviewExperience() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-md text-center space-y-8 p-8 rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-lg">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#17cf97] to-blue-500 rounded-2xl opacity-50 blur-lg animate-pulse"></div>
            <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-700/50">
              <Clock className="mx-auto mb-4 text-[#17cf97] w-16 h-16 animate-spin-slow" />
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#17cf97] to-blue-500">
                Coming Soon
              </h1>
              <p className="text-gray-400 mb-6">
                We're working hard to bring something awesome to you!
              </p>
              <div className="flex justify-center space-x-3">
                <Zap className="text-[#17cf97] animate-bounce" />
                <Zap className="text-blue-500 animate-bounce delay-150" />
                <Zap className="text-[#17cf97] animate-bounce delay-300" />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-3 text-sm text-gray-500">
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-[#17cf97]"></div>
            <span>Stay Tuned</span>
            <div className="h-0.5 w-12 bg-gradient-to-r from-[#17cf97] to-transparent"></div>
          </div>
        </div>
      </div>
    );
  }