import { useState } from "react";
import { useTodoStore } from '@/store/useTodoStore';

export default function TodoInput() {
  const [todo, setTodo] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim()) {
      addTodo(todo.trim());
      setTodo('');
    }
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <input
        name="todo"
        type="text"
        placeholder="What needs to be done?"
        className="w-full p-3 border rounded-lg"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
    </form>
  );
} 