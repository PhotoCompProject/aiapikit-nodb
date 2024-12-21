import React, { useState, useEffect } from 'react';
import { formatCompactNumber, parseCompactNumber } from '../../../utils/numberFormat';

interface UsageSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export const UsageSlider: React.FC<UsageSliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange
}) => {
  const [inputValue, setInputValue] = useState(formatCompactNumber(value));

  useEffect(() => {
    setInputValue(formatCompactNumber(value));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const parsedValue = parseCompactNumber(newValue);
    if (parsedValue !== null && parsedValue >= min && parsedValue <= max) {
      onChange(parsedValue);
    }
  };

  const handleInputBlur = () => {
    const parsedValue = parseCompactNumber(inputValue);
    if (parsedValue === null || parsedValue < min) {
      setInputValue(formatCompactNumber(min));
      onChange(min);
    } else if (parsedValue > max) {
      setInputValue(formatCompactNumber(max));
      onChange(max);
    } else {
      // Round to nearest step
      const roundedValue = Math.round(parsedValue / step) * step;
      setInputValue(formatCompactNumber(roundedValue));
      onChange(roundedValue);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-orange-500 
              [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2.6
              [&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-2.6
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-2.5"
        />
        <div className="relative w-32">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-full px-3 py-1 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 font-mono"
          />
        </div>
      </div>
    </div>
  );
};
