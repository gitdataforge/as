import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { 
    title: "About AstroSafe", 
    subtitle: "Company Identity", 
    missionTitle: "Our Mission", 
    missionDesc: "To provide simple and strong digital safety for every business and individual.", 
    companyTitle: "The Company", 
    companyDesc: "AstroSafe is developed and maintained by AnyAstro Techno Solutions. We focus on privacy and strict zero-trust security.", 
    teamTitle: "Leadership Team", 
    teamDesc: "Developed by Arun Ammisetty & Palak Bhosale. The Pune & Bengaluru offices are managed by Arun Ammisetty and his team.", 
    locationTitle: "Headquarters", 
    locationDesc: "Pune & Bengaluru",
    bioLabel: "Arun Ammisetty Profile",
    linkedinArun: "Arun LinkedIn",
    linkedinPalak: "Palak LinkedIn"
  },
  hi: { 
    title: "AstroSafe के बारे में", 
    subtitle: "कंपनी की पहचान", 
    missionTitle: "हमारा लक्ष्य", 
    missionDesc: "हर व्यवसाय और व्यक्ति के लिए सरल और मजबूत डिजिटल सुरक्षा प्रदान करना।", 
    companyTitle: "कंपनी", 
    companyDesc: "AstroSafe को AnyAstro Techno Solutions द्वारा विकसित किया गया है। हम गोपनीयता पर ध्यान केंद्रित करते हैं।", 
    teamTitle: "नेतृत्व टीम", 
    teamDesc: "अरुण अमिसेट्टी और पलक भोसले द्वारा विकसित। पुणे और बेंगलुरु कार्यालयों का प्रबंधन अरुण अमिसेट्टी और उनकी टीम करती है।", 
    locationTitle: "मुख्यालय", 
    locationDesc: "पुणे और बेंगलुरु",
    bioLabel: "अरुण अमिसेट्टी प्रोफाइल",
    linkedinArun: "अरुण लिंक्डइन",
    linkedinPalak: "पलक लिंक्डइन"
  },
  mr: { 
    title: "AstroSafe बद्दल", 
    subtitle: "कंपनीची ओळख", 
    missionTitle: "आमचे ध्येय", 
    missionDesc: "प्रत्येक व्यवसाय आणि व्यक्तीसाठी सोपी आणि मजबूत डिजिटल सुरक्षा प्रदान करणे.", 
    companyTitle: "कंपनी", 
    companyDesc: "AstroSafe AnyAstro Techno Solutions द्वारे विकसित केले आहे. आम्ही गोपनीयतेवर लक्ष केंद्रित करतो.", 
    teamTitle: "नेतृत्व संघ", 
    teamDesc: "अरुण अमिसेट्टी आणि पलक भोसले यांनी विकसित केले. पुणे आणि बेंगळुरू कार्यालयांचे व्यवस्थापन अरुण अमिसेट्टी आणि त्यांची टीम करते.", 
    locationTitle: "मुख्यालय", 
    locationDesc: "पुणे आणि बेंगळुरू",
    bioLabel: "अरुण अमिसेट्टी प्रोफाइल",
    linkedinArun: "अरुण लिंक्डइन",
    linkedinPalak: "पलक लिंक्डइन"
  },
  ta: { 
    title: "AstroSafe பற்றி", 
    subtitle: "நிறுவனத்தின் அடையாளம்", 
    missionTitle: "எங்கள் நோக்கம்", 
    missionDesc: "ஒவ்வொரு வணிகத்திற்கும் எளிமையான மற்றும் வலுவான டிஜிட்டல் பாதுகாப்பை வழங்குதல்.", 
    companyTitle: "நிறுவனம்", 
    companyDesc: "AstroSafe AnyAstro Techno Solutions ஆல் உருவாக்கப்பட்டது. நாங்கள் தனியுரிமையில் கவனம் செலுத்துகிறோம்.", 
    teamTitle: "தலைமை குழு", 
    teamDesc: "அருண் அம்மிசெட்டி மற்றும் பாலக் போசலே ஆகியோரால் உருவாக்கப்பட்டது. புனே மற்றும் பெங்களூரு அலுவலகங்கள் அருண் அம்மிசெட்டி மற்றும் அவரது குழுவினரால் நிர்வகிக்கப்படுகின்றன.", 
    locationTitle: "தலைமையகம்", 
    locationDesc: "புனே மற்றும் பெங்களூரு",
    bioLabel: "அருண் அம்மிசெட்டி சுயவிவரம்",
    linkedinArun: "அருண் லிங்க்ட்இன்",
    linkedinPalak: "பாலக் லிங்க்ட்இன்"
  },
  te: { 
    title: "AstroSafe గురించి", 
    subtitle: "కంపెనీ గుర్తింపు", 
    missionTitle: "మా లక్ష్యం", 
    missionDesc: "ప్రతి వ్యాపారానికి మరియు వ్యక్తికి సరళమైన మరియు బలమైన డిజిటల్ భద్రతను అందించడం.", 
    companyTitle: "కంపెనీ", 
    companyDesc: "AstroSafe AnyAstro Techno Solutions ద్వారా అభివృద్ధి చేయబడింది. మేము గోప్యతపై దృష్టి పెడతాము.", 
    teamTitle: "నాయకత్వ బృందం", 
    teamDesc: "అరుణ్ అమ్మిశెట్టి మరియు పలక్ భోసలే ద్వారా అభివృద్ధి చేయబడింది. పూణే మరియు బెంగళూరు కార్యాలయాలను అరుణ్ అమ్మిశెట్టి మరియు అతని బృందం నిర్వహిస్తోంది.", 
    locationTitle: "ప్రధాన కార్యాలయం", 
    locationDesc: "పూణే మరియు బెంగళూరు",
    bioLabel: "అరుణ్ అమ్మిశెట్టి ప్రొఫైల్",
    linkedinArun: "అరుణ్ లింక్డ్‌ఇన్",
    linkedinPalak: "పలక్ లింక్డ్‌ఇన్"
  },
  kn: { 
    title: "AstroSafe ಬಗ್ಗೆ", 
    subtitle: "ಕಂಪನಿಯ ಗುರುತು", 
    missionTitle: "ನಮ್ಮ ಉದ್ದೇಶ", 
    missionDesc: "ಪ್ರತಿಯೊಂದು ವ್ಯವಹಾರ ಮತ್ತು ವ್ಯಕ್ತಿಗೆ ಸರಳ ಮತ್ತು ಬಲವಾದ ಡಿಜಿಟಲ್ ಭದ್ರತೆಯನ್ನು ಒದಗಿಸುವುದು.", 
    companyTitle: "ಕಂಪನಿ", 
    companyDesc: "AstroSafe ಅನ್ನು AnyAstro Techno Solutions ಅಭಿವೃದ್ಧಿಪಡಿಸಿದೆ. ನಾವು ಗೌಪ್ಯತೆಯ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸುತ್ತೇವೆ.", 
    teamTitle: "ನಾಯಕತ್ವ ತಂಡ", 
    teamDesc: "ಅರುಣ್ ಅಮ್ಮಿಸೆಟ್ಟಿ ಮತ್ತು ಪಲಕ್ ಭೋಸಲೆ ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ್ದಾರೆ. ಪುಣೆ ಮತ್ತು ಬೆಂಗಳೂರು ಕಚೇರಿಗಳನ್ನು ಅರುಣ್ ಅಮ್ಮಿಸೆಟ್ಟಿ ಮತ್ತು ಅವರ ತಂಡ ನಿರ್ವಹಿಸುತ್ತಿದೆ.", 
    locationTitle: "ಪ್ರಧಾನ ಕಚೇರಿ", 
    locationDesc: "ಪುಣೆ ಮತ್ತು ಬೆಂಗಳೂರು",
    bioLabel: "ಅರುಣ್ ಅಮ್ಮಿಸೆಟ್ಟಿ ಪ್ರೊಫೈಲ್",
    linkedinArun: "ಅರುಣ್ ಲಿಂಕ್ಡ್‌ಇನ್",
    linkedinPalak: "ಪಲಕ್ ಲಿಂಕ್ಡ್‌ಇನ್"
  },
  bn: { 
    title: "AstroSafe সম্পর্কে", 
    subtitle: "কোম্পানির পরিচয়", 
    missionTitle: "আমাদের লক্ষ্য", 
    missionDesc: "প্রতিটি ব্যবসা এবং ব্যক্তির জন্য সহজ এবং শক্তিশালী ডিজিটাল নিরাপত্তা প্রদান করা।", 
    companyTitle: "কোম্পানি", 
    companyDesc: "AstroSafe AnyAstro Techno Solutions দ্বারা তৈরি। আমরা গোপনীয়তার উপর ফোকাস করি।", 
    teamTitle: "নেতৃত্ব দল", 
    teamDesc: "অরুণ আমিসেট্টি এবং পলক ভোঁসলে দ্বারা তৈরি। পুনে এবং বেঙ্গালুরু অফিসগুলি অরুণ আমিসেট্টি এবং তার দল দ্বারা পরিচালিত হয়।", 
    locationTitle: "সদর দপ্তর", 
    locationDesc: "পুনে এবং বেঙ্গালুরু",
    bioLabel: "অরুণ আমিসেট্টি প্রোফাইল",
    linkedinArun: "অরুণ লিঙ্কডইন",
    linkedinPalak: "পলক লিঙ্কডইন"
  },
  gu: { 
    title: "AstroSafe વિશે", 
    subtitle: "કંપનીની ઓળખ", 
    missionTitle: "અમારું લક્ષ્ય", 
    missionDesc: "દરેક વ્યવસાય અને વ્યક્તિ માટે સરળ અને મજબૂત ડિજિટલ સુરક્ષા પ્રદાન કરવી.", 
    companyTitle: "કંપની", 
    companyDesc: "AstroSafe AnyAstro Techno Solutions દ્વારા વિકસાવવામાં આવ્યું છે. અમે ગોપનીયતા પર ધ્યાન કેન્દ્રિત કરીએ છીએ.", 
    teamTitle: "નેતૃત્વ ટીમ", 
    teamDesc: "અરુણ અમ્મિસેટ્ટી અને પલક ભોસલે દ્વારા વિકસિત. પુણે અને બેંગલુરુ કચેરીઓનું સંચાલન અરુણ અમ્મિસેટ્ટી અને તેમની ટીમ કરે છે.", 
    locationTitle: "મુખ્ય મથક", 
    locationDesc: "પુણે અને બેંગલુરુ",
    bioLabel: "અરુણ અમ્મિસેટ્ટી પ્રોફાઇલ",
    linkedinArun: "અરુણ લિંક્ડઇન",
    linkedinPalak: "પલક લિંક્ડઇન"
  },
  pa: { 
    title: "AstroSafe ਬਾਰੇ", 
    subtitle: "ਕੰਪਨੀ ਦੀ ਪਛਾਣ", 
    missionTitle: "ਸਾਡਾ ਟੀਚਾ", 
    missionDesc: "ਹਰੇਕ ਕਾਰੋਬਾਰ ਅਤੇ ਵਿਅਕਤੀ ਲਈ ਸਧਾਰਨ ਅਤੇ ਮਜ਼ਬੂਤ ਡਿਜੀਟਲ ਸੁਰੱਖਿਆ ਪ੍ਰਦਾਨ ਕਰਨਾ।", 
    companyTitle: "ਕੰਪਨੀ", 
    companyDesc: "AstroSafe AnyAstro Techno Solutions ਦੁਆਰਾ ਵਿਕਸਤ ਕੀਤਾ ਗਿਆ ਹੈ। ਅਸੀਂ ਗੋਪਨੀਯਤਾ 'ਤੇ ਧਿਆਨ ਕੇਂਦਰਤ ਕਰਦੇ ਹਾਂ।", 
    teamTitle: "ਲੀਡਰਸ਼ਿਪ ਟੀਮ", 
    teamDesc: "ਅਰੁਣ ਅੰਮੀਸੈਟੀ ਅਤੇ ਪਲਕ ਭੋਸਲੇ ਦੁਆਰਾ ਵਿਕਸਤ ਕੀਤਾ ਗਿਆ। ਪੁਣੇ ਅਤੇ ਬੈਂਗਲੁਰੂ ਦਫਤਰਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਅਰੁਣ ਅੰਮੀਸੈਟੀ ਅਤੇ ਉਸਦੀ ਟੀਮ ਕਰਦੀ ਹੈ।", 
    locationTitle: "ਮੁੱਖ ਦਫਤਰ", 
    locationDesc: "ਪੁਣੇ ਅਤੇ ਬੈਂਗਲੁਰੂ",
    bioLabel: "ਅਰੁਣ ਅੰਮੀਸੈਟੀ ਪ੍ਰੋਫਾਈਲ",
    linkedinArun: "ਅਰੁਣ ਲਿੰਕਡਇਨ",
    linkedinPalak: "ਪਲਕ ਲਿੰਕਡਇਨ"
  },
  ml: { 
    title: "AstroSafe നെക്കുറിച്ച്", 
    subtitle: "കമ്പനിയുടെ ഐഡന്റിറ്റി", 
    missionTitle: "ഞങ്ങളുടെ ലക്ഷ്യം", 
    missionDesc: "ഓരോ ബിസിനസ്സിനും വ്യക്തിക്കും ലളിതവും ശക്തവുമായ ഡിജിറ്റൽ സുരക്ഷ നൽകുക.", 
    companyTitle: "കമ്പനി", 
    companyDesc: "AstroSafe വികസിപ്പിച്ചത് AnyAstro Techno Solutions ആണ്. ഞങ്ങൾ സ്വകാര്യതയിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു.", 
    teamTitle: "നേതൃത്വ ടീം", 
    teamDesc: "അരുൺ അമ്മിസെട്ടിയും പാലക് ഭോസലെയും ചേർന്ന് വികസിപ്പിച്ചത്. പൂനെ, ബെംഗളൂരു ഓഫീസുകൾ കൈകാര്യം ചെയ്യുന്നത് അരുൺ അമ്മിസെട്ടിയും അദ്ദേഹത്തിന്റെ ടീമുമാണ്.", 
    locationTitle: "ആസ്ഥാനം", 
    locationDesc: "പൂനെ, ബെംഗളൂരു",
    bioLabel: "അരുൺ അമ്മിസെട്ടി പ്രൊഫൈൽ",
    linkedinArun: "അരുൺ ലിങ്ക്ഡ്ഇൻ",
    linkedinPalak: "പാലക് ലിങ്ക്ഡ്ഇൻ"
  },
  or: { 
    title: "AstroSafe ବିଷୟରେ", 
    subtitle: "କମ୍ପାନୀ ପରିଚୟ", 
    missionTitle: "ଆମର ଲକ୍ଷ୍ୟ", 
    missionDesc: "ପ୍ରତ୍ୟେକ ବ୍ୟବସାୟ ଏବଂ ବ୍ୟକ୍ତି ପାଇଁ ସରଳ ଏବଂ ଦୃଢ ଡିଜିଟାଲ୍ ସୁରକ୍ଷା ପ୍ରଦାନ କରିବା |", 
    companyTitle: "କମ୍ପାନୀ", 
    companyDesc: "AstroSafe AnyAstro Techno Solutions ଦ୍ୱାରା ବିକଶିତ | ଆମେ ଗୋପନୀୟତା ଉପରେ ଧ୍ୟାନ ଦେଉ |", 
    teamTitle: "ନେତୃତ୍ୱ ଦଳ", 
    teamDesc: "ଅରୁଣ ଆମ୍ମିସେଟ୍ଟି ଏବଂ ପଲକ ଭୋସଲେଙ୍କ ଦ୍ୱାରା ବିକଶିତ | ପୁଣେ ଏବଂ ବେଙ୍ଗାଲୁରୁ କାର୍ଯ୍ୟାଳୟଗୁଡ଼ିକୁ ଅରୁଣ ଆମ୍ମିସେଟ୍ଟି ଏବଂ ତାଙ୍କ ଦଳ ପରିଚାଳନା କରନ୍ତି |", 
    locationTitle: "ମୁଖ୍ୟାଳୟ", 
    locationDesc: "ପୁଣେ ଏବଂ ବେଙ୍ଗାଲୁରୁ |",
    bioLabel: "ଅରୁଣ ଆମ୍ମିସେଟ୍ଟି ପ୍ରୋଫାଇଲ୍",
    linkedinArun: "ଅରୁଣ ଲିଙ୍କଡଇନ୍",
    linkedinPalak: "ପଲକ ଲିଙ୍କଡଇନ୍"
  },
  as: { 
    title: "AstroSafe ৰ বিষয়ে", 
    subtitle: "কোম্পানীৰ পৰিচয়", 
    missionTitle: "আমাৰ লক্ষ্য", 
    missionDesc: "প্ৰতিটো ব্যৱসায় আৰু ব্যক্তিৰ বাবে সৰল আৰু শক্তিশালী ডিজিটেল সুৰক্ষা প্ৰদান কৰা।", 
    companyTitle: "কোম্পানী", 
    companyDesc: "AstroSafe AnyAstro Techno Solutions ৰ দ্বাৰা বিকশিত। আমি গোপনীয়তাৰ ওপৰত গুৰুত্ব দিওঁ।", 
    teamTitle: "নেতৃত্ব দল", 
    teamDesc: "অৰুণ অমিছেট্টি আৰু পলক ভোছালেৰ দ্বাৰা বিকশিত। পুনে আৰু বেংগালুৰু কাৰ্যালয়সমূহ অৰুণ অমিছেট্টি আৰু তেওঁৰ দলে পৰিচালনা কৰে।", 
    locationTitle: "মুখ্য কাৰ্যালয়", 
    locationDesc: "পুনে আৰু বেংগালুৰু",
    bioLabel: "অৰুণ অমিছেট্টি প্ৰোফাইল",
    linkedinArun: "অৰুণ লিংডইন",
    linkedinPalak: "পলক লিংডইন"
  },
  ur: { 
    title: "AstroSafe کے بارے میں", 
    subtitle: "کمپنی کی شناخت", 
    missionTitle: "ہمارا مقصد", 
    missionDesc: "ہر کاروبار اور فرد کے لیے سادہ اور مضبوط ڈیجیٹل سیکیورٹی فراہم کرنا۔", 
    companyTitle: "کمپنی", 
    companyDesc: "AstroSafe کو AnyAstro Techno Solutions نے تیار کیا ہے۔ ہم رازداری پر توجہ مرکوز کرتے ہیں۔", 
    teamTitle: "قیادت کی ٹیم", 
    teamDesc: "ارون امیسیٹی اور پلک بھوسلے کے ذریعہ تیار کردہ۔ پونے اور بنگلورو دفاتر کا انتظام ارون امیسیٹی اور ان کی ٹیم کرتی ہے۔", 
    locationTitle: "ہیڈ کوارٹر", 
    locationDesc: "پونے اور بنگلورو",
    bioLabel: "ارون امیسیٹی پروفائل",
    linkedinArun: "ارون لنکڈ ان",
    linkedinPalak: "پلک لنکڈ ان"
  },
  sa: { 
    title: "AstroSafe विषयकम्", 
    subtitle: "समवाय-परिचयः", 
    missionTitle: "अस्माकं लक्ष्यम्", 
    missionDesc: "प्रत्येक-व्यापाराय व्यक्तये च सरलां दृढां च साङ्ख्यिक-सुरक्षां प्रदातुम्।", 
    companyTitle: "समवायः", 
    companyDesc: "AstroSafe AnyAstro Techno Solutions द्वारा विकसितम्। वयं गोपनीयतायां ध्यानं दद्मः।", 
    teamTitle: "नेतृत्व-दलम्", 
    teamDesc: "अरुण-अम्मिसेट्टी तथा पलक-भोसले द्वारा विकसितम्। पुणे-बेङ्गलूरु-कार्यालयानां प्रबन्धनं अरुण-अम्मिसेट्टी तथा तस्य दलम् करोति।", 
    locationTitle: "मुख्य-कार्यालयः", 
    locationDesc: "पुणे तथा बेङ्गलूरु",
    bioLabel: "अरुण-अम्मिसेट्टी प्रोफाइल",
    linkedinArun: "अरुण लिंक्डइन",
    linkedinPalak: "पलक लिंक्डइन"
  }
};

export default function About() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];

  useEffect(() => {
    window.scrollTo(0, 0);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Statement with Custom Animated Illustration */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col">
            <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-6">
              {content.missionTitle}
            </h2>
            <div className="flex-grow flex flex-col items-center justify-center py-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 relative flex items-center justify-center mb-8"
              >
                {/* Custom Geometry Artwork */}
                <div className="absolute inset-0 border-4 border-[var(--text-primary)] border-dashed rounded-full opacity-20"></div>
                <div className="absolute inset-2 border-2 border-[var(--brand-blue)] rounded-none rotate-45"></div>
                <div className="absolute inset-6 bg-[var(--brand-black)] rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-[var(--brand-white)]"></div>
                </div>
              </motion.div>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed text-center">
                {content.missionDesc}
              </p>
            </div>
          </div>

          {/* Company Details */}
          <div className="space-y-8 flex flex-col justify-between">
            
            <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm">
              <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 border-b border-[var(--border)] pb-2">
                {content.companyTitle}
              </h2>
              <p className="text-[var(--text-primary)] font-bold leading-relaxed text-lg">
                {content.companyDesc}
              </p>
            </div>

            <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm">
              <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 border-b border-[var(--border-strong)] pb-2">
                {content.teamTitle}
              </h2>
              <p className="text-[var(--brand-white)] font-medium leading-relaxed mb-4">
                {content.teamDesc}
              </p>
              
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[var(--border-strong)]">
                <a href="https://rebrand.ly/aammisetty" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] hover:text-[var(--brand-white)] font-bold transition-colors text-sm uppercase tracking-widest flex items-center gap-2">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  {content.bioLabel}
                </a>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/in/arun-ammisetty" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] font-bold transition-colors text-xs uppercase tracking-widest">
                    {content.linkedinArun}
                  </a>
                  <a href="https://linkedin.com/in/bhosalepalak" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] font-bold transition-colors text-xs uppercase tracking-widest">
                    {content.linkedinPalak}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Location & Headquarters */}
        <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 flex-shrink-0 bg-[var(--surface)] border-2 border-[var(--brand-blue)] flex items-center justify-center p-4">
             {/* Custom Building Iconography */}
             <svg viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" strokeWidth="1.5" className="w-full h-full">
               <path d="M3 21h18 M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16 M9 7h6 M9 11h6 M9 15h6" />
             </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
              {content.locationTitle}
            </h2>
            <p className="text-[var(--text-primary)] font-bold text-2xl leading-relaxed uppercase tracking-widest">
              {content.locationDesc}
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}