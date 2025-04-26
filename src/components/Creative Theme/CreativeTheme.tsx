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

  return (
    <div
      className={`h-screen w-full relative bg-${colors.bg2}`}
      ref={elementRef}
    >
      <BackgroundWithLines />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full px-2">
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, damping: 0.3 }}
          className={`font-bold text-center space md:tracking-wider text-white ${
            currentBreakpoint === "sm"
              ? "text-3xl"
              : currentBreakpoint === "md"
              ? "text-5xl"
              : currentBreakpoint === "lg"
              ? "text-7xl"
              : "text-8xl"
          }`}
        >
          {userData.fullName ? userData.fullName : "ABHISHEK TIWARI"}
        </motion.h1>
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, damping: 0.3 }}
          className={`font-semibold text-white text-center mt-3 ${
            currentBreakpoint === "sm"
              ? "text-md"
              : currentBreakpoint === "md"
              ? "text-lg tracking-wide"
              : currentBreakpoint === "lg"
              ? "text-2xl tracking-wider"
              : "text-4xl tracking-widest"
          }`}
        >
          {userData.description
            ? userData.description
            : "FRONT-END DEVELOPER, UI-ENGINEER, & DESIGNER"}
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
            currentBreakpoint === "sm" || currentBreakpoint === "md"
              ? "grid-cols-1"
              : currentBreakpoint === "lg"
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {userData?.projects?.length > 1 ||
          !IsObjectEmpty(userData?.projects[0]) ? (
            userData?.projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))
          ) : (
            <>
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
            </>
          )}
        </div>
      </div>
      <Footer
        LinkedIn={userData.LinkedIn}
        Github={userData.Github}
        Gmail={userData.Gmail}
      />
    </div>
  )
}
