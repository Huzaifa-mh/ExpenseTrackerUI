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
      onFilter(startDate, endDate);
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    onClear();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Filter by Date Range</h3>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 item-end">
        {/* startdate */}
        <div className="">
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
      </form>
    </div>
  );
}
