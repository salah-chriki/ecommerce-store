"use client";

import Image from "next/image";

import useCart from "@/hooks/use-cart";
import { CartItem } from "@/types";
import Currency from "@/components/currency";
import { Trash, X } from "lucide-react";

interface CartItemProps {
  data: CartItem;
}

const CartItem = ({ data }: CartItemProps) => {
  const cart = useCart();

  const beforePrice = data.product.price * 1.3;

  const onRemove = () => {
    cart.removeItem(data.product.id);
  };

  return (
    <li className="flex flex-col pt-4 sm:flex-row sm:justify-between">
      <div className="flex w-full space-x-2 sm:space-x-4">
        <div className="mb-4 h-[100px] w-[180px]  rounded-lg">
          <Image
            className="h-full w-full object-cover"
            src={data.product.imageUrl}
            alt={data.product.name}
            width={180}
            height={100}
          />
        </div>

        <div className="flex w-full flex-col justify-between pb-4">
          <div className="flex w-full justify-between space-x-2 pb-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                {data.product.name}
              </h3>
              <p className="text-sm dark:text-gray-400">
                {data.product.category.name}
              </p>
            </div>

            <div className="mr-4 text-right">
              <span className="text-lg font-semibold">
                <Currency value={data.product.price} />
              </span>
              <span className="text-sm line-through dark:text-gray-600">
                <Currency value={beforePrice} />
              </span>
            </div>
            <div className="sm:order-1">
              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                <button
                  disabled={data.quantity === 1}
                  onClick={() => cart.removeItemQuantity(data.product.id)}
                  className="flex items-center justify-center rounded-l-md bg-gray-400 px-4 transition hover:bg-buttonColor hover:text-white"
                >
                  -
                </button>
                <div className="flex w-full items-center justify-center bg-gray-300 px-4 text-xs font-bold uppercase transition">
                  {data.quantity}
                </div>
                <button
                  onClick={() => cart.addItem(data)}
                  className="flex items-center justify-center rounded-r-md bg-gray-400 px-4 transition hover:bg-buttonColor hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end divide-x text-sm">
            <button
              onClick={() => cart.removeItem(data.product.id)}
              type="button"
              className="flex items-center space-x-1 px-2 py-1 pl-0"
            >
              <X width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
