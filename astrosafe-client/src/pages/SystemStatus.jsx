import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const pageTranslations = {
  en: { title: "System Status", subtitle: "Live Network Health", connection: "Connection", online: "Online", offline: "Offline", response: "Response Time", ms: "ms", fast: "Fast", slow: "Slow", checking: "Checking...", checked: "Last Checked", device: "Device Load", cores: "Processors Active" },
  hi: { title: "सिस्टम स्थिति", subtitle: "लाइव नेटवर्क स्वास्थ्य", connection: "कनेक्शन", online: "ऑनलाइन", offline: "ऑफ़लाइन", response: "प्रतिक्रिया समय", ms: "एमएस", fast: "तेज़", slow: "धीमा", checking: "जांच हो रही है...", checked: "अंतिम जांच", device: "डिवाइस लोड", cores: "प्रोसेसर सक्रिय" },
  mr: { title: "सिस्टम स्थिती", subtitle: "थेट नेटवर्क आरोग्य", connection: "कनेक्शन", online: "ऑनलाइन", offline: "ऑफलाइन", response: "प्रतिक्रिया वेळ", ms: "एमएस", fast: "जलद", slow: "हळू", checking: "तपासत आहे...", checked: "अंतिम तपासणी", device: "डिव्हाइस लोड", cores: "प्रोसेसर सक्रिय" },
  ta: { title: "கணினி நிலை", subtitle: "நேரடி நெட்வொர்க் ஆரோக்கியம்", connection: "இணைப்பு", online: "ஆன்லைன்", offline: "ஆஃப்லைன்", response: "பதிலளிப்பு நேரம்", ms: "மிலிசெகண்ட்", fast: "வேகம்", slow: "மெதுவாக", checking: "சரிபார்க்கிறது...", checked: "கடைசியாக சரிபார்க்கப்பட்டது", device: "சாதன சுமை", cores: "செயலிகள் செயலில் உள்ளன" },
  te: { title: "సిస్టమ్ స్థితి", subtitle: "ప్రత్యక్ష నెట్‌వర్క్ ఆరోగ్యం", connection: "కనెక్షన్", online: "ఆన్‌లైన్", offline: "ఆఫ్‌లైన్", response: "ప్రతిస్పందన సమయం", ms: "మి.సె", fast: "వేగంగా", slow: "నెమ్మదిగా", checking: "తనిఖీ చేస్తోంది...", checked: "చివరిగా తనిఖీ చేయబడింది", device: "పరికర లోడ్", cores: "ప్రాసెసర్లు చురుకుగా ఉన్నాయి" },
  kn: { title: "ಸಿಸ್ಟಮ್ ಸ್ಥಿತಿ", subtitle: "ಲೈವ್ ನೆಟ್‌ವರ್ಕ್ ಆರೋಗ್ಯ", connection: "ಸಂಪರ್ಕ", online: "ಆನ್‌ಲೈನ್", offline: "ಆಫ್‌ಲೈನ್", response: "ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ", ms: "ಎಂಎಸ್", fast: "ವೇಗ", slow: "ನಿಧಾನ", checking: "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", checked: "ಕೊನೆಯದಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ", device: "ಸಾಧನದ ಲೋಡ್", cores: "ಪ್ರೊಸೆಸರ್‌ಗಳು ಸಕ್ರಿಯವಾಗಿವೆ" },
  bn: { title: "সিস্টেম স্ট্যাটাস", subtitle: "লাইভ নেটওয়ার্ক স্বাস্থ্য", connection: "সংযোগ", online: "অনলাইন", offline: "অফলাইন", response: "প্রতিক্রিয়া সময়", ms: "এমএস", fast: "দ্রুত", slow: "ধীর", checking: "চেক করা হচ্ছে...", checked: "শেষ চেক করা হয়েছে", device: "ডিভাইস লোড", cores: "প্রসেসর সক্রিয়" },
  gu: { title: "સિસ્ટમ સ્થિતિ", subtitle: "લાઇવ નેટવર્ક આરોગ્ય", connection: "જોડાણ", online: "ઓનલાઇન", offline: "ઓફલાઇન", response: "પ્રતિસાદ સમય", ms: "એમએસ", fast: "ઝડપી", slow: "ધીમું", checking: "તપાસી રહ્યું છે...", checked: "છેલ્લે તપાસેલ", device: "ઉપકરણ લોડ", cores: "પ્રોસેસર્સ સક્રિય" },
  pa: { title: "ਸਿਸਟਮ ਸਥਿਤੀ", subtitle: "ਲਾਈਵ ਨੈੱਟਵਰਕ ਸਿਹਤ", connection: "ਕਨੈਕਸ਼ਨ", online: "ਆਨਲਾਈਨ", offline: "ਆਫਲਾਈਨ", response: "ਜਵਾਬ ਦਾ ਸਮਾਂ", ms: "ਐਮਐਸ", fast: "ਤੇਜ਼", slow: "ਹੌਲੀ", checking: "ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", checked: "ਆਖਰੀ ਜਾਂਚ", device: "ਡਿਵਾਈਸ ਲੋਡ", cores: "ਪ੍ਰੋਸੈਸਰ ਸਰਗਰਮ" },
  ml: { title: "സിസ്റ്റം നില", subtitle: "തത്സമയ നെറ്റ്‌വർക്ക് ആരോഗ്യം", connection: "കണക്ഷൻ", online: "ഓൺലൈൻ", offline: "ഓഫ്‌ലൈൻ", response: "പ്രതികരണ സമയം", ms: "എംഎസ്", fast: "വേഗം", slow: "പതുക്കെ", checking: "പരിശോധിക്കുന്നു...", checked: "അവസാനം പരിശോധിച്ചത്", device: "ഉപകരണ ലോഡ്", cores: "പ്രോസസ്സറുകൾ സജീവം" },
  or: { title: "ସିଷ୍ଟମ୍ ସ୍ଥିତି", subtitle: "ଲାଇଭ୍ ନେଟୱାର୍କ ସ୍ୱାସ୍ଥ୍ୟ", connection: "ସଂଯୋଗ", online: "ଅନଲାଇନ୍", offline: "ଅଫଲାଇନ୍", response: "ପ୍ରତିକ୍ରିୟା ସମୟ", ms: "ଏମ୍ ଏସ୍", fast: "ଦ୍ରୁତ", slow: "ଧୀର", checking: "ଯାଞ୍ଚ କରାଯାଉଛି...", checked: "ଶେଷ ଯାଞ୍ଚ", device: "ଡିଭାଇସ୍ ଲୋଡ୍", cores: "ପ୍ରୋସେସର୍ ସକ୍ରିୟ" },
  as: { title: "চিষ্টেমৰ স্থিতি", subtitle: "লাইভ নেটৱৰ্ক স্বাস্থ্য", connection: "সংযোগ", online: "অনলাইন", offline: "অফলাইন", response: "প্ৰতিক্ৰিয়াৰ সময়", ms: "এম এছ", fast: "দ্ৰুত", slow: "ধীৰ", checking: "পৰীক্ষা কৰা হৈছে...", checked: "অন্তিম পৰীক্ষা", device: "ডিভাইচ লোড", cores: "প্ৰচেছৰ সক্ৰিয়" },
  ur: { title: "سسٹم کی حیثیت", subtitle: "لائیو نیٹ ورک کی صحت", connection: "کنکشن", online: "آن لائن", offline: "آف لائن", response: "ردعمل کا وقت", ms: "ملی سیکنڈ", fast: "تیز", slow: "سست", checking: "چیک کیا جا رہا ہے...", checked: "آخری جانچ", device: "ڈیوائس کا بوجھ", cores: "پروسیسرز فعال" },
  sa: { title: "तन्त्र-स्थितिः", subtitle: "सजीव-जालबन्ध-स्वास्थ्यम्", connection: "सम्पर्कः", online: "सजीवम्", offline: "निर्जीवम्", response: "प्रतिक्रिया-समयः", ms: "मि.से.", fast: "शीघ्रम्", slow: "मन्दम्", checking: "परीक्षते...", checked: "अन्तिम-परीक्षणम्", device: "यन्त्र-भारः", cores: "संसाधकाः सक्रियः" }
};

export default function SystemStatus() {
  const { language = 'en' } = useTheme();
  const content = pageTranslations[language] || pageTranslations['en'];

  const [isOnline, setIsOnline] = useState(true);
  const [latency, setLatency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [cores, setCores] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const updateStatus = async () => {
      setLoading(true);
      
      // Real functional check of network state
      const currentOnlineStatus = navigator.onLine;
      setIsOnline(currentOnlineStatus);

      // Real extraction of device processing load capability
      setCores(navigator.hardwareConcurrency || 4);

      if (currentOnlineStatus) {
        // Measure real response time by pinging the current origin securely without mock data
        const startTime = performance.now();
        try {
          await fetch(window.location.origin + '?ping=' + Date.now(), { method: 'HEAD', cache: 'no-store' });
          const endTime = performance.now();
          setLatency(Math.round(endTime - startTime));
        } catch (error) {
          setLatency(null);
        }
      } else {
        setLatency(null);
      }

      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
      setLoading(false);
    };

    updateStatus();

    const handleOnline = () => {
      setIsOnline(true);
      updateStatus();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setLatency(null);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Refresh metrics every 30 seconds for real-time monitoring
    const interval = setInterval(updateStatus, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 blueprint-grid">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-8"
      >
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--border-strong)] pb-6 bg-[var(--surface)] p-8 shadow-sm gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {content.title}
            </h1>
            <p className="mt-2 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Real Functional System Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Connection Status Panel */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[160px]">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.connection}
            </h2>
            <div className="flex items-center gap-4">
              <div className={`w-5 h-5 border-2 ${isOnline ? 'bg-green-500 border-green-700 animate-pulse' : 'bg-red-500 border-red-700'}`}></div>
              <span className={`text-2xl font-bold ${isOnline ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                {isOnline ? content.online : content.offline}
              </span>
            </div>
          </div>

          {/* Real Latency / Response Time Panel */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[160px]">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.response}
            </h2>
            <div className="flex items-end gap-2">
              {loading ? (
                <span className="text-lg font-bold text-[var(--text-secondary)]">{content.checking}</span>
              ) : latency !== null ? (
                <>
                  <span className="font-mono text-4xl font-bold text-[var(--brand-blue)]">{latency}</span>
                  <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">{content.ms}</span>
                  <span className="ml-2 text-xs font-bold px-2 py-1 border bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-[var(--brand-blue)] mb-1">
                    {latency < 200 ? content.fast : content.slow}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-[var(--text-secondary)]">--</span>
              )}
            </div>
          </div>

          {/* Device Hardware Load Panel */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-strong)] p-8 shadow-sm flex flex-col justify-between min-h-[160px]">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              {content.device}
            </h2>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-4xl font-bold text-[var(--text-primary)]">{cores}</span>
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                {content.cores}
              </span>
            </div>
          </div>

        </div>

        {/* Timestamp Footer */}
        <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-4 text-right shadow-sm">
          <span className="text-xs font-mono text-[var(--text-muted)] font-bold uppercase tracking-widest">
            {content.checked}: {lastUpdated}
          </span>
        </div>

      </motion.div>
    </div>
  );
}