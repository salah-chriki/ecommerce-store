"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderReview from "./components/order-review";

const OrderPage = () => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
        components: "buttons",
        currency: "EUR",
      }}
    >
      <div className="min-h-dvh">
        <OrderReview />
      </div>
    </PayPalScriptProvider>
  );
};

export default OrderPage;
