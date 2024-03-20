import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds policy",
};

const ReturnRefundPolicyPage = () => {
  return (
    <article className="mx-auto mb-24 max-w-3xl space-y-12 rounded-md px-10 pb-10 pt-20  dark:bg-bannerColor dark:text-gray-50">
      <div className="mx-auto w-full space-y-4 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Refunds & Returns{" "}
        </h1>
      </div>
      <div className="dark:text-gray-100">
        <h1>
          <b>Returns &amp; Refunds policy</b>
        </h1>
        <p></p>
        <div>
          <ul>
            <li>Any game top up that have been credited is final.</li>
            <li>
              If you have entered the wrong login credentials/player id to top
              up, once the order is delivered, no refunds can be given, but if
              the wrong ID does not exist, we may be able to grant a refund or a
              resend to the correct ID.
            </li>
          </ul>
        </div>
        <p>
          You are entitled to cancel your order before the RP is processed to
          your desired account without giving any reason for doing so.
          <br />
          <br />
          The deadline for canceling an order is the date your order has been
          processed by us. Keep in mind that orders are typically processed in
          under 1 hour. We advise not ordering if you have second thoughts, a
          cancellation may not be possible anymore.
          <br />
          <br />
          In order to exercise your right of cancellation, you must inform us of
          your decision by means of a clear statement.
          <br />
          <br />
          You can inform us of your decision by using the contact us form
          <br />
          <br />
          We will use the same means of payment as you used for the order, and
          you will not incur any fees for such reimbursement.
          <br />
          <br />
        </p>
        <h1>Contact Us</h1>
        <p>
          If you have any questions about our Returns and Refunds Policy, please
          contact us by using the contact us form or via admin@lolrp.shop
        </p>
      </div>
    </article>
  );
};

export default ReturnRefundPolicyPage;
