import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { checkWebRtcLeak } from '../../utils/realWebRtcTest';
import { useTheme } from '../../context/ThemeContext';

const textContent = {
  en: { title: "Network Privacy Check", loading: "Checking connection...", secure: "Connection Secure", leak: "Privacy Risk Found", addresses: "Addresses found:" },
  hi: { title: "नेटवर्क गोपनीयता जांच", loading: "कनेक्शन की जांच हो रही है...", secure: "कनेक्शन सुरक्षित", leak: "गोपनीयता जोखिम मिला", addresses: "पते मिले:" },
  mr: { title: "नेटवर्क गोपनीयता तपासणी", loading: "कनेक्शन तपासत आहे...", secure: "कनेक्शन सुरक्षित", leak: "गोपनीयता धोका आढळला", addresses: "पत्ते सापडले:" },
  ta: { title: "நெட்வொர்க் தனியுரிமை சோதனை", loading: "இணைப்பைச் சரிபார்க்கிறது...", secure: "இணைப்பு பாதுகாப்பானது", leak: "தனியுரிமை ஆபத்து கண்டறியப்பட்டது", addresses: "முகவரிகள் கண்டறியப்பட்டன:" },
  te: { title: "నెట్‌వర్క్ గోప్యతా తనిఖీ", loading: "కనెక్షన్‌ని తనిఖీ చేస్తోంది...", secure: "కనెక్షన్ సురక్షితం", leak: "గోప్యతా ప్రమాదం కనుగొనబడింది", addresses: "చిరునామాలు కనుగొనబడ్డాయి:" },
  kn: { title: "ನೆಟ್‌ವರ್ಕ್ ಗೌಪ್ಯತೆ ಪರಿಶೀಲನೆ", loading: "ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", secure: "ಸಂಪರ್ಕ ಸುರಕ್ಷಿತವಾಗಿದೆ", leak: "ಗೌಪ್ಯತೆ ಅಪಾಯ ಕಂಡುಬಂದಿದೆ", addresses: "ವಿಳಾಸಗಳು ಕಂಡುಬಂದಿವೆ:" },
  bn: { title: "নেটওয়ার্ক গোপনীয়তা চেক", loading: "সংযোগ চেক করা হচ্ছে...", secure: "সংযোগ নিরাপদ", leak: "গোপনীয়তা ঝুঁকি পাওয়া গেছে", addresses: "ঠিকানা পাওয়া গেছে:" },
  gu: { title: "નેટવર્ક ગોપનીયતા તપાસ", loading: "કનેક્શન તપાસી રહ્યું છે...", secure: "કનેક્શન સુરક્ષિત", leak: "ગોપનીયતા જોખમ મળ્યું", addresses: "સરનામાં મળ્યાં:" },
  pa: { title: "ਨੈੱਟਵਰਕ ਗੋਪਨੀਯਤਾ ਜਾਂਚ", loading: "ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", secure: "ਕਨੈਕਸ਼ਨ ਸੁਰੱਖਿਅਤ ਹੈ", leak: "ਗੋਪਨੀਯਤਾ ਦਾ ਖਤਰਾ ਮਿਲਿਆ", addresses: "ਪਤੇ ਮਿਲੇ:" },
  ml: { title: "നെറ്റ്‌വർക്ക് സ്വകാര്യതാ പരിശോധന", loading: "കണക്ഷൻ പരിശോധിക്കുന്നു...", secure: "കണക്ഷൻ സുരക്ഷിതമാണ്", leak: "സ്വകാര്യതാ അപകടം കണ്ടെത്തി", addresses: "വിലാസങ്ങൾ കണ്ടെത്തി:" },
  or: { title: "ନେଟୱାର୍କ ଗୋପନୀୟତା ଯାଞ୍ଚ", loading: "କନେକ୍ସନ୍ ଯାଞ୍ଚ କରାଯାଉଛି...", secure: "କନେକ୍ସନ୍ ସୁରକ୍ଷିତ", leak: "ଗୋପନୀୟତା ବିପଦ ମିଳିଲା", addresses: "ଠିକଣା ମିଳିଲା:" },
  as: { title: "নেটৱৰ্ক গোপনীয়তা পৰীক্ষা", loading: "সংযোগ পৰীক্ষা কৰা হৈছে...", secure: "সংযোগ সুৰক্ষিত", leak: "গোপনীয়তাৰ বিপদ পোৱা গৈছে", addresses: "ঠিকনাসমূহ পোৱা গৈছে:" },
  ur: { title: "نیٹ ورک پرائیویسی چیک", loading: "کنکشن چیک کیا جا رہا ہے...", secure: "کنکشن محفوظ ہے", leak: "پرائیویسی کا خطرہ مل گیا", addresses: "پتے مل گئے:" },
  sa: { title: "जालबन्ध-गोपनीयता-परीक्षणम्", loading: "सम्पर्कं परीक्षते...", secure: "सम्पर्कः सुरक्षितः", leak: "गोपनीयता-सङ्कटः प्राप्तः", addresses: "प्राप्तानि सङ्केतानि:" }
};

export default function WebRtcLeak() {
  const { language = 'en' } = useTheme();
  const content = textContent[language] || textContent['en'];
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({ ips: [], status: '' });
  const [hasLeak, setHasLeak] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const runTest = async () => {
      setLoading(true);
      const data = await checkWebRtcLeak(language);
      
      if (isMounted) {
        setResult(data);
        setHasLeak(data.ips && data.ips.length > 0);
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
              {hasLeak ? (
                <div className="flex items-center space-x-2 text-red-600 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-sm font-bold border border-red-200 dark:border-red-800">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span>{content.leak}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-sm font-bold border border-green-200 dark:border-green-800">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>{content.secure}</span>
                </div>
              )}
            </div>

            {hasLeak && (
              <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] p-4">
                <p className="text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
                  {content.addresses}
                </p>
                <ul className="space-y-1">
                  {result.ips.map((ip, index) => (
                    <li key={index} className="font-mono text-[var(--text-primary)] text-sm bg-[var(--surface-hover)] px-2 py-1 inline-block mr-2 border border-[var(--border-strong)]">
                      {ip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}