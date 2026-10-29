import { motion } from 'framer-motion';

// Simple, non-technical business translations for 14 Indian languages
const integrationTranslations = {
  en: "Works with your browser",
  hi: "आपके ब्राउज़र के साथ काम करता है",
  mr: "तुमच्या ब्राउझरसोबत काम करते",
  ta: "உங்கள் உலாவியுடன் வேலை செய்கிறது",
  te: "మీ బ్రౌజర్‌తో పనిచేస్తుంది",
  kn: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
  bn: "আপনার ব্রাউজারের সাথে কাজ করে",
  gu: "તમારા બ્રાઉઝર સાથે કામ કરે છે",
  pa: "ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਨਾਲ ਕੰਮ ਕਰਦਾ ਹੈ",
  ml: "നിങ്ങളുടെ ബ്രൗസറിൽ പ്രവർത്തിക്കുന്നു",
  or: "ଆପଣଙ୍କ ବ୍ରାଉଜର୍ ସହିତ କାମ କରେ",
  as: "আপোনাৰ ব্ৰাউজাৰৰ সৈতে কাম কৰে",
  ur: "آپ کے براؤزر کے ساتھ کام کرتا ہے",
  sa: "भवतः गवेषकेण सह कार्यं करोति"
};

export default function IntegrationsGraph({ language = 'en' }) {
  const headingText = integrationTranslations[language] || integrationTranslations['en'];

  // Animation variants for drawing the connecting lines
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.5,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  // Animation variants for popping in the white labels
  const labelVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 1, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full bg-[var(--brand-blue)] text-[var(--brand-white)] py-24 overflow-hidden border-b border-[var(--border-strong)]">
      
      {/* Background Halftone/Dot Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--brand-white) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {headingText}
          </h2>
        </div>

        {/* Graph Container */}
        <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center">
          
          {/* Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" fill="none">
            {/* Top Left to Center */}
            <motion.path d="M200 100 L400 200" stroke="var(--brand-white)" strokeWidth="1" variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} />
            {/* Top Right to Center */}
            <motion.path d="M600 100 L400 200" stroke="var(--brand-white)" strokeWidth="1" variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} />
            {/* Bottom Left to Center */}
            <motion.path d="M200 300 L400 200" stroke="var(--brand-white)" strokeWidth="1" variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} />
            {/* Bottom Right to Center */}
            <motion.path d="M600 300 L400 200" stroke="var(--brand-white)" strokeWidth="1" variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} />
            {/* Middle Left to Center */}
            <motion.path d="M100 200 L400 200" stroke="var(--brand-white)" strokeWidth="1" variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} />
          </svg>

          {/* Central Abstract Halftone Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute z-20 w-32 h-32 bg-[var(--brand-blue)] border-2 border-[var(--brand-white)] flex items-center justify-center shadow-2xl"
            style={{ mixBlendMode: 'normal' }}
          >
            <div className="w-24 h-24" style={{ backgroundImage: `radial-gradient(var(--brand-white) 2px, transparent 2px)`, backgroundSize: '8px 8px' }}></div>
          </motion.div>

          {/* Floating White Labels */}
          {/* Chrome (Top Left) */}
          <motion.div className="absolute top-[80px] left-[10%] md:left-[20%] z-30 bg-[var(--brand-white)] text-[var(--brand-black)] px-6 py-2 shadow-lg font-bold text-sm tracking-wide" variants={labelVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Chrome
          </motion.div>

          {/* Edge (Top Right) */}
          <motion.div className="absolute top-[80px] right-[10%] md:right-[20%] z-30 bg-[var(--brand-white)] text-[var(--brand-black)] px-6 py-2 shadow-lg font-bold text-sm tracking-wide" variants={labelVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Edge
          </motion.div>

          {/* Safari (Bottom Left) */}
          <motion.div className="absolute bottom-[80px] left-[10%] md:left-[20%] z-30 bg-[var(--brand-white)] text-[var(--brand-black)] px-6 py-2 shadow-lg font-bold text-sm tracking-wide" variants={labelVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Safari
          </motion.div>

          {/* Brave (Bottom Right) */}
          <motion.div className="absolute bottom-[80px] right-[10%] md:right-[20%] z-30 bg-[var(--brand-white)] text-[var(--brand-black)] px-6 py-2 shadow-lg font-bold text-sm tracking-wide" variants={labelVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Brave
          </motion.div>

          {/* Firefox (Middle Left) */}
          <motion.div className="absolute top-[180px] left-[2%] md:left-[5%] z-30 bg-[var(--brand-white)] text-[var(--brand-black)] px-6 py-2 shadow-lg font-bold text-sm tracking-wide hidden md:block" variants={labelVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Firefox
          </motion.div>

        </div>
      </div>
    </section>
  );
}