import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateCanvasFingerprint } from '../utils/realCanvasTest';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Device Identity Report", description: "This report shows the unique signature your device creates for websites.", status: "Status", checking: "Checking...", found: "Signature Found", hashLabel: "Unique Signature", log: "Diagnostic Log", logEntry: "Signature generated." },
  hi: { title: "डिवाइस पहचान रिपोर्ट", description: "यह रिपोर्ट वह अद्वितीय हस्ताक्षर दिखाती है जो आपका डिवाइस वेबसाइटों के लिए बनाता है।", status: "स्थिति", checking: "जांच हो रही है...", found: "हस्ताक्षर मिला", hashLabel: "अद्वितीय हस्ताक्षर", log: "डायग्नोस्टिक लॉग", logEntry: "हस्ताक्षर उत्पन्न हुआ।" },
  mr: { title: "डिव्हाइस ओळख अहवाल", description: "हा अहवाल तुमचा डिव्हाइस वेबसाइट्ससाठी तयार करत असलेली अद्वितीय स्वाक्षरी दर्शवतो.", status: "स्थिती", checking: "तपासत आहे...", found: "स्वाक्षरी सापडली", hashLabel: "अद्वितीय स्वाक्षरी", log: "डायग्नोस्टिक लॉग", logEntry: "स्वाक्षरी व्युत्पन्न झाली." },
  ta: { title: "சாதன அடையாள அறிக்கை", description: "வலைத்தளங்களுக்கு உங்கள் சாதனம் உருவாக்கும் தனித்துவமான கையொப்பத்தை இந்த அறிக்கை காட்டுகிறது.", status: "நிலை", checking: "சரிபார்க்கிறது...", found: "கையொப்பம் கண்டறியப்பட்டது", hashLabel: "தனித்துவமான கையொப்பம்", log: "கண்டறியும் பதிவு", logEntry: "கையொப்பம் உருவாக்கப்பட்டது." },
  te: { title: "పరికర గుర్తింపు నివేదిక", description: "వెబ్‌సైట్‌ల కోసం మీ పరికరం సృష్టించే ప్రత్యేక సంతకాన్ని ఈ నివేదిక చూపుతుంది.", status: "స్థితి", checking: "తనిఖీ చేస్తోంది...", found: "సంతకం కనుగొనబడింది", hashLabel: "ప్రత్యేక సంతకం", log: "డయాగ్నోస్టిక్ లాగ్", logEntry: "సంతకం సృష్టించబడింది." },
  kn: { title: "ಸಾಧನದ ಗುರುತಿನ ವರದಿ", description: "ವೆಬ್‌ಸೈಟ್‌ಗಳಿಗಾಗಿ ನಿಮ್ಮ ಸಾಧನವು ರಚಿಸುವ ಅನನ್ಯ ಸಹಿಯನ್ನು ಈ ವರದಿಯು ತೋರಿಸುತ್ತದೆ.", status: "ಸ್ಥಿತಿ", checking: "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", found: "ಸಹಿ ಕಂಡುಬಂದಿದೆ", hashLabel: "ಅನನ್ಯ ಸಹಿ", log: "ರೋಗನಿರ್ಣಯ ಲಾಗ್", logEntry: "ಸಹಿ ರಚಿಸಲಾಗಿದೆ." },
  bn: { title: "ডিভাইস পরিচয় রিপোর্ট", description: "এই রিপোর্টটি ওয়েবসাইটের জন্য আপনার ডিভাইসটি যে অনন্য স্বাক্ষর তৈরি করে তা দেখায়।", status: "স্ট্যাটাস", checking: "চেক করা হচ্ছে...", found: "স্বাক্ষর পাওয়া গেছে", hashLabel: "অনন্য স্বাক্ষর", log: "ডায়াগনস্টিক লগ", logEntry: "স্বাক্ষর তৈরি হয়েছে।" },
  gu: { title: "ઉપકરણ ઓળખ અહેવાલ", description: "આ અહેવાલ અનન્ય હસ્તાક્ષર દર્શાવે છે જે તમારું ઉપકરણ વેબસાઇટ્સ માટે બનાવે છે.", status: "સ્થિતિ", checking: "તપાસી રહ્યું છે...", found: "હસ્તાક્ષર મળ્યા", hashLabel: "અનન્ય હસ્તાક્ષર", log: "ડાયગ્નોસ્ટિક લૉગ", logEntry: "હસ્તાક્ષર જનરેટ થયા." },
  pa: { title: "ਡਿਵਾਈਸ ਪਛਾਣ ਰਿਪੋਰਟ", description: "ਇਹ ਰਿਪੋਰਟ ਉਹ ਵਿਲੱਖਣ ਦਸਤਖਤ ਦਿਖਾਉਂਦੀ ਹੈ ਜੋ ਤੁਹਾਡਾ ਡਿਵਾਈਸ ਵੈੱਬਸਾਈਟਾਂ ਲਈ ਬਣਾਉਂਦਾ ਹੈ।", status: "ਸਥਿਤੀ", checking: "ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", found: "ਦਸਤਖਤ ਮਿਲੇ", hashLabel: "ਵਿਲੱਖਣ ਦਸਤਖਤ", log: "ਡਾਇਗਨੌਸਟਿਕ ਲੌਗ", logEntry: "ਦਸਤਖਤ ਬਣਾਏ ਗਏ।" },
  ml: { title: "ഉപകരണ ഐഡന്റിറ്റി റിപ്പോർട്ട്", description: "വെബ്‌സൈറ്റുകൾക്കായി നിങ്ങളുടെ ഉപകരണം സൃഷ്ടിക്കുന്ന തനതായ ഒപ്പ് ഈ റിപ്പോർട്ട് കാണിക്കുന്നു.", status: "നില", checking: "പരിശോധിക്കുന്നു...", found: "ഒപ്പ് കണ്ടെത്തി", hashLabel: "തനതായ ഒപ്പ്", log: "ഡയഗ്നോസ്റ്റിക് ലോഗ്", logEntry: "ഒപ്പ് സൃഷ്ടിച്ചു." },
  or: { title: "ଡିଭାଇସ୍ ପରିଚୟ ରିପୋର୍ଟ", description: "ୱେବସାଇଟ୍ ପାଇଁ ଆପଣଙ୍କର ଡିଭାଇସ୍ ସୃଷ୍ଟି କରୁଥିବା ଅନନ୍ୟ ସ୍ୱାକ୍ଷର ଏହି ରିପୋର୍ଟ ଦେଖାଏ।", status: "ସ୍ଥିତି", checking: "ଯାଞ୍ଚ କରାଯାଉଛି...", found: "ସ୍ୱାକ୍ଷର ମିଳିଲା", hashLabel: "ଅନନ୍ୟ ସ୍ୱାକ୍ଷର", log: "ଡାଇଗ୍ନୋଷ୍ଟିକ୍ ଲଗ୍", logEntry: "ସ୍ୱାକ୍ଷର ସୃଷ୍ଟି ହେଲା।" },
  as: { title: "ডিভাইচ পৰিচয় ৰিপোৰ্ট", description: "এই ৰিপোৰ্টটোৱে ৱেবচাইটৰ বাবে আপোনাৰ ডিভাইচে সৃষ্টি কৰা একক স্বাক্ষৰ দেখুৱায়।", status: "স্থিতি", checking: "পৰীক্ষা কৰা হৈছে...", found: "স্বাক্ষৰ পোৱা গৈছে", hashLabel: "একক স্বাক্ষৰ", log: "ডায়গনষ্টিক লগ", logEntry: "স্বাক্ষৰ সৃষ্টি হ'ল।" },
  ur: { title: "ڈیوائس کی شناخت کی رپورٹ", description: "یہ رپورٹ وہ منفرد دستخط دکھاتی ہے جو آپ کا آلہ ویب سائٹس کے لیے بناتا ہے۔", status: "حیثیت", checking: "چیک کیا جا رہا ہے...", found: "دستخط مل گئے", hashLabel: "منفرد دستخط", log: "تشخیصی لاگ", logEntry: "دستخط بن گئے۔" },
  sa: { title: "यन्त्र-परिचय-विवरणम्", description: "इदं विवरणं तद् अद्वितीयं हस्ताक्षरं दर्शयति यत् भवतः यन्त्रं जालस्थानार्थं निर्माति।", status: "स्थितिः", checking: "परीक्षते...", found: "हस्ताक्षरं प्राप्तम्", hashLabel: "अद्वितीयं हस्ताक्षरम्", log: "परीक्षण-पञ्जिका", logEntry: "हस्ताक्षरं निर्मितम्।" }
};

export default function CanvasFingerprint() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({ hash: '', data: '', status: '' });
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    
    const runTest = async () => {
      setLoading(true);
      const data = await generateCanvasFingerprint(language);
      
      if (isMounted) {
        setResult(data);
        const now = new Date();
        setTimestamp(now.toLocaleTimeString() + ' - ' + now.toLocaleDateString());
        setLoading(false);
      }
    };

    runTest();

    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-8"
      >
        {/* Page Header */}
        <div className="border-b border-[var(--border-strong)] pb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {content.title}
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] font-medium">
            {content.description}
          </p>
        </div>

        {/* Main Diagnostic Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Active Result Panel */}
          <div className="md:col-span-2 bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">
              {content.hashLabel}
            </h2>
            
            <div className="flex flex-col min-h-[80px] justify-center">
              {loading ? (
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 border-4 border-[var(--brand-blue)] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xl font-bold text-[var(--text-primary)]">{content.checking}</span>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full"
                >
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[var(--brand-blue)] break-all bg-[var(--surface-hover)] p-4 border border-[var(--border-strong)]">
                    {result.hash}
                  </div>
                  {result.data && (
                    <div className="mt-4 text-xs font-mono text-[var(--text-muted)] break-all opacity-60">
                      RAW DATA: {result.data}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Status Panel */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">
                {content.status}
              </h2>
              {loading ? (
                <div className="inline-block px-3 py-1 bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] text-sm font-bold">
                  {content.checking}
                </div>
              ) : (
                <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-[var(--brand-blue)] text-sm font-bold">
                  {content.found}
                </div>
              )}
            </div>
            
            {!loading && (
              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)] block">
                  {timestamp}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Business Reporting Log */}
        <div className="bg-[var(--surface)] border border-[var(--border-strong)] shadow-sm">
          <div className="px-6 py-4 bg-[var(--surface-hover)] border-b border-[var(--border)]">
            <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {content.log}
            </h3>
          </div>
          <div className="p-6 font-mono text-sm text-[var(--text-secondary)] space-y-3 min-h-[150px]">
            {loading ? (
              <div className="animate-pulse flex space-x-2">
                <div className="w-2 h-4 bg-[var(--border-strong)]"></div>
                <div className="h-4 bg-[var(--surface-hover)] w-3/4"></div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <div className="flex">
                  <span className="text-[var(--text-muted)] w-24 flex-shrink-0">[{timestamp.split(' - ')[0]}]</span>
                  <span className="text-[var(--text-primary)]">INIT: {content.checking}</span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] w-24 flex-shrink-0">[{timestamp.split(' - ')[0]}]</span>
                  <span className="text-[var(--brand-blue)]">SUCCESS: {content.logEntry}</span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] w-24 flex-shrink-0">[{timestamp.split(' - ')[0]}]</span>
                  <span className="text-[var(--text-primary)]">HASH: {result.hash}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}