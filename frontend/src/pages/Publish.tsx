import React, { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBold, FaItalic, FaHeading, FaImage, FaLink } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-100 rounded-lg sticky top-0 z-10"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${
          editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        <FaBold />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${
          editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        <FaItalic />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 1 })
            ? "bg-blue-500 text-white"
            : "bg-white"
        }`}
      >
        <FaHeading />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const url = prompt("Enter image URL:");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded bg-white"
      >
        <FaImage />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const url = prompt("Enter URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className="p-2 rounded bg-white"
      >
        <FaLink />
      </motion.button>
    </motion.div>
  );
};

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
  });

  const handlePublish = async () => {
    if (!editor) return;
    setIsPublishing(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: editor.getHTML(),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate(`/blog/${response.data.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error publishing post:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Appbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-6">
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full p-3 mb-4 text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
              placeholder="Your awesome title here..."
            />
            <MenuBar editor={editor} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative"
            >
              <EditorContent
                editor={editor}
                className="prose max-w-none min-h-[300px] border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              {!editor?.getText() && (
                <div className="absolute top-0 left-0 p-4 text-gray-400 pointer-events-none">
                  Start writing your amazing blog post...
                </div>
              )}
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePublish}
              disabled={isPublishing}
              className="mt-6 w-full px-5 py-3 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition duration-300 disabled:opacity-50"
            >
              {isPublishing ? "Publishing..." : "Publish post"}
            </motion.button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg"
          >
            Post published successfully! Redirecting...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
