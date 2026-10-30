import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { 
    title: "Community", 
    subtitle: "Join the Network", 
    email: "Email Address", 
    password: "Password", 
    signIn: "Sign In", 
    signUp: "Create Account", 
    googleBtn: "Continue with Google", 
    or: "OR", 
    error: "Authentication Failed", 
    success: "Welcome to the Network",
    tutorialTitle: "Welcome Guide",
    tutorialDesc: "Explore discussions, share ideas, and vote on community topics.",
    skipBtn: "Skip Tutorial",
    startBtn: "Get Started",
    feedTitle: "Discussion Feed",
    newPostTitle: "Create New Post",
    postTitleLabel: "Post Title",
    postContentLabel: "Post Content",
    publishBtn: "Publish Post",
    upvote: "Upvote",
    downvote: "Downvote",
    logout: "Sign Out"
  },
  hi: { 
    title: "समुदाय", 
    subtitle: "नेटवर्क से जुड़ें", 
    email: "ईमेल पता", 
    password: "पासवर्ड", 
    signIn: "साइन इन करें", 
    signUp: "खाता बनाएं", 
    googleBtn: "Google के साथ जारी रखें", 
    or: "या", 
    error: "प्रमाणीकरण विफल", 
    success: "नेटवर्क में आपका स्वागत है",
    tutorialTitle: "स्वागत मार्गदर्शिका",
    tutorialDesc: "चर्चाओं का अन्वेषण करें, विचार साझा करें और विषयों पर वोट करें।",
    skipBtn: "ट्यूटोरियल छोड़ें",
    startBtn: "शुरू करें",
    feedTitle: "चर्चा फ़ीड",
    newPostTitle: "नया पोस्ट बनाएं",
    postTitleLabel: "पोस्ट शीर्षक",
    postContentLabel: "पोस्ट सामग्री",
    publishBtn: "पोस्ट प्रकाशित करें",
    upvote: "समर्थन",
    downvote: "विरोध",
    logout: "साइन आउट करें"
  },
  mr: { 
    title: "समुदाय", 
    subtitle: "नेटवर्कमध्ये सामील व्हा", 
    email: "ईमेल पत्ता", 
    password: "पासवर्ड", 
    signIn: "साइन इन करा", 
    signUp: "खाते तयार करा", 
    googleBtn: "Google सह सुरू ठेवा", 
    or: "किंवा", 
    error: "प्रमाणीकरण अयशस्वी", 
    success: "नेटवर्कमध्ये आपले स्वागत आहे",
    tutorialTitle: "स्वागत मार्गदर्शक",
    tutorialDesc: "चर्चा एक्सप्लोर करा, विचार सामायिक करा आणि विषयांवर मतदान करा.",
    skipBtn: "ट्यूटोरियल वगळा",
    startBtn: "सुरू करा",
    feedTitle: "चर्चा फीड",
    newPostTitle: "नवीन पोस्ट तयार करा",
    postTitleLabel: "पोस्ट शीर्षक",
    postContentLabel: "पोस्ट सामग्री",
    publishBtn: "पोस्ट प्रकाशित करा",
    upvote: "समर्थन",
    downvote: "विरोध",
    logout: "साइन आउट करा"
  },
  ta: { 
    title: "சமூகம்", 
    subtitle: "நெட்வொர்க்கில் இணையுங்கள்", 
    email: "மின்னஞ்சல் முகவரி", 
    password: "கடவுச்சொல்", 
    signIn: "உள்நுழைக", 
    signUp: "கணக்கை உருவாக்கு", 
    googleBtn: "Google உடன் தொடரவும்", 
    or: "அல்லது", 
    error: "அங்கீகாரம் தோல்வியடைந்தது", 
    success: "நெட்வொர்க்கிற்கு வருக",
    tutorialTitle: "வரவேற்பு வழிகாட்டி",
    tutorialDesc: "விவாதங்களை ஆராயுங்கள், யோசனைகளைப் பகிருங்கள் மற்றும் வாக்களியுங்கள்.",
    skipBtn: "பயிற்சியைத் தவிர்க்கவும்",
    startBtn: "தொடங்கவும்",
    feedTitle: "விவாத ஊட்டம்",
    newPostTitle: "புதிய பதிவு உருவாக்கவும்",
    postTitleLabel: "பதிவு தலைப்பு",
    postContentLabel: "பதிவு உள்ளடக்கம்",
    publishBtn: "பதிவை வெளியிடவும்",
    upvote: "ஆதரி",
    downvote: "எதிர்க்க",
    logout: "வெளியேறு"
  },
  te: { 
    title: "సంఘం", 
    subtitle: "నెట్‌వర్క్‌లో చేరండి", 
    email: "ఇమెయిల్ చిరునామా", 
    password: "పాస్‌వర్డ్", 
    signIn: "సైన్ ఇన్ చేయండి", 
    signUp: "ఖాతాను సృష్టించండి", 
    googleBtn: "Google తో కొనసాగించండి", 
    or: "లేదా", 
    error: "ప్రమాణీకరణ విఫలమైంది", 
    success: "నెట్‌వర్క్‌కు స్వాగతం",
    tutorialTitle: "స్వాగత మార్గదర్శి",
    tutorialDesc: "చర్చలను అన్వేషించండి, ఆలోచనలను పంచుకోండి మరియు ఓటు వేయండి.",
    skipBtn: "ట్యుటోరియల్ దాటవేయి",
    startBtn: "ప్రారంభించండి",
    feedTitle: "చర్చ ఫీడ్",
    newPostTitle: "కొత్త పోస్ట్ సృష్టించండి",
    postTitleLabel: "పోస్ట్ శీర్షిక",
    postContentLabel: "పోస్ట్ కంటెంట్",
    publishBtn: "పోస్ట్ ప్రచురించు",
    upvote: "అప్ఓట్",
    downvote: "డౌన్‌ఓట్",
    logout: "సైన్ అవుట్ చేయండి"
  },
  kn: { 
    title: "ಸಮುದಾಯ", 
    subtitle: "ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಸೇರಿ", 
    email: "ಇಮೇಲ್ ವಿಳಾಸ", 
    password: "ಪಾಸ್‌ವರ್ಡ್", 
    signIn: "ಸೈನ್ ಇನ್ ಮಾಡಿ", 
    signUp: "ಖಾತೆಯನ್ನು ರಚಿಸಿ", 
    googleBtn: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ", 
    or: "ಅಥವಾ", 
    error: "ದೃಢೀಕರಣ ವಿಫಲವಾಗಿದೆ", 
    success: "ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಸುಸ್ವಾಗತ",
    tutorialTitle: "ಸ್ವಾಗತ ಮಾರ್ಗದರ್ಶಿ",
    tutorialDesc: "ಚರ್ಚೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ಆಲೋಚನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಮತ್ತು ಮತ ಚಲಾಯಿಸಿ.",
    skipBtn: "ಟ್ಯುಟೋರಿಯಲ್ ಬಿಟ್ಟುಬಿಡಿ",
    startBtn: "ಪ್ರಾರಂಭಿಸಿ",
    feedTitle: "ಚರ್ಚೆ ಫೀಡ್",
    newPostTitle: "ಹೊಸ ಪೋಸ್ಟ್ ರಚಿಸಿ",
    postTitleLabel: "ಪೋಸ್ಟ್ ಶೀರ್ಷಿಕೆ",
    postContentLabel: "ಪೋಸ್ಟ್ ವಿಷಯ",
    publishBtn: "ಪೋಸ್ಟ್ ಪ್ರಕಟಿಸಿ",
    upvote: "ಅಪ್‌ವೋಟ್",
    downvote: "ಡೌನ್‌ವೋಟ್",
    logout: "ಸೈನ್ ಔಟ್ ಮಾಡಿ"
  },
  bn: { 
    title: "সম্প্রদায়", 
    subtitle: "নেটওয়ার্কে যোগ দিন", 
    email: "ইমেইল ঠিকানা", 
    password: "পাসওয়ার্ড", 
    signIn: "সাইন ইন করুন", 
    signUp: "অ্যাকাউন্ট তৈরি করুন", 
    googleBtn: "Google এর সাথে চালিয়ে যান", 
    or: "বা", 
    error: "প্রমাণীকরণ ব্যর্থ হয়েছে", 
    success: "নেটওয়ার্কে স্বাগতম",
    tutorialTitle: "স্বাগতম নির্দেশিকা",
    tutorialDesc: "আলোচনা অন্বেষণ করুন, ধারণা শেয়ার করুন এবং ভোট দিন।",
    skipBtn: "টিটোরিয়াল এড়িয়ে যান",
    startBtn: "শুরু করুন",
    feedTitle: "আলোচনা ফিড",
    newPostTitle: "নতুন পোস্ট তৈরি করুন",
    postTitleLabel: "পোস্টের শিরোনাম",
    postContentLabel: "পোস্টের বিষয়বস্তু",
    publishBtn: "পোস্ট প্রকাশ করুন",
    upvote: "সমর্থন",
    downvote: "বিরোধ",
    logout: "সাইন আউট করুন"
  },
  gu: { 
    title: "સમુદાય", 
    subtitle: "નેટવર્કમાં જોડાઓ", 
    email: "ઈમેલ સરનામું", 
    password: "પાસવર્ડ", 
    signIn: "સાઇન ઇન કરો", 
    signUp: "ખાતું બનાવો", 
    googleBtn: "Google સાથે ચાલુ રાખો", 
    or: "અથવા", 
    error: "પ્રમાણીકરણ નિષ્ફળ", 
    success: "નેટવર્કમાં સ્વાગત છે",
    tutorialTitle: "સ્વાગત માર્ગદર્શિકા",
    tutorialDesc: "ચર્ચાઓ અન્વેષણ કરો, વિચારો શેર કરો અને મતદાન કરો.",
    skipBtn: "ટ્યુટોરીયલ છોડો",
    startBtn: "શરૂ કરો",
    feedTitle: "ચર્ચા ફીડ",
    newPostTitle: "નવી પોસ્ટ બનાવો",
    postTitleLabel: "પોસ્ટ શીર્ષક",
    postContentLabel: "પોસ્ટ સામગ્રી",
    publishBtn: "પોસ્ટ પ્રકાશિત કરો",
    upvote: "સમર્થન",
    downvote: "વિરોધ",
    logout: "સાઇન આઉટ કરો"
  },
  pa: { 
    title: "ਭਾਈਚਾਰਾ", 
    subtitle: "ਨੈੱਟਵਰਕ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ", 
    email: "ਈਮੇਲ ਪਤਾ", 
    password: "ਪਾਸਵਰਡ", 
    signIn: "ਸਾਈਨ ਇਨ ਕਰੋ", 
    signUp: "ਖਾਤਾ ਬਣਾਓ", 
    googleBtn: "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ", 
    or: "ਜਾਂ", 
    error: "ਪ੍ਰਮਾਣਿਕਤਾ ਅਸਫਲ", 
    success: "ਨੈੱਟਵਰਕ ਵਿੱਚ ਸੁਆਗਤ ਹੈ",
    tutorialTitle: "ਸਵਾਗਤ ਗਾਈਡ",
    tutorialDesc: "ਚਰਚਾਵਾਂ ਦੀ ਪੜਚੋਲ ਕਰੋ, ਵਿਚਾਰ ਸਾਂਝੇ ਕਰੋ ਅਤੇ ਵੋਟ ਪਾਓ।",
    skipBtn: "ਟਿਊਟੋਰਿਅਲ ਛੱਡੋ",
    startBtn: "ਸ਼ੁਰੂ ਕਰੋ",
    feedTitle: "ਚਰਚਾ ਫੀਡ",
    newPostTitle: "ਨਵੀਂ ਪੋਸਟ ਬਣਾਓ",
    postTitleLabel: "ਪੋਸਟ ਸਿਰਲੇਖ",
    postContentLabel: "ਪੋਸਟ ਸਮੱਗਰੀ",
    publishBtn: "ਪੋਸਟ ਪ੍ਰਕਾਸ਼ਤ ਕਰੋ",
    upvote: "ਸਮਰਥਨ",
    downvote: "ਵਿਰੋਧ",
    logout: "ਸਾਈਨ ਆਉਟ ਕਰੋ"
  },
  ml: { 
    title: "കമ്മ്യൂണിറ്റി", 
    subtitle: "നെറ്റ്‌വർക്കിൽ ചേരുക", 
    email: "ഇമെയിൽ വിലാസം", 
    password: "പാസ്‌വേഡ്", 
    signIn: "സൈൻ ഇൻ ചെയ്യുക", 
    signUp: "അക്കൗണ്ട് സൃഷ്ടിക്കുക", 
    googleBtn: "Google ഉപയോഗിച്ച് തുടരുക", 
    or: "അല്ലെങ്കിൽ", 
    error: "പ്രാമാണീകരണം പരാജയപ്പെട്ടു", 
    success: "നെറ്റ്‌വർയിലേക്ക് സ്വാഗതം",
    tutorialTitle: "സ്വാഗത ഗൈഡ്",
    tutorialDesc: "ചർച്ചകൾ പര്യവേക്ഷണം ചെയ്യുക, ആശയങ്ങൾ പങ്കിടുക, വോട്ട് ചെയ്യുക.",
    skipBtn: "ട്യൂട്ടോറിയൽ ഒഴിവാക്കുക",
    startBtn: "തുടങ്ങുക",
    feedTitle: "ചർച്ച ഫീഡ്",
    newPostTitle: "പുതിയ പോസ്റ്റ് സൃഷ്ടിക്കുക",
    postTitleLabel: "പോസ്റ്റ് തലക്കെട്ട്",
    postContentLabel: "പോസ്റ്റ് ഉള്ളടക്കം",
    publishBtn: "പോസ്റ്റ് പ്രസിദ്ധീകരിക്കുക",
    upvote: "അപ്‌വോട്ട്",
    downvote: "ഡൗൺവോട്ട്",
    logout: "സൈൻ ഔട്ട് ചെയ്യുക"
  },
  or: { 
    title: "ସମ୍ପ୍ରଦାୟ", 
    subtitle: "ନେଟୱାର୍କରେ ଯୋଗ ଦିଅନ୍ତୁ", 
    email: "ଇମେଲ୍ ଠିକଣା", 
    password: "ପାସୱାର୍ଡ", 
    signIn: "ସାଇନ୍ ଇନ୍ କରନ୍ତୁ", 
    signUp: "ଆକାଉଣ୍ଟ୍ ସୃଷ୍ଟି କରନ୍ତୁ", 
    googleBtn: "Google ସହିତ ଜାରି ରଖନ୍ତୁ", 
    or: "କିମ୍ବା", 
    error: "ପ୍ରମାଣୀକରଣ ବିଫଳ ହେଲା", 
    success: "ନେଟୱାର୍କକୁ ସ୍ୱାଗତ",
    tutorialTitle: "ସ୍ୱାଗତ ଗାଇଡ୍",
    tutorialDesc: "ଆଲୋଚନା ଅନ୍ୱେଷଣ କରନ୍ତୁ, ਵਿਚାର ସେୟାର କରନ୍ତୁ ଏବଂ ଭୋଟ୍ ଦିଅନ୍ତୁ।",
    skipBtn: "ଟିଟୋରିଆଲ୍ ଏଡਾନ୍ତୁ",
    startBtn: "ଆରମ୍ଭ କରନ୍ତୁ",
    feedTitle: "ଆଲୋଚନା ଫିଡ୍",
    newPostTitle: "ନୂତନ ପୋଷ୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ",
    postTitleLabel: "ପୋଷ୍ଟ ଶୀର୍ଷକ",
    postContentLabel: "ପୋଷ୍ଟ ସାମଗ୍ରୀ",
    publishBtn: "ପୋଷ୍ଟ ପ୍ରକାଶ କରନ୍ତୁ",
    upvote: "ସମର୍ଥନ",
    downvote: "ବିରୋଧ",
    logout: "ସାଇନ୍ ଆଉଟ୍ କରନ୍ତୁ"
  },
  as: { 
    title: "সম্প্ৰদায়", 
    subtitle: "নেটৱৰ্কত যোগদান কৰক", 
    email: "ইমেইল ঠিকনা", 
    password: "পাছৱৰ্ড", 
    signIn: "ছাইন ইন কৰক", 
    signUp: "একাউণ্ট সৃষ্টি কৰক", 
    googleBtn: "Google ৰ সৈতে আগবাঢ়ক", 
    or: "বা", 
    error: "প্ৰমাণীকৰণ বিফল হৈছে", 
    success: "নেটৱৰ্কলৈ স্বাগতম",
    tutorialTitle: "স্বাগতম নিৰ্দেশিকা",
    tutorialDesc: "আলোচনা অন্বেষণ কৰক, ধাৰণা শ্বেয়াৰ কৰক আৰু ভোট দিয়ক।",
    skipBtn: "টিউট'ৰিয়েল এৰাই চলক",
    startBtn: "আৰম্ভ কৰক",
    feedTitle: "আলোচনা ফিড",
    newPostTitle: "নতুন প'ষ্ট সৃষ্টি কৰক",
    postTitleLabel: "প'ষ্ট শিৰোনাম",
    postContentLabel: "প'ষ্ট সমল",
    publishBtn: "প'ষ্ট প্ৰকাশ কৰক",
    upvote: "সমৰ্থন",
    downvote: "বিৰোধ",
    logout: "ছাইন আউট কৰক"
  },
  ur: { 
    title: "کمیونٹی", 
    subtitle: "نیٹ ورک میں شامل ہوں", 
    email: "ای میل پتہ", 
    password: "پاس ورڈ", 
    signIn: "سائن ان کریں", 
    signUp: "اکاؤنٹ بنائیں", 
    googleBtn: "Google کے ساتھ جاری رکھیں", 
    or: "یا", 
    error: "تصدیق ناکام ہو گئی", 
    success: "نیٹ ورک میں خوش آمدید",
    tutorialTitle: "خوش آمدید گائیڈ",
    tutorialDesc: "بحث و مباحثہ کریں، خیالات کا اشتراک کریں اور ووٹ دیں۔",
    skipBtn: "ٹیوٹوریਅل چھوڑیں",
    startBtn: "شروع کریں",
    feedTitle: "مباحثہ فیڈ",
    newPostTitle: "نئی پوسٹ بنائیں",
    postTitleLabel: "پوسٹ کا عنوان",
    postContentLabel: "پوسটের مواد",
    publishBtn: "پوسٹ شائع کریں",
    upvote: "ووٹ دیں",
    downvote: "خلاف ووٹ",
    logout: "سائن آؤٹ کریں"
  },
  sa: { 
    title: "समुदायः", 
    subtitle: "जालबन्धे सम्मिलितो भवतु", 
    email: "ईमेल-सङ्केतः", 
    password: "कूटशब्दः", 
    signIn: "प्रविशतु", 
    signUp: "खातां निर्मातु", 
    googleBtn: "Google इत्यनेन सह अनुवर्तताम्", 
    or: "अथवा", 
    error: "प्रमाणीकरणं विफलम्", 
    success: "जालबन्धे स्वागतम्",
    tutorialTitle: "स्वागत-निर्देशिका",
    tutorialDesc: "चर्चाः पश्यन्तु, विचारान् प्रस्तौतु, मतानि च यच्छन्तु।",
    skipBtn: "प्रशिक्षणं त्यजतु",
    startBtn: "आरभताम्",
    feedTitle: "चर्चा-प्रवाहः",
    newPostTitle: "नूतनं प्रकाशनं रचयतु",
    postTitleLabel: "शीर्षकम्",
    postContentLabel: "सामग्री",
    publishBtn: "प्रकाश्यताम्",
    upvote: "समर्थनम्",
    downvote: "विरोधः",
    logout: "निर्गच्छतु"
  }
};

export default function Community() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];
  
  const [user, setUser] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Community Reddit-style state
  const [posts, setPosts] = useState([
    { id: 1, title: "Company Security Policy Update", content: "We are enhancing our local data protection protocols across all branches.", author: "admin@anyastro.com", votes: 12 },
    { id: 2, title: "Pune Office Expansion", content: "Our team is scaling operations at Cyber One Baner branch.", author: "arun@anyastro.com", votes: 8 }
  ]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const seenTutorial = localStorage.getItem(`astrosafe_tutorial_${currentUser.uid}`);
        if (!seenTutorial) {
          setShowTutorial(true);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuthAction = async (actionType) => {
    if (!formData.email || !formData.password) return;
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
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
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setStatus({ type: 'success', message: content.success });
    } catch (error) {
      setStatus({ type: 'error', message: content.error });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const dismissTutorial = () => {
    if (user) {
      localStorage.setItem(`astrosafe_tutorial_${user.uid}`, 'true');
    }
    setShowTutorial(false);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const postItem = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: user?.email || "anonymous",
      votes: 1
    };
    setPosts([postItem, ...posts]);
    setNewPost({ title: '', content: '' });
  };

  const handleVote = (id, delta) => {
    setPosts(posts.map(p => p.id === id ? { ...p, votes: p.votes + delta } : p));
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid min-h-screen relative">
      
      {/* First-time Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && user && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 max-w-lg w-full space-y-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-[var(--text-primary)] uppercase tracking-tight">
                {content.tutorialTitle}
              </h2>
              <p className="text-[var(--text-secondary)] font-medium text-lg leading-relaxed">
                {content.tutorialDesc}
              </p>
              <div className="flex gap-4 pt-4 border-t border-[var(--border)]">
                <button 
                  onClick={dismissTutorial}
                  className="flex-1 py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] border border-[var(--border-strong)] font-bold text-xs uppercase tracking-widest transition-all"
                >
                  {content.skipBtn}
                </button>
                <button 
                  onClick={dismissTutorial}
                  className="flex-1 py-3 bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-hover)] text-[var(--brand-white)] font-bold text-xs uppercase tracking-widest transition-all"
                >
                  {content.startBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!user ? (
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
      ) : (
        /* Reddit-style Community Feed Workspace */
        <div className="w-full max-w-4xl space-y-8">
          
          <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                {content.feedTitle}
              </h1>
              <p className="mt-2 font-mono text-sm font-bold text-[var(--text-muted)]">
                {user.email}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] border border-[var(--border-strong)] font-bold text-xs uppercase tracking-widest transition-all"
            >
              {content.logout}
            </button>
          </div>

          {/* Create Post Box */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-6 border-b border-[var(--border)] pb-2">
              {content.newPostTitle}
            </h2>
            <form onSubmit={handleCreatePost} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                  {content.postTitleLabel}
                </label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                  {content.postContentLabel}
                </label>
                <textarea
                  required
                  rows="3"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] border border-[var(--border-strong)] font-bold text-sm uppercase tracking-widest transition-all"
              >
                {content.publishBtn}
              </button>
            </form>
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-[var(--surface)] border border-[var(--border-strong)] p-6 shadow-sm flex gap-6 items-start">
                <div className="flex flex-col items-center justify-center bg-[var(--surface-secondary)] border border-[var(--border)] p-3 min-w-[60px]">
                  <button 
                    onClick={() => handleVote(post.id, 1)}
                    className="text-xs font-bold text-[var(--text-primary)] hover:text-[var(--brand-blue)] uppercase tracking-widest py-1"
                  >
                    +
                  </button>
                  <span className="font-mono font-bold text-[var(--brand-blue)] my-1">
                    {post.votes}
                  </span>
                  <button 
                    onClick={() => handleVote(post.id, -1)}
                    className="text-xs font-bold text-[var(--text-primary)] hover:text-[var(--brand-blue)] uppercase tracking-widest py-1"
                  >
                    -
                  </button>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase">
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}