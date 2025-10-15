// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';

// interface NavbarProps {
//   cartItemCount: number;
// }

// const Navbar: React.FC<NavbarProps> = ({ cartItemCount }) => {
//   return (
//     <nav className="bg-black text-white p-4 md:p-6 flex justify-between items-center shadow-lg border-b border-gray-600 w-full rounded-xl">
//       <div className="flex items-center space-x-6">
//         <div className="hidden md:flex items-center space-x-6">
//           <Link
//             to="/"
//             className="text-4xl font-bold hover:text-gray-300 transition duration-200"
//           >
//             TADHEX Scanner
//           </Link>
//         </div>
//         <div className="flex md:hidden items-center space-x-4">
//           <Link
//             to="/"
//             className="text-2xl font-extrabold hover:text-gray-300 transition duration-300"
//           >
//             TADHEX
//           </Link>
//         </div>
//       </div>
//       <div className="flex space-x-8 items-center ml-auto">
//         <Link
//           to="/links"
//           className="text-xl font-semibold hover:text-gray-300 transition duration-300"
//         >
//           Links
//         </Link>
//         <Link
//           to="/shop"
//           className="text-xl font-semibold hover:text-gray-300 transition duration-300"
//         >
//           Shop
//         </Link>
//         <div className="relative">
//           <Link
//             to="/cart"
//             className="flex items-center text-lg font-semibold hover:text-gray-300 transition duration-300"
//           >
//             <FaShoppingCart className="text-4xl" />
//             {cartItemCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
//                 {cartItemCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css'; // Ensure this file is updated

interface NavbarProps {
  cartItemCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount }) => {
  return (
    // Background: Deeper, richer brown/black (bg-stone-950) | Added font-serif
    <nav className="bg-stone-950 text-white p-4 md:p-6 lg:p-8 flex justify-between items-center shadow-2xl border-b border-amber-900 w-full rounded-b-2xl animate-fade-down font-serif">
      <div className="flex items-center space-x-8">
        
        {/* Logo: Prominent and Gold */}
        <div className="hidden md:flex items-center">
          <Link
            to="/"
            className="text-4xl lg:text-5xl font-bold text-amber-400 tracking-wider hover:text-amber-300 transition-colors duration-300 transform hover:scale-[1.01]"
          >
            TADHEX Scanner
          </Link>
        </div>
        {/* Mobile Logo */}
        <div className="flex md:hidden items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors duration-300"
          >
            TADHEX
          </Link>
        </div>
      </div>
      
      {/* Navigation Links and Cart Icon */}
      <div className="flex space-x-6 md:space-x-10 items-center ml-auto">
        
        {/* Link Buttons with Animated Hover */}
        <Link
          to="/links"
          // Link styles: Padded, rounded, with button-like hover effect
          className="relative text-lg lg:text-xl font-medium tracking-wider px-4 py-2 rounded-lg transition-all duration-300 
                     bg-transparent hover:bg-amber-800/50 text-amber-200 hover:text-white transform hover:scale-[1.03]"
        >
          Links
        </Link>
        
        <Link
          to="/shop"
          className="relative text-lg lg:text-xl font-medium tracking-wider px-4 py-2 rounded-lg transition-all duration-300 
                     bg-transparent hover:bg-amber-800/50 text-amber-200 hover:text-white transform hover:scale-[1.03]"
        >
          Shop
        </Link>
        
        {/* Cart Icon */}
        <div className="relative">
          <Link
            to="/cart"
            className="p-3 rounded-full hover:bg-amber-800 transition-colors duration-300 transform hover:scale-[1.05]"
          >
            <FaShoppingCart className="text-3xl lg:text-4xl text-amber-300 hover:text-amber-100 transition-colors duration-300" />
            
            {/* Cart Item Count Badge */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-600 text-white rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-sm font-bold ring-2 ring-stone-950 animate-pop">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;