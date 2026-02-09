
import { useState } from 'react';
import './App.css'
import AddExpense from './Components/Expense/AddExpense'
import ExpenseList from './Components/Expense/ExpenseList'

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // called when the expense is added
  const handleExpenseAdded = () => {
    setRefreshTrigger(prev => prev + 1); // trigger refresh in ExpenseList
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-800">
            💰 Personal Expense Tracker
          </h1>
        </div>
      </header>

      {/* Main Content - FULL WIDTH, NO PADDING */}
      <main className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Add Expense Form (sticky on scroll) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <AddExpense onExpenseAdded={handleExpenseAdded} />
            </div>
          </div>

          {/* Right: Expense List */}
          <div className="lg:col-span-2">
            <ExpenseList refreshTrigger={refreshTrigger} />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App
