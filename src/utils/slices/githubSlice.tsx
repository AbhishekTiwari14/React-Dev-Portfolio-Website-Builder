import { GithubRepo, GithubState } from "@/types"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState: GithubState = {
  portfolioRepo: null,
  user: null,
  deployedUrl: null,
  repositories: [],
  selectedRepos: [],
  accessToken: null,
  loading: {
    user: false,
    repos: false,
    createRepo: false,
    updateFile: false,
    deployPages: false,
  },
  error: {
    user: null,
    repos: null,
    createRepo: null,
    updateFile: null,
    deployPages: null,
  },
}

export const fetchUserData = createAsyncThunk(
  "github/fetchUserData",
  async (token: string) => {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
    if (!response.ok) throw new Error("Failed to fetch user data")
    return response.json()
  }
)

export const fetchUserRepos = createAsyncThunk(
  "github/fetchUserRepos",
  async (token: string) => {
    const response = await fetch(
      "https://api.github.com/user/repos?sort=updated",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    )
    if (!response.ok) throw new Error("Failed to fetch repositories")
    return response.json()
  }
)

export const createRepoFromTemplate = createAsyncThunk(
  "github/createRepoFromTemplate",
  async (
    params: {
      templateOwner: string
      templateRepo: string
      repoName: string
      description: string
    },
    { getState }
  ) => {
    const { templateOwner, templateRepo, repoName, description } = params
    const state = getState() as RootState
    const token = state.github.accessToken

    if (!token) throw new Error("No access token available")

    const response = await fetch(
      `https://api.github.com/repos/${templateOwner}/${templateRepo}/generate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.baptiste-preview+json",
        },
        body: JSON.stringify({
          owner: state?.github?.user?.login,
          name: repoName,
          description: description,
          private: false,
        }),
      }
    )

    if (!response.ok)
      throw new Error("Failed to create repository from template")
    return response.json()
  }
)

export const updateRepoFile = createAsyncThunk(
  "github/updateRepoFile",
  async (
    params: {
      owner: string
      repo: string
      path: string
      content: string
      message: string
    },
    { getState }
  ) => {
    const { owner, repo, path, content, message } = params
    const state = getState() as RootState
    const token = state.github.accessToken

    if (!token) throw new Error("No access token available")

    let sha
    try {
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      )

      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json()
        sha = fileData.sha
      }
    } catch (error) {
      console.log(error)
    }

    // Now update or create file
    const encodedContent = btoa(
      new Uint8Array(new TextEncoder().encode(content)).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )

    interface UpdateBodyType {
      message: string
      content: string
      sha?: string // Make sha an optional property
    }

    const updateBody: UpdateBodyType = {
      message,
      content: encodedContent,
    }

    if (sha) updateBody.sha = sha

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify(updateBody),
      }
    )

    if (!response.ok) throw new Error("Failed to update file")
    return response.json()
  }
)

export const deployToGitHubPages = createAsyncThunk(
  "github/deployToGitHubPages",
  async (
    params: {
      repo: string
    },
    { getState }
  ) => {
    const { repo } = params
    const state = getState() as RootState
    const token = state.github.accessToken
    const username = state.github.user?.login

    if (!token) throw new Error("No access token available")
    if (!username) throw new Error("User data not available")

    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/pages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: {
              branch: "main",
              path: "/docs",
            },
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()

        if (error.message && error.message.includes("already enabled")) {
          console.log("GitHub Pages already enabled, continuing...")
        } else {
          throw new Error(
            `Failed to enable GitHub Pages: ${
              error.message || JSON.stringify(error)
            }`
          )
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("already enabled")) {
        console.log("GitHub Pages already enabled, continuing...")
      } else {
        throw error
      }
    }

    return {
      url: `https://${username}.github.io/${repo}/`,
      repoUrl: `https://github.com/${username}/${repo}`,
    }
  }
)

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    toggleSelectedRepo: (state, action) => {
      const repo = action.payload
      const index = state.selectedRepos.findIndex((r) => r.id === repo.id)
      if (index === -1) {
        state.selectedRepos.push(repo)
      } else {
        state.selectedRepos.splice(index, 1)
      }
    },
    clearGithubData: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading.user = true
        state.error.user = null
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading.user = false
        state.user = action.payload
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading.user = false
        state.error.user = action.error.message || "Failed to fetch user data"
      })
      .addCase(fetchUserRepos.pending, (state) => {
        state.loading.repos = true
        state.error.repos = null
      })
      .addCase(fetchUserRepos.fulfilled, (state, action) => {
        state.loading.repos = false
        state.repositories = action.payload.filter(
          (repo: GithubRepo) => !repo.fork
        )
      })
      .addCase(fetchUserRepos.rejected, (state, action) => {
        state.loading.repos = false
        state.error.repos =
          action.error.message || "Failed to fetch repositories"
      })
      .addCase(createRepoFromTemplate.pending, (state) => {
        state.loading.createRepo = true
        state.error.createRepo = null
      })
      .addCase(createRepoFromTemplate.fulfilled, (state, action) => {
        state.loading.createRepo = false
        state.repositories.unshift(action.payload)
      })
      .addCase(createRepoFromTemplate.rejected, (state) => {
        state.loading.createRepo = false
        state.error.createRepo =
          "Failed to create repository, this can be because repo with you name already exists on your github"
      })

      .addCase(updateRepoFile.pending, (state) => {
        state.loading.updateFile = true
        state.error.updateFile = null
      })
      .addCase(updateRepoFile.fulfilled, (state) => {
        state.loading.updateFile = false
        state.error.updateFile = null
      })
      .addCase(updateRepoFile.rejected, (state, action) => {
        state.loading.updateFile = false
        state.error.updateFile =
          action.error.message || "Failed to update repository data file"
      })
      .addCase(deployToGitHubPages.pending, (state) => {
        state.loading.deployPages = true
        state.error.deployPages = null
      })
      .addCase(deployToGitHubPages.fulfilled, (state, action) => {
        state.loading.deployPages = false
        state.deployedUrl = action.payload.url
      })
      .addCase(deployToGitHubPages.rejected, (state, action) => {
        state.loading.deployPages = false
        state.error.deployPages =
          action.error.message || "Failed to deploy to GitHub Pages"
      })
  },
})

export const { setAccessToken, toggleSelectedRepo, clearGithubData } =
  githubSlice.actions
export default githubSlice.reducer
