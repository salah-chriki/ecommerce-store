import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Currency from "@/components/currency";
import ProductsList from "@/components/products-list";

import Image from "next/image";

import { Metadata } from "next";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler, useState } from "react";
import ProductInfo from "./components/product-info";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export async function generateStaticParams() {
  const products = await getProducts({});

  return products.map((product) => ({
    params: {
      productId: product.id,
    },
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.productId);
  return {
    title: product.name,
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);
  const products = await getProducts({
    categoryId: product.category.id,
  });

  const suggestedProducts = products.slice(0, 4);

  return (
    <div>
      <div className=" mt-28 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 flex flex-col md:flex-row">
            <div className="px-4 md:flex-1">
              <div className="mb-4 h-[460px] w-[580px]  rounded-lg">
                <Image
                  className="h-full w-full object-cover"
                  src={product.imageUrl}
                  alt={product.name}
                  width={500}
                  height={460}
                />
              </div>
            </div>
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      <section className="mb-20 sm:pb-12 xl:mx-60">
        <div className="container mx-auto space-y-8 px-6">
          <ProductsList
            title="Related Products"
            products={suggestedProducts}
            hideButton={true}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
