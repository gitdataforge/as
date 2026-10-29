import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "System Report", description: "This is a live report of your current device settings and capabilities.", print: "Print Report", browser: "Browser System", screen: "Screen Size", cookies: "Cookies Allowed", processors: "Processors", active: "Active", inactive: "Inactive", memory: "Device Memory", unknown: "Unknown" },
  hi: { title: "सिस्टम रिपोर्ट", description: "यह आपके वर्तमान डिवाइस सेटिंग्स और क्षमताओं की लाइव रिपोर्ट है।", print: "रिपोर्ट प्रिंट करें", browser: "ब्राउज़र सिस्टम", screen: "स्क्रीन का आकार", cookies: "कुकीज़ अनुमत", processors: "प्रोसेसर", active: "सक्रिय", inactive: "निष्क्रिय", memory: "डिवाइस मेमोरी", unknown: "अज्ञात" },
  mr: { title: "सिस्टम अहवाल", description: "हा तुमच्या वर्तमान डिव्हाइस सेटिंग्ज आणि क्षमतांचा थेट अहवाल आहे.", print: "अहवाल मुद्रित करा", browser: "ब्राउझर सिस्टम", screen: "स्क्रीन आकार", cookies: "कुकीज अनुमत", processors: "प्रोसेसर", active: "सक्रिय", inactive: "निष्क्रिय", memory: "डिव्हाइस मेमरी", unknown: "अज्ञात" },
  ta: { title: "கணினி அறிக்கை", description: "இது உங்கள் தற்போதைய சாதன அமைப்புகள் மற்றும் திறன்களின் நேரடி அறிக்கை.", print: "அறிக்கையை அச்சிடு", browser: "உலாவி அமைப்பு", screen: "திரை அளவு", cookies: "குக்கீகள் அனுமதிக்கப்பட்டுள்ளன", processors: "செயலிகள்", active: "செயலில்", inactive: "செயலற்ற", memory: "சாதன நினைவகம்", unknown: "தெரியவில்லை" },
  te: { title: "సిస్టమ్ నివేదిక", description: "ఇది మీ ప్రస్తుత పరికర సెట్టింగ్‌లు మరియు సామర్థ్యాల ప్రత్యక్ష నివేదిక.", print: "నివేదికను ముద్రించండి", browser: "బ్రౌజర్ సిస్టమ్", screen: "స్క్రీన్ పరిమాణం", cookies: "కుకీలు అనుమతించబడ్డాయి", processors: "ప్రాసెసర్లు", active: "క్రియాశీలం", inactive: "క్రియారహితం", memory: "పరికర మెమరీ", unknown: "తెలియదు" },
  kn: { title: "ಸಿಸ್ಟಮ್ ವರದಿ", description: "ಇದು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸಾಧನ ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಮತ್ತು ಸಾಮರ್ಥ್ಯಗಳ ಲೈವ್ ವರದಿಯಾಗಿದೆ.", print: "ವರದಿ ಮುದ್ರಿಸಿ", browser: "ಬ್ರೌಸರ್ ಸಿಸ್ಟಮ್", screen: "ಪರದೆಯ ಗಾತ್ರ", cookies: "ಕುಕೀಗಳನ್ನು ಅನುಮತಿಸಲಾಗಿದೆ", processors: "ಪ್ರೊಸೆಸರ್‌ಗಳು", active: "ಸಕ್ರಿಯ", inactive: "ನಿಷ್ಕ್ರಿಯ", memory: "ಸಾಧನದ ಮೆಮೊರಿ", unknown: "ತಿಳಿದಿಲ್ಲ" },
  bn: { title: "সিস্টেম রিপোর্ট", description: "এটি আপনার বর্তমান ডিভাইস সেটিংস এবং ক্ষমতার একটি লাইভ রিপোর্ট।", print: "রিপোর্ট প্রিন্ট করুন", browser: "ব্রাউজার সিস্টেম", screen: "স্ক্রিন আকার", cookies: "কুকিজ অনুমোদিত", processors: "প্রসেসর", active: "সক্রিয়", inactive: "নিষ্ক্রিয়", memory: "ডিভাইস মেমরি", unknown: "অজানা" },
  gu: { title: "સિસ્ટમ અહેવાલ", description: "આ તમારા વર્તમાન ઉપકરણ સેટિંગ્સ અને ક્ષમતાઓનો લાઇવ અહેવાલ છે.", print: "અહેવાલ છાપો", browser: "બ્રાઉઝર સિસ્ટમ", screen: "સ્ક્રીન કદ", cookies: "કૂકીઝ માન્ય", processors: "પ્રોસેસર્સ", active: "સક્રિય", inactive: "નિષ્ક્રિય", memory: "ઉપકરણ મેમરી", unknown: "અજ્ઞાત" },
  pa: { title: "ਸਿਸਟਮ ਰਿਪੋਰਟ", description: "ਇਹ ਤੁਹਾਡੀਆਂ ਮੌਜੂਦਾ ਡਿਵਾਈਸ ਸੈਟਿੰਗਾਂ ਅਤੇ ਸਮਰੱਥਾਵਾਂ ਦੀ ਲਾਈਵ ਰਿਪੋਰਟ ਹੈ।", print: "ਰਿਪੋਰਟ ਛਾਪੋ", browser: "ਬ੍ਰਾਊਜ਼ਰ ਸਿਸਟਮ", screen: "ਸਕ੍ਰੀਨ ਆਕਾਰ", cookies: "ਕੂਕੀਜ਼ ਮਨਜ਼ੂਰ", processors: "ਪ੍ਰੋਸੈਸਰ", active: "ਸਰਗਰਮ", inactive: "ਗੈਰ-ਸਰਗਰਮ", memory: "ਡਿਵਾਈਸ ਮੈਮੋਰੀ", unknown: "ਅਣਜਾਣ" },
  ml: { title: "സിസ്റ്റം റിപ്പോർട്ട്", description: "ഇത് നിങ്ങളുടെ നിലവിലെ ഉപകരണ ക്രമീകരണങ്ങളുടെയും കഴിവുകളുടെയും തത്സമയ റിപ്പോർട്ടാണ്.", print: "റിപ്പോർട്ട് പ്രിന്റ് ചെയ്യുക", browser: "ബ്രൗസർ സിസ്റ്റം", screen: "സ്ക്രീൻ വലുപ്പം", cookies: "കുക്കികൾ അനുവദിച്ചു", processors: "പ്രോസസ്സറുകൾ", active: "സജീവം", inactive: "നിർജ്ജീവം", memory: "ഉപകരണ മെമ്മറി", unknown: "അജ്ഞാതം" },
  or: { title: "ସିଷ୍ଟମ୍ ରିପୋର୍ଟ", description: "ଏହା ଆପଣଙ୍କର ବର୍ତ୍ତମାନର ଡିଭାଇସ୍ ସେଟିଂସମୂହ ଏବଂ କ୍ଷମତାର ଏକ ଲାଇଭ୍ ରିପୋର୍ଟ |", print: "ରିପୋର୍ଟ ପ୍ରିଣ୍ଟ କରନ୍ତୁ", browser: "ବ୍ରାଉଜର୍ ସିଷ୍ଟମ୍", screen: "ସ୍କ୍ରିନ୍ ଆକାର", cookies: "କୁକିଜ୍ ଅନୁମୋଦିତ", processors: "ପ୍ରୋସେସର୍", active: "ସକ୍ରିୟ", inactive: "ନିଷ୍କ୍ରିୟ", memory: "ଡିଭାଇସ୍ ମେମୋରୀ", unknown: "ଅଜ୍ଞାତ" },
  as: { title: "চিষ্টেম ৰিপোৰ্ট", description: "এইটো আপোনাৰ বৰ্তমানৰ ডিভাইচ ছেটিংছ আৰু ক্ষমতাসমূহৰ এক লাইভ ৰিপোৰ্ট।", print: "ৰিপোৰ্ট প্ৰিণ্ট কৰক", browser: "ব্ৰাউজাৰ চিষ্টেম", screen: "স্ক্ৰীণৰ আকাৰ", cookies: "কুকিজ অনুমোদিত", processors: "প্ৰচেছৰ", active: "সক্ৰিয়", inactive: "নিষ্ক্ৰিয়", memory: "ডিভাইচ মেম'ৰী", unknown: "অজ্ঞাত" },
  ur: { title: "سسٹم رپورٹ", description: "یہ آپ کے موجودہ ڈیوائس کی ترتیبات اور صلاحیتوں کی لائیو رپورٹ ہے۔", print: "رپورٹ پرنٹ کریں", browser: "براؤزر سسٹم", screen: "اسکرین کا سائز", cookies: "کوکیز کی اجازت ہے", processors: "پروسیسرز", active: "فعال", inactive: "غیر فعال", memory: "ڈیوائس میموری", unknown: "نامعلوم" },
  sa: { title: "तन्त्र-विवरणम्", description: "इदं भवतः वर्तमानयन्त्रस्य व्यवस्थानां क्षमतानां च जीवन्तं विवरणम् अस्ति।", print: "विवरणं मुद्रयतु", browser: "गवेषकतन्त्रम्", screen: "दृश्यपटलस्य आकारः", cookies: "कुकीज अनुमतम्", processors: "संसाधकाः", active: "सक्रियम्", inactive: "निष्क्रियम्", memory: "यन्त्रस्मृतिः", unknown: "अज्ञातम्" }
};

export default function Reports() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch real browser and system data without mock simulations
    const fetchRealSystemData = () => {
      const data = {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        cookiesEnabled: navigator.cookieEnabled,
        cores: navigator.hardwareConcurrency || content.unknown,
        memory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : content.unknown,
        timestamp: new Date().toLocaleString()
      };
      setReportData(data);
    };

    fetchRealSystemData();
  }, [content.unknown]);

  const handlePrint = () => {
    window.print();
  };

  if (!reportData) return null;

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl space-y-8"
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-strong)] pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {content.title}
            </h1>
            <p className="mt-2 text-[var(--text-secondary)] font-medium">
              {content.description}
            </p>
          </div>
          <button 
            onClick={handlePrint}
            className="px-6 py-3 bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-hover)] text-[var(--brand-white)] font-bold shadow-sm transition-colors border border-transparent whitespace-nowrap"
          >
            {content.print}
          </button>
        </div>

        {/* Real Data Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Browser System Card */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-6 shadow-sm col-span-1 lg:col-span-2">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.browser}
            </h2>
            <div className="font-mono text-sm sm:text-base text-[var(--brand-blue)] font-bold break-all bg-[var(--surface-hover)] p-4 border border-[var(--border)]">
              {reportData.userAgent}
            </div>
          </div>

          {/* Device Memory Card */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-6 shadow-sm">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.memory}
            </h2>
            <div className="font-mono text-3xl font-bold text-[var(--text-primary)] mt-2">
              {reportData.memory}
            </div>
          </div>

          {/* Processors Card */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-6 shadow-sm">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.processors}
            </h2>
            <div className="font-mono text-3xl font-bold text-[var(--text-primary)] mt-2">
              {reportData.cores}
            </div>
          </div>

          {/* Screen Size Card */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-6 shadow-sm">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.screen}
            </h2>
            <div className="font-mono text-3xl font-bold text-[var(--text-primary)] mt-2">
              {reportData.screenWidth} x {reportData.screenHeight}
            </div>
          </div>

          {/* Cookies Status Card */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-6 shadow-sm">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.cookies}
            </h2>
            <div className={`mt-2 inline-block px-4 py-2 border text-sm font-bold ${reportData.cookiesEnabled ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500' : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-500'}`}>
              {reportData.cookiesEnabled ? content.active : content.inactive}
            </div>
          </div>

        </div>

        {/* Timestamp Footer */}
        <div className="pt-4 border-t border-[var(--border)]">
          <span className="text-xs font-mono text-[var(--text-muted)] block text-right">
            {reportData.timestamp}
          </span>
        </div>

      </motion.div>
    </div>
  );
}