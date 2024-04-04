"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Summary from "./summary";
import CartLine from "./cart-line";

interface CartPayProps {
  initialOptions: {
    clientId: string;
    currency: string;
    intent: string;
  };
}

const CartPay = ({ initialOptions }: CartPayProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <PayPalScriptProvider options={initialOptions} deferLoading={true}>
      <Container>
        <div className="container flex flex-col justify-center px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
          {cart.cartItems.length === 0 ? (
            <div className="min-h-full"> cart is empty</div>
          ) : (
            <>
              <div className=" mr-10 flex w-full flex-col justify-start space-y-4 rounded-md p-6 sm:p-10 lg:w-2/3 dark:bg-bannerColor dark:text-gray-100">
                <h2 className="text-center text-xl font-semibold">Your cart</h2>
                <ul className="flex flex-col divide-y dark:divide-gray-700">
                  {cart.cartItems.map((item) => (
                    <CartLine key={item.product.id} data={item} />
                  ))}
                </ul>
              </div>
              <Summary />
            </>
          )}
        </div>
      </Container>
    </PayPalScriptProvider>
  );
};

export default CartPay;
