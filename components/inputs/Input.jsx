"use client";

function Input({
  id,
  label,
  disabled,
  placeholder,
  multiline,
  type,
  onChange,
  value,
  radio,
}) {


  return (
    <div className="my-5">
      <div className={` ${radio ? "mb-0" : "mb-5"} w-full`}>
        <label className={`text-md ml-1 font-light text-sm`}>{label}</label>
        {multiline ? (
          <textarea
            rows={4}
            id={id}
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            className={`w-full p-4 font-light bg-white border-2 border-gray-200 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed`}
          />
        ) : (
          <input
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            min="0"
            value={value}
            onChange={onChange}
            className={`
                            ${
                              radio
                                ? "w-full p-1 font-light bg-white border-2 border-gray-200 rounded-full outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
                                : "w-full p-4 font-light bg-white border-2 border-gray-200 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
                            }
                            
                            ${id === "description" ? "pb-20" : ""}
                        `}
          />
        )}
      </div>
    </div>
  );
}

export default Input;
