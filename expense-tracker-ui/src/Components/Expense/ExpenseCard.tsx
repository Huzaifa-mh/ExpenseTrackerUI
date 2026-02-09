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

        </div>
    );
}

export default ExpenseCard;