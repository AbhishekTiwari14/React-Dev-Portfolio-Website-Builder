import { useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import {
  socialMediaLinksData,
  socialMediaLinksSchema,
} from "@/types/userDataTypes"
import { RootState } from "@/utils/store"

export default function SocialMediaLinks() {
  const dispatch = useDispatch()
  const userData = useSelector((state: RootState) => state.userData.data)

  const form = useForm<socialMediaLinksData>({
    resolver: zodResolver(socialMediaLinksSchema),
    defaultValues: {
      Github: userData?.Github || "",
      LinkedIn: userData?.LinkedIn || "",
      Gmail: userData?.Gmail || "",
    },
  })

  // Simpler approach: dispatch partial updates directly
  const updateField = (field: Partial<socialMediaLinksData>) => {
    dispatch(updateUserData(field))
  }

  const onSubmit = (data: socialMediaLinksData) => {
    // if (userData.Technologies.length < 5) {
    //   setMinSkillsSatisfied(false)
    //   return
    // }
    dispatch(updateUserData(data))
    dispatch(nextStep())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="Github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Link *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Paste your github link here"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    updateField({ Github: e.target.value })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="LinkedIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Paste your LinkedIn link here"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    updateField({ LinkedIn: e.target.value })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Gmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Paste your Email Address here"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    updateField({ Gmail: e.target.value })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
