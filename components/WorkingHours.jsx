import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addWorkingHour,
  removeWorkingHour,
  setWorkingHoursForAllDays,
} from "../redux/workingHours/workingHoursSlice";
import WeekdayCounter from "./WeekDayCounter";
import Button from "./ui/Button";
import TimeInput from "./inputs/TimeInput";
import Header from "./ui/Header";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WorkingHours = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const workingHours = useSelector((state) => state.workingHours);
  const dispatch = useDispatch();

  const handleDayChange = (newDay) => {
    setSelectedDay(newDay);
  };

  const handleAddWorkingHours = () => {
    if (!openingHour || !closingHour) {
      alert("Please provide both opening and closing hours.");
      return;
    }

    const day = daysOfWeek[selectedDay];
    if (workingHours[day]) {
      alert(`Working hours already exist for ${day}`);
    } else {
      dispatch(addWorkingHour({ day, openingHour, closingHour }));
      setClosingHour("");
      setOpeningHour("");
    }
  };

  const setHoursForAllDays = () => {
    if (!openingHour || !closingHour) {
      alert("Please provide both opening and closing hours.");
      return;
    }

    const newWorkingHours = daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        openingHour,
        closingHour,
      };
      return acc;
    }, {});

    dispatch(setWorkingHoursForAllDays(newWorkingHours));
    setOpeningHour("");
    setClosingHour("");
  };

  const handleRemoveWorkingHours = (day) => {
    if (window.confirm(`Are you sure you want to remove working hours for ${day}?`)) {
      dispatch(removeWorkingHour({ day }));
    }
  };

  return (
    <div className="mt-10">
      <div>
        <Header title="Working Hours" secondary />
        {Object.keys(workingHours).length > 0 && (
          <div className="grid grid-cols-2 mt-5 gap-x-20 gap-y-2">
            {Object.keys(workingHours).map((day, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    {" "}
                    <span className="font-medium">{day}:</span>{" "}
                  </div>
                  <div>
                    {String(workingHours[day].openingHour)} -{" "}
                    {String(workingHours[day].closingHour)}
                  </div>
                  <div>
                    <button className="text-red-500 text-sm hover:underline" onClick={() => handleRemoveWorkingHours(day)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="md:flex gap-x-5">
          <div className="flex-1">
            <TimeInput
              label="from"
              value={openingHour}
              onChange={(newValue) => setOpeningHour(newValue.target.value)}
            />
          </div>
          <div className="flex-1">
            <TimeInput
              label="to"
              value={closingHour}
              onChange={(newValue) => setClosingHour(newValue.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <WeekdayCounter value={selectedDay} onChange={handleDayChange} />
        </div>
        <div className="flex gap-x-5">
          <Button
            name={`Add working hours for ${daysOfWeek[selectedDay]}`}
            onClick={handleAddWorkingHours}
          />
          <Button name="Set for all days" green onClick={setHoursForAllDays} />
        </div>
      </div>
    </div>
  );
};

export default WorkingHours;
