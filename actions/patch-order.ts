"use server";

import { CartItem } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/order`;

export const patchOrder = async (orderId: string) => {
  return await fetch(URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: orderId,
  });
};

export default patchOrder;
