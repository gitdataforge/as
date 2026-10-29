/** @type {import('tailwindcss').Config} */

// System Status Translations for 14 Indian Languages
// en: Design configuration saved successfully
// hi: डिज़ाइन कॉन्फ़िगरेशन सफलतापूर्वक सहेजा गया
// mr: डिझाइन कॉन्फिगरेशन यशस्वीरित्या जतन केले
// ta: வடிவமைப்பு கட்டமைப்பு வெற்றிகரமாக சேமிக்கப்பட்டது
// te: డిజైన్ కాన్ఫిగరేషన్ విజయవంతంగా సేవ్ చేయబడింది
// kn: ವಿನ್ಯಾಸ ಕಾನ್ಫಿಗರೇಶನ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ
// bn: ডিজাইন কনফিগারেশন সফলভাবে সংরক্ষণ করা হয়েছে
// gu: ડિઝાઇન રૂપરેખાંકન સફળતાપૂર્વક સાચવવામાં આવ્યું
// pa: ਡਿਜ਼ਾਈਨ ਸੰਰਚਨਾ ਸਫਲਤਾਪੂਰਵਕ ਸੁਰੱਖਿਅਤ ਕੀਤੀ ਗਈ
// ml: ഡിസൈൻ കോൺഫിഗറേഷൻ വിജയകരമായി സംരക്ഷിച്ചു
// or: ଡିଜାଇନ୍ କନଫିଗରେସନ୍ ସଫଳତାର ସହ ସେଭ୍ ହେଲା
// as: ডিজাইন কনফিগাৰেচন সফলভাৱে চেভ কৰা হ'ল
// ur: ڈیزائن کنفیگریشن کامیابی کے ساتھ محفوظ ہو گئی
// sa: आकल्पन-विन्यासः साफल्येन रक्षितः

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: 'var(--brand-black)',
          white: 'var(--brand-white)',
          blue: 'var(--brand-blue)',
          blueHover: 'var(--brand-blue-hover)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          secondary: 'var(--background-secondary)',
          hover: 'var(--surface-hover)',
          elevated: 'var(--surface-elevated)',
        },
        text: {
          primary: 'var(--text-primary)',
          body: 'var(--text-body)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        status: {
          success: 'var(--success)',
          warning: 'var(--warning)',
          danger: 'var(--danger)',
          info: 'var(--info)',
        },
        statusBg: {
          success: 'var(--success-bg)',
          warning: 'var(--warning-bg)',
          danger: 'var(--danger-bg)',
          info: 'var(--info-bg)',
        },
        diagnostic: {
          ip: 'var(--diagnostic-ip)',
          dns: 'var(--diagnostic-dns)',
          webrtc: 'var(--diagnostic-webrtc)',
          fingerprint: 'var(--diagnostic-fingerprint)',
          trackers: 'var(--diagnostic-trackers)',
          certificate: 'var(--diagnostic-certificate)',
        }
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.pixel-corners': {
          'clip-path': 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        },
        '.blueprint-bg': {
          'background-size': '40px 40px',
          'background-image': 'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}