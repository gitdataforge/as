import { motion } from 'framer-motion';

// Real business statistics translated into 14 Indian languages using simple terms
const statsTranslations = {
  en: [
    { value: "87%", label: "Indians faced online scams" },
    { value: "51%", label: "Lost money to online fraud" },
    { value: "29L+", label: "Cyber attacks stopped yearly" },
    { value: "13", label: "Fake messages received daily" }
  ],
  hi: [
    { value: "87%", label: "भारतीयों ने ऑनलाइन धोखाधड़ी का सामना किया" },
    { value: "51%", label: "ऑनलाइन धोखाधड़ी में पैसे खोए" },
    { value: "29L+", label: "हर साल रोके गए साइबर हमले" },
    { value: "13", label: "रोज मिलने वाले फर्जी संदेश" }
  ],
  mr: [
    { value: "87%", label: "भारतीयांनी ऑनलाइन फसवणुकीचा सामना केला" },
    { value: "51%", label: "ऑनलाइन फसवणुकीत पैसे गमावले" },
    { value: "29L+", label: "दरवर्षी रोखलेले सायबर हल्ले" },
    { value: "13", label: "दररोज मिळणारे बनावट संदेश" }
  ],
  ta: [
    { value: "87%", label: "இந்தியர்கள் ஆன்லைன் மோசடிகளை எதிர்கொண்டனர்" },
    { value: "51%", label: "ஆன்லைன் மோசடியில் பணத்தை இழந்தனர்" },
    { value: "29L+", label: "ஒவ்வொரு ஆண்டும் தடுக்கப்பட்ட சைபர் தாக்குதல்கள்" },
    { value: "13", label: "தினசரி பெறப்படும் போலி செய்திகள்" }
  ],
  te: [
    { value: "87%", label: "భారతీయులు ఆన్‌లైన్ మోసాలను ఎదుర్కొన్నారు" },
    { value: "51%", label: "ఆన్‌లైన్ మోసంలో డబ్బు కోల్పోయారు" },
    { value: "29L+", label: "ప్రతి సంవత్సరం ఆపబడిన సైబర్ దాడులు" },
    { value: "13", label: "ప్రతిరోజూ వచ్చే నకిలీ సందేశాలు" }
  ],
  kn: [
    { value: "87%", label: "ಭಾರತೀಯರು ಆನ್‌ಲೈನ್ ವಂಚನೆಗಳನ್ನು ಎದುರಿಸಿದ್ದಾರೆ" },
    { value: "51%", label: "ಆನ್‌ಲೈನ್ ವಂಚನೆಯಲ್ಲಿ ಹಣ ಕಳೆದುಕೊಂಡಿದ್ದಾರೆ" },
    { value: "29L+", label: "ಪ್ರತಿ ವರ್ಷ ತಡೆಯಲಾದ ಸೈಬರ್ ದಾಳಿಗಳು" },
    { value: "13", label: "ಪ್ರತಿದಿನ ಬರುವ ನಕಲಿ ಸಂದೇಶಗಳು" }
  ],
  bn: [
    { value: "87%", label: "ভারতীয়রা অনলাইন প্রতারণার শিকার হয়েছেন" },
    { value: "51%", label: "অনলাইন প্রতারণায় টাকা হারিয়েছেন" },
    { value: "29L+", label: "প্রতি বছর সাইবার হামলা থামানো হয়েছে" },
    { value: "13", label: "প্রতিদিন পাওয়া ভুয়ো বার্তা" }
  ],
  gu: [
    { value: "87%", label: "ભારતીયોએ ઓનલાઈન છેતરપિંડીનો સામનો કર્યો" },
    { value: "51%", label: "ઓનલાઈન છેતરપિંડીમાં પૈસા ગુમાવ્યા" },
    { value: "29L+", label: "દર વર્ષે અટકાવવામાં આવતા સાયબર હુમલા" },
    { value: "13", label: "દરરોજ મળતા નકલી સંદેશાઓ" }
  ],
  pa: [
    { value: "87%", label: "ਭਾਰਤੀਆਂ ਨੇ ਆਨਲਾਈਨ ਧੋਖਾਧੜੀ ਦਾ ਸਾਹਮਣਾ ਕੀਤਾ" },
    { value: "51%", label: "ਆਨਲਾਈਨ ਧੋਖਾਧੜੀ ਵਿੱਚ ਪੈਸੇ ਗੁਆਏ" },
    { value: "29L+", label: "ਹਰ ਸਾਲ ਰੋਕੇ ਗਏ ਸਾਈਬਰ ਹਮਲੇ" },
    { value: "13", label: "ਰੋਜ਼ਾਨਾ ਮਿਲਣ ਵਾਲੇ ਜਾਅਲੀ ਸੁਨੇਹੇ" }
  ],
  ml: [
    { value: "87%", label: "ഇന്ത്യക്കാർ ഓൺലൈൻ തട്ടിപ്പുകൾ നേരിട്ടു" },
    { value: "51%", label: "ഓൺലൈൻ തട്ടിപ്പിൽ പണം നഷ്ടപ്പെട്ടു" },
    { value: "29L+", label: "എല്ലാ വർഷവും തടയപ്പെടുന്ന സൈബർ ആക്രമണങ്ങൾ" },
    { value: "13", label: "ദിവസവും ലഭിക്കുന്ന വ്യാജ സന്ദേശങ്ങൾ" }
  ],
  or: [
    { value: "87%", label: "ଭାରତୀୟମାନେ ଅନଲାଇନ୍ ଠକେଇର ସମ୍ମୁଖୀନ ହୋଇଛନ୍ତି" },
    { value: "51%", label: "ଅନଲାଇନ୍ ଠକେଇରେ ଟଙ୍କା ହରାଇଛନ୍ତି" },
    { value: "29L+", label: "ପ୍ରତିବର୍ଷ ବନ୍ଦ ହୋଇଥିବା ସାଇବର ଆକ୍ରମଣ" },
    { value: "13", label: "ପ୍ରତିଦିନ ଆସୁଥିବା ନକଲି ବାର୍ତ୍ତା" }
  ],
  as: [
    { value: "87%", label: "ভাৰতীয়সকলে অনলাইন প্ৰৱঞ্চনাৰ সন্মুখীন হৈছে" },
    { value: "51%", label: "অনলাইন প্ৰৱঞ্চনাত ধন হেৰুৱাইছে" },
    { value: "29L+", label: "প্ৰতি বছৰে বন্ধ কৰা চাইবাৰ আক্ৰমণ" },
    { value: "13", label: "প্ৰতিদিনে অহা ভুৱা বাৰ্তা" }
  ],
  ur: [
    { value: "87%", label: "ہندوستانیوں نے آن لائن فراڈ کا سامنا کیا" },
    { value: "51%", label: "آن لائن فراڈ میں پیسے گنوائے" },
    { value: "29L+", label: "ہر سال روکے گئے سائبر حملے" },
    { value: "13", label: "روزانہ ملنے والے جعلی پیغامات" }
  ],
  sa: [
    { value: "87%", label: "भारतीयाः अन्तर्जाल-वञ्चनाम् अनुभूतवन्तः" },
    { value: "51%", label: "अन्तर्जाल-वञ्चनायां धनं नष्टम्" },
    { value: "29L+", label: "प्रतिवर्षं निवारिताः जालगोपन-आक्रमणाः" },
    { value: "13", label: "प्रतिदिनं प्राप्ताः कूट-सन्देशाः" }
  ]
};

export default function ImpactStats({ language = 'en' }) {
  // Use provided language or fallback to English
  const stats = statsTranslations[language] || statsTranslations['en'];

  // Animation variants for smooth fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-[var(--background)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Strict CSS Grid with thin borders */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--border-strong)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex flex-col justify-between p-8 border-r border-b border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors duration-300 min-h-[220px]"
            >
              <h4 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-8">
                {stat.label}
              </h4>
              
              {/* Massive, thin typography for percentages and numbers */}
              <div className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter text-[var(--text-primary)]">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}