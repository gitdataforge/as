import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { 
    title: "Careers", 
    subtitle: "Join Our Team", 
    applyAnyAstro: "Apply at AnyAstro Techno Solutions", 
    anyAstroLink: "View Company Profile", 
    roles: "Available Roles", 
    role1: "Security Analyst", 
    role2: "Customer Support", 
    name: "Full Name", 
    email: "Email Address", 
    role: "Select Role", 
    submit: "Submit Application", 
    track: "Track Application", 
    pass: "Password", 
    login: "Sign In", 
    register: "Create Account", 
    logout: "Sign Out", 
    statusLabel: "Application Status", 
    statusReview: "Under Review", 
    error: "Authentication Failed", 
    success: "Account Access Granted", 
    loading: "Processing...",
    trackerTitle: "Application Tracker Workspace",
    trackerEmpty: "No active submissions found. Submit an application to track status.",
    roleHeader: "Role",
    dateHeader: "Date",
    statusHeader: "Status",
    actionHeader: "Action",
    withdraw: "Withdraw"
  },
  hi: { 
    title: "करियर", 
    subtitle: "हमारी टीम में शामिल हों", 
    applyAnyAstro: "AnyAstro Techno Solutions में आवेदन करें", 
    anyAstroLink: "कंपनी प्रोफ़ाइल देखें", 
    roles: "उपलब्ध भूमिकाएं", 
    role1: "सुरक्षा विश्लेषक", 
    role2: "ग्राहक सहायता", 
    name: "पूरा नाम", 
    email: "ईमेल पता", 
    role: "भूमिका चुनें", 
    submit: "आवेदन जमा करें", 
    track: "आवेदन ट्रैक करें", 
    pass: "पासवर्ड", 
    login: "साइन इन करें", 
    register: "खाता बनाएं", 
    logout: "साइन आउट करें", 
    statusLabel: "आवेदन की स्थिति", 
    statusReview: "समीक्षाधीन", 
    error: "प्रमाणीकरण विफल", 
    success: "खाता पहुंच स्वीकृत", 
    loading: "प्रक्रिया में...",
    trackerTitle: "आवेदन ट्रैकर कार्यक्षेत्र",
    trackerEmpty: "कोई सक्रिय आवेदन नहीं मिला। स्थिति ट्रैक करने के लिए आवेदन जमा करें।",
    roleHeader: "भूमिका",
    dateHeader: "दिनांक",
    statusHeader: "स्थिति",
    actionHeader: "कार्रवाई",
    withdraw: "वापस लें"
  },
  mr: { 
    title: "करिअर", 
    subtitle: "आमच्या संघात सामील व्हा", 
    applyAnyAstro: "AnyAstro Techno Solutions मध्ये अर्ज करा", 
    anyAstroLink: "कंपनी प्रोफाइल पहा", 
    roles: "उपलब्ध भूमिका", 
    role1: "सुरक्षा विश्लेषक", 
    role2: "ग्राहक समर्थन", 
    name: "पूर्ण नाव", 
    email: "ईमेल पत्ता", 
    role: "भूमिका निवडा", 
    submit: "अर्ज सबमिट करा", 
    track: "अर्ज ट्रॅक करा", 
    pass: "पासवर्ड", 
    login: "साइन इन करा", 
    register: "खाते तयार करा", 
    logout: "साइन आउट करा", 
    statusLabel: "अर्जाची स्थिती", 
    statusReview: "पुनरावलोकनाधीन", 
    error: "प्रमाणीकरण अयशस्वी", 
    success: "खाते प्रवेश मंजूर", 
    loading: "प्रक्रिया करत आहे...",
    trackerTitle: "अर्ज ट्रॅकर कार्यक्षेत्र",
    trackerEmpty: "कोणतेही सक्रिय अर्ज आढळले नाहीत. स्थिती ट्रॅक करण्यासाठी अर्ज सबमिट करा.",
    roleHeader: "भूमिका",
    dateHeader: "दिनांक",
    statusHeader: "स्थिती",
    actionHeader: "कृती",
    withdraw: "माघार घ्या"
  },
  ta: { 
    title: "தொழில்", 
    subtitle: "எங்கள் குழுவில் சேரவும்", 
    applyAnyAstro: "AnyAstro Techno Solutions இல் விண்ணப்பிக்கவும்", 
    anyAstroLink: "நிறுவனத்தின் சுயவிவரத்தைக் காண்க", 
    roles: "கிடைக்கும் பாத்திரங்கள்", 
    role1: "பாதுகாப்பு ஆய்வாளர்", 
    role2: "வாடிக்கையாளர் ஆதரவு", 
    name: "முழு பெயர்", 
    email: "மின்னஞ்சல் முகவரி", 
    role: "பாத்திரத்தைத் தேர்ந்தெடுக்கவும்", 
    submit: "விண்ணப்பத்தை சமர்ப்பிக்கவும்", 
    track: "விண்ணப்பத்தை கண்காணிக்கவும்", 
    pass: "கடவுச்சொல்", 
    login: "உள்நுழைக", 
    register: "கணக்கை உருவாக்கு", 
    logout: "வெளியேறு", 
    statusLabel: "விண்ணப்ப நிலை", 
    statusReview: "மதிப்பாய்வில் உள்ளது", 
    error: "அங்கீகாரம் தோல்வியடைந்தது", 
    success: "கணக்கு அணுகல் வழங்கப்பட்டது", 
    loading: "செயலாக்கப்படுகிறது...",
    trackerTitle: "விண்ணப்ப கண்காணிப்பு பணியிடம்",
    trackerEmpty: "செயலில் உள்ள விண்ணப்பங்கள் எதுவும் இல்லை. நிலையை கண்காணிக்க விண்ணப்பிக்கவும்.",
    roleHeader: "பங்கு",
    dateHeader: "தேதி",
    statusHeader: "நிலை",
    actionHeader: "செயல்",
    withdraw: "திரும்பப் பெறு"
  },
  te: { 
    title: "కెరీర్‌లు", 
    subtitle: "మా బృందంలో చేరండి", 
    applyAnyAstro: "AnyAstro Techno Solutions లో దరఖాస్తు చేయండి", 
    anyAstroLink: "కంపెనీ ప్రొఫైల్‌ను వీక్షించండి", 
    roles: "అందుబాటులో ఉన్న పాత్రలు", 
    role1: "భద్రతా విశ్లేషకుడు", 
    role2: "కస్టమర్ మద్దతు", 
    name: "పూర్తి పేరు", 
    email: "ఇమెయిల్ చిరునామా", 
    role: "పాత్రను ఎంచుకోండి", 
    submit: "దరఖాస్తును సమర్పించండి", 
    track: "దరఖాస్తును ట్రాక్ చేయండి", 
    pass: "పాస్‌వర్డ్", 
    login: "సైన్ ఇన్ చేయండి", 
    register: "ఖాతాను సృష్టించండి", 
    logout: "సైన్ అవుట్ చేయండి", 
    statusLabel: "దరఖాస్తు స్థితి", 
    statusReview: "సమీక్షలో ఉంది", 
    error: "ప్రమాణీకరణ విఫలమైంది", 
    success: "ఖాతా ప్రాప్యత మంజూరు చేయబడింది", 
    loading: "ప్రాసెస్ చేయబడుతోంది...",
    trackerTitle: "దరఖాస్తు ట్రాకర్ వర్క్‌స్పేస్",
    trackerEmpty: "క్రియాశీల దరఖాస్తులు కనుగొనబడలేదు. స్థితిని ట్రాక్ చేయడానికి దరఖాస్తు చేయండి.",
    roleHeader: "పాత్ర",
    dateHeader: "తేదీ",
    statusHeader: "స్థితి",
    actionHeader: "చర్య",
    withdraw: "ఉపసంహరించు"
  },
  kn: { 
    title: "ವೃತ್ತಿಜೀವನ", 
    subtitle: "ನಮ್ಮ ತಂಡಕ್ಕೆ ಸೇರಿ", 
    applyAnyAstro: "AnyAstro Techno Solutions ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", 
    anyAstroLink: "ಕಂಪನಿಯ ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ", 
    roles: "ಲಭ್ಯವಿರುವ ಪಾತ್ರಗಳು", 
    role1: "ಭದ್ರತಾ ವಿಶ್ಲೇಷಕ", 
    role2: "ಗ್ರಾಹಕ ಬೆಂಬಲ", 
    name: "ಪೂರ್ಣ ಹೆಸರು", 
    email: "ಇಮೇಲ್ ವಿಳಾಸ", 
    role: "ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ", 
    submit: "ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ", 
    track: "ಅರ್ಜಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ", 
    pass: "ಪಾಸ್‌ವರ್ಡ್", 
    login: "ಸೈನ್ ಇನ್ ಮಾಡಿ", 
    register: "ಖಾತೆಯನ್ನು ರಚಿಸಿ", 
    logout: "ಸೈನ್ ಔಟ್ ಮಾಡಿ", 
    statusLabel: "ಅರ್ಜಿಯ ಸ್ಥಿತಿ", 
    statusReview: "ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ", 
    error: "ದೃಢೀಕರಣ ವಿಫಲವಾಗಿದೆ", 
    success: "ಖಾತೆ ಪ್ರವೇಶವನ್ನು ನೀಡಲಾಗಿದೆ", 
    loading: "ಸಂಸ್ಕರಿಸಲಾಗುತ್ತಿದೆ...",
    trackerTitle: "ಅರ್ಜಿ ಟ್ರ್ಯಾಕರ್ ಕಾರ್ಯಕ್ಷೇತ್ರ",
    trackerEmpty: "ಸಕ್ರಿಯ ಅರ್ಜಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
    roleHeader: "ಪಾತ್ರ",
    dateHeader: "ದಿನಾಂಕ",
    statusHeader: "ಸ್ಥಿತಿ",
    actionHeader: "ಕ್ರಿಯೆ",
    withdraw: "ಹಿಂತೆಗೆದುಕೊಳ್ಳಿ"
  },
  bn: { 
    title: "ক্যারিয়ার", 
    subtitle: "আমাদের দলে যোগ দিন", 
    applyAnyAstro: "AnyAstro Techno Solutions এ আবেদন করুন", 
    anyAstroLink: "কোম্পানির প্রোফাইল দেখুন", roles: "উপলব্ধ ভূমিকা", 
    role1: "নিরাপত্তা বিশ্লেষক", 
    role2: "গ্রাহক সমর্থন", 
    name: "পুরো নাম", 
    email: "ইমেইল ঠিকানা", 
    role: "ভূমিকা নির্বাচন করুন", 
    submit: "আবেদন জমা দিন", 
    track: "আবেদন ট্র্যাক করুন", 
    pass: "পাসওয়ার্ড", 
    login: "সাইন ইন করুন", 
    register: "অ্যাকাউন্ট তৈরি করুন", 
    logout: "সাইন আউট করুন", 
    statusLabel: "আবেদনের অবস্থা", 
    statusReview: "পর্যালোচনার অধীনে", 
    error: "প্রমাণীকরণ ব্যর্থ হয়েছে", 
    success: "অ্যাকাউন্ট অ্যাক্সেস মঞ্জুর করা হয়েছে", 
    loading: "প্রক্রিয়াজাত করা হচ্ছে...",
    trackerTitle: "আবেদন ট্র্যাকার কাজের জায়গা",
    trackerEmpty: "কোনো সক্রিয় আবেদন পাওয়া যায়নি। স্থিতি ট্র্যাক করতে আবেদন জমা দিন।",
    roleHeader: "ভূমিকা",
    dateHeader: "তারিখ",
    statusHeader: "অবস্থা",
    actionHeader: "কার্যক্রম",
    withdraw: "প্রত্যাহার"
  },
  gu: { 
    title: "કારકિર્દી", 
    subtitle: "અમારી ટીમમાં જોડાઓ", 
    applyAnyAstro: "AnyAstro Techno Solutions માં અરજી કરો", 
    anyAstroLink: "કંપની પ્રોફાઇલ જુઓ", 
    roles: "ઉપલબ્ધ ભૂમિકાઓ", 
    role1: "સુરક્ષા વિશ્લેષક", 
    role2: "ગ્રાહક આધાર", 
    name: "પૂરું નામ", 
    email: "ઈમેલ સરનામું", 
    role: "ભૂમિકા પસંદ કરો", 
    submit: "અરજી સબમિટ કરો", 
    track: "અરજી ટ્રૅક કરો", 
    pass: "પાસવર્ડ", 
    login: "સાઇન ઇન કરો", 
    register: "ખાતું બનાવો", 
    logout: "સાઇન આઉટ કરો", 
    statusLabel: "અરજીની સ્થિતિ", 
    statusReview: "સમીક્ષા હેઠળ", 
    error: "પ્રમાણીકરણ નિષ્ફળ", 
    success: "ખાતાની ઍક્સેસ મંજૂર", 
    loading: "પ્રક્રિયા થઈ રહી છે...",
    trackerTitle: "અરજી ટ્રૅકર કાર્યક્ષેત્ર",
    trackerEmpty: "કોઈ સક્રિય અરજીઓ મળી નથી. સ્થિતિ ટ્રૅક કરવા માટે અરજી સબમિટ કરો.",
    roleHeader: "ભૂમિકા",
    dateHeader: "તારીખ",
    statusHeader: "સ્થિતિ",
    actionHeader: "ક્રિયા",
    withdraw: "પાછી ખેંચੋ"
  },
  pa: { 
    title: "ਕਰੀਅਰ", 
    subtitle: "ਸਾਡੀ ਟੀਮ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ", 
    applyAnyAstro: "AnyAstro Techno Solutions ਵਿਖੇ ਅਪਲਾਈ ਕਰੋ", 
    anyAstroLink: "ਕੰਪਨੀ ਪ੍ਰੋਫਾਈਲ ਦੇਖੋ", 
    roles: "ਉਪਲਬਧ ਭੂਮਿਕਾਵਾਂ", 
    role1: "ਸੁਰੱਖਿਆ ਵਿਸ਼ਲੇਸ਼ਕ", 
    role2: "ਗਾਹਕ ਸਹਾਇਤਾ", 
    name: "ਪੂਰਾ ਨਾਮ", 
    email: "ਈਮੇਲ ਪਤਾ", 
    role: "ਭੂਮਿਕਾ ਚੁਣੋ", 
    submit: "ਐਪਲੀਕੇਸ਼ਨ ਜਮ੍ਹਾਂ ਕਰੋ", 
    track: "ਐਪਲੀਕੇਸ਼ਨ ਟਰੈਕ ਕਰੋ", 
    pass: "ਪਾਸਵਰਡ", 
    login: "ਸਾਈਨ ਇਨ ਕਰੋ", 
    register: "ਖਾਤਾ ਬਣਾਓ", 
    logout: "ਸਾਈਨ ਆਉਟ ਕਰੋ", 
    statusLabel: "ਐਪਲੀਕੇਸ਼ਨ ਸਥਿਤੀ", 
    statusReview: "ਸਮੀਖਿਆ ਅਧੀਨ", 
    error: "ਪ੍ਰਮਾਣਿਕਤਾ ਅਸਫਲ", 
    success: "ਖਾਤਾ ਪਹੁੰਚ ਮਨਜ਼ੂਰ", 
    loading: "ਕਾਰਵਾਈ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...",
    trackerTitle: "ਐਪਲੀਕੇਸ਼ਨ ਟਰੈਕਰ ਵਰక్‌ਸਪੇਸ",
    trackerEmpty: "ਕਈ ਸਰਗਰਮ ਅਰਜ਼ੀਆਂ ਨਹੀਂ ਮਿਲੀਆਂ। ਸਥਿਤੀ ਟਰੈਕ ਕਰਨ ਲਈ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰੋ।",
    roleHeader: "ਭੂਮਿਕਾ",
    dateHeader: "ਮਿਤੀ",
    statusHeader: "ਸਥਿਤੀ",
    actionHeader: "ਕਾਰਵਾਈ",
    withdraw: "ਵਾਪस ਲਓ"
  },
  ml: { 
    title: "കരിയർ", 
    subtitle: "ഞങ്ങളുടെ ടീമിൽ ചേരുക", 
    applyAnyAstro: "AnyAstro Techno Solutions ൽ അപേക്ഷിക്കുക", 
    anyAstroLink: "കമ്പനി പ്രൊഫൈൽ കാണുക", 
    roles: "ലഭ്യമായ റോളുകൾ", 
    role1: "സുരക്ഷാ അനലിസ്റ്റ്", 
    role2: "ഉപഭോക്തൃ പിന്തുണ", 
    name: "മുഴുവൻ പേര്", 
    email: "ഇമെയിൽ വിലാസം", 
    role: "റോൾ തിരഞ്ഞെടുക്കുക", 
    submit: "അപേക്ഷ സമർപ്പിക്കുക", 
    track: "അപേക്ഷ ട്രാക്ക് ചെയ്യുക", 
    pass: "പാസ്‌വേഡ്", 
    login: "സൈൻ ഇൻ ചെയ്യുക", 
    register: "അക്കൗണ്ട് സൃഷ്ടിക്കുക", 
    logout: "സൈൻ ഔട്ട് ചെയ്യുക", 
    statusLabel: "അപേക്ഷയുടെ നില", 
    statusReview: "അവലോകനത്തിലാണ്", 
    error: "പ്രാമാണീകരണം പരാജയപ്പെട്ടു", 
    success: "അക്കൗണ്ട് ആക്സസ് അനുവദിച്ചു", 
    loading: "പ്രോസസ്സ് ചെയ്യുന്നു...",
    trackerTitle: "അപേക്ഷ ട്രാക്കർ വർക്ക്‌സ്‌പേസ്",
    trackerEmpty: "സജീവമായ അപേക്ഷകൾ ഒന്നും കണ്ടെത്തിയില്ല. നില ട്രാക്ക് ചെയ്യാൻ അപേക്ഷ സമർപ്പിക്കുക.",
    roleHeader: "റോൾ",
    dateHeader: "തീയതി",
    statusHeader: "നില",
    actionHeader: "പ്രവർത്തനം",
    withdraw: "പിൻവലിക്കുക"
  },
  or: { 
    title: "କ୍ୟାରିଅର୍", 
    subtitle: "ଆମ ଦଳରେ ଯୋଗ ଦିଅନ୍ତୁ", 
    applyAnyAstro: "AnyAstro Techno Solutions ରେ ଆବେଦନ କରନ୍ତୁ", 
    anyAstroLink: "କମ୍ପାନୀ ପ୍ରୋଫାଇଲ୍ ଦେଖନ୍ତୁ", 
    roles: "ଉପଲବ୍ଧ ଭୂମିକାଗୁଡ଼ିକ", 
    role1: "ସୁରକ୍ଷା ବିଶ୍ଳେଷକ", 
    role2: "ଗ୍ରାହକ ସମର୍ଥନ", 
    name: "ପୂରା ନାମ", 
    email: "ଇମେଲ୍ ଠିକଣା", 
    role: "ଭୂମିକା ବାଛନ୍ତୁ", 
    submit: "ଆବେଦନ ଜମା କରନ୍ତୁ", 
    track: "ଆବେଦନ ଟ୍ରାକ୍ କରନ୍ତୁ", 
    pass: "ପାସୱାର୍ଡ", 
    login: "ସାଇନ୍ ଇନ୍ କରନ୍ତୁ", 
    register: "ଆକାଉଣ୍ଟ୍ ସୃଷ୍ଟି କରନ୍ତୁ", 
    logout: "ସାଇନ୍ ଆଉଟ୍ କରନ୍ତୁ", 
    statusLabel: "ଆବେଦନ ସ୍ଥିତି", 
    statusReview: "ସମୀକ୍ଷାଧୀନ ଅଛି", 
    error: "ପ୍ରମାଣୀକରଣ ବିଫଳ ହେଲା", 
    success: "ଆକାଉଣ୍ଟ୍ ଆକ୍ସେସ୍ ପ୍ରଦାନ କରାଗଲା", 
    loading: "ପ୍ରକ୍ରିୟାକରଣ ଚାଲିଛି...",
    trackerTitle: "ଆବେଦନ ଟ୍ରାକର୍ କାର୍ଯ୍ୟକ୍ଷେତ୍ର",
    trackerEmpty: "କୌଣସି ସକ୍ରିୟ ଆବେଦନ ମିଳିଲା ନାହିଁ। ସ୍ଥିତି ଟ୍ରାକ୍ କରିବାକୁ ଆବେଦନ ଜମା କରନ୍ତୁ।",
    roleHeader: "ଭୂମିକା",
    dateHeader: "ତାରିଖ",
    statusHeader: "ସ୍ଥିତି",
    actionHeader: "କାର୍ଯ୍ୟ",
    withdraw: "ପ୍ରତ୍ୟାହାର"
  },
  as: { 
    title: "কেৰিয়াৰ", 
    subtitle: "আমাৰ দলত যোগদান কৰক", 
    applyAnyAstro: "AnyAstro Techno Solutions ত আবেদন কৰক", 
    anyAstroLink: "কোম্পানীৰ প্ৰোফাইল চাওক", 
    roles: "উপলব্ধ ভূমিকাসমূহ", 
    role1: "সুৰক্ষা বিশ্লেষক", 
    role2: "গ্ৰাহক সমৰ্থন", 
    name: "সম্পূৰ্ণ নাম", 
    email: "ইমেইল ঠিকনা", 
    role: "ভূমিকা বাছনি কৰক", 
    submit: "আবেদন জমা দিয়ক", 
    track: "আবেদন ট্ৰেক কৰক", 
    pass: "পাছৱৰ্ড", 
    login: "ছাইন ইন কৰক", 
    register: "একাউণ্ট সৃষ্টি কৰক", 
    logout: "ছাইন আউট কৰক", 
    statusLabel: "আবেদনৰ স্থিতি", 
    statusReview: "পৰ্যালোচনাৰ অধীনত", 
    error: "প্ৰমাণীকৰণ বিফল হৈছে", 
    success: "একাউণ্ট প্ৰৱেশাধিকাৰ প্ৰদান কৰা হ'ল", 
    loading: "প্ৰক্ৰিয়াকৰণ চলি আছে...",
    trackerTitle: "আবেদন ট্ৰেকাৰ কৰ্মক্ষেত্ৰ",
    trackerEmpty: "কোনো সক্ক্রিয় আবেদন পোৱা নগ'ল। স্থিতি ট্ৰেক কৰিবলৈ আবেদন জমা দিয়ক।",
    roleHeader: "ভূমিকা",
    dateHeader: "তাৰিখ",
    statusHeader: "স্থিতি",
    actionHeader: "কাৰ্য",
    withdraw: "প্ৰত্যাহাৰ"
  },
  ur: { 
    title: "کیریئر", 
    subtitle: "ہماری ٹیم میں شامل ہوں", 
    applyAnyAstro: "AnyAstro Techno Solutions میں اپلائی کریں", 
    anyAstroLink: "کمپنی پروفائل دیکھیں", 
    roles: "دستیاب کردار", 
    role1: "سیکیورٹی تجزیہ کار", 
    role2: "کسٹمر سپورٹ", 
    name: "پورا نام", 
    email: "ای میل پتہ", 
    role: "کردار منتخب کریں", 
    submit: "درخواست جمع کرائیں", 
    track: "درخواست ٹریک کریں", 
    pass: "پاس ورڈ", 
    login: "سائن ان کریں", 
    register: "اکاؤنٹ بنائیں", 
    logout: "سائن آؤٹ کریں", 
    statusLabel: "درخواست کی حیثیت", 
    statusReview: "زیر جائزہ", 
    error: "تصدیق ناکام ہو گئی", 
    success: "اکاؤنٹ تک رسائی مل گئی", 
    loading: "عمل ہو رہا ہے...",
    trackerTitle: "درخواست ٹریکر ورک اسپیس",
    trackerEmpty: "کوئی فعال درخواست نہیں ملی۔ حیثیت ٹریک کرنے کے لیے درخواست جمع کریں۔",
    roleHeader: "کردار",
    dateHeader: "تاریخ",
    statusHeader: "حالت",
    actionHeader: "عمل",
    withdraw: "वापस लें"
  },
  sa: { 
    title: "वृत्तिः", 
    subtitle: "अस्माकं दले सम्मिलितो भवतु", 
    applyAnyAstro: "AnyAstro Techno Solutions इत्यत्र आवेदनं करोतु", 
    anyAstroLink: "समवाय-परिचयं पश्यतु", 
    roles: "उपलभ्य-पदानि", 
    role1: "सुरक्षा-विश्लेषकः", 
    role2: "ग्राहक-सहायता", 
    name: "पूर्णं नाम", 
    email: "ईमेल-सङ्केतः", 
    role: "पदं चिनोतु", 
    submit: "आवेदनं प्रस्तौतु", 
    track: "आवेदनम् अनुसरतु", 
    pass: "कूटशब्दः", 
    login: "प्रविशतु", 
    register: "खातां निर्मातु", 
    logout: "निर्गच्छतु", 
    statusLabel: "आवेदन-स्थितिः", 
    statusReview: "समीक्षाधीना", 
    error: "प्रमाणीकरणं विफलम्", 
    success: "खाता-प्रवेशः स्वीकृतः", 
    loading: "प्रक्रिया चलति...",
    trackerTitle: "आवेदन-अनुसरण-कार्यक्षेत्रम्", 
    trackerEmpty: "किमपि सक्रियम् आवेदनं न प्राप्तम्। स्थितिम् अनुसरितुम् आवेदनं प्रस्तौतु।",
    roleHeader: "पदम्",
    dateHeader: "दिनांकः",
    statusHeader: "स्थितिः",
    actionHeader: "कर्म",
    withdraw: "प्रत्याहरतु"
  }
};

export default function Careers() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];

  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [appForm, setAppForm] = useState({ name: '', email: '', role: 'Security Analyst' });
  const [authStatus, setAuthStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Application tracker state
  const [submissions, setSubmissions] = useState([
    { id: 1, role: "Security Analyst", date: "2026-10-01", status: "Under Review" }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleAppChange = (e) => {
    setAppForm({ ...appForm, [e.target.name]: e.target.value });
  };

  const executeAuth = async (isLogin) => {
    if (!authForm.email || !authForm.password) return;
    setLoading(true);
    setAuthStatus({ type: '', message: '' });
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, authForm.email, authForm.password);
      } else {
        await createUserWithEmailAndPassword(auth, authForm.email, authForm.password);
      }
      setAuthStatus({ type: 'success', message: content.success });
      setAuthForm({ email: '', password: '' });
    } catch (error) {
      setAuthStatus({ type: 'error', message: content.error });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAuthStatus({ type: '', message: '' });
  };

  const submitApplication = (e) => {
    e.preventDefault();
    const newSub = {
      id: Date.now(),
      role: appForm.role,
      date: new Date().toISOString().split('T')[0],
      status: "Under Review"
    };
    setSubmissions([newSub, ...submissions]);

    const supportEmail = "careers@anyastro.com";
    const subject = encodeURIComponent(`Job Application: ${appForm.role} - ${appForm.name}`);
    const body = encodeURIComponent(`Applicant Name: ${appForm.name}\nApplicant Email: ${appForm.email}\nRole Applied: ${appForm.role}\n\nPlease attach your resume to this email.`);
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    setAppForm({ name: '', email: '', role: 'Security Analyst' });
  };

  const handleWithdraw = (id) => {
    setSubmissions(submissions.filter(s => s.id !== id));
  };

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl space-y-12"
      >
        {/* Page Header */}
        <div className="border-b border-[var(--border-strong)] pb-6 bg-[var(--surface)] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {content.title}
            </h1>
            <p className="mt-2 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm">
              {content.subtitle}
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
              {content.applyAnyAstro}
            </span>
            <a 
              href="https://rebrand.ly/aatns" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-hover)] text-[var(--brand-white)] font-bold transition-all uppercase tracking-widest text-sm shadow-sm"
            >
              {content.anyAstroLink}
            </a>
          </div>
        </div>

        {/* Custom Animated Corporate Iconography */}
        <div className="w-full h-32 bg-[var(--surface-secondary)] border border-[var(--border-strong)] overflow-hidden relative flex items-center justify-center">
          <motion.div 
            animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          />
          <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--text-primary)" strokeWidth="1.5" fill="none" className="z-10">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Job Application Form */}
          <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-6 border-b border-[var(--border)] pb-2">
              {content.roles}
            </h2>
            
            <form onSubmit={submitApplication} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                  {content.name}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={appForm.name}
                  onChange={handleAppChange}
                  className="w-full bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                  {content.email}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={appForm.email}
                  onChange={handleAppChange}
                  className="w-full bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                  {content.role}
                </label>
                <select
                  name="role"
                  required
                  value={appForm.role}
                  onChange={handleAppChange}
                  className="w-full bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors appearance-none"
                >
                  <option value="Security Analyst">{content.role1}</option>
                  <option value="Customer Support">{content.role2}</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-strong)] font-bold text-sm uppercase tracking-widest shadow-sm transition-all"
              >
                {content.submit}
              </button>
            </form>
          </div>

          {/* Authentication & Tracking Dashboard */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col">
            <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wider mb-6 border-b border-[var(--border-strong)] pb-2">
              {content.track}
            </h2>

            {!user ? (
              <div className="space-y-6 flex-grow flex flex-col justify-center">
                {authStatus.message && (
                  <div className={`p-4 border font-bold text-center text-sm ${authStatus.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500' : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-500'}`}>
                    {authStatus.message}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                    {content.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={authForm.email}
                    onChange={handleAuthChange}
                    className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                    {content.pass}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={authForm.password}
                    onChange={handleAuthChange}
                    className="w-full bg-[var(--surface)] border border-[var(--border-strong)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-blue)] focus:ring-1 focus:ring-[var(--brand-blue)] transition-colors"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={() => executeAuth(true)}
                    disabled={loading}
                    className="flex-1 py-3 bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-hover)] text-[var(--brand-white)] font-bold transition-colors border border-transparent shadow-sm uppercase tracking-widest text-xs disabled:opacity-50"
                  >
                    {loading ? content.loading : content.login}
                  </button>
                  <button 
                    onClick={() => executeAuth(false)}
                    disabled={loading}
                    className="flex-1 py-3 bg-[var(--brand-black)] hover:bg-[var(--surface-hover)] text-[var(--brand-white)] hover:text-[var(--text-primary)] font-bold transition-colors border border-transparent hover:border-[var(--border-strong)] shadow-sm uppercase tracking-widest text-xs disabled:opacity-50"
                  >
                    {loading ? content.loading : content.register}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col justify-between space-y-6 py-4">
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-4">
                    <div>
                      <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">
                        {content.email}
                      </h3>
                      <p className="font-mono text-[var(--text-primary)] font-bold text-sm">
                        {user.email}
                      </p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 bg-[var(--brand-black)] text-[var(--brand-white)] font-bold uppercase tracking-widest text-xs hover:bg-[var(--surface-hover)] transition-colors"
                    >
                      {content.logout}
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                    {content.trackerTitle}
                  </h3>

                  {submissions.length === 0 ? (
                    <p className="text-sm text-[var(--text-secondary)] font-medium italic py-4 text-center">
                      {content.trackerEmpty}
                    </p>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {submissions.map((sub) => (
                        <div key={sub.id} className="bg-[var(--surface)] border border-[var(--border-strong)] p-4 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-[var(--text-primary)] text-sm">{sub.role}</p>
                            <p className="font-mono text-[var(--text-muted)] mt-1">{sub.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-[var(--brand-blue)] font-bold uppercase">
                              {sub.status}
                            </span>
                            <button 
                              onClick={() => handleWithdraw(sub.id)}
                              className="text-red-600 hover:text-red-800 font-bold uppercase tracking-widest"
                            >
                              {content.withdraw}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}