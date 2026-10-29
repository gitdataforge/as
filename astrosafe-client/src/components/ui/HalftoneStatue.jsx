import { motion } from 'framer-motion';

// Business translations for 13+ Indian languages using simple, clear terms
const captionTranslations = {
  en: "Security Symbol",
  hi: "सुरक्षा प्रतीक",
  mr: "सुरक्षा चिन्ह",
  ta: "பாதுகாப்பு சின்னம்",
  te: "భద్రతా చిహ్నం",
  kn: "ಸುರಕ್ಷತಾ ಚಿಹ್ನೆ",
  bn: "নিরাপত্তা প্রতীক",
  gu: "સુરક્ષા પ્રતીક",
  pa: "ਸੁਰੱਖਿਆ ਪ੍ਰਤੀਕ",
  ml: "സുരക്ഷാ ചിഹ്നം",
  or: "ସୁରକ୍ଷା ପ୍ରତୀକ",
  as: "সুৰক্ষা প্ৰতীক",
  ur: "حفاظتی علامت",
  sa: "सुरक्षा प्रतीकम्"
};

export default function HalftoneStatue({ 
  imageSrc, 
  language = 'en', 
  className = "" 
}) {
  // Use provided language or fallback to English
  const altText = captionTranslations[language] || captionTranslations['en'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative overflow-hidden bg-[var(--brand-white)] ${className}`}
    >
      {/* Base Grayscale Image Layer */}
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={altText} 
          className="w-full h-full object-cover filter grayscale contrast-125"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[var(--text-muted)] font-bold text-sm uppercase tracking-widest p-4 text-center">
          {altText}
        </div>
      )}

      {/* SVG Dot Matrix Pattern Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="halftoneDots" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.5" fill="#000000" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#halftoneDots)" />
        </svg>
      </div>

      {/* Electric Blue Screen Blend Layer (Maps darks to blue, lights to white) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          backgroundColor: 'var(--brand-blue)', 
          mixBlendMode: 'screen' 
        }}
        aria-hidden="true"
      ></div>
    </motion.div>
  );
}