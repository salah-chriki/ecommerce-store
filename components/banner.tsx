import { Clock3, HandCoins, LockKeyhole, Truck, icons } from "lucide-react";
import BannerItem from "./banner-item";

const Banner = () => {
  return (
    <section className="sm: m-4 mx-10 rounded-md bg-bannerColor px-4 py-6 md:m-8">
      <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BannerItem
          title="Fast Delivery"
          description="fast delivery of your oredrs"
        >
          <Truck className="text-white" />
        </BannerItem>
        <BannerItem title="100% Money Back" description="strong refund policy">
          <HandCoins />
        </BannerItem>
        <BannerItem title="24/7 Support" description="contact us 24/7">
          <Clock3 />
        </BannerItem>
        <BannerItem
          title="Secure Payments"
          description="Secure payments with 256-bit SSL"
        >
          <LockKeyhole />
        </BannerItem>
      </div>
    </section>
  );
};

export default Banner;
