import { createSlice } from "@reduxjs/toolkit";

const BoHSlice = createSlice({
  name: "BoH",
  initialState: [],
  reducers: {
    addStation: (state, action) => {
      state.push(action.payload);
    },
    deleteStation: (state, action) => {
      // Find the index of the station to delete
      const indexToDelete = state.findIndex(
        (station) => station.id === action.payload
      );

      if (indexToDelete !== -1) {
        // Use splice to remove the station at the found index
        state.splice(indexToDelete, 1);
      }
    },
  },
});

export const { addStation, deleteStation } = BoHSlice.actions;
export default BoHSlice.reducer;
