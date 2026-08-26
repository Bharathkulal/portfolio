import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Toggle theme (currently ${theme})`}
      className="p-2.5 rounded-full border border-brand-border bg-brand-card/40 hover:border-brand-accent/40 text-brand-textPrimary flex items-center justify-center transition-colors relative overflow-hidden"
    >
      <motion.div
        key={theme}
        initial={{ y: 15, opacity: 0, rotate: -40 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: -15, opacity: 0, rotate: 40 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {theme === 'dark' ? (
          <Sun size={15} className="text-brand-accent" />
        ) : (
          <Moon size={15} className="text-brand-blue" />
        )}
      </motion.div>
    </motion.button>
  );
}
