export interface ProductType {
  id: number;
  title: string;
  price: number;
  halfPrice?: number;  // Optional prowperty for half price
  imageUrl: string;
  quantity: number;
  category: string;
}


  
  export interface CartItemType extends ProductType {
    quantity: number;
  }
  

  export interface CartItemType {
    id: number;
    quantity: number;
  }