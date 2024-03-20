import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Currency from "@/components/currency";
import ProductsList from "@/components/products-list";

import Image from "next/image";

import { Metadata } from "next";

interface ProductPageProps {
  params: {
    productId: string;
  };
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
            <div className="px-4 md:flex-1">
              <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
                {product.name}
              </h2>

              <div className="mb-4 flex">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    <Currency value={product.price} />
                  </span>
                </div>
                <div>
                  <span className="mr-2 font-bold text-gray-700 dark:text-gray-300">
                    Category:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.category.name}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div className="mt-2 flex items-center">
                  <button className="mr-2 h-6 w-6 rounded-full bg-gray-800 dark:bg-gray-200"></button>
                  <button className="mr-2 h-6 w-6 rounded-full bg-red-500 dark:bg-red-700"></button>
                  <button className="mr-2 h-6 w-6 rounded-full bg-blue-500 dark:bg-blue-700"></button>
                  <button className="mr-2 h-6 w-6 rounded-full bg-yellow-500 dark:bg-yellow-700"></button>
                </div>
              </div>
              <div className="mb-4">
                <div className="-mx-2 mb-4 flex">
                  <div className="w-1/2 px-2">
                    <button className="w-full rounded-full bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Add to Wishlist
                    </button>
                  </div>
                  <div className="w-1/2 px-2">
                    <button className="w-full rounded-md bg-buttonColor px-4 py-2 font-bold text-black hover:bg-orange-400 dark:bg-buttonColor dark:hover:bg-orange-400">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <ul>
                  <li>
                    - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                </ul>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet.
                  Duis dapibus augue vel ipsum pretium, et venenatis sem
                  blandit. Quisque ut erat vitae nisi ultrices placerat non eget
                  velit. Integer ornare mi sed ipsum lacinia, non sagittis
                  mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
                  tincidunt mi consectetur.
                </p>
              </div>
            </div>
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
