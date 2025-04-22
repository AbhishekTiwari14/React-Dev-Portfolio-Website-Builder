import { Data } from "@/types/userDataTypes"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type userDataState = {
  data: Data
  currentStep: number
  isSubmitting: boolean
}

const initialState: userDataState = {
  data: {
    // Personal Information
    fullName: "",
    title: "",
    description: "",
    about: "",

    // Social Media Links
    Github: "",
    LinkedIn: "",
    Gmail: "",

    // Experience Information
    experiences: [
      {
        fromYear: "",
        toYear: "",
        designation: "",
        company: "",
        workSummary: "",
        technologies: [],
      },
    ],

    // Projects Information
    projects: [
      {
        title: "",
        description: "",
        keyFeatures: [],
        codeLink: "",
        demoLink: "",
        technologies: [],
      },
    ],
  },
  currentStep: 0,
  isSubmitting: false,
}

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<Partial<Data>>) => {
      state.data = { ...state.data, ...action.payload }
    },
    nextStep: (state) => {
      state.currentStep += 1
    },
    prevStep: (state) => {
      state.currentStep -= 1
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload
    },
    resetForm: () => initialState,
  },
})

export const { updateUserData, nextStep, prevStep, setSubmitting, resetForm } =
  userDataSlice.actions
export default userDataSlice.reducer
