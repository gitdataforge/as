import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Enterprise Security", subtitle: "Business Protection Standards", statusTitle: "Live Security Status", context: "Secure Connection", crypto: "Encryption Engine", active: "Active", inactive: "Inactive", principle1: "Zero Trust Design", desc1: "No unauthorized access is allowed.", principle2: "Local Execution", desc2: "All checks happen on your device." },
  hi: { title: "एंटरप्राइज़ सुरक्षा", subtitle: "व्यापार सुरक्षा मानक", statusTitle: "लाइव सुरक्षा स्थिति", context: "सुरक्षित कनेक्शन", crypto: "एन्क्रिप्शन इंजन", active: "सक्रिय", inactive: "निष्क्रिय", principle1: "ज़ीरो ट्रस्ट डिज़ाइन", desc1: "किसी भी अनधिकृत पहुंच की अनुमति नहीं है।", principle2: "स्थानीय निष्पादन", desc2: "सभी जांच आपके डिवाइस पर होती हैं।" },
  mr: { title: "एंटरप्राइझ सुरक्षा", subtitle: "व्यवसाय सुरक्षा मानके", statusTitle: "थेट सुरक्षा स्थिती", context: "सुरक्षित कनेक्शन", crypto: "एन्क्रिप्शन इंजिन", active: "सक्रिय", inactive: "निष्क्रिय", principle1: "झिरो ट्रस्ट डिझाइन", desc1: "कोणत्याही अनधिकृत प्रवेशास परवानगी नाही.", principle2: "स्थानिक अंमलबजावणी", desc2: "सर्व तपासण्या तुमच्या डिव्हाइसवर होतात." },
  ta: { title: "நிறுவன பாதுகாப்பு", subtitle: "வணிக பாதுகாப்பு தரநிலைகள்", statusTitle: "நேரடி பாதுகாப்பு நிலை", context: "பாதுகாப்பான இணைப்பு", crypto: "குறியாக்க இயந்திரம்", active: "செயலில்", inactive: "செயலற்ற", principle1: "பூஜ்ஜிய நம்பிக்கை வடிவமைப்பு", desc1: "அங்கீகரிக்கப்படாத அணுகல் அனுமதிக்கப்படாது.", principle2: "உள்ளூர் செயலாக்கம்", desc2: "அனைத்து சோதனைகளும் உங்கள் சாதனத்தில் நடக்கும்." },
  te: { title: "ఎంటర్‌ప్రైజ్ భద్రత", subtitle: "వ్యాపార భద్రతా ప్రమాణాలు", statusTitle: "ప్రత్యక్ష భద్రతా స్థితి", context: "సురక్షిత కనెక్షన్", crypto: "ఎన్‌క్రిప్షన్ ఇంజిన్", active: "క్రియాశీలం", inactive: "క్రియారహితం", principle1: "జీరో ట్రస్ట్ డిజైన్", desc1: "అనధికార ప్రాప్యత అనుమతించబడదు.", principle2: "స్థానిక అమలు", desc2: "అన్ని తనిఖీలు మీ పరికరంలో జరుగుతాయి." },
  kn: { title: "ಎಂಟರ್‌ಪ್ರೈಸ್ ಭದ್ರತೆ", subtitle: "ವ್ಯಾಪಾರ ಭದ್ರತಾ ಮಾನದಂಡಗಳು", statusTitle: "ಲೈವ್ ಭದ್ರತಾ ಸ್ಥಿತಿ", context: "ಸುರಕ್ಷಿತ ಸಂಪರ್ಕ", crypto: "ಎನ್‌ಕ್ರಿಪ್ಶನ್ ಎಂಜಿನ್", active: "ಸಕ್ರಿಯ", inactive: "ನಿಷ್ಕ್ರಿಯ", principle1: "ಶೂನ್ಯ ಟ್ರಸ್ಟ್ ವಿನ್ಯಾಸ", desc1: "ಯಾವುದೇ ಅನಧಿಕೃತ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಲಾಗುವುದಿಲ್ಲ.", principle2: "ಸ್ಥಳೀಯ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ", desc2: "ಎಲ್ಲಾ ತಪಾಸಣೆಗಳು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ನಡೆಯುತ್ತವೆ." },
  bn: { title: "এন্টারপ্রাইজ নিরাপত্তা", subtitle: "ব্যবসা নিরাপত্তা মান", statusTitle: "লাইভ নিরাপত্তা স্ট্যাটাস", context: "নিরাপদ সংযোগ", crypto: "এনক্রিপশন ইঞ্জিন", active: "সক্রিয়", inactive: "নিষ্ক্রিয়", principle1: "জিরো ট্রাস্ট ডিজাইন", desc1: "কোনো অননুমোদিত অ্যাক্সেস অনুমোদিত নয়।", principle2: "স্থানীয় সম্পাদন", desc2: "সমস্ত চেক আপনার ডিভাইসে ঘটে।" },
  gu: { title: "એન્ટરપ્રાઇઝ સુરક્ષા", subtitle: "વ્યાપાર સુરક્ષા ધોરણો", statusTitle: "લાઇવ સુરક્ષા સ્થિતિ", context: "સુરક્ષિત કનેક્શન", crypto: "એન્ક્રિપ્શન એન્જિન", active: "સક્રિય", inactive: "નિષ્ક્રિય", principle1: "ઝીરો ટ્રસ્ટ ડિઝાઇન", desc1: "કોઈ અનધિકૃત ઍક્સેસની મંજૂરી નથી.", principle2: "સ્થાનિક અમલ", desc2: "બધી તપાસ તમારા ઉપકરણ પર થાય છે." },
  pa: { title: "ਐਂਟਰਪ੍ਰਾਈਜ਼ ਸੁਰੱਖਿਆ", subtitle: "ਕਾਰੋਬਾਰੀ ਸੁਰੱਖਿਆ ਮਿਆਰ", statusTitle: "ਲਾਈਵ ਸੁਰੱਖਿਆ ਸਥਿਤੀ", context: "ਸੁਰੱਖਿਅਤ ਕਨੈਕਸ਼ਨ", crypto: "ਇਨਕ੍ਰਿਪਸ਼ਨ ਇੰਜਣ", active: "ਸਰਗਰਮ", inactive: "ਗੈਰ-ਸਰਗਰਮ", principle1: "ਜ਼ੀਰੋ ਟਰੱਸਟ ਡਿਜ਼ਾਈਨ", desc1: "ਕਿਸੇ ਵੀ ਅਣਅਧਿਕਾਰਤ ਪਹੁੰਚ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਹੈ।", principle2: "ਸਥਾਨਕ ਐਗਜ਼ੀਕਿਊਸ਼ਨ", desc2: "ਸਾਰੀਆਂ ਜਾਂਚਾਂ ਤੁਹਾਡੇ ਡਿਵਾਈਸ 'ਤੇ ਹੁੰਦੀਆਂ ਹਨ।" },
  ml: { title: "എന്റർപ്രൈസ് സുരക്ഷ", subtitle: "ബിസിനസ്സ് സുരക്ഷാ മാനദണ്ഡങ്ങൾ", statusTitle: "തത്സമയ സുരക്ഷാ നില", context: "സുരക്ഷിതമായ കണക്ഷൻ", crypto: "എൻക്രിപ്ഷൻ എഞ്ചിൻ", active: "സജീവം", inactive: "നിർജ്ജീവം", principle1: "സീറോ ട്രസ്റ്റ് ഡിസൈൻ", desc1: "അനധികൃത പ്രവേശനം അനുവദനീയമല്ല.", principle2: "പ്രാദേശിക നിർവ്വഹണം", desc2: "എല്ലാ പരിശോധനകളും നിങ്ങളുടെ ഉപകരണത്തിൽ നടക്കുന്നു." },
  or: { title: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ସୁରକ୍ଷା", subtitle: "ବ୍ୟବସାୟ ସୁରକ୍ଷା ମାନକ", statusTitle: "ଲାଇଭ୍ ସୁରକ୍ଷା ସ୍ଥିତି", context: "ସୁରକ୍ଷିତ ସଂଯୋଗ", crypto: "ଏନକ୍ରିପସନ୍ ଇଞ୍ଜିନ୍", active: "ସକ୍ରିୟ", inactive: "ନିଷ୍କ୍ରିୟ", principle1: "ଜିରୋ ଟ୍ରଷ୍ଟ୍ ଡିଜାଇନ୍", desc1: "କୌଣସି ଅନଧିକୃତ ଆକ୍ସେସ୍ ଅନୁମୋଦିତ ନୁହେଁ |", principle2: "ସ୍ଥାନୀୟ କାର୍ଯ୍ୟକାରିତା", desc2: "ସମସ୍ତ ଯାଞ୍ଚ ଆପଣଙ୍କ ଡିଭାଇସରେ ହୋଇଥାଏ |" },
  as: { title: "এণ্টাৰপ্ৰাইজ সুৰক্ষা", subtitle: "ব্যৱসায়িক সুৰক্ষা মানদণ্ড", statusTitle: "লাইভ সুৰক্ষা স্থিতি", context: "সুৰক্ষিত সংযোগ", crypto: "এনক্ৰিপচন ইঞ্জিন", active: "সক্ৰিয়", inactive: "নিষ্ক্ৰিয়", principle1: "জিৰো ট্ৰাষ্ট ডিজাইন", desc1: "কোনো অননুমোদিত প্ৰৱেশৰ অনুমতি নাই।", principle2: "স্থানীয় ৰূপায়ণ", desc2: "সকলো পৰীক্ষা আপোনাৰ ডিভাইচত হয়।" },
  ur: { title: "انٹرپرائز سیکیورٹی", subtitle: "کاروباری سیکیورٹی کے معیارات", statusTitle: "لائیو سیکیورٹی کی حیثیت", context: "محفوظ کنکشن", crypto: "انکرپشن انجن", active: "فعال", inactive: "غیر فعال", principle1: "زیرو ٹرسٹ ڈیزائن", desc1: "کسی غیر مجاز رسائی کی اجازت نہیں ہے۔", principle2: "مقامی عملدرآمد", desc2: "تمام چیک آپ کے ڈیوائس پر ہوتے ہیں۔" },
  sa: { title: "व्यापार-सुरक्षा", subtitle: "व्यापारिक-सुरक्षा-मानकानि", statusTitle: "सजीव-सुरक्षा-स्थितिः", context: "सुरक्षित-सम्पर्कः", crypto: "गुप्तीकरण-यन्त्रम्", active: "सक्रियम्", inactive: "निष्क्रियम्", principle1: "शून्य-विश्वास-रचना", desc1: "कोऽपि अनधिकृत-प्रवेशः न अनुमन्यते।", principle2: "स्थानीय-निष्पादनम्", desc2: "सर्वाणि परीक्षणानि भवतः यन्त्रे एव भवन्ति।" }
};

export default function EnterpriseSecurity() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  // Real security environment capabilities validation
  const [securityStatus, setSecurityStatus] = useState({
    secureContext: false,
    cryptoAvailable: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Evaluate real browser cryptographic and connection contexts
    setSecurityStatus({
      secureContext: window.isSecureContext,
      cryptoAvailable: typeof window.crypto !== 'undefined' && typeof window.crypto.subtle !== 'undefined'
    });
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

        {/* Real Live Security Status Dashboard */}
        <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
          <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-8 border-b border-[var(--border)] pb-4">
            {content.statusTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Context Validation */}
            <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-6">
              <h3 className="font-bold text-[var(--text-primary)] mb-4">{content.context}</h3>
              <div className={`inline-block px-4 py-2 border text-sm font-bold ${securityStatus.secureContext ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500' : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-500'}`}>
                {securityStatus.secureContext ? content.active : content.inactive}
              </div>
            </div>

            {/* Crypto Engine Validation */}
            <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-6">
              <h3 className="font-bold text-[var(--text-primary)] mb-4">{content.crypto}</h3>
              <div className={`inline-block px-4 py-2 border text-sm font-bold ${securityStatus.cryptoAvailable ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500' : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-500'}`}>
                {securityStatus.cryptoAvailable ? content.active : content.inactive}
              </div>
            </div>

          </div>
        </div>

        {/* Enterprise Security Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Principle 1 */}
          <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col min-h-[200px] border-t-4 border-t-[var(--brand-blue)]">
            <h2 className="text-xl font-bold text-[var(--brand-white)] mb-4 uppercase tracking-wider">
              {content.principle1}
            </h2>
            <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
              {content.desc1}
            </p>
          </div>

          {/* Principle 2 */}
          <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col min-h-[200px] border-t-4 border-t-[var(--text-primary)]">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              {content.principle2}
            </h2>
            <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
              {content.desc2}
            </p>
          </div>

        </div>

      </motion.div>
    </div>
  );
}