import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Cybersecurity", subtitle: "Protection Operations", tracking: "Tracking Protection", secure: "Secure Connection", active: "Active", inactive: "Inactive", defense: "Threat Defense", defenseDesc: "Blocks harmful access to your device.", privacy: "Data Privacy", privacyDesc: "Keeps your personal information safe." },
  hi: { title: "साइबर सुरक्षा", subtitle: "सुरक्षा संचालन", tracking: "ट्रैकिंग सुरक्षा", secure: "सुरक्षित कनेक्शन", active: "सक्रिय", inactive: "निष्क्रिय", defense: "खतरा बचाव", defenseDesc: "आपके डिवाइस पर हानिकारक पहुंच को रोकता है।", privacy: "डेटा गोपनीयता", privacyDesc: "आपकी व्यक्तिगत जानकारी को सुरक्षित रखता है।" },
  mr: { title: "सायबर सुरक्षा", subtitle: "संरक्षण ऑपरेशन्स", tracking: "ट्रॅकिंग संरक्षण", secure: "सुरक्षित कनेक्शन", active: "सक्रिय", inactive: "निष्क्रिय", defense: "धोका बचाव", defenseDesc: "तुमच्या डिव्हाइसवरील हानिकारक प्रवेश अवरोधित करते.", privacy: "डेटा गोपनीयता", privacyDesc: "तुमची वैयक्तिक माहिती सुरक्षित ठेवते." },
  ta: { title: "இணையப் பாதுகாப்பு", subtitle: "பாதுகாப்பு செயல்பாடுகள்", tracking: "கண்காணிப்பு பாதுகாப்பு", secure: "பாதுகாப்பான இணைப்பு", active: "செயலில்", inactive: "செயலற்ற", defense: "அச்சுறுத்தல் பாதுகாப்பு", defenseDesc: "உங்கள் சாதனத்திற்கான தீங்கு விளைவிக்கும் அணுகலைத் தடுக்கிறது.", privacy: "தரவு தனியுரிமை", privacyDesc: "உங்கள் தனிப்பட்ட தகவல்களை பாதுகாப்பாக வைக்கிறது." },
  te: { title: "సైబర్‌ సెక్యూరిటీ", subtitle: "రక్షణ కార్యకలాపాలు", tracking: "ట్రాకింగ్ రక్షణ", secure: "సురక్షిత కనెక్షన్", active: "క్రియాశీలం", inactive: "క్రియారహితం", defense: "ముప్పు రక్షణ", defenseDesc: "మీ పరికరానికి హానికరమైన ప్రాప్యతను నిరోధిస్తుంది.", privacy: "డేటా గోప్యత", privacyDesc: "మీ వ్యక్తిగత సమాచారాన్ని సురక్షితంగా ఉంచుతుంది." },
  kn: { title: "ಸೈಬರ್ ಭದ್ರತೆ", subtitle: "ರಕ್ಷಣಾ ಕಾರ್ಯಾಚರಣೆಗಳು", tracking: "ಟ್ರ್ಯಾಕಿಂಗ್ ರಕ್ಷಣೆ", secure: "ಸುರಕ್ಷಿತ ಸಂಪರ್ಕ", active: "ಸಕ್ರಿಯ", inactive: "ನಿಷ್ಕ್ರಿಯ", defense: "ಬೆದರಿಕೆ ರಕ್ಷಣೆ", defenseDesc: "ನಿಮ್ಮ ಸಾಧನಕ್ಕೆ ಹಾನಿಕಾರಕ ಪ್ರವೇಶವನ್ನು ನಿರ್ಬಂಧಿಸುತ್ತದೆ.", privacy: "ಡೇಟಾ ಗೌಪ್ಯತೆ", privacyDesc: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸುತ್ತದೆ." },
  bn: { title: "সাইবার নিরাপত্তা", subtitle: "সুরক্ষা কার্যক্রম", tracking: "ট্র্যাকিং সুরক্ষা", secure: "নিরাপদ সংযোগ", active: "সক্রিয়", inactive: "নিষ্ক্রিয়", defense: "হুমকি প্রতিরক্ষা", defenseDesc: "আপনার ডিভাইসে ক্ষতিকারক অ্যাক্সেস ব্লক করে।", privacy: "ডেটা গোপনীয়তা", privacyDesc: "আপনার ব্যক্তিগত তথ্য নিরাপদ রাখে।" },
  gu: { title: "સાયબર સુરક્ષા", subtitle: "સંરક્ષણ કામગીરી", tracking: "ટ્રેકિંગ સુરક્ષા", secure: "સુરક્ષિત કનેક્શન", active: "સક્રિય", inactive: "નિષ્ક્રિય", defense: "ખતરો સંરક્ષણ", defenseDesc: "તમારા ઉપકરણ પર હાનિકારક ઍક્સેસને અવરોધિત કરે છે.", privacy: "ડેટા ગોપનીયતા", privacyDesc: "તમારી વ્યક્તિગત માહિતીને સુરક્ષિત રાખે છે." },
  pa: { title: "ਸਾਈਬਰ ਸੁਰੱਖਿਆ", subtitle: "ਸੁਰੱਖਿਆ ਸੰਚਾਲਨ", tracking: "ਟਰੈਕਿੰਗ ਸੁਰੱਖਿਆ", secure: "ਸੁਰੱਖਿਅਤ ਕਨੈਕਸ਼ਨ", active: "ਸਰਗਰਮ", inactive: "ਗੈਰ-ਸਰਗਰਮ", defense: "ਖਤਰਾ ਬਚਾਅ", defenseDesc: "ਤੁਹਾਡੀ ਡਿਵਾਈਸ ਤੱਕ ਹਾਨੀਕਾਰਕ ਪਹੁੰਚ ਨੂੰ ਰੋਕਦਾ ਹੈ।", privacy: "ਡੇਟਾ ਗੋਪਨੀਯਤਾ", privacyDesc: "ਤੁਹਾਡੀ ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖਦਾ ਹੈ।" },
  ml: { title: "സൈബർ സുരക്ഷ", subtitle: "സംരക്ഷണ പ്രവർത്തനങ്ങൾ", tracking: "ട്രാക്കിംഗ് സംരക്ഷണം", secure: "സുരക്ഷിതമായ കണക്ഷൻ", active: "സജീവം", inactive: "നിർജ്ജീവം", defense: "ഭീഷണി പ്രതിരോധം", defenseDesc: "നിങ്ങളുടെ ഉപകരണത്തിലേക്കുള്ള ഹാനികരമായ പ്രവേശനം തടയുന്നു.", privacy: "ഡാറ്റ സ്വകാര്യത", privacyDesc: "നിങ്ങളുടെ വ്യക്തിഗത വിവരങ്ങൾ സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു." },
  or: { title: "ସାଇବର ସୁରକ୍ଷା", subtitle: "ସୁରକ୍ଷା କାର୍ଯ୍ୟକଳାପ", tracking: "ଟ୍ରାକିଂ ସୁରକ୍ଷା", secure: "ସୁରକ୍ଷିତ ସଂଯୋଗ", active: "ସକ୍ରିୟ", inactive: "ନିଷ୍କ୍ରିୟ", defense: "ବିପଦ ପ୍ରତିରକ୍ଷା", defenseDesc: "ଆପଣଙ୍କ ଡିଭାଇସକୁ କ୍ଷତିକାରକ ଆକ୍ସେସ୍ ବ୍ଲକ୍ କରେ |", privacy: "ଡାଟା ଗୋପନୀୟତା", privacyDesc: "ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ ସୂଚନା ସୁରକ୍ଷିତ ରଖେ |" },
  as: { title: "চাইবাৰ সুৰক্ষা", subtitle: "সুৰক্ষা কাৰ্যকলাপ", tracking: "ট্ৰেকিং সুৰক্ষা", secure: "সুৰক্ষিত সংযোগ", active: "সক্ৰিয়", inactive: "নিষ্ক্ৰিয়", defense: "বিপদ প্ৰতিৰক্ষা", defenseDesc: "আপোনাৰ ডিভাইচলৈ ক্ষতিকাৰক প্ৰৱেশ অৱৰোধ কৰে।", privacy: "ডাটা গোপনীয়তা", privacyDesc: "আপোনাৰ ব্যক্তিগত তথ্য সুৰক্ষিত ৰাখে।" },
  ur: { title: "سائبر سیکیورٹی", subtitle: "حفاظتی آپریشنز", tracking: "ٹریکنگ پروٹیکشن", secure: "محفوظ کنکشن", active: "فعال", inactive: "غیر فعال", defense: "خطرے سے دفاع", defenseDesc: "آپ کے ڈیوائس تک نقصان دہ رسائی کو روکتا ہے۔", privacy: "ڈیٹا کی رازداری", privacyDesc: "آپ کی ذاتی معلومات کو محفوظ رکھتا ہے۔" },
  sa: { title: "तन्त्रांश-सुरक्षा", subtitle: "रक्षण-कार्याणि", tracking: "अनुसरण-रक्षणम्", secure: "सुरक्षित-सम्पर्कः", active: "सक्रियम्", inactive: "निष्क्रियम्", defense: "सङ्कट-रक्षणम्", defenseDesc: "भवतः यन्त्रे हानिकारक-प्रवेशं बाधते।", privacy: "दत्तांश-गोपनीयता", privacyDesc: "भवतः व्यक्तिगत-सूचनां सुरक्षितं स्थापयति।" }
};

export default function Cybersecurity() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  // Real security logic extracting the browser's native tracking protection and context
  const [cyberMetrics, setCyberMetrics] = useState({
    doNotTrack: false,
    secureContext: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const checkDoNotTrack = () => {
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
        return dnt === "1" || dnt === "yes";
      }
      return false;
    };

    setCyberMetrics({
      doNotTrack: checkDoNotTrack(),
      secureContext: window.isSecureContext
    });
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl space-y-12"
      >
        {/* Page Header */}
        <div className="border-b border-[var(--border-strong)] pb-6 bg-[var(--surface)] p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {content.title}
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm">
            {content.subtitle}
          </p>
        </div>

        {/* Live Client Cybersecurity Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tracking Protection Metric */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">
              {content.tracking}
            </h2>
            <div className="flex items-center min-h-[60px]">
              <div className={`inline-block px-4 py-2 border text-sm font-bold ${cyberMetrics.doNotTrack ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500' : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-500'}`}>
                {cyberMetrics.doNotTrack ? content.active : content.inactive}
              </div>
            </div>
          </div>

          {/* Secure Connection Metric */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">
              {content.secure}
            </h2>
            <div className="flex items-center min-h-[60px]">
              <div className={`inline-block px-4 py-2 border text-sm font-bold ${cyberMetrics.secureContext ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500' : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-500'}`}>
                {cyberMetrics.secureContext ? content.active : content.inactive}
              </div>
            </div>
          </div>

        </div>

        {/* Core Security Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Threat Defense Panel */}
          <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col min-h-[200px] border-t-4 border-t-[var(--brand-blue)]">
            <h2 className="text-xl font-bold text-[var(--brand-white)] mb-4 uppercase tracking-wider">
              {content.defense}
            </h2>
            <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
              {content.defenseDesc}
            </p>
          </div>

          {/* Data Privacy Panel */}
          <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col min-h-[200px] border-t-4 border-t-[var(--text-primary)]">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              {content.privacy}
            </h2>
            <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
              {content.privacyDesc}
            </p>
          </div>

        </div>

      </motion.div>
    </div>
  );
}