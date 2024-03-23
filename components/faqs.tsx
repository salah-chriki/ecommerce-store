"use client";

import FaqsCard from "./faqs-card";

const Faqs = () => {
  const faqsList = [
    {
      header: "Is there any ban risk?",
      text: "So far there are no known bans during the time our site has been operating.",
    },
    {
      header: "When will I get my RP?",
      text: "Your RP is typically delivered within minutes. While the owner is sleeping, petting his cat or doing other non computer activities your order may take up to 10 hours to be delivered. There is no friend request or login details needed. Your account remains in your possession. You may gift your friends with it too.",
    },
    {
      header: "Why is your RP so cheap?",
      text: "Our RP codes are obtained from regions with cheaper pricing. We do not use prime capsules, or other means to deliver your RP. ",
    },
    {
      header: "I can't find a payment method",
      text: "we use PayPay to process your payments",
    },
    {
      header: "Need additional help?",
      text: "check our contact us page",
    },
  ];
  return (
    <section className="dark:bg-dark relative z-20  overflow-hidden pb-12 pt-10 lg:pb-[90px] lg:pt-[40px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-2 mb-[60px] max-w-[620px] text-center sm:mx-auto lg:mb-20">
              <h2 className="text-dark mb-4 text-3xl font-bold sm:text-[40px]/[48px] dark:text-white">
                Frequently Asked{" "}
                <span className="text-buttonColor">Questions</span>
              </h2>
              <p className="text-body-color dark:text-dark-6 text-base">
                Still have questions, check out our contact page to see if we
                can answer them
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="mx-6 w-full px-6 lg:mx-12 lg:px-48">
            {faqsList.map((faq, index) => (
              <FaqsCard key={index} header={faq.header} text={faq.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
