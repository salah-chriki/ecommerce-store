"use client";

import { ChevronDown, ChevronRight, CircleChevronDown } from "lucide-react";
import { useState } from "react";

interface FaqsCardProps {
  header: string;
  text: string;
}

const FaqsCard = ({ header, text }: FaqsCardProps) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    event?.preventDefault();
    setActive(!active);
  };
  return (
    <div className="mb-8 p-2 w-full rounded-lg bg-bannerColor  dark:bg-dark-2  sm:p-3 lg:px-6 xl:px-8">
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="w-full">
          <p className="py-2 text-base leading-relaxed text-body-color dark:text-dark-6">
            {header}
          </p>
        </div>
        <div className=" flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-cardColor/5">
          <CircleChevronDown
            className={`fill-primary stroke-muted duration-200 ease-in-out ${
              active ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`pl-[62px] duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
          {text}
        </p>
      </div>
    </div>
  );
};
export default FaqsCard;
