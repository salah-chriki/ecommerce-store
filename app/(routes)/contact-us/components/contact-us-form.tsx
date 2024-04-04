"use client";

import postContact from "@/actions/post-contact";
import { FormEvent, useState } from "react";
import { set } from "react-hook-form";

const ContactUsForm = () => {
  const [isSubmitted, setSubmitted] = useState(false);

  return isSubmitted ? (
    <div>
      <h1
        className="text-center text-3xl font-semibold
        "
      >
        Thank you for your message!
      </h1>
      {/* <Confetti /> */}
    </div>
  ) : (
    <>
      <section className="bg-primary">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                At the same time, the fact that we are wholly owned and totally
                independent from manufacturer and other group control gives you
                confidence that we will only recommend what is right for you.
              </p>

              <div className="mt-8">
                <a href="#" className="text-2xl font-bold text-pink-600">
                  {" "}
                  0151 475 4450{" "}
                </a>

                <address className="mt-2 not-italic">
                  282 Kevin Brook, Imogeneborough, CA 58517
                </address>
              </div>
            </div>

            <div className="rounded-lg bg-bannerColor p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form
                action={async (formData) => {
                  setSubmitted(true);
                  await postContact(formData);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    required={true}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    name="name"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <input
                      required={true}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Email address"
                      type="email"
                      name="email"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="opgg">
                      OP/GG
                    </label>
                    <input
                      required={true}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="OP/GG"
                      type="text"
                      name="opgg"
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>

                  <textarea
                    required={true}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Message"
                    rows={8}
                    name="message"
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <form
        action={async (formData) => {
          await postContact(formData);
        }}
        // onSubmit={onSubmit}
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
          <label className="label mb-1 ml-1 block font-semibold">
            <span className="label-text ">Message</span>
          </label>
          <textarea
            className="textarea textarea-primary autoexpand block w-full rounded p-2 text-black focus:outline-none focus:ring focus:ring-opacity-25 dark:bg-gray-300 focus:dark:ring-violet-600"
            name="message"
            required
          ></textarea>
        </div>
        <button
          className="btn btn-primary  w-full rounded px-4 py-2 font-bold shadow hover:ring focus:outline-none focus:ring focus:ring-opacity-50 dark:bg-violet-600 dark:text-gray-50 hover:dark:ring-violet-600 focus:dark:ring-violet-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ContactUsForm;
