import React from "react";
import { motion } from "framer-motion";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog: React.FC<{ blog: Blog }> = ({ blog }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Appbar />
      <div className="flex justify-center pt-20">
        <div className="grid grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-8"
          >
            <article className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6 sm:p-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  {blog.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-slate-500 mb-6"
                >
                  Posted on {new Date().toLocaleDateString()}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </article>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-12 lg:col-span-4"
          >
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-slate-600 text-lg font-semibold mb-4">
                Author
              </h2>
              <div className="flex items-center">
                <div className="pr-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Avatar size="big" name={blog.author.name || "Anonymous"} />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {blog.author.name || "Anonymous"}
                  </h3>
                  <p className="mt-2 text-slate-500">
                    follow for more information..
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
