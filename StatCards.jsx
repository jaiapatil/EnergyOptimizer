// export default function StatCards() {
//   const stats = [
//     {
//       label: "Total Consumption",
//       value: "5,200 kWh",
//       change: "-12%",
//       changeColor: "text-green-400",
//     },
//     {
//       label: "Total Cost",
//       value: "$10,625",
//       change: "-15%",
//       changeColor: "text-green-400",
//     },
//     {
//       label: "Monthly Savings",
//       value: "$2,625",
//       change: "+8%",
//       changeColor: "text-green-400",
//     },
//     {
//       label: "Efficiency Score",
//       value: "87%",
//       change: "+3%",
//       changeColor: "text-green-400",
//       badge: "Excellent",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//       {stats.map((stat, idx) => (
//         <div key={idx} className="bg-[#111827] p-4 rounded shadow-sm">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm text-gray-400">{stat.label}</p>
//               <h2 className="text-2xl font-bold">{stat.value}</h2>
//               <p className={`text-xs ${stat.changeColor}`}>{stat.change} vs last month</p>
//             </div>
//             {stat.badge && (
//               <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
//                 {stat.badge}
//               </span>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
