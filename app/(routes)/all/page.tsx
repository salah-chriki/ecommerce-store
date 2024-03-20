import getProducts from "@/actions/get-products";
import ProductCard from "@/components/product-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
};

const AllProducts = async () => {
  const allProducts = await getProducts({});
  return (
    <>
      {allProducts ? (
        <section className="py-6 sm:py-12 xl:mx-60">
          <div className="container mx-auto space-y-8 p-6">
            <div className="space-y-2 text-start">
              <h2 className="text-3xl font-bold">All Products</h2>
              <p className="font-serif text-sm dark:text-gray-400">
                All of our pproducts
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="text-white">No results.</div>
      )}
    </>
  );
};

export default AllProducts;
