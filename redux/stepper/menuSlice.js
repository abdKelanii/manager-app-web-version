import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    categoryName: "",
    categoryDescription: "",
    itemName: "",
    itemPrice: "",
    description: "",
    cookTime: "",
    dairy: false,
    vegan: false,
    vegetarian: false,
    gluten: false,
    nut: false,
    addSideItem: "",
    selectedMenuItemType: "",
    sideItems: [],
    selectedSideItemId: "",
    addedQuestions: [],
    selectedQId: null,
    selectedAnswers: [],
    answers: [],
    menuImages: [],
    stations: {},
  },
  reducers: {
    setInput: (state, action) => {
      const { type, value } = action.payload;
      state[type] = value;
    },
    setStations: (state, action) => {
      const { type, value } = action.payload;
      state.stations[type] = value;
    },
    setSelectedMenuItemType: (state, action) => {
      state.selectedMenuItemType = action.payload;
    },
    setSelectedSideItem: (state, action) => {
      state.selectedSideItemId = action.payload;
    },
    addNewSideItem: (state, action) => {
      const newSideItem = {
        id: state.sideItems.length + 1,
        sideItem: action.payload,
      };
      state.sideItems.push(newSideItem);
    },
    addNewQuestion: (state, action) => {
      const newQuestion = {
        id: state.addedQuestions.length + 1,
        questionText: action.payload,
        answers: [],
      };
      state.addedQuestions.push(newQuestion);
    },
    setSelectedQuestionId: (state, action) => {
      state.selectedQId = action.payload;
    },
    setSelectedAnswers: (state, action) => {
      state.selectedAnswers = action.payload;
    },
    addAnswerToQuestion: (state, action) => {
      const newAnswer = action.payload;
      state.answers.push(newAnswer);
      if (state.selectedQuestionId === newAnswer.questionId) {
        state.selectedAnswers.push(newAnswer);
      }
    },
    setMenuImages: (state, action) => {
      state.menuImages.push(action.payload);
    },
  },
});

export const {
  setInput,
  setSelectedMenuItemType,
  setSelectedSideItem,
  addNewSideItem,
  addNewQuestion,
  addAnswerToQuestion,
  setSelectedQuestionId,
  setSelectedAnswers,
  setMenuImages,
  updateStationState,
  setStations,
} = menuSlice.actions;
export default menuSlice.reducer;
