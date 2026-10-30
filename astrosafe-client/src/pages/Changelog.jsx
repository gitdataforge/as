import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "System Updates", subtitle: "Recent improvements", version: "Version", date: "Date", new: "New", fix: "Fixed", v1: "Initial system launch with security checks.", v2: "Added translation for regional languages.", v3: "Improved speed for network tests." },
  hi: { title: "सिस्टम अपडेट", subtitle: "हाल के सुधार", version: "संस्करण", date: "दिनांक", new: "नया", fix: "सुधार", v1: "सुरक्षा जांच के साथ प्रारंभिक सिस्टम लॉन्च।", v2: "क्षेत्रीय भाषाओं के लिए अनुवाद जोड़ा गया।", v3: "नेटवर्क परीक्षणों के लिए गति में सुधार।" },
  mr: { title: "सिस्टम अद्यतने", subtitle: "अलीकडील सुधारणा", version: "आवृत्ती", date: "तारीख", new: "नवीन", fix: "दुरुस्त", v1: "सुरक्षा तपासणीसह प्रारंभिक सिस्टम लाँच.", v2: "प्रादेशिक भाषांसाठी भाषांतर जोडले.", v3: "नेटवर्क चाचण्यांसाठी वेग सुधारला." },
  ta: { title: "கணினி புதுப்பிப்புகள்", subtitle: "சமீபத்திய மேம்பாடுகள்", version: "பதிப்பு", date: "தேதி", new: "புதிய", fix: "சரிசெய்யப்பட்டது", v1: "பாதுகாப்பு சோதனைகளுடன் ஆரம்ப கணினி வெளியீடு.", v2: "பிராந்திய மொழிகளுக்கான மொழிபெயர்ப்பு சேர்க்கப்பட்டது.", v3: "நெட்வொர்க் சோதனைகளுக்கான வேகம் மேம்படுத்தப்பட்டுள்ளது." },
  te: { title: "సిస్టమ్ నవీకరణలు", subtitle: "ఇటీవలి మెరుగుదలలు", version: "వెర్షన్", date: "తేదీ", new: "కొత్త", fix: "పరిష్కరించబడింది", v1: "భద్రతా తనిఖీలతో ప్రారంభ సిస్టమ్ విడుదల.", v2: "ప్రాంతీయ భాషల కోసం అనువాదం జోడించబడింది.", v3: "నెట్‌వర్క్ పరీక్షల కోసం వేగం మెరుగుపరచబడింది." },
  kn: { title: "ಸಿಸ್ಟಮ್ ನವೀಕರಣಗಳು", subtitle: "ಇತ್ತೀಚಿನ ಸುಧಾರಣೆಗಳು", version: "ಆವೃತ್ತಿ", date: "ದಿನಾಂಕ", new: "ಹೊಸ", fix: "ಸರಿಪಡಿಸಲಾಗಿದೆ", v1: "ಭದ್ರತಾ ತಪಾಸಣೆಗಳೊಂದಿಗೆ ಆರಂಭಿಕ ಸಿಸ್ಟಮ್ ಉಡಾವಣೆ.", v2: "ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಿಗೆ ಅನುವಾದವನ್ನು ಸೇರಿಸಲಾಗಿದೆ.", v3: "ನೆಟ್‌ವರ್ಕ್ ಪರೀಕ್ಷೆಗಳಿಗಾಗಿ ವೇಗವನ್ನು ಸುಧಾರಿಸಲಾಗಿದೆ." },
  bn: { title: "সিস্টেম আপডেট", subtitle: "সাম্প্রতিক উন্নতি", version: "সংস্করণ", date: "তারিখ", new: "নতুন", fix: "সংশোধন", v1: "নিরাপত্তা চেকের সাথে প্রাথমিক সিস্টেম লঞ্চ।", v2: "আঞ্চলিক ভাষার জন্য অনুবাদ যোগ করা হয়েছে।", v3: "নেটওয়ার্ক পরীক্ষার জন্য গতি উন্নত করা হয়েছে।" },
  gu: { title: "સિસ્ટમ અપડેટ્સ", subtitle: "તાજેતરના સુધારાઓ", version: "આવૃત્તિ", date: "તારીખ", new: "નવું", fix: "નિશ્ચિત", v1: "સુરક્ષા તપાસ સાથે પ્રારંભિક સિસ્ટમ લોંચ.", v2: "પ્રાદેશિક ભાષાઓ માટે અનુવાદ ઉમેર્યું.", v3: "નેટવર્ક પરીક્ષણો માટે ઝડપમાં સુધારો." },
  pa: { title: "ਸਿਸਟਮ ਅੱਪਡੇਟ", subtitle: "ਹਾਲੀਆ ਸੁਧਾਰ", version: "ਸੰਸਕਰਣ", date: "ਤਾਰੀਖ", new: "ਨਵਾਂ", fix: "ਠੀਕ ਕੀਤਾ", v1: "ਸੁਰੱਖਿਆ ਜਾਂਚਾਂ ਦੇ ਨਾਲ ਸ਼ੁਰੂਆਤੀ ਸਿਸਟਮ ਲਾਂਚ।", v2: "ਖੇਤਰੀ ਭਾਸ਼ਾਵਾਂ ਲਈ ਅਨੁਵਾਦ ਸ਼ਾਮਲ ਕੀਤਾ ਗਿਆ।", v3: "ਨੈੱਟਵਰਕ ਟੈਸਟਾਂ ਲਈ ਗਤੀ ਵਿੱਚ ਸੁਧਾਰ ਕੀਤਾ ਗਿਆ।" },
  ml: { title: "സിസ്റ്റം അപ്‌ഡേറ്റുകൾ", subtitle: "സമീപകാല മെച്ചപ്പെടുത്തലുകൾ", version: "പതിപ്പ്", date: "തീയതി", new: "പുതിയത്", fix: "പരിഹരിച്ചു", v1: "സുരക്ഷാ പരിശോധനകൾക്കൊപ്പം പ്രാരംഭ സിസ്റ്റം സമാരംഭം.", v2: "പ്രാദേശിക ഭാഷകൾക്കായി വിവർത്തനം ചേർത്തു.", v3: "നെറ്റ്‌വർക്ക് പരിശോധനകൾക്കായി വേഗത മെച്ചപ്പെടുത്തി." },
  or: { title: "ସିଷ୍ଟମ୍ ଅପଡେଟ୍", subtitle: "ସାମ୍ପ୍ରତିକ ଉନ୍ନତିଗୁଡ଼ିକ", version: "ସଂସ୍କରଣ", date: "ତାରିଖ", new: "ନୂଆ", fix: "ଠିକ୍ ହୋଇଛି", v1: "ସୁରକ୍ଷା ଯାଞ୍ଚ ସହିତ ପ୍ରାରମ୍ଭିକ ସିଷ୍ଟମ୍ ଲଞ୍ଚ |", v2: "ଆଞ୍ଚଳିକ ଭାଷାଗୁଡ଼ିକ ପାଇଁ ଅନୁବାଦ ଯୋଡାଗଲା |", v3: "ନେଟୱାର୍କ ପରୀକ୍ଷା ପାଇଁ ଗତି ଉନ୍ନତ ହେଲା |" },
  as: { title: "চিষ্টেম আপডেটসমূহ", subtitle: "শেহতীয়া উন্নতিসমূহ", version: "সংস্কৰণ", date: "তাৰিখ", new: "নতুন", fix: "ঠিক কৰা হ'ল", v1: "সুৰক্ষা পৰীক্ষাৰ সৈতে প্ৰাৰম্ভিক চিষ্টেম মুকলি।", v2: "আঞ্চলিক ভাষাসমূহৰ বাবে অনুবাদ যোগ কৰা হৈছে।", v3: "নেটৱৰ্ক পৰীক্ষাৰ বাবে গতি উন্নত কৰা হৈছে।" },
  ur: { title: "سسٹم اپ ڈیٹس", subtitle: "حالیہ بہتری", version: "ورژن", date: "تاریخ", new: "نیا", fix: "درست کیا گیا", v1: "سیکیورٹی چیکس کے ساتھ ابتدائی سسٹم لانچ۔", v2: "علاقائی زبانوں کے لیے ترجمہ شامل کیا گیا۔", v3: "نیٹ ورک ٹیسٹ کے لیے رفتار کو بہتر بنایا گیا۔" },
  sa: { title: "तन्त्र-नवीकरणानि", subtitle: "नूतनानि सुधारणानि", version: "संस्करणम्", date: "दिनाङ्कः", new: "नूतनम्", fix: "संशोधितम्", v1: "सुरक्षा-परीक्षणैः सह प्रारम्भिक-तन्त्र-मोचनम्।", v2: "प्रादेशिक-भाषाभ्यः अनुवादः योजितः।", v3: "जालबन्ध-परीक्षणाय गतिः वर्धिता।" }
};

export default function Changelog() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const releases = [
    {
      id: "v1.2.0",
      date: "2026-10-25",
      changes: [
        { type: "new", desc: content.v3 }
      ]
    },
    {
      id: "v1.1.0",
      date: "2026-10-20",
      changes: [
        { type: "new", desc: content.v2 }
      ]
    },
    {
      id: "v1.0.0",
      date: "2026-10-15",
      changes: [
        { type: "new", desc: content.v1 }
      ]
    }
  ];

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-12"
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

        {/* Real Functional Changelog Timeline Architecture */}
        <div className="space-y-8">
          {releases.map((release) => (
            <div key={release.id} className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col lg:flex-row gap-8">
              
              {/* Version & Date Block */}
              <div className="lg:w-1/4 flex flex-col space-y-2 border-b lg:border-b-0 lg:border-r border-[var(--border)] pb-4 lg:pb-0 lg:pr-4">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
                  {content.version}
                </span>
                <span className="font-mono text-2xl font-bold text-[var(--brand-blue)]">
                  {release.id}
                </span>
                <div className="pt-2 mt-2 border-t border-[var(--border-strong)]">
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                    {content.date}
                  </span>
                  <span className="font-mono text-sm text-[var(--text-primary)] font-bold">
                    {release.date}
                  </span>
                </div>
              </div>

              {/* Changes List */}
              <div className="lg:w-3/4 flex flex-col justify-center">
                <ul className="space-y-4">
                  {release.changes.map((change, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className={`px-2 py-1 text-xs font-bold uppercase tracking-widest border mt-0.5
                        ${change.type === 'new' 
                          ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-[var(--brand-blue)]' 
                          : 'bg-[var(--surface-hover)] border-[var(--border-strong)] text-[var(--text-primary)]'}`}
                      >
                        {change.type === 'new' ? content.new : content.fix}
                      </span>
                      <span className="text-[var(--text-secondary)] font-medium text-lg leading-relaxed">
                        {change.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  );
}