import { create } from 'zustand';
import { produce } from 'immer';
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
  
  addTodo: (title) => set(
    produce((state: TodoStore) => {
      state.todos.push({ id: Date.now(), title, completed: false });
    })
  ),
  
  toggleTodo: (id) => set(
    produce((state: TodoStore) => {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    })
  ),
  
  deleteTodo: (id) => set(
    produce((state: TodoStore) => {
      const index = state.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    })
  ),
  
  updateTodo: (id, title) => set(
    produce((state: TodoStore) => {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.title = title;
      }
    })
  ),
  
  toggleAll: (completed) => set(
    produce((state: TodoStore) => {
      state.todos.forEach(todo => {
        todo.completed = completed;
      });
    })
  ),
  
  clearCompleted: () => set(
    produce((state: TodoStore) => {
      state.todos = state.todos.filter(todo => !todo.completed);
    })
  )
})); 