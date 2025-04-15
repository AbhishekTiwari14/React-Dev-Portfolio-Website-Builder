import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useSelector } from "react-redux"
import { getActiveColors } from "@/lib/themeConfig"

const NUM_LINES = 50

const BackgroundWithLines = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [lines, setLines] = useState<
    {
      id: number
      x: number
      y: number
      velocityX: number
      velocityY: number
      tilt: number
      bulbColor: string
    }[]
  >([])

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      const newLines = Array.from({ length: NUM_LINES }, (_, index) => {
        const speed = 10 + Math.random() * 20
        const direction = Math.random() * Math.PI * 2
        return {
          id: index,
          x: (Math.random() + 0.2) * (dimensions.width - 100),
          y: -Math.random() * dimensions.height * 2,
          velocityX: Math.cos(direction) * speed,
          velocityY: Math.sin(direction) * speed,
          tilt: 25,
          bulbColor: Math.random() > 0.5 ? "red" : "blue",
        }
      })
      setLines(newLines)
    }
  }, [dimensions])

  const colors = useSelector(getActiveColors)

  return (
    <div
      className="w-full h-screen overflow-hidden relative z-0"
      style={{
        background: `linear-gradient(to bottom, ${colors?.bg} 50%, ${colors?.bg2} 80%)`,
      }}
    >
      {lines.map((line) => (
        <MovingLine key={line.id} {...line} />
      ))}
    </div>
  )
}

const MovingLine = ({
  x,
  y,
  velocityX,
  velocityY,
  tilt,
  bulbColor,
}: {
  x: number
  y: number
  velocityX: number
  velocityY: number
  tilt: number
  bulbColor: string
}) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: [0, velocityX * 60],
      y: [0, velocityY * 60],
      transition: {
        duration: 60,
        ease: "linear",
        repeat: Infinity,
      },
    })
  }, [controls, velocityX, velocityY])

  return (
    <motion.div
      className="absolute text-gray-600 "
      style={{
        left: `${x}px`,
        top: `${y}px`,
        height: "200vh",
        width: "0.1px",
        transformOrigin: "top left",
      }}
      initial={{ x: 0, y: 0 }}
      animate={controls}
    >
      <div
        className="absolute h-full w-full"
        style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "top left" }}
      >
        {/* Line (always gray-400) */}
        <motion.div
          className="absolute bg-gray-400 opacity-20"
          style={{ width: "1px", height: "100%", left: "-2px" }}
        />

        {/* Glowing bulb (red or blue) */}
        <div
          className={`absolute rounded-full ${
            bulbColor === "red" ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{
            width: "3px",
            height: "3px",
            left: "-3px",
            top: "100%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </motion.div>
  )
}

export default BackgroundWithLines
