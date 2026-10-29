import { motion } from 'framer-motion';
import HalftoneStatue from '../ui/HalftoneStatue';

// Simple, non-technical business translations for 14 Indian languages
const principleTranslations = {
  en: [
    { title: "Reliable Service", desc: "Always online and ready to protect your data." },
    { title: "Honest Work", desc: "We act with integrity to keep you secure." },
    { title: "People First", desc: "Designed for you to stay in total control." }
  ],
  hi: [
    { title: "भरोसेमंद सेवा", desc: "आपके डेटा की सुरक्षा के लिए हमेशा तैयार।" },
    { title: "ईमानदार काम", desc: "हम आपको सुरक्षित रखने के लिए ईमानदारी से काम करते हैं।" },
    { title: "लोग सबसे पहले", desc: "आपको पूरा नियंत्रण देने के लिए बनाया गया।" }
  ],
  mr: [
    { title: "विश्वसनीय सेवा", desc: "तुमच्या डेटाच्या संरक्षणासाठी नेहमी तयार." },
    { title: "प्रामाणिक काम", desc: "आम्ही तुम्हाला सुरक्षित ठेवण्यासाठी प्रामाणिकपणे काम करतो." },
    { title: "लोक प्रथम", desc: "तुम्हाला पूर्ण नियंत्रण देण्यासाठी डिझाइन केलेले." }
  ],
  ta: [
    { title: "நம்பகமான சேவை", desc: "உங்கள் தரவைப் பாதுகாக்க எப்போதும் தயாராக உள்ளது." },
    { title: "நேர்மையான வேலை", desc: "உங்களைப் பாதுகாப்பாக வைக்க நாங்கள் நேர்மையுடன் செயல்படுகிறோம்." },
    { title: "மக்கள் முதலில்", desc: "உங்களுக்கு முழு கட்டுப்பாட்டை வழங்க வடிவமைக்கப்பட்டுள்ளது." }
  ],
  te: [
    { title: "నమ్మకమైన సేవ", desc: "మీ డేటాను రక్షించడానికి ఎల్లప్పుడూ సిద్ధంగా ఉంది." },
    { title: "నిజాయితీ గల పని", desc: "మిమ్మల్ని సురక్షితంగా ఉంచడానికి మేము నిజాయితీగా పనిచేస్తాము." },
    { title: "ప్రజలే ప్రథమం", desc: "మీకు పూర్తి నియంత్రణ ఇవ్వడానికి రూపొందించబడింది." }
  ],
  kn: [
    { title: "ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ", desc: "ನಿಮ್ಮ ಡೇಟಾವನ್ನು ರಕ್ಷಿಸಲು ಯಾವಾಗಲೂ ಸಿದ್ಧವಾಗಿದೆ." },
    { title: "ಪ್ರಾಮಾಣಿಕ ಕೆಲಸ", desc: "ನಿಮ್ಮನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಲು ನಾವು ಪ್ರಾಮಾಣಿಕವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ." },
    { title: "ಜನರಿಗೆ ಆದ್ಯತೆ", desc: "ನಿಮಗೆ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣ ನೀಡಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ." }
  ],
  bn: [
    { title: "নির্ভরযোগ্য পরিষেবা", desc: "আপনার ডেটা সুরক্ষিত রাখতে সর্বদা প্রস্তুত।" },
    { title: "সৎ কাজ", desc: "আপনাকে সুরক্ষিত রাখতে আমরা সততার সাথে কাজ করি।" },
    { title: "মানুষ প্রথম", desc: "আপনাকে সম্পূর্ণ নিয়ন্ত্রণ দেওয়ার জন্য তৈরি করা হয়েছে।" }
  ],
  gu: [
    { title: "વિશ્વસનીય સેવા", desc: "તમારા ડેટાના રક્ષણ માટે હંમેશા તૈયાર." },
    { title: "પ્રમાણિક કામ", desc: "અમે તમને સુરક્ષિત રાખવા માટે પ્રમાણિકતાથી કામ કરીએ છીએ." },
    { title: "લોકો પ્રથમ", desc: "તમને સંપૂર્ણ નિયંત્રણ આપવા માટે રચાયેલ છે." }
  ],
  pa: [
    { title: "ਭਰੋਸੇਮੰਦ ਸੇਵਾ", desc: "ਤੁਹਾਡੇ ਡੇਟਾ ਦੀ ਰੱਖਿਆ ਲਈ ਹਮੇਸ਼ਾ ਤਿਆਰ।" },
    { title: "ਇਮਾਨਦਾਰ ਕੰਮ", desc: "ਅਸੀਂ ਤੁਹਾਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖਣ ਲਈ ਇਮਾਨਦਾਰੀ ਨਾਲ ਕੰਮ ਕਰਦੇ ਹਾਂ।" },
    { title: "ਲੋਕ ਪਹਿਲਾਂ", desc: "ਤੁਹਾਨੂੰ ਪੂਰਾ ਨਿਯੰਤਰਣ ਦੇਣ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ।" }
  ],
  ml: [
    { title: "വിശ്വസനീയമായ സേവനം", desc: "നിങ്ങളുടെ ഡാറ്റ പരിരക്ഷിക്കാൻ എപ്പോഴും തയ്യാറാണ്." },
    { title: "സത്യസന്ധമായ ജോലി", desc: "നിങ്ങളെ സുരക്ഷിതമായി നിലനിർത്താൻ ഞങ്ങൾ സത്യസന്ധതയോടെ പ്രവർത്തിക്കുന്നു." },
    { title: "ആളുകൾക്ക് ഒന്നാം സ്ഥാനം", desc: "നിങ്ങൾക്ക് പൂർണ്ണ നിയന്ത്രണം നൽകാൻ രൂപകൽപ്പന ചെയ്‌തിരിക്കുന്നു." }
  ],
  or: [
    { title: "ନିର୍ଭରଯୋଗ୍ୟ ସେବା", desc: "ଆପଣଙ୍କ ଡାଟା ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ସର୍ବଦା ପ୍ରସ୍ତୁତ।" },
    { title: "ସଚ୍ଚୋଟ କାମ", desc: "ଆପଣଙ୍କୁ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ଆମେ ସଚ୍ଚୋଟତାର ସହ କାମ କରୁ।" },
    { title: "ଲୋକମାନେ ପ୍ରଥମେ", desc: "ଆପଣଙ୍କୁ ସମ୍ପୂର୍ଣ୍ଣ ନିୟନ୍ତ୍ରଣ ଦେବା ପାଇଁ ଡିଜାଇନ୍ କରାଯାଇଛି।" }
  ],
  as: [
    { title: "নিৰ্ভৰযোগ্য সেৱা", desc: "আপোনাৰ ডাটা সুৰক্ষিত কৰিবলৈ সদায় সাজু।" },
    { title: "সৎ কাম", desc: "আপোনাক সুৰক্ষিত ৰাখিবলৈ আমি সততাৰে কাম কৰোঁ।" },
    { title: "মানুহ প্ৰথম", desc: "আপোনাক সম্পূৰ্ণ নিয়ন্ত্ৰণ দিবলৈ ডিজাইন কৰা হৈছে।" }
  ],
  ur: [
    { title: "قابل اعتماد سروس", desc: "آپ کے ڈیٹا کی حفاظت کے لیے ہمیشہ تیار۔" },
    { title: "ایماندارانہ کام", desc: "ہم آپ کو محفوظ رکھنے کے لیے ایمانداری سے کام کرتے ہیں۔" },
    { title: "لوگ سب سے پہلے", desc: "آپ کو مکمل کنٹرول دینے کے لیے ڈیزائن کیا گیا ہے۔" }
  ],
  sa: [
    { title: "विश्वसनीय-सेवा", desc: "भवतः दत्तांशं रक्षितुं सर्वदा सज्जम्।" },
    { title: "ईमानदार-कार्यम्", desc: "भवन्तं सुरक्षितं रक्षितुं वयं सत्यनिष्ठया कार्यं कुर्मः।" },
    { title: "जनाः प्रथमम्", desc: "भवतः पूर्णनियन्त्रणार्थं निर्मितम्।" }
  ]
};

// SVG Assets converted to Base64 for instant Halftone Image Generation
const imageAssets = [
  // 1. Shield (Reliability)
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAgMTAgTDEwIDMwIEwxMCA2MCBDIDEwIDgwLCA1MCA5MCwgNTAgOTAgQyA1MCA5MCwgOTAgODAsIDkwIDYwIEw5MCAzMCBaIiBmaWxsPSIjMzMzIi8+PC9zdmc+",
  // 2. Winged Figure (Integrity)
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAgMjAgQyAzMCAwLCAwIDIwLCAxMCA1MCBDIDIwIDQwLCAzMCA1MCwgNTAgODAgQyA3MCA1MCwgODAgNDAsIDkwIDUwIEMgMTAwIDIwLCA3MCAwLCA1MCAyMCBaIiBmaWxsPSIjMzMzIi8+PC9zdmc+",
  // 3. Thinker (Human at Core)
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjM1IiByPSIyMCIgZmlsbD0iIzMzMyIvPjxwYXRoIGQ9Ik0yNSA5MCBDIDI1IDYwLCA3NSA2MCwgNzUgOTAgWiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg=="
];

export default function PrincipleCards({ language = 'en' }) {
  const cards = principleTranslations[language] || principleTranslations['en'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-[var(--surface-secondary)] py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cards.map((card, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="flex flex-col bg-[var(--surface)] border border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Halftone Image Area */}
              <div className="w-full h-64 border-b border-[var(--border)] bg-gray-100 flex items-center justify-center p-8">
                <HalftoneStatue 
                  imageSrc={imageAssets[index]} 
                  language={language}
                  className="w-full h-full max-w-[150px] max-h-[150px]"
                />
              </div>

              {/* Text Area */}
              <div className="p-8 flex-grow flex flex-col justify-start">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  {card.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}