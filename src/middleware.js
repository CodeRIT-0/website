import { NextResponse } from 'next/server';
import { initSocketServer } from './lib/socket-server';

export async function middleware(req) {
  // Only apply this middleware to the socketio endpoint
  if (req.nextUrl.pathname.startsWith('/api/socketio')) {
    try {
      const res = NextResponse.next();
      
      // Initialize Socket.IO server if it hasn't been initialized yet
      if (res.socket && res.socket.server) {
        await initSocketServer(res.socket.server);
      }
      
      return res;
    } catch (error) {
      console.error('Socket.IO middleware error:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/socketio',
};
