import { useDispatch, useSelector } from "react-redux"
import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { auth, githubProvider } from "@/lib/firebase"
import { AppDispatch, RootState } from "@/utils/store"
import { useEffect } from "react"
import {
  fetchUserData,
  fetchUserRepos,
  setAccessToken,
} from "@/utils/slices/githubSlice"

const useAppDispatch = () => useDispatch<AppDispatch>()

export default function GitHubData({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()
  const { user, error } = useSelector((state: RootState) => state.github)

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleLogin = async () => {
    try {
      githubProvider.addScope("repo")
      githubProvider.addScope("read:user")

      const result = await signInWithPopup(auth, githubProvider)
      const credential = GithubAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken

      if (token) {
        dispatch(setAccessToken(token))
        await dispatch(fetchUserData(token))
        await dispatch(fetchUserRepos(token))
      }
    } catch (error) {
      console.error("Auth Error:", error)
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-xl">
        <p className="mb-4 text-xl font-semibold">
          You must sign in to access this page.
        </p>
        <Button
          onClick={handleLogin}
          className="font-bold text-lg p-5 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-6 h-6 mr-2"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          Connect with GitHub
        </Button>
        {error.user && (
          <p className="text-red-500 mt-2 text-sm">{error.user}</p>
        )}
      </div>
    )
  }
  return children
}
