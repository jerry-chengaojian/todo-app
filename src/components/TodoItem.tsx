import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 p-3 border rounded-lg">
      <input
        type="checkbox"
        checked={todo.completed}
        className="h-5 w-5"
        readOnly
      />
      <input
        type="text"
        value={todo.title}
        readOnly
        className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
      />
      <button
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </li>
  );
} 