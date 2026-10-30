import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Company Departments", subtitle: "Organizational Structure", security: "Security Team", securityDesc: "Manages system safety and protection.", support: "Support Team", supportDesc: "Helps users with account and system issues.", legal: "Legal Team", legalDesc: "Handles business rules and compliance.", management: "Management Team", managementDesc: "Directs company operations and strategy.", view: "View Department" },
  hi: { title: "कंपनी के विभाग", subtitle: "संगठनात्मक संरचना", security: "सुरक्षा टीम", securityDesc: "सिस्टम सुरक्षा और बचाव का प्रबंधन करती है।", support: "सहायता टीम", supportDesc: "खाते और सिस्टम की समस्याओं में उपयोगकर्ताओं की मदद करती है।", legal: "कानूनी टीम", legalDesc: "व्यावसायिक नियमों और अनुपालन को संभालती है।", management: "प्रबंधन टीम", managementDesc: "कंपनी के संचालन और रणनीति का निर्देशन करती है।", view: "विभाग देखें" },
  mr: { title: "कंपनीचे विभाग", subtitle: "संस्थात्मक रचना", security: "सुरक्षा संघ", securityDesc: "सिस्टम सुरक्षा आणि संरक्षणाचे व्यवस्थापन करते.", support: "समर्थन संघ", supportDesc: "खाते आणि सिस्टम समस्यांसह वापरकर्त्यांना मदत करते.", legal: "कायदेशीर संघ", legalDesc: "व्यवसाय नियम आणि अनुपालन हाताळते.", management: "व्यवस्थापन संघ", managementDesc: "कंपनीचे कामकाज आणि धोरण निर्देशित करते.", view: "विभाग पहा" },
  ta: { title: "நிறுவனத்தின் துறைகள்", subtitle: "நிறுவன அமைப்பு", security: "பாதுகாப்பு குழு", securityDesc: "கணினி பாதுகாப்பு மற்றும் பாதுகாப்பை நிர்வகிக்கிறது.", support: "ஆதரவு குழு", supportDesc: "கணக்கு மற்றும் கணினி சிக்கல்களில் பயனர்களுக்கு உதவுகிறது.", legal: "சட்ட குழு", legalDesc: "வணிக விதிகள் மற்றும் இணக்கத்தை கையாளுகிறது.", management: "மேலாண்மை குழு", managementDesc: "நிறுவனத்தின் செயல்பாடுகள் மற்றும் உத்தியை வழிநடத்துகிறது.", view: "துறையைக் காண்க" },
  te: { title: "కంపెనీ విభాగాలు", subtitle: "సంస్థాగత నిర్మాణం", security: "భద్రతా బృందం", securityDesc: "సిస్టమ్ భద్రత మరియు రక్షణను నిర్వహిస్తుంది.", support: "మద్దతు బృందం", supportDesc: "ఖాతా మరియు సిస్టమ్ సమస్యలతో వినియోగదారులకు సహాయపడుతుంది.", legal: "న్యాయ బృందం", legalDesc: "వ్యాపార నియమాలు మరియు సమ్మతిని నిర్వహిస్తుంది.", management: "నిర్వహణ బృందం", managementDesc: "కంపెనీ కార్యకలాపాలు మరియు వ్యూహాన్ని నిర్దేశిస్తుంది.", view: "విభాగాన్ని వీక్షించండి" },
  kn: { title: "ಕಂಪನಿಯ ಇಲಾಖೆಗಳು", subtitle: "ಸಾಂಸ್ಥಿಕ ರಚನೆ", security: "ಭದ್ರತಾ ತಂಡ", securityDesc: "ಸಿಸ್ಟಮ್ ಸುರಕ್ಷತೆ ಮತ್ತು ರಕ್ಷಣೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.", support: "ಬೆಂಬಲ ತಂಡ", supportDesc: "ಖಾತೆ ಮತ್ತು ಸಿಸ್ಟಮ್ ಸಮಸ್ಯೆಗಳೊಂದಿಗೆ ಬಳಕೆದಾರರಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.", legal: "ಕಾನೂನು ತಂಡ", legalDesc: "ವ್ಯಾಪಾರ ನಿಯಮಗಳು ಮತ್ತು ಅನುಸರಣೆಯನ್ನು ನಿಭಾಯಿಸುತ್ತದೆ.", management: "ನಿರ್ವಹಣಾ ತಂಡ", managementDesc: "ಕಂಪನಿಯ ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ತಂತ್ರವನ್ನು ನಿರ್ದೇಶಿಸುತ್ತದೆ.", view: "ಇಲಾಖೆಯನ್ನು ವೀಕ್ಷಿಸಿ" },
  bn: { title: "কোম্পানির বিভাগসমূহ", subtitle: "সাংগঠনিক কাঠামো", security: "নিরাপত্তা দল", securityDesc: "সিস্টেমের নিরাপত্তা এবং সুরক্ষা পরিচালনা করে।", support: "সমর্থন দল", supportDesc: "অ্যাকাউন্ট এবং সিস্টেম সমস্যায় ব্যবহারকারীদের সাহায্য করে।", legal: "আইনি দল", legalDesc: "ব্যবসার নিয়ম এবং সম্মতি পরিচালনা করে।", management: "ব্যবস্থাপনা দল", managementDesc: "কোম্পানির কার্যক্রম এবং কৌশল পরিচালনা করে।", view: "বিভাগ দেখুন" },
  gu: { title: "કંપનીના વિભાગો", subtitle: "સંસ્થાકીય માળખું", security: "સુરક્ષા ટીમ", securityDesc: "સિસ્ટમ સુરક્ષા અને રક્ષણનું સંચાલન કરે છે.", support: "આધાર ટીમ", supportDesc: "ખાતા અને સિસ્ટમ સમસ્યાઓ સાથે વપરાશકર્તાઓને મદદ કરે છે.", legal: "કાનૂની ટીમ", legalDesc: "વ્યાપાર નિયમો અને પાલનનું સંચાલન કરે છે.", management: "સંચાલન ટીમ", managementDesc: "કંપનીની કામગીરી અને વ્યૂહરચનાનું નિર્દેશન કરે છે.", view: "વિભાગ જુઓ" },
  pa: { title: "ਕੰਪਨੀ ਦੇ ਵਿਭਾਗ", subtitle: "ਸੰਗਠਨਾਤਮਕ ਢਾਂਚਾ", security: "ਸੁਰੱਖਿਆ ਟੀਮ", securityDesc: "ਸਿਸਟਮ ਸੁਰੱਖਿਆ ਅਤੇ ਬਚਾਅ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਦੀ ਹੈ।", support: "ਸਹਾਇਤਾ ਟੀਮ", supportDesc: "ਖਾਤੇ ਅਤੇ ਸਿਸਟਮ ਸਮੱਸਿਆਵਾਂ ਨਾਲ ਉਪਭੋਗਤਾਵਾਂ ਦੀ ਮਦਦ ਕਰਦੀ ਹੈ।", legal: "ਕਾਨੂੰਨੀ ਟੀਮ", legalDesc: "ਕਾਰੋਬਾਰੀ ਨਿਯਮਾਂ ਅਤੇ ਪਾਲਣਾ ਨੂੰ ਸੰਭਾਲਦੀ ਹੈ।", management: "ਪ੍ਰਬੰਧਨ ਟੀਮ", managementDesc: "ਕੰਪਨੀ ਦੇ ਸੰਚਾਲਨ ਅਤੇ ਰਣਨੀਤੀ ਦਾ ਨਿਰਦੇਸ਼ਨ ਕਰਦੀ ਹੈ।", view: "ਵਿਭਾਗ ਦੇਖੋ" },
  ml: { title: "കമ്പനി വകുപ്പുകൾ", subtitle: "സംഘടനാ ഘടന", security: "സുരക്ഷാ ടീം", securityDesc: "സിസ്റ്റം സുരക്ഷയും സംരക്ഷണവും കൈകാര്യം ചെയ്യുന്നു.", support: "പിന്തുണ ടീം", supportDesc: "അക്കൗണ്ട്, സിസ്റ്റം പ്രശ്നങ്ങളിൽ ഉപയോക്താക്കളെ സഹായിക്കുന്നു.", legal: "നിയമ ടീം", legalDesc: "ബിസിനസ്സ് നിയമങ്ങളും പാലിക്കലും കൈകാര്യം ചെയ്യുന്നു.", management: "മാനേജ്മെന്റ് ടീം", managementDesc: "കമ്പനിയുടെ പ്രവർത്തനങ്ങളും തന്ത്രവും നയിക്കുന്നു.", view: "വകുപ്പ് കാണുക" },
  or: { title: "କମ୍ପାନୀ ବିଭାଗଗୁଡ଼ିକ", subtitle: "ସାଂଗଠନିକ ଗଠନ", security: "ସୁରକ୍ଷା ଦଳ", securityDesc: "ସିଷ୍ଟମ୍ ସୁରକ୍ଷା ଏବଂ ରକ୍ଷଣାବେକ୍ଷଣ ପରିଚାଳନା କରେ |", support: "ସମର୍ଥନ ଦଳ", supportDesc: "ଆକାଉଣ୍ଟ୍ ଏବଂ ସିଷ୍ଟମ୍ ସମସ୍ୟାଗୁଡ଼ିକରେ ଉପଯୋଗକର୍ତ୍ତାଙ୍କୁ ସାହାଯ୍ୟ କରେ |", legal: "ଆଇନ ଦଳ", legalDesc: "ବ୍ୟବସାୟ ନିୟମ ଏବଂ ଅନୁପାଳନ ପରିଚାଳନା କରେ |", management: "ପରିଚାଳନା ଦଳ", managementDesc: "କମ୍ପାନୀର କାର୍ଯ୍ୟକଳାପ ଏବଂ ରଣନୀତି ନିର୍ଦ୍ଦେଶ କରେ |", view: "ବିଭାଗ ଦେଖନ୍ତୁ" },
  as: { title: "কোম্পানীৰ বিভাগসমূহ", subtitle: "সাংগঠনিক গাঁথনি", security: "সুৰক্ষা দল", securityDesc: "চিষ্টেমৰ সুৰক্ষা আৰু ৰক্ষা পৰিচালনা কৰে।", support: "সমৰ্থন দল", supportDesc: "একাউণ্ট আৰু চিষ্টেমৰ সমস্যাৰ সৈতে ব্যৱহাৰকাৰীসকলক সহায় কৰে।", legal: "আইনী দল", legalDesc: "ব্যৱসায়িক নিয়ম আৰু অনুপালন পৰিচালনা কৰে।", management: "পৰিচালনা দল", managementDesc: "কোম্পানীৰ কাৰ্যকলাপ আৰু কৌশল নিৰ্দেশ কৰে।", view: "বিভাগ চাওক" },
  ur: { title: "کمپنی کے محکمے", subtitle: "تنظیمی ڈھانچہ", security: "سیکیورٹی ٹیم", securityDesc: "سسٹم کی حفاظت اور تحفظ کا انتظام کرتی ہے۔", support: "سپورٹ ٹیم", supportDesc: "اکاؤنٹ اور سسٹم کے مسائل میں صارفین کی مدد کرتی ہے۔", legal: "قانونی ٹیم", legalDesc: "کاروباری اصولوں اور تعمیل کو سنبھالتی ہے۔", management: "مینجمنٹ ٹیم", managementDesc: "کمپنی کے کاموں اور حکمت عملی کی رہنمائی کرتی ہے۔", view: "محکمہ دیکھیں" },
  sa: { title: "समवाय-विभागाः", subtitle: "संस्थात्मक-संरचना", security: "सुरक्षा-दलम्", securityDesc: "तन्त्र-सुरक्षायाः रक्षणस्य च प्रबन्धनं करोति।", support: "सहायता-दलम्", supportDesc: "उपयोक्तृभ्यः खाता-तन्त्र-समस्यासु साहाय्यं करोति।", legal: "विधि-दलम्", legalDesc: "व्यापार-नियमानां अनुपालनस्य च प्रबन्धनं करोति।", management: "प्रबन्धन-दलम्", managementDesc: "समवायस्य कार्याणां रणनीतेः च निर्देशनं करोति।", view: "विभागं पश्यतु" }
};

export default function Department() {
  const { language = 'en' } = useTheme();
  const navigate = useNavigate();
  const content = pageTranslations[language] || pageTranslations['en'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
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

        {/* Structural Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Security Team Department */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="w-10 h-10 bg-[var(--brand-blue)] mb-6"></div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                {content.security}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6">
                {content.securityDesc}
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/cybersecurity')}
              className="w-full py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-sm"
            >
              {content.view}
            </button>
          </div>

          {/* Support Team Department */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="w-10 h-10 bg-[var(--brand-blue)] mb-6"></div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                {content.support}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6">
                {content.supportDesc}
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/customer-support')}
              className="w-full py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-sm"
            >
              {content.view}
            </button>
          </div>

          {/* Legal Team Department */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="w-10 h-10 bg-[var(--text-primary)] mb-6"></div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                {content.legal}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6">
                {content.legalDesc}
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/legal')}
              className="w-full py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-sm"
            >
              {content.view}
            </button>
          </div>

          {/* Management Team Department */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[240px]">
            <div>
              <div className="w-10 h-10 bg-[var(--text-primary)] mb-6"></div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                {content.management}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6">
                {content.managementDesc}
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/overview')}
              className="w-full py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-sm"
            >
              {content.view}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}