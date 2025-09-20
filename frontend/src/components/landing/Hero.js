import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Award, Heart, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';

const Hero = ({ onExploreClick }) => {
  const { isAuthenticated } = useAuth();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { value: "50+", label: "Sweet Varieties", icon: <Star className="w-5 h-5" /> },
    { value: "1000+", label: "Happy Customers", icon: <Heart className="w-5 h-5" /> },
    { value: "4.9", label: "Average Rating", icon: <Award className="w-5 h-5" /> }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-indigo-100 to-fuchsia-100"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              filter: 'blur(60px)',
              opacity: 0.2,
              zIndex: 0
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <motion.div 
          className="text-center max-w-4xl w-full py-20"
          initial="hidden"
          animate="show"
          variants={container}
        >

          <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
            <span className="block">Experience the</span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
                Sweet Magic
              </span>
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-3 bg-indigo-100 -z-0 rounded-full"
                initial={{ scaleX: 0.8, opacity: 0.5 }}
                animate={{ scaleX: 1, opacity: 0.8 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </span>
            <span className="block">of Traditional Delights</span>
          </motion.h1>

          <motion.p variants={item} className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Handcrafted with love and traditional recipes passed down through generations. 
            Each sweet tells a story of rich heritage and authentic flavors.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={onExploreClick}
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-fuchsia-500 hover:from-indigo-700 hover:to-fuchsia-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={item}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-fuchsia-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-indigo-600 group-hover:text-fuchsia-500 transition-colors">
                    {stat.icon}
                  </span>
                </div>
                <span className="text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
