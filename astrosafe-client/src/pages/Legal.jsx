import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Legal Information", subtitle: "Business Rules and Compliance", print: "Print Document", termsTitle: "Terms of Service", termsDesc: "By using this system, you agree to our security checks. The system is provided as is for your protection.", privacyTitle: "Privacy Policy", privacyDesc: "We operate on a zero-trust model.", dataTitle: "Data Protection", dataDesc: "We do not collect, store, or share your personal data. All checks happen locally on your device.", updated: "Last Updated" },
  hi: { title: "कानूनी जानकारी", subtitle: "व्यावसायिक नियम और अनुपालन", print: "दस्तावेज़ प्रिंट करें", termsTitle: "सेवा की शर्तें", termsDesc: "इस सिस्टम का उपयोग करके, आप हमारी सुरक्षा जांच से सहमत हैं। सिस्टम आपकी सुरक्षा के लिए दिया गया है।", privacyTitle: "गोपनीयता नीति", privacyDesc: "हम शून्य-विश्वास मॉडल पर काम करते हैं।", dataTitle: "डेटा सुरक्षा", dataDesc: "हम आपका व्यक्तिगत डेटा एकत्र, संग्रहीत या साझा नहीं करते हैं। सभी जांच आपके डिवाइस पर होती हैं।", updated: "अंतिम अपडेट" },
  mr: { title: "कायदेशीर माहिती", subtitle: "व्यवसाय नियम आणि अनुपालन", print: "दस्तऐवज मुद्रित करा", termsTitle: "सेवेच्या अटी", termsDesc: "या सिस्टमचा वापर करून, तुम्ही आमच्या सुरक्षा तपासणीशी सहमत आहात. सिस्टम तुमच्या संरक्षणासाठी दिली आहे.", privacyTitle: "गोपनीयता धोरण", privacyDesc: "आम्ही शून्य-विश्वास मॉडेलवर काम करतो.", dataTitle: "डेटा संरक्षण", dataDesc: "आम्ही तुमचा वैयक्तिक डेटा संकलित, जतन किंवा सामायिक करत नाही. सर्व तपासण्या तुमच्या डिव्हाइसवर होतात.", updated: "अंतिम अद्यतन" },
  ta: { title: "சட்ட தகவல்கள்", subtitle: "வணிக விதிகள் மற்றும் இணக்கம்", print: "ஆவணத்தை அச்சிடு", termsTitle: "சேவை விதிமுறைகள்", termsDesc: "இந்த அமைப்பைப் பயன்படுத்துவதன் மூலம், எங்கள் பாதுகாப்பு சோதனைகளை ஏற்கிறீர்கள். அமைப்பு உங்கள் பாதுகாப்பிற்காக வழங்கப்படுகிறது.", privacyTitle: "தனியுரிமை கொள்கை", privacyDesc: "நாங்கள் பூஜ்ஜிய நம்பிக்கை மாதிரியில் செயல்படுகிறோம்.", dataTitle: "தரவு பாதுகாப்பு", dataDesc: "நாங்கள் உங்கள் தனிப்பட்ட தரவை சேகரிக்கவோ, சேமிக்கவோ அல்லது பகிரவோ மாட்டோம். அனைத்து சோதனைகளும் உங்கள் சாதனத்தில் நடக்கின்றன.", updated: "கடைசியாக புதுப்பிக்கப்பட்டது" },
  te: { title: "చట్టపరమైన సమాచారం", subtitle: "వ్యాపార నియమాలు మరియు సమ్మతి", print: "పత్రాన్ని ముద్రించండి", termsTitle: "సేవా నిబంధనలు", termsDesc: "ఈ సిస్టమ్‌ను ఉపయోగించడం ద్వారా, మీరు మా భద్రతా తనిఖీలకు అంగీకరిస్తున్నారు. సిస్టమ్ మీ రక్షణ కోసం అందించబడింది.", privacyTitle: "గోప్యతా విధానం", privacyDesc: "మేము జీరో-ట్రస్ట్ మోడల్‌లో పనిచేస్తాము.", dataTitle: "డేటా రక్షణ", dataDesc: "మేము మీ వ్యక్తిగత డేటాను సేకరించము, నిల్వ చేయము లేదా భాగస్వామ్యం చేయము. అన్ని తనిఖీలు మీ పరికరంలో జరుగుతాయి.", updated: "చివరిగా నవీకరించబడింది" },
  kn: { title: "ಕಾನೂನು ಮಾಹಿತಿ", subtitle: "ವ್ಯಾಪಾರ ನಿಯಮಗಳು ಮತ್ತು ಅನುಸರಣೆ", print: "ಡಾಕ್ಯುಮೆಂಟ್ ಮುದ್ರಿಸಿ", termsTitle: "ಸೇವಾ ನಿಯಮಗಳು", termsDesc: "ಈ ಸಿಸ್ಟಮ್ ಅನ್ನು ಬಳಸುವ ಮೂಲಕ, ನಮ್ಮ ಭದ್ರತಾ ಪರಿಶೀಲನೆಗಳಿಗೆ ನೀವು ಸಮ್ಮತಿಸುತ್ತೀರಿ. ನಿಮ್ಮ ರಕ್ಷಣೆಗಾಗಿ ಸಿಸ್ಟಮ್ ಅನ್ನು ಒದಗಿಸಲಾಗಿದೆ.", privacyTitle: "ಗೌಪ್ಯತಾ ನೀತಿ", privacyDesc: "ನಾವು ಶೂನ್ಯ-ವಿಶ್ವಾಸಾರ್ಹ ಮಾದರಿಯಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತೇವೆ.", dataTitle: "ಡೇಟಾ ರಕ್ಷಣೆ", dataDesc: "ನಾವು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಡೇಟಾವನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ, ಉಳಿಸುವುದಿಲ್ಲ ಅಥವಾ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ. ಎಲ್ಲಾ ತಪಾಸಣೆಗಳು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ನಡೆಯುತ್ತವೆ.", updated: "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ" },
  bn: { title: "আইনি তথ্য", subtitle: "ব্যবসার নিয়ম এবং সম্মতি", print: "নথি প্রিন্ট করুন", termsTitle: "পরিষেবার শর্তাবলী", termsDesc: "এই সিস্টেমটি ব্যবহার করে, আপনি আমাদের নিরাপত্তা পরীক্ষার সাথে সম্মত হন। সিস্টেমটি আপনার সুরক্ষার জন্য প্রদান করা হয়েছে।", privacyTitle: "গোপনীয়তা নীতি", privacyDesc: "আমরা একটি জিরো-ট্রাস্ট মডেলে কাজ করি।", dataTitle: "ডেটা সুরক্ষা", dataDesc: "আমরা আপনার ব্যক্তিগত ডেটা সংগ্রহ, সংরক্ষণ বা ভাগ করি না। সমস্ত পরীক্ষা আপনার ডিভাইসে ঘটে।", updated: "সর্বশেষ আপডেট" },
  gu: { title: "કાનૂની માહિતી", subtitle: "વ્યાપાર નિયમો અને પાલન", print: "દસ્તાવેજ છાપો", termsTitle: "સેવાની શરતો", termsDesc: "આ સિસ્ટમનો ઉપયોગ કરીને, તમે અમારી સુરક્ષા તપાસ માટે સંમત થાઓ છો. સિસ્ટમ તમારી સુરક્ષા માટે પ્રદાન કરવામાં આવી છે.", privacyTitle: "ગોપનીયતા નીતિ", privacyDesc: "અમે શૂન્ય-વિશ્વાસ મોડેલ પર કાર્ય કરીએ છીએ.", dataTitle: "ડેટા સુરક્ષા", dataDesc: "અમે તમારો વ્યક્તિગત ડેટા એકત્રિત, સંગ્રહિત અથવા શેર કરતા નથી. બધી તપાસ તમારા ઉપકરણ પર થાય છે.", updated: "છેલ્લે અપડેટ કરેલ" },
  pa: { title: "ਕਾਨੂੰਨੀ ਜਾਣਕਾਰੀ", subtitle: "ਕਾਰੋਬਾਰੀ ਨਿਯਮ ਅਤੇ ਪਾਲਣਾ", print: "ਦਸਤਾਵੇਜ਼ ਛਾਪੋ", termsTitle: "ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ", termsDesc: "ਇਸ ਸਿਸਟਮ ਦੀ ਵਰਤੋਂ ਕਰਕੇ, ਤੁਸੀਂ ਸਾਡੀਆਂ ਸੁਰੱਖਿਆ ਜਾਂਚਾਂ ਨਾਲ ਸਹਿਮਤ ਹੁੰਦੇ ਹੋ। ਸਿਸਟਮ ਤੁਹਾਡੀ ਸੁਰੱਖਿਆ ਲਈ ਪ੍ਰਦਾਨ ਕੀਤਾ ਗਿਆ ਹੈ।", privacyTitle: "ਗੋਪਨੀਯਤਾ ਨੀਤੀ", privacyDesc: "ਅਸੀਂ ਜ਼ੀਰੋ-ਟਰੱਸਟ ਮਾਡਲ 'ਤੇ ਕੰਮ ਕਰਦੇ ਹਾਂ।", dataTitle: "ਡੇਟਾ ਸੁਰੱਖਿਆ", dataDesc: "ਅਸੀਂ ਤੁਹਾਡਾ ਨਿੱਜੀ ਡੇਟਾ ਇਕੱਠਾ, ਸਟੋਰ ਜਾਂ ਸਾਂਝਾ ਨਹੀਂ ਕਰਦੇ ਹਾਂ। ਸਾਰੀਆਂ ਜਾਂਚਾਂ ਤੁਹਾਡੀ ਡਿਵਾਈਸ 'ਤੇ ਹੁੰਦੀਆਂ ਹਨ।", updated: "ਆਖਰੀ ਅੱਪਡੇਟ" },
  ml: { title: "നിയമപരമായ വിവരങ്ങൾ", subtitle: "ബിസിനസ്സ് നിയമങ്ങളും പാലിക്കലും", print: "പ്രമാണം പ്രിന്റ് ചെയ്യുക", termsTitle: "സേവന നിബന്ധനകൾ", termsDesc: "ഈ സിസ്റ്റം ഉപയോഗിക്കുന്നതിലൂടെ, ഞങ്ങളുടെ സുരക്ഷാ പരിശോധനകൾ നിങ്ങൾ അംഗീകരിക്കുന്നു. നിങ്ങളുടെ സംരക്ഷണത്തിനായാണ് സിസ്റ്റം നൽകിയിരിക്കുന്നത്.", privacyTitle: "സ്വകാര്യതാ നയം", privacyDesc: "ഞങ്ങൾ ഒരു സീറോ-ട്രസ്റ്റ് മോഡലിലാണ് പ്രവർത്തിക്കുന്നത്.", dataTitle: "ഡാറ്റ സംരക്ഷണം", dataDesc: "ഞങ്ങൾ നിങ്ങളുടെ വ്യക്തിഗത ഡാറ്റ ശേഖരിക്കുകയോ സംഭരിക്കുകയോ പങ്കിടുകയോ ചെയ്യുന്നില്ല. എല്ലാ പരിശോധനകളും നിങ്ങളുടെ ഉപകരണത്തിൽ നടക്കുന്നു.", updated: "അവസാനം അപ്ഡേറ്റ് ചെയ്തത്" },
  or: { title: "ଆଇନଗତ ସୂଚନା", subtitle: "ବ୍ୟବସାୟ ନିୟମ ଏବଂ ଅନୁପାଳନ", print: "ଡକ୍ୟୁମେଣ୍ଟ ପ୍ରିଣ୍ଟ କରନ୍ତୁ", termsTitle: "ସେବା ସର୍ତ୍ତାବଳୀ", termsDesc: "ଏହି ସିଷ୍ଟମ୍ ବ୍ୟବହାର କରି, ଆପଣ ଆମର ସୁରକ୍ଷା ଯାଞ୍ଚରେ ସମ୍ମତ ଅଟନ୍ତି | ଆପଣଙ୍କ ସୁରକ୍ଷା ପାଇଁ ସିଷ୍ଟମ୍ ପ୍ରଦାନ କରାଯାଇଛି |", privacyTitle: "ଗୋପନୀୟତା ନୀତି", privacyDesc: "ଆମେ ଏକ ଜିରୋ-ଟ୍ରଷ୍ଟ୍ ମଡେଲରେ କାର୍ଯ୍ୟ କରୁ |", dataTitle: "ଡାଟା ସୁରକ୍ଷା", dataDesc: "ଆମେ ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ ଡାଟା ସଂଗ୍ରହ, ସଂରକ୍ଷଣ କିମ୍ବା ସେୟାର କରୁନାହୁଁ | ସମସ୍ତ ଯାଞ୍ଚ ଆପଣଙ୍କ ଡିଭାଇସରେ ହୋଇଥାଏ |", updated: "ଶେଷ ଅପଡେଟ୍" },
  as: { title: "আইনী তথ্য", subtitle: "ব্যৱসায়িক নিয়ম আৰু অনুপালন", print: "নথিপত্ৰ প্ৰিণ্ট কৰক", termsTitle: "সেৱাৰ চৰ্তাৱলী", termsDesc: "এই চিষ্টেমটো ব্যৱহাৰ কৰি, আপুনি আমাৰ সুৰক্ষা পৰীক্ষাত সন্মত হৈছে। আপোনাৰ সুৰক্ষাৰ বাবে চিষ্টেমটো প্ৰদান কৰা হৈছে।", privacyTitle: "গোপনীয়তা নীতি", privacyDesc: "আমি এটা জিৰো-ট্ৰাষ্ট আৰ্হিত কাম কৰোঁ।", dataTitle: "ডাটা সুৰক্ষা", dataDesc: "আমি আপোনাৰ ব্যক্তিগত ডাটা সংগ্ৰহ, সংৰক্ষণ বা ভাগ-বতৰা নকৰোঁ। সকলো পৰীক্ষা আপোনাৰ ডিভাইচত হয়।", updated: "অন্তিম আপডেট" },
  ur: { title: "قانونی معلومات", subtitle: "کاروباری اصول اور تعمیل", print: "دستاویز پرنٹ کریں", termsTitle: "سروس کی شرائط", termsDesc: "اس سسٹم کا استعمال کرکے، آپ ہماری سیکیورٹی چیکس سے اتفاق کرتے ہیں۔ یہ سسٹم آپ کے تحفظ کے لیے فراہم کیا گیا ہے۔", privacyTitle: "پرائیویسی پالیسی", privacyDesc: "ہم زیرو ٹرسٹ ماڈل پر کام کرتے ہیں۔", dataTitle: "ڈیٹا کا تحفظ", dataDesc: "ہم آپ کا ذاتی ڈیٹا اکٹھا، محفوظ یا شیئر نہیں کرتے ہیں۔ تمام چیک آپ کے ڈیوائس پر ہوتے ہیں۔", updated: "آخری اپ ڈیٹ" },
  sa: { title: "वैधानिक-सूचना", subtitle: "व्यापार-नियमाः अनुपालनं च", print: "प्रलेखं मुद्रयतु", termsTitle: "सेवा-नियमाः", termsDesc: "अस्य तन्त्रस्य उपयोगेन, भवान् अस्माकं सुरक्षा-परीक्षणैः सह सहमतः अस्ति। तन्त्रं भवतः रक्षणाय प्रदीयते।", privacyTitle: "गोपनीयता-नीतिः", privacyDesc: "वयं शून्य-विश्वास-प्रतिमाने कार्यं कुर्मः।", dataTitle: "दत्तांश-रक्षणम्", dataDesc: "वयं भवतः व्यक्तिगत-दत्तांशं न सङ्गृह्णीमः, न सञ्चिनुमः, न वा विभजामः। सर्वाणि परीक्षणानि भवतः यन्त्रे एव भवन्ति।", updated: "अन्तिम-नवीकरणम्" }
};

export default function Legal() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Real logic to dynamically display the document access time
    const today = new Date();
    setCurrentDate(today.toLocaleDateString());
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
        {/* Page Header with Print Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-strong)] pb-6 bg-[var(--surface)] p-8 shadow-sm gap-4">
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
            className="px-6 py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] font-bold shadow-sm transition-all border border-transparent hover:border-[var(--border-strong)] whitespace-nowrap uppercase tracking-widest text-sm"
          >
            {content.print}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Terms of Service Section */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[var(--brand-blue)] flex-shrink-0"></div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {content.termsTitle}
              </h2>
            </div>
            <div className="prose prose-sm dark:prose-invert text-[var(--text-secondary)] font-medium leading-relaxed">
              <p>
                {content.termsDesc}
              </p>
            </div>
          </div>

          {/* Privacy & Data Protection Section */}
          <div className="space-y-8">
            <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 border-b border-[var(--border)] pb-2">
                {content.privacyTitle}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                {content.privacyDesc}
              </p>
            </div>

            <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[var(--brand-white)] uppercase tracking-wider mb-4 border-b border-[var(--border-strong)] pb-2">
                {content.dataTitle}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                {content.dataDesc}
              </p>
            </div>
          </div>

        </div>

        {/* Footer Meta Data */}
        <div className="pt-4 border-t border-[var(--border-strong)] flex justify-end">
          <span className="text-xs font-mono text-[var(--text-muted)] font-bold uppercase tracking-widest bg-[var(--surface)] px-4 py-2 border border-[var(--border)]">
            {content.updated}: {currentDate}
          </span>
        </div>

      </motion.div>
    </div>
  );
}