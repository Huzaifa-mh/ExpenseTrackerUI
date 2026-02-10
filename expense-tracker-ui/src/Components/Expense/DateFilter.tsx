import { useState, type FormEvent } from "react";

interface DateFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
  onClear: () => void;
}

function DateFilter({ onFilter, onClear }: DateFilterProps) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    if (startDate && endDate) {
      console.log("🔍 Calling onFilter...");
      onFilter(startDate, endDate);
    }else {
      console.log('❌ Missing dates!');
    }
  };

  const handleClear = () => {
    console.log('🔍 Clear clicked!');
    setStartDate("");
    setEndDate("");
    onClear();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📅 Filter by Date Range
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
        {/* startdate */}
        <div className="flex-1 min-w-[200px] ">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            From
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-bluw-500 outline-none text-gray-900"
          />
        </div>

        {/* enddate */}
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            To
          </label>

          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-bluw-500 outline-none text-gray-900"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!startDate || !endDate}
            onClick={() => console.log('🔍 Filter button clicked!')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700  disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
          >
            Filter
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default DateFilter;
