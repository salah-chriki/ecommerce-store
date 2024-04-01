"use client";

import { useForm } from "react-hook-form";
import Currency from "@/components/currency";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import FormField from "@/components/ui/form-field";
import { FormData, UserSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const Summary = () => {
  const router = useRouter();
  const cart = useCart();
  const [inputDisabled, setInputDisabled] = useState(false);
  const totalPrice = cart.cartItems
    .reduce((total, item) => {
      return total + Number(item.product.price * item.quantity);
    }, 0)
    .toFixed(2);

  type ValidationSchemaType = z.infer<typeof UserSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  const [isPaid, setIsPaid] = useState(false);

  const cartItems = cart.cartItems;

  const onSubmit = async (data: FormData) => {
    try {
      setInputDisabled(true);

      const { name, email, opgg } = data;
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
      const res = await response.json();
      const orderId = res.orderId;
      if (orderId) {
        router.push(
          `/complete-order/${orderId}?name=${name}&email=${email}&opgg=${opgg}`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  flex max-h-screen w-full flex-col space-y-4 divide-y p-6 sm:p-10 lg:w-1/3 dark:divide-gray-700 dark:bg-bannerColor dark:text-gray-100">
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
            {/* {displayPaypalButtons ? (
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
            ) : ( */}
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
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
