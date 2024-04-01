"use client";

import useCart from "@/hooks/use-cart";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useState } from "react";

// This value is from the props in the UI
const style = { layout: "vertical" };

const URL = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;

export default function PayPalButtonsComponent() {
  const [{ isPending }] = usePayPalScriptReducer();
  const [showSpinner, setShowSpinner] = useState(false);
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
    // .then((response) => response.json())
    // .then((order) => {
    //   // Your code here after create the order
    //   return order.id;
    // });
  }
  async function onApprove(data: any) {
    // replace this url with your server
    return await fetch(`${URL}/capture-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => response.json())
      .then((orderData) => {
        // Your code here after capture the order
      });
  }
  interface ButtonWrapperProps {
    showSpinner: boolean;
  }
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Ac6EVbOCeYbjaKKGDTZEKVQ6dkNxKISdV561IOZEx1Mr56-nPbyHfyGTZIzi9ZWFbnpWzpx9m9UNsYT5",
        components: "buttons",
        currency: "EUR",
      }}
    >
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={{ layout: "vertical" }} // Fix: Change the type of the `style` object to match the expected type
          disabled={false}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </>
    </PayPalScriptProvider>
  );
}
