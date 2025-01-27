import { create } from 'zustand';
import { Todo } from '@/types/todo';

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  toggleAll: (completed: boolean) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  
  addTodo: (title) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), title, completed: false }]
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  
  updateTodo: (id, title) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, title } : todo
    )
  })),
  
  toggleAll: (completed) => set((state) => ({
    todos: state.todos.map(todo => ({ ...todo, completed }))
  })),
  
  clearCompleted: () => set((state) => ({
    todos: state.todos.filter(todo => !todo.completed)
  }))
})); 