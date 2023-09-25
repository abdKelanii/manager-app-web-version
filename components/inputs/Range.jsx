'use client';

import { useState } from "react";

function Range({min, max, label, price, bill, value, onChange}) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setLocalValue(newValue);
    onChange(newValue); 
  };

  const getValueLabel = (value) => {
    if (bill) {
      const percentage = value * 10;
      return `${percentage}/${100 - percentage}`;
    } else {
      switch (value) {
        case "0":
          return "$";
        case "1":
          return "$$";
        case "2":
          return "$$$";
        case "3":
          return "$$$$";
        case "4":
          return "$$$$$";
        default:
          return "$";
      }
    }
  };

  return (
    <div className="my-5">
      <div>
        <label htmlFor="minmax-range" className="text-xl">
          {label} {price || bill ? getValueLabel(value) : value}
        </label>
      </div>
      <input
        id="minmax-range"
        type="range"
        min={min}
        max={max}
        value={value}
        onInput={handleChange} 
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
}

export default Range;
