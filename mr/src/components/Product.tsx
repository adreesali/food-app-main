import React from 'react';
// FaTrash, FaMinus, FaPlus icons ko ab inline SVG se replace kar diya gaya hai.
import { ProductType, CartItemType } from '../types';

interface ProductProps {
  product: ProductType;
  cartItem: CartItemType | undefined;
  addToCart: (product: ProductType) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

// Inline SVG Icons
const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.93a2.25 2.25 0 01-2.244-2.077L6.446 6.539m1.485-.368c.074-.3.262-.574.52-.767.258-.194.577-.293.904-.293h7.68c.327 0 .646.099.904.293.258.193.446.467.52.767m-1.93-3.086c-.197-.245-.483-.404-.796-.465-.313-.061-.643-.056-.957.012L12 3.5l-1.077-.168c-.314-.068-.644-.069-.957-.012-.313.061-.599.22-.796.465" />
  </svg>
);


const Product: React.FC<ProductProps> = ({
  product,
  cartItem,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const inCart = currentQuantity > 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    // Premium Card Design: Strong shadow, deep rounded corners, and a responsive hover effect
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-yellow-400/70 flex flex-col h-auto relative 
                    transition-all transform hover:scale-[1.03] duration-400 ease-in-out border border-gray-100 dark:border-gray-700 group">
      
      {/* Product Image */}
      <div className="w-full h-44 overflow-hidden relative">
          <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; 
                target.src = 'https://placehold.co/600x440/f0f0f0/333333?text=Shahi+Dish'; // Fallback
              }}
          />
          {/* Price Badge - Floating, High-Contrast, and Stylized */}
          <div className="absolute top-3 right-3 bg-red-700 text-white font-black text-xl py-1 px-3 rounded-full shadow-xl tracking-wider transform transition-transform duration-300 group-hover:scale-105">
            PKR {product.price.toLocaleString()}
          </div>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        {/* Title: Bold and clear */}
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-4 truncate w-full">{product.title}</h2>
        
        {/* Actions */}
        {!inCart ? (
          // Attractive Add to Cart Button (Vibrant Gradient, 3D Feel)
          <button
            onClick={handleAddToCart}
            className="w-full relative px-6 py-3 overflow-hidden font-extrabold text-gray-900 uppercase tracking-wider
                       bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg shadow-yellow-300/80 
                       transition-all duration-300 hover:shadow-xl hover:from-yellow-500 hover:to-orange-600 active:scale-95">
            <span className="relative z-10">Add to Cart</span>
          </button>
        ) : (
          <div className="flex items-center justify-between w-full space-x-2">
            
            {/* Quantity Controls Group: Full Rounded Container */}
            <div className="flex items-center justify-center space-x-2 bg-gray-100 rounded-full p-1 border border-yellow-500 shadow-inner flex-grow">
                {/* Minus Button */}
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="bg-red-600 text-white w-10 h-10 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center shadow-md active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon />
                </button>
                {/* Quantity Display */}
                <span className="text-xl font-extrabold text-gray-900 mx-3 min-w-[30px] text-center">{currentQuantity}</span>
                {/* Plus Button */}
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="bg-green-600 text-white w-10 h-10 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center shadow-md active:scale-90"
                  aria-label="Increase quantity"
                >
                  <PlusIcon />
                </button>
            </div>
            
            {/* Remove from Cart Button (Trash) - Highlighting Trash icon */}
            <button
              onClick={() => removeFromCart(product.id)}
              className="bg-red-100 text-red-600 w-12 h-12 p-3 rounded-full hover:bg-red-200 transition-colors flex items-center justify-center shadow-md active:scale-90"
              aria-label="Remove from cart"
            >
              <TrashIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
