import { motion } from "motion/react"
import { useSelector } from "react-redux"
import { getActiveColors } from "@/lib/themeConfig"
import { RootState } from "@/utils/store"
import AboutSection from "./AboutSection"
import ExperienceCard from "./ExperienceCard"
import ProjectCard from "./ProjectCard"
import Footer from "./Footer"
import { lazy } from "react"
import { usePanelWidth } from "@/hooks/usePanelWidth"
import { IsObjectEmpty } from "@/lib/IsObjectEmpty"

const BackgroundWithLines = lazy(() => import("./BackgroundWithLines"))

export default function CreativeTheme() {
  const userData = useSelector((state: RootState) => state.userData.data)

  const colors = useSelector(getActiveColors)
  const { elementRef, currentBreakpoint } = usePanelWidth()

  // const isLargePanel = currentBreakpoint === "lg" || currentBreakpoint === "xl"

  return (
    <div
      className={`h-screen w-full relative bg-${colors.bg2}`}
      ref={elementRef}
    >
      <BackgroundWithLines />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full">
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, damping: 0.3 }}
          className="text-md sm:text-lg md:text-3xl lg:text-7xl xl:text-8xl font-bold text-center space md:tracking-wider text-white"
        >
          {userData.fullName ? userData.fullName : "ABHISHEK TIWARI"}
        </motion.h1>
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, damping: 0.3 }}
          className="text-xs sm:text-sm md:text-lg lg:text-xl font-semibold text-white text-center md:tracking-wide lg:tracking-widest mt-5"
        >
          FRONT-END DEVELOPER, UI-ENGINEER, & DESIGNER
        </motion.h3>
      </div>
      <AboutSection bp={currentBreakpoint} />

      <div
        className={`bg-slate-950 pt-20 ${
          currentBreakpoint === "sm"
            ? "px-4"
            : currentBreakpoint === "md"
            ? "px-16"
            : "px-24"
        }`}
      >
        <p className="text-slate-200 text-md sm:text-lg md:text-xl lg:text-3xl font-bold whitespace-nowrap pb-8">
          Experience
        </p>
        {userData?.experiences?.length > 1 ||
        !IsObjectEmpty(userData?.experiences[0]) ? (
          userData?.experiences?.map((experience, index) => (
            <ExperienceCard
              key={index}
              {...experience}
              bp={currentBreakpoint}
            />
          ))
        ) : (
          <>
            <ExperienceCard bp={currentBreakpoint} />
            <ExperienceCard bp={currentBreakpoint} />
            <ExperienceCard bp={currentBreakpoint} />
          </>
        )}
      </div>
      <div className="bg-slate-950 px-12 md:px-16 lg:px-24 py-20">
        <p className="text-slate-200 text-md sm:text-lg md:text-xl lg:text-3xl font-bold whitespace-nowrap pb-8">
          Projects
        </p>
        <div
          className={`grid gap-12 ${
            currentBreakpoint === "sm"
              ? "grid-cols-1"
              : currentBreakpoint === "md" || currentBreakpoint === "lg"
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
      <Footer />
    </div>
  )
}
