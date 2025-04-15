import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { updateUserData, nextStep } from "@/utils/slices/userDataSlice"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RootState } from "@/utils/store"
import TiptapEditor from "./TiptapEditor"
import { PersonalInfoData, personalInfoSchema } from "@/types/userDataTypes"

export default function AboutData() {
  const dispatch = useDispatch()
  const userData = useSelector((state: RootState) => state?.userData?.data)
  const { currentTheme } = useSelector((state: RootState) => state.theme)

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: userData.fullName,
      title: userData.title,
      description: userData.description,
      about: userData.about,
    },
  })

  // Simpler approach: dispatch partial updates directly
  const updateField = (field: Partial<PersonalInfoData>) => {
    dispatch(updateUserData(field))
  }

  const onSubmit = (data: PersonalInfoData) => {
    dispatch(updateUserData(data))
    dispatch(nextStep())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="ABHISHEK TIWARI"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    updateField({ fullName: e.target.value })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Front End Engineer"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    updateField({ title: e.target.value })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    currentTheme === "minimalist"
                      ? "I build accessible, pixel-perfect digital experiences for the web."
                      : "FRONT-END DEVELOPER, UI-ENGINEER, & DESIGNER"
                  }
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    updateField({ description: e.target.value })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <TiptapEditor
                  value={field.value}
                  placeholder="Write a professional summary about yourself in 100-120 words"
                  onChange={(newContent) => {
                    field.onChange(newContent)
                    updateField({ about: newContent })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  )
}
