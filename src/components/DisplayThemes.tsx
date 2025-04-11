import { useDispatch, useSelector } from "react-redux"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { setPalette, setTheme } from "@/utils/slices/themeSlice"
import { RootState } from "@/utils/store"
import PalettePicker from "./PalettePicker"
import { themes } from "@/lib/themeConfig"
import { Link } from "react-router-dom"
import Minimalist_Theme from "./Minimalist Theme/MinimalistTheme"
import { ChevronRight } from "lucide-react"

export default function DisplayThemes() {
  const dispatch = useDispatch()
  const { currentTheme, currentPalette } = useSelector(
    (state: RootState) => state.theme
  )

  const palettes = themes[currentTheme].palettes

  const handleThemeChange = (value: string) => {
    dispatch(setTheme(value))
  }

  const handlePaletteChange = (value: string) => {
    dispatch(setPalette(value))
  }
  return (
    <>
      <div className="z-40 px-4 py-3 flex justify-center gap-12 relative">
        <div>
          <label className="block mb-2 text-sm font-medium">Theme</label>
          <Select value={currentTheme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-[180px] hover:cursor-pointer">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="minimalist" className="hover:bg-gray-100 mx-0">
                Minimalist
              </SelectItem>
              <SelectItem value="creative" className="hover:bg-gray-100 mx-0">
                Creative
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Palette</label>
          <Select value={currentPalette} onValueChange={handlePaletteChange}>
            <SelectTrigger className="w-full hover:cursor-pointer">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                {Object.keys(palettes).map((p) => (
                  <SelectItem
                    key={p}
                    value={p}
                    className="flex items-center gap-2 hover:bg-gray-100 mx-0"
                  >
                    <PalettePicker
                      currentPalette={p}
                      currentTheme={currentTheme}
                    />
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Link to="/pane" className="flex justify-end">
          <button className="flex justify-around self-end bg-black hover:bg-blue-700 shadom-md hover:cursor-pointer text-white font-semibold px-3 py-1.5 rounded-lg">
            Proceed <ChevronRight />
          </button>
        </Link>
      </div>
      {/* {currentTheme === "creative" && <Creative_Theme />} */}
      {currentTheme === "minimalist" && <Minimalist_Theme />}
    </>
  )
}
