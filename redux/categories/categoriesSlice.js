import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    categoryNameInput: "",
    categoryDescriptionInput: "",
    selectedCategoryId: null,
  },
  reducers: {
    addCategory: (state, action) => {
      state.list.push(action.payload);
    },
    editCategory: (state, action) => {
      const { id, categoryName, categoryDescription } = action.payload;
      const categoryToEdit = state.list.find((category) => category.id === id);
      if (categoryToEdit) {
        categoryToEdit.categoryName = categoryName;
        categoryToEdit.categoryDescription = categoryDescription;
      }
    },
    deleteCategory: (state, action) => {
      state.list = state.list.filter(
        (category) => category.id !== action.payload
      );
    },
    setCategoryNameInput: (state, action) => {
      state.categoryNameInput = action.payload;
    },
    setCategoryDescriptionInput: (state, action) => {
      state.categoryDescriptionInput = action.payload;
    },
    setSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    }
  },
});

export const {
  addCategory,
  editCategory,
  deleteCategory,
  setCategoryNameInput,
  setCategoryDescriptionInput,
  setSelectedCategoryId,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
