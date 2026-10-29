import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateCanvasFingerprint } from '../../utils/realCanvasTest';
import { useTheme } from '../../context/ThemeContext';

// Simple business translations for 14 Indian languages for status reporting
const textContent = {
  en: { title: "Device Identity Check", loading: "Checking device...", found: "Device Signature Found", error: "Check Error", hashLabel: "Signature:" },
  hi: { title: "डिवाइस पहचान जांच", loading: "डिवाइस की जांच हो रही है...", found: "डिवाइस हस्ताक्षर मिला", error: "जांच त्रुटि", hashLabel: "हस्ताक्षर:" },
  mr: { title: "डिव्हाइस ओळख तपासणी", loading: "डिव्हाइस तपासत आहे...", found: "डिव्हाइस स्वाक्षरी सापडली", error: "तपासणी त्रुटी", hashLabel: "स्वाक्षरी:" },
  ta: { title: "சாதன அடையாள சோதனை", loading: "சாதனத்தை சரிபார்க்கிறது...", found: "சாதன கையொப்பம் கண்டறியப்பட்டது", error: "சோதனை பிழை", hashLabel: "கையொப்பம்:" },
  te: { title: "పరికర గుర్తింపు తనిఖీ", loading: "పరికరాన్ని తనిఖీ చేస్తోంది...", found: "పరికర సంతకం కనుగొనబడింది", error: "తనిఖీ లోపం", hashLabel: "సంతకం:" },
  kn: { title: "ಸಾಧನದ ಗುರುತಿನ ಪರಿಶೀಲನೆ", loading: "ಸಾಧನವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", found: "ಸಾಧನದ ಸಹಿ ಕಂಡುಬಂದಿದೆ", error: "ಪರಿಶೀಲನೆ ದೋಷ", hashLabel: "ಸಹಿ:" },
  bn: { title: "ডিভাইস পরিচয় চেক", loading: "ডিভাইস চেক করা হচ্ছে...", found: "ডিভাইস স্বাক্ষর পাওয়া গেছে", error: "চেক ত্রুটি", hashLabel: "স্বাক্ষর:" },
  gu: { title: "ઉપકરણ ઓળખ તપાસ", loading: "ઉપકરણ તપાસી રહ્યું છે...", found: "ઉપકરણ હસ્તાક્ષર મળ્યા", error: "તપાસ ભૂલ", hashLabel: "હસ્તાક્ષર:" },
  pa: { title: "ਡਿਵਾਈਸ ਪਛਾਣ ਜਾਂਚ", loading: "ਡਿਵਾਈਸ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", found: "ਡਿਵਾਈਸ ਦਸਤਖਤ ਮਿਲੇ", error: "ਜਾਂਚ ਗਲਤੀ", hashLabel: "ਦਸਤਖਤ:" },
  ml: { title: "ഉപകരണ ഐഡന്റിറ്റി പരിശോധന", loading: "ഉപകരണം പരിശോധിക്കുന്നു...", found: "ഉപകരണ ഒപ്പ് കണ്ടെത്തി", error: "പരിശോധന പിശക്", hashLabel: "ഒപ്പ്:" },
  or: { title: "ଡିଭାଇସ୍ ପରିଚୟ ଯାଞ୍ଚ", loading: "ଡିଭାଇସ୍ ଯାଞ୍ଚ କରାଯାଉଛି...", found: "ଡିଭାଇସ୍ ସ୍ୱାକ୍ଷର ମିଳିଲା", error: "ଯାଞ୍ଚ ତ୍ରୁଟି", hashLabel: "ସ୍ୱାକ୍ଷର:" },
  as: { title: "ডিভাইচ পৰিচয় পৰীক্ষা", loading: "ডিভাইচ পৰীক্ষা কৰা হৈছে...", found: "ডিভাইচ স্বাক্ষৰ পোৱা গৈছে", error: "পৰীক্ষা ত্ৰুটি", hashLabel: "স্বাক্ষৰ:" },
  ur: { title: "ڈیوائس کی شناخت کی جانچ", loading: "ڈیوائس چیک کی جا رہی ہے...", found: "ڈیوائس کے دستخط مل گئے", error: "چیک کی خرابی", hashLabel: "دستخط:" },
  sa: { title: "यन्त्र-परिचय-परीक्षणम्", loading: "यन्त्रं परीक्षते...", found: "यन्त्र-हस्ताक्षरं प्राप्तम्", error: "परीक्षणदोषः", hashLabel: "हस्ताक्षरम्:" }
};

export default function CanvasFingerprint() {
  const { language = 'en' } = useTheme();
  const content = textContent[language] || textContent['en'];
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({ hash: '', data: '', status: '' });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const runTest = async () => {
      setLoading(true);
      const data = await generateCanvasFingerprint(language);
      
      if (isMounted) {
        setResult(data);
        setHasError(data.status === 'error');
        setLoading(false);
      }
    };

    runTest();

    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <div className="w-full bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 border-b border-[var(--border)] pb-2">
        {content.title}
      </h3>

      <div className="min-h-[100px] flex flex-col justify-center">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center space-x-3 text-[var(--brand-blue)] font-medium"
          >
            <div className="w-4 h-4 border-2 border-[var(--brand-blue)] border-t-transparent rounded-full animate-spin"></div>
            <span>{content.loading}</span>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              {hasError ? (
                <div className="flex items-center space-x-2 text-red-600 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-sm font-bold border border-red-200 dark:border-red-800">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>{content.error}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-[var(--brand-blue)] bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-sm font-bold border border-blue-200 dark:border-blue-800">
                  <div className="w-2 h-2 bg-[var(--brand-blue)] rounded-full"></div>
                  <span>{content.found}</span>
                </div>
              )}
            </div>

            {!hasError && (
              <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] p-4">
                <p className="text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
                  {content.hashLabel}
                </p>
                <span className="font-mono text-[var(--text-primary)] text-lg bg-[var(--surface-hover)] px-4 py-2 inline-block border border-[var(--border-strong)] break-all">
                  {result.hash}
                </span>
                
                {result.data && (
                  <div className="mt-4 text-xs font-mono text-[var(--text-muted)] break-all opacity-50">
                    {result.data}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}