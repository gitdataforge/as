import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Customer Support", subtitle: "We are here to help you", supportEmail: "Direct Support Email", emailDesc: "Send us an email directly at:", formName: "Full Name", formEmail: "Email Address", formIssue: "Describe your issue", send: "Send Request", successMsg: "Mail client opened successfully", faqsTitle: "Common Questions", faq1: "How do I check my system?", faq1Ans: "Click on Start Test on the home page.", faq2: "Is my data stored?", faq2Ans: "No, we do not store your data. All tests happen on your device." },
  hi: { title: "ग्राहक सहायता", subtitle: "हम आपकी मदद के लिए यहाँ हैं", supportEmail: "सीधा सहायता ईमेल", emailDesc: "हमें सीधे ईमेल भेजें:", formName: "पूरा नाम", formEmail: "ईमेल पता", formIssue: "अपनी समस्या बताएं", send: "अनुरोध भेजें", successMsg: "मेल क्लाइंट सफलतापूर्वक खुल गया", faqsTitle: "सामान्य प्रश्न", faq1: "मैं अपना सिस्टम कैसे जांचूं?", faq1Ans: "होम पेज पर स्टार्ट टेस्ट पर क्लिक करें।", faq2: "क्या मेरा डेटा संग्रहीत है?", faq2Ans: "नहीं, हम आपका डेटा संग्रहीत नहीं करते हैं। सभी परीक्षण आपके डिवाइस पर होते हैं।" },
  mr: { title: "ग्राहक समर्थन", subtitle: "आम्ही तुम्हाला मदत करण्यासाठी येथे आहोत", supportEmail: "थेट समर्थन ईमेल", emailDesc: "आम्हाला थेट ईमेल पाठवा:", formName: "पूर्ण नाव", formEmail: "ईमेल पत्ता", formIssue: "तुमची समस्या सांगा", send: "विनंती पाठवा", successMsg: "मेल क्लायंट यशस्वीरित्या उघडले", faqsTitle: "सामान्य प्रश्न", faq1: "मी माझी सिस्टम कशी तपासू?", faq1Ans: "मुख्य पृष्ठावर स्टार्ट टेस्ट वर क्लिक करा.", faq2: "माझा डेटा जतन केला आहे का?", faq2Ans: "नाही, आम्ही तुमचा डेटा जतन करत नाही. सर्व चाचण्या तुमच्या डिव्हाइसवर होतात." },
  ta: { title: "வாடிக்கையாளர் ஆதரவு", subtitle: "உங்களுக்கு உதவ நாங்கள் இங்கு உள்ளோம்", supportEmail: "நேரடி ஆதரவு மின்னஞ்சல்", emailDesc: "எங்களுக்கு நேரடியாக மின்னஞ்சல் அனுப்பவும்:", formName: "முழு பெயர்", formEmail: "மின்னஞ்சல் முகவரி", formIssue: "உங்கள் சிக்கலை விவரிக்கவும்", send: "கோரிக்கையை அனுப்பு", successMsg: "அஞ்சல் கிளையன்ட் வெற்றிகரமாக திறக்கப்பட்டது", faqsTitle: "பொதுவான கேள்விகள்", faq1: "எனது கணினியை எவ்வாறு சரிபார்ப்பது?", faq1Ans: "முகப்புப் பக்கத்தில் சோதனையைத் தொடங்கு என்பதைக் கிளிக் செய்யவும்.", faq2: "எனது தரவு சேமிக்கப்படுகிறதா?", faq2Ans: "இல்லை, நாங்கள் உங்கள் தரவைச் சேமிப்பதில்லை. அனைத்து சோதனைகளும் உங்கள் சாதனத்தில் நடக்கின்றன." },
  te: { title: "కస్టమర్ మద్దతు", subtitle: "మేము మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాము", supportEmail: "ప్రత్యక్ష మద్దతు ఇమెయిల్", emailDesc: "మాకు నేరుగా ఇమెయిల్ పంపండి:", formName: "పూర్తి పేరు", formEmail: "ఇమెయిల్ చిరునామా", formIssue: "మీ సమస్యను వివరించండి", send: "అభ్యర్థన పంపండి", successMsg: "మెయిల్ క్లయింట్ విజయవంతంగా తెరవబడింది", faqsTitle: "సాధారణ ప్రశ్నలు", faq1: "నేను నా సిస్టమ్‌ను ఎలా తనిఖీ చేయాలి?", faq1Ans: "హోమ్ పేజీలో పరీక్షను ప్రారంభించు పై క్లిక్ చేయండి.", faq2: "నా డేటా నిల్వ చేయబడిందా?", faq2Ans: "లేదు, మేము మీ డేటాను నిల్వ చేయము. అన్ని పరీక్షలు మీ పరికరంలో జరుగుతాయి." },
  kn: { title: "ಗ್ರಾಹಕ ಬೆಂಬಲ", subtitle: "ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ", supportEmail: "ನೇರ ಬೆಂಬಲ ಇಮೇಲ್", emailDesc: "ನಮಗೆ ನೇರವಾಗಿ ಇಮೇಲ್ ಕಳುಹಿಸಿ:", formName: "ಪೂರ್ಣ ಹೆಸರು", formEmail: "ಇಮೇಲ್ ವಿಳಾಸ", formIssue: "ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ", send: "ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಿ", successMsg: "ಮೇಲ್ ಕ್ಲೈಂಟ್ ಯಶಸ್ವಿಯಾಗಿ ತೆರೆಯಲಾಗಿದೆ", faqsTitle: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು", faq1: "ನನ್ನ ಸಿಸ್ಟಮ್ ಅನ್ನು ನಾನು ಹೇಗೆ ಪರಿಶೀಲಿಸುವುದು?", faq1Ans: "ಮುಖಪುಟದಲ್ಲಿ ಪರೀಕ್ಷೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ ಕ್ಲಿಕ್ ಮಾಡಿ.", faq2: "ನನ್ನ ಡೇಟಾವನ್ನು ಸಂಗ್ರಹಿಸಲಾಗಿದೆಯೇ?", faq2Ans: "ಇಲ್ಲ, ನಾವು ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ. ಎಲ್ಲಾ ಪರೀಕ್ಷೆಗಳು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ನಡೆಯುತ್ತವೆ." },
  bn: { title: "গ্রাহক সমর্থন", subtitle: "আমরা আপনাকে সাহায্য করার জন্য এখানে আছি", supportEmail: "সরাসরি সমর্থন ইমেইল", emailDesc: "আমাদের সরাসরি একটি ইমেল পাঠান:", formName: "পুরো নাম", formEmail: "ইমেইল ঠিকানা", formIssue: "আপনার সমস্যা বর্ণনা করুন", send: "অনুরোধ পাঠান", successMsg: "মেইল ক্লায়েন্ট সফলভাবে খোলা হয়েছে", faqsTitle: "সাধারণ প্রশ্ন", faq1: "আমি কিভাবে আমার সিস্টেম চেক করব?", faq1Ans: "হোম পেজে স্টার্ট টেস্ট এ ক্লিক করুন।", faq2: "আমার ডেটা কি সংরক্ষিত হয়?", faq2Ans: "না, আমরা আপনার ডেটা সংরক্ষণ করি না। সমস্ত পরীক্ষা আপনার ডিভাইসে ঘটে।" },
  gu: { title: "ગ્રાહક આધાર", subtitle: "અમે તમને મદદ કરવા માટે અહીં છીએ", supportEmail: "સીધો આધાર ઈમેલ", emailDesc: "અમને સીધો ઈમેલ મોકલો:", formName: "પૂરું નામ", formEmail: "ઈમેલ સરનામું", formIssue: "તમારી સમસ્યાનું વર્ણન કરો", send: "વિનંતી મોકલો", successMsg: "મેલ ક્લાયંટ સફળતાપૂર્વક ખોલ્યું", faqsTitle: "સામાન્ય પ્રશ્નો", faq1: "હું મારી સિસ્ટમ કેવી રીતે તપાસું?", faq1Ans: "હોમ પેજ પર સ્ટાર્ટ ટેસ્ટ પર ક્લિક કરો.", faq2: "શું મારો ડેટા સંગ્રહિત છે?", faq2Ans: "ના, અમે તમારો ડેટા સંગ્રહિત કરતા નથી. બધી તપાસ તમારા ઉપકરણ પર થાય છે." },
  pa: { title: "ਗਾਹਕ ਸਹਾਇਤਾ", subtitle: "ਅਸੀਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ", supportEmail: "ਸਿੱਧਾ ਸਹਾਇਤਾ ਈਮੇਲ", emailDesc: "ਸਾਨੂੰ ਸਿੱਧਾ ਈਮੇਲ ਭੇਜੋ:", formName: "ਪੂਰਾ ਨਾਮ", formEmail: "ਈਮੇਲ ਪਤਾ", formIssue: "ਆਪਣੀ ਸਮੱਸਿਆ ਦਾ ਵਰਣਨ ਕਰੋ", send: "ਬੇਨਤੀ ਭੇਜੋ", successMsg: "ਮੇਲ ਕਲਾਇੰਟ ਸਫਲਤਾਪੂਰਵਕ ਖੁੱਲ੍ਹ ਗਿਆ", faqsTitle: "ਆਮ ਸਵਾਲ", faq1: "ਮੈਂ ਆਪਣਾ ਸਿਸਟਮ ਕਿਵੇਂ ਚੈੱਕ ਕਰਾਂ?", faq1Ans: "ਹੋਮ ਪੇਜ 'ਤੇ ਸਟਾਰਟ ਟੈਸਟ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।", faq2: "ਕੀ ਮੇਰਾ ਡੇਟਾ ਸਟੋਰ ਕੀਤਾ ਗਿਆ ਹੈ?", faq2Ans: "ਨਹੀਂ, ਅਸੀਂ ਤੁਹਾਡਾ ਡੇਟਾ ਸਟੋਰ ਨਹੀਂ ਕਰਦੇ ਹਾਂ। ਸਾਰੇ ਟੈਸਟ ਤੁਹਾਡੀ ਡਿਵਾਈਸ 'ਤੇ ਹੁੰਦੇ ਹਨ।" },
  ml: { title: "ഉപഭോക്തൃ പിന്തുണ", subtitle: "നിങ്ങളെ സഹായിക്കാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്", supportEmail: "നേരിട്ടുള്ള പിന്തുണ ഇമെയിൽ", emailDesc: "ഞങ്ങൾക്ക് നേരിട്ട് ഒരു ഇമെയിൽ അയയ്ക്കുക:", formName: "മുഴുവൻ പേര്", formEmail: "ഇമെയിൽ വിലാസം", formIssue: "നിങ്ങളുടെ പ്രശ്നം വിവരിക്കുക", send: "അഭ്യർത്ഥന അയയ്ക്കുക", successMsg: "മെയിൽ ക്ലയന്റ് വിജയകരമായി തുറന്നു", faqsTitle: "സാധാരണ ചോദ്യങ്ങൾ", faq1: "എന്റെ സിസ്റ്റം എങ്ങനെ പരിശോധിക്കാം?", faq1Ans: "ഹോം പേജിലെ സ്റ്റാർട്ട് ടെസ്റ്റിൽ ക്ലിക്ക് ചെയ്യുക.", faq2: "എന്റെ ഡാറ്റ സംഭരിച്ചിട്ടുണ്ടോ?", faq2Ans: "ഇല്ല, ഞങ്ങൾ നിങ്ങളുടെ ഡാറ്റ സംഭരിക്കുന്നില്ല. എല്ലാ പരിശോധനകളും നിങ്ങളുടെ ഉപകരണത്തിൽ നടക്കുന്നു." },
  or: { title: "ଗ୍ରାହକ ସମର୍ଥନ", subtitle: "ଆମେ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବାକୁ ଏଠାରେ ଅଛୁ", supportEmail: "ସିଧାସଳଖ ସମର୍ଥନ ଇମେଲ୍", emailDesc: "ଆମକୁ ସିଧାସଳଖ ଏକ ଇମେଲ୍ ପଠାନ୍ତୁ:", formName: "ପୂରା ନାମ", formEmail: "ଇମେଲ୍ ଠିକଣା", formIssue: "ଆପଣଙ୍କର ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ", send: "ଅନୁରୋଧ ପଠାନ୍ତୁ", successMsg: "ମେଲ୍ କ୍ଲାଏଣ୍ଟ ସଫଳତାର ସହ ଖୋଲିଲା", faqsTitle: "ସାଧାରଣ ପ୍ରଶ୍ନ", faq1: "ମୁଁ ମୋର ସିଷ୍ଟମ୍ କିପରି ଯାଞ୍ଚ କରିବି?", faq1Ans: "ହୋମ୍ ପୃଷ୍ଠାରେ ଷ୍ଟାର୍ଟ ଟେଷ୍ଟରେ କ୍ଲିକ୍ କରନ୍ତୁ |", faq2: "ମୋର ଡାଟା ଷ୍ଟୋର୍ ହୋଇଛି କି?", faq2Ans: "ନା, ଆମେ ଆପଣଙ୍କର ଡାଟା ଷ୍ଟୋର୍ କରୁନାହୁଁ | ସମସ୍ତ ଯାଞ୍ଚ ଆପଣଙ୍କ ଡିଭାଇସରେ ହୋଇଥାଏ |" },
  as: { title: "গ্ৰাহক সমৰ্থন", subtitle: "আমি আপোনাক সহায় কৰিবলৈ ইয়াত আছোঁ", supportEmail: "পোনপটীয়া সমৰ্থন ইমেইল", emailDesc: "আমালৈ পোনপটীয়াকৈ এটা ইমেইল পঠাওক:", formName: "সম্পূৰ্ণ নাম", formEmail: "ইমেইল ঠিকনা", formIssue: "আপোনাৰ সমস্যাটো বৰ্ণনা কৰক", send: "অনুৰোধ পঠাওক", successMsg: "মেইল ক্লায়েণ্ট সফলভাৱে খোলা হৈছে", faqsTitle: "সাধাৰণ প্ৰশ্ন", faq1: "মই মোৰ চিষ্টেমটো কেনেকৈ পৰীক্ষা কৰিম?", faq1Ans: "হোম পেজত ষ্টাৰ্ট টেষ্টত ক্লিক কৰক।", faq2: "মোৰ ডাটা সংৰক্ষণ কৰা হৈছেনে?", faq2Ans: "নহয়, আমি আপোনাৰ ডাটা সংৰক্ষণ নকৰোঁ। সকলো পৰীক্ষা আপোনাৰ ডিভাইচত হয়।" },
  ur: { title: "کسٹمر سپورٹ", subtitle: "ہم آپ کی مدد کے لیے یہاں ہیں", supportEmail: "براہ راست سپورٹ ای میل", emailDesc: "ہمیں براہ راست ای میل بھیجیں:", formName: "پورا نام", formEmail: "ای میل پتہ", formIssue: "اپنا مسئلہ بیان کریں", send: "درخواست بھیجیں", successMsg: "میل کلائنٹ کامیابی سے کھل گیا", faqsTitle: "عام سوالات", faq1: "میں اپنا سسٹم کیسے چیک کروں؟", faq1Ans: "ہوم پیج پر اسٹارٹ ٹیسٹ پر کلک کریں۔", faq2: "کیا میرا ڈیٹا محفوظ کیا جاتا ہے؟", faq2Ans: "نہیں، ہم آپ کا ڈیٹا محفوظ نہیں کرتے۔ تمام ٹیسٹ آپ کے ڈیوائس پر ہوتے ہیں۔" },
  sa: { title: "ग्राहक-सहायता", subtitle: "वयं भवतः साहाय्यार्थम् अत्र स्मः", supportEmail: "साक्षात् सहायता-ईमेल", emailDesc: "अस्मभ्यं साक्षात् ईमेल प्रेषयतु:", formName: "पूर्णं नाम", formEmail: "ईमेल-सङ्केतः", formIssue: "भवतः समस्यां वर्णयतु", send: "अनुरोधं प्रेषयतु", successMsg: "ईमेल-तन्त्रं साफल्येन उद्घाटितम्", faqsTitle: "सामान्याः प्रश्नाः", faq1: "अहं स्व-तन्त्रं कथं परीक्षये?", faq1Ans: "मुख्यपृष्ठे 'परीक्षणं आरभताम्' इति नोदयतु।", faq2: "किं मम दत्तांशः सञ्चितः अस्ति?", faq2Ans: "न, वयं भवतः दत्तांशं न सञ्चिनुमः। सर्वाणि परीक्षणानि भवतः यन्त्रे एव भवन्ति।" }
};

export default function CustomerSupport() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: ''
  });
  
  const [status, setStatus] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Real logic to open the device's native mail client directly to the business support email
    const supportEmail = "help.anyastro@gmail.com";
    const subject = encodeURIComponent(`Support Request from ${formData.name}`);
    const body = encodeURIComponent(`Issue Details:\n${formData.issue}\n\nSender Email: ${formData.email}\nSender Name: ${formData.name}`);
    
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    
    setStatus(content.successMsg);
    setFormData({ name: '', email: '', issue: '' });
    
    setTimeout(() => {
      setStatus('');
    }, 4000);
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Functional Support Form */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                  {content.formName}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                  {content.formEmail}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                  {content.formIssue}
                </label>
                <textarea
                  id="issue"
                  name="issue"
                  required
                  rows={4}
                  value={formData.issue}
                  onChange={handleChange}
                  className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold text-lg transition-all uppercase tracking-widest shadow-sm"
              >
                {content.send}
              </button>

              {status && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-500 font-bold text-center text-sm"
                >
                  {status}
                </motion.div>
              )}
            </form>
          </div>

          {/* Support Information & FAQs */}
          <div className="space-y-8">
            
            {/* Direct Email Block */}
            <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm">
              <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                {content.supportEmail}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium mb-4">
                {content.emailDesc}
              </p>
              <div className="font-mono text-xl font-bold text-[var(--brand-blue)] bg-[var(--surface-secondary)] p-4 border border-[var(--border)] break-all">
                help.anyastro@gmail.com
              </div>
            </div>

            {/* FAQs Block */}
            <div className="bg-[var(--brand-black)] border border-[var(--border-strong)] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[var(--brand-white)] uppercase tracking-wider mb-6 border-b border-[var(--border-strong)] pb-4">
                {content.faqsTitle}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-[var(--brand-white)] font-bold mb-2">
                    Q: {content.faq1}
                  </h3>
                  <p className="text-[var(--text-secondary)] font-medium">
                    A: {content.faq1Ans}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-[var(--border-strong)]">
                  <h3 className="text-[var(--brand-white)] font-bold mb-2">
                    Q: {content.faq2}
                  </h3>
                  <p className="text-[var(--text-secondary)] font-medium">
                    A: {content.faq2Ans}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}