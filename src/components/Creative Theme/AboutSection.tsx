import { motion, useAnimation } from "framer-motion"
import { lazy, Suspense, useEffect, useRef } from "react"
import { BackgroundStars } from "../BackgroundStars"
import { RootState } from "@/utils/store"
import { useSelector } from "react-redux"
// import { getActiveColors } from "@/lib/themeConfig"

const InteractiveGlobe = lazy(() => import("./InteractiveGlobe"))

export default function AboutSection({ bp }: { bp: string }) {
  const isLargePanel = bp === "lg" || bp === "xl" || bp === "2xl"
  const controls = useAnimation()
  const sectionRef = useRef(null)

  const userData = useSelector((state: RootState) => state.userData.data)

  const lineVariants = {
    hidden: { scaleX: 0 },
    animate: {
      scaleX: [0, 1, 0],
      transition: {
        duration: 2, // Total duration for all steps
        times: [0, 0.5, 1], // Evenly distribute the timing for each step
        ease: "easeInOut",
      },
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("animate")
          } else {
            controls.start("hidden")
          }
        })
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls])

  return (
    <div
      ref={sectionRef}
      className={`bg-[#020b18] min-h-fit w-full pt-12 relative overflow-hidden pb-8 ${
        bp === "sm" ? "px-6" : bp === "md" ? "px-12" : "px-24"
      }`}
    >
      <BackgroundStars />

      <div className="lg:relative z-10">
        <div
          className={`w-full lg:w-1/2 flex items-center gap-4 mt-4 ${
            bp === "sm" ? "pb-3" : bp === "md" ? "pb-5" : "pb-6"
          }`}
        >
          <p className="text-slate-200 text-md sm:text-lg md:text-xl lg:text-3xl font-bold whitespace-nowrap">
            About Me
          </p>
          <motion.span
            className="self-center h-px flex-grow bg-white origin-left"
            variants={lineVariants}
            initial="hidden"
            animate={controls}
          />
        </div>
        {isLargePanel ? (
          <div className="grid grid-cols-2 gap-6 place-items-center">
            {userData.about ? (
              <div
                className="text-white font-semibold"
                dangerouslySetInnerHTML={{ __html: userData.about }}
              />
            ) : (
              <p className="text-white font-semibold text-lg lg:tracking-wider">
                I'm a developer who creates accessible, pixel-perfect user
                interfaces combining thoughtful design with solid engineering.
                My passion lies where design meets development—building
                experiences that are visually appealing while optimized for
                performance and usability. I'm dedicated to crafting interfaces
                that not only look great but function flawlessly, bridging the
                gap between aesthetics and technical excellence while
                prioritizing accessibility throughout the development process.
                <br />
                <br />
                Currently serving as a Senior Front-End Engineer at Klaviyo with
                a focus on accessibility, I help develop and maintain UI
                components powering the platform's frontend. My work ensures our
                product adheres to web accessibility standards and best
                practices, creating an inclusive experience for all users.
              </p>
            )}
            <div className="h-full w-full mt-8 lg:mt-0">
              <Suspense
                fallback={
                  <img
                    src="/globe.PNG"
                    alt="globe"
                    className="w-[500px] ml-16 mb-8"
                  />
                }
              >
                <InteractiveGlobe />
              </Suspense>
            </div>
          </div>
        ) : (
          <div className="block p-1 overflow-none">
            {userData.about ? (
              <div
                className="text-white font-semibold tracking-wider"
                dangerouslySetInnerHTML={{ __html: userData.about }}
              />
            ) : (
              <p className="text-white font-semibold text-md tracking-wider h-full w-full">
                I'm a developer who creates accessible, pixel-perfect user
                interfaces combining thoughtful design with solid engineering.
                My passion lies where design meets development—building
                experiences that are visually appealing while optimized for
                performance and usability. I'm dedicated to crafting interfaces
                that not only look great but function flawlessly, bridging the
                gap between aesthetics and technical excellence while
                prioritizing accessibility throughout the development process.
                <br />
                <br />
                Currently serving as a Senior Front-End Engineer at Klaviyo with
                a focus on accessibility, I help develop and maintain UI
                components powering the platform's frontend. My work ensures our
                product adheres to web accessibility standards and best
                practices, creating an inclusive experience for all users.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
