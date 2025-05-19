// Socket.IO configuration
export const SOCKET_CONFIG = {
  // Socket.IO path
  path: '/api/socketio',
  
  // Socket.IO options
  options: {
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  },
  
  // Registration limits
  registration: {
    maxRegistrations: 130,
    pollingInterval: 10000, // 10 seconds backup polling
    statusPollingInterval: 15000, // 15 seconds for registration status
  },
  
  // Event names
  events: {
    registrationCount: 'registration_count',
    getCount: 'get_count',
  },
};
