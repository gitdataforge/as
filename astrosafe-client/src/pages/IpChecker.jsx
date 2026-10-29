import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchRealIp } from '../utils/realIpTest';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Network Identity Report", description: "This report shows the public address your device shares with websites.", status: "Status", checking: "Checking...", secure: "Check Complete", address: "Public Address", log: "Diagnostic Log", logEntry: "Address request successful." },
  hi: { title: "नेटवर्क पहचान रिपोर्ट", description: "यह रिपोर्ट वह सार्वजनिक पता दिखाती है जो आपका डिवाइस वेबसाइटों के साथ साझा करता है।", status: "स्थिति", checking: "जांच हो रही है...", secure: "जांच पूरी हुई", address: "सार्वजनिक पता", log: "डायग्नोस्टिक लॉग", logEntry: "पता अनुरोध सफल रहा।" },
  mr: { title: "नेटवर्क ओळख अहवाल", description: "हा अहवाल तुमचा डिव्हाइस वेबसाइट्ससह सामायिक करत असलेला सार्वजनिक पत्ता दर्शवतो.", status: "स्थिती", checking: "तपासत आहे...", secure: "तपासणी पूर्ण झाली", address: "सार्वजनिक पत्ता", log: "डायग्नोस्टिक लॉग", logEntry: "पत्ता विनंती यशस्वी." },
  ta: { title: "நெட்வொர்க் அடையாள அறிக்கை", description: "வலைத்தளங்களுடன் உங்கள் சாதனம் பகிரும் பொது முகவரியை இந்த அறிக்கை காட்டுகிறது.", status: "நிலை", checking: "சரிபார்க்கிறது...", secure: "சோதனை முடிந்தது", address: "பொது முகவரி", log: "கண்டறியும் பதிவு", logEntry: "முகவரி கோரிக்கை வெற்றி." },
  te: { title: "నెట్‌వర్క్ గుర్తింపు నివేదిక", description: "వెబ్‌సైట్‌లతో మీ పరికరం పంచుకునే పబ్లిక్ చిరునామాను ఈ నివేదిక చూపుతుంది.", status: "స్థితి", checking: "తనిఖీ చేస్తోంది...", secure: "తనిఖీ పూర్తయింది", address: "పబ్లిక్ చిరునామా", log: "డయాగ్నోస్టిక్ లాగ్", logEntry: "చిరునామా అభ్యర్థన విజయవంతమైంది." },
  kn: { title: "ನೆಟ್‌ವರ್ಕ್ ಗುರುತಿನ ವರದಿ", description: "ವೆಬ್‌ಸೈಟ್‌ಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಸಾಧನವು ಹಂಚಿಕೊಳ್ಳುವ ಸಾರ್ವಜನಿಕ ವಿಳಾಸವನ್ನು ಈ ವರದಿಯು ತೋರಿಸುತ್ತದೆ.", status: "ಸ್ಥಿತಿ", checking: "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", secure: "ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಂಡಿದೆ", address: "ಸಾರ್ವಜನಿಕ ವಿಳಾಸ", log: "ರೋಗನಿರ್ಣಯ ಲಾಗ್", logEntry: "ವಿಳಾಸ ವಿನಂತಿ ಯಶಸ್ವಿಯಾಗಿದೆ." },
  bn: { title: "নেটওয়ার্ক পরিচয় রিপোর্ট", description: "এই রিপোর্টটি ওয়েবসাইটের সাথে আপনার ডিভাইসের শেয়ার করা পাবলিক ঠিকানা দেখায়।", status: "স্ট্যাটাস", checking: "চেক করা হচ্ছে...", secure: "চেক সম্পন্ন হয়েছে", address: "পাবলিক ঠিকানা", log: "ডায়াগনস্টিক লগ", logEntry: "ঠিকানা অনুরোধ সফল।" },
  gu: { title: "નેટવર્ક ઓળખ અહેવાલ", description: "આ અહેવાલ વેબસાઇટ્સ સાથે તમારું ઉપકરણ શેર કરે છે તે જાહેર સરનામું દર્શાવે છે.", status: "સ્થિતિ", checking: "તપાસી રહ્યું છે...", secure: "તપાસ પૂર્ણ થઈ", address: "જાહેર સરનામું", log: "ડાયગ્નોસ્ટિક લૉગ", logEntry: "સરનામાંની વિનંતી સફળ." },
  pa: { title: "ਨੈੱਟਵਰਕ ਪਛਾਣ ਰਿਪੋਰਟ", description: "ਇਹ ਰਿਪੋਰਟ ਉਹ ਜਨਤਕ ਪਤਾ ਦਿਖਾਉਂਦੀ ਹੈ ਜੋ ਤੁਹਾਡਾ ਡਿਵਾਈਸ ਵੈੱਬਸਾਈਟਾਂ ਨਾਲ ਸਾਂਝਾ ਕਰਦਾ ਹੈ।", status: "ਸਥਿਤੀ", checking: "ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", secure: "ਜਾਂਚ ਪੂਰੀ ਹੋਈ", address: "ਜਨਤਕ ਪਤਾ", log: "ਡਾਇਗਨੌਸਟਿਕ ਲੌਗ", logEntry: "ਪਤਾ ਬੇਨਤੀ ਸਫਲ ਰਹੀ।" },
  ml: { title: "നെറ്റ്‌വർക്ക് ഐഡന്റിറ്റി റിപ്പോർട്ട്", description: "വെബ്‌സൈറ്റുകളുമായി നിങ്ങളുടെ ഉപകരണം പങ്കിടുന്ന പൊതു വിലാസം ഈ റിപ്പോർട്ട് കാണിക്കുന്നു.", status: "നില", checking: "പരിശോധിക്കുന്നു...", secure: "പരിശോധന പൂർത്തിയായി", address: "പൊതു വിലാസം", log: "ഡയഗ്നോസ്റ്റിക് ലോഗ്", logEntry: "വിലാസ അഭ്യർത്ഥന വിജയിച്ചു." },
  or: { title: "ନେଟୱାର୍କ ପରିଚୟ ରିପୋର୍ଟ", description: "ୱେବସାଇଟ୍ ସହିତ ଆପଣଙ୍କର ଡିଭାଇସ୍ ସେୟାର କରୁଥିବା ସାର୍ବଜନୀନ ଠିକଣା ଏହି ରିପୋର୍ଟ ଦେଖାଏ।", status: "ସ୍ଥିତି", checking: "ଯାଞ୍ଚ କରାଯାଉଛି...", secure: "ଯାଞ୍ଚ ସମ୍ପୂର୍ଣ୍ଣ ହେଲା", address: "ସାର୍ବଜନୀନ ଠିକଣା", log: "ଡାଇଗ୍ନୋଷ୍ଟିକ୍ ଲଗ୍", logEntry: "ଠିକଣା ଅନୁରୋଧ ସଫଳ ହେଲା।" },
  as: { title: "নেটৱৰ্ক পৰিচয় ৰিপোৰ্ট", description: "এই ৰিপোৰ্টটোৱে ৱেবচাইটৰ সৈতে আপোনাৰ ডিভাইচে শ্বেয়াৰ কৰা ৰাজহুৱা ঠিকনা দেখুৱায়।", status: "স্থিতি", checking: "পৰীক্ষা কৰা হৈছে...", secure: "পৰীক্ষা সম্পূৰ্ণ হ'ল", address: "ৰাজহুৱা ঠিকনা", log: "ডায়গনষ্টিক লগ", logEntry: "ঠিকনা অনুৰোধ সফল হ'ল।" },
  ur: { title: "نیٹ ورک کی شناخت کی رپورٹ", description: "یہ رپورٹ وہ عوامی پتہ دکھاتی ہے جو آپ کا آلہ ویب سائٹس کے ساتھ شیئر کرتا ہے۔", status: "حیثیت", checking: "چیک کیا جا رہا ہے...", secure: "چیک مکمل ہو گیا", address: "عوامی پتہ", log: "تشخیصی لاگ", logEntry: "پتے کی درخواست کامیاب رہی۔" },
  sa: { title: "जालबन्ध-परिचय-विवरणम्", description: "इदं विवरणं सार्वजनिक्सङ्केतं दर्शयति यत् भवतः यन्त्रं जालस्थानैः सह विभजते।", status: "स्थितिः", checking: "परीक्षते...", secure: "परीक्षणं पूर्णम्", address: "सार्वजनिकसङ्केतः", log: "परीक्षण-पञ्जिका", logEntry: "सङ्केत-अनुरोधः सफलः।" }
};

export default function IpChecker() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({ ip: '', status: '' });
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    
    const runTest = async () => {
      setLoading(true);
      const data = await fetchRealIp(language);
      
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
              {content.address}
            </h2>
            
            <div className="flex items-center min-h-[80px]">
              {loading ? (
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 border-4 border-[var(--brand-blue)] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xl font-bold text-[var(--text-primary)]">{content.checking}</span>
                </div>
              ) : (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-4xl font-bold text-[var(--brand-blue)] break-all"
                >
                  {result.ip}
                </motion.span>
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
                <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-500 text-sm font-bold">
                  {content.secure}
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
                  <span className="text-green-600 dark:text-green-500">SUCCESS: {content.logEntry}</span>
                </div>
                <div className="flex">
                  <span className="text-[var(--text-muted)] w-24 flex-shrink-0">[{timestamp.split(' - ')[0]}]</span>
                  <span className="text-[var(--brand-blue)]">DATA: {result.ip}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}