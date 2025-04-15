import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase, Code } from "lucide-react"
import { useSelector } from "react-redux"
import { getActiveColors } from "@/lib/themeConfig"

export default function ExperienceCard({
  fromYear,
  toYear,
  designation,
  company,
  workSummary,
  techStack,
  bp,
}: {
  fromYear?: string
  toYear?: string
  designation?: string
  company?: string
  workSummary?: string
  techStack?: string[]
  bp: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const isLargePanel = bp === "lg" || bp === "xl"
  const colors = useSelector(getActiveColors)
  return (
    <div className={`py-6 ${isLargePanel ? "w-3/4" : "w-full"}`}>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Clean border animation */}
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-500 border-2 ${
            isHovered ? "border-blue-500" : "border-transparent"
          }`}
          style={{
            clipPath: isHovered ? "inset(0 0 0 0)" : "inset(46% 46% 46% 46%)",
          }}
        ></div>

        <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden bg-gray-900 border-0 pt-0">
          <div className="relative overflow-hidden">
            {/* Accent line that animates on hover */}
            <div
              className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600 transition-transform duration-500 ${
                isHovered
                  ? "transform translate-x-0"
                  : "transform -translate-x-full"
              }`}
            ></div>

            <CardHeader className="py-12">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div
                    className={`bg-blue-50 dark:bg-blue-950 p-3 rounded-lg transition-all duration-300 ${
                      isHovered ? "bg-blue-100 dark:bg-blue-900" : ""
                    }`}
                  >
                    <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div>
                    <CardTitle className="text-gray-100 font-semibold text-lg">
                      {company ? company : "Klaviyo"}
                    </CardTitle>
                    <p className="text-blue-400 text-sm font-medium mt-1">
                      {designation ? designation : "Front End Engineer"}
                    </p>
                  </div>
                </div>

                {/* Clean date display */}
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {fromYear ? fromYear : "2024"}-{toYear ? toYear : "PRESENT"}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="relative">
                <p className="text-gray-300 text-sm leading-relaxed">
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

                {/* Subtle highlight line that appears on hover */}
                <div
                  className={`absolute -left-4 top-0 w-1 h-full bg-blue-200 dark:bg-blue-800 transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3 text-xs font-medium text-blue-500 dark:text-gray-400 uppercase tracking-wider">
                  <Code className="h-3.5 w-3.5" />
                  <span>Tech Stack</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {techStack ? (
                    techStack.map((tech, index) => (
                      <Badge
                        key={index}
                        className={`bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-300 ${
                          isHovered
                            ? "transform translate-y-0"
                            : "transform translate-y-0"
                        }`}
                        style={{
                          transitionDelay: isHovered
                            ? `${index * 50}ms`
                            : "0ms",
                        }}
                      >
                        {tech}
                      </Badge>
                    ))
                  ) : (
                    <>
                      <Badge
                        className={`bg-gray-800 hover:bg-gray-800 text-gray-100 transition-all duration-300 ${
                          isHovered
                            ? "transform translate-y-0"
                            : "transform translate-y-0"
                        }`}
                        style={{
                          transitionDelay: isHovered ? `50ms` : "0ms",
                        }}
                      >
                        Javascript
                      </Badge>
                      <Badge
                        className={`bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-300 ${
                          isHovered
                            ? "transform translate-y-0"
                            : "transform translate-y-0"
                        }`}
                        style={{
                          transitionDelay: isHovered ? `50ms` : "0ms",
                        }}
                      >
                        React
                      </Badge>
                      <Badge
                        className={`bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-300 ${
                          isHovered
                            ? "transform translate-y-0"
                            : "transform translate-y-0"
                        }`}
                        style={{
                          transitionDelay: isHovered ? `50ms` : "0ms",
                        }}
                      >
                        Typescript
                      </Badge>
                      <Badge
                        className={`bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-300 ${
                          isHovered
                            ? "transform translate-y-0"
                            : "transform translate-y-0"
                        }`}
                        style={{
                          transitionDelay: isHovered ? `50ms` : "0ms",
                        }}
                      >
                        Redux
                      </Badge>
                      <Badge
                        className={`bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-300 ${
                          isHovered
                            ? "transform translate-y-0"
                            : "transform translate-y-0"
                        }`}
                        style={{
                          transitionDelay: isHovered ? `50ms` : "0ms",
                        }}
                      >
                        Shadcn
                      </Badge>
                      <Badge
                        className={`bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-300 ${
                          isHovered
                            ? "transform translate-y-0"
                            : "transform translate-y-0"
                        }`}
                        style={{
                          transitionDelay: isHovered ? `50ms` : "0ms",
                        }}
                      >
                        Zod
                      </Badge>
                      <Badge
                        className={`bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-300 ${
                          isHovered
                            ? "transform translate-y-0"
                            : "transform translate-y-0"
                        }`}
                        style={{
                          transitionDelay: isHovered ? `50ms` : "0ms",
                        }}
                      >
                        Framer
                      </Badge>
                      <Badge
                        className={`bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-300 ${
                          isHovered
                            ? "transform translate-y-0"
                            : "transform translate-y-0"
                        }`}
                        style={{
                          transitionDelay: isHovered ? `50ms` : "0ms",
                        }}
                      >
                        SCSS
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}
