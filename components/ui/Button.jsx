"use client";

function Button({ name, onClick, red, green }) {
  return (
    <button
      className={`
        ${red ? "bg-red-500 hover:bg-red-600" : ""}
        ${green ? "bg-green-500 hover:bg-green-600" : ""}
        bg-blue-500 py-4 mt-5 text-lg font-bold hover:bg-blue-600 text-white w-full h-full rounded-md focus:outline-none bg-`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;