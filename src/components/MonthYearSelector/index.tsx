import React from "react";

interface MonthYearSelectorProps {
  month: number;
  year: number;
  onMonthChange: (newMonth: number) => void;
  onYearChange: (newYear: number) => void;
}

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
  month,
  year,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">Select Month and Year</label>
      <div className="flex gap-3">
        <select
          value={month}
          onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
          className="rounded-md p-2 text-black"
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <option key={index} value={index}>
              {new Date(0, index).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
          className="rounded-md p-2 text-black"
          min="2000"
          max="2099"
        />
      </div>
    </div>
  );
};

export default MonthYearSelector;
