import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ThemeState = {
  currentTheme: string
  currentPalette: string
}

const initialState: ThemeState = {
  currentTheme: "minimalist",
  currentPalette: "p1",
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.currentTheme = action.payload
      state.currentPalette = "p1"
    },
    setPalette: (state, action: PayloadAction<string>) => {
      state.currentPalette = action.payload
    },
  },
})

export const { setTheme, setPalette } = themeSlice.actions
export default themeSlice.reducer
