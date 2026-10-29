// src/utils/realCanvasTest.js

// Simple business translations for 14 Indian languages for status reporting
const canvasTranslations = {
  en: { success: "Test completed", error: "Error checking identity" },
  hi: { success: "परीक्षण पूरा हुआ", error: "पहचान जांचने में त्रुटि" },
  mr: { success: "चाचणी पूर्ण झाली", error: "ओळख तपासण्यात त्रुटी" },
  ta: { success: "சோதனை முடிந்தது", error: "அடையாளத்தை சரிபார்ப்பதில் பிழை" },
  te: { success: "పరీక్ష పూర్తయింది", error: "గుర్తింపును తనిఖీ చేయడంలో లోపం" },
  kn: { success: "ಪರೀಕ್ಷೆ ಪೂರ್ಣಗೊಂಡಿದೆ", error: "ಗುರುತನ್ನು ಪರಿಶೀಲಿಸುವಲ್ಲಿ ದೋಷ" },
  bn: { success: "পরীক্ষা সম্পন্ন হয়েছে", error: "পরিচয় পরীক্ষা করতে ত্রুটি" },
  gu: { success: "તપાસ પૂર્ણ થઈ", error: "ઓળખ તપાસવામાં ભૂલ" },
  pa: { success: "ਟੈਸਟ ਪੂਰਾ ਹੋਇਆ", error: "ਪਛਾਣ ਦੀ ਜਾਂਚ ਕਰਨ ਵਿੱਚ ਗਲਤੀ" },
  ml: { success: "പരിശോധന പൂർത്തിയായി", error: "തിരിച്ചറിയൽ പരിശോധിക്കുന്നതിൽ പിശക്" },
  or: { success: "ପରୀକ୍ଷା ସମ୍ପୂର୍ଣ୍ଣ ହେଲା", error: "ପରିଚୟ ଯାଞ୍ଚ କରିବାରେ ତ୍ରୁଟି" },
  as: { success: "পৰীক্ষা সম্পূৰ্ণ হ'ল", error: "পৰিচয় পৰীক্ষা কৰাত ত্ৰুটি" },
  ur: { success: "ٹیسٹ مکمل ہو گیا", error: "شناخت چیک کرنے میں خرابی" },
  sa: { success: "परीक्षणं पूर्णम्", error: "परिचयपरीक्षणे दोषः" }
};

export const generateCanvasFingerprint = (language = 'en') => {
  return new Promise((resolve) => {
    const messages = canvasTranslations[language] || canvasTranslations['en'];
    
    try {
      // Programmatically create an offscreen canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 250;
      canvas.height = 60;

      // Draw standard background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 250, 60);

      // Render specific text with varying fonts, colors, and shadows 
      // to capture exact pixel rendering differences across devices
      ctx.textBaseline = "top";
      ctx.font = "16px 'Arial'";
      ctx.textBaseline = "alphabetic";
      
      // Draw intersecting color blocks
      ctx.fillStyle = "#ff6600";
      ctx.fillRect(125, 1, 62, 20);
      
      // Draw primary text
      ctx.fillStyle = "#006699";
      ctx.fillText("AstroSafe Security Check", 2, 15);
      
      // Draw secondary text with transparency overlay to force anti-aliasing variations
      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
      ctx.fillText("AstroSafe Security Check", 4, 17);

      // Draw shadow block
      ctx.shadowBlur = 10;
      ctx.shadowColor = "blue";
      ctx.fillRect(20, 20, 20, 20);

      // Extract the resulting base64 data URL
      const dataURL = canvas.toDataURL();
      
      // Generate a unique hash (simple 32-bit bitwise hash for business demonstration)
      let hash = 0;
      for (let i = 0; i < dataURL.length; i++) {
        const char = dataURL.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      
      const finalHash = Math.abs(hash).toString(16);

      // Return strictly real diagnostic data, no mock data
      resolve({
        status: 'success',
        message: messages.success,
        hash: finalHash,
        data: dataURL.substring(0, 45) + '...' // Truncated for clean UI display
      });
    } catch (e) {
      resolve({ 
        status: 'error', 
        message: messages.error, 
        hash: null, 
        data: null 
      });
    }
  });
};