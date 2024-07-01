/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  id: string;
  createdDate: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  id,
  authorName,
  title,
  content,
}) => {
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const plainTextContent = stripHtml(content);
  const previewContent =
    plainTextContent.length > 150
      ? `${plainTextContent.slice(0, 150)}...`
      : plainTextContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-slate-200 pb-4 w-full hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
    >
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Avatar name={authorName} />
            </motion.div>
            <p className="font-semibold">{authorName}</p>
          </div>
          <p className="text-slate-500 text-sm">
            {" "}
            Posted on {new Date().toLocaleDateString()}
          </p>
        </div>
        <motion.h2
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h2>
        <p className="text-gray-600">{previewContent}</p>
        <Link to={`/blog/${id}`} className="text-blue-500 hover:underline">
          <motion.span
            whileHover={{ x: 5 }}
            className="inline-flex items-center"
          >
            Read more
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ${
        size === "small" ? "w-8 h-8" : "w-12 h-12"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-bold text-white`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
