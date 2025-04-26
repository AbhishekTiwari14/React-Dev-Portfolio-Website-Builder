import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { getActiveColors } from "@/lib/themeConfig"
import { RootState } from "@/utils/store"
import { usePanelWidth } from "@/hooks/usePanelWidth"
import ExperienceCard from "./ExperienceCard"
import ProjectCard from "./ProjectCard"
import { IsObjectEmpty } from "@/lib/IsObjectEmpty"

export default function MinimalistTheme() {
  const colors = useSelector(getActiveColors)
  const userData = useSelector((state: RootState) => state?.userData?.data)
  const { elementRef, currentBreakpoint } = usePanelWidth()

  const isLargePanel = currentBreakpoint === "lg" || currentBreakpoint === "xl"

  return (
    <div
      ref={elementRef}
      className={`min-h-screen w-full flex flex-col px-8 ${
        isLargePanel ? "grid grid-cols-2" : ""
      } ${colors.bg}`}
    >
      <div
        className={`flex flex-col ${colors.primary} py-16 ${
          isLargePanel
            ? "sticky top-0 justify-between h-screen max-w-3/5 p-2"
            : ""
        }`}
      >
        <div className="flex flex-col gap-2">
          <p className="font-bold text-4xl">
            {userData.fullName ? userData.fullName : "ABHISHEK TIWARI"}
          </p>
          <p className="font-semibold text-xl">
            {userData.title ? userData.title : "Front End Engineer"}
          </p>
          <p className={`font-medium text-md py-2  ${colors.secondary}`}>
            {userData.description
              ? userData.description
              : "I build accessible, pixel-perfect digital experiences for the web."}
          </p>
        </div>
        <div className={`${isLargePanel ? "flex" : "hidden"} flex-col gap-3`}>
          <a
            className="flex gap-1 items-center hover:cursor-pointer group active"
            href="#about"
          >
            <span
              className={`nav-indicator mr-4 h-px w-8 ${colors.navBg} transition-all group-hover:w-16 ${colors.accent} group-focus-visible:w-16 motion-reduce:transition-none active:text-white`}
            ></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest ${colors.secondary} ${colors.accent} active:text-white">
              ABOUT
            </span>
          </a>

          <a
            className="flex gap-1 items-center hover:cursor-pointer group active"
            href="#experience"
          >
            <span
              className={`nav-indicator mr-4 h-px w-8 ${colors.navBg} transition-all group-hover:w-16 ${colors.accent} group-focus-visible:w-16 motion-reduce:transition-none active:text-white`}
            ></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest ${colors.secondary} ${colors.accent} active:text-white">
              EXPERIENCE
            </span>
          </a>
          <a
            className="flex gap-1 items-center hover:cursor-pointer group active:text-white"
            href="#projects"
          >
            <span
              className={`nav-indicator mr-4 h-px w-8 ${colors.navBg} transition-all group-hover:w-16 ${colors.accent} group-focus-visible:w-16 motion-reduce:transition-none active:text-white`}
            ></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest ${colors.secondary} ${colors.accent} active:text-white">
              PROJECTS
            </span>
          </a>
        </div>
        <div className="flex gap-6 items-center pt-2 pb-4">
          <Link to={userData.Github ? userData.Github : "/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </Link>
          <Link to={userData.Github ? userData.Github : "/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </Link>
          <a href={`mailto:${userData.Gmail}`} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-6 w-6"
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
            </svg>
          </a>
        </div>
      </div>
      <div
        className={`flex flex-col gap-6 text-white ${
          isLargePanel ? "py-16" : ""
        }`}
        id="about"
      >
        <div
          className={`text-gray-400 block ${isLargePanel ? "h-screen" : ""}`}
        >
          <p
            className={`${
              !isLargePanel ? "block" : "hidden"
            } mb-6 font-semibold text-md text-white`}
          >
            ABOUT
          </p>

          {userData.about ? (
            <div
              className={`${colors.secondary} ${
                isLargePanel ? "text-xl font-medium" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: userData.about }}
            />
          ) : (
            <p
              className={`text-lg ${colors.secondary} ${
                isLargePanel
                  ? "font-medium leading-8 tracking-wider"
                  : "leading-7"
              }`}
            >
              I'm a developer who creates accessible, pixel-perfect user
              interfaces combining thoughtful design with solid engineering. My
              passion lies where design meets development—building experiences
              that are visually appealing while optimized for performance and
              usability. I'm dedicated to crafting interfaces that not only look
              great but function flawlessly, bridging the gap between aesthetics
              and technical excellence while prioritizing accessibility
              throughout the development process.
              <br />
              <br />
              Currently serving as a Senior Front-End Engineer at Klaviyo with a
              focus on accessibility, I help develop and maintain UI components
              powering the platform's frontend. My work ensures our product
              adheres to web accessibility standards and best practices,
              creating an inclusive experience for all users.
            </p>
          )}
        </div>
        <div
          className={`flex flex-col gap-8 group/link ${
            !isLargePanel ? "pt-16" : ""
          }`}
          id="experience"
        >
          <p
            className={`${
              !isLargePanel ? "block" : "hidden"
            } mb-4 font-semibold text-md text-white`}
          >
            EXPERIENCE
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
        <div className="flex flex-col gap-8 my-20" id="projects">
          <p
            className={`${
              !isLargePanel ? "block" : "hidden"
            } mb-4 font-semibold text-md text-white`}
          >
            PROJECTS
          </p>
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
    </div>
  )
}
