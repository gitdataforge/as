import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "System Instructions", subtitle: "Rules for Connection", toolName: "Address Tool", toolDesc: "Get public network address", method: "GET", testBtn: "Run Test", result: "Result", loading: "Running..." },
  hi: { title: "सिस्टम निर्देश", subtitle: "कनेक्शन के नियम", toolName: "पता उपकरण", toolDesc: "सार्वजनिक नेटवर्क पता प्राप्त करें", method: "प्राप्त करें", testBtn: "परीक्षण चलाएं", result: "परिणाम", loading: "चल रहा है..." },
  mr: { title: "सिस्टम सूचना", subtitle: "कनेक्शनचे नियम", toolName: "पत्ता साधन", toolDesc: "सार्वजनिक नेटवर्क पत्ता मिळवा", method: "मिळवा", testBtn: "चाचणी चालवा", result: "निकाल", loading: "चालत आहे..." },
  ta: { title: "கணினி வழிமுறைகள்", subtitle: "இணைப்பு விதிகள்", toolName: "முகவரி கருவி", toolDesc: "பொது நெட்வொர்க் முகவரியைப் பெறுக", method: "பெறு", testBtn: "சோதனையை இயக்கு", result: "முடிவு", loading: "இயங்குகிறது..." },
  te: { title: "సిస్టమ్ సూచనలు", subtitle: "కనెక్షన్ నియమాలు", toolName: "చిరునామా సాధనం", toolDesc: "పబ్లిక్ నెట్‌వర్క్ చిరునామాను పొందండి", method: "పొందండి", testBtn: "పరీక్షను అమలు చేయండి", result: "ఫలితం", loading: "నడుస్తోంది..." },
  kn: { title: "ಸಿಸ್ಟಮ್ ಸೂಚನೆಗಳು", subtitle: "ಸಂಪರ್ಕ ನಿಯಮಗಳು", toolName: "ವಿಳಾಸ ಸಾಧನ", toolDesc: "ಸಾರ್ವಜನಿಕ ನೆಟ್‌ವರ್ಕ್ ವಿಳಾಸವನ್ನು ಪಡೆಯಿರಿ", method: "ಪಡೆಯಿರಿ", testBtn: "ಪರೀಕ್ಷೆಯನ್ನು ರನ್ ಮಾಡಿ", result: "ಫಲಿತಾಂಶ", loading: "ಚಾಲನೆಯಲ್ಲಿದೆ..." },
  bn: { title: "সিস্টেম নির্দেশাবলী", subtitle: "সংযোগের নিয়ম", toolName: "ঠিকানা সরঞ্জাম", toolDesc: "সর্বজনীন নেটওয়ার্ক ঠিকানা পান", method: "পান", testBtn: "পরীক্ষা চালান", result: "ফলাফল", loading: "চলছে..." },
  gu: { title: "સિસ્ટમ સૂચનાઓ", subtitle: "જોડાણના નિયમો", toolName: "સરનામું સાધન", toolDesc: "સાર્વજનિક નેટવર્ક સરનામું મેળવો", method: "મેળવો", testBtn: "પરીક્ષણ ચલાવો", result: "પરિણામ", loading: "ચાલી રહ્યું છે..." },
  pa: { title: "ਸਿਸਟਮ ਨਿਰਦੇਸ਼", subtitle: "ਕਨੈਕਸ਼ਨ ਦੇ ਨਿਯਮ", toolName: "ਪਤਾ ਟੂਲ", toolDesc: "ਜਨਤਕ ਨੈੱਟਵਰਕ ਪਤਾ ਪ੍ਰਾਪਤ ਕਰੋ", method: "ਪ੍ਰਾਪਤ ਕਰੋ", testBtn: "ਟੈਸਟ ਚਲਾਓ", result: "ਨਤੀਜਾ", loading: "ਚੱਲ ਰਿਹਾ ਹੈ..." },
  ml: { title: "സിസ്റ്റം നിർദ്ദേശങ്ങൾ", subtitle: "കണക്ഷൻ നിയമങ്ങൾ", toolName: "വിലാസ ഉപകരണം", toolDesc: "പൊതു നെറ്റ്‌വർക്ക് വിലാസം നേടുക", method: "നേടുക", testBtn: "പരിശോധന നടത്തുക", result: "ഫലം", loading: "പ്രവർത്തിക്കുന്നു..." },
  or: { title: "ସିଷ୍ଟମ୍ ନିର୍ଦ୍ଦେଶାବଳୀ", subtitle: "ସଂଯୋଗର ନିୟମଗୁଡ଼ିକ", toolName: "ଠିକଣା ଉପକରଣ", toolDesc: "ସାର୍ବଜନୀନ ନେଟୱାର୍କ ଠିକଣା ପ୍ରାପ୍ତ କରନ୍ତୁ", method: "ପ୍ରାପ୍ତ କରନ୍ତୁ", testBtn: "ପରୀକ୍ଷା ଚଲାନ୍ତୁ", result: "ଫଳାଫଳ", loading: "ଚାଲୁଅଛି..." },
  as: { title: "চিষ্টেম নিৰ্দেশনাসমূহ", subtitle: "সংযোগৰ নিয়ম", toolName: "ঠিকনা সঁজুলি", toolDesc: "ৰাজহুৱা নেটৱৰ্ক ঠিকনা লাভ কৰক", method: "লাভ কৰক", testBtn: "পৰীক্ষা চলাওক", result: "ফলাফল", loading: "চলি আছে..." },
  ur: { title: "سسٹم کی ہدایات", subtitle: "کنکشن کے اصول", toolName: "پتہ ٹول", toolDesc: "عوامی نیٹ ورک کا پتہ حاصل کریں", method: "حاصل کریں", testBtn: "ٹیسٹ چلائیں", result: "نتیجہ", loading: "چل رہا ہے..." },
  sa: { title: "तन्त्र-निर्देशाः", subtitle: "सम्पर्कस्य नियमाः", toolName: "सङ्केत-उपकरणम्", toolDesc: "सार्वजनिक-जालबन्ध-सङ्केतं प्राप्नुवन्तु", method: "प्राप्नुवन्तु", testBtn: "परीक्षणं चालयन्तु", result: "परिणामः", loading: "चलति..." }
};

export default function ApiReference() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [apiResult, setApiResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Real functional API test without mock data
  const handleTestApi = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      setApiResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResult('{ "error": "Connection Failed" }');
    }
    setLoading(false);
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
        <div className="border-b border-[var(--border-strong)] pb-6 bg-[var(--surface)] p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {content.title}
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm">
            {content.subtitle}
          </p>
        </div>

        {/* Real Functional Instructions Panel */}
        <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--border)] pb-6 mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                {content.toolName}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium">
                {content.toolDesc}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[var(--brand-blue)] text-[var(--brand-white)] font-bold text-xs uppercase tracking-widest">
                {content.method}
              </span>
              <span className="font-mono text-sm font-bold text-[var(--text-primary)] bg-[var(--surface-hover)] px-3 py-1 border border-[var(--border-strong)]">
                https://api64.ipify.org
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Interactive Request Action */}
            <div className="flex flex-col justify-center">
              <button 
                onClick={handleTestApi}
                disabled={loading}
                className={`w-full py-4 font-bold text-lg transition-all uppercase tracking-widest border shadow-sm ${
                  loading 
                    ? 'bg-[var(--surface-hover)] text-[var(--text-muted)] border-[var(--border)] cursor-not-allowed'
                    : 'bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border-transparent hover:border-[var(--border-strong)]'
                }`}
              >
                {loading ? content.loading : content.testBtn}
              </button>
            </div>

            {/* Real Data Response Viewer */}
            <div className="bg-[var(--surface)] border border-[var(--border-strong)] flex flex-col">
              <div className="bg-[var(--surface-hover)] border-b border-[var(--border)] px-4 py-2">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
                  {content.result}
                </span>
              </div>
              <div className="p-4 min-h-[120px] flex items-start">
                {apiResult ? (
                  <pre className="font-mono text-sm text-[var(--brand-blue)] break-all whitespace-pre-wrap font-bold">
                    {apiResult}
                  </pre>
                ) : (
                  <span className="font-mono text-sm text-[var(--text-muted)]">
                    --
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}