import React from "react";
import Hero from "../components/home/Hero";
import ProductGrid from "../components/products/ProductGrid";
import useProducts from "../hooks/useProducts"; // custom hook
import { useGlobalContext } from "../context/GlobalContext"; // categories context
import { Link } from "react-router-dom";

const Home = () => {
  const { products, loading } = useProducts();
  const { categories } = useGlobalContext(); // get categories from global context

  // Optional: pick first 6 as featured products
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Featured Products
        </h1>

        <ProductGrid products={loading ? [] : featuredProducts} loading={loading} />
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-white text-center">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.length === 0 ? (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
              No categories available
            </p>
          ) : (
            categories.map((category, index) => (
              <Link
                key={category.id || index}
                to={`/products?category=${category.id}`}
                className="border rounded-lg p-4 flex items-center justify-center text-center hover:shadow-lg transition dark:bg-gray-800 dark:text-white"
              >
                {category.name}
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
