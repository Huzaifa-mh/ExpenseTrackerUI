
export interface Category {
    id: number,
    name: string,
    colorCode: string
}

export interface Expense {
    id: number,
    amount: number,
    categoryId: number,
    categoryName: string,
    categoryColor: string,
    date: string,
    description: string,
    createdAt: string
}

export interface CreateExpenseDTO {
    amount: number,
    categoryId: number,
    date: string,
    description?: string
}

export interface ExpenseSummary {
    categoryId: number,
    categoryName: string,
    categoryColor: string,
    totalAmount: number,
    expenseCount: number
}

export interface MonthlySummary {
    year: number,
    month: number,
    totalAmount: number,
    expenseCount: number
}