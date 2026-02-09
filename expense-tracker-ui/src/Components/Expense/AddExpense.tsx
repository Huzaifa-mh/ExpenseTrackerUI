import { useState, useEffect, type FormEvent } from "react";
import type { Category } from "../../types/expense";
import { expenseAPI, categoryAPI } from "../../service/api";
import type { CreateExpenseDTO } from "../../types/expense";


interface AddExpenseProps {
  onExpenseAdded: () => void; // Optional callback to refresh the list after adding an expense
}

function AddExpense({ onExpenseAdded }: AddExpenseProps) {
  const [amount, setAmount] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryAPI.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || !categoryId || !date) {
      setError("Please fill in all required fields");
      return;
    }

    const expenseData: CreateExpenseDTO = {
      amount: parseFloat(amount),
      categoryId: parseInt(categoryId),
      date: date,
      description: description || undefined,
    };

    try {
      setLoading(true);
      await expenseAPI.createExpense(expenseData);
      setSuccess("Expense added successfully! ✅");

      //   form reset
      setAmount("");
      setCategoryId("");
      setDate("");
      setDescription("");

      //   notify parent that the expense is added
      onExpenseAdded();
      setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
    } catch (err) {
      console.error("Error creating expense:", err);
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💰 Add New Expense
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">Success</p>
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 hover:bg-white transition-colors text-gray-900"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 hover:bg-white transition-colors text-gray-900"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 hover:bg-white transition-colors text-gray-900"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Description{" "}
            <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 hover:bg-white transition-colors text-gray-900"
            placeholder="e.g., Lunch at cafe"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors shadow-sm hover:shadow-md"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding...
            </span>
          ) : (
            "Add Expense"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
