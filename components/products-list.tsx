"use client";

import { Product } from "@/types";
import ProductCard from "./product-card";
import Button from "./ui/button";
import { redirect, useParams, useRouter } from "next/navigation";

interface ProductsListProps {
  title: string;
  products: Product[];
  hideButton: boolean;
}

const ProductsList = ({ title, products, hideButton }: ProductsListProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/all");
  };
  return (
    <div className="mt-32 space-y-4">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-3xl font-bold">{title}</h3>
        <button
          onClick={handleClick}
          className={` hover:bg-hoverColor mr-6 rounded-md px-4 py-2 font-semibold dark:bg-buttonColor dark:text-black ${
            hideButton ? "hidden" : ""
          }`}
        >
          View All
        </button>
      </div>
      {products.length === 0 && <p>No products found</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
