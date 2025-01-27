import { create } from 'zustand';
import { produce } from 'immer';
import { Todo } from "@prisma/client";
import socket from "@/socket/client/socketClient";

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
      const tempId = Date.now();
      state.todos.push({ id: tempId, title, completed: false });
      
      socket.emit('todo:create', 
        { title, completed: false },
        (res: { data?: number; error?: string }) => {
          if (res.data) {
            set(produce((state: TodoStore) => {
              const todo = state.todos.find(t => t.id === tempId);
              if (todo) {
                todo.id = res.data as number;
              }
            }));
          }
        }
      );
    })
  ),
  
  toggleTodo: (id) => set(
    produce((state: TodoStore) => {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        socket.emit('todo:update', { 
          id, 
          title: todo.title, 
          completed: todo.completed 
        });
      }
    })
  ),
  
  deleteTodo: (id) => set(
    produce((state: TodoStore) => {
      const index = state.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        state.todos.splice(index, 1);
        socket.emit('todo:delete', id);
      }
    })
  ),
  
  updateTodo: (id, title) => set(
    produce((state: TodoStore) => {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.title = title;
        socket.emit('todo:update', { 
          id, 
          title, 
          completed: todo.completed 
        });
      }
    })
  ),
  
  toggleAll: (completed) => set(
    produce((state: TodoStore) => {
      state.todos.forEach(todo => {
        todo.completed = completed;
        socket.emit('todo:update', { 
          id: todo.id, 
          title: todo.title, 
          completed 
        });
      });
    })
  ),
  
  clearCompleted: () => set(
    produce((state: TodoStore) => {
      const completedTodos = state.todos.filter(todo => todo.completed);
      completedTodos.forEach(todo => {
        socket.emit('todo:delete', todo.id);
      });
      state.todos = state.todos.filter(todo => !todo.completed);
    })
  )
}));

// 设置 Socket.IO 事件监听
socket.on('connect', () => {
  socket.emit('todo:list', (res: { data?: Todo[] }) => {
    if (res.data) {
      useTodoStore.setState({ todos: res.data });
    }
  });
});

socket.on('todo:created', (todo: Todo) => {
  useTodoStore.setState(produce((state: TodoStore) => {
    state.todos.push(todo);
  }));
});

socket.on('todo:updated', (updatedTodo: Todo) => {
  useTodoStore.setState(produce((state: TodoStore) => {
    const todo = state.todos.find(t => t.id === updatedTodo.id);
    if (todo) {
      Object.assign(todo, updatedTodo);
    }
  }));
});

socket.on('todo:deleted', (id: number) => {
  useTodoStore.setState(produce((state: TodoStore) => {
    const index = state.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      state.todos.splice(index, 1);
    }
  }));
}); 