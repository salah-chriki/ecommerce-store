import CartPay from "./components/cart-pay";

export default function Cart() {
  const client = process.env.PAYPAL_CLIENT_ID || "";
  console.log(client); //logs on the server, not on the client

  const initialOptions = {
    clientId: client,
    currency: "EUR",

    components: "buttons",
    intent: "capture",
  };

  return <CartPay initialOptions={initialOptions} />;
}
