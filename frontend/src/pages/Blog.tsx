import React from "react";
import { motion } from "framer-motion";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Appbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {loading || !blog ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center h-[calc(100vh-200px)]"
          >
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <FullBlog blog={blog} />
        )}
      </motion.div>
    </div>
  );
};
