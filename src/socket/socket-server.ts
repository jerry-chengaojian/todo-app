import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { createTodoHandlers } from './todo-handlers';

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
    
    // 创建并注册 todo 处理程序
    const todoHandlers = createTodoHandlers(socket);
    
    // 注册所有事件处理程序
    socket.on('todo:create', todoHandlers.createTodo);
    socket.on('todo:update', todoHandlers.updateTodo);
    socket.on('todo:delete', todoHandlers.deleteTodo);
    socket.on('todo:list', todoHandlers.listTodos);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
} 