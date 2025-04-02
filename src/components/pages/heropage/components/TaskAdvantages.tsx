import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { motion } from "framer-motion";
import { Clock, CheckSquare, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export function TaskAdvantages() {
  const { user } = useSelector((state: RootState) => state.user);
  // const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered);
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Tracking",
      description: "Monitor your productivity with precise time tracking",
    },
    {
      icon: <CheckSquare className="w-6 h-6" />,
      title: "Task Management",
      description: "Organize and prioritize your tasks efficiently",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Progress Analytics",
      description: "Track your performance with detailed insights",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team members",
    },
  ];

  return (
    <div className="min-h-screen -mx-10 xl:mt-64 lg:mt-20 md:mt-24 sm:mt-20 mt-24 bg-gradient-to-b from-[#121212] via-slate-900 to-[#121212] mb-10">
      {/* Hero Section */}
      <div className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            TaskFlow
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Transform your workflow with intelligent task management and time
            tracking
          </p>

          {/* CTA Button */}
          <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // onClick={() => router.push(user ? "/kanban" : "/signup")}
            className="relative inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold text-white overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
            <Link className="relative" href={user ? "/kanban" : "/signup"}>
              {user ? "Go to Dashboard" : "Get Started Free"}
            </Link>
          </motion.button>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-7xl mx-auto mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 backdrop-blur-lg"
            >
              <div className="text-purple-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
