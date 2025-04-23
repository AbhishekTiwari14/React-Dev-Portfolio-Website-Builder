type ThemePalette = {
  bg: string
  primary: string
  secondary: string
  accent: string
  [key: string]: string 
}

type ThemeConfig = {
  [themeName: string]: {
    palettes: {
      [paletteName: string]: ThemePalette
    }
  }
}

export type GithubRepo = {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  fork: boolean
}

export type GithubState = {
  user: {
    login: string
    avatar_url: string
    name: string
    bio: string
  } | null
  repositories: GithubRepo[]
  selectedRepos: GithubRepo[]
  accessToken: string | null
  loading: {
    user: boolean
    repos: boolean
  }
  error: {
    user: string | null
    repos: string | null
  }
}
