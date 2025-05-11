import { RootState } from "@/utils/store"
import { useDispatch, useSelector } from "react-redux"
import AboutData from "./AboutData"
import ExperienceData from "./ExperienceData"
import ProjectsData from "./ProjectsData"
import { UserIcon, MailIcon, Settings2Icon, FolderGit2 } from "lucide-react"
import { FormProgress } from "./FormProgress"
import SocialMediaLinks from "./SocialMediaLinks"
import GeneratePortfolio from "./GeneratePortfolio"
import { fillWithSampleData } from "@/utils/slices/userDataSlice"

export default function FormStep() {
  const currentStep = useSelector(
    (state: RootState) => state?.userData?.currentStep
  )

  const { user } = useSelector((state: RootState) => state.github)

  const dispatch = useDispatch()

  const steps = [
    {
      component: <AboutData name={user?.name} bio={user?.bio} />,
      icon: UserIcon,
      title: "Personal Information",
    },
    {
      component: (
        <SocialMediaLinks html_url={user?.html_url} email={user?.email} />
      ),
      icon: MailIcon,
      title: "Social Media Links",
    },
    { component: <ExperienceData />, icon: Settings2Icon, title: "Experience" },
    { component: <ProjectsData />, icon: FolderGit2, title: "Projects" },
    {
      component: <GeneratePortfolio />,
      icon: Settings2Icon,
      title: "Generate Portfolio Website",
    },
  ]

  const StepIcon = steps[currentStep].icon

  return (
    <div className="w-full h-full flex flex-col space-y-4 overflow-y-auto">
      <FormProgress />
      <div className="flex items-center space-x-3 px-4">
        <StepIcon className="w-6 h-6 text-primary" />
        <div className="flex justify-between w-full">
          <h2 className="text-xl font-bold text-primary">
            {steps[currentStep].title}
          </h2>
          {currentStep === 0 && (
            <button
              onClick={() => dispatch(fillWithSampleData())}
              className="group relative px-3 py-1.5 font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md shadow-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 overflow-hidden hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform group-hover:rotate-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Fill With Sample Data</span>
              <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
            </button>
          )}
        </div>
      </div>
      <div className="bg-card p-6 pb-9 rounded-lg shadow flex-1 overflow-y-auto">
        {steps[currentStep].component}
      </div>
    </div>
  )
}
