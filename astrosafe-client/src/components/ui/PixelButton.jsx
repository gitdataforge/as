import { motion } from 'framer-motion';

// Business translations for 13+ Indian languages using simple, clear terms
const buttonTranslations = {
  en: "Continue",
  hi: "आगे बढ़ें",
  mr: "पुढे जा",
  ta: "தொடரவும்",
  te: "కొనసాగించు",
  kn: "ಮುಂದುವರಿಯಿರಿ",
  bn: "চালিয়ে যান",
  gu: "ચાલુ રાખો",
  pa: "ਜਾਰੀ ਰੱਖੋ",
  ml: "തുടരുക",
  or: "ଆଗକୁ ବଢନ୍ତୁ",
  as: "অব্যাহত ৰাখক",
  ur: "جاری رکھیں",
  sa: "अग्रे गच्छतु"
};

export default function PixelButton({ 
  onClick, 
  children, 
  language = 'en',
  type = "button",
  className = "" 
}) {
  // Use provided children text or fallback to the translated simple business term
  const displayText = children || buttonTranslations[language] || buttonTranslations['en'];
  
  // CSS clip-path logic to slice off the top-left and bottom-right corners strictly
  const pixelClipPath = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ clipPath: pixelClipPath }}
      className={`bg-[var(--brand-black)] text-[var(--brand-white)] dark:bg-[var(--brand-white)] dark:text-[var(--brand-black)] px-6 py-3 font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-[var(--brand-blue)] dark:hover:bg-[var(--brand-blue)] hover:text-[var(--brand-white)] dark:hover:text-[var(--brand-white)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] ${className}`}
    >
      {displayText}
    </motion.button>
  );
}