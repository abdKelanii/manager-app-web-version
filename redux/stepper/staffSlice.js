import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    BoHRate: '',
    FoHRate: '',
    FoHEmail: '',
    BoHEmail: '',
  },
  reducers: {
    setInput: (state, action) => {
      let type = action.payload.type;
      let value = action.payload.value;
      state[type] = value;
    },
  },
});

export const { setInput } = staffSlice.actions;
export default staffSlice.reducer;
