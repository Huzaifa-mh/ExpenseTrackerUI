import { useState, useEffect } from 'react';
import { expenseAPI } from '../../service/api';
import type { ExpenseSummary } from '../../types/expense';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

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

  const totalSpending = summary.reduce((sum, item) => sum + item.totalAmount, 0);

  // Format data for pie chart
  const pieData = summary.map(item => ({
    name: item.categoryName,
    value: item.totalAmount,
    color: item.categoryColor,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / totalSpending) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="font-bold" style={{ color: payload[0].payload.color }}>
            ${payload[0].value.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

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

  if (summary.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📊 Spending Summary
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded">
          <p className="font-medium">No data yet</p>
          <p className="text-sm">Add expenses to see summary!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          📊 Category Breakdown
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {summary.length} {summary.length === 1 ? 'category' : 'categories'}
          </span>
          <span className="text-xl font-bold text-blue-600">
            ${totalSpending.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {summary.map((item) => {
          const percentage = totalSpending > 0 
            ? (item.totalAmount / totalSpending) * 100 
            : 0;

          return (
            <div key={item.categoryId} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 flex-1">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.categoryColor }}
                ></span>
                <span className="font-medium text-gray-700 truncate">
                  {item.categoryName}
                </span>
              </div>
              <div className="text-right ml-2">
                <p className="font-bold text-gray-800">${item.totalAmount.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{percentage.toFixed(0)}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySummary;