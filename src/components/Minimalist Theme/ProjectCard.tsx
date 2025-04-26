import { getActiveColors } from "@/lib/themeConfig"
import { ExternalLink } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function ProjectCard({
  title,
  description,
  keyFeatures,
  technologies,
  demoLink,
  codeLink,
}: {
  title?: string
  description?: string
  keyFeatures?: string[]
  technologies?: string[]
  demoLink?: string
  codeLink?: string
}) {
  const colors = useSelector(getActiveColors)
  return (
    <div
      className={`bg-slate-900 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:translate-y-[-5px] border-t-4 ${colors.bdr} my-5`}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">
          {title ? title : "Movie Ticket Booking App"}
        </h3>

        {description ? (
          <div
            className="text-gray-50 mb-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className="text-gray-50 mb-4">
            A web app which handles movie ticket bookings, and has features such
            as handling concurrent bookings, and optimized with lazy loading and
            code splitting
          </p>
        )}

        <div className="text-slate-300 text-sm space-y-2 pt-2 py-6">
          <h3 className="font-medium text-cyan-300">Key Features:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {keyFeatures ? (
              keyFeatures.map((_, index) => (
                <li key={index}>{keyFeatures[index]}</li>
              ))
            ) : (
              <>
                <li>Real-time image generation with adjustable parameters</li>
                <li>3D visualization of the image generation process</li>
                <li>Save and share generated images</li>
              </>
            )}
          </ul>
        </div>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies ? (
              technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`flex items-center rounded-full ${colors?.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  {tech}
                </span>
              ))
            ) : (
              <>
                <button
                  className={`flex items-center rounded-full ${colors?.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  Javascript
                </button>
                <button
                  className={`flex items-center rounded-full ${colors?.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  React
                </button>
                <button
                  className={`flex items-center rounded-full ${colors?.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  Typescript
                </button>
                <button
                  className={`flex items-center rounded-full ${colors?.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  Framer
                </button>

                <button
                  className={`flex items-center rounded-full ${colors?.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  Shadcn
                </button>
                <button
                  className={`flex items-center rounded-full ${colors?.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  Typescript
                </button>
                <button
                  className={`flex items-center rounded-full ${colors?.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  Framer
                </button>

                <button
                  className={`flex items-center rounded-full ${colors?.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  Shadcn
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-6 mt-4 ml-2">
          <Link to={demoLink ? demoLink : "/"}>
            <ExternalLink className="text-teal-400 hover:text-teal-600" />
          </Link>
          <Link
            to={codeLink ? codeLink : "/"}
            className="text-teal-400 font-medium hover:text-teal-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
