export default function TodoInput() {
  return (
    <form className="mb-6">
      <input
        name="todo"
        type="text"
        placeholder="What needs to be done?"
        className="w-full p-3 border rounded-lg"
      />
    </form>
  );
} 