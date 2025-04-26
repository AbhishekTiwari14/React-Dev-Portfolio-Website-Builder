import { RootState } from "@/utils/store"
import { ThemeConfig } from "../types"

export const themes: ThemeConfig = {
  minimalist: {
    palettes: {
      p1: {
        bg: "bg-slate-950",
        navBg: "bg-slate-600",
        primary: "text-white",
        secondary: "text-gray-400",
        accent: "group-hover:bg-slate-200 group-focus-visible:bg-slate-200",
        cardHover: "hover:bg-gray-800",
        groupHover: "group-hover:text-teal-500",
        btn: "bg-teal-400/10 text-teal-300",
        bdr: "border-teal-400",
      },
      p2: {
        bg: "bg-gradient-to-r from-slate-900 to-black",
        primary: "text-white",
        secondary: "text-gray-400",
        accent:
          "group-hover:bg-slate-[#18e0c7] group-focus-visible:bg-slate-[#18e0c7]",
        navBg: "bg-[#243b4a]",
        cardHover: "hover:bg-gray-800",
        groupHover: "group-hover:text-amber-500",
        btn: "bg-amber-400/10 text-amber-300",
        imgHover:
          "border-slate-200/10 transition group-hover:border-slate-200/30",
      },
      p3: {
        bg: "bg-[#0A1E26]",
        navBg: "bg-slate-600",
        primary: "text-white",
        secondary: "text-gray-400",
        accent: "group-hover:bg-slate-200 group-focus-visible:bg-slate-200",
        cardHover: "hover:bg-gray-800",
        groupHover: "group-hover:text-cyan-500",
        btn: "bg-cyan-400/10 text-cyan-300",
        imgHover:
          "border-slate-200/10 transition group-hover:border-slate-200/30",
      },

      p4: {
        bg: "bg-[linear-gradient(135deg,_#fdfbfb,_#ebedee)]",
        navBg: "bg-gray-600",
        primary: "text-black",
        secondary: "text-gray-600",
        accent: "group-hover:bg-black group-focus-visible:bg-black",
        cardHover: "hover:bg-gray-200",
        groupHover: "group-hover:text-slate-800",
        btn: "bg-slate-800/10 text-slate-600",
        imgHover:
          "border-gray-200/10 transition group-hover:border-slate-200/30",
      },
      p5: {
        bg: "bg-gradient-to-bl from-blue-950 via-cyan-900 to-blue-900",
        navBg: "bg-blue-900/20 backdrop-blur-lg",
        primary: "text-blue-50",
        secondary: "text-blue-300",
        accent: "group-hover:bg-blue-800/30 group-focus-visible:bg-blue-800/30",
        cardHover: "hover:bg-blue-950/40",
        groupHover: "group-hover:text-cyan-400",
        btn: "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30",
        imgHover:
          "border-blue-400/10 transition group-hover:border-blue-400/30",
      },
    },
  },
  creative: {
    palettes: {
      p1: {
        bg: "#052631",
        bg2: "#020617",
        primary: "#009688",
        secondary: "#9C27B0",
        accent: "group-hover:bg-blue-800/30 group-focus-visible:bg-blue-800/30",
        cardHover: "hover:bg-blue-950/40",
        groupHover: "group-hover:text-cyan-400",
        btn: "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30",
        imgHover:
          "border-blue-400/10 transition group-hover:border-blue-400/30",
      },
      p2: {
        bg: "#064457",
        bg2: "#020617",
        primary: "#673AB7",
        secondary: "#E91E63",
        accent: "group-hover:bg-blue-800/30 group-focus-visible:bg-blue-800/30",
        cardHover: "hover:bg-blue-950/40",
        groupHover: "group-hover:text-cyan-400",
        btn: "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30",
        imgHover:
          "border-blue-400/10 transition group-hover:border-blue-400/30",
      },
      p3: {
        bg: "#1D2B53",
        bg2: "#020617",
        primary: "#673AB7",
        secondary: "#E91E63",
        accent: "group-hover:bg-blue-800/30 group-focus-visible:bg-blue-800/30",
        cardHover: "hover:bg-blue-950/40",
        groupHover: "group-hover:text-cyan-400",
        btn: "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30",
        imgHover:
          "border-blue-400/10 transition group-hover:border-blue-400/30",
      },
      p4: {
        bg: "#053126",
        bg2: "#020617",
        primary: "#673AB7",
        secondary: "#E91E63",
        accent: "group-hover:bg-blue-800/30 group-focus-visible:bg-blue-800/30",
        cardHover: "hover:bg-blue-950/40",
        groupHover: "group-hover:text-cyan-400",
        btn: "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30",
        imgHover:
          "border-blue-400/10 transition group-hover:border-blue-400/30",
      },
      p5: {
        bg: "#031820",
        bg2: "#020617",
        primary: "#673AB7",
        secondary: "#E91E63",
        accent: "group-hover:bg-blue-800/30 group-focus-visible:bg-blue-800/30",
        cardHover: "hover:bg-blue-950/40",
        groupHover: "group-hover:text-cyan-400",
        btn: "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30",
        imgHover:
          "border-blue-400/10 transition group-hover:border-blue-400/30",
      },
    },
  },
}

export const getActiveColors = (state: RootState) => {
  const { currentTheme, currentPalette } = state.theme
  return themes[currentTheme].palettes[currentPalette]
}
 