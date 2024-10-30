import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

export function FooterSection() {
  return (
    <footer className="relative bg-gradient-to-br from-[#121212] to-slate-950 text-gray-300">
      {/* Decorative top border */}
      {/* <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" /> */}

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TaskFlow
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Empowering teams with intelligent task management solutions.
              Transform the way you work with our intuitive platform.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <a
                href="mailto:contact@taskflow.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+1234567890"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={20} />
              </a>
              <a
                href="/location"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MapPin size={20} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Solutions</h3>
            <ul className="space-y-3">
              {[
                "Project Management",
                "Task Tracking",
                "Team Collaboration",
                "Time Management",
              ].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`}>
                    <p className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Blog", "Press"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`}>
                    <p className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://facebook.com"
                className="flex items-center justify-center h-12 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="flex items-center justify-center h-12 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center justify-center h-12 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                className="flex items-center justify-center h-12 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy">
                <p className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </p>
              </Link>
              <Link href="/terms">
                <p className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
