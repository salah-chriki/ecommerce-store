import OrderReviewPage from "./components/order-review-page";
import { GetServerSideProps } from "next";
interface FormData {
  name: string;
  email: string;
  opgg: string;
}

interface OrderPageProps {
  params: {
    orderId: string;
  };
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const client = process.env.PAYPAL_CLIENT_ID || "";

  const initialOptions = {
    clientId: client,
    currency: "EUR",
    intent: "capture",
  };

  return (
    <>
      <OrderReviewPage initialOptions={initialOptions} />
    </>
  );
};

export default OrderPage;
