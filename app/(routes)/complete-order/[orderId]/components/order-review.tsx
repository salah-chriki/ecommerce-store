"use client";
import useCart from "@/hooks/use-cart";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OrderCompleted from "./order-completed";
import Currency from "@/components/currency";

const style = { layout: "vertical" };

const URL = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;

const OrderReview = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [showSpinner, setShowSpinner] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const [displayPaypalButtons, setDisplayPaypalButtons] = useState(true);
  const cart = useCart();
  const totalPrice = cart.cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (cart.cartItems.length === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [cart.cartItems]);

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
        setDisplayPaypalButtons(false);
      } catch (error) {
        console.log("error", error);
      }
    });
  }

  return (
    <>
      {isPaid ? (
        <OrderCompleted />
      ) : (
        <div className="mx-auto mt-24 flex max-w-lg flex-col space-y-4 divide-y p-6 sm:w-96 sm:p-10  dark:divide-gray-300 dark:bg-bannerColor dark:text-mutedPrimary">
          <h2 className="text-2xl font-semibold">Order Details</h2>
          <div className="space-y-2 pt-4">
            <div>
              <div className="flex justify-start">
                <span>Full name:&nbsp;</span>
                <span>{searchParams.get("name")}</span>
              </div>
              <div className="flex justify-start">
                <span>Email:&nbsp;</span>
                <span>{searchParams.get("email")}</span>
              </div>
              <div className="flex justify-start">
                <span>OPGG:&nbsp;</span>
                <span>{searchParams.get("opgg")}</span>
              </div>
            </div>
          </div>
          <ul className="flex flex-col space-y-2 pt-4">
            {cart.cartItems.map((item) => (
              <>
                <li
                  key={item.product.id}
                  className="flex items-start justify-between"
                >
                  <h3>
                    {item.product.name}{" "}
                    <span className="text-sm dark:text-violet-600">
                      x{item.quantity}
                    </span>
                  </h3>
                  <div className="text-right">
                    <span className="block">
                      <Currency value={item.product.price * item.quantity} />
                    </span>
                    <span className="text-sm dark:text-gray-600">à $1.75</span>
                  </div>
                </li>
              </>
            ))}
          </ul>
          <div className="space-y-2 pt-4">
            <div className="space-y-6">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold">
                  <Currency value={totalPrice} />
                </span>
              </div>
              <div>
                {displayPaypalButtons ? (
                  <>
                    {showSpinner && isPending && <div className="spinner" />}
                    <PayPalButtons
                      style={{ layout: "vertical" }} // Fix: Change the type of the `style` object to match the expected type
                      disabled={disable}
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  </>
                ) : (
                  <div className="text-center">Payment completed</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderReview;
