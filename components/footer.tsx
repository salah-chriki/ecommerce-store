"use Client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="  mt-auto divide-y divide-gray-100 divide-opacity-5 px-4 pt-8 dark:bg-footerColor">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-8 px-24 pb-10 lg:flex-row lg:space-y-0">
        <div className="grid items-start lg:w-1/3">
          <a
            rel="noopener noreferrer"
            href="/"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <Image src="/favicon.ico" alt="RPSHOP" width={30} height={25} />
            <span className=" self-center text-2xl font-semibold  ">
              RPSHOP
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-8 text-sm sm:grid-cols-2 lg:w-2/3">
          <div className="space-y-3">
            <h3 className="tracki uppercase">Need Help?</h3>
            <ul className="space-y-1">
              <li>
                <Link href={"/contact-us"} className=" hover:text-buttonColor">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href={"/faqs"} className=" hover:text-buttonColor">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracki uppercase ">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link href={"/privacy"} className=" hover:text-buttonColor">
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href={"/terms-and-conditions"}
                  className=" hover:text-buttonColor"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  href={"/return-refund-policy"}
                  className=" hover:text-buttonColor"
                >
                  Refunds & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="space-y-3">
            <div className="uppercase ">Social media</div>
            <div className="flex justify-start space-x-3"></div>
          </div> */}
        </div>
      </div>
      <div></div>
      <div className="py-2 text-center font-sans text-sm dark:text-muted">
        lolrp.shop is not endorsed by Riot Games and does not reflect the views
        or opinions of Riot Games or anyone officially involved in producing or
        managing League of Legends. League of Legends and Riot Games are
        trademarks or registered trademarks of Riot Games, Inc. League of
        Legends © Riot Games, Inc.
        <br />
        While all our codes are legally obtained by authorized Riot resellers,
        Riot Games does not endorse this website or officially affiliated with
        it.
      </div>
    </footer>
  );
};

export default Footer;
