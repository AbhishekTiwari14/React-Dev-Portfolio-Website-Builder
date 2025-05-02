import { AppDispatch } from "@/utils/store"
import {
  createRepoFromTemplate,
  deployToGitHubPages,
  updateRepoFile,
} from "@/utils/slices/githubSlice"

type Experience = {
  fromYear: string
  toYear: string
  designation: string
  company: string
  workSummary: string
  technologies: string[]
}

type Project = {
  title: string
  description: string
  keyFeatures: string[]
  codeLink: string
  demoLink: string
  technologies: string[]
}

type UserData = {
  palette: string
  fullName: string
  title: string
  description: string
  about: string
  Github: string
  LinkedIn: string
  Gmail: string
  experiences: Experience[]
  projects: Project[]
}

export async function createPortfolioWebsite(
  dispatch: AppDispatch,
  templateOwner: string,
  templateRepo: string,
  userData: UserData
) {
  try {
    const repoName = `${userData.fullName
      .toLowerCase()
      .replace(/\s/g, "-")}-portfolio`

    const repoResult = await dispatch(
      createRepoFromTemplate({
        templateOwner,
        templateRepo,
        repoName,
        description: `${userData.fullName}'s Portfolio Website`,
      })
    ).unwrap()

    console.log("Repository created, waiting before updating file...")
    await new Promise((resolve) => setTimeout(resolve, 3000)) // Wait 3 seconds
    console.log("Now updating file...")
    const userDataJson = JSON.stringify(userData, null, 2)
    await dispatch(
      updateRepoFile({
        owner: repoResult.owner.login,
        repo: repoName,
        path: "docs/data.json",
        content: userDataJson,
        message: "Update portfolio data with personal information",
      })
    ).unwrap()

    console.log("data file updated")

    await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds

    const deployResponse = await dispatch(
      deployToGitHubPages({
        repo: repoName,
      })
    ).unwrap()

    return {
      repoUrl: `https://github.com/${repoResult.owner.login}/${repoName}`,
      deployUrl: `https://${repoResult.owner.login}.github.io/${repoName}`,
      deployResponse,
    }
  } catch (error) {
    console.error("Failed to create portfolio website:", error)
    throw error
  }
}
