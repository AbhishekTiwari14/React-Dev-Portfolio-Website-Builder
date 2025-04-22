import { motion } from "motion/react"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
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
          <Link to="/">
            <img src="/Logo.png" alt="logo" className="w-40 md:w-60 lg:w-80" />
          </Link>
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
                Get Started
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
