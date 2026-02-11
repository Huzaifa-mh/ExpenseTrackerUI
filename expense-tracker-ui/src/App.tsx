import { useEffect, useState } from "react";
import "./App.css";
import AddExpense from "./Components/Expense/AddExpense";
import ExpenseList from "./Components/Expense/ExpenseList";
import CategorySummary from "./Components/Summary/CategorySummary";
import MonthlyTrends from "./Components/Summary/MonthlyTrends";
import type { Expense } from "./types/expense";
import { expenseAPI } from "./service/api";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleExpenseAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(()=>{
    fetchExpenses();
  },[refreshTrigger])

  const fetchExpenses =async ()=>{
    try{
      setLoading(true);
      const data = await expenseAPI.getExpenses();
      setExpenses(data);
    }catch(err){
      console.error("Error Fetching expenses:", err)
    }finally{
      setLoading(false);
    }
  }

  // stats for header
  const calculateHeaderStats = () =>{
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // filter for current month
    const thisMonthExpense = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return(
        expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
      );
    });

    const thisMonthTotal = thisMonthExpense.reduce(
      (sum, expense) => sum + expense.amount, 0
    );

    const totalExpenses = expenses.length;

    return{
      thisMonthTotal,
      totalExpenses,
    };
  };

  const headerStats = calculateHeaderStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-500">
        <div className="max-w-[2200px] mx-auto px-10 py-5">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl shadow-md">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Expense Tracker
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your finances efficiently
                </p>
              </div>
            </div>

            {/* Right: User Info (Optional) */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-gray-600 text-xs uppercase tracking-wide">
                  This Month
                </p>
                <p className="text-blue-600 text-2xl font-bold">${headerStats.thisMonthTotal.toFixed(2)}</p>
              </div>
              <div className="h-12 w-px bg-blue-400"></div>
              <div className="text-right">
                <p className="text-gray-600 text-xs uppercase tracking-wide">
                  Total Expenses
                </p>
                <p className="text-blue-600 text-2xl font-bold">{headerStats.totalExpenses}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-19 gap-9">
          {/* Column 1: Add Expense Form (1/4 width) */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-8 space-y-6">
              <AddExpense onExpenseAdded={handleExpenseAdded} />
            </div>
          </div>

          {/* Column 2: Expense List (2/4 width) */}
          <div className="lg:col-span-8">
            <ExpenseList refreshTrigger={refreshTrigger}
            expenses={expenses}
            loading={loading}
            onDelete={fetchExpenses} />
          </div>

          {/* Right Column: Summary (1/4 width) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-6">
              <CategorySummary refreshTrigger={refreshTrigger} />
              {/* <MonthlyTrends refreshTrigger={refreshTrigger} /> */}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-6">
              <MonthlyTrends refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
