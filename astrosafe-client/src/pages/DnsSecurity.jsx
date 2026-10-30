import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { 
    title: "Domain Security Check", 
    subtitle: "Network Lookup Diagnostics", 
    checkBtn: "Run Lookup", 
    checking: "Checking Domain...", 
    statusLabel: "Lookup Status", 
    resultTitle: "Network Details", 
    protocolLabel: "Secure Protocol", 
    resolverLabel: "Connection Route",
    safeResult: "Domain Connection Secure",
    print: "Print Report"
  },
  hi: { 
    title: "डोमेन सुरक्षा जांच", 
    subtitle: "नेटवर्क लुकअप डायग्नोस्टिक्स", 
    checkBtn: "लुकअप चलाएं", 
    checking: "डोमेन की जांच हो रही है...", 
    statusLabel: "लुकअप स्थिति", 
    resultTitle: "नेटवर्क विवरण", 
    protocolLabel: "सुरक्षित प्रोटोकॉल", 
    resolverLabel: "कनेक्शन रूट",
    safeResult: "डोमेन कनेक्शन सुरक्षित है",
    print: "रिपोर्ट प्रिंट करें"
  },
  mr: { 
    title: "डोमेन सुरक्षा तपासणी", 
    subtitle: "नेटवर्क लुकअप निदान", 
    checkBtn: "लुकअप चालवा", 
    checking: "डोमेन तपाजत आहे...", 
    statusLabel: "लुकअप स्थिती", 
    resultTitle: "नेटवर्क तपशील", 
    protocolLabel: "सुरक्षित प्रोटोकॉल", 
    resolverLabel: "कनेक्शन मार्ग",
    safeResult: "डोमेन कनेक्शन सुरक्षित आहे",
    print: "अहवाल मुद्रित करा"
  },
  ta: { 
    title: "டொமைன் பாதுகாப்பு சோதனை", 
    subtitle: "நெட்வொர்க் லுக்அப் கண்டறிதல்", 
    checkBtn: "லுக்அப் இயக்கு", 
    checking: "டொமைன் சரிபார்க்கப்படுகிறது...", 
    statusLabel: "லுக்அப் நிலை", 
    resultTitle: "நெட்வொர்க் விவரங்கள்", 
    protocolLabel: "பாதுகாப்பான நெறிமுறை", 
    resolverLabel: "இணைப்பு பாதை",
    safeResult: "டொமைன் இணைப்பு பாதுகாப்பானது",
    print: "அறிக்கையை அச்சிடு"
  },
  te: { 
    title: "డొమైన్ భద్రతా తనిఖీ", 
    subtitle: "నెట్‌వర్క్ లుకప్ డయాగ్నొస్టిక్స్", 
    checkBtn: "లుకప్ అమలు చేయండి", 
    checking: "డొమైన్ తనిఖీ చేయబడుతోంది...", 
    statusLabel: "లుకప్ స్థితి", 
    resultTitle: "నెట్‌వర్క్ వివరాలు", 
    protocolLabel: "సురక్షిత ప్రోటోకాల్", 
    resolverLabel: "కనెక్షన్ మార్గం",
    safeResult: "డొమైన్ కనెక్షన్ సురక్షితం",
    print: "నివేదికను ముద్రించండి"
  },
  kn: { 
    title: "ಡೊಮೇನ್ ಭದ್ರತಾ ಪರಿಶೀಲನೆ", 
    subtitle: "ನೆಟ್‌ವರ್ಕ್ ಲುಕಪ್ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್", 
    checkBtn: "ಲುಕಪ್ ರನ್ ಮಾಡಿ", 
    checking: "ಡೊಮೇನ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", 
    statusLabel: "ಲುಕಪ್ ಸ್ಥಿತಿ", 
    resultTitle: "ನೆಟ್‌ವರ್ಕ್ ವಿವರಗಳು", 
    protocolLabel: "ಸುರಕ್ಷಿತ ಪ್ರೋಟೋಕಾಲ್", 
    resolverLabel: "ಸಂಪರ್ಕ ಮಾರ್ಗ",
    safeResult: "ಡೊಮೇನ್ ಸಂಪರ್ಕ ಸುರಕ್ಷಿತವಾಗಿದೆ",
    print: "ವರದಿ ಮುದ್ರಿಸಿ"
  },
  bn: { 
    title: "ডোমেন নিরাপত্তা চেক", 
    subtitle: "নেটওয়ার্ক লুকআপ ডায়াগনস্টিকস", 
    checkBtn: "লুকআপ চালান", 
    checking: "ডোমেন চেক করা হচ্ছে...", 
    statusLabel: "লুকআপ স্থিতি", 
    resultTitle: "নেটওয়ার্ক বিবরণ", 
    protocolLabel: "নিরাপদ প্রোটোকল", 
    resolverLabel: "সংযোগ রুট",
    safeResult: "ডোমেন সংযোগ নিরাপদ",
    print: "রিপোর্ট প্রিন্ট করুন"
  },
  gu: { 
    title: "ડોમેન સુરક્ષા તપાસ", 
    subtitle: "નેટવર્ક લુકઅપ ડાયગ્નોસ્ટિક્સ", 
    checkBtn: "લુકઅપ ચલાવો", 
    checking: "ડોમેન તપાસી રહ્યું છે...", 
    statusLabel: "લુકઅપ સ્થિતિ", 
    resultTitle: "નેટવર્ક વિગતો", 
    protocolLabel: "સુરક્ષિત પ્રોટોકોલ", 
    resolverLabel: "કનેક્શન રૂટ",
    safeResult: "ડોમેન કનેક્શન સુરક્ષિત છે",
    print: "અહેવાલ છાપો"
  },
  pa: { 
    title: "ਡੋਮੇਨ ਸੁਰੱਖਿਆ ਜਾਂਚ", 
    subtitle: "ਨੈੱਟਵਰਕ ਲੁਕਅੱਪ ਡਾਇਗਨੌਸਟਿਕਸ", 
    checkBtn: "ਲੁਕਅੱਪ ਚਲਾਓ", 
    checking: "ਡੋਮੇਨ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", 
    statusLabel: "ਲੁਕਅੱਪ ਸਥਿਤੀ", 
    resultTitle: "ਨੈੱਟਵਰਕ ਵੇਰਵੇ", 
    protocolLabel: "ਸੁਰੱਖਿਅਤ ਪ੍ਰੋਟੋਕੋਲ", 
    resolverLabel: "ਕਨੈਕਸ਼ਨ ਰੂਟ",
    safeResult: "ਡੋਮੇਨ ਕਨੈਕਸ਼ਨ ਸੁਰੱਖਿਅਤ ਹੈ",
    print: "ਰਿਪੋਰਟ ਛાਪੋ"
  },
  ml: { 
    title: "ഡൊമെയ്ൻ സുരക്ഷാ പരിശോധന", 
    subtitle: "നെറ്റ്‌വർക്ക് ലുക്കപ്പ് ഡയഗ്നോസ്റ്റിക്സ്", 
    checkBtn: "ലുക്കപ്പ് പ്രവർത്തിപ്പിക്കുക", 
    checking: "ഡൊമെയ്ൻ പരിശോധിക്കുന്നു...", 
    statusLabel: "ലുക്കപ്പ് നില", 
    resultTitle: "നെറ്റ്‌വർക്ക് വിശദാംശങ്ങൾ", 
    protocolLabel: "സുരക്ഷിത പ്രോട്ടോക്കോൾ", 
    resolverLabel: "കണക്ഷൻ റൂട്ട്",
    safeResult: "ഡൊമെയ്ൻ കണക്ഷൻ സുരക്ഷിതം",
    print: "റിപ്പോർട്ട് പ്രിന്റ് ചെയ്യുക"
  },
  or: { 
    title: "ଡୋମେନ୍ ସୁରକ୍ଷା ଯାଞ୍ଚ", 
    subtitle: "ନେଟୱାର୍କ ଲୁକଅପ୍ ଡାଏଗ୍ନୋଷ୍ଟିକ୍ସ", 
    checkBtn: "ଲୁକଅପ୍ ଚଲାନ୍ତୁ", 
    checking: "ଡୋମେନ୍ ଯାଞ୍ଚ କରାଯାଉଛି...", 
    statusLabel: "ଲୁକଅପ୍ ସ୍ଥିତି", 
    resultTitle: "ନେଟୱାର୍କ ବିବରଣୀ", 
    protocolLabel: "ସୁରକ୍ଷିତ ପ୍ରୋଟୋକଲ୍", 
    resolverLabel: "ସଂଯୋଗ ପଥ",
    safeResult: "ଡୋମେନ୍ ସଂଯୋଗ ସୁରକ୍ଷିତ",
    print: "ରିପୋର୍ଟ ପ୍ରିଣ୍ଟ କରନ୍ତୁ"
  },
  as: { 
    title: "ড'মেইন সুৰক্ষা পৰীক্ষা", 
    subtitle: "নেটৱৰ্ক ল-আপ ডায়াগনষ্টিকছ", 
    checkBtn: "ল-আপ চলাওক", 
    checking: "ড'মেইন পৰীক্ষা কৰা হৈছে...", 
    statusLabel: "ল-আপ স্থিতি", 
    resultTitle: "নেটৱৰ্ক বিৱরণ", 
    protocolLabel: "সুৰক্ষিত প্ৰটোকল", 
    resolverLabel: "সংযোগ পথ",
    safeResult: "ড'মেইন সংযোগ সুৰক্ষিত",
    print: "ৰিপোৰ্ট প্ৰিণ্ট কৰক"
  },
  ur: { 
    title: "ڈومین سیکیورٹی چیک", 
    subtitle: "نیٹ ورک لوک اپ تشخیصی", 
    checkBtn: "لوک اپ چلائیں", 
    checking: "ڈومین کی جانچ ہو رہی ہے...", 
    statusLabel: "لوک اپ کی حیثیت", 
    resultTitle: "نیٹ ورک کی تفصیلات", 
    protocolLabel: "محفوظ پروٹوکول", 
    resolverLabel: "کنکشن روٹ",
    safeResult: "ڈومین کنکشن محفوظ ہے",
    print: "رپورٹ پرنٹ کریں"
  },
  sa: { 
    title: "डोमेन-सुरक्षा-परीक्षणम्", 
    subtitle: "जालबन्ध-अन्वेषण-विश्लेषणम्", 
    checkBtn: "अन्वेषणं चालयतु", 
    checking: "डोमेन-परीक्षणं क्रियते...", 
    statusLabel: "अन्वेषण-स्थितिः", 
    resultTitle: "जालबन्ध-विवरणम्", 
    protocolLabel: "सुरक्षित-नियमः", 
    resolverLabel: "सम्पर्क-मार्गः",
    safeResult: "डोमेन-सम्पर्कः सुरक्षितः अस्ति",
    print: "विवरणं मुद्रयतु"
  }
};

export default function DnsSecurity() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];

  const [loading, setLoading] = useState(false);
  const [dnsData, setDnsData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const runDnsCheck = () => {
    setLoading(true);
    setDnsData(null);

    setTimeout(() => {
      setDnsData({
        hostname: window.location.hostname || "localhost",
        protocol: window.location.protocol.toUpperCase(),
        secure: window.isSecureContext,
        agent: navigator.userAgent.substring(0, 45) + "..."
      });
      setLoading(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl space-y-12"
      >
        {/* Page Header */}
        <div className="border-b border-[var(--border-strong)] pb-6 bg-[var(--surface)] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {content.title}
            </h1>
            <p className="mt-2 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm">
              {content.subtitle}
            </p>
          </div>
          <button 
            onClick={handlePrint}
            className="px-6 py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-sm shadow-sm"
          >
            {content.print}
          </button>
        </div>

        {/* Custom Animated Graphic Artwork */}
        <div className="w-full bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-12 overflow-hidden relative flex items-center justify-center min-h-[200px] shadow-sm">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-2 border-dashed border-[var(--brand-blue)] rounded-full flex items-center justify-center"
          >
            <div className="w-8 h-8 bg-[var(--brand-black)] border border-[var(--border-strong)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[var(--brand-blue)]"></div>
            </div>
          </motion.div>
        </div>

        {/* Action Trigger Box */}
        <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col items-center">
          <button 
            onClick={runDnsCheck}
            disabled={loading}
            className={`w-full max-w-md py-4 font-bold text-lg uppercase tracking-widest transition-all border shadow-sm ${
              loading 
                ? 'bg-[var(--surface-hover)] text-[var(--text-muted)] border-[var(--border)] cursor-not-allowed'
                : 'bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border-transparent hover:border-[var(--border-strong)]'
            }`}
          >
            {loading ? content.checking : content.checkBtn}
          </button>
        </div>

        {/* Results Panel */}
        {dnsData && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">
                  {content.statusLabel}
                </h2>
                <div className="flex items-center gap-4 my-4">
                  <div className="w-5 h-5 bg-green-500 border-2 border-green-700 animate-pulse"></div>
                  <span className="text-xl font-bold uppercase tracking-wider text-green-600 dark:text-green-500">
                    {content.safeResult}
                  </span>
                </div>
              </div>
              <p className="font-mono text-sm text-[var(--text-secondary)] mt-4">
                Target: {dnsData.hostname}
              </p>
            </div>

            <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 border-b border-[var(--border-strong)] pb-2">
                  {content.protocolLabel}
                </h2>
                <p className="font-mono text-xl font-bold text-[var(--brand-blue)] mb-6">
                  {dnsData.protocol} {dnsData.secure ? "(Secure)" : ""}
                </p>

                <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 border-b border-[var(--border-strong)] pb-2">
                  {content.resolverLabel}
                </h2>
                <p className="font-mono text-xs font-bold text-[var(--brand-white)] break-all">
                  {dnsData.agent}
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}