// import { getActiveColors } from "@/lib/themeConfig"
// import { useSelector } from "react-redux"

// export default function Theme1ProjectCard({
//   title,
//   description,
// }: {
//   title?: string
//   description?: string
// }) {
//   const colors = useSelector(getActiveColors)
//   return (
//     <div
//       className={`flex flex-col lg:flex-row lg:gap-4 lg:p-3 ${colors.cardHover} hover:shadow-md hover:cursor-pointer group rounded-md justify-start`}
//     >
//       <img
//         alt="movie-ticket-booking-app-thumbnail"
//         loading="lazy"
//         className={`w-32 h-18 object-cover rounded border-2 ${colors.imgHover}`}
//         style={{ color: "transparent" }}
//         src="/movieAppThumbnail.PNG"
//       />
//       <div className="flex flex-col justify-between gap-4">
//         <p
//           className={`font-semibold text-md ${colors.primary} ${colors.groupHover}`}
//         >
//           {title ? title : "Movie Ticket Booking App"}
//         </p>
//         <p
//           className={`${colors.secondary} group-hover:${colors.primary} text-sm`}
//         >
//           {description ? (
//             <div
//               // className={`${colors.secondary} ${
//               //   isLargePanel ? "text-xl font-medium" : ""
//               // }`}
//               dangerouslySetInnerHTML={{ __html: description }}
//             />
//           ) : (
//             "Built a realtime movie ticket booking web-app which can handle concurrent bookings."
//           )}
//         </p>

//         <div className="flex flex-wrap gap-2">
//           <button
//             className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${colors.btn}`}
//           >
//             Javascript
//           </button>
//           <button
//             className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${colors.btn}`}
//           >
//             React
//           </button>
//           <button
//             className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${colors.btn}`}
//           >
//             Typescript
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
