import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer);

  // 中间件处理身份验证
  io.use(async (socket, next) => {
    socket.onAny((...args) => {
      console.log("incoming", args);
    });
    
    socket.onAnyOutgoing((...args) => {
      console.log("outgoing", args);
    });

    next();
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
} 