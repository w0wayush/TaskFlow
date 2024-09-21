"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
    comment: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 120, damping: 15 };
  const x = useMotionValue(0);

  // Transforming motion values for rotation and translation
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-20, 20]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-30, 30]),
    springConfig
  );

  // Handle mouse movement to adjust tooltip position
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2; // Get half the width of the image
    x.set(event.nativeEvent.offsetX - halfWidth); // Set motion value based on mouse position
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="relative group"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)} // Show tooltip on hover
          onMouseLeave={() => setHoveredIndex(null)} // Hide tooltip when not hovering
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }} // Initial tooltip state
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 15,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }} // Exit tooltip animation
                style={{ translateX: translateX, rotate: rotate }} // Apply transformations
                className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center bg-gray-800 text-white rounded-lg shadow-lg p-4 z-50"
              >
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="text-sm text-gray-300">{item.designation}</div>
                <div className="mt-2 text-sm">{item.comment}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            onMouseMove={handleMouseMove} // Attach mouse move handler
            height={80}
            width={80}
            src={item.image}
            alt={item.name}
            className="rounded-full border-4 border-gray-300 transition-transform transform group-hover:scale-110"
          />
        </div>
      ))}
    </>
  );
};
