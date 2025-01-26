import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }: TodoItemProps) {
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