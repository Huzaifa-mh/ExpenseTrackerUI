
import { useState } from 'react';
import './App.css'
import AddExpense from './Components/Expense/AddExpense'
import ExpenseList from './Components/Expense/ExpenseList'
import CategorySummary from './Components/Summary/CategorySummary';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleExpenseAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-6">
          <h1 className="text-4xl font-bold text-gray-800">
            💰 Personal Expense Tracker
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Add Expense Form (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <AddExpense onExpenseAdded={handleExpenseAdded} />
            </div>
          </div>

          {/* Middle Column: Expense List (2/4 width) */}
          <div className="lg:col-span-2">
            <ExpenseList refreshTrigger={refreshTrigger} />
          </div>

          {/* Right Column: Summary (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <CategorySummary refreshTrigger={refreshTrigger} />
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default App
