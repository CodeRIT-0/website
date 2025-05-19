import { Server } from 'socket.io';
import { SOCKET_CONFIG } from './socket-config';

// In-memory storage for Socket.IO server
let io;

// In-memory storage for registration count
let registrationCount = null;
let lastEmitTime = 0;
const EMIT_THROTTLE = 1000; // Throttle emits to once per second

/**
 * Get the Socket.IO server instance
 */
export function getSocketIO() {
  return io;
}

/**
 * Get the current registration count
 */
export function getRegistrationCount() {
  return registrationCount;
}

/**
 * Update the registration count and emit to clients if changed
 * Throttled to prevent excessive database connections and UI flickering
 */
export function setRegistrationCount(count) {
  // Only update and emit if count has changed
  if (count !== registrationCount) {
    registrationCount = count;
    
    const now = Date.now();
    // Throttle emits to prevent excessive updates
    if (now - lastEmitTime > EMIT_THROTTLE && io) {
      lastEmitTime = now;
      
      io.emit(SOCKET_CONFIG.events.registrationCount, {
        count: registrationCount,
        maxRegistrations: SOCKET_CONFIG.registration.maxRegistrations,
        registrationsOpen: registrationCount < SOCKET_CONFIG.registration.maxRegistrations
      });
    }
  }
}

/**
 * Initialize the Socket.IO server (only once)
 */
export const initSocketServer = async (server) => {
  if (io) return io;
  
  io = new Server(server, {
    path: SOCKET_CONFIG.path,
    addTrailingSlash: false,
  });
  
  io.on('connection', (socket) => {
    // Send current count to the newly connected client if available
    if (registrationCount !== null) {
      socket.emit(SOCKET_CONFIG.events.registrationCount, {
        count: registrationCount,
        maxRegistrations: SOCKET_CONFIG.registration.maxRegistrations,
        registrationsOpen: registrationCount < SOCKET_CONFIG.registration.maxRegistrations
      });
    }
    
    // Handle get_count requests from clients
    socket.on(SOCKET_CONFIG.events.getCount, () => {
      if (registrationCount !== null) {
        socket.emit(SOCKET_CONFIG.events.registrationCount, {
          count: registrationCount,
          maxRegistrations: SOCKET_CONFIG.registration.maxRegistrations,
          registrationsOpen: registrationCount < SOCKET_CONFIG.registration.maxRegistrations
        });
      }
    });
  });
  
  return io;
};
