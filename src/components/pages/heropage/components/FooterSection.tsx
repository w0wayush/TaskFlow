import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export function FooterSection() {
  return (
    <div className="bg-slate-950 border-t-2 border-t-slate-400 text-white py-10">
      <div className="container mx-auto ">
        {/* Footer Top Section */}
        <div className="flex flex-wrap justify-between">
          {/* TaskFlow Brand */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-2xl font-bold mb-4">TaskFlow</h2>
            <p className="text-sm">
              Your ultimate task management solution to manage, optimize, track,
              and discuss tasks efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <p className="hover:underline">About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/features">
                  <p className="hover:underline">Features</p>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <p className="hover:underline">Pricing</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className="hover:underline">Contact</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">Support</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/help-center">
                  <p className="hover:underline">Help Center</p>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <p className="hover:underline">Privacy Policy</p>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <p className="hover:underline">Terms of Service</p>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <p className="hover:underline">FAQ</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="bg-white text-indigo-900 p-2 rounded-full"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                className="bg-white text-indigo-900 p-2 rounded-full"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                className="bg-white text-indigo-900 p-2 rounded-full"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com"
                className="bg-white text-indigo-900 p-2 rounded-full"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} TaskFlow. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
