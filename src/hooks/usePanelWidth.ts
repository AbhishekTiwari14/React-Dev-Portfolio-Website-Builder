import { useEffect, useState, useRef } from "react"

type Breakpoint = "sm" | "md" | "lg" | "xl"

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export const usePanelWidth = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("sm")
  const elementRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const updateBreakpoint = (width: number) => {
      let newBreakpoint: Breakpoint = "sm"

      if (width >= breakpoints.xl) {
        newBreakpoint = "xl"
      } else if (width >= breakpoints.lg) {
        newBreakpoint = "lg"
      } else if (width >= breakpoints.md) {
        newBreakpoint = "md"
      }

      // Only update if the breakpoint actually changed
      setCurrentBreakpoint((prev) => {
        if (prev === newBreakpoint) {
          return prev
        }
        return newBreakpoint
      })
    }

    const debouncedUpdateBreakpoint = (width: number) => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => {
        updateBreakpoint(width)
      }, 100) // 100ms debounce delay
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        debouncedUpdateBreakpoint(entry.contentRect.width)
      }
    })

    observer.observe(elementRef.current)

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      observer.disconnect()
    }
  }, [])

  return { elementRef, currentBreakpoint }
}
