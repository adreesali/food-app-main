 import React, { useState } from 'react';
import { ProductType } from '../types';
// Inline SVG Icons use kiye gaye hain taaki koi 'react-icons/fa' compilation error na aaye.

interface CartProps {
  cart: ProductType[];
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


const Cart: React.FC<CartProps> = ({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState<'Take Away' | 'Delivery' | ''>('');
  const [error, setError] = useState('');

  const totalPrice = cart.reduce((total, product) => {
    // Assuming 'halfPrice' is a flag on the product, though it wasn't defined in ProductType.
    // We use a safe check here.
    const price = (product as any).halfPrice ? product.price / 2 : product.price;
    return total + (price * product.quantity);
  }, 0);

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      setError("Your cart is empty. Please add items before placing an order.");
      return;
    }
    if (!name || !phone || !address || !orderType) {
      setError("Please fill in all the required customer details (Name, Phone, Address, Order Type).");
      return;
    }
    setError("");  

    const orderItems = cart.map(item => {
      const price = (item as any).halfPrice ? item.price / 2 : item.price;
      return `* ${item.title} (x${item.quantity}) - ${price * item.quantity} PKR`;
    }).join('\n');

    const totalBill = `\n\n*TOTAL BILL:* ${totalPrice.toLocaleString()} PKR`;

    const customerDetails = `\n\n*Customer Details:*\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nOrder Type: ${orderType}`;

    // Contact number set to 923001490558 as provided in original code
    const whatsappMessage = encodeURIComponent(`🍽️ *NEW ONLINE ORDER* 🍽️\n\n*Items Ordered:*\n${orderItems}${totalBill}${customerDetails}`);

    const whatsappLink = `https://wa.me/923287725050?text=${whatsappMessage}`;

    // Custom modal UI should be used instead of window.open in a real-world React app 
    // for better user experience, but using window.open here for simplicity.
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
      
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 tracking-tight border-b-4 border-yellow-500 pb-2">Your Order Cart</h1>
      
      <div className="w-full max-w-4xl space-y-8">
        {cart.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <p className="text-2xl font-semibold text-gray-600">🛒 Your Cart is Empty!</p>
            <p className="text-gray-500 mt-2">Add some delicious items from the menu to start your order.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Column 1: Cart Items List (2/3 width on desktop) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Review Your Items ({cart.length})</h2>
                {cart.map((product) => {
                  const price = (product as any).halfPrice ? product.price / 2 : product.price;
                  const itemTotal = price * product.quantity;
                  return (
                    // Individual Cart Item Card
                    <div key={product.id} className="flex items-center space-x-4 p-4 mb-4 bg-gray-50 rounded-xl shadow-inner hover:bg-yellow-50 transition-all border border-gray-200">
                      
                      {/* Image and Title */}
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-16 h-16 object-cover rounded-xl shadow-md" 
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; 
                            target.src = 'https://placehold.co/100x100/f0f0f0/333333?text=Dish';
                          }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-lg font-bold text-gray-900 truncate">{product.title}</div>
                        <div className="text-sm text-gray-500">Unit Price: {price.toLocaleString()} PKR</div>
                      </div>
                      
                      {/* Quantity Controls and Total */}
                      <div className="flex items-center space-x-3">
                          {/* Quantity Buttons */}
                          <div className="flex items-center space-x-1">
                              <button
                                onClick={() => decreaseQuantity(product.id)}
                                className="bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center shadow-md"
                                aria-label="Decrease quantity"
                              >
                                <MinusIcon />
                              </button>
                              <span className="text-lg font-semibold w-8 text-center">{product.quantity}</span>
                              <button
                                onClick={() => increaseQuantity(product.id)}
                                className="bg-green-500 text-white w-8 h-8 rounded-full hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center shadow-md"
                                aria-label="Increase quantity"
                              >
                                <PlusIcon />
                              </button>
                          </div>
                          
                          {/* Item Subtotal */}
                          <div className="text-lg font-extrabold text-orange-600 min-w-[80px] text-right">
                              {itemTotal.toLocaleString()} PKR
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="bg-gray-200 text-red-600 p-2 rounded-full hover:bg-red-300 transition-all active:scale-95 shadow-md"
                            aria-label="Remove item"
                          >
                            <TrashIcon />
                          </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Order Summary and Details (1/3 width on desktop) */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Order Summary Card */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-yellow-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="flex justify-between items-center text-lg mb-4 border-t pt-4">
                  <span className="font-bold text-gray-700">Subtotal:</span>
                  <span className="text-black font-extrabold text-xl">
                    {totalPrice.toLocaleString()} PKR
                  </span>
                </div>
                {/* Total Price Highlight */}
                <div className="flex justify-between items-center p-3 mt-4 rounded-xl text-white font-extrabold shadow-xl 
                              bg-gradient-to-r from-yellow-500 to-orange-600 transform hover:scale-[1.02] transition-transform duration-300">
                  <span className="text-xl">GRAND TOTAL:</span>
                  <span className="text-3xl">{totalPrice.toLocaleString()} PKR</span>
                </div>
              </div>

              {/* Customer Details Form Card */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Customer & Order Details</h2>
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    placeholder="* Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-3 rounded-xl focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="* Your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-300 p-3 rounded-xl focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  />
                  <textarea
                    placeholder="* Your Full Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-gray-300 p-3 rounded-xl focus:ring-yellow-500 focus:border-yellow-500 transition-all h-20"
                  />
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value as 'Take Away' | 'Delivery')}
                    className="border border-gray-300 p-3 rounded-xl appearance-none bg-white focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  >
                    <option value="" disabled>-- Select Order Type --</option>
                    <option value="Take Away">Take Away (Self Pick-up)</option>
                    <option value="Delivery">Delivery (Home Delivery)</option>
                  </select>
                  
                  {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
                  
                  {/* WhatsApp Order Button */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full relative px-6 py-3 mt-4 overflow-hidden font-extrabold text-white uppercase tracking-wider
                              bg-gradient-to-r from-green-500 to-green-700 rounded-xl shadow-lg shadow-green-400/50 
                              transition-all duration-300 hover:shadow-xl hover:from-green-600 hover:to-green-800 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.039 2.193c-5.498 0-9.96 4.462-9.96 9.96 0 1.944.567 3.79 1.636 5.378l-1.684 4.881 5.031-1.65c1.536.88 3.3 1.353 5.059 1.353h.004c5.498 0 9.96-4.462 9.96-9.96s-4.462-9.96-9.96-9.96zm0 18.2c-1.69 0-3.35-.49-4.78-1.42l-.34-.2-3.52 1.15 1.17-3.41-.22-.36c-1.02-1.66-1.56-3.6-1.56-5.65 0-4.63 3.76-8.39 8.39-8.39 2.24 0 4.35.88 5.92 2.44 1.57 1.57 2.45 3.68 2.45 5.92 0 4.63-3.76 8.39-8.39 8.39zM17.27 14.88c-.1-.17-.36-.27-.74-.46s-.98-.48-1.42-.65c-.44-.17-.76-.17-.98.17-.22.34-.85 1.05-1.03 1.27-.18.21-.37.24-.69.08-.32-.17-1.35-.49-2.58-1.6-1.92-1.76-2.55-2.61-2.85-3.14-.3-.53-.03-.82.14-.99.15-.15.34-.26.46-.42.12-.16.15-.31.25-.52s.04-.39-.14-.76c-.18-.37-.77-1.87-1.06-2.56-.27-.64-.53-.55-.74-.55s-.46-.01-.7-.01c-.24 0-.62.08-.94.42-.32.34-1.22 1.19-1.22 2.91 0 1.72 1.25 3.37 1.43 3.6c.18.22 2.45 3.74 5.95 5.14 3.5.76 3.65.59 4.31.55.66-.04 1.79-.73 2.05-1.44.26-.71.26-1.31.18-1.44-.09-.13-.34-.21-.71-.4z" />
                      </svg>
                      Place Order via WhatsApp
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer / Contact Section - Professional & Clean */}
      <footer className="w-full max-w-4xl mt-12 p-6 bg-gray-900 text-white rounded-2xl shadow-2xl text-center">
        <p className="text-xl font-bold tracking-wider">Need a Custom Software Solution?</p>
        <p className="text-gray-400 mt-2 text-sm">We provide high-quality, professional solutions for your business. Contact us for inquiries.</p>
        <a
          href="tel:03287725050"
          className="mt-4 inline-flex items-center bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-full hover:bg-yellow-600 transition-all shadow-lg active:scale-95"
        >
          Call Us Now
        </a>
      </footer>
    </div>
  );
};

export default Cart;