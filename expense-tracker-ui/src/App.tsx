
import './App.css'
import AddExpense from './Components/Expense/AddExpense'

function App() {
  

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>
          💰 Personal Expense Tracker
        </h1>
        <AddExpense />
      </div>
    </div>
  )
}

export default App
