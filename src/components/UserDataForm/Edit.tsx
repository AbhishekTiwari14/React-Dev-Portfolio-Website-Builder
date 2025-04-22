import React, { useState, useRef, useEffect } from "react"
import {
  EyeIcon,
  EditIcon,
  SmartphoneIcon,
  TabletIcon,
  MonitorIcon,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MinimalistTheme from "../Minimalist Theme/MinimalistTheme"
import FormStep from "./FormStep"

export default function Edit() {
  const [leftPanelWidth, setLeftPanelWidth] = useState(45)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [isResizing, setIsResizing] = useState(false)
  const [previewMode, setPreviewMode] = useState("auto") // 'auto', 'mobile', 'tablet', 'desktop'
  const dividerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const [previewWidth, setPreviewWidth] = useState(50)

  // Handle mouse down on divider
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsResizing(true)
  }

  // Handle mouse move to resize panels
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const mouseX = e.clientX - containerRect.left

      // Calculate percentage (constrained between 20% and 80%)
      let newLeftWidth = (mouseX / containerWidth) * 100
      newLeftWidth = Math.max(25, Math.min(80, newLeftWidth))

      setLeftPanelWidth(newLeftWidth)
      setPreviewWidth(95 - newLeftWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  useEffect(() => {
    if (!previewContainerRef.current) return

    // Store a reference to the current element
    const element = previewContainerRef.current

    const updatePreviewWidth = () => {
      if (element) {
        setPreviewWidth(element.offsetWidth)
      }
    }

    // Initial width
    updatePreviewWidth()

    // Create ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(updatePreviewWidth)
    resizeObserver.observe(element)

    return () => {
      // Use the stored reference in cleanup
      if (element) {
        resizeObserver.unobserve(element)
      }
    }
  }, [showRightPanel])

  const toggleLeftPanel = () => {
    if (showLeftPanel) {
      setShowLeftPanel(false)
    } else {
      setShowLeftPanel(true)
      // Restore a reasonable width if right panel is also showing
      if (showRightPanel) {
        setLeftPanelWidth(50)
      } else {
        setLeftPanelWidth(100)
      }
    }
  }

  const toggleRightPanel = () => {
    if (showRightPanel) {
      setShowRightPanel(false)
    } else {
      setShowRightPanel(true)
      // Restore a reasonable width if left panel is also showing
      if (showLeftPanel) {
        setLeftPanelWidth(50)
      } else {
        setLeftPanelWidth(0)
      }
    }
  }

  // Determine which preview size to use
  const getPreviewSize = () => {
    if (previewMode !== "auto") {
      // Return explicit sizes based on selected mode
      switch (previewMode) {
        case "mobile":
          return { width: 375, height: "100%" }
        case "tablet":
          return { width: 768, height: "100%" }
        case "desktop":
          return { width: "100%", height: "100%" }
        default:
          return { width: "100%", height: "100%" }
      }
    }

    // Auto mode - determine size based on container width
    if (previewWidth < 640) {
      return { width: 375, height: "100%" } // Mobile
    } else if (previewWidth < 1024) {
      return { width: 768, height: "100%" } // Tablet
    } else {
      return { width: "100%", height: "100%" } // Desktop
    }
  }

  function updateWidths(screenType: string) {
    setPreviewMode(screenType)
    const containerRect = containerRef?.current?.getBoundingClientRect()
    const containerWidth = containerRect?.width || 1380
    console.log(containerWidth)
    if (screenType === "mobile") {
      const newLeftWidth = 95 - (375 / containerWidth) * 100
      setLeftPanelWidth(newLeftWidth)
    } else if (screenType === "tablet") {
      const newLeftWidth = 95 - (768 / containerWidth) * 100
      setLeftPanelWidth(newLeftWidth)
    } else {
      setLeftPanelWidth(0)
    }
  }

  const previewSize = getPreviewSize()
  const isMobilePreview =
    previewMode === "mobile" || (previewMode === "auto" && previewWidth < 640)
  const isTabletPreview =
    previewMode === "tablet" ||
    (previewMode === "auto" && previewWidth >= 640 && previewWidth < 1024)

  return (
    <>
      {/* Mobile view (unchanged) */}
      <Tabs
        defaultValue="account"
        className="w-full min-h-screen my-4 lg:hidden"
      >
        <TabsList className="grid max-w-[400px] grid-cols-2 ml-4 bg-slate-200">
          <TabsTrigger value="account">Edit</TabsTrigger>
          <TabsTrigger value="password">Preview</TabsTrigger>
        </TabsList>
        <TabsContent
          value="account"
          className="border-2 border-gray-200 p-8 bg-gray-50 h-full"
        >
          <FormStep />
        </TabsContent>
        <TabsContent value="password">
          <MinimalistTheme />
        </TabsContent>
      </Tabs>

      {/* Desktop view (enhanced) */}
      <div className="hidden lg:block w-full h-screen bg-gray-100 overflow-hidden">
        {/* Header with controls */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary">Portfolio Builder</h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleLeftPanel}
                className={`p-2 rounded-md ${
                  !showLeftPanel ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                title={showLeftPanel ? "Hide editor" : "Show editor"}
              >
                <EditIcon className="w-5 h-5" />
              </button>

              <button
                onClick={toggleRightPanel}
                className={`p-2 rounded-md ${
                  !showRightPanel ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                title={showRightPanel ? "Hide preview" : "Show preview"}
              >
                <EyeIcon className="w-5 h-5" />
              </button>
            </div>

            {showRightPanel && (
              <>
                <div className="h-6 border-r border-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      updateWidths("mobile")
                    }}
                    className={`p-2 rounded-md ${
                      previewMode === "mobile"
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                    title="Mobile view"
                  >
                    <SmartphoneIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => updateWidths("tablet")}
                    className={`p-2 rounded-md ${
                      previewMode === "tablet"
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                    title="Tablet view"
                  >
                    <TabletIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => updateWidths("desktop")}
                    className={`p-2 rounded-md ${
                      previewMode === "desktop"
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                    title="Desktop view"
                  >
                    <MonitorIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setPreviewMode("auto")}
                    className={`p-2 rounded-md ${
                      previewMode === "auto"
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                    title="Auto-responsive view"
                  >
                    <span className="text-xs font-medium">Auto</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main content area with resizable panels */}
        <div ref={containerRef} className="flex h-[calc(100vh-57px)] relative">
          {/* Editor panel */}
          {showLeftPanel && (
            <div
              className="bg-white border-r border-gray-200 overflow-hidden transition-width duration-300 ease-in-out"
              style={{ width: showRightPanel ? `${leftPanelWidth}%` : "100%" }}
            >
              <div className="h-full p-4">
                <FormStep />
              </div>
            </div>
          )}

          {/* Resizable divider */}
          {showLeftPanel && showRightPanel && (
            <div
              ref={dividerRef}
              className={`w-2 absolute top-0 bottom-0 bg-gray-200 hover:bg-blue-400 cursor-col-resize z-10 transform -translate-x-1/2 ${
                isResizing ? "bg-blue-400" : ""
              }`}
              style={{ left: `${leftPanelWidth}%` }}
              onMouseDown={handleMouseDown}
            />
          )}

          {/* Preview panel */}
          {showRightPanel && (
            <div
              ref={previewContainerRef}
              className="bg-gray-50 overflow-hidden transition-width duration-300 ease-in-out"
              style={{
                width: showLeftPanel ? `${100 - leftPanelWidth}%` : "100%",
              }}
            >
              <div className="h-full p-4 overflow-y-auto flex flex-col items-center">
                {/* Preview container with device frame */}
                <div
                  className={`relative flex-1 overflow-y-auto overflow-x-hidden ${
                    isMobilePreview || isTabletPreview
                      ? "border-2 border-gray-300 rounded-lg shadow"
                      : ""
                  }`}
                  style={{
                    width: previewSize.width,
                    maxHeight:
                      isMobilePreview || isTabletPreview ? "100%" : "100%",
                    transition: "width 0.3s ease",
                  }}
                >
                  {/* Device chrome indicators */}
                  {isMobilePreview && (
                    <div className="h-6 bg-gray-800 w-full flex justify-center items-center rounded-t-lg">
                      <div className="w-20 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  )}

                  {/* Preview content */}
                  <div className="overflow-x-hidden w-full">
                    <MinimalistTheme />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
