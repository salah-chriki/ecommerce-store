"use client";

import { useEffect, useState } from "react";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderReview from "./order-review";

interface OrderReviewPageProps {
  initialOptions: {
    clientId: string;
    currency: string;
    intent: string;
  };
}

const OrderReviewPage = ({ initialOptions }: OrderReviewPageProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <PayPalScriptProvider options={initialOptions} deferLoading={true}>
      <OrderReview initialOptions={initialOptions} />
    </PayPalScriptProvider>
  );
};

export default OrderReviewPage;
