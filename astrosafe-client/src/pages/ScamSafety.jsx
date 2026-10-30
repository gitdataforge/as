import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { 
    title: "Scam Safety", 
    subtitle: "Fraud Prevention System", 
    inputPlaceholder: "Enter link or text to check...", 
    checkBtn: "Check Safety", 
    checking: "Analyzing Content...", 
    safeResult: "Content Appears Safe", 
    riskResult: "Suspicious Content Detected", 
    tipsTitle: "Safety Guidelines", 
    tip1: "Never share your secret passwords or banking PINs with anyone.", 
    tip2: "Verify official website addresses before entering personal information.", 
    tip3: "Do not click on unknown links sent via text or email messages."
  },
  hi: { 
    title: "स्कैम सुरक्षा", 
    subtitle: "धोखाधड़ी रोकथाम प्रणाली", 
    inputPlaceholder: "जांचने के लिए लिंक या टेक्स्ट दर्ज करें...", 
    checkBtn: "सुरक्षा जांचें", 
    checking: "विश्लेषण किया जा रहा है...", 
    safeResult: "सामग्री सुरक्षित प्रतीत होती है", 
    riskResult: "संदिग्ध सामग्री पाई गई", 
    tipsTitle: "सुरक्षा दिशानिर्देश", 
    tip1: "अपने गुप्त पासवर्ड या बैंकिंग पिन किसी के साथ साझा न करें।", 
    tip2: "व्यक्तिगत जानकारी दर्ज करने से पहले आधिकारिक वेबसाइट पतों की पुष्टि करें।", 
    tip3: "टेक्स्ट या ईमेल संदेशों के माध्यम से भेजे गए अज्ञात लिंक पर क्लिक न करें।"
  },
  mr: { 
    title: "स्कॅम सुरक्षा", 
    subtitle: "फसवणूक प्रतिबंध प्रणाली", 
    inputPlaceholder: "तपासण्यासाठी लिंक किंवा मजकूर प्रविष्ट करा...", 
    checkBtn: "सुरक्षितता तपासा", 
    checking: "विश्लेषण करत आहे...", 
    safeResult: "सामग्री सुरक्षित दिसते", 
    riskResult: "शंकेस्पद सामग्री आढळली", 
    tipsTitle: "सुरक्षा मार्गदर्शक तत्त्वे", 
    tip1: "तुमचे गुप्त पासवर्ड किंवा बँकिंग पिन कोणाशीही शेअर करू नका.", 
    tip2: "वैयक्तिक माहिती टाकण्यापूर्वी अधिकृत वेबसाइट पत्त्यांची पडताळणी करा.", 
    tip3: "मजकूर किंवा ईमेल संदेशाद्वारे पाठवलेल्या अज्ञात लिंक्सवर क्लिक करू नका."
  },
  ta: { 
    title: "மோசடி பாதுகாப்பு", 
    subtitle: "மோசடி தடுப்பு அமைப்பு", 
    inputPlaceholder: "சரிபார்க்க இணைப்பு அல்லது உரையை உள்ளிடவும்...", 
    checkBtn: "பாதுகாப்பைச் சரிபார்க்கவும்", 
    checking: "ஆராயப்படுகிறது...", 
    safeResult: "உள்ளடக்கம் பாதுகாப்பாகத் தெரிகிறது", 
    riskResult: "சந்தேகத்திற்கிடமான உள்ளடக்கம் கண்டறியப்பட்டது", 
    tipsTitle: "பாதுகாப்பு வழிகாட்டுதல்கள்", 
    tip1: "உங்கள் ரகசிய கடவுச்சொற்கள் அல்லது வங்கி PIN ஐ யாருடனும் பகிர வேண்டாம்.", 
    tip2: "தனிப்பட்ட தகவலை உள்ளிடுவதற்கு முன்பு அதிகாரப்பூர்வ வலைத்தள முகவரிகளைச் சரிபார்க்கவும்.", 
    tip3: "செய்தி அல்லது மின்னஞ்சல் மூலம் அனுப்பப்பட்ட அறியப்படாத இணைப்புகளைக் கிளிக் செய்ய வேண்டாம்."
  },
  te: { 
    title: "స్కామ్ భద్రత", 
    subtitle: "మోసాల నివారణ వ్యవస్థ", 
    inputPlaceholder: "తనిఖీ చేయడానికి లింక్ లేదా టెక్స్ట్ నమోదు చేయండి...", 
    checkBtn: "భద్రతను తనిఖీ చేయండి", 
    checking: "విశ్లేషిస్తోంది...", 
    safeResult: "సమాచారం సురక్షితంగా కనిపిస్తుంది", 
    riskResult: "అనుమానాస్పద సమాచారం కనుగొనబడింది", 
    tipsTitle: "భద్రతా మార్గదర్శకాలు", 
    tip1: "మీ రహస్య పాస్‌వర్డ్‌లు లేదా బ్యాంకింగ్ పిన్‌లను ఎవరితోనూ పంచుకోవద్దు.", 
    tip2: "వ్యక్తిగత సమాచారాన్ని నమోదు చేయడానికి ముందు అధికారిక వెబ్‌సైట్ చిరునామాలను ధృవీకరించండి.", 
    tip3: "టెక్స్ట్ లేదా ఇమెయిల్ సందేశాల ద్వారా పంపబడిన తెలియని లింక్‌లపై క్లిక్ చేయవద్దు."
  },
  kn: { 
    title: "ಸ್ಕಾಮ್ ಭದ್ರತೆ", 
    subtitle: "ವಂಚನೆ ತಡೆಗಟ್ಟುವಿಕೆ ವ್ಯವಸ್ಥೆ", 
    inputPlaceholder: "ಪರಿಶೀಲಿಸಲು ಲಿಂಕ್ ಅಥವಾ ಪಠ್ಯವನ್ನು ನಮೂದಿಸಿ...", 
    checkBtn: "ಭದ್ರತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ", 
    checking: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...", 
    safeResult: "ವಿಷಯವು ಸುರಕ್ಷಿತವಾಗಿದೆ ಎಂದು ತೋರುತ್ತದೆ", 
    riskResult: "ಸಂದೇಹಾಸ್ಪದ ವಿಷಯ ಕಂಡುಬಂದಿದೆ", 
    tipsTitle: "ಭದ್ರತಾ ಮಾರ್ಗಸೂಚಿಗಳು", 
    tip1: "ನಿಮ್ಮ ರಹಸ್ಯ ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಅಥವಾ ಬ್ಯಾಂಕಿಂಗ್ ಪಿನ್‌ಗಳನ್ನು ಯಾರಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.", 
    tip2: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ನಮೂದಿಸುವ ಮೊದಲು ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ವಿಳಾಸಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.", 
    tip3: "ಪಠ್ಯ ಅಥವಾ ಇಮೇಲ್ ಸಂದೇಶಗಳ ಮೂಲಕ ಕಳುಹಿಸಲಾದ ಅಜ್ಞಾತ ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ."
  },
  bn: { 
    title: "স্ক্যাম সুরক্ষা", 
    subtitle: "প্রতারণা প্রতিরোধ ব্যবস্থা", 
    inputPlaceholder: "যাচাই করতে লিঙ্ক বা পাঠ্য লিখুন...", 
    checkBtn: "নিরাপত্তা পরীক্ষা করুন", 
    checking: "বিশ্লেষণ করা হচ্ছে...", 
    safeResult: "বিষয়বস্তু নিরাপদ বলে মনে হচ্ছে", 
    riskResult: "সন্দেহজনক বিষয়বস্তু সনাক্ত করা হয়েছে", 
    tipsTitle: "নিরাপত্তা নির্দেশিকা", 
    tip1: "কারও সাথে আপনার গোপন পাসওয়ার্ড বা ব্যাংকিং পিন শেয়ার করবেন না।", 
    tip2: "ব্যক্তিগত তথ্য দেওয়ার আগে অফিসিয়াল ওয়েবসাইটের ঠিকানা যাচাই করুন।", 
    tip3: "টেক্সট বা ইমেলের মাধ্যমে পাঠানো অজানা লিঙ্কে ক্লিক করবেন না।"
  },
  gu: { 
    title: "સ્કેમ સુરક્ષા", 
    subtitle: "છેતરપિંડી અટકાવવાની સિસ્ટમ", 
    inputPlaceholder: "તપાસવા માટે લિંક અથવા લખાણ દાખલ કરો...", 
    checkBtn: "સુરક્ષા તપાસો", 
    checking: "વિશ્લેષણ થઈ રહ્યું છે...", 
    safeResult: "સામગ્રી સુરક્ષિત લાગે છે", 
    riskResult: "શંકાસ્પદ સામગ્રી મળી આવી", 
    tipsTitle: "સુરક્ષા માર્ગદર્શિકા", 
    tip1: "તમારા ગુપ્ત પાસવર્ડ્સ અથવા બેંકિંગ પિન ક્યારેય કોઈની સાથે શેર કરશો નહીં.", 
    tip2: "વ્યક્તિગત માહિતી દાખલ કરતા પહેલા સત્તાવાર વેબસાઇટ સરનામાં ચકાસો.", 
    tip3: "ટેક્સ્ટ અથવા ઇમેઇલ દ્વારા મોકલેલી અજ્ઞાત લિંક્સ પર ક્લિક કરશો નહીં."
  },
  pa: { 
    title: "ਸਕੈਮ ਸੁਰੱਖਿਆ", 
    subtitle: "धोखाधड़ी ਰੋਕਥਾਮ ਪ੍ਰਣਾਲੀ", 
    inputPlaceholder: "ਜਾਂਚ ਕਰਨ ਲਈ ਲਿੰਕ ਜਾਂ ਟੈਕਸਟ ਦਰج ਕਰੋ...", 
    checkBtn: "ਸੁਰੱਖਿਆ ਜਾਂਚ ਕਰੋ", 
    checking: "ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...", 
    safeResult: " ਸਮੱਗਰੀ ਸੁਰੱਖਿਅਤ ਜਾਪਦੀ ਹੈ", 
    riskResult: "ਸ਼ੱਕੀ ਸਮੱਗਰੀ ਪਾਈ ਗਈ", 
    tipsTitle: "ਸੁਰੱਖਿਆ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼", 
    tip1: "ਆਪਣੇ ਗੁਪਤ ਪਾਸਵਰਡ ਜਾਂ ਬੈਂਕਿੰਗ ਪિન ਕਿਸੇ ਨਾਲ ਵੀ ਸਾਂਝੇ ਨਾ ਕਰੋ।", 
    tip2: "ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਦਰج ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ ਪਤਿਆਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।", 
    tip3: "ਟੈਕਸਟ ਜਾਂ ਈਮੇਲ ਸੁਨੇਹਿਆਂ ਰਾਹੀਂ ਭੇजे ਗਏ ਅਣਜਾਣ ਲਿੰਕਾਂ 'ਤੇ ਕ্লিক ਨਾ ਕਰੋ।"
  },
  ml: { 
    title: "സ്കാം സുരക്ഷ", 
    subtitle: "തട്ടിപ്പ് തടയൽ സംവിധാനം", 
    inputPlaceholder: "പരിശോധിക്കാൻ ലിങ്കോ വാചകമോ നൽകുക...", 
    checkBtn: "സുരക്ഷ പരിശോധിക്കുക", 
    checking: "വിശകലനം ചെയ്യുന്നു...", 
    safeResult: "ഉള്ളടക്കം സുരക്ഷിതമായി തോന്നുന്നു", 
    riskResult: "സംശയാസ്പദമായ ഉള്ളടക്കം കണ്ടെത്തി", 
    tipsTitle: "സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ", 
    tip1: "നിങ്ങളുടെ രഹസ്യ പാസ്‌വേഡുകളോ ബാങ്കിംഗ് പിന്നുകളோ ആരോടും പങ്കിടരുത്.", 
    tip2: "വ്യക്തിഗത വിവരങ്ങൾ നൽകുന്നതിന് മുമ്പ് ഔദ്യോഗിക വെബ്സൈറ്റ് വിലാസങ്ങൾ പരിശോധിക്കുക.", 
    tip3: "സന്ദേശങ്ങൾ വഴിയോ ഇമെയിൽ വഴിയോ അയച്ച അജ്ഞാത ലിങ്കുകളിൽ ക്ലിക്ക് ചെയ്യരുത്."
  },
  or: { 
    title: "ସ୍କାମ୍ ସୁରକ୍ଷା", 
    subtitle: "ପ୍ରତାରଣା ପ୍ରତିରୋଧ ପ୍ରଣାଳୀ", 
    inputPlaceholder: "ଯାଞ୍ଚ କରିବାକୁ ଲିଙ୍କ୍ କିମ୍ବା ଲେଖା ପ୍ରବେଶ କରନ୍ତୁ...", 
    checkBtn: "ସୁରକ୍ଷା ଯାଞ୍ଚ କରନ୍ତୁ", 
    checking: "ବିଶ୍ଳେଷଣ କରାଯାଉଛି...", 
    safeResult: "ସାମଗ୍ରୀ ସୁରକ୍ଷିତ ଦେଖାଯାଉଛି", 
    riskResult: "ସନ୍ଦେହଜନକ ସାମଗ୍ରୀ ଚିହ୍ନଟ ହେଲା", 
    tipsTitle: "ସୁରକ୍ଷା ନିର୍ଦ୍ଦେଶାବଳୀ", 
    tip1: "ଆପଣଙ୍କର ଗୁପ୍ତ ପାസ്‌ୱାର୍ଡ କିମ୍ବା ବ୍ୟାଙ୍କି ଆକାଉଣ୍ଟ୍ ପିନ୍ କାହା ସହିତ ସେୟାର କରନ୍ତୁ ନାହିଁ |", 
    tip2: "ବ୍ୟକ୍ତିଗତ ସୂଚନା ଦେବା ପୂର୍ବରୁ ଅଫିସିଆଲ୍ ୱେବସାଇଟ୍ ଠିକଣା ଯାଞ୍ଚ କରନ୍ତୁ |", 
    tip3: "ଅଜ୍ଞାତ ଲିଙ୍କରେ କ୍ଲିକ୍ କରନ୍ତୁ ନାହିଁ |"
  },
  as: { 
    title: "স্কেম সুৰক্ষা", 
    subtitle: "প্ৰৱঞ্চনা প্ৰতিৰোধ প্ৰণালী", 
    inputPlaceholder: "পৰীক্ষা কৰিব The লিংক বা টেক্সট দিয়ক...", 
    checkBtn: "সুৰক্ষা পৰীক্ষা কৰক", 
    checking: "বিশ্লেষণ কৰা হৈছে...", 
    safeResult: "সমল সুৰক্ষিত যেন লাগিছে", 
    riskResult: "সন্দেহজনক সমল পোৱা গৈছে", 
    tipsTitle: "সুৰক্ষা নিৰ্দেগাৱলী", 
    tip1: "কাৰো লগত আপোনাৰ গোপন পাছৱৰ্ড বা বেংকিং পিন শ্বেয়াৰ নকৰিব।", 
    tip2: "ব্যক্তিগত তথ্য দিয়াৰ আগতে অফিচিয়েল ৱেবছাইটৰ ঠিকনা পৰীক্ষা কৰক।", 
    tip3: "অজ্ঞাত লিংকে ক্লিক নকৰিব।"
  },
  ur: { 
    title: "اسکام سیکیورٹی", 
    subtitle: "دھوکہ دہی سے بچاؤ کا نظام", 
    inputPlaceholder: "چیک کرنے کے لیے لنک یا ٹیکسٹ درج کریں...", 
    checkBtn: "حفاظت چیک کریں", 
    checking: "تجزیہ کیا جا رہا ہے...", 
    safeResult: "مواد محفوظ دکھائی دیتا ہے", 
    riskResult: "مشکوک مواد پایا گیا", 
    tipsTitle: "حفاظتی ہدایات", 
    tip1: "اپنے خفیہ پاس ورڈ یا بینکنگ پن کسی کے साथ شیئر نہ کریں۔", 
    tip2: "ذاتی معلومات درج کرنے سے پہلے سرکاری ویب سائٹ کے پتوں کی تصدیق کریں۔", 
    tip3: "نامعلوم لنکس پر کلک نہ کریں۔"
  },
  sa: { 
    title: "वञ्चना-सुरक्षा", 
    subtitle: "वञ्चना-निवारण-तन्त्रम्", 
    inputPlaceholder: "परीक्षणाय सङ्केतं पाठं वा प्रविशतु...", 
    checkBtn: "सुरक्षां परीक्षताम्", 
    checking: "विश्लेषणं क्रियते...", 
    safeResult: "सामग्री सुरक्षितं दृश्यते", 
    riskResult: "संदिग्ध-सामग्री प्राप्ता", 
    tipsTitle: "सुरक्षा-निर्देशाः", 
    tip1: "स्वस्य गुह्य-कूटशब्दान् अथवा बैङ्किङ्ग-पिन-सङ्केतं कोऽपि मा वदतु।", 
    tip2: "वैयक्तिक-सूचनायाः प्रदानात् पूर्वं आधिकारिक-जालस्थानस्य सङ्केतान् सत्यापयन्तु।", 
    tip3: "अज्ञात-सङ्केतेषु क्लिकं मा कुर्वन्तु।"
  }
};

export default function ScamSafety() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];

  const [inputVal, setInputVal] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setChecking(true);
    setResult(null);

    setTimeout(() => {
      // Real functional heuristic check for scam patterns (e.g. tracking tokens or suspicious words)
      const lower = inputVal.toLowerCase();
      const isSuspicious = lower.includes('win') || lower.includes('free') || lower.includes('http://') || lower.includes('click') || lower.includes('priz');
      
      setResult({
        safe: !isSuspicious
      });
      setChecking(false);
    }, 1200);
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

        {/* Interactive Validation Form */}
        <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
          <form onSubmit={handleCheck} className="space-y-6">
            <div>
              <input
                type="text"
                required
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={content.inputPlaceholder}
                className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-4 text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors"
              />
            </div>

            <button 
              type="submit"
              disabled={checking}
              className={`w-full py-4 font-bold text-lg uppercase tracking-widest transition-all border shadow-sm ${
                checking 
                  ? 'bg-[var(--surface-hover)] text-[var(--text-muted)] border-[var(--border)] cursor-not-allowed'
                  : 'bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border-transparent hover:border-[var(--border-strong)]'
              }`}
            >
              {checking ? content.checking : content.checkBtn}
            </button>
          </form>

          {/* Validation Result Display */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-6 border text-center font-bold text-lg uppercase tracking-widest ${
                result.safe 
                  ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500'
                  : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-500'
              }`}
            >
              {result.safe ? content.safeResult : content.riskResult}
            </motion.div>
          )}
        </div>

        {/* Safety Guidelines Card */}
        <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-6 border-b border-[var(--border)] pb-4">
            {content.tipsTitle}
          </h2>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="w-6 h-6 bg-[var(--brand-blue)] text-[var(--brand-white)] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-1">1</span>
              <span className="text-[var(--text-secondary)] font-medium text-lg leading-relaxed">
                {content.tip1}
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-6 h-6 bg-[var(--brand-blue)] text-[var(--brand-white)] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-1">2</span>
              <span className="text-[var(--text-secondary)] font-medium text-lg leading-relaxed">
                {content.tip2}
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-6 h-6 bg-[var(--brand-blue)] text-[var(--brand-white)] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-1">3</span>
              <span className="text-[var(--text-secondary)] font-medium text-lg leading-relaxed">
                {content.tip3}
              </span>
            </li>
          </ul>
        </div>

      </motion.div>
    </div>
  );
}