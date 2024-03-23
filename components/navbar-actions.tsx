"use client";

import { ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import Currency from "./currency";
import { useRouter } from "next/navigation";

const NavBarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const cart = useCart();
  const totalPrice = cart.cartItems.reduce((total, item) => {
    return total + Number(item.product.price * item.quantity);
  }, 0);
  if (!isMounted) return null;
  return (
    <div className="flex items-center justify-center gap-x-2">
      <Button onClick={() => router.push("/cart")} className="">
        <ShoppingBag size={24} />
      </Button>
      <span className="text-mutedPrimay text-md hover:text-hoverColor ">
        <Currency value={totalPrice} />
      </span>
    </div>
  );
};

export default NavBarActions;
