import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddExpense from './Components/Expense/AddExpense'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddExpense />
    </>
  )
}

export default App
