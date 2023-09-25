import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    name: "",
    type: "",
    description: "",
    priceRange: 0,
    dairy: false,
    vegan: false,
    vegetarian: false,
    gluten: false,
    nut: false,
    city: "",
    street: "",
    zipCode: "",
    earningPercentage: 0,
    dillPay: false,
    guestOrder: false,
    selfService: false,
    serviceTime: '',
    country: "",
    selectedCountryMapCoordinates: null,
    restaurantAndStaff: 0,
    BoHAndFoH: 0,
    waitersAndTableWaiters: 0,
    chefsAndTableChaefs: 0,
    selectedCoordinates: null,
    lat: null,
    long: null,
    isCompleted: false,
  },

  reducers: {
    setInput: (state, action) => {
      let type = action.payload.type;
      let value = action.payload.value;
      state[type] = value;
    },
    setCheckInput: (state, action) => {
      let type = action.payload.type;
      let value = action.payload.value;
      state[type] = value;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setCoordinatesLat: (state, action) => {
      state.lat = action.payload;
    },
    setCoordinatesLong: (state, action) => {
      state.long = action.payload;
    },
    setIsCompleted: (state, action) => {
      state.isCompleted = action.payload;
    }
  },
});

export const { setInput, setCountry, setCoordinatesLat,setCoordinatesLong, setCheckInput, setIsCompleted } =
  detailsSlice.actions;

export default detailsSlice.reducer;
