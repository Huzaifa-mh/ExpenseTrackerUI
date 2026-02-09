import type { Expense } from "../../types/expense";



interface ExpenseCardProps {
    expense: Expense;
    onDelete: (id: number) => void;
}
function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {

    const handleDelete = () =>{
        if(window.confirm('Are you sure you want to delete this expense?')){
            onDelete(expense.id);
        }
    };
    
    const formatDate = (dateString: string) =>{
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount: number) =>{
        return amount.toFixed(2)
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-3 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">

                {/* left */}
                <div className="flex-1">
                    {/* Category badge */}
                    <span className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-2" 
                    style={{ backgroundColor: expense.categoryColor }}
                    >{expense.categoryName}</span>

                    {/* Description */}
                    {expense.description && 
                    <p className="text-gray-600 text-sm mt-2">
                        {expense.description}</p>}

                    {/* Date */}
                    <p className="text-gray-500 text-xs mt-1">
                        {formatDate(expense.date)}
                    </p>
                </div>

                {/* right */}
                <div className="flex items-center gap-4 ml-4">

                    {/* amount */}
                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">${formatAmount(expense.amount)}</p>
                    </div>

                    {/* delete button */}
                    <button onClick={handleDelete} className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Delete expense">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExpenseCard;