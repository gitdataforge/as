import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const skipLinkTranslations = {
  en: "Skip to main content",
  hi: "मुख्य सामग्री पर जाएं",
  mr: "मुख्य आशयावर जा",
  ta: "முக்கிய உள்ளடக்கத்திற்குச் செல்",
  te: "ప్రధాన కంటెంట్‌కు వెళ్లండి",
  kn: "ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ",
  bn: "মূল বিষয়ে যান",
  gu: "મુખ્ય સામગ્રી પર જાઓ",
  pa: "ਮੁੱਖ ਸਮੱਗਰੀ 'ਤੇ ਜਾਓ",
  ml: "പ്രധാന ഉള്ളടക്കത്തിലേക്ക് പോകുക",
  or: "ମୁଖ୍ୟ ବିଷୟବସ୍ତୁକୁ ଯାଆନ୍ତୁ",
  as: "মূল সমললৈ যাওক",
  ur: "مرکزی مواد پر جائیں",
  sa: "मुख्यसामग्रीं गच्छन्तु"
};

export default function Layout() {
  const location = useLocation();
  const { language = 'en' } = useTheme();
  const skipText = skipLinkTranslations[language] || skipLinkTranslations['en'];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] transition-colors duration-300">
      
      {/* Accessibility link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--brand-blue)] focus:text-[var(--brand-white)] focus:px-4 focus:py-2 focus:rounded-sm focus:outline-none shadow-lg"
      >
        {skipText}
      </a>

      {/* Top Navigation */}
      <Navbar />
      
      {/* Dynamic Page Content with Framer Motion Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          id="main-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-grow w-full flex flex-col"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      
      {/* Bottom Copyright and Branding */}
      <Footer />

    </div>
  );
}