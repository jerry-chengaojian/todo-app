import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';

export default function TodoPage() {

  return (
    <div className="max-w-2xl mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Todos</h1>
      
      <TodoInput />
      
      <TodoList />

      <TodoFooter/>
    </div>
  );
}