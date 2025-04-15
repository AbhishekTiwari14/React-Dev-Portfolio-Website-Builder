import { motion } from "motion/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AppFeatures() {
  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800 p-6 rounded-xl group"
          >
            <svg
              className="mb-4 transition-transform duration-300 group-hover:rotate-360"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M8 10.5C8 11.3284 7.32843 12 6.5 12C5.67157 12 5 11.3284 5 10.5C5 9.67157 5.67157 9 6.5 9C7.32843 9 8 9.67157 8 10.5Z"
                  fill="#c27aff"
                ></path>{" "}
                <path
                  d="M10.5 8C11.3284 8 12 7.32843 12 6.5C12 5.67157 11.3284 5 10.5 5C9.67157 5 9 5.67157 9 6.5C9 7.32843 9.67157 8 10.5 8Z"
                  fill="#c27aff"
                ></path>{" "}
                <path
                  d="M17 6.5C17 7.32843 16.3284 8 15.5 8C14.6716 8 14 7.32843 14 6.5C14 5.67157 14.6716 5 15.5 5C16.3284 5 17 5.67157 17 6.5Z"
                  fill="#c27aff"
                ></path>{" "}
                <path
                  d="M7.5 17C8.32843 17 9 16.3284 9 15.5C9 14.6716 8.32843 14 7.5 14C6.67157 14 6 14.6716 6 15.5C6 16.3284 6.67157 17 7.5 17Z"
                  fill="#c27aff"
                ></path>{" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1 12C1 5.92487 5.92487 1 12 1C17.9712 1 23 5.34921 23 11V11.0146C23 11.543 23.0001 12.4458 22.6825 13.4987C21.8502 16.2575 18.8203 16.9964 16.4948 16.4024C16.011 16.2788 15.5243 16.145 15.0568 16.0107C14.2512 15.7791 13.5177 16.4897 13.6661 17.2315L13.9837 18.8197L14.0983 19.5068C14.3953 21.289 13.0019 23.1015 11.0165 22.8498C7.65019 22.423 5.11981 21.1007 3.43595 19.1329C1.75722 17.171 1 14.6613 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 14.2854 3.64673 16.303 4.95555 17.8326C6.25924 19.3561 8.3 20.4894 11.2681 20.8657C11.7347 20.9249 12.2348 20.4915 12.1255 19.8356L12.0163 19.1803L11.7049 17.6237C11.2467 15.3325 13.4423 13.4657 15.6093 14.0885C16.0619 14.2186 16.529 14.3469 16.9897 14.4646C18.7757 14.9208 20.3744 14.2249 20.7677 12.921C20.997 12.161 21 11.5059 21 11C21 6.65079 17.0745 3 12 3Z"
                  fill="#c27aff"
                ></path>{" "}
              </g>
            </svg>
            <h3 className="text-white text-xl font-semibold mb-3">
              Custom Themes
            </h3>
            <p className="text-gray-300">
              Choose from multiple professional themes or create your own.
              Customize colors, fonts, and layouts.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-6 rounded-xl group"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4 transition-transform duration-300 group-hover:rotate-360"
              width="48"
              height="48"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M1.547 0.309 C 1.258 0.384,1.016 0.529,0.773 0.773 C 0.524 1.022,0.416 1.198,0.316 1.520 L 0.253 1.720 0.253 8.000 L 0.253 14.280 0.316 14.480 C 0.416 14.802,0.524 14.978,0.773 15.227 C 1.022 15.476,1.198 15.584,1.520 15.684 L 1.720 15.747 8.000 15.747 L 14.280 15.747 14.480 15.684 C 14.802 15.584,14.978 15.476,15.227 15.227 C 15.476 14.978,15.584 14.802,15.684 14.480 L 15.747 14.280 15.747 8.000 L 15.747 1.720 15.684 1.520 C 15.584 1.198,15.476 1.022,15.227 0.773 C 14.980 0.525,14.739 0.382,14.441 0.307 C 14.207 0.248,1.774 0.249,1.547 0.309 M14.170 1.830 L 14.240 1.901 14.240 3.324 L 14.240 4.747 8.000 4.747 L 1.760 4.747 1.760 3.324 L 1.760 1.901 1.830 1.830 L 1.901 1.760 8.000 1.760 L 14.099 1.760 14.170 1.830 M4.747 10.267 L 4.747 14.267 3.403 14.267 C 2.665 14.267,2.023 14.259,1.977 14.250 C 1.931 14.241,1.864 14.203,1.827 14.166 L 1.760 14.099 1.760 10.183 L 1.760 6.267 3.253 6.267 L 4.747 6.267 4.747 10.267 M14.240 10.183 L 14.240 14.099 14.173 14.166 C 14.136 14.203,14.069 14.241,14.023 14.250 C 13.977 14.259,12.214 14.267,10.103 14.267 L 6.267 14.267 6.267 10.267 L 6.267 6.267 10.253 6.267 L 14.240 6.267 14.240 10.183 "
                  stroke="none"
                  fill-rule="evenodd"
                  fill="#60a5fa"
                ></path>
              </g>
            </svg>
            <h3 className="text-white text-xl font-semibold mb-3">
              Drag & Drop Builder
            </h3>
            <p className="text-gray-300">
              Build your portfolio visually with our intuitive drag and drop
              interface. No coding knowledge required.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-xl group"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-12 h-12 text-green-400 mb-4 transition-transform duration-300 group-hover:rotate-360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z"
                  fill="#4ade80"
                ></path>{" "}
                <path
                  d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z"
                  fill="#4ade80"
                ></path>{" "}
              </g>
            </svg>
            <h3 className=" text-white text-xl font-semibold mb-3">
              GitHub Integration
            </h3>
            <p className="text-gray-300">
              Connect your GitHub account to automatically import and showcase
              your projects and contributions.
            </p>
          </motion.div>
        </div>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
