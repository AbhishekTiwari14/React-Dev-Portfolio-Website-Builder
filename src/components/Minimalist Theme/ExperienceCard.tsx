import { getActiveColors } from "@/lib/themeConfig"
import { useSelector } from "react-redux"

export default function ExperienceCard({
  fromYear,
  toYear,
  designation,
  company,
  workSummary,
  bp,
}: {
  fromYear?: string
  toYear?: string
  designation?: string
  company?: string
  workSummary?: string
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
          className={`font-semibold text-md ${colors.primary} ${colors.groupHover}`}
        >
          {designation
            ? designation
            : "Senior Frontend Engineer, Accessibility"}{" "}
          · {company ? company : "Klaviyo"}
        </p>
        <p
          className={`${colors.secondary} group-hover:${colors.primary} text-sm`}
        >
          {workSummary ? (
            <div
              // className={`${colors.secondary} ${
              //   isLargePanel ? "text-xl font-medium" : ""
              // }`}
              dangerouslySetInnerHTML={{ __html: workSummary }}
            />
          ) : (
            `Build and maintain critical components used to construct Klaviyo’s
          frontend, across the whole product. Work closely with cross-functional
          teams, including developers, designers, and product managers, to
          implement and advocate for best practices in web accessibility.`
          )}
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
          >
            Javascript
          </button>
          <button
            className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
          >
            React
          </button>
          <button
            className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
          >
            Typescript
          </button>
          <button
            className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
          >
            Framer
          </button>

          <button
            className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
          >
            Shadcn
          </button>
          <button
            className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
          >
            Typescript
          </button>
          <button
            className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
          >
            Framer
          </button>

          <button
            className={`flex items-center rounded-full ${colors.btn} px-3 py-1 text-xs font-medium leading-5`}
          >
            Shadcn
          </button>
        </div>
      </div>
    </div>
  )
}
