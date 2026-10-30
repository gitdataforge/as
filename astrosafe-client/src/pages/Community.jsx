import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "Community", subtitle: "Join the Network", email: "Email Address", password: "Password", signIn: "Sign In", signUp: "Create Account", googleBtn: "Continue with Google", or: "OR", error: "Authentication Failed", success: "Welcome to the Network" },
  hi: { title: "समुदाय", subtitle: "नेटवर्क से जुड़ें", email: "ईमेल पता", password: "पासवर्ड", signIn: "साइन इन करें", signUp: "खाता बनाएं", googleBtn: "Google के साथ जारी रखें", or: "या", error: "प्रमाणीकरण विफल", success: "नेटवर्क में आपका स्वागत है" },
  mr: { title: "समुदाय", subtitle: "नेटवर्कमध्ये सामील व्हा", email: "ईमेल पत्ता", password: "पासवर्ड", signIn: "साइन इन करा", signUp: "खाते तयार करा", googleBtn: "Google सह सुरू ठेवा", or: "किंवा", error: "प्रमाणीकरण अयशस्वी", success: "नेटवर्कमध्ये आपले स्वागत आहे" },
  ta: { title: "சமூகம்", subtitle: "நெட்வொர்க்கில் இணையுங்கள்", email: "மின்னஞ்சல் முகவரி", password: "கடவுச்சொல்", signIn: "உள்நுழைக", signUp: "கணக்கை உருவாக்கு", googleBtn: "Google உடன் தொடரவும்", or: "அல்லது", error: "அங்கீகாரம் தோல்வியடைந்தது", success: "நெட்வொர்க்கிற்கு வருக" },
  te: { title: "సంఘం", subtitle: "నెట్‌వర్క్‌లో చేరండి", email: "ఇమెయిల్ చిరునామా", password: "పాస్‌వర్డ్", signIn: "సైన్ ఇన్ చేయండి", signUp: "ఖాతాను సృష్టించండి", googleBtn: "Google తో కొనసాగించండి", or: "లేదా", error: "ప్రమాణీకరణ విఫలమైంది", success: "నెట్‌వర్క్‌కు స్వాగతం" },
  kn: { title: "ಸಮುದಾಯ", subtitle: "ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಸೇರಿ", email: "ಇಮೇಲ್ ವಿಳಾಸ", password: "ಪಾಸ್‌ವರ್ಡ್", signIn: "ಸೈನ್ ಇನ್ ಮಾಡಿ", signUp: "ಖಾತೆಯನ್ನು ರಚಿಸಿ", googleBtn: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ", or: "ಅಥವಾ", error: "ದೃಢೀಕರಣ ವಿಫಲವಾಗಿದೆ", success: "ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಸುಸ್ವಾಗತ" },
  bn: { title: "সম্প্রদায়", subtitle: "নেটওয়ার্কে যোগ দিন", email: "ইমেইল ঠিকানা", password: "পাসওয়ার্ড", signIn: "সাইন ইন করুন", signUp: "অ্যাকাউন্ট তৈরি করুন", googleBtn: "Google এর সাথে চালিয়ে যান", or: "বা", error: "প্রমাণীকরণ ব্যর্থ হয়েছে", success: "নেটওয়ার্কে স্বাগতম" },
  gu: { title: "સમુદાય", subtitle: "નેટવર્કમાં જોડાઓ", email: "ઈમેલ સરનામું", password: "પાસવર્ડ", signIn: "સાઇન ઇન કરો", signUp: "ખાતું બનાવો", googleBtn: "Google સાથે ચાલુ રાખો", or: "અથવા", error: "પ્રમાણીકરણ નિષ્ફળ", success: "નેટવર્કમાં સ્વાગત છે" },
  pa: { title: "ਭਾਈਚਾਰਾ", subtitle: "ਨੈੱਟਵਰਕ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ", email: "ਈਮੇਲ ਪਤਾ", password: "ਪਾਸਵਰਡ", signIn: "ਸਾਈਨ ਇਨ ਕਰੋ", signUp: "ਖਾਤਾ ਬਣਾਓ", googleBtn: "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ", or: "ਜਾਂ", error: "ਪ੍ਰਮਾਣਿਕਤਾ ਅਸਫਲ", success: "ਨੈੱਟਵਰਕ ਵਿੱਚ ਸੁਆਗਤ ਹੈ" },
  ml: { title: "കമ്മ്യൂണിറ്റി", subtitle: "നെറ്റ്‌വർക്കിൽ ചേരുക", email: "ഇമെയിൽ വിലാസം", password: "പാസ്‌വേഡ്", signIn: "സൈൻ ഇൻ ചെയ്യുക", signUp: "അക്കൗണ്ട് സൃഷ്ടിക്കുക", googleBtn: "Google ഉപയോഗിച്ച് തുടരുക", or: "അല്ലെങ്കിൽ", error: "പ്രാമാണീകരണം പരാജയപ്പെട്ടു", success: "നെറ്റ്‌വർക്കിലേക്ക് സ്വാഗതം" },
  or: { title: "ସମ୍ପ୍ରଦାୟ", subtitle: "ନେଟୱାର୍କରେ ଯୋଗ ଦିଅନ୍ତୁ", email: "ଇମେଲ୍ ଠିକଣା", password: "ପାସୱାର୍ଡ", signIn: "ସାଇନ୍ ଇନ୍ କରନ୍ତୁ", signUp: "ଆକାଉଣ୍ଟ୍ ସୃଷ୍ଟି କରନ୍ତୁ", googleBtn: "Google ସହିତ ଜାରି ରଖନ୍ତୁ", or: "କିମ୍ବା", error: "ପ୍ରମାଣୀକରଣ ବିଫଳ ହେଲା", success: "ନେଟୱାର୍କକୁ ସ୍ୱାଗତ" },
  as: { title: "সম্প্ৰদায়", subtitle: "নেটৱৰ্কত যোগদান কৰক", email: "ইমেইল ঠিকনা", password: "পাছৱৰ্ড", signIn: "ছাইন ইন কৰক", signUp: "একাউণ্ট সৃষ্টি কৰক", googleBtn: "Google ৰ সৈতে আগবাঢ়ক", or: "বা", error: "প্ৰমাণীকৰণ বিফল হৈছে", success: "নেটৱৰ্কলৈ স্বাগতম" },
  ur: { title: "کمیونٹی", subtitle: "نیٹ ورک میں شامل ہوں", email: "ای میل پتہ", password: "پاس ورڈ", signIn: "سائن ان کریں", signUp: "اکاؤنٹ بنائیں", googleBtn: "Google کے ساتھ جاری رکھیں", or: "یا", error: "تصدیق ناکام ہو گئی", success: "نیٹ ورک میں خوش آمدید" },
  sa: { title: "समुदायः", subtitle: "जालबन्धे सम्मिलितो भवतु", email: "ईमेल-सङ्केतः", password: "कूटशब्दः", signIn: "प्रविशतु", signUp: "खातां निर्मातु", googleBtn: "Google इत्यनेन सह अनुवर्तताम्", or: "अथवा", error: "प्रमाणीकरणं विफलम्", success: "जालबन्धे स्वागतम्" }
};

export default function Community() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuthAction = async (actionType) => {
    if (!formData.email || !formData.password) return;
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      const auth = getAuth();
      if (actionType === 'login') {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      }
      setStatus({ type: 'success', message: content.success });
      setFormData({ email: '', password: '' });
    } catch (error) {
      setStatus({ type: 'error', message: content.error });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setStatus({ type: 'success', message: content.success });
    } catch (error) {
      setStatus({ type: 'error', message: content.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid min-h-screen">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md space-y-8 bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-2xl"
      >
        <div className="text-center border-b border-[var(--border)] pb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {content.title}
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm">
            {content.subtitle}
          </p>
        </div>

        {status.message && (
          <div className={`p-4 border font-bold text-center text-sm ${status.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500' : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-500'}`}>
            {status.message}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
              {content.email}
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
              {content.password}
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={() => handleAuthAction('login')}
              disabled={loading}
              className="flex-1 py-3 bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-hover)] text-[var(--brand-white)] font-bold transition-colors border border-transparent shadow-sm uppercase tracking-widest text-xs disabled:opacity-50"
            >
              {content.signIn}
            </button>
            <button 
              onClick={() => handleAuthAction('register')}
              disabled={loading}
              className="flex-1 py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] font-bold transition-colors border border-transparent hover:border-[var(--border-strong)] shadow-sm uppercase tracking-widest text-xs disabled:opacity-50"
            >
              {content.signUp}
            </button>
          </div>
        </div>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-[var(--border-strong)]"></div>
          <span className="flex-shrink-0 mx-4 text-[var(--text-muted)] font-bold text-xs uppercase tracking-widest">
            {content.or}
          </span>
          <div className="flex-grow border-t border-[var(--border-strong)]"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 bg-white text-black border border-gray-300 hover:bg-gray-50 font-bold transition-colors shadow-sm disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span className="text-sm uppercase tracking-widest">{content.googleBtn}</span>
        </button>

      </motion.div>
    </div>
  );
}