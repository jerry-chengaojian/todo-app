const mockTodos = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Write documentation", completed: true },
  { id: 3, title: "Build a project", completed: false },
];

export default function TodoPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Todos</h1>
      
      <form className="mb-6">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="w-full p-3 border rounded-lg"
        />
      </form>

      <ul className="space-y-2">
        {mockTodos.map((todo) => (
          <li 
            key={todo.id}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="h-5 w-5"
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
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <span>2 items left</span>
        
        <div className="space-x-4">
          <button
            className="hover:text-gray-700"
          >
            Mark all as complete
          </button>
          <button
            className="hover:text-gray-700"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  )
}