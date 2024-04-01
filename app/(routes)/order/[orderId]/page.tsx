"use client";
import useCart from "@/hooks/use-cart";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const CompletedOrderPage = () => {
  const router = useRouter();
  const params = useParams();
  const cart = useCart();

  const totalPrice = cart.cartItems
    .reduce((total, item) => {
      return total + Number(item.product.price * item.quantity);
    }, 0)
    .toFixed(2);

  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(false);

  const displayPaypalButtons = true;
  const orderId = params.orderId;

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
      .then((data: any) => {
        return data;
      });
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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId, isPaid }),
        });
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
    <div className="flex max-w-md flex-col space-y-4 divide-y p-6 sm:w-96 sm:p-10 dark:divide-gray-300 dark:bg-bannerColor dark:text-mutedPrimary">
      <h2 className="text-2xl font-semibold">Order items</h2>
      <ul className="flex flex-col space-y-2 pt-4">
        <li className="flex items-start justify-between">
          <h3>
            Hard taco, chicken
            <span className="text-sm dark:text-violet-600">x3</span>
          </h3>
          <div className="text-right">
            <span className="block">$7.50</span>
            <span className="text-sm dark:text-gray-600">à $2.50</span>
          </div>
        </li>
        <li className="flex items-start justify-between">
          <h3>
            Hard taco, beef
            <span className="text-sm dark:text-violet-600">x3</span>
          </h3>
          <div className="text-right">
            <span className="block">$8.25</span>
            <span className="text-sm dark:text-gray-600">à $2.75</span>
          </div>
        </li>
        <li className="flex items-start justify-between">
          <h3>
            Curly fries
            <span className="text-sm dark:text-violet-600">x1</span>
          </h3>
          <div className="text-right">
            <span className="block">$1.75</span>
            <span className="text-sm dark:text-gray-600">à $1.75</span>
          </div>
        </li>
        <li className="flex items-start justify-between">
          <h3>
            Large soda
            <span className="text-sm dark:text-violet-600">x2</span>
          </h3>
          <div className="text-right">
            <span className="block">$4.00</span>
            <span className="text-sm dark:text-gray-600">à $2.00</span>
          </div>
        </li>
      </ul>
      <div className="space-y-2 pt-4">
        <div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$21.50</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mt-1 h-3 w-3 fill-current dark:text-violet-600"
            >
              <path d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z"></path>
              <path d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z"></path>
            </svg>
            <span className="dark:text-gray-600">
              Spend $20.00, get 20% off
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>-$4.30</span>
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>$0.50</span>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span>Delivery fee</span>
            <span>$4.00</span>
          </div>
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-xs hover:underline dark:text-violet-600"
          >
            How do our fees work?
          </a>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-semibold">$22.70</span>
          </div>
          <div>
            {displayPaypalButtons ? (
              <PayPalButtons
                onApprove={onApprove}
                onError={onError}
                createOrder={createOrder}
              />
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
        </div>
      </div>
    </div>
  );
};

export default CompletedOrderPage;
