import { RootState } from "@/utils/store"
import { useSelector } from "react-redux"
import AboutData from "./AboutData"
import ExperienceData from "./ExperienceData"
import ProjectsData from "./ProjectsData"
import { UserIcon, MailIcon, Settings2Icon, FolderGit2 } from "lucide-react"
import { FormProgress } from "./FormProgress"
import SocialMediaLinks from "./SocialMediaLinks"
import GeneratePortfolio from "./GeneratePortfolio"

export default function FormStep() {
  const currentStep = useSelector(
    (state: RootState) => state?.userData?.currentStep
  )

  const steps = [
    { component: <AboutData />, icon: UserIcon, title: "Personal Information" },
    {
      component: <SocialMediaLinks />,
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
        <h2 className="text-xl font-bold text-primary">
          {steps[currentStep].title}
        </h2>
      </div>
      <div className="bg-card p-6 pb-9 rounded-lg shadow flex-1 overflow-y-auto">
        {steps[currentStep].component}
      </div>
    </div>
  )
}
