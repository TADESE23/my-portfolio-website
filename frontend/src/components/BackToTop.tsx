import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.3 }}
          whileHover={{ y: -4, shadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-primary hover:bg-secondary text-white shadow-xl focus:outline-none z-[999] transition-colors duration-300 border border-white/20 glass"
          aria-label="Back to top"
        >
          <FaChevronUp className="w-4 h-4 animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
// Wait! Let's double check if we need to remove the comment. Yes, the import works fine.
