import { motion, useAnimation } from "framer-motion"
import { lazy, Suspense, useEffect, useRef } from "react"
import { BackgroundStars } from "../BackgroundStars"

const InteractiveGlobe = lazy(() => import("./InteractiveGlobe"))

export default function AboutSection({ bp }: { bp: string }) {
  const isLargePanel = bp === "lg" || bp === "xl"
  const controls = useAnimation()
  const sectionRef = useRef(null)

  useEffect(() => {
    console.log("isLarge: ", isLargePanel, "bp: ", bp)
  }, [bp, isLargePanel])

  const lineVariants = {
    hidden: { scaleX: 0 },
    animate: {
      scaleX: [0, 1, 0],
      transition: {
        duration: 2, // Total duration for all steps
        times: [0, 0.5, 1], // Evenly distribute the timing for each step
        ease: "easeInOut",
      },
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the section enters the viewport
          if (entry.isIntersecting) {
            // Play the animation
            controls.start("animate")
          } else {
            // Reset the animation when out of view
            controls.start("hidden")
          }
        })
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    )

    // Store the current value of the ref in a variable
    const currentRef = sectionRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    // Clean up the observer when component unmounts
    // Use the stored variable instead of accessing sectionRef.current directly
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls])

  return (
    <div
      ref={sectionRef}
      className="bg-[#020b18] h-full w-full px-12 md:px-16 lg:px-24 pt-12 relative overflow-hidden pb-8"
    >
      {/* Stars background for the entire section */}
      <BackgroundStars />

      <div className="lg:relative z-10">
        <div className="w-full lg:w-1/2 flex items-center gap-4 mt-4 pb-8">
          <p className="text-slate-200 text-md sm:text-lg md:text-xl lg:text-3xl font-bold whitespace-nowrap">
            About Me
          </p>
          <motion.span
            className="self-center h-px flex-grow bg-white origin-left"
            variants={lineVariants}
            initial="hidden"
            animate={controls}
          />
        </div>
        {isLargePanel ? (
          <div className="block lg:grid lg:grid-cols-2 lg:gap-6 place-items-center">
            <p className="text-white font-semibold">
              Front End Engineer I build accessible, pixel-perfect digital
              experiences for the web. About Experience Projects GitHub LinkedIn
              CodePen Instagram Goodreads About I'm a developer passionate about
              crafting accessible, pixel-perfect user interfaces that blend
              thoughtful design with robust engineering. My favorite work lies
              at the intersection of design and development, creating
              experiences that not only look great but are meticulously built
              for performance and usability. Currently, I'm a Senior Front-End
              Engineer at Klaviyo, specializing in accessibility. I contribute
              to the creation and maintenance of UI components that power
              Klaviyo's frontend, ensuring our platform meets web accessibility
              standards and best practices to deliver an inclusive user
              experience. In the past, I've had the opportunity to develop
              software across a variety of settings — from advertising agencies
              and large corporations to start-ups and small digital product
              studios. Additionally, I also released a comprehensive video
              course a few years ago, guiding learners through building a web
              app with the Spotify API.
            </p>
            <div className="hidden lg:block h-full w-full mt-8 lg:mt-0">
              <Suspense
                fallback={
                  <img
                    src="/globe.PNG"
                    alt="globe"
                    className="w-[500px] ml-16 mb-8"
                  />
                }
              >
                <InteractiveGlobe />
              </Suspense>
            </div>
          </div>
        ) : (
          <div className="block p-2">
            <p className="text-white text-lg font-semibold tracking-wider">
              Front End Engineer I build accessible, pixel-perfect digital
              experiences for the web. About Experience Projects GitHub LinkedIn
              CodePen Instagram Goodreads About I'm a developer passionate about
              crafting accessible, pixel-perfect user interfaces that blend
              thoughtful design with robust engineering. My favorite work lies
              at the intersection of design and development, creating
              experiences that not only look great but are meticulously built
              for performance and usability. Currently, I'm a Senior Front-End
              Engineer at Klaviyo, specializing in accessibility. I contribute
              to the creation and maintenance of UI components that power
              Klaviyo's frontend, ensuring our platform meets web accessibility
              standards and best practices to deliver an inclusive user
              experience. In the past, I've had the opportunity to develop
              software across a variety of settings — from advertising agencies
              and large corporations to start-ups and small digital product
              studios. Additionally, I also released a comprehensive video
              course a few years ago, guiding learners through building a web
              app with the Spotify API.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
