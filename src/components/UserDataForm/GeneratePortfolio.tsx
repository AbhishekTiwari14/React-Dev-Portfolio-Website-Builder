import { useDispatch, useSelector } from "react-redux"
import { Button } from "../ui/button"
import { prevStep } from "@/utils/slices/userDataSlice"
import { AppDispatch, RootState } from "@/utils/store"
import { useState, useEffect } from "react"
import { CheckCircle, Clock, Loader, Loader2 } from "lucide-react"
import { createPortfolioWebsite } from "@/lib/portfolioCreator"

export default function GeneratePortfolio() {
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector((state: RootState) => state?.userData?.data)
  const { currentTheme, currentPalette } = useSelector(
    (state: RootState) => state.theme
  )
  // Get loading and error states from Redux
  const {
    loading: {
      createRepo: isCreatingRepo,
      updateFile: isUpdatingFile,
      deployPages: isDeploying,
    },
    error: {
      createRepo: createRepoError,
      updateFile: updateFileError,
      deployPages: deployError,
    },
    deployedUrl,
  } = useSelector((state: RootState) => state.github)

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    palette: currentPalette,
    fullName: userData.fullName,
    title: userData.title,
    description: userData.description,
    about: userData.about,
    Github: userData.Github,
    LinkedIn: userData.LinkedIn,
    Gmail: userData.Gmail,
    experiences: userData.experiences,
    projects: userData.projects,
  })

  // Determine active step based on the loading states
  const determineActiveStep = () => {
    if (isCreatingRepo) return 1
    if (isUpdatingFile) return 2
    if (isDeploying) return 3

    // If we have a deployed URL, all steps are complete
    if (deployedUrl) return 4

    // Default to 1 if no operation has started
    return isOpen ? 1 : 0
  }

  const [activeStep, setActiveStep] = useState(determineActiveStep())

  // Update active step based on Redux loading states
  useEffect(() => {
    setActiveStep(determineActiveStep())
  }, [isCreatingRepo, isUpdatingFile, isDeploying, deployedUrl])

  const steps = [
    {
      id: 1,
      initialTitle: "Creating Repo",
      initialDescription: "Setting up your repository",
      finalTitle: "Repo Created",
      finalDescription: "Repository has been set up",
      isLoading: isCreatingRepo,
      isCompleted:
        !isCreatingRepo &&
        (isUpdatingFile || isDeploying || deployedUrl || activeStep > 1),
      error: createRepoError,
    },
    {
      id: 2,
      initialTitle: "Injecting Your Data",
      initialDescription: "Adding your content and configurations",
      finalTitle: "Data Injected",
      finalDescription: "Website with your data made",
      isLoading: isUpdatingFile,
      isCompleted:
        !isUpdatingFile && (isDeploying || deployedUrl || activeStep > 2),
      error: updateFileError,
    },
    {
      id: 3,
      initialTitle: "Deploying Website",
      initialDescription: "Publishing your site to GitHub Pages",
      finalTitle: "Website Deployed",
      finalDescription: "Your site is live and ready to view",
      isLoading: isDeploying,
      isCompleted: !isDeploying && deployedUrl,
      error: deployError,
    },
  ]

  const handleSubmit = async () => {
    setLoading(true)
    setIsOpen(true)
    setError(null)

    try {
      const result = await createPortfolioWebsite(
        dispatch,
        "AbhishekTiwari14",
        `portfolio-${currentTheme}-theme`,
        formData
      )

      setResult(result)
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create portfolio"
      setError(errorMessage)
      console.log(err)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return isOpen ? (
    <div className="w-full p-6 flex justify-center items-center bg-gray-900 bg-opacity-25 overflow-y-hidden">
      <div className="px-6 py-5 bg-gray-50 lg:w-3/4 max-h-screen rounded-lg shadow-lg">
        {steps.map((step, index) => (
          <div key={step.id} className="flex relative">
            {index < steps.length - 1 && (
              <div className="absolute top-8 left-4 w-0.5 h-16 bg-gray-300">
                {step.isCompleted && (
                  <div className="w-0.5 h-full bg-blue-500"></div>
                )}
              </div>
            )}

            <div className="flex mb-8">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full">
                  {step.isCompleted ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : step.isLoading ? (
                    <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                  ) : (
                    <Clock className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <span
                  className={`font-medium ${
                    step.isLoading
                      ? "text-blue-600"
                      : step.isCompleted
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.isCompleted ? step.finalTitle : step.initialTitle}
                </span>
                <span className="text-sm text-gray-500">
                  {step.isCompleted
                    ? step.finalDescription
                    : step.initialDescription}
                </span>
                {step.error && (
                  <span className="text-sm text-red-500 mt-1">
                    {step.error}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <a
            href={deployedUrl ? deployedUrl : "/"}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 text-white  rounded  transition-colors ${
              deployedUrl ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
            } `}
          >
            <button
              disabled={!deployedUrl}
              className={`font-semibold ${
                !deployedUrl ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Visit Your Portfolio Website
            </button>
          </a>
          {deployedUrl && (
            <p className="pt-3 text-sm italic text-blue-700">
              Note: It may take a few minutes before this link goes live
            </p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p className="p-8 text-xl font-bold">
        Hurray! Your portfolio website is ready, now you can deploy your
        portfolio website directly on vercel
      </p>
      <div className="flex gap-4">
        <Button className="w-1/2" onClick={() => handleSubmit()}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Building Your App...</span>
            </>
          ) : (
            <span>Deploy My Portfolio Website</span>
          )}
        </Button>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-1/2 mt-4"
        onClick={() => dispatch(prevStep())}
      >
        Previous
      </Button>
      {error && (
        <div className="mt-4 p-4 text-lg bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}
    </div>
  )
}
