'use client';

import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import { socket } from '@/lib/socket';
import { useEffect } from 'react';

export default function TodoPage() {
  useEffect(() => {
    // 监听连接状态
    socket.on('connect', () => {
      console.log('Connected!', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected!');
    });

    // 清理函数
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Todos</h1>
      <TodoInput />
      <TodoList />
      <TodoFooter />
    </div>
  );
}