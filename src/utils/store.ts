import { configureStore } from "@reduxjs/toolkit"
import themeSlice from "./slices/themeSlice"
import userDataSlice from "./slices/userDataSlice"

const store = configureStore({
  reducer: {
    theme: themeSlice,
    userData: userDataSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
