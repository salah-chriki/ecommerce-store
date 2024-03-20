"use client";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const HomeHero = () => {
  const router = useRouter();
  return (
    <section className="bg-heroColor text-gray-100">
      <div className="container mx-auto flex flex-col items-center px-8 py-16 text-center sm:px-16 md:py-32 ">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          GAMEWAR&apos;s league of legends
          <span className=" text-buttonColor"> RPSHOP</span>
        </h1>
        <p className="mb-12 mt-8 px-8 text-lg">
          There&apos;s no better place out there forcheap league of legends riot
          poits
        </p>
        <div className="flex flex-wrap justify-center">
          <button
            onClick={() => router.push("/all")}
            className="group flex w-40 cursor-pointer select-none items-center justify-center rounded-md bg-buttonColor py-3  text-black transition"
          >
            <div className="group flex w-full  items-center justify-center rounded text-center text-lg font-bold">
              Shop now
            </div>
            <MoveRight className="flex-0 h-6 w-0 transition-all group-hover:mr-4 group-hover:w-6" />
          </button>
          {/* <button className="px-8 py-3 ml-2 text-lg border rounded text-gray-50 border-gray-700">
            Learn more
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
