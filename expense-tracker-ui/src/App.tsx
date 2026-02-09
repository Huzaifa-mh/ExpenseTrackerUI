import { useState } from 'react'
import AddExpense from './Components/Expense/AddExpense';
import ExpenseList from './Components/Expense/ExpenseList';

function App() {
  // This state tells ExpenseList when to refresh
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // This function is called when expense is added
  const handleExpenseAdded = () => {
    setRefreshTrigger(prev => prev + 1); // Increment to trigger refresh
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Add Expense Form */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <AddExpense onExpenseAdded={handleExpenseAdded} />
            </div>
          </div>

          {/* Right Column: Expense List */}
          <div className="lg:col-span-2">
            <ExpenseList refreshTrigger={refreshTrigger} />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App