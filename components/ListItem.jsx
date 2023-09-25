'use client';

const ListItem = ({onClick, label}) => {
  return (
    <div
      onClick={onClick}
      className="
            px-4
            py-3 
            hover:bg-gray-200
            bg-gray-100
            transition
            font-semibold
        "
    >
      {label}
    </div>
  );
};

export default ListItem;
