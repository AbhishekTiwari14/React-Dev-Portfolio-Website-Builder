import { themes } from "@/lib/themeConfig"

export default function PalettePicker({
  currentPalette,
  currentTheme,
}: {
  currentPalette: string
  currentTheme: string
}) {
  const colors = themes[currentTheme].palettes[currentPalette]

  return (
    <div className="w-[140px] h-full flex items-center justify-center">
      <div className="w-full h-6 rounded-md border border-gray-300 flex overflow-hidden">
        {colors.bg2 ? (
          <>
            <div
              className="w-full h-full"
              style={{ background: `${colors.bg}` }}
            ></div>
            <div
              className="w-full h-full"
              style={{ background: `${colors.bg2}` }}
            ></div>
          </>
        ) : (
          <div className={`w-full h-full ${colors.bg}`}></div>
        )}
        <div className={`w-full h-full ${colors.btn}`}></div>
        {currentTheme === "minimalist" && (
          <div className={`w-full h-full ${colors.navBg}`}></div>
        )}
      </div>
    </div>
  )
}
