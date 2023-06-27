import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    changeTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
