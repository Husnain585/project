import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/category");
        setCategories(res.data.categories || res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading categories...</p>;
  if (categories.length === 0)
    return <p className="text-center mt-10">No categories found</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-10"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.categoryId || index}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow rounded-lg p-6 text-center cursor-pointer"
          >
            <Link
              to={`/category/${category.categoryId}`}
              className="text-lg font-semibold hover:text-blue-600"
            >
              {category.name}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;
