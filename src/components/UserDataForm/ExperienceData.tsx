import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import {
  updateUserData,
  nextStep,
  prevStep,
} from "@/utils/slices/userDataSlice"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RootState } from "@/utils/store"
import { Input } from "../ui/input"
import { Plus, Trash2 } from "lucide-react"
import React from "react"
import TiptapEditor from "./TiptapEditor"
import { ExperienceInfoData, experienceInfoSchema } from "@/types/userDataTypes"

export default function ExperienceData() {
  const dispatch = useDispatch()
  const userData = useSelector((state: RootState) => state.userData.data)
  const form = useForm<ExperienceInfoData>({
    resolver: zodResolver(experienceInfoSchema),
    defaultValues: {
      experiences: userData.experiences,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  })

  const updateField = (field: Partial<ExperienceInfoData>) => {
    dispatch(updateUserData(field))
  }

  const onSubmit = (data: ExperienceInfoData) => {
    dispatch(updateUserData(data))
    dispatch(nextStep())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            {index > 0 && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    remove(index)
                    updateField({
                      experiences: [
                        ...userData.experiences.slice(0, index),
                        ...userData.experiences.slice(index + 1),
                      ],
                    })
                  }}
                  className="text-blue-600 hover:text-blue-800 hover:cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="flex gap-12">
              <FormField
                control={form.control}
                name={`experiences.${index}.fromYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value ||
                          userData.experiences[index]?.fromYear ||
                          ""
                        }
                        onValueChange={(value) => {
                          field.onChange(value)
                          updateField({
                            experiences: [
                              ...userData.experiences.slice(0, index),
                              {
                                ...userData.experiences[index],
                                fromYear: value,
                              },
                              ...userData.experiences.slice(index + 1),
                            ],
                          })
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Start Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Array(25)
                              .fill(0)
                              .map((_, i) => (
                                <SelectItem key={i} value={`${2025 - i}`}>
                                  {2025 - i}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experiences.${index}.toYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value ||
                          userData.experiences[index]?.toYear ||
                          ""
                        }
                        onValueChange={(value) => {
                          field.onChange(value)
                          updateField({
                            experiences: [
                              ...userData.experiences.slice(0, index),
                              {
                                ...userData.experiences[index],
                                toYear: value,
                              },
                              ...userData.experiences.slice(index + 1),
                            ],
                          })
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select End Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="PRESENT"> PRESENT </SelectItem>
                            {Array(25)
                              .fill(0)
                              .map((_, i) => (
                                <SelectItem key={i} value={`${2025 - i}`}>
                                  {2025 - i}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`experiences.${index}.designation`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Senior Front End Engineer"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        updateField({
                          experiences: [
                            ...userData.experiences.slice(0, index),
                            {
                              ...userData.experiences[index],
                              designation: e.target.value,
                            },
                            ...userData.experiences.slice(index + 1),
                          ],
                        })
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experiences.${index}.company`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        updateField({
                          experiences: [
                            ...userData.experiences.slice(0, index),
                            {
                              ...userData.experiences[index],
                              company: e.target.value,
                            },
                            ...userData.experiences.slice(index + 1),
                          ],
                        })
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experiences.${index}.workSummary`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Summary</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      value={field.value}
                      placeholder="Write a professional summary about yourself in more than 100 words"
                      onChange={(newContent) => {
                        field.onChange(newContent)
                        updateField({
                          experiences: [
                            ...userData.experiences.slice(0, index),
                            {
                              ...userData.experiences[index],
                              workSummary: newContent,
                            },
                            ...userData.experiences.slice(index + 1),
                          ],
                        })
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 mx-2"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 mx-2"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 mx-2"></div>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
          </React.Fragment>
        ))}

        <div className="flex justify-center">
          {fields.length < 4 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  fromYear: "",
                  toYear: "",
                  designation: "",
                  company: "",
                  workSummary: "",
                })
              }
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Another Experience
            </Button>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Maximum of 4 experiences allowed
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-1/2"
            onClick={() => dispatch(prevStep())}
          >
            Previous
          </Button>
          <Button type="submit" className="w-1/2">
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}
