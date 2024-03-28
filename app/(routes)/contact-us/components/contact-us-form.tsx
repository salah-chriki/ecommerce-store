"use client";

import postContact from "@/actions/post-contact";
import { FormEvent, useState } from "react";

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
  );
};

export default ContactUsForm;
