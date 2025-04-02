// pages/404.js
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* 404 Large Title */}
      <h1 className="text-9xl font-extrabold text-red-500 animate-pulse">
        404
      </h1>

      {/* Error Message */}
      <p className="text-2xl mt-4 font-semibold">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <p className="text-lg mt-2 text-gray-400">
        It looks like nothing was found at this location.
      </p>

      {/* Decorative Line */}
      <div className="w-20 h-1 bg-red-500 mt-6"></div>

      {/* Button to navigate back to Home */}
      <Link href="/">
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-indigo-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out">
          Go Back to Homepage
        </div>
      </Link>

      {/* Additional Links */}
      {/* <div className="mt-6 flex gap-4">
        <Link href="/contact">
          <a className="text-blue-400 hover:underline">Contact Us</a>
        </Link>
        <Link href="/faq">
          <a className="text-blue-400 hover:underline">FAQs</a>
        </Link>
      </div> */}

      {/* Decorative Circle Animation */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-3xl opacity-30"></div>
      </div>
    </div>
  );
}
