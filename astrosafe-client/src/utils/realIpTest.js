// src/utils/realIpTest.js

// Simple business translations for 14 Indian languages for error reporting
const statusTranslations = {
  en: "Unable to detect connection",
  hi: "कनेक्शन का पता नहीं लगा सके",
  mr: "कनेक्शन शोधता आले नाही",
  ta: "இணைப்பை கண்டறிய முடியவில்லை",
  te: "కనెక్షన్‌ని కనుగొనలేకపోయాము",
  kn: "ಸಂಪರ್ಕವನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ",
  bn: "সংযোগ সনাক্ত করতে অক্ষম",
  gu: "કનેક્શન શોધી શક્યા નથી",
  pa: "ਕਨੈਕਸ਼ਨ ਦਾ ਪਤਾ ਨਹੀਂ ਲੱਗ ਸਕਿਆ",
  ml: "കണക്ഷൻ കണ്ടെത്താനായില്ല",
  or: "ସଂଯୋଗ ଚିହ୍ନଟ କରିବାରେ ଅସମର୍ଥ",
  as: "সংযোগ ধৰা পেলাব পৰা নগ'ল",
  ur: "کنکشن کا پتہ لگانے سے قاصر",
  sa: "सम्पर्कं ज्ञातुं असमर्थः"
};

export const fetchRealIp = async (language = 'en') => {
  const errorMessage = statusTranslations[language] || statusTranslations['en'];
  
  try {
    // Real-time asynchronous fetch to a reliable IP reflection API (supports IPv4 and IPv6)
    const response = await fetch('https://api64.ipify.org?format=json');
    
    if (!response.ok) {
      throw new Error('Network response failed');
    }
    
    const data = await response.json();
    
    // Strictly real network data, no mock IPs
    return { 
      ip: data.ip, 
      status: 'success'
    };
  } catch (error) {
    return { 
      ip: errorMessage, 
      status: 'error'
    };
  }
};