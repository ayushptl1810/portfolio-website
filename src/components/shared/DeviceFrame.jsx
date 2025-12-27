import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DeviceFrame = ({ image, alt = "Project screenshot" }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto perspective-1000">
      {/* Laptop Base Frame */}
      <motion.div
        initial={{ rotateX: 10, y: 50, opacity: 0 }}
        animate={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Screen Bezel */}
        <div className="bg-gray-800 rounded-t-xl p-2 pb-0 shadow-2xl border border-gray-700">
          {/* Camera Dot */}
          <div className="w-full flex justify-center py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          </div>

          {/* Screen Content Area */}
          <div className="bg-black rounded-t-lg overflow-hidden border border-gray-900 relative aspect-video">
            {/* Browser Header Mockup */}
            <div className="bg-gray-900 h-6 flex items-center px-4 space-x-2 border-b border-gray-800">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-gray-800 w-1/2 h-3.5 rounded-full opacity-50"></div>
              </div>
            </div>

            {/* The Actual Image/Scroll Content */}
            <div className="w-full h-full overflow-hidden bg-gray-900 relative group">
              {image ? (
                <motion.img
                  src={image}
                  alt={alt}
                  className="w-full h-full object-contain object-center transition-all duration-500 ease-in-out"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
                  <span className="text-4xl mb-2">🖼️</span>
                  <span className="text-sm">No Preview Available</span>
                </div>
              )}

              {/* Scanline/Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Laptop Bottom Deck */}
        <div className="bg-gray-700 h-4 w-full rounded-b-xl relative z-20 shadow-lg flex justify-center">
          <div className="w-32 h-1 bg-gray-600 rounded-b-md"></div>
        </div>
      </motion.div>

      {/* Keyboard/Reflection Shadow area (Optional aesthetic) */}
      <div className="absolute -bottom-8 left-0 right-0 h-8 bg-black/40 blur-xl transform scale-x-90 rounded-full"></div>
    </div>
  );
};

export default DeviceFrame;
