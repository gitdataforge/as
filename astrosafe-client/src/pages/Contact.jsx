import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Contact Support", desc: "Send us a message for business help.", name: "Full Name", email: "Email Address", message: "Your Message", send: "Send Message", success: "Message Client Opened" },
  hi: { title: "संपर्क सहायता", desc: "व्यावसायिक सहायता के लिए हमें एक संदेश भेजें।", name: "पूरा नाम", email: "ईमेल पता", message: "आपका संदेश", send: "संदेश भेजें", success: "संदेश क्लाइंट खुल गया" },
  mr: { title: "संपर्क समर्थन", desc: "व्यावसायिक मदतीसाठी आम्हाला संदेश पाठवा.", name: "पूर्ण नाव", email: "ईमेल पत्ता", message: "तुमचा संदेश", send: "संदेश पाठवा", success: "संदेश क्लायंट उघडले" },
  ta: { title: "தொடர்பு ஆதரவு", desc: "வணிக உதவிக்கு எங்களுக்கு செய்தி அனுப்பவும்.", name: "முழு பெயர்", email: "மின்னஞ்சல் முகவரி", message: "உங்கள் செய்தி", send: "செய்தி அனுப்பு", success: "செய்தி கிளையன்ட் திறக்கப்பட்டது" },
  te: { title: "సంప్రదింపు మద్దతు", desc: "వ్యాపార సహాయం కోసం మాకు సందేశం పంపండి.", name: "పూర్తి పేరు", email: "ఇమెయిల్ చిరునామా", message: "మీ సందేశం", send: "సందేశం పంపండి", success: "సందేశ క్లయింట్ తెరవబడింది" },
  kn: { title: "ಸಂಪರ್ಕ ಬೆಂಬಲ", desc: "ವ್ಯಾಪಾರ ಸಹಾಯಕ್ಕಾಗಿ ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ.", name: "ಪೂರ್ಣ ಹೆಸರು", email: "ಇಮೇಲ್ ವಿಳಾಸ", message: "ನಿಮ್ಮ ಸಂದೇಶ", send: "ಸಂದೇಶ ಕಳುಹಿಸಿ", success: "ಸಂದೇಶ ಕ್ಲೈಂಟ್ ತೆರೆಯಲಾಗಿದೆ" },
  bn: { title: "যোগাযোগ সমর্থন", desc: "ব্যবসা সহায়তার জন্য আমাদের একটি বার্তা পাঠান।", name: "পুরো নাম", email: "ইমেইল ঠিকানা", message: "আপনার বার্তা", send: "বার্তা পাঠান", success: "বার্তা ক্লায়েন্ট খোলা হয়েছে" },
  gu: { title: "સંપર્ક આધાર", desc: "વ્યાપાર સહાય માટે અમને એક સંદેશ મોકલો.", name: "પૂરું નામ", email: "ઈમેલ સરનામું", message: "તમારો સંદેશ", send: "સંદેશ મોકલો", success: "સંદેશ ક્લાયન્ટ ખોલ્યું" },
  pa: { title: "ਸੰਪਰਕ ਸਹਾਇਤਾ", desc: "ਕਾਰੋਬਾਰੀ ਮਦਦ ਲਈ ਸਾਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ।", name: "ਪੂਰਾ ਨਾਮ", email: "ਈਮੇਲ ਪਤਾ", message: "ਤੁਹਾਡਾ ਸੁਨੇਹਾ", send: "ਸੁਨੇਹਾ ਭੇਜੋ", success: "ਸੁਨੇਹਾ ਕਲਾਇੰਟ ਖੁੱਲ੍ਹ ਗਿਆ" },
  ml: { title: "ബന്ധപ്പെടാനുള്ള പിന്തുണ", desc: "ബിസിനസ്സ് സഹായത്തിനായി ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്ക്കുക.", name: "മുഴുവൻ പേര്", email: "ഇമെയിൽ വിലാസം", message: "നിങ്ങളുടെ സന്ദേശം", send: "സന്ദേശം അയക്കുക", success: "സന്ദേശ ക്ലയന്റ് തുറന്നു" },
  or: { title: "ସମ୍ପର୍କ ସମର୍ଥନ", desc: "ବ୍ୟବସାୟିକ ସାହାଯ୍ୟ ପାଇଁ ଆମକୁ ଏକ ବାର୍ତ୍ତା ପଠାନ୍ତୁ |", name: "ପୂରା ନାମ", email: "ଇମେଲ୍ ଠିକଣା", message: "ଆପଣଙ୍କର ବାର୍ତ୍ତା", send: "ବାର୍ତ୍ତା ପଠାନ୍ତୁ", success: "ବାର୍ତ୍ତା କ୍ଲାଏଣ୍ଟ ଖୋଲିଲା" },
  as: { title: "যোগাযোগ সমৰ্থন", desc: "ব্যৱসায়িক সহায়ৰ বাবে আমালৈ এটা বাৰ্তা পঠাওক।", name: "সম্পূৰ্ণ নাম", email: "ইমেইল ঠিকনা", message: "আপোনাৰ বাৰ্তা", send: "বাৰ্তা পঠাওক", success: "বাৰ্তা ক্লায়েণ্ট খোলা হৈছে" },
  ur: { title: "رابطہ سپورٹ", desc: "کاروباری مدد کے لیے ہمیں ایک پیغام بھیجیں۔", name: "پورا نام", email: "ای میل پتہ", message: "آپ کا پیغام", send: "پیغام بھیجیں", success: "پیغام کلائنٹ کھل گیا" },
  sa: { title: "सम्पर्क-सहायता", desc: "व्यापारिक-सहायतायै अस्मभ्यं सन्देशं प्रेषयतु।", name: "पूर्णं नाम", email: "ईमेल-सङ्केतः", message: "भवतः सन्देशः", send: "सन्देशं प्रेषयतु", success: "सन्देश-तन्त्रम् उद्घाटितम्" }
};

export default function Contact() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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
    // This functions without needing an active backend database, keeping the cloud rules strictly locked
    const supportEmail = "help.anyastro@gmail.com";
    const subject = encodeURIComponent(`Contact Request from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nSender Email: ${formData.email}\nSender Name: ${formData.name}`);
    
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    
    setStatus(content.success);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setStatus('');
    }, 4000);
  };

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl space-y-8"
      >
        {/* Page Header */}
        <div className="border-b border-[var(--border-strong)] pb-6 text-center">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {content.title}
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] font-medium">
            {content.description || content.desc}
          </p>
        </div>

        {/* Real Functional Contact Form */}
        <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                {content.name}
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
                {content.email}
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
              <label htmlFor="message" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                {content.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-hover)] text-[var(--brand-white)] font-bold text-lg transition-colors border border-transparent shadow-sm"
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
      </motion.div>
    </div>
  );
}