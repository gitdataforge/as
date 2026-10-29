import { motion } from 'framer-motion';

// Simple, non-technical business translations for 13+ Indian languages
const awardTranslations = {
  en: ["Best Privacy Tool 2026", "Certified Security", "Trusted Choice"],
  hi: ["सर्वश्रेष्ठ प्राइवेसी टूल 2026", "प्रमाणित सुरक्षा", "भरोसेमंद विकल्प"],
  mr: ["सर्वोत्तम प्रायव्हसी टूल 2026", "प्रमाणित सुरक्षा", "विश्वासार्ह पर्याय"],
  ta: ["சிறந்த தனியுரிமை கருவி 2026", "சான்றளிக்கப்பட்ட பாதுகாப்பு", "நம்பகமான தேர்வு"],
  te: ["ఉత్తమ గోప్యతా సాధనం 2026", "ధృవీకరించబడిన భద్రత", "నమ్మకమైన ఎంపిక"],
  kn: ["ಅತ್ಯುತ್ತಮ ಗೌಪ್ಯತೆ ಸಾಧನ 2026", "ಪ್ರಮಾಣೀಕೃತ ಭದ್ರತೆ", "ವಿಶ್ವಾಸಾರ್ಹ ಆಯ್ಕೆ"],
  bn: ["সেরা গোপনীয়তা টুল 2026", "প্রত্যয়িত নিরাপত্তা", "বিশ্বস্ত পছন্দ"],
  gu: ["શ્રેષ્ઠ ગોપનીયતા સાધન 2026", "પ્રમાણિત સુરક્ષા", "વિશ્વસનીય પસંદગી"],
  pa: ["ਸਭ ਤੋਂ ਵਧੀਆ ਪ੍ਰਾਈਵੇਸੀ ਟੂਲ 2026", "ਪ੍ਰਮਾਣਿਤ ਸੁਰੱਖਿਆ", "ਭਰੋਸੇਮੰਦ ਵਿਕਲਪ"],
  ml: ["മികച്ച സ്വകാര്യതാ ഉപകരണം 2026", "സാക്ഷ്യപ്പെടുത്തിയ സുരക്ഷ", "വിശ്വസനീയമായ തിരഞ്ഞെടുപ്പ്"],
  or: ["ଶ୍ରେଷ୍ଠ ଗୋପନୀୟତା ଉପକରଣ 2026", "ପ୍ରମାଣିତ ସୁରକ୍ଷା", "ବିଶ୍ୱସ୍ତ ପସନ୍ଦ"],
  as: ["শ্ৰেষ্ঠ গোপনীয়তা সঁজুলি 2026", "প্ৰমাণিত সুৰক্ষা", "বিশ্বাসযোগ্য বিকল্প"],
  ur: ["بہترین پرائیویسی ٹول 2026", "تصدیق شدہ سیکیورٹی", "قابل اعتماد انتخاب"],
  sa: ["उत्तम गोपनीयता साधनम् 2026", "प्रमाणिता सुरक्षा", "विश्वसनीयः विकल्पः"]
};

// Reusable Blue Laurel Wreath SVG Component
const LaurelWreath = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
    <path d="M25 80 C 10 60, 10 30, 40 10 C 45 25, 30 45, 25 80 Z" fill="var(--brand-blue)" opacity="0.9" />
    <path d="M75 80 C 90 60, 90 30, 60 10 C 55 25, 70 45, 75 80 Z" fill="var(--brand-blue)" opacity="0.9" />
    <path d="M15 65 C 5 45, 15 20, 35 5 C 40 20, 25 35, 15 65 Z" fill="var(--brand-blue)" opacity="0.7" />
    <path d="M85 65 C 95 45, 85 20, 65 5 C 60 20, 75 35, 85 65 Z" fill="var(--brand-blue)" opacity="0.7" />
    <circle cx="50" cy="85" r="4" fill="var(--brand-blue)" />
  </svg>
);

export default function AwardsBanner({ language = 'en' }) {
  // Use provided language or fallback to English
  const awards = awardTranslations[language] || awardTranslations['en'];

  // Animation logic for staggering the appearance of the badges
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-[var(--surface)] border-y border-[var(--border)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {awards.map((text, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-6 bg-[var(--surface-secondary)] rounded-lg shadow-sm border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors duration-300"
            >
              <LaurelWreath />
              <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mt-2">
                {text}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}