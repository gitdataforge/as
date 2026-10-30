import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Business Overview", subtitle: "Enterprise Infrastructure", mission: "Our Mission", missionDesc: "We provide secure, fast, and reliable digital safety for your business.", architecture: "System Architecture", status: "Network Status", online: "System Online", offline: "System Offline", browser: "User Browser", engine: "Security Engine", vault: "Data Storage" },
  hi: { title: "व्यापार अवलोकन", subtitle: "एंटरप्राइज़ इन्फ्रास्ट्रक्चर", mission: "हमारा लक्ष्य", missionDesc: "हम आपके व्यापार के लिए सुरक्षित, तेज़ और विश्वसनीय डिजिटल सुरक्षा प्रदान करते हैं।", architecture: "सिस्टम आर्किटेक्चर", status: "नेटवर्क स्थिति", online: "सिस्टम ऑनलाइन", offline: "सिस्टम ऑफलाइन", browser: "उपयोगकर्ता ब्राउज़र", engine: "सुरक्षा इंजन", vault: "डेटा स्टोरेज" },
  mr: { title: "व्यवसाय विहंगावलोकन", subtitle: "एंटरप्राइझ इन्फ्रास्ट्रक्चर", mission: "आमचे ध्येय", missionDesc: "आम्ही तुमच्या व्यवसायासाठी सुरक्षित, वेगवान आणि विश्वासार्ह डिजिटल सुरक्षा प्रदान करतो.", architecture: "सिस्टम आर्किटेक्चर", status: "नेटवर्क स्थिती", online: "सिस्टम ऑनलाइन", offline: "सिस्टम ऑफलाइन", browser: "वापरकर्ता ब्राउझर", engine: "सुरक्षा इंजिन", vault: "डेटा स्टोरेज" },
  ta: { title: "வணிக கண்ணோட்டம்", subtitle: "நிறுவன உள்கட்டமைப்பு", mission: "எங்கள் நோக்கம்", missionDesc: "உங்கள் வணிகத்திற்கு பாதுகாப்பான, வேகமான மற்றும் நம்பகமான டிஜிட்டல் பாதுகாப்பை வழங்குகிறோம்.", architecture: "கணினி கட்டமைப்பு", status: "நெட்வொர்க் நிலை", online: "கணினி ஆன்லைனில் உள்ளது", offline: "கணினி ஆஃப்லைனில் உள்ளது", browser: "பயனர் உலாவி", engine: "பாதுகாப்பு இயந்திரம்", vault: "தரவு சேமிப்பு" },
  te: { title: "వ్యాపార అవలోకనం", subtitle: "ఎంటర్‌ప్రైజ్ ఇన్‌ఫ్రాస్ట్రక్చర్", mission: "మా లక్ష్యం", missionDesc: "మేము మీ వ్యాపారం కోసం సురక్షితమైన, వేగవంతమైన మరియు నమ్మకమైన డిజిటల్ భద్రతను అందిస్తాము.", architecture: "సిస్టమ్ ఆర్కిటెక్చర్", status: "నెట్‌వర్క్ స్థితి", online: "సిస్టమ్ ఆన్‌లైన్", offline: "సిస్టమ్ ఆఫ్‌లైన్", browser: "వినియోగదారు బ్రౌజర్", engine: "భద్రతా ఇంజిన్", vault: "డేటా నిల్వ" },
  kn: { title: "ವ್ಯಾಪಾರ ಅವಲೋಕನ", subtitle: "ಎಂಟರ್‌ಪ್ರೈಸ್ ಮೂಲಸೌಕರ್ಯ", mission: "ನಮ್ಮ ಉದ್ದೇಶ", missionDesc: "ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ನಾವು ಸುರಕ್ಷಿತ, ವೇಗವಾದ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಡಿಜಿಟಲ್ ಭದ್ರತೆಯನ್ನು ಒದಗಿಸುತ್ತೇವೆ.", architecture: "ಸಿಸ್ಟಮ್ ಆರ್ಕಿಟೆಕ್ಚರ್", status: "ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿತಿ", online: "ಸಿಸ್ಟಮ್ ಆನ್‌ಲೈನ್", offline: "ಸಿಸ್ಟಮ್ ಆಫ್‌ಲೈನ್", browser: "ಬಳಕೆದಾರ ಬ್ರೌಸರ್", engine: "ಭದ್ರತಾ ಎಂಜಿನ್", vault: "ಡೇಟಾ ಸಂಗ್ರಹಣೆ" },
  bn: { title: "ব্যবসার ওভারভিউ", subtitle: "এন্টারপ্রাইজ অবকাঠামো", mission: "আমাদের লক্ষ্য", missionDesc: "আমরা আপনার ব্যবসার জন্য নিরাপদ, দ্রুত এবং নির্ভরযোগ্য ডিজিটাল নিরাপত্তা প্রদান করি।", architecture: "সিস্টেম আর্কিটেকচার", status: "নেটওয়ার্ক স্ট্যাটাস", online: "সিস্টেম অনলাইন", offline: "সিস্টেম অফলাইন", browser: "ব্যবহারকারী ব্রাউজার", engine: "নিরাপত্তা ইঞ্জিন", vault: "ডেটা স্টোরেজ" },
  gu: { title: "વ્યાપાર ઝાંખી", subtitle: "એન્ટરપ્રાઇઝ ઇન્ફ્રાસ્ટ્રક્ચર", mission: "અમારું લક્ષ્ય", missionDesc: "અમે તમારા વ્યવસાય માટે સુરક્ષિત, ઝડપી અને વિશ્વસનીય ડિજિટલ સુરક્ષા પ્રદાન કરીએ છીએ.", architecture: "સિસ્ટમ આર્કિટેક્ચર", status: "નેટવર્ક સ્થિતિ", online: "સિસ્ટમ ઓનલાઇન", offline: "સિस्टम ઓફલાઇન", browser: "વપરાશકર્તા બ્રાઉઝર", engine: "સુરક્ષા એન્જિન", vault: "ડેટા સ્ટોરેજ" },
  pa: { title: "ਕਾਰੋਬਾਰੀ ਸੰਖੇਪ ਜਾਣਕਾਰੀ", subtitle: "ਐਂਟਰਪ੍ਰਾਈਜ਼ ਬੁਨਿਆਦੀ ਢਾਂਚਾ", mission: "ਸਾਡਾ ਟੀਚਾ", missionDesc: "ਅਸੀਂ ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਲਈ ਸੁਰੱਖਿਅਤ, ਤੇਜ਼ ਅਤੇ ਭਰੋਸੇਮੰਦ ਡਿਜ਼ੀਟਲ ਸੁਰੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ।", architecture: "ਸਿਸਟਮ ਆਰਕੀਟੈਕਚਰ", status: "ਨੈੱਟਵਰਕ ਸਥਿਤੀ", online: "ਸਿਸਟਮ ਆਨਲਾਈਨ", offline: "ਸਿਸਟਮ ਆਫਲਾਈਨ", browser: "ਉਪਭੋਗਤਾ ਬ੍ਰਾਊਜ਼ਰ", engine: "ਸੁਰੱਖਿਆ ਇੰਜਣ", vault: "ਡੇਟਾ ਸਟੋਰੇਜ" },
  ml: { title: "ബിസിനസ്സ് അവലോകനം", subtitle: "എന്റർപ്രൈസ് അടിസ്ഥാന സൗകര്യങ്ങൾ", mission: "ഞങ്ങളുടെ ലക്ഷ്യം", missionDesc: "നിങ്ങളുടെ ബിസിനസ്സിനായി ഞങ്ങൾ സുരക്ഷിതവും വേഗതയേറിയതും വിശ്വസനീയവുമായ ഡിജിറ്റൽ സുരക്ഷ നൽകുന്നു.", architecture: "സിസ്റ്റം ആർക്കിടെക്ചർ", status: "നെറ്റ്‌വർക്ക് നില", online: "സിസ്റ്റം ഓൺലൈൻ", offline: "സിസ്റ്റം ഓഫ്‌ലൈൻ", browser: "ഉപയോക്തൃ ബ്രൗസർ", engine: "സുരക്ഷാ എഞ്ചിൻ", vault: "ഡാറ്റ സംഭരണം" },
  or: { title: "ବ୍ୟବସାୟ ସମୀକ୍ଷା", subtitle: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ଭିତ୍ତିଭୂମି", mission: "ଆମର ଲକ୍ଷ୍ୟ", missionDesc: "ଆମେ ଆପଣଙ୍କ ବ୍ୟବସାୟ ପାଇଁ ସୁରକ୍ଷିତ, ଦ୍ରୁତ ଏବଂ ନିର୍ଭରଯୋଗ୍ୟ ଡିଜିଟାଲ୍ ସୁରକ୍ଷା ପ୍ରଦାନ କରୁ |", architecture: "ସିଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଚର୍", status: "ନେଟୱାର୍କ ସ୍ଥିତି", online: "ସିଷ୍ଟମ୍ ଅନଲାଇନ୍", offline: "ସିଷ୍ଟମ୍ ଅଫଲାଇନ୍", browser: "ଉପଯୋଗକର୍ତ୍ତା ବ୍ରାଉଜର୍", engine: "ସୁରକ୍ଷା ଇଞ୍ଜିନ୍", vault: "ଡାଟା ଷ୍ଟୋରେଜ୍" },
  as: { title: "ব্যৱসায়ৰ অৱলোকন", subtitle: "এণ্টাৰপ্ৰাইজ আন্তঃগাঁথনি", mission: "আমাৰ লক্ষ্য", missionDesc: "আমি আপোনাৰ ব্যৱসায়ৰ বাবে সুৰক্ষিত, দ্ৰুত আৰু নিৰ্ভৰযোগ্য ডিজিটেল সুৰক্ষা প্ৰদান কৰোঁ।", architecture: "চিষ্টেম আৰ্কিটেকচাৰ", status: "নেটৱৰ্ক স্থিতি", online: "চিষ্টেম অনলাইন", offline: "চিষ্টেম অফলাইন", browser: "ব্যৱহাৰকাৰী ব্ৰাউজাৰ", engine: "সুৰক্ষা ইঞ্জিন", vault: "ডাটা ষ্টোৰেজ" },
  ur: { title: "کاروباری جائزہ", subtitle: "انٹرپرائز انفراسٹرکچر", mission: "ہمارا مقصد", missionDesc: "ہم آپ کے کاروبار کے لیے محفوظ، تیز، اور قابل اعتماد ڈیجیٹل سیکیورٹی فراہم کرتے ہیں۔", architecture: "سسٹم آرکیٹیکچر", status: "نیٹ ورک کی حیثیت", online: "سسٹم آن لائن", offline: "سسٹم آف لائن", browser: "صارف براؤزر", engine: "سیکیورٹی انجن", vault: "ڈیٹا اسٹوریج" },
  sa: { title: "व्यापार-अवलोकनम्", subtitle: "व्यापारिक-आधारसंरचना", mission: "अस्माकं लक्ष्यम्", missionDesc: "वयं भवतः व्यापाराय सुरक्षितं, द्रुतं, विश्वसनीयं च तन्त्रांश-सुरक्षां यच्छामः।", architecture: "तन्त्र-संरचना", status: "जालबन्ध-स्थितिः", online: "तन्त्रं सजीवम्", offline: "तन्त्रं निर्जीवम्", browser: "गवेषकतन्त्रम्", engine: "सुरक्षायन्त्रम्", vault: "दत्तांशकोषः" }
};

export default function Overview() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  // Real live functional status listener
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl space-y-12"
      >
        {/* Page Header */}
        <div className="border-b border-[var(--border-strong)] pb-6 bg-[var(--surface)] p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {content.title}
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm">
            {content.subtitle}
          </p>
        </div>

        {/* Status & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-center min-h-[200px]">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.mission}
            </h2>
            <p className="text-xl font-bold text-[var(--brand-white)] leading-relaxed">
              {content.missionDesc}
            </p>
          </div>

          {/* Real Live Status Card */}
          <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-center min-h-[200px]">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.status}
            </h2>
            <div className="flex items-center space-x-4 mt-2">
              {isOnline ? (
                <>
                  <div className="w-5 h-5 bg-green-500 rounded-none border-2 border-green-700 animate-pulse"></div>
                  <span className="text-2xl font-bold text-[var(--text-primary)]">{content.online}</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-red-500 rounded-none border-2 border-red-700"></div>
                  <span className="text-2xl font-bold text-red-600">{content.offline}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Structural Enterprise Architecture Grid */}
        <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
          <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-8 text-center border-b border-[var(--border)] pb-4">
            {content.architecture}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Component 1 */}
            <div className="bg-[var(--surface)] border-2 border-[var(--brand-blue)] p-6 text-center hover:bg-[var(--surface-hover)] transition-colors">
              <div className="w-12 h-12 mx-auto bg-[var(--brand-blue)] mb-4"></div>
              <h3 className="font-bold text-[var(--text-primary)] uppercase">
                {content.browser}
              </h3>
            </div>

            {/* Component 2 */}
            <div className="bg-[var(--surface)] border-2 border-[var(--text-primary)] p-6 text-center hover:bg-[var(--surface-hover)] transition-colors">
              <div className="w-12 h-12 mx-auto bg-[var(--text-primary)] mb-4"></div>
              <h3 className="font-bold text-[var(--text-primary)] uppercase">
                {content.engine}
              </h3>
            </div>

            {/* Component 3 */}
            <div className="bg-[var(--surface)] border-2 border-[var(--border-strong)] p-6 text-center hover:bg-[var(--surface-hover)] transition-colors">
              <div className="w-12 h-12 mx-auto bg-[var(--border-strong)] mb-4"></div>
              <h3 className="font-bold text-[var(--text-primary)] uppercase">
                {content.vault}
              </h3>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}