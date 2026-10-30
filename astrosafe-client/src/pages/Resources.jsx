import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "System Resources", subtitle: "Tools and Information", api: "System Instructions", apiDesc: "Rules for connecting to our platform.", status: "System Health", statusDesc: "Live check of our network servers.", changelog: "Release Notes", changelogDesc: "Recent updates and improvements.", community: "Community Help", communityDesc: "Connect with other users for support.", view: "Open Resource", online: "Network Online", offline: "Network Offline" },
  hi: { title: "सिस्टम संसाधन", subtitle: "उपकरण और जानकारी", api: "सिस्टम निर्देश", apiDesc: "हमारे प्लेटफॉर्म से जुड़ने के नियम।", status: "सिस्टम स्वास्थ्य", statusDesc: "हमारे नेटवर्क सर्वर की लाइव जांच।", changelog: "रिलीज़ नोट्स", changelogDesc: "हाल के अपडेट और सुधार।", community: "सामुदायिक मदद", communityDesc: "सहायता के लिए अन्य उपयोगकर्ताओं से जुड़ें।", view: "संसाधन खोलें", online: "नेटवर्क ऑनलाइन", offline: "नेटवर्क ऑफलाइन" },
  mr: { title: "सिस्टम संसाधने", subtitle: "साधने आणि माहिती", api: "सिस्टम सूचना", apiDesc: "आमच्या प्लॅटफॉर्मशी कनेक्ट होण्याचे नियम.", status: "सिस्टम आरोग्य", statusDesc: "आमच्या नेटवर्क सर्व्हरची थेट तपासणी.", changelog: "रिलीझ नोट्स", changelogDesc: "अलीकडील अद्यतने आणि सुधारणा.", community: "सामुदायिक मदत", communityDesc: "मदतीसाठी इतर वापरकर्त्यांशी कनेक्ट व्हा.", view: "संसाधन उघडा", online: "नेटवर्क ऑनलाइन", offline: "नेटवर्क ऑफलाइन" },
  ta: { title: "கணினி ஆதாரங்கள்", subtitle: "கருவிகள் மற்றும் தகவல்கள்", api: "கணினி வழிமுறைகள்", apiDesc: "எங்கள் தளத்துடன் இணைப்பதற்கான விதிகள்.", status: "கணினி ஆரோக்கியம்", statusDesc: "எங்கள் நெட்வொர்க் சேவையகங்களின் நேரடி சோதனை.", changelog: "வெளியீட்டு குறிப்புகள்", changelogDesc: "சமீபத்திய புதுப்பிப்புகள் மற்றும் மேம்பாடுகள்.", community: "சமூக உதவி", communityDesc: "ஆதரவுக்காக மற்ற பயனர்களுடன் இணையுங்கள்.", view: "ஆதாரத்தைத் திற", online: "நெட்வொர்க் ஆன்லைன்", offline: "நெட்வொர்க் ஆஃப்லைன்" },
  te: { title: "సిస్టమ్ వనరులు", subtitle: "సాధనాలు మరియు సమాచారం", api: "సిస్టమ్ సూచనలు", apiDesc: "మా ప్లాట్‌ఫారమ్‌కు కనెక్ట్ చేయడానికి నియమాలు.", status: "సిస్టమ్ ఆరోగ్యం", statusDesc: "మా నెట్‌వర్క్ సర్వర్‌ల ప్రత్యక్ష తనిఖీ.", changelog: "విడుదల గమనికలు", changelogDesc: "ఇటీవలి నవీకరణలు మరియు మెరుగుదలలు.", community: "సంఘం సహాయం", communityDesc: "మద్దతు కోసం ఇతర వినియోగదారులతో కనెక్ట్ అవ్వండి.", view: "వనరును తెరవండి", online: "నెట్‌వర్క్ ఆన్‌లైన్", offline: "నెట్‌వర్క్ ఆఫ్‌లైన్" },
  kn: { title: "ಸಿಸ್ಟಮ್ ಸಂಪನ್ಮೂಲಗಳು", subtitle: "ಪರಿಕರಗಳು ಮತ್ತು ಮಾಹಿತಿ", api: "ಸಿಸ್ಟಮ್ ಸೂಚನೆಗಳು", apiDesc: "ನಮ್ಮ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗೆ ಸಂಪರ್ಕಿಸುವ ನಿಯಮಗಳು.", status: "ಸಿಸ್ಟಮ್ ಆರೋಗ್ಯ", statusDesc: "ನಮ್ಮ ನೆಟ್‌ವರ್ಕ್ ಸರ್ವರ್‌ಗಳ ಲೈವ್ ಪರಿಶೀಲನೆ.", changelog: "ಬಿಡುಗಡೆ ಟಿಪ್ಪಣಿಗಳು", changelogDesc: "ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳು ಮತ್ತು ಸುಧಾರಣೆಗಳು.", community: "ಸಮುದಾಯ ಸಹಾಯ", communityDesc: "ಬೆಂಬಲಕ್ಕಾಗಿ ಇತರ ಬಳಕೆದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.", view: "ಸಂಪನ್ಮೂಲವನ್ನು ತೆರೆಯಿರಿ", online: "ನೆಟ್‌ವರ್ಕ್ ಆನ್‌ಲೈನ್", offline: "ನೆಟ್‌ವರ್ಕ್ ಆಫ್‌ಲೈನ್" },
  bn: { title: "সিস্টেম সম্পদ", subtitle: "সরঞ্জাম এবং তথ্য", api: "সিস্টেম নির্দেশাবলী", apiDesc: "আমাদের প্ল্যাটফর্মের সাথে সংযোগ করার নিয়ম।", status: "সিস্টেম স্বাস্থ্য", statusDesc: "আমাদের নেটওয়ার্ক সার্ভারের লাইভ চেক।", changelog: "রিলিজ নোট", changelogDesc: "সাম্প্রতিক আপডেট এবং উন্নতি।", community: "সম্প্রদায় সহায়তা", communityDesc: "সমর্থনের জন্য অন্যান্য ব্যবহারকারীদের সাথে সংযোগ করুন।", view: "সম্পদ খুলুন", online: "নেটওয়ার্ক অনলাইন", offline: "নেটওয়ার্ক অফলাইন" },
  gu: { title: "સિસ્ટમ સંસાધનો", subtitle: "સાધનો અને માહિતી", api: "સિસ્ટમ સૂચનાઓ", apiDesc: "અમારા પ્લેટફોર્મ સાથે જોડાવા માટેના નિયમો.", status: "સિસ્ટમ આરોગ્ય", statusDesc: "અમારા નેટવર્ક સર્વર્સની લાઇવ તપાસ.", changelog: "પ્રકાશન નોંધો", changelogDesc: "તાજેતરના અપડેટ્સ અને સુધારાઓ.", community: "સમુદાય સહાય", communityDesc: "આધાર માટે અન્ય વપરાશકર્તાઓ સાથે જોડાઓ.", view: "સંસાધન ખોલો", online: "નેટવર્ક ઓનલાઇન", offline: "નેટવર્ક ઓફલાઇન" },
  pa: { title: "ਸਿਸਟਮ ਸਰੋਤ", subtitle: "ਟੂਲ ਅਤੇ ਜਾਣਕਾਰੀ", api: "ਸਿਸਟਮ ਨਿਰਦੇਸ਼", apiDesc: "ਸਾਡੇ ਪਲੇਟਫਾਰਮ ਨਾਲ ਜੁੜਨ ਲਈ ਨਿਯਮ।", status: "ਸਿਸਟਮ ਸਿਹਤ", statusDesc: "ਸਾਡੇ ਨੈੱਟਵਰਕ ਸਰਵਰਾਂ ਦੀ ਲਾਈਵ ਜਾਂਚ।", changelog: "ਰੀਲੀਜ਼ ਨੋਟਸ", changelogDesc: "ਹਾਲੀਆ ਅੱਪਡੇਟ ਅਤੇ ਸੁਧਾਰ।", community: "ਭਾਈਚਾਰਕ ਮਦਦ", communityDesc: "ਸਹਾਇਤਾ ਲਈ ਹੋਰ ਉਪਭੋਗਤਾਵਾਂ ਨਾਲ ਜੁੜੋ।", view: "ਸਰੋਤ ਖੋਲ੍ਹੋ", online: "ਨੈੱਟਵਰਕ ਆਨਲਾਈਨ", offline: "ਨੈੱਟਵਰਕ ਆਫਲਾਈਨ" },
  ml: { title: "സിസ്റ്റം ഉറവിടങ്ങൾ", subtitle: "ഉപകരണങ്ങളും വിവരങ്ങളും", api: "സിസ്റ്റം നിർദ്ദേശങ്ങൾ", apiDesc: "ഞങ്ങളുടെ പ്ലാറ്റ്‌ഫോമിലേക്ക് കണക്റ്റുചെയ്യുന്നതിനുള്ള നിയമങ്ങൾ.", status: "സിസ്റ്റം ആരോഗ്യം", statusDesc: "ഞങ്ങളുടെ നെറ്റ്‌വർക്ക് സെർവറുകളുടെ തത്സമയ പരിശോധന.", changelog: "റിലീസ് കുറിപ്പുകൾ", changelogDesc: "സമീപകാല അപ്‌ഡേറ്റുകളും മെച്ചപ്പെടുത്തലുകളും.", community: "കമ്മ്യൂണിറ്റി സഹായം", communityDesc: "പിന്തുണയ്ക്കായി മറ്റ് ഉപയോക്താക്കളുമായി ബന്ധപ്പെടുക.", view: "ഉറവിടം തുറക്കുക", online: "നെറ്റ്‌വർക്ക് ഓൺലൈൻ", offline: "നെറ്റ്‌വർക്ക് ഓഫ്‌ലൈൻ" },
  or: { title: "ସିଷ୍ଟମ୍ ଉତ୍ସଗୁଡ଼ିକ", subtitle: "ଉପକରଣ ଏବଂ ସୂଚନା", api: "ସିଷ୍ଟମ୍ ନିର୍ଦ୍ଦେଶାବଳୀ", apiDesc: "ଆମର ପ୍ଲାଟଫର୍ମ ସହିତ ସଂଯୋଗ କରିବା ପାଇଁ ନିୟମ |", status: "ସିଷ୍ଟମ୍ ସ୍ୱାସ୍ଥ୍ୟ", statusDesc: "ଆମର ନେଟୱାର୍କ ସର୍ଭରଗୁଡ଼ିକର ଲାଇଭ୍ ଯାଞ୍ଚ |", changelog: "ରିଲିଜ୍ ନୋଟ୍", changelogDesc: "ସାମ୍ପ୍ରତିକ ଅପଡେଟ୍ ଏବଂ ଉନ୍ନତି |", community: "ସମ୍ପ୍ରଦାୟ ସାହାଯ୍ୟ", communityDesc: "ସମର୍ଥନ ପାଇଁ ଅନ୍ୟ ଉପଯୋଗକର୍ତ୍ତାଙ୍କ ସହିତ ସଂଯୋଗ କରନ୍ତୁ |", view: "ଉତ୍ସ ଖୋଲନ୍ତୁ", online: "ନେଟୱାର୍କ ଅନଲାଇନ୍", offline: "ନେଟୱାର୍କ ଅଫଲାଇନ୍" },
  as: { title: "চিষ্টেম সম্পদসমূহ", subtitle: "সঁজুলি আৰু তথ্য", api: "চিষ্টেম নিৰ্দেশনাসমূহ", apiDesc: "আমাৰ প্লেটফৰ্মৰ সৈতে সংযোগ কৰাৰ নিয়ম।", status: "চিষ্টেমৰ স্বাস্থ্য", statusDesc: "আমাৰ নেটৱৰ্ক চাৰ্ভাৰসমূহৰ লাইভ পৰীক্ষা।", changelog: "ৰিলিজ টোকা", changelogDesc: "শেহতীয়া আপডেট আৰু উন্নতিসমূহ।", community: "সম্প্ৰদায়ৰ সহায়", communityDesc: "সমৰ্থনৰ বাবে আন ব্যৱহাৰকাৰীসকলৰ সৈতে সংযোগ কৰক।", view: "সম্পদ খোলক", online: "নেটৱৰ্ক অনলাইন", offline: "নেটৱৰ্ক অফলাইন" },
  ur: { title: "سسٹم کے وسائل", subtitle: "ٹولز اور معلومات", api: "سسٹم کی ہدایات", apiDesc: "ہمارے پلیٹ فارم سے جڑنے کے اصول۔", status: "سسٹم کی صحت", statusDesc: "ہمارے نیٹ ورک سرورز کی لائیو جانچ۔", changelog: "ریلیز نوٹس", changelogDesc: "حالیہ اپ ڈیٹس اور بہتری۔", community: "کمیونٹی کی مدد", communityDesc: "مدد کے لیے دوسرے صارفین سے جڑیں۔", view: "وسیلہ کھولیں", online: "نیٹ ورک آن لائن", offline: "نیٹ ورک آف لائن" },
  sa: { title: "तन्त्र-संसाधनानि", subtitle: "उपकरणानि सूचना च", api: "तन्त्र-निर्देशाः", apiDesc: "अस्माकं मञ्चेन सह सम्पर्कस्य नियमाः।", status: "तन्त्र-स्वास्थ्यम्", statusDesc: "अस्माकं जालबन्ध-सेवकानां सजीव-परीक्षणम्।", changelog: "मोचन-टिप्पण्यः", changelogDesc: "नूतनानि नवीकरणानि सुधारणानि च।", community: "सामुदायिक-सहायता", communityDesc: "सहायतायै अन्य-उपयोक्तृभिः सह सम्पर्कं कुर्वन्तु।", view: "संसाधनम् उद्घाटयतु", online: "जालबन्धः सजीवः", offline: "जालबन्धः निर्जीवः" }
};

export default function Resources() {
  const { language = 'en' } = useTheme();
  const navigate = useNavigate();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Real functional check of current network state
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
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
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--border-strong)] pb-6 bg-[var(--surface)] p-8 shadow-sm gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {content.title}
            </h1>
            <p className="mt-2 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm">
              {content.subtitle}
            </p>
          </div>
          
          {/* Live Network Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 border border-[var(--border-strong)] bg-[var(--surface-secondary)]">
            <div className={`w-3 h-3 ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest">
              {isOnline ? content.online : content.offline}
            </span>
          </div>
        </div>

        {/* Resources Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* System Instructions / API */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-12 h-12 bg-[var(--brand-blue)] mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-[var(--brand-white)]"></div>
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                {content.api}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6">
                {content.apiDesc}
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/api-reference')}
              className="w-full py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-sm"
            >
              {content.view}
            </button>
          </div>

          {/* System Health / Status */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-12 h-12 bg-[var(--text-primary)] mb-6 flex items-center justify-center">
                 <div className="w-6 h-6 bg-[var(--background)] rounded-full"></div>
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                {content.status}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6">
                {content.statusDesc}
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/system-status')}
              className="w-full py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-sm"
            >
              {content.view}
            </button>
          </div>

          {/* Release Notes / Changelog */}
          <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-12 h-12 bg-[var(--brand-white)] mb-6 flex items-center justify-center">
                <div className="w-6 h-2 bg-[var(--brand-black)]"></div>
              </div>
              <h2 className="text-xl font-bold text-[var(--brand-white)] uppercase tracking-wider mb-2">
                {content.changelog}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6">
                {content.changelogDesc}
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/changelog')}
              className="w-full py-3 bg-[var(--brand-white)] hover:bg-[var(--surface-hover)] text-[var(--brand-black)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold transition-all uppercase tracking-widest text-sm"
            >
              {content.view}
            </button>
          </div>

          {/* Community Help */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-12 h-12 bg-[var(--border-strong)] mb-6 flex gap-1 items-center justify-center p-2">
                 <div className="w-3 h-3 bg-[var(--text-primary)]"></div>
                 <div className="w-3 h-3 bg-[var(--text-primary)]"></div>
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                {content.community}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6">
                {content.communityDesc}
              </p>
            </div>
            <button 
              onClick={() => handleNavigate('/community')}
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