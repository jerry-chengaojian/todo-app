import TodoItem from './TodoItem';
import { useTodoStore } from '@/store/useTodoStore';

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
} 