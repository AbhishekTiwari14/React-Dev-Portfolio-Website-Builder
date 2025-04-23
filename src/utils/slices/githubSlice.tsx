import { GithubRepo, GithubState } from "@/types"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState: GithubState = {
  user: null,
  repositories: [],
  selectedRepos: [],
  accessToken: null,
  loading: {
    user: false,
    repos: false,
  },
  error: {
    user: null,
    repos: null,
  },
}

// Async thunks for API calls
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
      // User data fetching
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
      // Repositories fetching
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
  },
})

export const { setAccessToken, toggleSelectedRepo, clearGithubData } =
  githubSlice.actions
export default githubSlice.reducer
