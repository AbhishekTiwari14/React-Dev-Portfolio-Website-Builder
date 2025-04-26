import { getActiveColors } from "@/lib/themeConfig"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"

export default function ExperienceCard({
  fromYear,
  toYear,
  designation,
  company,
  workSummary,
  technologies,
  bp,
}: {
  fromYear?: string
  toYear?: string
  designation?: string
  company?: string
  workSummary?: string
  technologies?: string[]
  bp?: string
}) {
  const colors = useSelector(getActiveColors)
  return (
    <div
      className={`flex flex-col lg:flex-row lg:gap-8 lg:p-4 ${colors.cardHover} hover:shadow-md hover:cursor-pointer group rounded-md justify-start`}
    >
      <p className={`${colors.secondary} text-sm font-light whitespace-nowrap`}>
        {fromYear ? fromYear : "2024"}-{toYear ? toYear : "PRESENT"}
      </p>
      <div className="flex flex-col justify-between gap-4">
        <p
          className={`font-semibold text-md ${colors.primary} ${
            colors.groupHover
          } ${bp === "lg" ? "text-lg" : ""}`}
        >
          {designation
            ? designation
            : "Senior Frontend Engineer, Accessibility"}{" "}
          · {company ? company : "Klaviyo"}
        </p>

        {workSummary ? (
          <div
            className={`${colors.secondary} group-hover:${colors.primary}`}
            dangerouslySetInnerHTML={{ __html: workSummary }}
          />
        ) : (
          <p className={`${colors.secondary} group-hover:${colors.primary}`}>
            Built and maintained critical components used to construct Google's
            frontend, across the whole product. Worked closely with
            cross-functional teams, including developers, designers, and product
            managers, to implement and advocate for best practices in web
            accessibility.
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {technologies && technologies.length >= 1
            ? technologies.map((tech, index) => (
                <button
                  key={index}
                  className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  {tech}
                </button>
              ))
            : [
                "Javascript",
                "Typescript",
                "Redux",
                "Tailwind",
                "SCSS",
                "ShadCN",
                "Zod",
                "Framer",
              ].map((value, index) => (
                <Badge
                  key={index}
                  className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
                >
                  {value}
                </Badge>
              ))}
        </div>
      </div>
    </div>
  )
}
