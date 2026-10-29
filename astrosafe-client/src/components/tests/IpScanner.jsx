import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchRealIp } from '../../utils/realIpTest';
import { useTheme } from '../../context/ThemeContext';

// Simple business translations for 14 Indian languages for status reporting
const textContent = {
  en: { title: "Network Identity Check", loading: "Checking connection...", found: "Public Address Found", error: "Connection Error" },
  hi: { title: "नेटवर्क पहचान जांच", loading: "कनेक्शन की जांच हो रही है...", found: "सार्वजनिक पता मिला", error: "कनेक्शन त्रुटि" },
  mr: { title: "नेटवर्क ओळख तपासणी", loading: "कनेक्शन तपासत आहे...", found: "सार्वजनिक पत्ता सापडला", error: "कनेक्शन त्रुटी" },
  ta: { title: "நெட்வொர்க் அடையாள சோதனை", loading: "இணைப்பைச் சரிபார்க்கிறது...", found: "பொது முகவரி கண்டறியப்பட்டது", error: "இணைப்பு பிழை" },
  te: { title: "నెట్‌వర్క్ గుర్తింపు తనిఖీ", loading: "కనెక్షన్‌ని తనిఖీ చేస్తోంది...", found: "బహిరంగ చిరునామా కనుగొనబడింది", error: "కనెక్షన్ లోపం" },
  kn: { title: "ನೆಟ್‌ವರ್ಕ್ ಗುರುತಿನ ಪರಿಶೀಲನೆ", loading: "ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", found: "ಸಾರ್ವಜನಿಕ ವಿಳಾಸ ಕಂಡುಬಂದಿದೆ", error: "ಸಂಪರ್ಕ ದೋಷ" },
  bn: { title: "নেটওয়ার্ক পরিচয় চেক", loading: "সংযোগ চেক করা হচ্ছে...", found: "পাবলিক ঠিকানা পাওয়া গেছে", error: "সংযোগ ত্রুটি" },
  gu: { title: "નેટવર્ક ઓળખ તપાસ", loading: "કનેક્શન તપાસી રહ્યું છે...", found: "જાહેર સરનામું મળ્યું", error: "કનેક્શન ભૂલ" },
  pa: { title: "ਨੈੱਟਵਰਕ ਪਛਾਣ ਜਾਂਚ", loading: "ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", found: "ਜਨਤਕ ਪਤਾ ਮਿਲਿਆ", error: "ਕਨੈਕਸ਼ਨ ਗਲਤੀ" },
  ml: { title: "നെറ്റ്‌വർക്ക് ഐഡന്റിറ്റി പരിശോധന", loading: "കണക്ഷൻ പരിശോധിക്കുന്നു...", found: "പൊതു വിലാസം കണ്ടെത്തി", error: "കണക്ഷൻ പിശക്" },
  or: { title: "ନେଟୱାର୍କ ପରିଚୟ ଯାଞ୍ଚ", loading: "କନେକ୍ସନ୍ ଯାଞ୍ଚ କରାଯାଉଛି...", found: "ସାର୍ବଜନୀନ ଠିକଣା ମିଳିଲା", error: "କନେକ୍ସନ୍ ତ୍ରୁଟି" },
  as: { title: "নেটৱৰ্ক পৰিচয় পৰীক্ষা", loading: "সংযোগ পৰীক্ষা কৰা হৈছে...", found: "ৰাজহুৱা ঠিকনা পোৱা গৈছে", error: "সংযোগ ত্ৰুটি" },
  ur: { title: "نیٹ ورک کی شناخت کی جانچ", loading: "کنکشن چیک کیا جا رہا ہے...", found: "عوامی پتہ مل گیا", error: "کنکشن کی خرابی" },
  sa: { title: "जालबन्ध-परिचय-परीक्षणम्", loading: "सम्पर्कं परीक्षते...", found: "सार्वजनिक-सङ्केतः प्राप्तः", error: "सम्पर्कदोषः" }
};

export default function IpScanner() {
  const { language = 'en' } = useTheme();
  const content = textContent[language] || textContent['en'];
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({ ip: '', status: '' });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const runTest = async () => {
      setLoading(true);
      const data = await fetchRealIp(language);
      
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
                <span className="font-mono text-[var(--text-primary)] text-lg bg-[var(--surface-hover)] px-4 py-2 inline-block border border-[var(--border-strong)]">
                  {result.ip}
                </span>
              </div>
            )}
            
            {hasError && (
              <div className="mt-4 bg-[var(--surface)] border border-red-200 dark:border-red-800 p-4">
                <span className="font-mono text-red-600 text-sm">
                  {result.ip}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}