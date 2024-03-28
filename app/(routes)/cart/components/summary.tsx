"use client";
import { SubmitHandler, set, useForm } from "react-hook-form";
import Currency from "@/components/currency";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import FormField from "@/components/ui/form-field";
import { FormData, UserSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Summary = () => {
  const router = useRouter();
  const cart = useCart();
  const [inputDisabled, setInputDisabled] = useState(false);
  const totalPrice = cart.cartItems.reduce((total, item) => {
    return total + Number(item.product.price * item.quantity);
  }, 0);
  type ValidationSchemaType = z.infer<typeof UserSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  const [displayPaypalButtons, setDisplayPaypalButtons] = useState(false);
  const [{ isPending }] = usePayPalScriptReducer();
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (displayPaypalButtons) {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
        },
      });
    }
  }, [dispatch, displayPaypalButtons, options]);

  useEffect(() => {}, [paymentSuccess]);

  const [orderId, setOrderId] = useState("");
  const cartItems = cart.cartItems;

  const items = cart.cartItems.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    unit_amount: {
      currency_code: "EUR",
      value: item.product.price,
    },
  }));

  const createOrder = (data: any, actions: any) => {
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
            // intent: "CAPTURE",
          },
        ],
        application_context: {
          brand_name: "RPSHOP",
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID: string) => {
        // setOrderId(orderId);
        return orderID;
      });
  };

  const onApprove = (data: any, actions: any) => {
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
      setPaymentSuccess(true);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderId),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => {
          setError(true);
        });
    });
  };

  const onError = (err: Record<string, unknown>) => {
    setError(true);
    toast.error("Error.", {
      icon: "🛒",
      style: {
        background: "#d62828",
        borderRadius: "5px",
        color: "#003049",
      },
    });
  };

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (
    data: FormData,
  ) => {
    try {
      setDisplayPaypalButtons(true);
      const { name, email, opgg } = data;
      setInputDisabled(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, opgg, cartItems }),
        },
      );
      const dataRes = await response.json();
      setOrderId(dataRes);
    } catch (error) {
      setError(true);
      setDisplayPaypalButtons(false);
    }
  };

  return (
    <div className="  flex max-h-screen w-full flex-col space-y-4 divide-y p-6 sm:p-10 lg:w-1/3 dark:divide-gray-700 dark:bg-bannerColor dark:text-gray-100">
      {paymentSuccess ? (
        <div className="text-center">Payment successful</div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">Your details</h2>
          <div className="space-y-2 pt-4">
            <form className="container ">
              <div className="mt-2">
                <label className="mb-1 ml-1 block">
                  <span className="label-text ">Full Name</span>
                </label>
                <FormField
                  inputDisabled={inputDisabled}
                  type="text"
                  placeholder="Full name"
                  name="name"
                  register={register}
                  error={errors.name}
                />
              </div>
              <div className="mt-2">
                <label className="label mb-1 ml-1 block font-semibold">
                  <span className="label-text ">Email</span>
                </label>
                <FormField
                  inputDisabled={inputDisabled}
                  type="email"
                  placeholder="Email"
                  name="email"
                  register={register}
                  error={errors.email}
                />
              </div>
              <div className="mt-2">
                <label className="label mb-1 ml-1 block font-semibold">
                  <span className="label-text ">OP/GG</span>
                </label>
                <FormField
                  inputDisabled={inputDisabled}
                  type="text"
                  placeholder="OP/GG"
                  name="opgg"
                  register={register}
                  error={errors.opgg}
                />
              </div>
            </form>
          </div>
          <div className="space-y-2 pt-4">
            <div className="space-y-6">
              <div className="flex justify-between">
                <span>Total amount:</span>
                <span>
                  <Currency value={totalPrice} />
                </span>
              </div>

              <div>
                {displayPaypalButtons ? (
                  isPending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-4 w-4 animate-pulse rounded-full dark:bg-primary"></div>
                      <div className="h-4 w-4 animate-pulse rounded-full dark:bg-primary"></div>
                      <div className="h-4 w-4 animate-pulse rounded-full dark:bg-primary"></div>
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
                      onClick={handleSubmit(onSubmit)}
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
        </>
      )}
    </div>
  );
};

export default Summary;
