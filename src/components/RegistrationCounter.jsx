'use client';

import React, { useState, useEffect, useRef } from 'react';


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

// Create a global reference to store the refresh function
let globalRefreshFunction = null;

export function refreshRegistrationCount() {
  if (globalRefreshFunction) {
    globalRefreshFunction();
  }
}

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
    // Function to fetch the registration count
    const fetchRegistrationCount = async () => {
      if (fetchingRef.current) return;
      
      fetchingRef.current = true;
      setState(prevState => ({ ...prevState, loading: true }));
      
      try {
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/socketio?t=${timestamp}`, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
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
        } else {
          setState(prevState => ({
            ...prevState,
            error: data.message || 'Failed to fetch registration count'
          }));
        }
      } catch (err) {
        setState(prevState => ({
          ...prevState,
          error: 'Error connecting to server'
        }));
        console.error('Error fetching registration count:', err);
      } finally {
        setState(prevState => ({ ...prevState, loading: false }));
        fetchingRef.current = false;
      }
    };

    // Store the refresh function in the global reference so it can be called from outside
    globalRefreshFunction = fetchRegistrationCount;

    // Fetch count once on page load
    fetchRegistrationCount();
    
    // Clean up the global reference when component unmounts
    return () => {
      globalRefreshFunction = null;
      if (timerRef.current) clearTimeout(timerRef.current);
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
