import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink, Code } from "lucide-react"

const ProjectCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [shinePosition, setShinePosition] = useState<number>(-100)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const shineIntervalRef = useRef<number | null>(null)

  // Shine animation effect
  useEffect(() => {
    if (!isHovered) {
      if (shineIntervalRef.current !== null) {
        window.clearInterval(shineIntervalRef.current)
        shineIntervalRef.current = null
      }
      setShinePosition(-100)
      return
    }

    // Start the shine animation immediately
    setShinePosition(-100)

    shineIntervalRef.current = window.setInterval(() => {
      setShinePosition((prev) => {
        if (prev > 200) return -100
        return prev + 3 // Move even faster for more noticeable shine
      })
    }, 10)

    return () => {
      if (shineIntervalRef.current !== null) {
        window.clearInterval(shineIntervalRef.current)
        shineIntervalRef.current = null
      }
    }
  }, [isHovered])

  // Enhanced parallax effect
  useEffect(() => {
    if (!cardRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()

        // Calculate mouse position relative to the center of the card
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Create more pronounced effect by calculating distance from center
        const x = (e.clientX - centerX) / (rect.width / 2)
        const y = (e.clientY - centerY) / (rect.height / 2)

        // Set mouse position with enhanced effect range
        setMousePosition({
          x: x * 30, // Increased from 20 to 30 for more evident effect
          y: y * 20, // Kept at 20 to avoid excessive vertical tilt
        })
      }
    }

    const resetMousePosition = () => {
      // Smoothly reset card position when mouse leaves
      setMousePosition({ x: 0, y: 0 })
      setIsHovered(false)
    }

    cardRef.current.addEventListener("mousemove", handleMouseMove)
    cardRef.current.addEventListener("mouseleave", resetMousePosition)
    cardRef.current.addEventListener("mouseenter", () => setIsHovered(true))

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", handleMouseMove)
        cardRef.current.removeEventListener("mouseleave", resetMousePosition)
        cardRef.current.removeEventListener("mouseenter", () =>
          setIsHovered(true)
        )
      }
    }
  }, [])

  // Card variants for animations
  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    initial: {
      scale: 1,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    flipped: {
      rotateY: 180,
    },
    normal: {
      rotateY: 0,
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  // Calculate transform style based on mouse position with smoother transitions
  const getCardTransform = () => {
    if (!isHovered) return "perspective(1200px) rotateY(0deg) rotateX(0deg)"

    // Apply a smoother, more pronounced parallax effect
    return `perspective(1200px) rotateY(${mousePosition.x * 0.08}deg) rotateX(${
      -mousePosition.y * 0.04
    }deg)`
  }

  return (
    <motion.div
      ref={cardRef}
      className="perspective-1200 w-full"
      style={{
        perspective: "1200px", // Set perspective on container for better 3D effect
        transformStyle: "preserve-3d",
      }}
      animate={isFlipped ? "flipped" : "normal"}
      variants={cardVariants}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: getCardTransform(),
          transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)", // Use more natural easing
          transformOrigin: "center center", // Better origin point for rotation
          willChange: "transform", // Hint for browser to optimize
          backfaceVisibility: "hidden",
        }}
      >
        {/* Front of Card */}
        <motion.div
          className={`w-full h-full ${isFlipped ? "hidden" : "block"}`}
          style={{
            backfaceVisibility: "hidden",
            willChange: "transform",
            transformStyle: "preserve-3d",
            // Text optimization to prevent blur
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
          whileHover="hover"
          animate={isHovered ? "hover" : "initial"}
          variants={cardVariants}
        >
          <Card className="w-full bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-slate-100 overflow-hidden">
            {/* Enhanced shine effect */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              <div
                className="absolute top-0 bottom-0 w-40 h-full bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  left: `${shinePosition}%`,
                  transform: "skewX(-20deg)",
                  opacity: 0.2, // Increased opacity for more visible shine
                }}
              />
            </div>

            {/* Add subtle shadow effect that moves opposite to card tilt */}
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                boxShadow: isHovered
                  ? `inset ${-mousePosition.x * 0.03}px ${
                      -mousePosition.y * 0.03
                    }px 30px rgba(0,0,0,0.3)`
                  : "inset 0px 0px 0px rgba(0,0,0,0)",
                transition: "box-shadow 0.2s ease-out",
              }}
            />

            <CardHeader className="relative z-10">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "translateZ(1px)", // Slight offset to prevent z-fighting
                }}
              >
                <motion.div variants={itemVariants}>
                  <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white mb-2">
                    Featured Project
                  </Badge>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-xl text-cyan-300 font-bold">
                    AI Image Generator
                  </CardTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardDescription className="text-slate-300">
                    Generate stunning AI images using stable diffusion
                    technology
                  </CardDescription>
                </motion.div>
              </motion.div>
            </CardHeader>

            <CardContent>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
                style={{
                  backfaceVisibility: "hidden",
                  // Improve text rendering
                  transform: "translateZ(1px)",
                }}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-2"
                >
                  {["React", "Three.js", "WebGL", "TensorFlow", "Tailwind"].map(
                    (tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-slate-800 text-slate-200 border-slate-600"
                      >
                        {tech}
                      </Badge>
                    )
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-slate-300 text-sm"
                >
                  <p>
                    A full-stack application that uses AI to generate and
                    manipulate images based on text prompts with real-time
                    preview.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-slate-300 text-sm space-y-2"
                >
                  <h3 className="font-medium text-cyan-300">Key Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Real-time image generation with adjustable parameters
                    </li>
                    <li>3D visualization of the image generation process</li>
                    <li>Save and share generated images</li>
                  </ul>
                </motion.div>
              </motion.div>
            </CardContent>

            <CardFooter className="border-t border-slate-700 pt-4">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex justify-between w-full"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "translateZ(1px)",
                }}
              >
                <motion.div variants={itemVariants} className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-800 border-slate-600 text-slate-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>{" "}
                    Code
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-800 border-slate-600 text-slate-200"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                  </Button>
                </motion.div>
              </motion.div>
            </CardFooter>

            {/* Enhanced animated corner decorations that respond to motion */}
            <div
              className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-500/40 to-transparent rounded-br-full"
              style={{
                transform: isHovered
                  ? `translateX(${mousePosition.x * 0.03}px) translateY(${
                      mousePosition.y * 0.03
                    }px)`
                  : "none",
                transition: "transform 0.3s ease-out",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/40 to-transparent rounded-tl-full"
              style={{
                transform: isHovered
                  ? `translateX(${-mousePosition.x * 0.03}px) translateY(${
                      -mousePosition.y * 0.03
                    }px)`
                  : "none",
                transition: "transform 0.3s ease-out",
              }}
            />
          </Card>
        </motion.div>

        {/* Back of Card */}
        <motion.div
          className={`w-full h-full absolute top-0 left-0 ${
            isFlipped ? "block" : "hidden"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            willChange: "transform",
            transformStyle: "preserve-3d",
            // Text optimization
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
          whileHover="hover"
          animate={isHovered ? "hover" : "initial"}
          variants={cardVariants}
        >
          <Card className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-slate-100">
            {/* Enhanced shine effect (back card) */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              <div
                className="absolute top-0 bottom-0 w-40 h-full bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  left: `${shinePosition}%`,
                  transform: "skewX(-20deg)",
                  opacity: 0.2, // Increased opacity
                }}
              />
            </div>

            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                boxShadow: isHovered
                  ? `inset ${mousePosition.x * 0.03}px ${
                      mousePosition.y * 0.03
                    }px 30px rgba(0,0,0,0.3)`
                  : "inset 0px 0px 0px rgba(0,0,0,0)",
                transition: "box-shadow 0.2s ease-out",
              }}
            />

            <CardHeader>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "translateZ(1px)",
                }}
              >
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-xl text-cyan-300 font-bold">
                    Project Details
                  </CardTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardDescription className="text-slate-300">
                    Technical insights and architecture
                  </CardDescription>
                </motion.div>
              </motion.div>
            </CardHeader>

            <CardContent>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "translateZ(1px)",
                }}
              >
                <motion.div variants={itemVariants}>
                  <div className="bg-slate-800 border border-cyan-500/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-4 w-4 text-cyan-400" />
                      <h3 className="text-cyan-400 font-medium">
                        Technical Stack
                      </h3>
                    </div>
                    <p className="text-slate-300 text-sm">
                      React frontend with Three.js for 3D visualization and
                      TensorFlow.js for client-side inference.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-slate-300 text-sm space-y-2"
                >
                  <h3 className="font-medium text-cyan-300">Key Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Real-time image generation with adjustable parameters
                    </li>
                    <li>3D visualization of the image generation process</li>
                    <li>Save and share generated images</li>
                    <li>Custom prompt engineering tools</li>
                    <li>Image history with editable metadata</li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-slate-300 text-sm space-y-2"
                >
                  <h3 className="font-medium text-cyan-300">
                    Challenges Solved:
                  </h3>
                  <p>
                    Optimized inference performance to run complex AI models in
                    the browser with WebGL acceleration.
                  </p>
                </motion.div>
              </motion.div>
            </CardContent>

            <CardFooter className="border-t border-slate-700 pt-4">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "translateZ(1px)",
                }}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex justify-end"
                >
                  <Button
                    onClick={() => setIsFlipped(false)}
                    variant="outline"
                    size="sm"
                    className="bg-slate-800 border-slate-600 hover:bg-slate-700 text-slate-200"
                  >
                    Back to Project
                  </Button>
                </motion.div>
              </motion.div>
            </CardFooter>

            {/* Enhanced animated corner decorations for back side */}
            <div
              className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/40 to-transparent rounded-bl-full"
              style={{
                transform: isHovered
                  ? `translateX(${-mousePosition.x * 0.03}px) translateY(${
                      mousePosition.y * 0.03
                    }px)`
                  : "none",
                transition: "transform 0.3s ease-out",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/40 to-transparent rounded-tr-full"
              style={{
                transform: isHovered
                  ? `translateX(${mousePosition.x * 0.03}px) translateY(${
                      -mousePosition.y * 0.03
                    }px)`
                  : "none",
                transition: "transform 0.3s ease-out",
              }}
            />
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
