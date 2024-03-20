import getCategories from "@/actions/get-categories";
import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import ProductCard from "@/components/product-card";
import { Metadata } from "next";

interface CategoryProductsPageProps {
  params: {
    categoryId: string;
  };
}
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    params: {
      categoryId: category.id,
    },
  }));
}

export async function generateMetadata({
  params,
}: CategoryProductsPageProps): Promise<Metadata> {
  const category = await getCategory(params.categoryId);
  return {
    title: category.name,
  };
}

const CategoryProductsPage = async ({ params }: CategoryProductsPageProps) => {
  const products = await getProducts({
    categoryId: params.categoryId,
  });
  return (
    <>
      {products ? (
        <section className="py-6 sm:py-12 xl:mx-60">
          <div className="container mx-auto space-y-8 p-6">
            <div className="space-y-2 text-start">
              <h2 className="text-3xl font-bold">
                {products[0]?.category.name}
              </h2>
              <p className="font-serif text-sm dark:text-gray-400">
                {products[0]?.category.name}{" "}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
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

export default CategoryProductsPage;
