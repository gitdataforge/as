import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple, non-technical business translations for 14 Indian languages
const workspaceTranslations = {
  en: [
    { title: "Personal Information", desc: "Keep your personal data safe from hidden trackers." },
    { title: "Network Security", desc: "Check if your internet connection is secretly sharing your location." },
    { title: "Device Identity", desc: "See how websites identify your phone or computer." }
  ],
  hi: [
    { title: "निजी जानकारी", desc: "अपने व्यक्तिगत डेटा को छिपे हुए ट्रैकर्स से सुरक्षित रखें।" },
    { title: "नेटवर्क सुरक्षा", desc: "जांचें कि क्या आपका इंटरनेट कनेक्शन आपकी लोकेशन साझा कर रहा है।" },
    { title: "डिवाइस की पहचान", desc: "देखें कि वेबसाइटें आपके फोन या कंप्यूटर को कैसे पहचानती हैं।" }
  ],
  mr: [
    { title: "खाजगी माहिती", desc: "तुमचा वैयक्तिक डेटा ट्रॅकर्सपासून सुरक्षित ठेवा." },
    { title: "नेटवर्क सुरक्षा", desc: "तुमचे इंटरनेट कनेक्शन तुमचे स्थान शेअर करत आहे का ते तपासा." },
    { title: "डिव्हाइस ओळख", desc: "वेबसाइट्स तुमचा फोन किंवा कॉम्प्युटर कसा ओळखतात ते पहा." }
  ],
  ta: [
    { title: "தனிப்பட்ட தகவல்", desc: "மறைக்கப்பட்ட டிராக்கர்களிடமிருந்து உங்கள் தரவைப் பாதுகாப்பாக வைக்கவும்." },
    { title: "நெட்வொர்க் பாதுகாப்பு", desc: "உங்கள் இணைய இணைப்பு உங்கள் இருப்பிடத்தைப் பகிர்கிறதா எனச் சரிபார்க்கவும்." },
    { title: "சாதன அடையாளம்", desc: "வலைத்தளங்கள் உங்கள் தொலைபேசியை எவ்வாறு அடையாளம் காண்கின்றன என்பதைப் பார்க்கவும்." }
  ],
  te: [
    { title: "వ్యక్తిగత సమాచారం", desc: "దాచిన ట్రాకర్ల నుండి మీ డేటాను సురక్షితంగా ఉంచండి." },
    { title: "నెట్‌వర్క్ భద్రత", desc: "మీ ఇంటర్నెట్ కనెక్షన్ మీ స్థానాన్ని పంచుకుంటుందో లేదో తనిఖీ చేయండి." },
    { title: "పరికర గుర్తింపు", desc: "వెబ్‌సైట్‌లు మీ ఫోన్‌ను ఎలా గుర్తిస్తాయో చూడండి." }
  ],
  kn: [
    { title: "ಖಾಸಗಿ ಮಾಹಿತಿ", desc: "ಅಡಗಿರುವ ಟ್ರ್ಯಾಕರ್‌ಗಳಿಂದ ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಿ." },
    { title: "ನೆಟ್‌ವರ್ಕ್ ಭದ್ರತೆ", desc: "ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ." },
    { title: "ಸಾಧನದ ಗುರುತು", desc: "ವೆಬ್‌ಸೈಟ್‌ಗಳು ನಿಮ್ಮ ಫೋನ್ ಅನ್ನು ಹೇಗೆ ಗುರುತಿಸುತ್ತವೆ ಎಂಬುದನ್ನು ನೋಡಿ." }
  ],
  bn: [
    { title: "ব্যক্তিগত তথ্য", desc: "লুকানো ট্র্যাকার থেকে আপনার ডেটা সুরক্ষিত রাখুন।" },
    { title: "নেটওয়ার্ক নিরাপত্তা", desc: "আপনার ইন্টারনেট সংযোগ আপনার অবস্থান শেয়ার করছে কিনা তা পরীক্ষা করুন।" },
    { title: "ডিভাইস পরিচয়", desc: "ওয়েবসাইটগুলি কীভাবে আপনার ফোন বা কম্পিউটার সনাক্ত করে তা দেখুন।" }
  ],
  gu: [
    { title: "ખાનગી માહિતી", desc: "તમારા ડેટાને છુપાયેલા ટ્રેકર્સથી સુરક્ષિત રાખો." },
    { title: "નેટવર્ક સુરક્ષા", desc: "તમારું ઇન્ટરનેટ કનેક્શન તમારું સ્થાન શેર કરી રહ્યું છે કે કેમ તે તપાસો." },
    { title: "ઉપકરણની ઓળખ", desc: "વેબસાઇટ્સ તમારા ફોન અથવા કમ્પ્યુટરને કેવી રીતે ઓળખે છે તે જુઓ." }
  ],
  pa: [
    { title: "ਨਿੱਜੀ ਜਾਣਕਾਰੀ", desc: "ਆਪਣੇ ਡੇਟਾ ਨੂੰ ਲੁਕਵੇਂ ਟਰੈਕਰਾਂ ਤੋਂ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।" },
    { title: "ਨੈੱਟਵਰਕ ਸੁਰੱਖਿਆ", desc: "ਜਾਂਚ ਕਰੋ ਕਿ ਕੀ ਤੁਹਾਡਾ ਇੰਟਰਨੈਟ ਕਨੈਕਸ਼ਨ ਤੁਹਾਡਾ ਸਥਾਨ ਸਾਂਝਾ ਕਰ ਰਿਹਾ ਹੈ।" },
    { title: "ਡਿਵਾਈਸ ਪਛਾਣ", desc: "ਦੇਖੋ ਕਿ ਵੈੱਬਸਾਈਟਾਂ ਤੁਹਾਡੇ ਫ਼ੋਨ ਜਾਂ ਕੰਪਿਊਟਰ ਦੀ ਪਛਾਣ ਕਿਵੇਂ ਕਰਦੀਆਂ ਹਨ।" }
  ],
  ml: [
    { title: "സ്വകാര്യ വിവരങ്ങൾ", desc: "മറഞ്ഞിരിക്കുന്ന ട്രാക്കറുകളിൽ നിന്ന് നിങ്ങളുടെ ഡാറ്റ സുരക്ഷിതമായി സൂക്ഷിക്കുക." },
    { title: "നെറ്റ്‌വർക്ക് സുരക്ഷ", desc: "നിങ്ങളുടെ ഇന്റർനെറ്റ് കണക്ഷൻ നിങ്ങളുടെ ലൊക്കേഷൻ പങ്കിടുന്നുണ്ടോ എന്ന് പരിശോധിക്കുക." },
    { title: "ഉപകരണ ഐഡന്റിറ്റി", desc: "വെബ്സൈറ്റുകൾ നിങ്ങളുടെ ഫോൺ എങ്ങനെ തിരിച്ചറിയുന്നുവെന്ന് കാണുക." }
  ],
  or: [
    { title: "ବ୍ୟକ୍ତିଗତ ସୂଚନା", desc: "ଲୁଚି ରହିଥିବା ଟ୍ରାକରରୁ ଆପଣଙ୍କର ଡାଟା ସୁରକ୍ଷିତ ରଖନ୍ତୁ।" },
    { title: "ନେଟୱାର୍କ ସୁରକ୍ଷା", desc: "ଆପଣଙ୍କ ଇଣ୍ଟରନେଟ୍ କନେକ୍ସନ୍ ଲୋକେସନ୍ ସେୟାର କରୁଛି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ।" },
    { title: "ଡିଭାଇସ୍ ପରିଚୟ", desc: "ୱେବସାଇଟ୍ ଆପଣଙ୍କ ଫୋନ୍ କିମ୍ବା କମ୍ପ୍ୟୁଟରକୁ କିପରି ଚିହ୍ନଟ କରେ ଦେଖନ୍ତୁ।" }
  ],
  as: [
    { title: "ব্যক্তিগত তথ্য", desc: "লুকুৱা ট্ৰেকাৰৰ পৰা আপোনাৰ ডাটা সুৰক্ষিত ৰাখক।" },
    { title: "নেটৱৰ্ক সুৰক্ষা", desc: "আপোনাৰ ইণ্টাৰনেট সংযোগে অৱস্থান শ্বেয়াৰ কৰিছে নেকি পৰীক্ষা কৰক।" },
    { title: "ডিভাইচ পৰিচয়", desc: "ৱেবছাইটবোৰে আপোনাৰ ফোন কেনেকৈ চিনাক্ত কৰে চাওক।" }
  ],
  ur: [
    { title: "ذاتی معلومات", desc: "اپنے ڈیٹا کو پوشیدہ ٹریکرز سے محفوظ رکھیں۔" },
    { title: "نیٹ ورک سیکیورٹی", desc: "چیک کریں کہ کیا آپ کا انٹرنیٹ کنکشن آپ کا مقام شیئر کر رہا ہے۔" },
    { title: "ڈیوائس کی شناخت", desc: "دیکھیں کہ ویب سائٹس آپ کے فون کو کیسے پہچانتی ہیں۔" }
  ],
  sa: [
    { title: "निजी सूचना", desc: "गुप्तरक्षकेभ्यः भवतः दत्तांशं सुरक्षितं रक्षितुं।" },
    { title: "जालबन्ध सुरक्षा", desc: "भवतः अन्तर्जालसम्पर्कः भवतः स्थानं विभजते वा इति पश्यन्तु।" },
    { title: "यन्त्रस्य परिचयः", desc: "जालस्थानानि भवतः दूरभाषं कथं प्रत्यभिज्ञानं कुर्वन्ति इति पश्यन्तु।" }
  ]
};

// SVG Graphic Components
const BlueDiamond = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 drop-shadow-2xl">
    <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="var(--brand-blue)" stroke="var(--brand-white)" strokeWidth="2" />
    <path d="M50 10 L50 90 M10 50 L90 50" stroke="var(--brand-white)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
    <circle cx="50" cy="50" r="4" fill="var(--brand-white)" />
  </svg>
);

const BlueFolder = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 drop-shadow-2xl">
    <path d="M10 30 L40 30 L50 45 L90 45 L90 85 L10 85 Z" fill="var(--brand-blue)" stroke="var(--brand-white)" strokeWidth="2" />
    <path d="M25 55 L75 55 M25 70 L55 70" stroke="var(--brand-white)" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const BlueStack = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 drop-shadow-2xl">
    <rect x="20" y="20" width="60" height="15" fill="var(--brand-blue)" stroke="var(--brand-white)" strokeWidth="2" />
    <rect x="20" y="45" width="60" height="15" fill="var(--brand-blue)" stroke="var(--brand-white)" strokeWidth="2" />
    <rect x="20" y="70" width="60" height="15" fill="var(--brand-blue)" stroke="var(--brand-white)" strokeWidth="2" />
    <circle cx="30" cy="27.5" r="3" fill="var(--brand-white)" />
    <circle cx="30" cy="52.5" r="3" fill="var(--brand-white)" />
    <circle cx="30" cy="77.5" r="3" fill="var(--brand-white)" />
  </svg>
);

export default function InteractiveWorkspace({ language = 'en' }) {
  const [activeTab, setActiveTab] = useState(0);
  const content = workspaceTranslations[language] || workspaceTranslations['en'];

  // Map the active tab to the correct isometric graphic
  const renderGraphic = () => {
    switch (activeTab) {
      case 0: return <BlueDiamond />;
      case 1: return <BlueFolder />;
      case 2: return <BlueStack />;
      default: return <BlueDiamond />;
    }
  };

  return (
    <section className="w-full bg-[var(--brand-black)] text-[var(--brand-white)] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Interactive Menu Tabs */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-2 border-l border-[var(--border-strong)]">
          {content.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className="text-left px-6 py-5 relative focus:outline-none group"
            >
              {/* Active Tab Blue Indicator */}
              {activeTab === index && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--brand-blue)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {activeTab === index && (
                <motion.div 
                  layoutId="activeTabDot"
                  className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--brand-blue)] rounded-none"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <h3 className={`text-lg font-bold uppercase tracking-wider transition-colors duration-200 ${activeTab === index ? 'text-[var(--brand-white)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}`}>
                {tab.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Right Side: Dark Isometric Grid and SVG Display */}
        <div className="w-full lg:w-2/3 h-[500px] relative flex items-center justify-center bg-[#0A0A0A] border border-[var(--border-strong)] overflow-hidden">
          
          {/* Isometric Dark Grid Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--border-strong) 1px, transparent 1px),
                linear-gradient(to bottom, var(--border-strong) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: 'rotateX(60deg) rotateZ(-45deg) scale(2)',
              transformOrigin: 'center center'
            }}
          ></div>

          {/* Dynamic SVG Content with Framer Motion AnimatePresence */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mb-8"
              >
                {renderGraphic()}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#111111] border border-[var(--border-strong)] px-6 py-4 max-w-sm"
              >
                <p className="text-[var(--text-secondary)] font-mono text-sm">
                  {content[activeTab].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}