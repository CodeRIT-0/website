import { io } from 'socket.io-client';
import { SOCKET_CONFIG } from './socket-config';

// Create a singleton Socket.IO client instance
let socket;
let socketInitialized = false;
let socketInitializing = false;
let registrationCount = null;
let registrationsOpen = true;

// Callback registries
let onRegistrationCountCallbacks = [];

// Initialize Socket.IO connection (only once)
export const initializeSocket = () => {
  // Return existing socket if already initialized
  if (socketInitialized && socket) return socket;
  
  // Return null if initialization is in progress
  if (socketInitializing) return null;
  
  socketInitializing = true;
  
  try {
    // Create Socket.IO client
    socket = io({
      path: SOCKET_CONFIG.path,
      ...SOCKET_CONFIG.options,
    });

    // Connection event handlers
    socket.on('connect', () => {
      socketInitialized = true;
      socketInitializing = false;
      
      // Request current count on connection
      fetchRegistrationCount();
    });

    socket.on('disconnect', () => {
      socketInitialized = false;
    });

    socket.on('connect_error', () => {
      socketInitializing = false;
    });
    
    // Handle registration count updates
    socket.on(SOCKET_CONFIG.events.registrationCount, (data) => {
      if (!data) return;
      
      // Update cached values
      registrationCount = data.count;
      registrationsOpen = data.registrationsOpen;
      
      // Notify all registered callbacks
      notifyRegistrationCountCallbacks(data);
    });
  } catch (error) {
    socketInitializing = false;
  }

  return socket;
};

// Fetch registration count from server with cache-busting to prevent stale data
const fetchRegistrationCount = async () => {
  try {
    // Add cache-busting parameter to prevent cached responses
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
      // Only update if the count has changed or we don't have a count yet
      if (registrationCount !== data.count || registrationCount === null) {
        registrationCount = data.count;
        registrationsOpen = data.registrationsOpen;
        
        notifyRegistrationCountCallbacks({
          count: data.count,
          maxRegistrations: data.maxRegistrations,
          registrationsOpen: data.registrationsOpen
        });
      }
    }
  } catch (error) {
    console.error('Error fetching registration count:', error);
    // We'll rely on polling as fallback
  }
};

// Notify all registration count callbacks
const notifyRegistrationCountCallbacks = (data) => {
  if (!data) return;
  
  // Execute callbacks with a small delay to avoid UI flickering
  setTimeout(() => {
    onRegistrationCountCallbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        // Prevent callback errors from breaking the chain
      }
    });
  }, 0);
};

// Register for registration count updates
export const onRegistrationCount = (callback) => {
  // Add to callback registry
  onRegistrationCountCallbacks.push(callback);
  
  // If we already have data, call the callback immediately
  if (registrationCount !== null) {
    callback({
      count: registrationCount,
      maxRegistrations: SOCKET_CONFIG.registration.maxRegistrations,
      registrationsOpen: registrationsOpen
    });
  }
};

// Get current socket if available
export const getSocket = () => {
  return socketInitialized ? socket : null;
};

// Clean up Socket.IO connection
export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = undefined;
    socketInitialized = false;
    socketInitializing = false;
  }
};
