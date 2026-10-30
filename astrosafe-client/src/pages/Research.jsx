import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Research", subtitle: "Our Studies", dataTitle: "Data Safety", dataDesc: "We find new ways to protect your information locally.", trustTitle: "Zero Trust", trustDesc: "We study how to block all unknown access.", print: "Print Report" },
  hi: { title: "अनुसंधान", subtitle: "हमारे अध्ययन", dataTitle: "डेटा सुरक्षा", dataDesc: "हम आपकी जानकारी को स्थानीय रूप से सुरक्षित रखने के नए तरीके खोजते हैं।", trustTitle: "ज़ीरो ट्रस्ट", trustDesc: "हम सभी अज्ञात पहुंच को रोकने का अध्ययन करते हैं।", print: "रिपोर्ट प्रिंट करें" },
  mr: { title: "संशोधन", subtitle: "आमचे अभ्यास", dataTitle: "डेटा सुरक्षा", dataDesc: "आम्ही तुमची माहिती स्थानिक पातळीवर सुरक्षित ठेवण्याचे नवीन मार्ग शोधतो.", trustTitle: "झिरो ट्रस्ट", trustDesc: "आम्ही सर्व अज्ञात प्रवेश कसा रोखायचा याचा अभ्यास करतो.", print: "अहवाल मुद्रित करा" },
  ta: { title: "ஆராய்ச்சி", subtitle: "எங்கள் ஆய்வுகள்", dataTitle: "தரவு பாதுகாப்பு", dataDesc: "உங்கள் தகவல்களை உள்ளூரில் பாதுகாப்பாக வைப்பதற்கான புதிய வழிகளை நாங்கள் காண்கிறோம்.", trustTitle: "பூஜ்ஜிய நம்பிக்கை", trustDesc: "அனைத்து அறியப்படாத அணுகலையும் எவ்வாறு தடுப்பது என்பதை நாங்கள் படிக்கிறோம்.", print: "அறிக்கையை அச்சிடு" },
  te: { title: "పరిశోధన", subtitle: "మా అధ్యయనాలు", dataTitle: "డేటా భద్రత", dataDesc: "మీ సమాచారాన్ని స్థానికంగా సురక్షితంగా ఉంచడానికి మేము కొత్త మార్గాలను కనుగొంటాము.", trustTitle: "జీరో ట్రస్ట్", trustDesc: "అన్ని తెలియని ప్రాప్యతలను ఎలా నిరోధించాలో మేము అధ్యయనం చేస్తాము.", print: "నివేదికను ముద్రించండి" },
  kn: { title: "ಸಂಶೋಧನೆ", subtitle: "ನಮ್ಮ ಅಧ್ಯಯನಗಳು", dataTitle: "ಡೇಟಾ ಸುರಕ್ಷತೆ", dataDesc: "ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಸ್ಥಳೀಯವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿರಿಸಲು ನಾವು ಹೊಸ ಮಾರ್ಗಗಳನ್ನು ಕಂಡುಕೊಳ್ಳುತ್ತೇವೆ.", trustTitle: "ಶೂನ್ಯ ಟ್ರಸ್ಟ್", trustDesc: "ಎಲ್ಲಾ ಅಪರಿಚಿತ ಪ್ರವೇಶವನ್ನು ಹೇಗೆ ನಿರ್ಬಂಧಿಸುವುದು ಎಂದು ನಾವು ಅಧ್ಯಯನ ಮಾಡುತ್ತೇವೆ.", print: "ವರದಿ ಮುದ್ರಿಸಿ" },
  bn: { title: "গবেষণা", subtitle: "আমাদের অধ্যয়ন", dataTitle: "ডেটা নিরাপত্তা", dataDesc: "আমরা আপনার তথ্য স্থানীয়ভাবে নিরাপদ রাখার নতুন উপায় খুঁজে বের করি।", trustTitle: "জিরো ট্রাস্ট", trustDesc: "আমরা সমস্ত অজানা অ্যাক্সেস ব্লক করার বিষয়ে অধ্যয়ন করি।", print: "রিপোর্ট প্রিন্ট করুন" },
  gu: { title: "સંશોધન", subtitle: "અમારો અભ્યાસ", dataTitle: "ડેટા સુરક્ષા", dataDesc: "અમે તમારી માહિતીને સ્થાનિક રીતે સુરક્ષિત રાખવાના નવા રસ્તાઓ શોધીએ છીએ.", trustTitle: "ઝીરો ટ્રસ્ટ", trustDesc: "અમે તમામ અજ્ઞાત ઍક્સેસને કેવી રીતે અવરોધિત કરવી તેનો અભ્યાસ કરીએ છીએ.", print: "અહેવાલ છાપો" },
  pa: { title: "ਖੋਜ", subtitle: "ਸਾਡੇ ਅਧਿਐਨ", dataTitle: "ਡੇਟਾ ਸੁਰੱਖਿਆ", dataDesc: "ਅਸੀਂ ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਨੂੰ ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ ਰੱਖਣ ਦੇ ਨਵੇਂ ਤਰੀਕੇ ਲੱਭਦੇ ਹਾਂ।", trustTitle: "ਜ਼ੀਰੋ ਟਰੱਸਟ", trustDesc: "ਅਸੀਂ ਸਾਰੀ ਅਣਜਾਣ ਪਹੁੰਚ ਨੂੰ ਕਿਵੇਂ ਰੋਕਣਾ ਹੈ ਇਸਦਾ ਅਧਿਐਨ ਕਰਦੇ ਹਾਂ।", print: "ਰਿਪੋਰਟ ਛਾਪੋ" },
  ml: { title: "ഗവേഷണം", subtitle: "ഞങ്ങളുടെ പഠനങ്ങൾ", dataTitle: "ഡാറ്റ സുരക്ഷ", dataDesc: "നിങ്ങളുടെ വിവരങ്ങൾ പ്രാദേശികമായി സുരക്ഷിതമായി സൂക്ഷിക്കുന്നതിനുള്ള പുതിയ വഴികൾ ഞങ്ങൾ കണ്ടെത്തുന്നു.", trustTitle: "സീറോ ട്രസ്റ്റ്", trustDesc: "അജ്ഞാതമായ എല്ലാ ആക്സസ്സുകളും എങ്ങനെ തടയാമെന്ന് ഞങ്ങൾ പഠിക്കുന്നു.", print: "റിപ്പോർട്ട് പ്രിന്റ് ചെയ്യുക" },
  or: { title: "ଗବେଷଣା", subtitle: "ଆମର ଅଧ୍ୟୟନ", dataTitle: "ଡାଟା ସୁରକ୍ଷା", dataDesc: "ଆମେ ଆପଣଙ୍କ ସୂଚନାକୁ ସ୍ଥାନୀୟ ଭାବରେ ସୁରକ୍ଷିତ ରଖିବାର ନୂଆ ଉପାୟ ଖୋଜୁ |", trustTitle: "ଜିରୋ ଟ୍ରଷ୍ଟ୍", trustDesc: "ସମସ୍ତ ଅଜ୍ଞାତ ଆକ୍ସେସକୁ କିପରି ରୋକିବେ ଆମେ ଅଧ୍ୟୟନ କରୁ |", print: "ରିପୋର୍ଟ ପ୍ରିଣ୍ଟ କରନ୍ତୁ" },
  as: { title: "গৱেষণা", subtitle: "আমাৰ অধ্যয়ন", dataTitle: "ডাটা সুৰক্ষা", dataDesc: "আমি আপোনাৰ তথ্য স্থানীয়ভাৱে সুৰক্ষিত ৰখাৰ নতুন উপায় বিচাৰি উলিয়াওঁ।", trustTitle: "জিৰো ট্ৰাষ্ট", trustDesc: "আমি সকলো অজ্ঞাত প্ৰৱেশ কেনেকৈ অৱৰোধ কৰিব লাগে তাৰ অধ্যয়ন কৰোঁ।", print: "ৰিপোৰ্ট প্ৰিণ্ট কৰক" },
  ur: { title: "تحقیق", subtitle: "ہمارا مطالعہ", dataTitle: "ڈیٹا کی حفاظت", dataDesc: "ہم آپ کی معلومات کو مقامی طور پر محفوظ رکھنے کے نئے طریقے تلاش کرتے ہیں۔", trustTitle: "زیرو ٹرسٹ", trustDesc: "ہم تمام نامعلوم رسائی کو روکنے کے طریقے کا مطالعہ کرتے ہیں۔", print: "رپورٹ پرنٹ کریں" },
  sa: { title: "अनुसन्धानम्", subtitle: "अस्माकं अध्ययनम्", dataTitle: "दत्तांश-सुरक्षा", dataDesc: "वयं भवतः सूचनां स्थानीयतया सुरक्षितं स्थापयितुं नूतनान् उपायान् अन्विषामः।", trustTitle: "शून्य-विश्वासः", trustDesc: "सर्वाणि अज्ञात-प्रवेशानि कथं रोद्धव्यानि इति वयं पठामः।", print: "विवरणं मुद्रयतु" }
};

export default function Research() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        {/* Custom Animated Art and Introduction */}
        <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col items-center">
          <div className="w-full max-w-md h-48 relative flex items-center justify-center overflow-hidden mb-8 border border-[var(--border)] bg-[var(--surface)]">
            
            {/* Custom Scanning Iconography Animation */}
            <motion.div 
              animate={{ x: [-100, 100, -100] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-1 bg-[var(--brand-blue)] opacity-50 z-10"
              style={{ boxShadow: "0 0 15px 5px var(--brand-blue)" }}
            ></motion.div>
            
            <div className="grid grid-cols-6 gap-2 opacity-30">
               {[...Array(24)].map((_, i) => (
                 <div key={i} className="w-6 h-6 border border-[var(--text-primary)] rounded-sm"></div>
               ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--text-primary)" strokeWidth="1.5" fill="none">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Research Core Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Data Safety Research Block */}
          <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col min-h-[220px]">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[var(--border)]">
              <div className="w-10 h-10 bg-[var(--brand-blue)] flex-shrink-0"></div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {content.dataTitle}
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] font-medium leading-relaxed text-lg">
              {content.dataDesc}
            </p>
          </div>

          {/* Zero Trust Research Block */}
          <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col min-h-[220px]">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[var(--border-strong)]">
              <div className="w-10 h-10 border-2 border-[var(--brand-white)] flex-shrink-0"></div>
              <h2 className="text-xl font-bold text-[var(--brand-white)] uppercase tracking-wider">
                {content.trustTitle}
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] font-medium leading-relaxed text-lg">
              {content.trustDesc}
            </p>
          </div>

        </div>

      </motion.div>
    </div>
  );
}