import { motion } from 'framer-motion';
import IpScanner from '../tests/IpScanner';
import WebRtcLeak from '../tests/WebRtcLeak';
import CanvasFingerprint from '../tests/CanvasFingerprint';
import IsometricStack from '../ui/IsometricStack';

// Simple, non-technical business translations for 13+ Indian languages
const engineTranslations = {
  en: { title: "Security Checking System", sub: "Real tests for your protection" },
  hi: { title: "सुरक्षा जांच प्रणाली", sub: "आपकी सुरक्षा के लिए वास्तविक परीक्षण" },
  mr: { title: "सुरक्षा तपासणी प्रणाली", sub: "तुमच्या सुरक्षिततेसाठी वास्तविक चाचण्या" },
  ta: { title: "பாதுகாப்பு சோதனை அமைப்பு", sub: "உங்கள் பாதுகாப்புக்கான உண்மையான சோதனைகள்" },
  te: { title: "భద్రతా తనిఖీ వ్యవస్థ", sub: "మీ రక్షణ కోసం నిజమైన పరీక్షలు" },
  kn: { title: "ಭದ್ರತಾ ತಪಾಸಣಾ ವ್ಯವಸ್ಥೆ", sub: "ನಿಮ್ಮ ರಕ್ಷಣೆಗಾಗಿ ನೈಜ ಪರೀಕ್ಷೆಗಳು" },
  bn: { title: "নিরাপত্তা চেকিং সিস্টেম", sub: "আপনার সুরক্ষার জন্য বাস্তব পরীক্ষা" },
  gu: { title: "સુરક્ષા ચકાસણી સિસ્ટમ", sub: "તમારી સુરક્ષા માટે વાસ્તવિક પરીક્ષણો" },
  pa: { title: "ਸੁਰੱਖਿਆ ਜਾਂਚ ਸਿਸਟਮ", sub: "ਤੁਹਾਡੀ ਸੁਰੱਖਿਆ ਲਈ ਅਸਲ ਟੈਸਟ" },
  ml: { title: "സുരക്ഷാ പരിശോധന സംവിധാനം", sub: "നിങ്ങളുടെ സംരക്ഷണത്തിനായുള്ള യഥാർത്ഥ പരിശോധനകൾ" },
  or: { title: "ସୁରକ୍ଷା ଯାଞ୍ଚ ବ୍ୟବସ୍ଥା", sub: "ଆପଣଙ୍କ ସୁରକ୍ଷା ପାଇଁ ପ୍ରକୃତ ପରୀକ୍ଷଣ" },
  as: { title: "সুৰক্ষা পৰীক্ষা ব্যৱস্থা", sub: "আপোনাৰ সুৰক্ষাৰ বাবে প্ৰকৃত পৰীক্ষা" },
  ur: { title: "حفاظتی چیکنگ کا نظام", sub: "آپ کے تحفظ کے لیے حقیقی ٹیسٹ" },
  sa: { title: "सुरक्षा परीक्षण तन्त्रम्", sub: "भवतः रक्षणार्थं वास्तविकपरीक्षणानि" }
};

export default function EngineFeatures({ language = 'en' }) {
  // Use provided language or fallback to English
  const content = engineTranslations[language] || engineTranslations['en'];

  return (
    <section className="w-full bg-[var(--background)] py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-medium">
            {content.sub}
          </p>
        </div>

        {/* Split Layout: Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
          
          {/* Left Side: Real Technical Tests connected by a vertical line */}
          <div className="relative border-l border-[var(--border-strong)] ml-4 pl-8 space-y-12 py-4">
            
            {/* Real IP Scanner Component */}
            <div className="relative">
              {/* Connector Dot */}
              <div className="absolute -left-[37px] top-6 w-2 h-2 bg-[var(--brand-blue)] rounded-none"></div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <IpScanner />
              </motion.div>
            </div>

            {/* Real WebRTC Leak Component */}
            <div className="relative">
              {/* Connector Dot */}
              <div className="absolute -left-[37px] top-6 w-2 h-2 bg-[var(--brand-blue)] rounded-none"></div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <WebRtcLeak />
              </motion.div>
            </div>

            {/* Real Canvas Fingerprint Component */}
            <div className="relative">
              {/* Connector Dot */}
              <div className="absolute -left-[37px] top-6 w-2 h-2 bg-[var(--brand-blue)] rounded-none"></div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <CanvasFingerprint />
              </motion.div>
            </div>

          </div>

          {/* Right Side: Isometric 3D Stack */}
          <div className="flex items-center justify-center lg:sticky lg:top-32 h-fit">
            <IsometricStack language={language} />
          </div>

        </div>
      </div>
    </section>
  );
}