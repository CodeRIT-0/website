'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { initializeSocket, onRegistrationCount } from '@/src/lib/socketio';


// Static progress bar with no transitions to prevent flickering
const ProgressBar = ({ percentage, statusColor }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div 
        className={`h-2.5 ${statusColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default function RegistrationCounter() {
  // Use a single state object to prevent multiple re-renders
  const [state, setState] = useState({
    registrationCount: 0,
    maxRegistrations: 130,
    loading: true,
    error: null,
    percentage: 0,
    statusColor: 'bg-green-500'
  });
  
  const prevCountRef = useRef(null);
  const fetchingRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Helper function to update the counter data
    const updateCounterData = (data) => {
      if (!data || prevCountRef.current === data.count) return;
      
      const count = data.count;
      const maxReg = data.maxRegistrations || state.maxRegistrations;
      
      const newPercentage = Math.min(100, Math.round((count / maxReg) * 100));
      let newStatusColor = 'bg-green-500';
      if (newPercentage >= 80) newStatusColor = 'bg-red-500';
      else if (newPercentage >= 50) newStatusColor = 'bg-yellow-500';
      
      // Update all state at once to prevent flickering
      setState(prevState => ({
        ...prevState,
        registrationCount: count,
        percentage: newPercentage,
        statusColor: newStatusColor,
        error: null
      }));
      
      prevCountRef.current = count;
    };

    // Initial fetch to get the count while Socket.IO connects
    const fetchInitialCount = async () => {
      if (fetchingRef.current) return;
      
      fetchingRef.current = true;
      
      // Only show loading on first load
      if (prevCountRef.current === null) {
        setState(prevState => ({ ...prevState, loading: true }));
      }
      
      try {
        const response = await fetch('/api/socketio');
        const data = await response.json();
        
        if (data.success) {
          updateCounterData({
            count: data.count,
            maxRegistrations: data.maxRegistrations,
            registrationsOpen: data.registrationsOpen
          });
        } else {
          setState(prevState => ({
            ...prevState,
            error: data.message || 'Failed to fetch registration count'
          }));
        }
      } catch (err) {
        // Only show error if we don't have any data yet
        if (prevCountRef.current === null) {
          setState(prevState => ({
            ...prevState,
            error: 'Error connecting to server'
          }));
        }
        console.error('Error fetching registration count:', err);
      } finally {
        setState(prevState => ({ ...prevState, loading: false }));
        fetchingRef.current = false;
      }
    };

    // Initialize Socket.IO only once
    initializeSocket();
    
    // Register for registration count updates
    onRegistrationCount(updateCounterData);
    
    // Fetch initial count
    fetchInitialCount();
    
    // Set up a backup polling mechanism with a longer interval
    // Only poll if Socket.IO fails or is slow
    const intervalId = setInterval(fetchInitialCount, 30000); // 30 seconds
    
    // Cleanup function
    return () => {
      clearInterval(intervalId);
      if (timerRef.current) clearTimeout(timerRef.current);
      // Don't close the socket here, it's shared across components
    };
  }, []);

 
 

  const { loading, error, registrationCount, maxRegistrations, percentage, statusColor } = state;

  if (loading) {
    return (
      <div className="w-full p-4 rounded-lg bg-gray-100/20 backdrop-blur-sm shadow-lg">
        <div className="animate-pulse h-6 bg-gray-300/50 rounded w-3/4 mb-2"></div>
        <div className="animate-pulse h-4 bg-gray-300/50 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 rounded-lg bg-red-100/20 backdrop-blur-sm shadow-lg">
        <p className="text-red-600 font-medium">Error loading registration counter</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 rounded-lg bg-white/20 backdrop-blur-sm shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-800">Registration Status</h3>
        <span className="font-bold text-gray-800">
          {registrationCount}/{maxRegistrations} Teams
        </span>
      </div>
      
      {/* Static progress bar with no transitions */}
      <ProgressBar percentage={percentage} statusColor={statusColor} />
      
      <p className="mt-2 text-sm text-gray-600">
        {registrationCount >= maxRegistrations 
          ? "Stumps down! All spots have been filled for this innings."
          : registrationCount >= maxRegistrations - 10
            ? `Only ${maxRegistrations - registrationCount} spots remaining! Last few wickets standing!`
            : `${maxRegistrations - registrationCount} spots remaining`
        }
      </p>
    </div>
  );
}
