"use client";

import Currency from "@/components/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { MouseEventHandler, useState } from "react";

interface ProductInfoProps {
  product: Product;
}
const ProductInfo = ({ product }: ProductInfoProps) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    cart.addItem({ product, quantity: quantity });
  };
  return (
    <div className="px-4 md:flex-1">
      <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
        {product.name}
      </h2>

      <div className="mb-4 flex">
        <div className="mr-4">
          <span className="font-bold text-gray-700 dark:text-gray-300">
            Price:
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            <Currency value={product.price} />
          </span>
        </div>
      </div>
      <div className="mb-4 flex">
        <div>
          <span className="mr-2 font-bold text-gray-700 dark:text-gray-300">
            Category:
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {product.category.name}
          </span>
        </div>
      </div>
      <div className="mb-4 flex items-center justify-start ">
        <div className="mr-2 ">
          <span className="font-bold">quantity :</span>
        </div>
        <div className="mb-3 flex h-8 w-1/4 items-stretch text-gray-600">
          <button
            disabled={quantity === 1}
            onClick={() => setQuantity(quantity - 1)}
            className="rounded-l-md bg-gray-400 px-4 transition hover:bg-buttonColor hover:text-white"
          >
            -
          </button>
          <div className="flex w-full items-center justify-center bg-gray-300 px-4 text-xs font-bold uppercase transition">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex items-center justify-center rounded-r-md bg-gray-400 px-4 transition hover:bg-buttonColor hover:text-white"
          >
            +
          </button>
        </div>
      </div>
      <div className="mb-4">
        <div className="-mx-2 mb-4 flex">
          <div className="w-1/2 px-2">
            <button
              onClick={onAddToCart}
              type="button"
              className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-buttonColor2 to-buttonColor p-3 px-3 font-sans font-bold tracking-wide hover:bg-hoverColor dark:dark:text-black"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div>
        <span className="font-bold text-gray-700 dark:text-gray-300">
          Product Description:
        </span>
        <ul>
          <li>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante
          justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus
          commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum
          pretium, et venenatis sem blandit. Quisque ut erat vitae nisi ultrices
          placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
          sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
          tincidunt mi consectetur.
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
