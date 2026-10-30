import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Newsroom", subtitle: "Latest Announcements", press: "Press Release", share: "Share", print: "Print", news1Title: "Launch of AstroSafe Platform", news1Desc: "AstroSafe officially launches its security tools to the public.", news2Title: "Expansion to Bengaluru Office", news2Desc: "AnyAstro Techno Solutions expands operations with a new branch in Bengaluru.", readMore: "Read Document" },
  hi: { title: "न्यूज़ रूम", subtitle: "नवीनतम घोषणाएं", press: "प्रेस विज्ञप्ति", share: "साझा करें", print: "प्रिंट करें", news1Title: "AstroSafe प्लेटफॉर्म का लॉन्च", news1Desc: "AstroSafe ने आधिकारिक तौर पर अपने सुरक्षा उपकरण जनता के लिए लॉन्च किए।", news2Title: "बेंगलुरु कार्यालय का विस्तार", news2Desc: "AnyAstro Techno Solutions ने बेंगलुरु में एक नई शाखा के साथ अपने संचालन का विस्तार किया।", readMore: "दस्तावेज़ पढ़ें" },
  mr: { title: "न्यूजरूम", subtitle: "नवीनतम घोषणा", press: "प्रेस रिलीज", share: "शेअर करा", print: "प्रिंट करा", news1Title: "AstroSafe प्लॅटफॉर्म लाँच", news1Desc: "AstroSafe ने अधिकृतपणे आपली सुरक्षा साधने लोकांसाठी लाँच केली.", news2Title: "बेंगळुरू कार्यालयाचा विस्तार", news2Desc: "AnyAstro Techno Solutions ने बेंगळुरूमध्ये नवीन शाखेसह आपल्या ऑपरेशन्सचा विस्तार केला.", readMore: "दस्तऐवज वाचा" },
  ta: { title: "செய்தி அறை", subtitle: "சமீபத்திய அறிவிப்புகள்", press: "பத்திரிகை வெளியீடு", share: "பகிரவும்", print: "அச்சிடு", news1Title: "AstroSafe தளத்தின் வெளியீடு", news1Desc: "AstroSafe அதிகாரப்பூர்வமாக தனது பாதுகாப்பு கருவிகளை பொதுமக்களுக்கு வெளியிடுகிறது.", news2Title: "பெங்களூரு அலுவலக விரிவாக்கம்", news2Desc: "AnyAstro Techno Solutions பெங்களூரில் புதிய கிளையுடன் தனது செயல்பாடுகளை விரிவுபடுத்துகிறது.", readMore: "ஆவணத்தைப் படிக்கவும்" },
  te: { title: "న్యూస్‌రూమ్", subtitle: "తాజా ప్రకటనలు", press: "పత్రికా ప్రకటన", share: "భాగస్వామ్యం చేయండి", print: "ముద్రించండి", news1Title: "AstroSafe ప్లాట్‌ఫారమ్ ప్రారంభం", news1Desc: "AstroSafe అధికారికంగా తన భద్రతా సాధనాలను ప్రజలకు ప్రారంభించింది.", news2Title: "బెంగళూరు కార్యాలయ విస్తరణ", news2Desc: "AnyAstro Techno Solutions బెంగళూరులో కొత్త శాఖతో తన కార్యకలాపాలను విస్తరించింది.", readMore: "పత్రాన్ని చదవండి" },
  kn: { title: "ನ್ಯೂಸ್‌ರೂಮ್", subtitle: "ಇತ್ತೀಚಿನ ಪ್ರಕಟಣೆಗಳು", press: "ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆ", share: "ಹಂಚಿಕೊಳ್ಳಿ", print: "ಮುದ್ರಿಸಿ", news1Title: "AstroSafe ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಪ್ರಾರಂಭ", news1Desc: "AstroSafe ಅಧಿಕೃತವಾಗಿ ತನ್ನ ಭದ್ರತಾ ಸಾಧನಗಳನ್ನು ಸಾರ್ವಜನಿಕರಿಗೆ ಪ್ರಾರಂಭಿಸಿದೆ.", news2Title: "ಬೆಂಗಳೂರು ಕಚೇರಿ ವಿಸ್ತರಣೆ", news2Desc: "AnyAstro Techno Solutions ಬೆಂಗಳೂರಿನಲ್ಲಿ ಹೊಸ ಶಾಖೆಯೊಂದಿಗೆ ತನ್ನ ಕಾರ್ಯಾಚರಣೆಯನ್ನು ವಿಸ್ತರಿಸಿದೆ.", readMore: "ಡಾಕ್ಯುಮೆಂಟ್ ಓದಿ" },
  bn: { title: "নিউজরুম", subtitle: "সর্বশেষ ঘোষণা", press: "প্রেস রিলিজ", share: "শেয়ার করুন", print: "প্রিন্ট করুন", news1Title: "AstroSafe প্ল্যাটফর্মের উদ্বোধন", news1Desc: "AstroSafe আনুষ্ঠানিকভাবে জনসাধারণের জন্য তার নিরাপত্তা সরঞ্জাম চালু করেছে।", news2Title: "বেঙ্গালুরু অফিস সম্প্রসারণ", news2Desc: "AnyAstro Techno Solutions বেঙ্গালুরুতে একটি নতুন শাখার সাথে তার কার্যক্রম সম্প্রসারণ করেছে।", readMore: "নথি পড়ুন" },
  gu: { title: "ન્યૂઝરૂમ", subtitle: "નવીનતમ ઘોષણાઓ", press: "પ્રેસ રિલીઝ", share: "શેર કરો", print: "છાપો", news1Title: "AstroSafe પ્લેટફોર્મ લોંચ", news1Desc: "AstroSafe સત્તાવાર રીતે તેના સુરક્ષા સાધનો લોકો માટે લોન્ચ કરે છે.", news2Title: "બેંગલુરુ ઓફિસ વિસ્તરણ", news2Desc: "AnyAstro Techno Solutions બેંગલુરુમાં નવી શાખા સાથે તેની કામગીરી વિસ્તૃત કરે છે.", readMore: "દસ્તાવેજ વાંચો" },
  pa: { title: "ਨਿਊਜ਼ਰੂਮ", subtitle: "ਨਵੀਨਤਮ ਘੋਸ਼ਣਾਵਾਂ", press: "ਪ੍ਰੈਸ ਰਿਲੀਜ਼", share: "ਸਾਂਝਾ ਕਰੋ", print: "ਛਾਪੋ", news1Title: "AstroSafe ਪਲੇਟਫਾਰਮ ਲਾਂਚ", news1Desc: "AstroSafe ਨੇ ਅਧਿਕਾਰਤ ਤੌਰ 'ਤੇ ਆਪਣੇ ਸੁਰੱਖਿਆ ਸਾਧਨ ਲੋਕਾਂ ਲਈ ਲਾਂਚ ਕੀਤੇ।", news2Title: "ਬੈਂਗਲੁਰੂ ਦਫਤਰ ਦਾ ਵਿਸਥਾਰ", news2Desc: "AnyAstro Techno Solutions ਨੇ ਬੈਂਗਲੁਰੂ ਵਿੱਚ ਇੱਕ ਨਵੀਂ ਸ਼ਾਖਾ ਦੇ ਨਾਲ ਆਪਣੇ ਕਾਰਜਾਂ ਦਾ ਵਿਸਥਾਰ ਕੀਤਾ।", readMore: "ਦਸਤਾਵੇਜ਼ ਪੜ੍ਹੋ" },
  ml: { title: "ന്യൂസ്‌റൂം", subtitle: "ഏറ്റവും പുതിയ പ്രഖ്യാപനങ്ങൾ", press: "പത്രക്കുറിപ്പ്", share: "പങ്കിടുക", print: "പ്രിന്റ് ചെയ്യുക", news1Title: "AstroSafe പ്ലാറ്റ്‌ഫോം സമാരംഭം", news1Desc: "AstroSafe ഔദ്യോഗികമായി തങ്ങളുടെ സുരക്ഷാ ഉപകരണങ്ങൾ പൊതുജനങ്ങൾക്കായി പുറത്തിറക്കി.", news2Title: "ബെംഗളൂരു ഓഫീസ് വിപുലീകരണം", news2Desc: "AnyAstro Techno Solutions ബെംഗളൂരുവിൽ പുതിയ ശാഖയോടെ പ്രവർത്തനം വിപുലീകരിച്ചു.", readMore: "പ്രമാണം വായിക്കുക" },
  or: { title: "ନ୍ୟୁଜରୁମ୍", subtitle: "ସର୍ବଶେଷ ଘୋଷଣା", press: "ପ୍ରେସ୍ ରିଲିଜ୍", share: "ସେୟାର କରନ୍ତୁ", print: "ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ", news1Title: "AstroSafe ପ୍ଲାଟଫର୍ମ ଆରମ୍ଭ", news1Desc: "AstroSafe ଆନୁଷ୍ଠାନିକ ଭାବରେ ଏହାର ସୁରକ୍ଷା ଉପକରଣଗୁଡ଼ିକୁ ଜନସାଧାରଣଙ୍କ ପାଇଁ ଆରମ୍ଭ କରେ |", news2Title: "ବେଙ୍ଗାଲୁରୁ ଅଫିସ୍ ସମ୍ପ୍ରସାରଣ", news2Desc: "AnyAstro Techno Solutions ବେଙ୍ଗାଲୁରୁରେ ଏକ ନୂତନ ଶାଖା ସହିତ ଏହାର କାର୍ଯ୍ୟକଳାପକୁ ବିସ୍ତାର କରେ |", readMore: "ଡକ୍ୟୁମେଣ୍ଟ୍ ପଢନ୍ତୁ" },
  as: { title: "নিউজৰুম", subtitle: "শেহতীয়া ঘোষণাসমূহ", press: "প্ৰেছ ৰিলিজ", share: "শ্বেয়াৰ কৰক", print: "প্ৰিণ্ট কৰক", news1Title: "AstroSafe প্লেটফৰ্ম মুকলি", news1Desc: "AstroSafe-এ আনুষ্ঠানিকভাৱে নিজৰ সুৰক্ষা সঁজুলিসমূহ ৰাইজৰ বাবে মুকলি কৰিছে।", news2Title: "বেংগালুৰু কাৰ্যালয় সম্প্ৰসাৰণ", news2Desc: "AnyAstro Techno Solutions-এ বেংগালুৰুত এটা নতুন শাখাৰে নিজৰ কাৰ্যকলাপ সম্প্ৰসাৰণ কৰিছে।", readMore: "নথিপত্ৰ পঢ়ক" },
  ur: { title: "نیوز روم", subtitle: "تازہ ترین اعلانات", press: "پریس ریلیز", share: "شیئر کریں", print: "پرنٹ کریں", news1Title: "AstroSafe پلیٹ فارم کا آغاز", news1Desc: "AstroSafe نے باضابطہ طور پر اپنے سیکیورٹی ٹولز عوام کے لیے لانچ کر دیے۔", news2Title: "بنگلورو دفتر کی توسیع", news2Desc: "AnyAstro Techno Solutions نے بنگلورو میں ایک نئی برانچ کے ساتھ اپنے کام کو بڑھایا ہے۔", readMore: "دستاویز پڑھیں" },
  sa: { title: "वार्ता-कक्षः", subtitle: "नूतनाः उद्घोषणाः", press: "वृत्त-प्रकाशनम्", share: "विभजतु", print: "मुद्रयतु", news1Title: "AstroSafe-मञ्चस्य आरम्भः", news1Desc: "AstroSafe आधिकारिकरूपेण जनसामान्येभ्यः स्व-सुरक्षा-उपकरणानि आरभते।", news2Title: "बेङ्गलूरु-कार्यालयस्य विस्तारः", news2Desc: "AnyAstro Techno Solutions बेङ्गलूरु-नगरे नूतन-शाखया सह स्वकार्यं विस्तारयति।", readMore: "प्रलेखं पठतु" }
};

export default function Newsroom() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Real logic to display today's localized date
    const today = new Date();
    setCurrentDate(today.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.subtitle,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl space-y-12"
      >
        {/* Page Header with Real Functional Actions */}
        <div className="border-b border-[var(--border-strong)] pb-6 bg-[var(--surface)] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {content.title}
            </h1>
            <p className="mt-2 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm">
              {content.subtitle} | {currentDate}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleShare}
              className="px-6 py-3 bg-[var(--surface-secondary)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-xs flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              {content.share}
            </button>
            <button 
              onClick={handlePrint}
              className="px-6 py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-xs shadow-sm"
            >
              {content.print}
            </button>
          </div>
        </div>

        {/* Custom Animated Corporate Signal Artwork */}
        <div className="w-full bg-[var(--brand-black)] border border-[var(--border-strong)] p-12 overflow-hidden relative flex items-center justify-center min-h-[250px] shadow-sm">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(var(--border-strong) 1px, transparent 1px), linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          {/* Radiating Broadcast Signals */}
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className="absolute border border-[var(--brand-blue)] rounded-full w-24 h-24"
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
            className="absolute border border-[var(--brand-blue)] rounded-full w-24 h-24"
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 2 }}
            className="absolute border border-[var(--brand-blue)] rounded-full w-24 h-24"
          />

          {/* Central News Node */}
          <div className="relative z-10 w-16 h-16 bg-[var(--surface)] border-4 border-[var(--brand-blue)] rotate-45 flex items-center justify-center">
             <div className="w-6 h-6 bg-[var(--brand-white)]"></div>
          </div>
        </div>

        {/* News & Press Release Articles */}
        <div className="space-y-8">
          
          {/* Article 1 */}
          <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4 border-b lg:border-b-0 lg:border-r border-[var(--border)] pb-4 lg:pb-0 pr-4">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-[var(--brand-blue)] font-bold text-xs uppercase tracking-widest mb-4">
                {content.press}
              </span>
              <p className="font-mono text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">
                2026-10-15
              </p>
            </div>
            <div className="lg:w-3/4 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                {content.news1Title}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6 text-lg">
                {content.news1Desc}
              </p>
              <div>
                <button className="px-6 py-2 border-b-2 border-[var(--text-primary)] hover:border-[var(--brand-blue)] text-[var(--text-primary)] hover:text-[var(--brand-blue)] font-bold uppercase tracking-widest text-xs transition-colors">
                  {content.readMore}
                </button>
              </div>
            </div>
          </div>

          {/* Article 2 */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4 border-b lg:border-b-0 lg:border-r border-[var(--border)] pb-4 lg:pb-0 pr-4">
              <span className="inline-block px-3 py-1 bg-[var(--surface)] border border-[var(--border-strong)] text-[var(--text-primary)] font-bold text-xs uppercase tracking-widest mb-4">
                {content.press}
              </span>
              <p className="font-mono text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">
                2026-08-10
              </p>
            </div>
            <div className="lg:w-3/4 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                {content.news2Title}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6 text-lg">
                {content.news2Desc}
              </p>
              <div>
                <button className="px-6 py-2 border-b-2 border-[var(--text-primary)] hover:border-[var(--brand-blue)] text-[var(--text-primary)] hover:text-[var(--brand-blue)] font-bold uppercase tracking-widest text-xs transition-colors">
                  {content.readMore}
                </button>
              </div>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}