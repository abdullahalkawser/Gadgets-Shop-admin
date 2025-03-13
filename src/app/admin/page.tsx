// // components/Navbar.js
// import React from 'react';
// import Link from 'next/link';
// import { UserButton } from '@clerk/nextjs';

// const Navbar = () => {
//   return (
//     <nav className="bg-gray-800 text-white p-10 flex justify-between items-center">
//       {/* Brand or Logo */}
//       <h1 className="text-2xl font-bold cursor-pointer text-white">Admin-Dashboard</h1>

//       {/* Navigation Links (Responsive) */}
//       <div className="hidden md:flex space-x-10">
//         <Link href="/admin/orders">
//           <span className="hover:text-gray-300 cursor-pointer">Orders</span>
//         </Link>
//         <Link href="/admin/products">
//           <span className="hover:text-gray-300 cursor-pointer">Product</span>
//         </Link>
//         <Link href="/admin/products">
//           <span className="hover:text-gray-300 cursor-pointer">Categories</span>
//         </Link>
//       </div>

//       {/* Search and Avatar */}
//       <div className="flex items-center space-x-4">
//         {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Search Products"
//           className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none w-48 md:w-64"
//         />

//         {/* User Button (Clerk) */}
//         <div className="flex items-center">
//           <UserButton />
//         </div>
//       </div>

//       {/* Mobile Menu (Toggle on smaller screens) */}
//       <div className="md:hidden flex items-center">
//         <button className="text-white focus:outline-none">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
