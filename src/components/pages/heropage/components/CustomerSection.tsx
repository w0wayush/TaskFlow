import React from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronRight } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-yellow-500 text-yellow-500"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ))}
  </div>
);

const TestimonialCard = ({
  quote,
  name,
  title,
}: {
  quote: string;
  name: string;
  title: string;
}) => (
  <Card className="group relative bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 transition-all duration-300 border-white/10 overflow-hidden">
    <CardContent className="p-8">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl rounded-full transform translate-x-8 -translate-y-8" />

      <Quote className="w-8 h-8 mb-6 text-blue-400 opacity-50" />

      <p className="text-lg text-gray-100 mb-6 leading-relaxed relative z-10">
        "{quote}"
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white mb-1">{name}</p>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MetricCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

export default function CustomerSection() {
  return (
    <div className="bg-gradient-to-b from-black via-slate-950 to-[#121212] py-32 relative overflow-hidden -mx-10">
      {/* Background elements */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(59,130,246,0.1),transparent)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Customer Success Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-8"
          >
            Trusted by innovative teams worldwide
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            <MetricCard value="4.9/5" label="Average Rating" />
            <MetricCard value="69+" label="Reviews" />
            <MetricCard value="92%" label="Satisfaction Rate" />
            <MetricCard value="1M+" label="Tasks Completed" />
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>View all customer stories</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "TaskFlow revolutionized our team's productivity. The intuitive interface and powerful features make it a game-changer.",
    name: "Alex Chen",
    title: "Engineering Director, TechCorp",
  },
  {
    quote:
      "We saw a 40% increase in project completion rates within the first month of using TaskFlow.",
    name: "Sarah Johnson",
    title: "Project Manager, InnovateCo",
  },
  {
    quote:
      "The collaborative features have made remote work seamless. It's become an essential tool for our global team.",
    name: "Michael Rodriguez",
    title: "Operations Lead, GlobalTech",
  },
  {
    quote:
      "TaskFlow's analytics helped us identify and eliminate workflow bottlenecks we didn't even know existed.",
    name: "Emily Zhang",
    title: "Product Manager, FutureSoft",
  },
  {
    quote:
      "The customizable workflows and automation features have saved us countless hours of manual work.",
    name: "David Kumar",
    title: "CTO, AgileStack",
  },
];
