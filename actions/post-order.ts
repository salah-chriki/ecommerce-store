"use server";

import { CartItem } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;

interface OrederData {
  name: string;
  email: string;
  opgg: string;
  cartItems: {
    product: {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
    };
    quantity: number;
  }[];
}

export const postOrder = async ({
  name,
  email,
  opgg,
  cartItems,
}: OrederData) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, opgg, cartItems }),
  });
  console.log("response", response.body);
  return response;
};

export default postOrder;
