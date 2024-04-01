"use client";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const OrderCompleted = () => {
  const router = useRouter();
  return (
    <section className="flex h-full items-center sm:p-16">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center space-y-8 px-5 text-center sm:max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 40 40"
        >
          <path
            fill="#98ccfd"
            d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"
          ></path>
          <path
            fill="#4788c7"
            d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"
          ></path>
          <g>
            <path
              fill="#fff"
              d="M16.025 28.02L9.118 21.113 11.24 18.992 16.025 23.777 28.118 11.684 30.24 13.805z"
            ></path>
          </g>
        </svg>

        <p className="text-3xl">
          Looks like our services are currently offline
        </p>
        <button
          onClick={() => router.push("/")}
          className="group flex w-40 cursor-pointer select-none items-center justify-center rounded-md bg-gradient-to-r from-buttonColor2 to-buttonColor py-3  text-black transition"
        >
          <div className="group flex w-full  items-center justify-center rounded text-center text-lg font-bold">
            Shop now
          </div>
          <MoveRight className="flex-0 h-6 w-0 transition-all group-hover:mr-4 group-hover:w-6" />
        </button>
      </div>
    </section>
  );
};

export default OrderCompleted;
