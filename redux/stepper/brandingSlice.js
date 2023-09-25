import { createSlice } from "@reduxjs/toolkit";

const brandingSlice = createSlice({
  name: "branding",
  initialState: {
    restuarantImages: [],
  },
  reducers: {
    setRestuarantImagesImages: (state, action) => {
      state.restuarantImages.push(action.payload);
    },
  },
});

export const { setRestuarantImagesImages } = brandingSlice.actions;
export default brandingSlice.reducer;
