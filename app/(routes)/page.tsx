import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import Faqs from "@/components/faqs";
import HomeHero from "@/components/home-hero";
import ProductsList from "@/components/products-list";
import Steps from "@/components/steps";
import Container from "@/components/ui/container";
import { Suspense } from "react";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  return (
    <div>
      <Container>
        <div>
          <HomeHero />
          <Banner />
          <Suspense fallback={<div>Loading...</div>}>
            <div className=" gap-y-8 px-6 sm:px-8 lg:px-12">
              <ProductsList
                title="Featured Products"
                products={products}
                hideButton={false}
              />
            </div>
          </Suspense>
          <Steps />
          <Faqs />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
