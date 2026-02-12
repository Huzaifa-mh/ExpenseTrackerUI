import { useState, useEffect } from "react";
import { expenseAPI } from "../../service/api";
import type { Expense } from "../../types/expense";
import ExpenseCard from "./ExpenseCard";
import DateFilter from "./DateFilter";



interface ExpenseListProps {
  refreshTrigger: number;
  expenses: Expense[];
  loading: boolean;
  onDelete: ()=> void;
}
interface ExpenseListProps {
  refreshTrigger: number;
}

function ExpenseList({ refreshTrigger }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<{ startDate?: string; endDate?: string }>({});

  // Fetch expenses when component mounts, refreshTrigger changes, OR filter changes
  useEffect(() => {
    fetchExpenses();
  }, [refreshTrigger, dateFilter]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await expenseAPI.getExpenses(dateFilter.startDate, dateFilter.endDate);
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
      await fetchExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Failed to delete expense. Please try again.');
    }
  };

  const handleFilter = (startDate: string, endDate: string) => {
    setDateFilter({ startDate, endDate });
  };

  const handleClearFilter = () => {
    setDateFilter({});
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading expenses...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Date Filter */}
      <DateFilter onFilter={handleFilter} onClear={handleClearFilter} />

      {/* Expense List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            📋 Your Expenses
          </h2>
          <div className="text-right">
            <span className="text-sm text-gray-600 block">
              {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
            </span>
            {dateFilter.startDate && dateFilter.endDate && (
              <span className="text-xs text-blue-600 block mt-1">
                Filtered: {dateFilter.startDate} to {dateFilter.endDate}
              </span>
            )}
          </div>
        </div>

        {/* Empty state */}
        {expenses.length === 0 ? (
          <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded">
            <p className="font-medium">No expenses found</p>
            <p>
              {dateFilter.startDate 
                ? 'Try adjusting your date filter or add new expenses.' 
                : 'Add your first expense using the form on the left!'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
