import TodoItem from './TodoItem';

const mockTodos = [
    { id: 1, title: "Learn Next.js", completed: false },
    { id: 2, title: "Write documentation", completed: true },
    { id: 3, title: "Build a project", completed: false },
  ];

export default function TodoList() {
  return (
    <ul className="space-y-2">
      {mockTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
} 