import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, X } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useMemo, useState } from "react"
import { technologiesList } from "@/types/userDataTypes"
import { useDispatch, useSelector } from "react-redux"
import { updateUserData } from "@/utils/slices/userDataSlice"
import { RootState } from "@/utils/store"

export default function ProjectTechnologies({ index }: { index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  const userData = useSelector((state: RootState) => state.userData.data)

  const technologies = useMemo(() => technologiesList, [])

  const dispatch = useDispatch()

  // Find the label for a given value
  const getLabelForValue = (value: string) => {
    const tech = technologies.find((tech) => tech.value === value)
    return tech ? tech.label : value
  }

  // Toggle selection of a technology
  const addValue = (value: string) => {
    dispatch(
      updateUserData({
        projects: [
          ...userData.projects.slice(0, index),
          {
            ...userData.projects[index],
            technologies: [...userData.projects[index].technologies, value],
          },
          ...userData.projects.slice(index + 1),
        ],
      })
    )
  }
  // Remove a technology from selection
  const removeValue = (value: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevent triggering the Popover
    const currentProjectTechs = userData.projects[index].technologies
    const newTechs = currentProjectTechs.filter((v) => v !== value)
    dispatch(
      updateUserData({
        projects: [
          ...userData.projects.slice(0, index),
          {
            ...userData.projects[index],
            technologies: newTechs,
          },
          ...userData.projects.slice(index + 1),
        ],
      })
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="justify-between w-full h-auto"
          >
            <div className="flex flex-wrap gap-1 items-center">
              {userData?.projects[index]?.technologies.length > 0 ? (
                userData?.projects[index]?.technologies.map((value) => (
                  <div
                    key={value}
                    className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm p-2"
                  >
                    {getLabelForValue(value)}
                    <button
                      type="button"
                      className="ml-1 cursor-pointer focus:outline-none"
                      onClick={(e) => removeValue(value, e)}
                      aria-label={`Remove ${getLabelForValue(value)}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))
              ) : (
                <span>Select skills</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Search skills..." />
            <CommandList>
              <CommandEmpty>No skill found.</CommandEmpty>
              {technologies.map((tech) => {
                const isSelected = userData.projects[
                  index
                ].technologies?.includes(tech.value)
                return (
                  <CommandItem
                    key={tech.value}
                    onSelect={() => addValue(tech.value)}
                    disabled={isSelected}
                    className={`${
                      isSelected
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-70"
                        : "cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{tech.label}</span>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
