// Socket.IO configuration
export const SOCKET_CONFIG = {
  // Socket.IO path
  path: '/api/socketio',
  
  // Socket.IO options optimized for production
  options: {
    transports: ['websocket', 'polling'],  // Try WebSocket first, fallback to polling
    reconnectionAttempts: 10,              // More reconnection attempts
    reconnectionDelay: 1000,               // Start with 1 second delay
    reconnectionDelayMax: 5000,            // Maximum 5 seconds between attempts
    timeout: 20000,                        // Longer connection timeout
    autoConnect: true,                     // Connect automatically
    forceNew: false,                       // Reuse existing connections
    multiplex: true,                       // Enable multiplexing
  },
  
  // Registration limits
  registration: {
    maxRegistrations: 130,
    pollingInterval: 10000,                // 10 seconds backup polling
    forcedRefreshInterval: 60000,          // 1 minute forced refresh
    statusPollingInterval: 15000,          // 15 seconds for registration status
  },
  
  // Event names
  events: {
    registrationCount: 'registration_count',
    getCount: 'get_count',
  },
};
