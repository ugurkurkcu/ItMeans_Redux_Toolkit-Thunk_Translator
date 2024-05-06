import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  isLoading: false,
  error: null,
  translation: "",
};

const translationSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setTranslation: (state, action) => {
      state.translation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(translateText.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isLoading = false;
      (state.error = null), (state.translation = action.payload.translatedText);
    });
  },
});

export default translationSlice.reducer;

export const { setTranslation } = translationSlice.actions;
