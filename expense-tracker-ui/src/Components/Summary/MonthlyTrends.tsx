import { useEffect, useState } from "react";
import type { MonthlySummary } from "../../types/expense";
import { expenseAPI } from "../../service/api";


interface MonthlyTrendsProps {
    refreshTrigger: number;
}

function MonthlyTrends({ refreshTrigger }: MonthlyTrendsProps) {

    const [data, setData] = useState<MonthlySummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, [refreshTrigger]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await expenseAPI.getMonthlySummary(6);
            setData(result);
            setError('');
        }catch (err) {
            console.error('Error fetching monthly summary:', err);
            setError('Failed to load monthly trends');
        }finally{
            setLoading(false);
        }
    }

    const getMonthName = (month: number) =>{
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[month-1];
    }

    const maxAmount = Math.max(...data.map(d => d.totalAmount), 0);

    if(loading){
        return(
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading Trend....</p>
                </div>
            </div>
        );
    }

    if(error){
        return(
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                    <p className="font-medium">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if(data.length === 0){
        return(
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    📈 Monthly Trend
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded"></div>
                <p className="font-medium">No Data yet</p>
                <p>Add expense to see monthly trends!</p>
            </div>
        );
    }

    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    📈 Monthly Spending Trend
                </h2>
                <p className="text-sm text-gray-600">
                    Last {data.length} months
                </p>
            </div>

            {/* charts */}
            <div className="space-y-4">
                {data.map((item) => {
                    const percentage = maxAmount >0 ? (item.totalAmount / maxAmount) *100 : 0;

                    return(
                        <div key={`${item.year}-${item.month}`} className="group">
                            {/* month label */}
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                    {getMonthName(item.month)} {item.year}
                                </span>
                                <span className="text-sm font-medium text-gray-800">
                                    ${item.totalAmount.toFixed(2)}
                                </span>
                            </div>

                            {/* bar */}
                            <div className="relative">
                                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r form blue-500 to-blue-600 rounded-full transition-all duration-500 flex items-center justify-end pr-2 group-hover:from-blue-600 group-hover:to-blue-700" style={{width: `${percentage}%`}}>
                                        {percentage > 20 && (
                                            <span>
                                                {item.expenseCount} {item.expenseCount === 1? 'expense' : 'expenses'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* summar */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                            Average per month:
                        </span>
                        <span className="font-bold text-gray-800">
                            ${(data.reduce((sum, d) => sum * d.totalAmount, 0)/ data.length).toFixed(2)}
                        </span>
                    </div>
                </div>


        </div>
    );

}

export default MonthlyTrends;