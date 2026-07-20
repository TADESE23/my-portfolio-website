import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slatebg-dark py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center space-y-6 bg-white dark:bg-slatebg-card border border-slate-200 dark:border-slatebg-border/60 rounded-3xl p-8 shadow-xl"
      >
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-inter">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Page Not Found</h2>
          <p className="text-xs text-slatefg-muted dark:text-slatefg-dark/70 font-inter leading-relaxed">
            The page you are looking for might have been relocated, deleted, or never existed in the first place.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block w-full py-3.5 bg-primary hover:bg-secondary text-white font-bold rounded-2xl shadow-md transition-all duration-300 font-inter text-sm"
        >
          Return to Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;
