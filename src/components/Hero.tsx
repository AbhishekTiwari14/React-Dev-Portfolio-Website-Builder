import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { BackgroundStars } from "./BackgroundStars"
import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Hero() {
  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
      <BackgroundStars />
      <div
        className="h-full w-full grid absolute"
        style={{
          background: `
          repeating-linear-gradient(
            45deg,
            #070707 0px,
            #070707 2px,
            transparent 2px,
            transparent 6px
          )
        `,
        }}
      >
        <div
          className="h-full w-full col-start-1 row-start-1"
          style={{
            background: `radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.6) 30%,
            rgba(255, 255, 255, 0) 60%
          )`,
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="h-screen w-full flex flex-col justify-center items-center"
        >
          <h1 className="text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-wide">
            LazyDev
          </h1>
          <p className="text-2xl text-slate-200 mb-4 tracking-tight">
            No Code Portfoilio Website Builder
          </p>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl text-center mx-2">
            Create stunning developer portfolios in minutes. Choose from our
            professionally designed templates and make them yours.
          </p>
          <div className="flex justify-center">
            <Link to={"/themes"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:cursor-pointer"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
