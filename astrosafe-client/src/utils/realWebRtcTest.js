// src/utils/realWebRtcTest.js

// Simple business translations for 14 Indian languages for status reporting
const webrtcTranslations = {
  en: { unsupported: "Browser not supported", error: "Error checking connection", completed: "Check completed" },
  hi: { unsupported: "ब्राउज़र समर्थित नहीं है", error: "कनेक्शन जांचने में त्रुटि", completed: "जांच पूरी हुई" },
  mr: { unsupported: "ब्राउझर समर्थित नाही", error: "कनेक्शन तपासण्यात त्रुटी", completed: "तपासणी पूर्ण झाली" },
  ta: { unsupported: "உலாவி ஆதரிக்கப்படவில்லை", error: "இணைப்பைச் சரிபார்ப்பதில் பிழை", completed: "சரிபார்ப்பு முடிந்தது" },
  te: { unsupported: "బ్రౌజర్ మద్దతు ఇవ్వదు", error: "కనెక్షన్ తనిఖీ చేయడంలో లోపం", completed: "తనిఖీ పూర్తయింది" },
  kn: { unsupported: "ಬ್ರೌಸರ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ", error: "ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸುವಲ್ಲಿ ದೋಷ", completed: "ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಂಡಿದೆ" },
  bn: { unsupported: "ব্রাউজার সমর্থিত নয়", error: "সংযোগ চেক করতে ত্রুটি", completed: "চেক সম্পন্ন হয়েছে" },
  gu: { unsupported: "બ્રાઉઝર સમર્થિત નથી", error: "કનેક્શન તપાસવામાં ભૂલ", completed: "તપાસ પૂર્ણ થઈ" },
  pa: { unsupported: "ਬ੍ਰਾਊਜ਼ਰ ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ", error: "ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰਨ ਵਿੱਚ ਗਲਤੀ", completed: "ਜਾਂਚ ਪੂਰੀ ਹੋਈ" },
  ml: { unsupported: "ബ്രൗസർ പിന്തുണയ്ക്കുന്നില്ല", error: "കണക്ഷൻ പരിശോധിക്കുന്നതിൽ പിശക്", completed: "പരിശോധന പൂർത്തിയായി" },
  or: { unsupported: "ବ୍ରାଉଜର୍ ସମର୍ଥିତ ନୁହେଁ", error: "କନେକ୍ସନ୍ ଯାଞ୍ଚ କରିବାରେ ତ୍ରୁଟି", completed: "ଯାଞ୍ଚ ସମ୍ପୂର୍ଣ୍ଣ ହେଲା" },
  as: { unsupported: "ব্ৰাউজাৰ সমৰ্থিত নহয়", error: "সংযোগ পৰীক্ষা কৰাত ত্ৰুটি", completed: "পৰীক্ষা সম্পূৰ্ণ হ'ল" },
  ur: { unsupported: "براؤزر تعاون یافتہ نہیں ہے", error: "کنکشن چیک کرنے میں خرابی", completed: "چیک مکمل ہو گیا" },
  sa: { unsupported: "गवेषकः समर्थितः नास्ति", error: "सम्पर्कपरीक्षणे दोषः", completed: "परीक्षणं पूर्णम्" }
};

export const checkWebRtcLeak = (language = 'en') => {
  return new Promise((resolve) => {
    const messages = webrtcTranslations[language] || webrtcTranslations['en'];
    const ips = new Set();
    const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    
    if (!RTCPeerConnection) {
      resolve({ status: 'unsupported', message: messages.unsupported, ips: [] });
      return;
    }

    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    
    // Create a bogus data channel to trigger ICE candidate gathering
    pc.createDataChannel('');
    
    pc.onicecandidate = (e) => {
      if (!e.candidate) {
        pc.close();
        resolve({ status: 'completed', message: messages.completed, ips: Array.from(ips) });
        return;
      }
      
      // Parse the raw SDP string to extract local (private) and public IPs hidden behind NAT
      const ipMatch = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(e.candidate.candidate);
      if (ipMatch && ipMatch[1]) {
        // Exclude local loopback or mDNS addresses if necessary, but capture actual internal/external IPs
        if (!ipMatch[1].endsWith('.local')) {
          ips.add(ipMatch[1]);
        }
      }
    };

    pc.createOffer()
      .then((sdp) => pc.setLocalDescription(sdp))
      .catch(() => {
        resolve({ status: 'error', message: messages.error, ips: [] });
      });

    // Timeout fallback to ensure resolution even if gathering hangs
    setTimeout(() => {
      pc.close();
      resolve({ status: 'completed', message: messages.completed, ips: Array.from(ips) });
    }, 3000);
  });
};