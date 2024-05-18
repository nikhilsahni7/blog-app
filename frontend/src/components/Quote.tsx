// quote.tsx
import React from "react";

const Quote: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8 bg-gray-800">
      <blockquote className="max-w-2xl text-lg font-semibold italic text-white px-4 sm:px-0 md:px-6 lg:px-8">
        <p>
          "I don't care if it works on your machine! We are not shipping your
          machine!"
        </p>
        <cite className="mt-2 block text-right text-sm text-gray-400">
          - Vidiu Platon, software engineer.
        </cite>
      </blockquote>
    </div>
  );
};

export default Quote;
