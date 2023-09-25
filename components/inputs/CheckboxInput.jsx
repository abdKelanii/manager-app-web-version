'use client';

function CheckboxInput({ label, value, onChange }) {
  
  return (
    <div className="my-3">
      <div className="flex items-center">
        <input
          id={`checkbox-${label}`}
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
        <label
          htmlFor={`checkbox-${label}`}
          className="ml-2 text-md text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default CheckboxInput;
