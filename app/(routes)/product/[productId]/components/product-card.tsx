"use client";

import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/currency";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const cart = useCart();
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
        className="group relative block h-56 w-full cursor-pointer overflow-hidden rounded-t-md object-cover object-center dark:bg-cardColor"
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
            onClick={() => cart.addItem({ product, quantity: 1 })}
            type="button"
            className="flex w-1/2 items-center justify-center rounded-md bg-gradient-to-r from-buttonColor2 to-buttonColor p-3 px-3 font-sans font-bold tracking-wide hover:bg-hoverColor dark:dark:text-black"
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
