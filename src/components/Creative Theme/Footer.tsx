import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"

export default function Footer() {
  const [animatingIcons, setAnimatingIcons] = useState([false, false, false])

  const iconToIndex = (icon: string) => {
    if (icon === "linkedin") return 1
    else if (icon === "gmail") return 2
    else return 0
  }

  const startAnimation = (icon: string) => {
    const index = iconToIndex(icon)
    if (!animatingIcons[index]) {
      const newAnimatingIcons = [...animatingIcons]
      newAnimatingIcons[index] = true
      setAnimatingIcons(newAnimatingIcons)
    }
  }

  const finishAnimation = (icon: string) => {
    const index = iconToIndex(icon)
    const newAnimatingIcons = [...animatingIcons]
    newAnimatingIcons[index] = false
    setAnimatingIcons(newAnimatingIcons)
  }

  return (
    <>
      <footer className="py-12 flex justify-center items-center bg-slate-950 gap-20">
        <Link
          to="/github.com"
          className="text-white p-4 bg-gray-800 hover:bg-blue-600 overflow-hidden"
          onMouseEnter={() => startAnimation("github")}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
            animate={
              animatingIcons[0]
                ? {
                    y: [0, 60, -60, 0],
                    transition: {
                      times: [0, 0.3, 0.31, 0.8],
                      duration: 0.8,
                      ease: "easeInOut",
                    },
                  }
                : {}
            }
            onAnimationComplete={() => finishAnimation("github")}
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </motion.svg>
        </Link>
        <Link
          to="/"
          className="text-white p-4 bg-gray-800 hover:bg-blue-600 overflow-hidden"
          onMouseEnter={() => startAnimation("linkedin")}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
            animate={
              animatingIcons[1]
                ? {
                    y: [0, 60, -60, 0],
                    transition: {
                      times: [0, 0.3, 0.31, 0.8],
                      duration: 0.8,
                      ease: "easeInOut",
                    },
                  }
                : {}
            }
            onAnimationComplete={() => finishAnimation("linkedin")}
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </motion.svg>
        </Link>
        <Link
          to="/"
          className="text-white p-4 bg-gray-800 hover:bg-blue-600 overflow-hidden"
          onMouseEnter={() => startAnimation("gmail")}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-6 w-6"
            animate={
              animatingIcons[2]
                ? {
                    y: [0, 60, -60, 0],
                    transition: {
                      times: [0, 0.3, 0.31, 0.8],
                      duration: 0.8,
                      ease: "easeInOut",
                    },
                  }
                : {}
            }
            onAnimationComplete={() => finishAnimation("gmail")}
          >
            <path
              fill="#4caf50"
              d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
            ></path>
            <path
              fill="#1e88e5"
              d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
            ></path>
            <polygon
              fill="#e53935"
              points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
            ></polygon>
            <path
              fill="#c62828"
              d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
            ></path>
            <path
              fill="#fbc02d"
              d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
            ></path>
          </motion.svg>
        </Link>
      </footer>
    </>
  )
}
