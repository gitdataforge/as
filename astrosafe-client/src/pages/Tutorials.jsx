import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "System Guides", subtitle: "Learn to Protect Your Device", tut1Title: "Check Network Address", tut1Desc: "Click Start Test on the dashboard. The system will safely read and display your public network address without logging it.", tut2Title: "Find Privacy Leaks", tut2Desc: "Open the Network Privacy tool. The system will check if your hidden routing addresses are leaking to unauthorized websites.", tut3Title: "Check Device Signature", tut3Desc: "Open the Device Identity tool. The system calculates the exact visual signature advertising networks use to track you.", stepLabel: "Guide", openBtn: "Read", runBtn: "Open Tool" },
  hi: { title: "सिस्टम गाइड", subtitle: "अपने डिवाइस की सुरक्षा करना सीखें", tut1Title: "नेटवर्क पता जांचें", tut1Desc: "डैशबोर्ड पर स्टार्ट टेस्ट पर क्लिक करें। सिस्टम सुरक्षित रूप से आपका सार्वजनिक नेटवर्क पता दिखाएगा।", tut2Title: "गोपनीयता लीक खोजें", tut2Desc: "नेटवर्क गोपनीयता टूल खोलें। सिस्टम जांच करेगा कि क्या आपके छिपे हुए पते लीक हो रहे हैं।", tut3Title: "डिवाइस हस्ताक्षर जांचें", tut3Desc: "डिवाइस पहचान टूल खोलें। सिस्टम उस सटीक हस्ताक्षर की गणना करता है जिसका उपयोग वेबसाइटें आपको ट्रैक करने के लिए करती हैं।", stepLabel: "गाइड", openBtn: "पढ़ें", runBtn: "टूल खोलें" },
  mr: { title: "सिस्टम मार्गदर्शक", subtitle: "तुमचे डिव्हाइस सुरक्षित करायला शिका", tut1Title: "नेटवर्क पत्ता तपासा", tut1Desc: "डॅशबोर्डवर स्टार्ट टेस्ट वर क्लिक करा. सिस्टम सुरक्षितपणे तुमचा सार्वजनिक नेटवर्क पत्ता दाखवेल.", tut2Title: "गोपनीयता लीक शोधा", tut2Desc: "नेटवर्क गोपनीयता टूल उघडा. तुमचे लपलेले पत्ते लीक होत आहेत का ते सिस्टम तपासेल.", tut3Title: "डिव्हाइस स्वाक्षरी तपासा", tut3Desc: "डिव्हाइस ओळख टूल उघडा. वेबसाइट तुम्हाला ट्रॅक करण्यासाठी वापरत असलेल्या अचूक स्वाक्षरीची सिस्टम गणना करते.", stepLabel: "मार्गदर्शक", openBtn: "वाचा", runBtn: "टूल उघडा" },
  ta: { title: "கணினி வழிகாட்டிகள்", subtitle: "உங்கள் சாதனத்தை எவ்வாறு பாதுகாப்பது என்பதை அறிக", tut1Title: "நெட்வொர்க் முகவரியைச் சரிபார்க்கவும்", tut1Desc: "சோதனையைத் தொடங்கு என்பதைக் கிளிக் செய்யவும். கணினி பாதுகாப்பாக உங்கள் பொது நெட்வொர்க் முகவரியைக் காண்பிக்கும்.", tut2Title: "தனியுரிமை கசிவுகளைக் கண்டறியவும்", tut2Desc: "தனியுரிமை கருவியைத் திறக்கவும். உங்கள் மறைக்கப்பட்ட முகவரிகள் கசிகிறதா என்பதை கணினி சரிபார்க்கும்.", tut3Title: "சாதன கையொப்பத்தை சரிபார்க்கவும்", tut3Desc: "அடையாள கருவியைத் திறக்கவும். வலைத்தளங்கள் உங்களைக் கண்காணிக்கப் பயன்படுத்தும் சரியான கையொப்பத்தை கணினி கணக்கிடுகிறது.", stepLabel: "வழிகாட்டி", openBtn: "படிக்க", runBtn: "கருவியைத் திற" },
  te: { title: "సిస్టమ్ గైడ్‌లు", subtitle: "మీ పరికరాన్ని రక్షించడం నేర్చుకోండి", tut1Title: "నెట్‌వర్క్ చిరునామాను తనిఖీ చేయండి", tut1Desc: "పరీక్షను ప్రారంభించు క్లిక్ చేయండి. సిస్టమ్ సురక్షితంగా మీ పబ్లిక్ నెట్‌వర్క్ చిరునామాను చూపుతుంది.", tut2Title: "గోప్యతా లీక్‌లను కనుగొనండి", tut2Desc: "గోప్యతా సాధనాన్ని తెరవండి. మీ దాచిన చిరునామాలు లీక్ అవుతున్నాయో లేదో సిస్టమ్ తనిఖీ చేస్తుంది.", tut3Title: "పరికర సంతకాన్ని తనిఖీ చేయండి", tut3Desc: "గుర్తింపు సాధనాన్ని తెరవండి. వెబ్‌సైట్‌లు మిమ్మల్ని ట్రాక్ చేయడానికి ఉపయోగించే ఖచ్చితమైన సంతకాన్ని సిస్టమ్ లెక్కిస్తుంది.", stepLabel: "గైడ్", openBtn: "చదవండి", runBtn: "సాధనాన్ని తెరవండి" },
  kn: { title: "ಸಿಸ್ಟಮ್ ಮಾರ್ಗದರ್ಶಿಗಳು", subtitle: "ನಿಮ್ಮ ಸಾಧನವನ್ನು ರಕ್ಷಿಸಲು ಕಲಿಯಿರಿ", tut1Title: "ನೆಟ್‌ವರ್ಕ್ ವಿಳಾಸವನ್ನು ಪರಿಶೀಲಿಸಿ", tut1Desc: "ಪರೀಕ್ಷೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ ಕ್ಲಿಕ್ ಮಾಡಿ. ಸಿಸ್ಟಮ್ ಸುರಕ್ಷಿತವಾಗಿ ನಿಮ್ಮ ಸಾರ್ವಜನಿಕ ನೆಟ್‌ವರ್ಕ್ ವಿಳಾಸವನ್ನು ತೋರಿಸುತ್ತದೆ.", tut2Title: "ಗೌಪ್ಯತೆ ಸೋರಿಕೆಗಳನ್ನು ಹುಡುಕಿ", tut2Desc: "ಗೌಪ್ಯತೆ ಸಾಧನವನ್ನು ತೆರೆಯಿರಿ. ನಿಮ್ಮ ಗುಪ್ತ ವಿಳಾಸಗಳು ಸೋರಿಕೆಯಾಗುತ್ತಿವೆಯೇ ಎಂದು ಸಿಸ್ಟಮ್ ಪರಿಶೀಲಿಸುತ್ತದೆ.", tut3Title: "ಸಾಧನದ ಸಹಿಯನ್ನು ಪರಿಶೀಲಿಸಿ", tut3Desc: "ಗುರುತಿನ ಸಾಧನವನ್ನು ತೆರೆಯಿರಿ. ವೆಬ್‌ಸೈಟ್‌ಗಳು ನಿಮ್ಮನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಬಳಸುವ ನಿಖರವಾದ ಸಹಿಯನ್ನು ಸಿಸ್ಟಮ್ ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ.", stepLabel: "ಮಾರ್ಗದರ್ಶಿ", openBtn: "ಓದಿ", runBtn: "ಸಾಧನವನ್ನು ತೆರೆಯಿರಿ" },
  bn: { title: "সিস্টেম গাইড", subtitle: "আপনার ডিভাইস রক্ষা করতে শিখুন", tut1Title: "নেটওয়ার্ক ঠিকানা চেক করুন", tut1Desc: "স্টার্ট টেস্ট এ ক্লিক করুন। সিস্টেম নিরাপদে আপনার পাবলিক নেটওয়ার্ক ঠিকানা দেখাবে।", tut2Title: "গোপনীয়তা লিক খুঁজুন", tut2Desc: "গোপনীয়তা টুল খুলুন। আপনার লুকানো ঠিকানা লিক হচ্ছে কিনা সিস্টেম তা পরীক্ষা করবে।", tut3Title: "ডিভাইস স্বাক্ষর চেক করুন", tut3Desc: "পরিচয় টুল খুলুন। ওয়েবসাইটগুলো আপনাকে ট্র্যাক করার জন্য যে স্বাক্ষর ব্যবহার করে তা সিস্টেম গণনা করে।", stepLabel: "গাইড", openBtn: "পড়ুন", runBtn: "টুল খুলুন" },
  gu: { title: "સિસ્ટમ માર્ગદર્શિકાઓ", subtitle: "તમારા ઉપકરણને સુરક્ષિત કરવાનું શીખો", tut1Title: "નેટવર્ક સરનામું તપાસો", tut1Desc: "સ્ટાર્ટ ટેસ્ટ પર ક્લિક કરો. સિસ્ટમ સુરક્ષિત રીતે તમારું સાર્વજનિક નેટવર્ક સરનામું બતાવશે.", tut2Title: "ગોપનીયતા લીક શોધો", tut2Desc: "ગોપનીયતા સાધન ખોલો. તમારા છુપાયેલા સરનામાં લીક થઈ રહ્યા છે કે કેમ તે સિસ્ટમ તપાસશે.", tut3Title: "ઉપકરણ હસ્તાક્ષર તપાસો", tut3Desc: "ઓળખ સાધન ખોલો. વેબસાઇટ્સ તમને ટ્રૅક કરવા માટે ઉપયોગ કરે છે તે ચોક્કસ હસ્તાક્ષરની સિસ્ટમ ગણતરી કરે છે.", stepLabel: "માર્ગદર્શિકા", openBtn: "વાંચો", runBtn: "સાધન ખોલો" },
  pa: { title: "ਸਿਸਟਮ ਗਾਈਡ", subtitle: "ਆਪਣੀ ਡਿਵਾਈਸ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰਨਾ ਸਿੱਖੋ", tut1Title: "ਨੈੱਟਵਰਕ ਪਤਾ ਚੈੱਕ ਕਰੋ", tut1Desc: "ਸਟਾਰਟ ਟੈਸਟ 'ਤੇ ਕਲਿੱਕ ਕਰੋ। ਸਿਸਟਮ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਤੁਹਾਡਾ ਜਨਤਕ ਨੈੱਟਵਰਕ ਪਤਾ ਦਿਖਾਏਗਾ।", tut2Title: "ਗੋਪਨੀਯਤਾ ਲੀਕ ਲੱਭੋ", tut2Desc: "ਗੋਪਨੀਯਤਾ ਟੂਲ ਖੋਲ੍ਹੋ। ਸਿਸਟਮ ਜਾਂਚ ਕਰੇਗਾ ਕਿ ਕੀ ਤੁਹਾਡੇ ਲੁਕਵੇਂ ਪਤੇ ਲੀਕ ਹੋ ਰਹੇ ਹਨ।", tut3Title: "ਡਿਵਾਈਸ ਦਸਤਖਤ ਚੈੱਕ ਕਰੋ", tut3Desc: "ਪਛਾਣ ਟੂਲ ਖੋਲ੍ਹੋ। ਵੈੱਬਸਾਈਟਾਂ ਤੁਹਾਨੂੰ ਟਰੈਕ ਕਰਨ ਲਈ ਵਰਤਦੀਆਂ ਹਨ, ਸਿਸਟਮ ਉਸ ਸਹੀ ਦਸਤਖਤ ਦੀ ਗਣਨਾ ਕਰਦਾ ਹੈ।", stepLabel: "ਗਾਈਡ", openBtn: "ਪੜ੍ਹੋ", runBtn: "ਟੂਲ ਖੋਲ੍ਹੋ" },
  ml: { title: "സിസ്റ്റം ഗൈഡുകൾ", subtitle: "നിങ്ങളുടെ ഉപകരണം എങ്ങനെ സംരക്ഷിക്കാമെന്ന് പഠിക്കുക", tut1Title: "നെറ്റ്‌വർക്ക് വിലാസം പരിശോധിക്കുക", tut1Desc: "സ്റ്റാർട്ട് ടെസ്റ്റിൽ ക്ലിക്ക് ചെയ്യുക. സിസ്റ്റം നിങ്ങളുടെ പൊതു നെറ്റ്‌വർക്ക് വിലാസം സുരക്ഷിതമായി കാണിക്കും.", tut2Title: "സ്വകാര്യതാ ചോർച്ച കണ്ടെത്തുക", tut2Desc: "സ്വകാര്യതാ ഉപകരണം തുറക്കുക. നിങ്ങളുടെ മറഞ്ഞിരിക്കുന്ന വിലാസങ്ങൾ ചോരുന്നുണ്ടോ എന്ന് സിസ്റ്റം പരിശോധിക്കും.", tut3Title: "ഉപകരണ ഒപ്പ് പരിശോധിക്കുക", tut3Desc: "ഐഡന്റിറ്റി ഉപകരണം തുറക്കുക. വെബ്സൈറ്റുകൾ നിങ്ങളെ ട്രാക്ക് ചെയ്യാൻ ഉപയോഗിക്കുന്ന കൃത്യമായ ഒപ്പ് സിസ്റ്റം കണക്കാക്കുന്നു.", stepLabel: "ഗൈഡ്", openBtn: "വായിക്കുക", runBtn: "ഉപകരണം തുറക്കുക" },
  or: { title: "ସିଷ୍ଟମ୍ ଗାଇଡ୍", subtitle: "ଆପଣଙ୍କ ଡିଭାଇସକୁ ସୁରକ୍ଷିତ କରିବା ଶିଖନ୍ତୁ", tut1Title: "ନେଟୱାର୍କ ଠିକଣା ଯାଞ୍ଚ କରନ୍ତୁ", tut1Desc: "ଷ୍ଟାର୍ଟ ଟେଷ୍ଟରେ କ୍ଲିକ୍ କରନ୍ତୁ | ସିଷ୍ଟମ୍ ସୁରକ୍ଷିତ ଭାବରେ ଆପଣଙ୍କର ସାର୍ବଜନୀନ ନେଟୱାର୍କ ଠିକଣା ଦେଖାଇବ |", tut2Title: "ଗୋପନୀୟତା ଲିକ୍ ଖୋଜନ୍ତୁ", tut2Desc: "ଗୋପନୀୟତା ଉପକରଣ ଖୋଲନ୍ତୁ | ଆପଣଙ୍କର ଲୁକ୍କାୟିତ ଠିକଣା ଲିକ୍ ହେଉଛି କି ନାହିଁ ସିଷ୍ଟମ୍ ଯାଞ୍ଚ କରିବ |", tut3Title: "ଡିଭାଇସ୍ ସ୍ୱାକ୍ଷର ଯାଞ୍ଚ କରନ୍ତୁ", tut3Desc: "ପରିଚୟ ଉପକରଣ ଖୋଲନ୍ତୁ | ୱେବସାଇଟ୍ ଆପଣଙ୍କୁ ଟ୍ରାକ୍ କରିବାକୁ ବ୍ୟବହାର କରୁଥିବା ସଠିକ୍ ସ୍ୱାକ୍ଷର ସିଷ୍ଟମ୍ ଗଣନା କରେ |", stepLabel: "ଗାଇଡ୍", openBtn: "ପଢନ୍ତୁ", runBtn: "ଉପକରଣ ଖୋଲନ୍ତୁ" },
  as: { title: "চিষ্টেম গাইডসমূহ", subtitle: "আপোনাৰ ডিভাইচ সুৰক্ষিত কৰিবলৈ শিকা", tut1Title: "নেটৱৰ্ক ঠিকনা পৰীক্ষা কৰক", tut1Desc: "ষ্টাৰ্ট টেষ্টত ক্লিক কৰক। চিষ্টেমে নিৰাপদভাৱে আপোনাৰ ৰাজহুৱা নেটৱৰ্ক ঠিকনা দেখুৱাব।", tut2Title: "গোপনীয়তা লিক বিচাৰক", tut2Desc: "গোপনীয়তা সঁজুলি খোলক। আপোনাৰ লুকুৱা ঠিকনাসমূহ লিক হৈছে নেকি চিষ্টেমে পৰীক্ষা কৰিব।", tut3Title: "ডিভাইচ স্বাক্ষৰ পৰীক্ষা কৰক", tut3Desc: "পৰিচয় সঁজুলি খোলক। ৱেবচাইটসমূহে আপোনাক ট্ৰেক কৰিবলৈ ব্যৱহাৰ কৰা সঠিক স্বাক্ষৰ চিষ্টেমে গণনা কৰে।", stepLabel: "গাইড", openBtn: "পঢ়ক", runBtn: "সঁজুলি খোলক" },
  ur: { title: "سسٹم گائیڈز", subtitle: "اپنے ڈیوائس کی حفاظت کرنا سیکھیں", tut1Title: "نیٹ ورک کا پتہ چیک کریں", tut1Desc: "اسٹارٹ ٹیسٹ پر کلک کریں۔ سسٹم محفوظ طریقے سے آپ کا عوامی نیٹ ورک کا پتہ دکھائے گا۔", tut2Title: "پرائیویسی لیکس تلاش کریں", tut2Desc: "پرائیویسی ٹول کھولیں۔ سسٹم چیک کرے گا کہ کیا آپ کے چھپے ہوئے پتے لیک ہو رہے ہیں۔", tut3Title: "ڈیوائس کے دستخط چیک کریں", tut3Desc: "شناختی ٹول کھولیں۔ سسٹم اس درست دستخط کا حساب لگاتا ہے جسے ویب سائٹس آپ کو ٹریک کرنے کے لیے استعمال کرتی ہیں۔", stepLabel: "گائیڈ", openBtn: "پڑھیں", runBtn: "ٹول کھولیں" },
  sa: { title: "तन्त्र-मार्गदर्शिकाः", subtitle: "स्वयन्त्रस्य रक्षणं शिक्षन्ताम्", tut1Title: "जालबन्ध-सङ्केतं परीक्षताम्", tut1Desc: "परीक्षणम् आरभताम् इति नोदयतु। तन्त्रं सुरक्षितरूपेण भवतः सार्वजनिक-जालबन्ध-सङ्केतं दर्शयिष्यति।", tut2Title: "गोपनीयता-सङ्कटं अन्विष्यताम्", tut2Desc: "गोपनीयता-उपकरणम् उद्घाटयतु। भवतः गुप्ताः सङ्केताः प्रकटीभवन्ति वा इति तन्त्रं परीक्ष्यते।", tut3Title: "यन्त्र-हस्ताक्षरं परीक्षताम्", tut3Desc: "परिचय-उपकरणम् उद्घाटयतु। जालस्थानानि भवतः अनुसरणाय यत् हस्ताक्षरं उपयुञ्जते, तन्त्रं तस्य गणनां करोति।", stepLabel: "मार्गदर्शिका", openBtn: "पठतु", runBtn: "उपकरणम् उद्घाटयतु" }
};

export default function Tutorials() {
  const { language = 'en' } = useTheme();
  const navigate = useNavigate();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [activeGuide, setActiveGuide] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const guides = [
    { id: 1, title: content.tut1Title, desc: content.tut1Desc, route: '/ip-checker' },
    { id: 2, title: content.tut2Title, desc: content.tut2Desc, route: '/webrtc-leak-test' },
    { id: 3, title: content.tut3Title, desc: content.tut3Desc, route: '/canvas-fingerprint' }
  ];

  const toggleGuide = (id) => {
    setActiveGuide(activeGuide === id ? null : id);
  };

  const handleRunTool = (route) => {
    navigate(route);
  };

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-8"
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

        {/* Functional Interactive Guides List */}
        <div className="space-y-4">
          {guides.map((guide, index) => (
            <div key={guide.id} className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] shadow-sm">
              <button 
                onClick={() => toggleGuide(guide.id)}
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[var(--surface-hover)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-[var(--text-muted)] bg-[var(--surface)] px-2 py-1 border border-[var(--border)]">
                    {content.stepLabel} 0{index + 1}
                  </span>
                  <h2 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-wide">
                    {guide.title}
                  </h2>
                </div>
                <div className="text-[var(--text-muted)] font-bold text-xl">
                  {activeGuide === guide.id ? '−' : '+'}
                </div>
              </button>
              
              <AnimatePresence>
                {activeGuide === guide.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-[var(--border)] bg-[var(--surface)]"
                  >
                    <div className="p-6">
                      <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6">
                        {guide.desc}
                      </p>
                      <button 
                        onClick={() => handleRunTool(guide.route)}
                        className="px-6 py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] font-bold shadow-sm transition-all border border-transparent hover:border-[var(--border-strong)] uppercase tracking-widest text-sm"
                      >
                        {content.runBtn}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  );
}