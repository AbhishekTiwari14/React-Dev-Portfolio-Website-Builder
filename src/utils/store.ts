import { configureStore } from "@reduxjs/toolkit"
import themeSlice from "./slices/themeSlice"
import userDataSlice from "./slices/userDataSlice"
import githubSlice from "./slices/githubSlice"

const store = configureStore({
  reducer: {
    theme: themeSlice,
    userData: userDataSlice,
    github: githubSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
