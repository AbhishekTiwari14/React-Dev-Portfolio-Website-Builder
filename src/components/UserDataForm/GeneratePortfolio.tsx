import { useDispatch } from "react-redux"
import { Button } from "../ui/button"
// import { RootState } from "@/utils/store"
import { prevStep } from "@/utils/slices/userDataSlice"

export default function GeneratePortfolio() {
  //   const userData = useSelector((state: RootState) => state.userData.data)
  const dispatch = useDispatch()
  return (
    <div>
      <p className="p-8 text-xl font-bold">
        Hurray! Your portfolio website is ready, now you can download zip code
        or deploy your portfolio website directly on vercel
      </p>
      <div className="flex gap-4 p-8">
        <Button variant={"default"} className="bg-blue-700 w-1/2">
          Download Zip Code
        </Button>
        <Button className="w-1/2">Deploy on Vercel</Button>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => dispatch(prevStep())}
      >
        Previous
      </Button>
    </div>
  )
}
