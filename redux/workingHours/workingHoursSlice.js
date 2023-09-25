import { createSlice } from "@reduxjs/toolkit";

const workingHoursSlice = createSlice({
  name: "workingHours",
  initialState: {},
  reducers: {
    addWorkingHour: (state, action) => {
      const { day, openingHour, closingHour } = action.payload;
      state[day] = { openingHour, closingHour };
    },
    removeWorkingHour: (state, action) => {
      const { day } = action.payload;
      delete state[day];
    },
    setWorkingHoursForAllDays: (state, action) => {
      return action.payload;
    },
  },
});

export const { addWorkingHour, removeWorkingHour, setWorkingHoursForAllDays } =
  workingHoursSlice.actions;
export default workingHoursSlice.reducer;
