"use client";
import { AtSign, CreditCard, ShoppingCart } from "lucide-react";
import StepsCard from "./steps-card";

const Steps = () => {
  return (
    <section className="p-6 mt-20 dark:dark:bg-primary dark:dark:text-gray-100">
      <div className="container mx-auto">
        <div className="grid gap-6 my-16 lg:grid-cols-3">
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
