import { useEffect, useState } from "react";
import type { MonthlySummary } from "../../types/expense";
import { expenseAPI } from "../../service/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface MonthlyTrendProps {
  refreshTrigger: number;
}

// Get month name
  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

function MonthlyTrends({ refreshTrigger }: MonthlyTrendProps) {
  const [data, setData] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await expenseAPI.getMonthlySummary(6);
      setData(result);
      setError('');
    } catch (err) {
      console.error('Error fetching monthly summary:', err);
      setError('Failed to load monthly trend');
    } finally {
      setLoading(false);
    }
  };

  // Format data for Recharts
  const chartData = data.map(item => ({
    month: `${getMonthName(item.month)} '${item.year.toString().slice(-2)}`,
    amount: item.totalAmount,
    expenses: item.expenseCount,
  }));

  

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{payload[0].payload.month}</p>
          <p className="text-blue-600 font-bold">${payload[0].value.toFixed(2)}</p>
          <p className="text-sm text-gray-600">{payload[0].payload.expenses} expenses</p>
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
          <p className="text-gray-600 mt-4">Loading trend...</p>
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

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📈 Monthly Trend
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded">
          <p className="font-medium">No data yet</p>
          <p className="text-sm">Add expenses to see trends!</p>
        </div>
      </div>
    );
  }

  const totalSpending = data.reduce((sum, item) => sum + item.totalAmount, 0);
  const averageSpending = totalSpending / data.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          📈 Monthly Trend
        </h2>
        <p className="text-sm text-gray-600">
          Last {data.length} months
        </p>
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: '200px'}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-600 mb-1">Total</p>
          <p className="text-lg font-bold text-gray-800">${totalSpending.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Average</p>
          <p className="text-lg font-bold text-blue-600">${averageSpending.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default MonthlyTrends;