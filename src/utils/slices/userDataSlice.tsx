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
    fillWithSampleData: (state) => {
      state.data = {
        fullName: " JOHN DOE",
        title: "Front End Engineer",
        description: "FRONT-END DEVELOPER, UI-ENGINEER, & DESIGNER",
        about: `<p>I'm a developer who creates accessible, pixel-perfect user interfaces combining thoughtful design with solid engineering. My passion lies where design meets development—building experiences that are visually appealing while optimized for performance and usability. I'm dedicated to crafting interfaces that not only look great but function flawlessly, bridging the gap between aesthetics and technical excellence while prioritizing accessibility throughout the development process.<br><br>Currently serving as a Senior Front-End Engineer at Klaviyo with a focus on accessibility, I help develop and maintain UI components powering the platform's frontend. My work ensures our product adheres to web accessibility standards and best practices, creating an inclusive experience for all users.</p>`,
        Github: "https://github.com/AbhishekTiwari14",
        LinkedIn: "https://www.linkedin.com/in/abhishek-tiwari-90a17022b/",
        Gmail: "abhishek.tiwari2003@gmail.com",
        experiences: [
          {
            fromYear: "2023",
            toYear: "PRESENT",
            designation: "Senior Frontend Developer",
            company: "Klaviyo",
            workSummary: `<p>Built and maintained critical components used to construct Google's frontend, across the whole product. Worked closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.</p>`,
            technologies: [
              "typescript",
              "react",
              "javascript",
              "tailwind",
              "mysql",
              "threejs",
            ],
          },
          {
            fromYear: "2022",
            toYear: "2023",
            designation: "Frontend Engineer",
            company: "TATA",
            workSummary: `<p>Built and maintained critical components used to construct Google's frontend, across the whole product. Worked closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.</p>`,
            technologies: [
              "nextjs",
              "typescript",
              "javascript",
              "tailwind",
              "html",
              "css",
              "nodejs",
              "mongodb",
            ],
          },
        ],
        projects: [
          {
            title: "Portfolio Website Generator",
            description: `<p>Engineered a responsive<strong> no-code</strong> portfolio generator with <strong>real-time preview</strong> and <strong>adaptive layouts</strong> enabling developers to build <strong>customized portfolio websites</strong> in <strong>minutes.</strong></p>`,
            keyFeatures: [
              "Integrated secure GitHub OAuth",
              "Automated the process of repository creation and deployment",
              "Reduced initial load time by 47% through code splitting and lazy loading",
            ],
            demoLink: "https://lazydev-seven.vercel.app/",
            codeLink:
              "https://github.com/AbhishekTiwari14/React-Dev-Portfolio-Website-Builder",
            technologies: [
              "react",
              "typescript",
              "firebase",
              "tailwind",
              "javascript",
            ],
          },
          {
            title: "Movie Ticket Booking App",
            description: `<p>Developed a <strong>real-time</strong> movie ticket booking app and implemented advanced features such as<strong> real-time seat locking system</strong>.</p>`,
            keyFeatures: [
              "Handled concurrent bookings with seat-locking mechanism",
              " Implemented debouncing for movie search feature",
              " Implemented infinite scrolling to improve ux and performance",
            ],
            demoLink: "https://realtime-movie-ticket-booking-app.vercel.app/",
            codeLink:
              "https://github.com/AbhishekTiwari14/Realtime-Movie-Ticket-Booking-App",
            technologies: [
              "react",
              "typescript",
              "javascript",
              "nodejs",
              "mongodb",
              "firebase",
            ],
          },
          {
            title: "Testimonials SaaS App",
            description: `<p>Built a testimonials management platform which<strong> handles collecting, storing and showcasing testimonials</strong> on user's behalf.</p>`,
            keyFeatures: [
              " Made an embeddable JS widget allowing seamless integration on user's website",
              "User can add this in there website by adding just 2 lines of code",
              "Compatible for website created with any tech stack",
            ],
            demoLink: "https://testimonials-saas-app.vercel.app/",
            codeLink:
              "https://github.com/AbhishekTiwari14/next-testimonials-saas-app/",
            technologies: [
              "nextjs",
              "typescript",
              "threejs",
              "firebase",
              "tailwind",
              "javascript",
            ],
          },
        ],
      }
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

export const { updateUserData, fillWithSampleData, nextStep, prevStep, setSubmitting, resetForm } =
  userDataSlice.actions
export default userDataSlice.reducer
