"use client";

import { Product } from "@/types";
import Image from "next/image";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };
  return (
    <article
      key={product.id}
      className="flex flex-col items-center rounded-sm dark:bg-cardColor"
    >
      <div
        onClick={handleClick}
        className="group relative block h-52 w-full cursor-pointer overflow-hidden rounded-t-md object-cover object-center dark:dark:bg-cardColor"
      >
        <Image src={product.imageUrl} alt={product.name} fill />
      </div>
      <div className="flex w-full flex-1 flex-col p-6">
        <span className="text-sm text-muted">{product.category.name}</span>
        <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
          {product.name}
        </h3>
        <Currency key={product.id} value={product.price} />
        <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-400">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md p-3 px-3 font-sans font-bold tracking-wide hover:bg-orange-500 dark:dark:bg-buttonColor dark:dark:text-black"
          >
            <ShoppingCart className="mr-2" width={15} height={15} />
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

{
  /* <div className=" min-w-72 md:min-w-20 md:max-w-60 lg:max-w-80 rounded-md shadow-md dark:dark:bg-cardColor dark:dark:text-gray-100 ">
        <div
          onClick={handleClick}
          className="group relative block overflow-hidden cursor-pointer  object-cover object-center w-full rounded-t-md h-52 dark:dark:bg-cardColor"
        >
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="flex flex-col justify-between p-4 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">
              {product.name}{" "}
            </h2>
            <p className="text-sm text-muted">{product.category.name}</p>
            <Currency value={product.price} />{" "}
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full p-2 font-semibold tracking-wide rounded-md dark:dark:bg-violet-400 dark:dark:text-gray-900 hover:bg-violet-300"
          >
            Add To Cart
          </button>
        </div>
      </div> */
}
