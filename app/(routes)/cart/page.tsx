import CartPay from "./components/cart-pay";

export default function Cart() {
  const client = process.env.PAYPAL_CLIENT_ID || "";

  const initialOptions = {
    clientId: client,
    currency: "EUR",
    intent: "capture",
  };

  return <CartPay initialOptions={initialOptions} />;
}
