'use client';

import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import { useState } from 'react';
import { Todo } from '@/types/todo';

export default function TodoPage() {

  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    setTodos([...todos, { id: Date.now(), title, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, title: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, title } : todo));
  };

  const toggleAll = (completed: boolean) => {
    setTodos(todos.map(todo => ({ ...todo, completed })));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Todos</h1>
      
      <TodoInput addTodo={addTodo} />
      
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} />

      <TodoFooter todos={todos} toggleAll={toggleAll} clearCompleted={clearCompleted} />
    </div>
  );
}