import { useState, useCallback, MouseEvent, useEffect } from "react"
import FormStep from "./FormStep"
import { Fullscreen, SmartphoneIcon, TabletIcon } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/utils/store"
import CreativeTheme from "../Creative Theme/CreativeTheme"
import MinimalistTheme from "../Minimalist Theme/MinimalistTheme"

export default function SplitPanel() {
  const [isDragging, setIsDragging] = useState(false)
  const [splitPosition, setSplitPosition] = useState(50)
  const [view, setView] = useState<"phone" | "tablet" | "fullscreen" | "auto">(
    "auto"
  )
  const minWidth = 300

  const { currentTheme } = useSelector((state: RootState) => state.theme)

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDragging) return

      const container = document.getElementById("split-pane-container")
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const newPosition =
        ((e.clientX - containerRect.left) / containerRect.width) * 100

      // Ensure we don't exceed minimum widths
      const leftMinPercentage = (minWidth / containerRect.width) * 100
      const rightMinPercentage = 100 - (minWidth / containerRect.width) * 100

      if (
        newPosition >= leftMinPercentage &&
        newPosition <= rightMinPercentage
      ) {
        setSplitPosition(newPosition)
      }
    },
    [isDragging, minWidth]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setView("auto")
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  function handleViewType(viewType: string) {
    const viewportWidth = window.innerWidth
    if (viewType === "phone") {
      const phoneWidthPercentage = (400 / viewportWidth) * 100
      setSplitPosition(100 - phoneWidthPercentage)
      setView("phone")
    } else if (viewType === "tablet") {
      const tabletWidthPercentage = (800 / viewportWidth) * 100
      setSplitPosition(100 - tabletWidthPercentage)
      setView("tablet")
    } else if (viewType === "fullscreen") {
      setSplitPosition(0)
      setView("fullscreen")
    }
  }

  return (
    <div className="hidden lg:block w-full h-screen bg-gray-100 overflow-hidden">
      {/* Header with controls */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary">Portfolio Builder</h1>

        <div className="flex items-center space-x-2">
          <div className="h-6 border-r border-gray-300"></div>
          <button
            onClick={() => handleViewType("phone")}
            className={`p-2 rounded-md ${
              view === "phone" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <SmartphoneIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleViewType("tablet")}
            className={`p-2 rounded-md ${
              view === "tablet" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <TabletIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleViewType("fullscreen")}
            className={`p-2 rounded-md ${
              view === "fullscreen" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <Fullscreen className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div id="split-pane-container" className="flex h-full w-full relative">
        {view !== "fullscreen" && (
          <>
            <div
              className="h-full overflow-auto p-2 pt-0"
              style={{ width: `${splitPosition}%` }}
            >
              <div className="h-full p-4">
                <FormStep />
              </div>
            </div>

            <div
              className="w-2 bg-gray-400 hover:bg-blue-400 cursor-col-resize active:bg-blue-600 transition-colors"
              onMouseDown={handleMouseDown}
              style={{
                cursor: isDragging ? "col-resize" : undefined,
              }}
            />
          </>
        )}

        <div
          className="h-full overflow-y-scroll"
          style={{ width: `${100 - splitPosition}%` }}
        >
          {currentTheme === "creative" && <CreativeTheme />}
          {currentTheme === "minimalist" && <MinimalistTheme />}
        </div>

        {isDragging && <div className="fixed inset-0 z-50 cursor-col-resize" />}
      </div>
    </div>
  )
}
