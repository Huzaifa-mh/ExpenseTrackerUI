import axios from "axios";
import type { Category, CreateExpenseDTO, Expense, ExpenseSummary, MonthlySummary } from "../types/expense";



//API base URL
const API_BASE_URL = "https://expense-api-drhygdgseaedcngx.eastasia-01.azurewebsites.net/api";

const api= axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    },
});

export const expenseAPI = {

    // getExpenses(){ async (startDate?: string, endDate?: string): Promise<Expense[]> => {
    //     const params: Record<string, string> = {};
    //     if(startDate) params.startDate = startDate;
    //     if(endDate) params.endDate = endDate;

    //     const response = await api.get<Expense[]>('/expenses', {params});
    //     return response.data;
    //     }
    // },

    async getExpenses(startDate?: string, endDate?: string): Promise<Expense[]> {
        const params: Record<string, string> = {};
        if(startDate) params.startDate = startDate;
        if(endDate) params.endDate = endDate;

        const response = await api.get<Expense[]>('/expenses', {params});
        return response.data;
    },

    async getExpenseByID(id: number): Promise<Expense> {
        const response = await api.get<Expense>(`/expenses/${id}`);
        return response.data;
    },


    async createExpense(expenseDate: CreateExpenseDTO): Promise<Expense> {
        const response = await api.post<Expense>('/expenses', expenseDate);
        return response.data;
    },

    async deleteExpense(id: number): Promise<void> {
        await api.delete(`/expenses/${id}`);
    },

    async getSummary(): Promise<ExpenseSummary[]> {
        const response = await api.get<ExpenseSummary[]>('/expenses/summary');
        return response.data;
    },

    async getMonthlySummary(month: number = 6): Promise<MonthlySummary[]> {
        const response = await api.get<MonthlySummary[]>("/expenses/monthly-summary", {params: {month}});
        return response.data;
    }

};

export const categoryAPI = {
    async getCategories(): Promise<Category[]> {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },
};
