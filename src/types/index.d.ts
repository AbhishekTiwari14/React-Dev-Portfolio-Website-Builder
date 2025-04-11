type ThemePalette = {
  bg: string
  primary: string
  secondary: string
  accent: string
  [key: string]: string // For other possible color properties
}

type ThemeConfig = {
  [themeName: string]: {
    palettes: {
      [paletteName: string]: ThemePalette
    }
  }
}
