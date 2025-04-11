import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/HomePage"
import ThemesDisplayPage from "@/pages/ThemesDisplayPage"

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/themes", element: <ThemesDisplayPage /> },
])
