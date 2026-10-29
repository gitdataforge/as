import { motion } from 'framer-motion';

// Business translations for 13+ Indian languages using simple, clear terms
const systemTranslations = {
  en: "Security System",
  hi: "सुरक्षा प्रणाली",
  mr: "सुरक्षा प्रणाली",
  ta: "பாதுகாப்பு அமைப்பு",
  te: "భద్రతా వ్యవస్థ",
  kn: "ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆ",
  bn: "নিরাপত্তা ব্যবস্থা",
  gu: "સુરક્ષા સિસ્ટમ",
  pa: "ਸੁਰੱਖਿਆ ਸਿਸਟਮ",
  ml: "സുരക്ഷാ സംവിധാനം",
  or: "ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା",
  as: "সুৰক্ষা ব্যৱস্থা",
  ur: "حفاظتی نظام",
  sa: "सुरक्षा तन्त्रम्"
};

export default function IsometricStack({ language = 'en', className = "" }) {
  // Use provided language or fallback to English
  const ariaLabelText = systemTranslations[language] || systemTranslations['en'];

  // Framer motion continuous floating animation rules
  const floatAnimation = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div 
      className={`flex items-center justify-center p-12 ${className}`} 
      aria-label={ariaLabelText} 
      title={ariaLabelText}
    >
      <motion.div
        className="relative w-48 h-48"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(60deg) rotateZ(-45deg)"
        }}
        variants={floatAnimation}
        animate="animate"
      >
        {/* Bottom Layer */}
        <div 
          className="absolute inset-0 bg-[var(--surface-secondary)] border border-[var(--border-strong)] opacity-30" 
          style={{ transform: "translateZ(0px)" }}
        ></div>
        
        {/* Middle Layer 1 */}
        <div 
          className="absolute inset-0 bg-[var(--surface-secondary)] border border-[var(--border-strong)] opacity-50" 
          style={{ transform: "translateZ(40px)" }}
        ></div>
        
        {/* Middle Layer 2 */}
        <div 
          className="absolute inset-0 bg-[var(--surface-secondary)] border border-[var(--border-strong)] opacity-80" 
          style={{ transform: "translateZ(80px)" }}
        ></div>
        
        {/* Top Layer - Solid Electric Blue */}
        <div 
          className="absolute inset-0 bg-[var(--brand-blue)] border-2 border-[var(--brand-blue-hover)] shadow-2xl flex items-center justify-center" 
          style={{ transform: "translateZ(120px)" }}
        >
          {/* Abstract geometric graphic on the top layer */}
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--brand-white)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ transform: "rotateZ(45deg) rotateX(-60deg)" }}
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}