import { useTodoStore } from '@/store/useTodoStore';

export default function TodoFooter() {
  const todos = useTodoStore((state) => state.todos);
  const { toggleAll, clearCompleted } = useTodoStore();

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;

  return (
    <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
      <span>{totalTodos - completedTodos} items left</span>
      
      <div className="space-x-4">
        <button
          className="hover:text-gray-700"
          onClick={() => toggleAll(true)}
        >
          Mark all as complete
        </button>
        <button
          className="hover:text-gray-700"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
} 