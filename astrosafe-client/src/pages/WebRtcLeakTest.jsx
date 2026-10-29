import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { checkWebRtcLeak } from '../utils/realWebRtcTest';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Network Privacy Report", description: "This report checks if your hidden network addresses are leaking.", status: "Status", checking: "Checking...", secure: "Connection Secure", leak: "Privacy Risk Found", address: "Hidden Addresses", log: "Diagnostic Log", logEntry: "Check finished." },
  hi: { title: "नेटवर्क गोपनीयता रिपोर्ट", description: "यह रिपोर्ट जांचती है कि क्या आपके छिपे हुए नेटवर्क पते लीक हो रहे हैं।", status: "स्थिति", checking: "जांच हो रही है...", secure: "कनेक्शन सुरक्षित", leak: "गोपनीयता जोखिम मिला", address: "छिपे हुए पते", log: "डायग्नोस्टिक लॉग", logEntry: "जांच पूरी हुई।" },
  mr: { title: "नेटवर्क गोपनीयता अहवाल", description: "हा अहवाल तुमचे लपलेले नेटवर्क पत्ते लीक होत आहेत का ते तपासतो.", status: "स्थिती", checking: "तपासत आहे...", secure: "कनेक्शन सुरक्षित", leak: "गोपनीयता धोका आढळला", address: "लपलेले पत्ते", log: "डायग्नोस्टिक लॉग", logEntry: "तपासणी पूर्ण झाली." },
  ta: { title: "நெட்வொர்க் தனியுரிமை அறிக்கை", description: "உங்கள் மறைக்கப்பட்ட நெட்வொர்க் முகவரிகள் கசிகிறதா என்பதை இந்த அறிக்கை சரிபார்க்கிறது.", status: "நிலை", checking: "சரிபார்க்கிறது...", secure: "இணைப்பு பாதுகாப்பானது", leak: "தனியுரிமை ஆபத்து கண்டறியப்பட்டது", address: "மறைக்கப்பட்ட முகவரிகள்", log: "கண்டறியும் பதிவு", logEntry: "சோதனை முடிந்தது." },
  te: { title: "నెట్‌వర్క్ గోప్యతా నివేదిక", description: "మీ దాచిన నెట్‌వర్క్ చిరునామాలు లీక్ అవుతున్నాయో లేదో ఈ నివేదిక తనిఖీ చేస్తుంది.", status: "స్థితి", checking: "తనిఖీ చేస్తోంది...", secure: "కనెక్షన్ సురక్షితం", leak: "గోప్యతా ప్రమాదం కనుగొనబడింది", address: "దాచిన చిరునామాలు", log: "డయాగ్నోస్టిక్ లాగ్", logEntry: "తనిఖీ పూర్తయింది." },
  kn: { title: "ನೆಟ್‌ವರ್ಕ್ ಗೌಪ್ಯತೆ ವರದಿ", description: "ನಿಮ್ಮ ಗುಪ್ತ ನೆಟ್‌ವರ್ಕ್ ವಿಳಾಸಗಳು ಸೋರಿಕೆಯಾಗುತ್ತಿವೆಯೇ ಎಂದು ಈ ವರದಿಯು ಪರಿಶೀಲಿಸುತ್ತದೆ.", status: "ಸ್ಥಿತಿ", checking: "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", secure: "ಸಂಪರ್ಕ ಸುರಕ್ಷಿತವಾಗಿದೆ", leak: "ಗೌಪ್ಯತೆ ಅಪಾಯ ಕಂಡುಬಂದಿದೆ", address: "ಗುಪ್ತ ವಿಳಾಸಗಳು", log: "ರೋಗನಿರ್ಣಯ ಲಾಗ್", logEntry: "ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಂಡಿದೆ." },
  bn: { title: "নেটওয়ার্ক গোপনীয়তা রিপোর্ট", description: "আপনার লুকানো নেটওয়ার্ক ঠিকানাগুলি ফাঁস হচ্ছে কিনা এই রিপোর্ট তা চেক করে।", status: "স্ট্যাটাস", checking: "চেক করা হচ্ছে...", secure: "সংযোগ নিরাপদ", leak: "গোপনীয়তা ঝুঁকি পাওয়া গেছে", address: "লুকানো ঠিকানা", log: "ডায়াগনস্টিক লগ", logEntry: "চেক সম্পন্ন হয়েছে।" },
  gu: { title: "નેટવર્ક ગોપનીયતા અહેવાલ", description: "આ અહેવાલ તપાસે છે કે શું તમારા છુપાયેલા નેટવર્ક સરનામાં લીક થઈ રહ્યા છે.", status: "સ્થિતિ", checking: "તપાસી રહ્યું છે...", secure: "કનેક્શન સુરક્ષિત", leak: "ગોપનીયતા જોખમ મળ્યું", address: "છુપાયેલા સરનામાં", log: "ડાયગ્નોસ્ટિક લૉગ", logEntry: "તપાસ પૂર્ણ થઈ." },
  pa: { title: "ਨੈੱਟਵਰਕ ਗੋਪਨੀਯਤਾ ਰਿਪੋਰਟ", description: "ਇਹ ਰਿਪੋਰਟ ਜਾਂਚ ਕਰਦੀ ਹੈ ਕਿ ਕੀ ਤੁਹਾਡੇ ਲੁਕਵੇਂ ਨੈੱਟਵਰਕ ਪਤੇ ਲੀਕ ਹੋ ਰਹੇ ਹਨ।", status: "ਸਥਿਤੀ", checking: "ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", secure: "ਕਨੈਕਸ਼ਨ ਸੁਰੱਖਿਅਤ ਹੈ", leak: "ਗੋਪਨੀਯਤਾ ਦਾ ਖਤਰਾ ਮਿਲਿਆ", address: "ਲੁਕਵੇਂ ਪਤੇ", log: "ਡਾਇਗਨੌਸਟਿਕ ਲੌਗ", logEntry: "ਜਾਂਚ ਪੂਰੀ ਹੋਈ।" },
  ml: { title: "നെറ്റ്‌വർക്ക് സ്വകാര്യതാ റിപ്പോർട്ട്", description: "നിങ്ങളുടെ മറഞ്ഞിരിക്കുന്ന നെറ്റ്‌വർക്ക് വിലാസങ്ങൾ ചോരുന്നുണ്ടോ എന്ന് ഈ റിപ്പോർട്ട് പരിശോധിക്കുന്നു.", status: "നില", checking: "പരിശോധിക്കുന്നു...", secure: "കണക്ഷൻ സുരക്ഷിതമാണ്", leak: "സ്വകാര്യതാ അപകടം കണ്ടെത്തി", address: "മറഞ്ഞിരിക്കുന്ന വിലാസങ്ങൾ", log: "ഡയഗ്നോസ്റ്റിക് ലോഗ്", logEntry: "പരിശോധന പൂർത്തിയായി." },
  or: { title: "ନେଟୱାର୍କ ଗୋପନୀୟତା ରିପୋର୍ଟ", description: "ଆପଣଙ୍କର ଲୁକ୍କାୟିତ ନେଟୱାର୍କ ଠିକଣା ଲିକ୍ ହେଉଛି କି ନାହିଁ ଏହି ରିପୋର୍ଟ ଯାଞ୍ଚ କରେ।", status: "ସ୍ଥିତି", checking: "ଯାଞ୍ଚ କରାଯାଉଛି...", secure: "କନେକ୍ସନ୍ ସୁରକ୍ଷିତ", leak: "ଗୋପନୀୟତା ବିପଦ ମିଳିଲା", address: "ଲୁକ୍କାୟିତ ଠିକଣା", log: "ଡାଇଗ୍ନୋଷ୍ଟିକ୍ ଲଗ୍", logEntry: "ଯାଞ୍ଚ ସମ୍ପୂର୍ଣ୍ଣ ହେଲା।" },
  as: { title: "নেটৱৰ্ক গোপনীয়তা ৰিপোৰ্ট", description: "আপোনাৰ লুকুৱা নেটৱৰ্ক ঠিকনাসমূহ লিক হৈছে নেকি এই ৰিপোৰ্টে পৰীক্ষা কৰে।", status: "স্থিতি", checking: "পৰীক্ষা কৰা হৈছে...", secure: "সংযোগ সুৰক্ষিত", leak: "গোপনীয়তাৰ বিপদ পোৱা গৈছে", address: "লুকুৱা ঠিকনাসমূহ", log: "ডায়গনষ্টিক লগ", logEntry: "পৰীক্ষা সম্পূৰ্ণ হ'ল।" },
  ur: { title: "نیٹ ورک پرائیویسی رپورٹ", description: "یہ رپورٹ چیک کرتی ہے کہ آیا آپ کے چھپے ہوئے نیٹ ورک پتے لیک ہو رہے ہیں۔", status: "حیثیت", checking: "چیک کیا جا رہا ہے...", secure: "کنکشن محفوظ ہے", leak: "پرائیویسی کا خطرہ مل گیا", address: "چھپے ہوئے پتے", log: "تشخیصی لاگ", logEntry: "چیک مکمل ہو گیا۔" },
  sa: { title: "जालबन्ध-गोपनीयता-विवरणम्", description: "इदं विवरणं परीक्षते यत् भवतः गुप्ताः जालबन्धसङ्केताः प्रकटीभवन्ति वा।", status: "स्थितिः", checking: "परीक्षते...", secure: "सम्पर्कः सुरक्षितः", leak: "गोपनीयता-सङ्कटः प्राप्तः", address: "गुप्ताः सङ्केताः", log: "परीक्षण-पञ्जिका", logEntry: "परीक्षणं पूर्णम्।" }
};

export default function WebRtcLeakTest() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({ ips: [], status: '' });
  const [hasLeak, setHasLeak] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);
    
    const runTest = async () => {
      setLoading(true);
      const data = await checkWebRtcLeak(language);
      
      if (isMounted) {
        setResult(data);
        setHasLeak(data.ips && data.ips.length > 0);
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
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full"
                >
                  {hasLeak ? (
                    <ul className="space-y-2">
                      {result.ips.map((ip, index) => (
                        <li key={index} className="font-mono text-2xl font-bold text-red-600 dark:text-red-500 break-all bg-[var(--surface-hover)] p-2 border border-red-200 dark:border-red-900/30">
                          {ip}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="font-mono text-2xl font-bold text-[var(--text-secondary)]">
                      --
                    </span>
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
                <div className={`inline-block px-3 py-1 border text-sm font-bold ${hasLeak ? 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-500' : 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500'}`}>
                  {hasLeak ? content.leak : content.secure}
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
                  <span className={hasLeak ? "text-red-600 dark:text-red-500" : "text-green-600 dark:text-green-500"}>
                    {hasLeak ? `WARNING: ${content.leak}` : `SUCCESS: ${content.logEntry}`}
                  </span>
                </div>
                {hasLeak && result.ips.map((ip, index) => (
                  <div key={index} className="flex">
                    <span className="text-[var(--text-muted)] w-24 flex-shrink-0">[{timestamp.split(' - ')[0]}]</span>
                    <span className="text-red-600 dark:text-red-500">LEAK DATA: {ip}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}