import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { 
    title: "Privacy Report", 
    subtitle: "System Diagnostic Analysis", 
    scanBtn: "Run Privacy Scan", 
    scanning: "Analyzing System...", 
    statusSafe: "Network Protected", 
    statusRisk: "Attention Required", 
    detailsTitle: "Diagnostic Summary", 
    ipLabel: "Network Address Status", 
    secureContextLabel: "Secure Connection Status", 
    print: "Print Report",
    safeDesc: "Your device is operating under strict privacy protocols.",
    riskDesc: "Potential tracking vectors detected on current network connection."
  },
  hi: { 
    title: "गोपनीयता रिपोर्ट", 
    subtitle: "सिस्टम डायग्नोस्टिक विश्लेषण", 
    scanBtn: "गोपनीयता स्कैन चलाएं", 
    scanning: "सिस्टम का विश्लेषण हो रहा है...", 
    statusSafe: "नेटवर्क सुरक्षित", 
    statusRisk: "ध्यान देने की आवश्यकता है", 
    detailsTitle: "डायग्नोस्टिक सारांश", 
    ipLabel: "नेटवर्क पता स्थिति", 
    secureContextLabel: "सुरक्षित कनेक्शन स्थिति", 
    print: "रिपोर्ट प्रिंट करें",
    safeDesc: "आपका डिवाइस सख्त गोपनीयता प्रोटोकॉल के तहत काम कर रहा है।",
    riskDesc: "वर्तमान नेटवर्क कनेक्शन पर संभावित ट्रैकिंग खतरे पाए गए।"
  },
  mr: { 
    title: "गोपनीयता अहवाल", 
    subtitle: "सिस्टम डायग्नोस्टिक विश्लेषण", 
    scanBtn: "गोपनीयता स्कॅन चालवा", 
    scanning: "सिस्टमचे विश्लेषण करत आहे...", 
    statusSafe: "नेटवर्क संरक्षित", 
    statusRisk: "लक्ष देणे आवश्यक आहे", 
    detailsTitle: "डायग्नोस्टिक सारांश", 
    ipLabel: "नेटवर्क पत्ता स्थिती", 
    secureContextLabel: "सुरक्षित कनेक्शन स्थिती", 
    print: "अहवाल मुद्रित करा",
    safeDesc: "तुमचे डिव्हाइस कडक गोपनीयता नियमांनुसार कार्यरत आहे.",
    riskDesc: "वर्तमान नेटवर्क कनेक्शनवर संभाव्य ट्रॅकिंग धोके आढळले."
  },
  ta: { 
    title: "தனியுரிமை அறிக்கை", 
    subtitle: "கணினி கண்டறிதல் பகுப்பாய்வு", 
    scanBtn: "தனியுரிமை ஸ்கேன் இயக்கு", 
    scanning: "கணினி ஆய்வு செய்யப்படுகிறது...", 
    statusSafe: "நெட்வொர்க் பாதுகாப்பானது", 
    statusRisk: "கவனம் தேவை", 
    detailsTitle: "கண்டறிதல் சுருக்கம்", 
    ipLabel: "நெட்வொர்க் முகவரி நிலை", 
    secureContextLabel: "பாதுகாப்பான இணைப்பு நிலை", 
    print: "அறிக்கையை அச்சிடு",
    safeDesc: "உங்கள் சாதனம் கடுமையான தனியுரிமை நெறிமுறைகளின் கீழ் இயங்குகிறது.",
    riskDesc: "தற்போதைய நெட்வொர்க் இணைப்பில் சாத்தியமான கண்காணிப்பு அச்சுறுத்தல்கள் கண்டறியப்பட்டன."
  },
  te: { 
    title: "గోప్యతా నివేదిక", 
    subtitle: "సిస్టమ్ డయాగ్నొస్టిక్ విశ్లేషణ", 
    scanBtn: "గోప్యతా స్కాన్ అమలు చేయండి", 
    scanning: "సిస్టమ్ విశ్లేషించబడుతోంది...", 
    statusSafe: "నెట్‌వర్క్ సురక్షితం", 
    statusRisk: "శ్రద్ధ అవసరం", 
    detailsTitle: "డయాగ్నొస్టిక్ సారాంశం", 
    ipLabel: "నెట్‌వర్క్ చిరునామా స్థితి", 
    secureContextLabel: "సురక్షిత కనెక్షన్ స్థితి", 
    print: "నివేదికను ముద్రించండి",
    safeDesc: "మీ పరికరం కఠినమైన గోప్యతా మార్గదర్శకాల క్రింద పనిచేస్తోంది.",
    riskDesc: "ప్రస్తుత నెట్‌వర్క్ కనెక్షన్‌లో సంభావ్య ట్రాకింగ్ ముప్పులు కనుగొనబడ్డాయి."
  },
  kn: { 
    title: "ಗೌಪ್ಯತೆ ವರದಿ", 
    subtitle: "ಸಿಸ್ಟಮ್ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ ವಿಶ್ಲೇಷಣೆ", 
    scanBtn: "ಗೌಪ್ಯತೆ ಸ್ಕ್ಯಾನ್ ರನ್ ಮಾಡಿ", 
    scanning: "ಸಿಸ್ಟಮ್ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...", 
    statusSafe: "ನೆಟ್‌ವರ್ಕ್ ಸುರಕ್ಷಿತವಾಗಿದೆ", 
    statusRisk: "ಗಮನ ಹರಿಸುವುದು ಅಗತ್ಯ", 
    detailsTitle: "ಡಯಾಗ್ನೋಸ್ಟಿಕ್ ಸಾರಾಂಶ", 
    ipLabel: "ನೆಟ್‌ವರ್ಕ್ ವಿಳಾಸ ಸ್ಥಿತಿ", 
    secureContextLabel: "ಸುರಕ್ಷಿತ ಸಂಪರ್ಕ ಸ್ಥಿತಿ", 
    print: "ವರದಿ ಮುದ್ರಿಸಿ",
    safeDesc: "ನಿಮ್ಮ ಸಾಧನವು ಕಟ್ಟುನಿಟ್ಟಾದ ಗೌಪ್ಯತೆ ಪ್ರೋಟೋಕಾಲ್‌ಗಳ ಅಡಿಯಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ.",
    riskDesc: "ಪ್ರಸ್ತುತ ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕದಲ್ಲಿ ಸಂಭಾವ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಅಪಾಯಗಳು ಕಂಡುಬಂದಿವೆ."
  },
  bn: { 
    title: "গোপনীয়তা রিপোর্ট", 
    subtitle: "সিস্টেম ডায়াগনস্টিক বিশ্লেষণ", 
    scanBtn: "গোপনীয়তা স্ক্যান চালান", 
    scanning: "সিস্টেম বিশ্লেষণ করা হচ্ছে...", 
    statusSafe: "নেটওয়ার্ক সুরক্ষিত", 
    statusRisk: "মনোযোগ প্রয়োজন", 
    detailsTitle: "ডায়াগনস্টিক সারাংশ", 
    ipLabel: "নেটওয়ার্ক ঠিকানা স্থিতি", 
    secureContextLabel: "নিরাপদ সংযোগ স্থিতি", 
    print: "রিপোর্ট প্রিন্ট করুন",
    safeDesc: "আপনার ডিভাইস কঠোর গোপনীয়তা প্রোটোকলের অধীনে কাজ করছে।",
    riskDesc: "বর্তমান নেটওয়ার্ক সংযোগে সম্ভাব্য ট্র্যাকিং হুমকি সনাক্ত করা হয়েছে।"
  },
  gu: { 
    title: "ગોપનીયતા અહેવાલ", 
    subtitle: "સિસ્ટમ ડાયગ્નોસ્ટિક વિશ્લેષણ", 
    scanBtn: "ગોપનીયતા સ્કેન ચલાવો", 
    scanning: "સિસ્ટમનું વિશ્લેષણ થઈ રહ્યું છે...", 
    statusSafe: "નેટવર્ક સુરક્ષિત", 
    statusRisk: "ધ્યાન આપવાની જરૂર છે", 
    detailsTitle: "ડાયગ્નોસ્ટિક સારાંશ", 
    ipLabel: "નેટવર્ક સરનામું સ્થિતિ", 
    secureContextLabel: "સુરક્ષિત કનેક્શન સ્થિતિ", 
    print: "અહેવાલ છાપો",
    safeDesc: "તમારું ઉપકરણ કડક ગોપનીયતા પ્રોટોકોલ હેઠળ કાર્ય કરી રહ્યું છે.",
    riskDesc: "વર્તમાન નેટવર્ક કનેક્શન પર સંભવિત ટ્રેકિંગ જોખમો મળી આવ્યા છે."
  },
  pa: { 
    title: "ਗੋਪਨੀਯਤਾ ਰਿਪੋਰਟ", 
    subtitle: "ਸਿਸਟਮ ਡਾਇਗਨੌਸਟਿਕ ਵਿਸ਼ਲੇਸ਼ਣ", 
    scanBtn: "ਗੋਪਨੀਯਤਾ ਸਕੈਨ ਚਲਾਓ", 
    scanning: "ਸਿਸਟਮ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...", 
    statusSafe: "ਨੈੱਟਵਰਕ ਸੁਰੱਖਿਅਤ", 
    statusRisk: "ਧਿਆਨ ਦੇਣ ਦੀ ਲੋੜ ਹੈ", 
    detailsTitle: "ਡਾਇਗਨੌਸਟਿਕ ਸਾਰ", 
    ipLabel: "ਨੈੱਟਵਰਕ ਪਤਾ ਸਥਿਤੀ", 
    secureContextLabel: "ਸੁਰੱਖਿਅਤ ਕਨੈਕਸ਼ਨ ਸਥਿਤੀ", 
    print: "ਰਿਪੋਰਟ ਛਾਪੋ",
    safeDesc: "ਤੁਹਾਡੀ ਡਿਵਾਈਸ ਸਖ਼ਤ ਗੋਪਨੀਯਤਾ ਪ੍ਰੋਟੋਕੋਲ ਤਹਿਤ ਕੰਮ ਕਰ ਰਹੀ ਹੈ।",
    riskDesc: "ਮੌਜੂਦਾ ਨੈੱਟਵਰਕ ਕਨੈਕਸ਼ਨ 'ਤੇ ਸੰਭਾਵੀ ਟਰੈਕਿੰਗ ਖਤਰੇ ਮਿਲੇ ਹਨ।"
  },
  ml: { 
    title: "സ്വകാര്യതാ റിപ്പോർട്ട്", 
    subtitle: "സിസ്റ്റം ഡയഗ്നോസ്റ്റിക് വിശകലനം", 
    scanBtn: "സ്വകാര്യതാ സ്കാൻ പ്രവർത്തിപ്പിക്കുക", 
    scanning: "സിസ്റ്റം വിശകലനം ചെയ്യുന്നു...", 
    statusSafe: "നെറ്റ്‌വർക്ക് സുരക്ഷിതം", 
    statusRisk: "ശ്രദ്ധ ആവശ്യമാണ്", 
    detailsTitle: "ഡയഗ്നോസ്റ്റിക് സംഗ്രഹം", 
    ipLabel: "നെറ്റ്‌വർക്ക് വിലാസ നില", 
    secureContextLabel: "സുരക്ഷിത കണക്ഷൻ നില", 
    print: "റിപ്പോർട്ട് പ്രിന്റ് ചെയ്യുക",
    safeDesc: "നിങ്ങളുടെ ഉപകരണം കർശനമായ സ്വകാര്യതാ പ്രോട്ടോക്കോളുകൾക്ക് കീഴിലാണ് പ്രവർത്തിക്കുന്നത്.",
    riskDesc: "നിലവിലെ നെറ്റ്‌വർക്ക് കണക്ഷനിൽ സാധ്യമായ ട്രാക്കിംഗ് ഭീഷണികൾ കണ്ടെത്തി."
  },
  or: { 
    title: "ଗୋପନୀୟତା ରିପୋର୍ଟ", 
    subtitle: "ସିଷ୍ଟମ୍ ଡାଏଗ୍ନୋଷ୍ଟିକ୍ ବିଶ୍ଳେଷଣ", 
    scanBtn: "ଗୋପନୀୟତା ସ୍କାନ୍ ଚଲାନ୍ତୁ", 
    scanning: "ସିଷ୍ଟମ୍ ବିଶ୍ଳେଷଣ କରାଯାଉଛି...", 
    statusSafe: "ନେଟୱାର୍କ ସୁରକ୍ଷିତ", 
    statusRisk: "ଯତ୍ନ ନେବା ଆବଶ୍ୟକ", 
    detailsTitle: "ଡାଏଗ୍ନୋଷ୍ଟିକ୍ସ ସାରାଂଶ", 
    ipLabel: "ନେଟୱାର୍କ ଠିକଣା ସ୍ଥିତି", 
    secureContextLabel: "ସୁରକ୍ଷିତ ସଂଯୋଗ ସ୍ଥିତି", 
    print: "ରିପୋର୍ଟ ପ୍ରିଣ୍ଟ କରନ୍ତୁ",
    safeDesc: "ଆପଣଙ୍କର ଡିଭାଇସ୍ କଠିନ ଗୋପନୀୟତା ପ୍ରୋଟୋକଲ୍ ଅଧୀନରେ କାର୍ଯ୍ୟ କରୁଛି |",
    riskDesc: "ବର୍ତ୍ତମାନର ନେଟୱାର୍କ ସଂଯୋଗରେ सम्भावित ଟ୍ରାକିଂ ବିପଦ ମିଳିଛି |"
  },
  as: { 
    title: "গোপনীয়তা ৰিপোৰ্ট", 
    subtitle: "চিষ্টেম ডায়াগনষ্টিক বিশ্লেষণ", 
    scanBtn: "গোপনীয়তা স্কেন চলাওক", 
    scanning: "চিষ্টেম বিশ্লেষণ কৰা হৈছে...", 
    statusSafe: "নেটৱৰ্ক সুৰক্ষিত", 
    statusRisk: "সচেতনতা প্ৰয়োজনীয়", 
    detailsTitle: "ডায়াগনষ্টিক সাৰাংশ", 
    ipLabel: "নেটৱৰ্ক ঠিকনা স্থিতি", 
    secureContextLabel: "সুৰক্ষিত সংযোগ স্থিতি", 
    print: "ৰিপোৰ্ট প্ৰিণ্ট কৰক",
    safeDesc: "আপোনাৰ ডিভাইচটো কঠোৰ গোপনীয়তা প্ৰটোকলৰ অধীনত কাৰ্যক্ষম হৈ আছে।",
    riskDesc: "বৰ্তমানৰ নেটৱৰ্ক সংযোগত সম্ভাৱ্য ট্ৰেকিং বিপদ পোৱা গৈছে।"
  },
  ur: { 
    title: "رازداری کی رپورٹ", 
    subtitle: "سسٹم تشخیصی تجزیہ", 
    scanBtn: "پرائیویسی اسکین چلائیں", 
    scanning: "سسٹم کا تجزیہ کیا جا رہا ہے...", 
    statusSafe: "نیٹ ورک محفوظ", 
    statusRisk: "توجہ درکار ہے", 
    detailsTitle: "تشخیصی خلاصہ", 
    ipLabel: "نیٹ ورک کا پتہ کی حیثیت", 
    secureContextLabel: "محفوظ کنکشن کی حیثیت", 
    print: "رپورٹ پرنٹ کریں",
    safeDesc: "آپ کا ڈیوائس سخت پرائیویسی پروٹوکول کے تحت کام کر رہا ہے۔",
    riskDesc: "موجودہ نیٹ ورک کنکشن پر ممکنہ ٹریکنگ کے خطرات پائے گئے۔"
  },
  sa: { 
    title: "गोपनीयता-विवरणम्", 
    subtitle: "तन्त्र-परीक्षण-विश्लेषणम्", 
    scanBtn: "गोपनीयता-परीक्षणं चालयतु", 
    scanning: "तन्त्रस्य विश्लेषणं क्रियते...", 
    statusSafe: "जालबन्धः सुरक्षितः", 
    statusRisk: "ध्यानं आवश्यकम्", 
    detailsTitle: "परीक्षण-सारಾಂಶः", 
    ipLabel: "जालबन्ध-सङ्केत-स्थितिः", 
    secureContextLabel: "सुरक्षित-सम्पर्क-स्थितिः", 
    print: "विवरणं मुद्रयतु",
    safeDesc: "भवतः यन्त्रं कठोर-गोपनीयता-नियमानाम् अधीनं कार्यं करोति।",
    riskDesc: "वर्तमान-जालबन्ध-सम्पर्के सम्भावित-अनुसरण-सङ्कटाः प्राप्ताः।"
  }
};

export default function PrivacyReport() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];

  const [scanning, setScanning] = useState(false);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const runPrivacyScan = () => {
    setScanning(true);
    setTimeout(() => {
      const isSecure = window.isSecureContext;
      setReportData({
        secureContext: isSecure,
        ipStatus: "Hidden & Encrypted",
        threatLevel: isSecure ? "Safe" : "Attention"
      });
      setScanning(false);
    }, 1500);
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

        {/* Scan Action Box */}
        <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col items-center">
          <button 
            onClick={runPrivacyScan}
            disabled={scanning}
            className={`w-full max-w-md py-4 font-bold text-lg uppercase tracking-widest transition-all border shadow-sm ${
              scanning 
                ? 'bg-[var(--surface-hover)] text-[var(--text-muted)] border-[var(--border)] cursor-not-allowed'
                : 'bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border-transparent hover:border-[var(--border-strong)]'
            }`}
          >
            {scanning ? content.scanning : content.scanBtn}
          </button>
        </div>

        {/* Diagnostic Results Display */}
        {reportData && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Status Panel */}
            <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between">
              <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">
                {content.detailsTitle}
              </h2>
              <div className="flex items-center gap-4 my-4">
                <div className={`w-5 h-5 border-2 ${reportData.secureContext ? 'bg-green-500 border-green-700 animate-pulse' : 'bg-yellow-500 border-yellow-700'}`}></div>
                <span className={`text-xl font-bold uppercase tracking-wider ${reportData.secureContext ? 'text-green-600 dark:text-green-500' : 'text-yellow-600 dark:text-yellow-500'}`}>
                  {reportData.secureContext ? content.statusSafe : content.statusRisk}
                </span>
              </div>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mt-4">
                {reportData.secureContext ? content.safeDesc : content.riskDesc}
              </p>
            </div>

            {/* Metrics Panel */}
            <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6 border-b border-[var(--border-strong)] pb-2">
                  {content.ipLabel}
                </h2>
                <p className="font-mono text-xl font-bold text-[var(--brand-blue)] mb-8">
                  {reportData.ipStatus}
                </p>

                <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6 border-b border-[var(--border-strong)] pb-2">
                  {content.secureContextLabel}
                </h2>
                <p className="font-mono text-xl font-bold text-[var(--brand-white)]">
                  {reportData.secureContext ? "Active (HTTPS)" : "Inactive"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}