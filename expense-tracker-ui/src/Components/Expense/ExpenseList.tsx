import { useState, useEffect } from 'react';
import { expenseAPI } from '../../service/api';
import type { Expense } from '../../types/expense';
import ExpenseCard from './ExpenseCard';

function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch expenses when component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await expenseAPI.getExpenses();
      setExpenses(data);
      setError('');
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await expenseAPI.deleteExpense(id);
      // Refresh the list after successful deletion
      await fetchExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Failed to delete expense. Please try again.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading expenses...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (expenses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded">
          <p className="font-medium">No expenses yet</p>
          <p>Add your first expense using the form above!</p>
        </div>
      </div>
    );
  }

  // Display expenses
  return (
    <div className="bg-white rounded-lg shadow-md p-6 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📋 Your Expenses
        </h2>
        <span className="text-sm text-gray-600">
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
        </span>
      </div>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;