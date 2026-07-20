import React from 'react';
import { motion } from 'framer-motion';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#0F172A] flex flex-col items-center justify-center z-[99999]">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
          className="w-16 h-16 bg-gradient-to-tr from-primary via-secondary to-accent shadow-2xl"
        />
        <div className="absolute w-6 h-6 bg-white dark:bg-slatebg-dark rounded-full animate-ping" />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-8 text-slatefg-dark text-xs font-semibold tracking-widest uppercase font-inter"
      >
        Loading Experience
      </motion.p>
    </div>
  );
};

export default PageLoader;
