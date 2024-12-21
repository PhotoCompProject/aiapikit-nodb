import React from 'react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  placeholder?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  placeholder = 'Select date range'
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-[0.5625rem] focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            placeholder="dd/mm/yyyy"
          />
        </div>
        <span className="text-sm text-gray-400">to</span>
        <div className="relative flex-1">
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-[0.5625rem] focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            placeholder="dd/mm/yyyy"
          />
        </div>
      </div>
    </div>
  );
};
