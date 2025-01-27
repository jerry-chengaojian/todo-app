import { Todo } from '@/types/todo';
import { useTodoStore } from '@/store/useTodoStore';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore();
  
  return (
    <li className="flex items-center gap-3 p-3 border rounded-lg">
      <input
        type="checkbox"
        checked={todo.completed}
        className="h-5 w-5"
        onChange={() => toggleTodo(todo.id)}
      />
      <input
        type="text"
        value={todo.title}
        className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
        onChange={(e) => updateTodo(todo.id, e.target.value)}
      />
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  );
} 