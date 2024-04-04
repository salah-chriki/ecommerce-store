"use client";

import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useState } from "react";
import { useParams } from "next/navigation";

// This value is from the props in the UI
const style = { layout: "vertical" };

const URL = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;

export default function PayPalButtonsComponent() {
  const [{ isPending }] = usePayPalScriptReducer();
  const [showSpinner, setShowSpinner] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const params = useParams();
  const cart = useCart();
  const items = cart.cartItems.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    unit_amount: {
      currency_code: "EUR",
      value: item.product.price,
    },
  }));
  async function createOrder() {
    // replace this url with your server

    const res = await fetch(`${URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
      }),
    });
    const data = await res.json();
    return data.id;
  }
  async function onApprove(data: any, actions: any) {
    // replace this url with your server
    console.log("orderId onApprove", data);
    const orderId = params.orderId;
    return actions.order.capture().then(async (details: any) => {
      toast.success("Successful payment.", {
        icon: "🛒",
        style: {
          background: "#57cc99",
          borderRadius: "5px",
          color: "#003049",
        },
      });
      setIsPaid(true);
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId, isPaid }),
        });
        cart.removeAll();
      } catch (error) {
        console.log("error", error);
      }
    });
  }

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "vertical" }} // Fix: Change the type of the `style` object to match the expected type
        disabled={false}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
}
