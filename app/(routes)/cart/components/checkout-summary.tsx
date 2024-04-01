"use client";

import useCart from "@/hooks/use-cart";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CheckoutSummary = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [opgg, setOpgg] = useState("");
  const cart = useCart();
  const [orderId, setorderId] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(false);
  const [displayPaypalButtons, setDisplayPaypalButtons] = useState(false);
  const [{ isPending }] = usePayPalScriptReducer();
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [inputDisabled, setInputDisabled] = useState(false);

  const totalPrice = cart.cartItems
    .reduce((total, item) => {
      return total + Number(item.product.price * item.quantity);
    }, 0)
    .toFixed(2);

  // Step 2: Handle Form Submission
  const handleSubmit = (event: any) => {
    event.preventDefault();

    try {
      // Gather form data
      setName(event.target.name.value);
      setEmail(event.target.email.value);
      setOpgg(event.target.opgg.value);
      console.log("name", name);
      console.log("email", email);
      console.log("opgg", opgg);
      setDisplayPaypalButtons(true);
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
        },
      });
      setInputDisabled(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const items = cart.cartItems.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    unit_amount: {
      currency_code: "EUR",
      value: item.product.price,
    },
  }));
  const createOrder = async (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            items: items,
            amount: {
              currency_code: "EUR",
              value: totalPrice,
              breakdown: {
                item_total: {
                  currency_code: "EUR",
                  value: totalPrice,
                },
              },
            },
            intent: "CAPTURE",
          },
        ],
        application_context: {
          brand_name: "RPSHOP",
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then(async (data: any) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              opgg,
              cartItems: cart.cartItems,
            }),
          },
        );
        const res = await response.json();
        setorderId(res.order.id);
        return data;
      });
    console.log("orderId createOrder", orderId);
  };
  const onApprove = (data: any, actions: any) => {
    console.log("orderId onApprove", orderId);
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              opgg,
              cartItems: cart.cartItems,
            }),
          },
        );
        const res = await response.json();
        // router.push(`/completed-order/${res.order.id}`);
        const orderID = res.order.id;
        router.push(`/completed-order/${orderID}`);
        setorderId(orderID);
        console.log("orderId submit", orderId);

        // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        //   method: "PATCH",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ orderId, isPaid }),
        // });
        cart.removeAll();
        // router.push(`/completed-order/${orderId}`);
      } catch (error) {
        setError(true);
      }
    });
  };
  const onError = (err: Record<string, unknown>) => {
    setError(true);
    toast.error("payment error", {
      icon: "🛒",
      style: {
        background: "#d62828",
        borderRadius: "5px",
        color: "#003049",
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-4 mb-32 mt-20 w-full space-y-6 rounded-md p-8 shadow sm:mx-auto  sm:max-w-xl dark:bg-bannerColor"
    >
      <h2 className="w-full text-3xl font-bold leading-tight">Contact us</h2>
      <div className="">
        <label className="mb-1 ml-1 block">
          <span className="label-text ">Full Name</span>
        </label>
        <input
          className="input input-bordered input-primary block w-full  rounded p-2 text-black focus:outline-none focus:ring focus:ring-opacity-25 dark:bg-gray-300 focus:dark:ring-violet-600"
          name="name"
          type="text"
          placeholder="Ethan Mick"
          required
          maxLength={50}
        />
      </div>
      <div>
        <label className="label mb-1 ml-1 block font-semibold">
          <span className="label-text ">Email</span>
        </label>
        <input
          className="input input-bordered  input-primary block w-full rounded p-2 text-black focus:outline-none focus:ring focus:ring-opacity-25 dark:bg-gray-300 focus:dark:ring-violet-600"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          maxLength={50}
        />
      </div>
      <div>
        <label className="mb-1 ml-1 block">
          <span className="label-text ">opgg</span>
        </label>
        <input
          className="input input-bordered input-primary block w-full  rounded p-2 text-black focus:outline-none focus:ring focus:ring-opacity-25 dark:bg-gray-300 focus:dark:ring-violet-600"
          name="opgg"
          type="text"
          placeholder="Ethan Mick"
          required
          maxLength={50}
        />
      </div>
      <div>
        {displayPaypalButtons ? (
          isPending ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="h-4 w-4 animate-pulse rounded-full dark:bg-buttonColor"></div>
              <div className="h-4 w-4 animate-pulse rounded-full dark:bg-buttonColor"></div>
              <div className="h-4 w-4 animate-pulse rounded-full dark:bg-buttonColor"></div>
            </div>
          ) : (
            <PayPalButtons
              onApprove={onApprove}
              onError={onError}
              createOrder={createOrder}
            />
          )
        ) : (
          <div className="flex justify-between space-x-4">
            <button
              onClick={() => router.back()}
              type="button"
              className="rounded-md border px-6 py-2 dark:border-buttonColor2"
            >
              Back to shop
            </button>
            <button
              type="submit"
              className="rounded-md border bg-gradient-to-r from-buttonColor2 to-buttonColor px-6 py-2 dark:border-buttonColor2 dark:text-gray-900"
            >
              <span className="sr-only sm:not-sr-only">Checkout</span>
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default CheckoutSummary;
