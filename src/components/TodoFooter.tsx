export default function TodoFooter() {
  return (
    <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
      <span>{2} items left</span>
      
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
  );
} 