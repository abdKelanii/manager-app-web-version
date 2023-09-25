"use client";

const SelectInput = ({ data, label, onChange, value }) => {
  return (
    <div className="my-5">
      <label htmlFor="id" className="text-md font-light text-sm">
        {label}
      </label>
      <select
        name="id"
        id="id"
        onChange={onChange}
        value={value}
        className="w-full p-4 font-light bg-white border-2 border-gray-200 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <option hidden value="select...">Select...</option>
        {data.map((item) => (
          <option key={item.id || item} value={item.id || item}>
            {item.questionText || item.sideItem || item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;