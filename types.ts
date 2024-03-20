export interface Billboard {
  id: string;
  imageUrl: string;
  label: string;
}
export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}
