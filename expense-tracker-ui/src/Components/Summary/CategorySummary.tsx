import { useState, useEffect } from 'react';
import { expenseAPI } from '../../service/api';
import type { ExpenseSummary } from '../../types/expense';

interface CategorySummaryProps {
  refreshTrigger: number;
}

function CategorySummary({ refreshTrigger }: CategorySummaryProps) {
  const [summary, setSummary] = useState<ExpenseSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchSummary();
  }, [refreshTrigger]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await expenseAPI.getSummary();
      // Sort by totalAmount descending (highest spending first)
      const sorted = data.sort((a, b) => b.totalAmount - a.totalAmount);
      setSummary(sorted);
      setError('');
    } catch (err) {
      console.error('Error fetching summary:', err);
      setError('Failed to load summary');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total spending across all categories
  const totalSpending = summary.reduce((sum, item) => sum + item.totalAmount, 0);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading summary...</p>
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

  // Empty state
  if (summary.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📊 Spending Summary
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded">
          <p className="font-medium">No data yet</p>
          <p>Add some expenses to see your spending summary!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📊 Spending Summary
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {summary.length} {summary.length === 1 ? 'category' : 'categories'}
          </span>
          <span className="text-2xl font-bold text-blue-600">
            ${totalSpending.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        {summary.map((item) => {
          const percentage = totalSpending > 0 
            ? (item.totalAmount / totalSpending) * 100 
            : 0;

          return (
            <div key={item.categoryId} className="border-l-4 pl-4 py-2" style={{ borderColor: item.categoryColor }}>
              {/* Category Name */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.categoryColor }}
                  ></span>
                  <span className="font-semibold text-gray-800">
                    {item.categoryName}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-800">
                  ${item.totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span>
                  {item.expenseCount} {item.expenseCount === 1 ? 'expense' : 'expenses'}
                </span>
                <span>•</span>
                <span>{percentage.toFixed(1)}% of total</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.categoryColor,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySummary;