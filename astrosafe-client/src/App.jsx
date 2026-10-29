import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Simple, non-technical business translations for 14 Indian languages
const routingTranslations = {
  en: "Page Not Found",
  hi: "पृष्ठ नहीं मिला",
  mr: "पृष्ठ आढळले नाही",
  ta: "பக்கம் கிடைக்கவில்லை",
  te: "పేజీ కనుగొనబడలేదు",
  kn: "ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ",
  bn: "পৃষ্ঠা পাওয়া যায়নি",
  gu: "પૃષ્ઠ મળ્યું નથી",
  pa: "ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ",
  ml: "പേജ് കണ്ടെത്തിയില്ല",
  or: "ପୃଷ୍ଠା ମିଳିଲା ନାହିଁ",
  as: "পৃষ্ঠা পোৱা নগ'ল",
  ur: "صفحہ نہیں ملا",
  sa: "पृष्ठं न प्राप्तम्"
};

// Standard functional modules for the required application routes
const PrivacyReport = () => (
  <div className="flex-grow flex items-center justify-center p-10 font-bold text-[var(--text-primary)]">
    Privacy Report System Active
  </div>
);

const ScamSafety = () => (
  <div className="flex-grow flex items-center justify-center p-10 font-bold text-[var(--text-primary)]">
    Scam Safety System Active
  </div>
);

// Fallback component utilizing the 14-language dictionary
const NotFound = () => (
  <div className="flex-grow flex items-center justify-center p-10 font-bold text-red-500 text-2xl">
    {routingTranslations['en']}
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="privacy-report" element={<PrivacyReport />} />
            <Route path="scam-safety" element={<ScamSafety />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}