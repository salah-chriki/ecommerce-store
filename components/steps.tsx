"use client";
import { AtSign, CreditCard, ShoppingCart } from "lucide-react";
import StepsCard from "./steps-card";

const Steps = () => {
  return (
    <section className="mt-20 pl-3 pr-6 dark:dark:bg-primary dark:dark:text-gray-100">
      <div className="container mx-auto">
        <div className="my-16 grid gap-6 lg:grid-cols-3">
          <StepsCard
            title="Select an RP pack(s)"
            description="Pick your desired League of Legends Riot Points pack(s)"
          >
            <ShoppingCart />{" "}
          </StepsCard>
          <StepsCard
            title="Select an RP pack(s)"
            description="Pick your desired League of Legends Riot Points pack(s)"
          >
            <CreditCard />{" "}
          </StepsCard>
          <StepsCard
            title="Select an RP pack(s)"
            description="Pick your desired League of Legends Riot Points pack(s)"
          >
            <AtSign />{" "}
          </StepsCard>
        </div>
      </div>
    </section>
  );
};

export default Steps;
