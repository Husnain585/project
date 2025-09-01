import React from "react";
import Hero from "../components/home/Hero";
import ProductGrid from "../components/products/ProductGrid";
import useProducts from "../hooks/useProducts"; // custom hook


const Home = () => {
  // Custom hook handles fetching, loading, and fallback
  const { products, loading } = useProducts();

  return (
    <div className="min-h-screen">
      <Hero />

      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Featured Products
        </h1>

        <ProductGrid products={loading ? [] : products} loading={loading} />
      </section>
    </div>
  );
};

export default Home;
