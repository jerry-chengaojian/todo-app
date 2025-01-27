'use client';

import { useEffect } from 'react';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import { useTodoStore } from '@/stores/todo';

export default function TodoPage() {
  const bindEvents = useTodoStore(state => state.bindEvents);
  
  useEffect(() => {
    // Call bindEvents and save the cleanup function
    const cleanup = bindEvents();
    
    // Execute the cleanup function on component unmount
    return cleanup;
  }, [bindEvents]);
  
  return (
    <div className="max-w-2xl mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Todos</h1>
      <TodoInput />
      <TodoList />
      <TodoFooter />
    </div>
  );
}