import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import HomePage from "@/pages/HomePage"
import PageLoader from "@/components/PageLoader"

const ThemesDisplayPage = lazy(() => import("@/pages/ThemesDisplayPage"))
const SplitPanel = lazy(
  () => import("@/components/UserDataForm/SplitPanel.tsx")
)

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/themes",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ThemesDisplayPage />
      </Suspense>
    ),
  },
  {
    path: "/edit",
    element: (
      <Suspense fallback={<PageLoader />}>
        <SplitPanel />
      </Suspense>
    ),
  },
])
