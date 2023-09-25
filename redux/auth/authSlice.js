import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    email: "",
    password: "",
    repeatPassord: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    isLoading: true,
    user: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRepeatPassword: (state, action) => {
      state.repeatPassord = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setFirstName,
  setLastName,
  setBirthDate,
  setRepeatPassword,
  loginUser,
  logout,
  setIsLoading,
} = authSlice.actions;
export default authSlice.reducer;
