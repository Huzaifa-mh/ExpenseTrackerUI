import { expenseAPI, categoryAPI } from "../../service/api";
import { useEffect, useState, type FormEvent } from "react";
import type { Category } from "../../types/expense";

function AddExpense() {
  const [amount, setAmount] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [category, setCategory] = useState<Category[]>([]);

  //UI
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryAPI.getCategories();
        setCategory(data);
      } catch (err) {
        console.log("Error fetching categories:", err);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  // const handleSubmit = async(e: FormEvent<HTMLFormElement)=>{
  //     error.prevent
  // }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow--md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</h2>

      {/* error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* success message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* form */}
      <form className="space-y-4">
        {/* amount input */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount *
          </label>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
            required
          />
        </div>

        {/* categoryDropdown */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category *
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {
                category.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))
            }
          </select>
        </div>

        {/* date input */}
        
      </form>
    </div>
  );
}

export default AddExpense;
