import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const modalTranslations = {
  en: { title: "System Readiness Check", network: "Checking Network Connection...", secure: "Checking Security Context...", browser: "Checking Browser Engine...", ready: "System Ready for Diagnostics", start: "Start Diagnostics", cancel: "Cancel", passed: "Passed", failed: "Failed" },
  hi: { title: "सिस्टम तत्परता जांच", network: "नेटवर्क कनेक्शन की जांच हो रही है...", secure: "सुरक्षा संदर्भ की जांच हो रही है...", browser: "ब्राउज़र इंजन की जांच हो रही है...", ready: "सिस्टम डायग्नोस्टिक्स के लिए तैयार है", start: "डायग्नोस्टिक्स शुरू करें", cancel: "रद्द करें", passed: "उत्तीर्ण", failed: "विफल" },
  mr: { title: "सिस्टम तयारी तपासणी", network: "नेटवर्क कनेक्शन तपासत आहे...", secure: "सुरक्षा संदर्भ तपासत आहे...", browser: "ब्राउझर इंजिन तपासत आहे...", ready: "सिस्टम डायग्नोस्टिक्ससाठी तयार आहे", start: "डायग्नोस्टिक्स सुरू करा", cancel: "रद्द करा", passed: "उत्तीर्ण", failed: "अयशस्वी" },
  ta: { title: "கணினி தயார்நிலை சோதனை", network: "நெட்வொர்க் இணைப்பைச் சரிபார்க்கிறது...", secure: "பாதுகாப்பு சூழலை சரிபார்க்கிறது...", browser: "உலாவி இயந்திரத்தை சரிபார்க்கிறது...", ready: "கணினி சோதனைகளுக்கு தயாராக உள்ளது", start: "சோதனைகளைத் தொடங்கு", cancel: "ரத்து செய்", passed: "தேர்ச்சி", failed: "தோல்வி" },
  te: { title: "సిస్టమ్ సంసిద్ధత తనిఖీ", network: "నెట్‌వర్క్ కనెక్షన్‌ని తనిఖీ చేస్తోంది...", secure: "భద్రతా సందర్భాన్ని తనిఖీ చేస్తోంది...", browser: "బ్రౌజర్ ఇంజిన్‌ని తనిఖీ చేస్తోంది...", ready: "సిస్టమ్ డయాగ్నోస్టిక్స్ కోసం సిద్ధంగా ఉంది", start: "డయాగ్నోస్టిక్స్ ప్రారంభించండి", cancel: "రద్దు చేయండి", passed: "ఉత్తీర్ణత", failed: "విఫలమైంది" },
  kn: { title: "ಸಿಸ್ಟಮ್ ಸಿದ್ಧತೆ ಪರಿಶೀಲನೆ", network: "ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", secure: "ಭದ್ರತಾ ಸಂದರ್ಭವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", browser: "ಬ್ರೌಸರ್ ಎಂಜಿನ್ ಅನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", ready: "ಸಿಸ್ಟಮ್ ರೋಗನಿರ್ಣಯಕ್ಕೆ ಸಿದ್ಧವಾಗಿದೆ", start: "ರೋಗನಿರ್ಣಯವನ್ನು ಪ್ರಾರಂಭಿಸಿ", cancel: "ರದ್ದುಗೊಳಿಸಿ", passed: "ಉತ್ತೀರ್ಣ", failed: "ವಿಫಲವಾಗಿದೆ" },
  bn: { title: "সিস্টেম প্রস্তুতি চেক", network: "নেটওয়ার্ক সংযোগ চেক করা হচ্ছে...", secure: "নিরাপত্তা প্রসঙ্গ চেক করা হচ্ছে...", browser: "ব্রাউজার ইঞ্জিন চেক করা হচ্ছে...", ready: "সিস্টেম ডায়াগনস্টিকসের জন্য প্রস্তুত", start: "ডায়াগনস্টিকস শুরু করুন", cancel: "বাতিল করুন", passed: "উত্তীর্ণ", failed: "ব্যর্থ" },
  gu: { title: "સિસ્ટમ સજ્જતા તપાસ", network: "નેટવર્ક કનેક્શન તપાસી રહ્યું છે...", secure: "સુરક્ષા સંદર્ભ તપાસી રહ્યું છે...", browser: "બ્રાઉઝર એન્જિન તપાસી રહ્યું છે...", ready: "સિસ્ટમ ડાયગ્નોસ્ટિક્સ માટે તૈયાર છે", start: "ડાયગ્નોસ્ટિક્સ શરૂ કરો", cancel: "રદ કરો", passed: "ઉત્તીર્ણ", failed: "નિષ્ફળ" },
  pa: { title: "ਸਿਸਟਮ ਤਿਆਰੀ ਜਾਂਚ", network: "ਨੈੱਟਵਰਕ ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", secure: "ਸੁਰੱਖਿਆ ਸੰਦਰਭ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", browser: "ਬ੍ਰਾਊਜ਼ਰ ਇੰਜਣ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", ready: "ਸਿਸਟਮ ਡਾਇਗਨੌਸਟਿਕਸ ਲਈ ਤਿਆਰ ਹੈ", start: "ਡਾਇਗਨੌਸਟਿਕਸ ਸ਼ੁਰੂ ਕਰੋ", cancel: "ਰੱਦ ਕਰੋ", passed: "ਪਾਸ ਹੋਇਆ", failed: "ਫੇਲ੍ਹ ਹੋਇਆ" },
  ml: { title: "സിസ്റ്റം തയ്യാറെടുപ്പ് പരിശോധന", network: "നെറ്റ്‌വർക്ക് കണക്ഷൻ പരിശോധിക്കുന്നു...", secure: "സുരക്ഷാ പശ്ചാത്തലം പരിശോധിക്കുന്നു...", browser: "ബ്രൗസർ എഞ്ചിൻ പരിശോധിക്കുന്നു...", ready: "സിസ്റ്റം ഡയഗ്നോസ്റ്റിക്സിനായി തയ്യാറാണ്", start: "ഡയഗ്നോസ്റ്റിക്സ് ആരംഭിക്കുക", cancel: "റദ്ദാക്കുക", passed: "പാസായി", failed: "പരാജയപ്പെട്ടു" },
  or: { title: "ସିଷ୍ଟମ୍ ପ୍ରସ୍ତୁତି ଯାଞ୍ଚ", network: "ନେଟୱାର୍କ କନେକ୍ସନ୍ ଯାଞ୍ଚ କରାଯାଉଛି...", secure: "ସୁରକ୍ଷା ପ୍ରସଙ୍ଗ ଯାଞ୍ଚ କରାଯାଉଛି...", browser: "ବ୍ରାଉଜର୍ ଇଞ୍ଜିନ୍ ଯାଞ୍ଚ କରାଯାଉଛି...", ready: "ସିଷ୍ଟମ୍ ଡାଇଗ୍ନୋଷ୍ଟିକ୍ସ ପାଇଁ ପ୍ରସ୍ତୁତ", start: "ଡାଇଗ୍ନୋଷ୍ଟିକ୍ସ ଆରମ୍ଭ କରନ୍ତୁ", cancel: "ବାତିଲ୍ କରନ୍ତୁ", passed: "ପାସ୍ ହେଲା", failed: "ବିଫଳ ହେଲା" },
  as: { title: "চিষ্টেম প্ৰস্তুতি পৰীক্ষা", network: "নেটৱৰ্ক সংযোগ পৰীক্ষা কৰা হৈছে...", secure: "সুৰক্ষা প্ৰসংগ পৰীক্ষা কৰা হৈছে...", browser: "ব্ৰাউজাৰ ইঞ্জিন পৰীক্ষা কৰা হৈছে...", ready: "চিষ্টেম ডায়গনষ্টিক্সৰ বাবে প্ৰস্তুত", start: "ডায়গনষ্টিক্স আৰম্ভ কৰক", cancel: "বাতিল কৰক", passed: "উত্তীৰ্ণ", failed: "বিফল" },
  ur: { title: "سسٹم کی تیاری کی جانچ", network: "نیٹ ورک کنکشن چیک کیا جا رہا ہے...", secure: "سیکیورٹی سیاق و سباق چیک کیا جا رہا ہے...", browser: "براؤزر انجن چیک کیا جا رہا ہے...", ready: "سسٹم تشخیص کے لیے تیار ہے", start: "تشخیص شروع کریں", cancel: "منسوخ کریں", passed: "پاس ہو گیا", failed: "ناکام" },
  sa: { title: "तन्त्र-सज्जता-परीक्षणम्", network: "जालबन्धसम्पर्कं परीक्षते...", secure: "सुरक्षासन्दर्भं परीक्षते...", browser: "गवेषकयन्त्रं परीक्षते...", ready: "तन्त्रं परीक्षणाय सज्जम्", start: "परीक्षणं आरभताम्", cancel: "रद्दं करोतु", passed: "उत्तीर्णम्", failed: "अनुत्तीर्णम्" }
};

export default function TestPromptModal({ isOpen, onClose }) {
  const { language = 'en' } = useTheme();
  const navigate = useNavigate();
  const content = modalTranslations[language] || modalTranslations['en'];

  const [step, setStep] = useState(0);
  const [checks, setChecks] = useState({
    network: null,
    secure: null,
    browser: null
  });

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setChecks({ network: null, secure: null, browser: null });

      // Real browser environment checks executed in sequence
      const runChecks = async () => {
        // 1. Check Network Connectivity
        await new Promise(resolve => setTimeout(resolve, 600));
        setChecks(prev => ({ ...prev, network: navigator.onLine }));
        setStep(1);

        // 2. Check Security Context (HTTPS/Localhost)
        await new Promise(resolve => setTimeout(resolve, 600));
        setChecks(prev => ({ ...prev, secure: window.isSecureContext }));
        setStep(2);

        // 3. Check Browser Engine Capabilities (WebRTC presence)
        await new Promise(resolve => setTimeout(resolve, 600));
        const hasRTC = !!(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection);
        setChecks(prev => ({ ...prev, browser: hasRTC }));
        setStep(3);
      };

      runChecks();
    }
  }, [isOpen]);

  const handleStartDiagnostics = () => {
    onClose();
    // Redirect to the dedicated IP Checker page to begin the diagnostic sequence
    navigate('/ip-checker');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-[var(--surface)] border border-[var(--border-strong)] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--brand-black)] px-6 py-4 border-b border-[var(--border-strong)]">
              <h2 className="text-lg font-bold text-[var(--brand-white)] tracking-wide">
                {content.title}
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              
              {/* Network Check */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--text-primary)]">{content.network}</span>
                {checks.network === null ? (
                  <div className="w-4 h-4 border-2 border-[var(--brand-blue)] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className={`text-xs font-bold px-2 py-1 border ${checks.network ? 'text-green-600 border-green-600 bg-green-50' : 'text-red-600 border-red-600 bg-red-50'}`}>
                    {checks.network ? content.passed : content.failed}
                  </span>
                )}
              </div>

              {/* Security Check */}
              <div className="flex items-center justify-between opacity-0 animate-[fadeIn_0.3s_ease-in_forwards]" style={{ animationDelay: '0.6s' }}>
                <span className="text-sm font-medium text-[var(--text-primary)]">{content.secure}</span>
                {checks.secure === null ? (
                  step >= 1 && <div className="w-4 h-4 border-2 border-[var(--brand-blue)] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className={`text-xs font-bold px-2 py-1 border ${checks.secure ? 'text-green-600 border-green-600 bg-green-50' : 'text-red-600 border-red-600 bg-red-50'}`}>
                    {checks.secure ? content.passed : content.failed}
                  </span>
                )}
              </div>

              {/* Browser Engine Check */}
              <div className="flex items-center justify-between opacity-0 animate-[fadeIn_0.3s_ease-in_forwards]" style={{ animationDelay: '1.2s' }}>
                <span className="text-sm font-medium text-[var(--text-primary)]">{content.browser}</span>
                {checks.browser === null ? (
                  step >= 2 && <div className="w-4 h-4 border-2 border-[var(--brand-blue)] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className={`text-xs font-bold px-2 py-1 border ${checks.browser ? 'text-green-600 border-green-600 bg-green-50' : 'text-red-600 border-red-600 bg-red-50'}`}>
                    {checks.browser ? content.passed : content.failed}
                  </span>
                )}
              </div>

              {/* Final Status */}
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-3 bg-[var(--info-bg)] border border-[var(--info)] text-[var(--info)] text-center font-bold text-sm"
                >
                  {content.ready}
                </motion.div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-[var(--surface-secondary)] border-t border-[var(--border)] flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors border border-transparent"
              >
                {content.cancel}
              </button>
              <button 
                disabled={step !== 3}
                onClick={handleStartDiagnostics}
                className={`px-4 py-2 text-sm font-bold text-[var(--brand-white)] transition-all
                  ${step === 3 
                    ? 'bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-hover)] cursor-pointer' 
                    : 'bg-[var(--border-strong)] cursor-not-allowed opacity-70'}`}
              >
                {content.start}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}