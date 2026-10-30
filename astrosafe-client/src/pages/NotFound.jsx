import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { errorCode: "404", title: "Page Not Found", subtitle: "The page you are looking for does not exist or has been moved.", homeBtn: "Return to Home" },
  hi: { errorCode: "404", title: "पृष्ठ नहीं मिला", subtitle: "आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है या ले जाया गया है।", homeBtn: "मुख्य पृष्ठ पर लौटें" },
  mr: { errorCode: "404", title: "पृष्ठ सापडले नाही", subtitle: "तुम्ही शोधत असलेला पृष्ठ अस्तित्वात नाही किंवा हलवला गेला आहे.", homeBtn: "मुख्य पृष्ठावर परत जा" },
  ta: { errorCode: "404", title: "பக்கம் கிடைக்கவில்லை", subtitle: "நீங்கள் தேடும் பக்கம் இல்லை அல்லது நகர்த்தப்பட்டுள்ளது.", homeBtn: "முகப்புக்கு திரும்பு" },
  te: { errorCode: "404", title: "పేజీ కనుగొనబడలేదు", subtitle: "మీరు వెతుకుతున్న పేజీ లేదు లేదా మార్చబడింది.", homeBtn: "హోమ్‌కు తిరిగి వెళ్ళు" },
  kn: { errorCode: "404", title: "ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ", subtitle: "ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪುಟವು ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ ಅಥವಾ ಸರಿಸಲಾಗಿದೆ.", homeBtn: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ" },
  bn: { errorCode: "404", title: "পৃষ্ঠা পাওয়া যায়নি", subtitle: "আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।", homeBtn: "হোমে ফিরে যান" },
  gu: { errorCode: "404", title: "પૃષ્ઠ મળ્યું નથી", subtitle: "તમે જે પૃષ્ઠ શોધી રહ્યા છો તે અસ્તિત્વમાં નથી અથવા ખસેડવામાં આવ્યું છે.", homeBtn: "મુખ્ય પૃષ્ઠ પર પાછા જાઓ" },
  pa: { errorCode: "404", title: "ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ", subtitle: "ਜਿਸ ਪੰਨੇ ਦੀ ਤੁਸੀਂ ਭਾਲ ਕਰ ਰਹੇ ਹੋ ਉਹ ਮੌਜੂਦ ਨਹੀਂ ਹੈ ਜਾਂ ਲਿਜਾਇਆ ਗਿਆ ਹੈ।", homeBtn: "ਮੁੱਖ ਪੰਨੇ 'ਤੇ ਵਾਪस ਜਾਓ" },
  ml: { errorCode: "404", title: "പേജ് കണ്ടെത്തിയില്ല", subtitle: "നിങ്ങൾ തിരയുന്ന പേജ് നിലവിലില്ല അല്ലെങ്കിൽ നീക്കം ചെയ്‌തു.", homeBtn: "ഹോമിലേക്ക് മടങ്ങുക" },
  or: { errorCode: "404", title: "ପୃଷ୍ଠା ମିଳିଲା ନାହିଁ", subtitle: "ଆପଣ ଖୋଜୁଥିବା ପୃଷ୍ଠାଟି ଅସ୍ତିତ୍ୱରେ ନାହିଁ କିମ୍ବା ସ୍ଥାନାନ୍ତରିତ ହୋଇଛି |", homeBtn: "ହୋମ୍ କୁ ଫେରନ୍ତୁ" },
  as: { errorCode: "404", title: "পৃষ্ঠা পোৱা নগ'ল", subtitle: "আপুনি বিচাৰি থকা পৃষ্ঠাখন υπάস্থিত নাই বা স্থানান্তৰ কৰা হৈছে।", homeBtn: "ঘৰলৈ উভতি যাওক" },
  ur: { errorCode: "404", title: "صفحہ نہیں ملا", subtitle: "آپ جو صفحہ تلاش کر رہے ہیں وہ موجود نہیں ہے یا منتقل کر دیا گیا ہے۔", homeBtn: "ہوم پر واپس جائیں" },
  sa: { errorCode: "404", title: "पृष्ठं न प्राप्तम्", subtitle: "यत् पृष्ठं भवान् अन्विषति तत् नास्ति अथवा अन्यत्र नीतम्।", homeBtn: "मुख्यपृष्ठं प्रति गच्छतु" }
};

export default function NotFound() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-[var(--background)] py-16 px-4 sm:px-6 lg:px-8 blueprint-grid min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-12 shadow-2xl text-center space-y-8"
      >
        {/* Custom Animated Graphic Artwork */}
        <div className="w-24 h-24 mx-auto relative flex items-center justify-center bg-[var(--brand-black)] border-2 border-[var(--brand-blue)] rotate-45 shadow-sm">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 bg-[var(--brand-blue)]"
          />
        </div>

        {/* Error Code */}
        <h1 className="font-mono text-6xl font-bold text-[var(--text-primary)] tracking-tight">
          {content.errorCode}
        </h1>

        {/* Title and Subtitle */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] uppercase tracking-wider">
            {content.title}
          </h2>
          <p className="text-[var(--text-secondary)] font-medium text-lg leading-relaxed max-w-md mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Functional Navigation Action */}
        <div className="pt-4">
          <button 
            onClick={handleReturnHome}
            className="px-8 py-4 bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-hover)] text-[var(--brand-white)] font-bold uppercase tracking-widest text-sm shadow-sm transition-all border border-transparent"
          >
            {content.homeBtn}
          </button>
        </div>

      </motion.div>
    </div>
  );
}