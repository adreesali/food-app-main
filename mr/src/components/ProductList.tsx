import React from 'react';
import Product from '../components/Product'; // Adjust import path as needed
import { ProductType, CartItemType } from '../types';

interface ProductListProps {
  products: ProductType[];
  cartItems: CartItemType[];
  addToCart: (product: ProductType) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  cartItems,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4 py-6">
      {products.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        return (
          <Product
            key={product.id}
            product={product}
            cartItem={cartItem}
            addToCart={addToCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
