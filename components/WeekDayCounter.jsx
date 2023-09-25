import React, { useCallback } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeekdayCounter = ({ value, onChange }) => {
  
  const onNextDay = useCallback(() => {
    const nextDay = (value + 1) % 7;
    onChange(nextDay);
  }, [value, onChange]);

  const onPrevDay = useCallback(() => {
    const prevDay = (value - 1 + 7) % 7;
    onChange(prevDay);
  }, [value, onChange]);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center gap-4">
        {/* Left (Previous) Button */}
        <div
          onClick={onPrevDay}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <BiChevronLeft />
        </div>
        <div className="font-medium w-28 flex justify-center items-center">
          <div>{daysOfWeek[value]}</div>
        </div>
        {/* Right (Next) Button */}
        <div
          onClick={onNextDay}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <BiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default WeekdayCounter;
