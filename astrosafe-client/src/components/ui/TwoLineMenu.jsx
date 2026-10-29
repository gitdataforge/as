import { motion } from 'framer-motion';

// Business translations for 13+ Indian languages to ensure maximum accessibility
const menuTranslations = {
  en: "Menu",
  hi: "मेनू",       // Hindi
  mr: "मेनू",       // Marathi
  ta: "மெனு",      // Tamil
  te: "మెను",      // Telugu
  kn: "ಮೆನು",      // Kannada
  bn: "মেনু",       // Bengali
  gu: "મેનુ",       // Gujarati
  pa: "ਮੇਨੂ",       // Punjabi
  ml: "മെനു",      // Malayalam
  or: "ମେନୁ",       // Odia
  as: "মেনু",       // Assamese
  ur: "مینو",       // Urdu
  sa: "मेनू"        // Sanskrit
};

export default function TwoLineMenu({ isOpen, onClick, language = 'en' }) {
  // Use the requested language or fallback to English
  const ariaLabelText = menuTranslations[language] || menuTranslations['en'];

  // Framer motion animation rules for the top line (rotates 45 degrees down)
  const topLineAnimation = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 4 }
  };

  // Framer motion animation rules for the bottom line (rotates -45 degrees up)
  const bottomLineAnimation = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -4 }
  };

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabelText}
      title={ariaLabelText}
      className="flex flex-col justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] rounded-md text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors duration-200"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          x1="4"
          y1="8"
          x2="20"
          y2="8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          variants={topLineAnimation}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ originX: "50%", originY: "50%" }}
        />
        <motion.line
          x1="4"
          y1="16"
          x2="20"
          y2="16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          variants={bottomLineAnimation}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ originX: "50%", originY: "50%" }}
        />
      </svg>
    </button>
  );
}