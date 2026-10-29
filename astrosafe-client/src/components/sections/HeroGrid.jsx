import { motion } from 'framer-motion';

// Simple, non-technical business translations for 13+ Indian languages
const heroTranslations = {
  en: { start: "See What Your", highlight: "Browser", end: "Shares", sub: "We check your connection to keep your data safe." },
  hi: { start: "देखें आपका", highlight: "ब्राउज़र", end: "क्या साझा करता है", sub: "हम आपका डेटा सुरक्षित रखने के लिए आपके कनेक्शन की जाँच करते हैं।" },
  mr: { start: "पहा तुमचा", highlight: "ब्राउझर", end: "काय शेअर करतो", sub: "आम्ही तुमचा डेटा सुरक्षित ठेवण्यासाठी तुमच्या कनेक्शनची तपासणी करतो." },
  ta: { start: "உங்கள்", highlight: "உலாவி", end: "பகிர்வதைப் பார்க்கவும்", sub: "உங்கள் தரவைப் பாதுகாப்பாக வைக்க உங்கள் இணைப்பை நாங்கள் சரிபார்க்கிறோம்." },
  te: { start: "మీ", highlight: "బ్రౌజర్", end: "ఏమి పంచుకుంటుందో చూడండి", sub: "మీ డేటాను సురక్షితంగా ఉంచడానికి మేము మీ కనెక్షన్‌ని తనిఖీ చేస్తాము." },
  kn: { start: "ನಿಮ್ಮ", highlight: "ಬ್ರೌಸರ್", end: "ಏನು ಹಂಚಿಕೊಳ್ಳುತ್ತದೆ ಎಂದು ನೋಡಿ", sub: "ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಲು ನಾವು ನಿಮ್ಮ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸುತ್ತೇವೆ." },
  bn: { start: "আপনার", highlight: "ব্রাউজার", end: "কী শেয়ার করে তা দেখুন", sub: "আপনার ডেটা সুরক্ষিত রাখতে আমরা আপনার সংযোগ পরীক্ষা করি।" },
  gu: { start: "તમારું", highlight: "બ્રાઉઝર", end: "શું શેર કરે છે તે જુઓ", sub: "તમારો ડેટા સુરક્ષિત રાખવા માટે અમે તમારા કનેક્શનને તપાસીએ છીએ." },
  pa: { start: "ਦੇਖੋ ਤੁਹਾਡਾ", highlight: "ਬ੍ਰਾਊਜ਼ਰ", end: "ਕੀ ਸਾਂਝਾ ਕਰਦਾ ਹੈ", sub: "ਅਸੀਂ ਤੁਹਾਡੇ ਡੇਟਾ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖਣ ਲਈ ਤੁਹਾਡੇ ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰਦੇ ਹਾਂ।" },
  ml: { start: "നിങ്ങളുടെ", highlight: "ബ്രൗസർ", end: "എന്താണ് പങ്കിടുന്നതെന്ന് കാണുക", sub: "നിങ്ങളുടെ ഡാറ്റ സുരക്ഷിതമായി സൂക്ഷിക്കാൻ ഞങ്ങൾ നിങ്ങളുടെ കണക്ഷൻ പരിശോധിക്കുന്നു." },
  or: { start: "ଆପଣଙ୍କ", highlight: "ବ୍ରାଉଜର୍", end: "କ'ଣ ସେୟାର କରେ ଦେଖନ୍ତୁ", sub: "ଆପଣଙ୍କ ଡାଟା ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ଆମେ ଆପଣଙ୍କ କନେକ୍ସନ୍ ଯାଞ୍ଚ କରୁ।" },
  as: { start: "আপোনাৰ", highlight: "ব্ৰাউজাৰে", end: "কি শ্বেয়াৰ কৰে চাওক", sub: "আপোনাৰ ডাটা সুৰক্ষিত ৰাখিবলৈ আমি আপোনাৰ সংযোগ পৰীক্ষা কৰোঁ।" },
  ur: { start: "دیکھیں آپ کا", highlight: "براؤزر", end: "کیا شیئر کرتا ہے", sub: "ہم آپ کا ڈیٹا محفوظ رکھنے کے لیے آپ کے کنکشن کی جانچ کرتے ہیں۔" },
  sa: { start: "पश्यतु भवतः", highlight: "गवेषकः", end: "किं विभजते", sub: "भवतः दत्तांशं सुरक्षितं रक्षितुं वयं भवतः सम्पर्कं परीक्षामहे।" }
};

export default function HeroGrid({ language = 'en' }) {
  const content = heroTranslations[language] || heroTranslations['en'];

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-[var(--brand-black)] text-[var(--brand-white)] overflow-hidden py-20">
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--brand-white) 1px, transparent 1px),
            linear-gradient(to bottom, var(--brand-white) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Scattered White Pixel Dots */}
      <motion.div className="absolute top-20 left-20 w-2 h-2 bg-[var(--brand-white)]" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.div className="absolute top-40 right-32 w-2 h-2 bg-[var(--brand-white)]" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
      <motion.div className="absolute bottom-32 left-40 w-2 h-2 bg-[var(--brand-white)]" animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
      <motion.div className="absolute bottom-20 right-24 w-2 h-2 bg-[var(--brand-white)]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3.5, repeat: Infinity, delay: 2 }} />

      {/* Central Abstract Geometric AstroSafe Logo */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-12 flex justify-center"
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Geometric Abstract Shape */}
          <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="transparent" stroke="var(--brand-white)" strokeWidth="4" />
          <path d="M50 5 L50 95" stroke="var(--brand-white)" strokeWidth="2" strokeDasharray="4 4" />
          <rect x="42" y="42" width="16" height="16" fill="var(--brand-white)" />
          <rect x="25" y="25" width="8" height="8" fill="var(--brand-white)" />
          <rect x="67" y="67" width="8" height="8" fill="var(--brand-white)" />
        </svg>
      </motion.div>

      {/* Main Heading with Solid Blue Highlight */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
        >
          {content.start}{' '}
          <span className="bg-[var(--brand-blue)] text-[var(--brand-white)] px-3 py-1 inline-block">
            {content.highlight}
          </span>{' '}
          <br className="hidden md:block" />
          {content.end}
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-2xl mx-auto"
        >
          {content.sub}
        </motion.p>
      </div>
    </section>
  );
}