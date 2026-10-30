import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Globe, Search, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import TwoLineMenu from '../ui/TwoLineMenu';
import PixelButton from '../ui/PixelButton';
import TestPromptModal from '../ui/TestPromptModal';

// Simple, non-technical business translations for 14 Indian languages
const navTranslations = {
  en: { home: "Home", tools: "Tools", reports: "Reports", contact: "Contact", search: "Search...", start: "Start Test" },
  hi: { home: "मुख्य पृष्ठ", tools: "उपकरण", reports: "रिपोर्ट", contact: "संपर्क", search: "खोजें...", start: "टेस्ट शुरू करें" },
  mr: { home: "मुख्य पृष्ठ", tools: "साधने", reports: "अहवाल", contact: "संपर्क", search: "शोधा...", start: "टेस्ट सुरू करा" },
  ta: { home: "முகப்பு", tools: "கருவிகள்", reports: "அறிக்கைகள்", contact: "தொடர்பு", search: "தேடு...", start: "சோதனையைத் தொடங்கு" },
  te: { home: "హోమ్", tools: "సాధనాలు", reports: "నివేదికలు", contact: "సంప్రదించండి", search: "శోధించండి...", start: "పరీక్ష ప్రారంభించండి" },
  kn: { home: "ಮುಖಪುಟ", tools: "ಸಾಧನಗಳು", reports: "ವರದಿಗಳು", contact: "ಸಂಪರ್ಕಿಸಿ", search: "ಹುಡುಕಿ...", start: "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ" },
  bn: { home: "হোম", tools: "টুলস", reports: "রিপোর্ট", contact: "যোগাযোগ", search: "অনুসন্ধান...", start: "টেস্ট শুরু করুন" },
  gu: { home: "મુખ્ય પૃષ્ઠ", tools: "સાધનો", reports: "અહેવાલો", contact: "સંપર્ક", search: "શોધો...", start: "ટેસ્ટ શરૂ કરો" },
  pa: { home: "ਮੁੱਖ ਪੰਨਾ", tools: "ਟੂਲ", reports: "ਰਿਪੋਰਟਾਂ", contact: "ਸੰਪਰਕ", search: "ਖੋਜੋ...", start: "ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ" },
  ml: { home: "ഹോം", tools: "ഉപകരണങ്ങൾ", reports: "റിപ്പോർട്ടുകൾ", contact: "ബന്ധപ്പെടുക", search: "തിരയുക...", start: "ടെസ്റ്റ് ആരംഭിക്കുക" },
  or: { home: "ହୋମ୍", tools: "ଉପକରଣ", reports: "ରିପୋର୍ଟ", contact: "ସମ୍ପର୍କ", search: "ସନ୍ଧାନ କରନ୍ତୁ...", start: "ଟେଷ୍ଟ ଆରମ୍ଭ କରନ୍ତୁ" },
  as: { home: "হোম", tools: "সঁজুলি", reports: "ৰিপোৰ্ট", contact: "যোগাযোগ", search: "সন্ধান কৰক...", start: "টেষ্ট আৰম্ভ কৰক" },
  ur: { home: "ہوم", tools: "ٹولز", reports: "رپورٹس", contact: "رابطہ", search: "تلاش کریں...", start: "ٹیسٹ شروع کریں" },
  sa: { home: "मुख्यपृष्ठम्", tools: "साधनानि", reports: "विवरणानि", contact: "सम्पर्कः", search: "अन्वेषणम्...", start: "परीक्षणं आरभताम्" }
};

const languagesList = [
  { code: 'en', label: 'English' }, { code: 'hi', label: 'हिंदी' }, { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' }, { code: 'te', label: 'తెలుగు' }, { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'bn', label: 'বাংলা' }, { code: 'gu', label: 'ગુજરાતી' }, { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'ml', label: 'മലയാളം' }, { code: 'or', label: 'ଓଡ଼ିଆ' }, { code: 'as', label: 'অসমীয়া' },
  { code: 'ur', label: 'اردو' }, { code: 'sa', label: 'संस्कृतम्' }
];

export default function Navbar() {
  const { isDark, toggleTheme, language, changeLanguage } = useTheme();
  const content = navTranslations[language] || navTranslations['en'];
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State to manage the Test Prompt Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLanguageSelect = (code) => {
    changeLanguage(code);
    setIsLangMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleStartTestClick = () => {
    setIsModalOpen(true);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-[var(--surface)] border-b border-[var(--border-strong)] relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Left: Dynamic AstroSafe Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" onClick={handleHomeClick} className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] rounded-sm cursor-pointer">
                <img 
                  src={isDark ? "https://i.postimg.cc/JhMycxNP/logo-as-removebg-preview.png" : "https://i.postimg.cc/8cKxkTGK/logo-2as-removebg-preview.png"} 
                  alt="AstroSafe Logo" 
                  className="h-20 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center gap-2 font-bold text-2xl text-[var(--text-primary)]">
                  <Shield className="text-[var(--brand-blue)]" /> AstroSafe
                </div>
              </a>
            </div>

            {/* Center: Desktop Navigation Links updated with real routes */}
            <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
              <a href="/" onClick={handleHomeClick} className="text-[var(--text-primary)] font-medium hover:text-[var(--brand-blue)] transition-colors duration-200 cursor-pointer">{content.home}</a>
              <Link to="/#tools" className="text-[var(--text-primary)] font-medium hover:text-[var(--brand-blue)] transition-colors duration-200">{content.tools}</Link>
              <Link to="/reports" className="text-[var(--text-primary)] font-medium hover:text-[var(--brand-blue)] transition-colors duration-200">{content.reports}</Link>
              <Link to="/contact" className="text-[var(--text-primary)] font-medium hover:text-[var(--brand-blue)] transition-colors duration-200">{content.contact}</Link>
            </div>

            {/* Right: Search, Language, Theme, and Call to Action */}
            <div className="hidden md:flex items-center space-x-4">
              
              {/* Search Toggle */}
              <div className="relative">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors"
                  aria-label={content.search}
                >
                  <Search size={20} />
                </button>
                
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.form 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 250 }}
                      exit={{ opacity: 0, width: 0 }}
                      onSubmit={handleSearchSubmit}
                      className="absolute right-0 top-full mt-2 flex items-center bg-[var(--surface)] border border-[var(--border-strong)] shadow-lg overflow-hidden"
                    >
                      <input 
                        type="text" 
                        placeholder={content.search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent px-4 py-2 text-[var(--text-primary)] focus:outline-none"
                      />
                      <button type="submit" className="bg-[var(--brand-blue)] text-[var(--brand-white)] px-3 py-2">
                        <Search size={18} />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="p-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors"
                  aria-label="Change Language"
                >
                  <Globe size={20} />
                </button>
                
                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-[var(--surface)] border border-[var(--border-strong)] shadow-xl max-h-64 overflow-y-auto z-50"
                    >
                      {languagesList.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`block w-full text-left px-4 py-3 text-sm transition-colors ${language === lang.code ? 'bg-[var(--brand-blue)] text-[var(--brand-white)]' : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'}`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* CTA Pixel Button attached to modal logic */}
              <PixelButton onClick={handleStartTestClick} language={language}>
                {content.start}
              </PixelButton>
            </div>

            {/* Mobile Menu Controls */}
            <div className="md:hidden flex items-center space-x-2">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-[var(--text-primary)]">
                <Search size={20} />
              </button>
              <button onClick={toggleTheme} className="p-2 text-[var(--text-primary)]">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <TwoLineMenu isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} language={language} />
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
             <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden w-full px-4 pb-4 bg-[var(--surface)] border-b border-[var(--border-strong)]">
               <form onSubmit={handleSearchSubmit} className="flex border border-[var(--border-strong)]">
                 <input type="text" placeholder={content.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent px-4 py-2 text-[var(--text-primary)] focus:outline-none" />
                 <button type="submit" className="bg-[var(--brand-blue)] text-[var(--brand-white)] px-4"><Search size={18} /></button>
               </form>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Full Screen Menu Overlay updated with real routes */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden fixed inset-x-0 top-20 bg-[var(--surface)] z-40 overflow-y-auto border-t border-[var(--border-strong)] flex flex-col"
            >
              <div className="flex flex-col p-6 space-y-6">
                <a href="/" onClick={handleHomeClick} className="text-2xl font-bold text-[var(--text-primary)] cursor-pointer">{content.home}</a>
                <Link to="/#tools" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-[var(--text-primary)]">{content.tools}</Link>
                <Link to="/reports" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-[var(--text-primary)]">{content.reports}</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-[var(--text-primary)]">{content.contact}</Link>
                
                <div className="w-full h-px bg-[var(--border)] my-4"></div>
                
                {/* Mobile Language Selection */}
                <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Change Language</h3>
                <div className="grid grid-cols-2 gap-2">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left px-4 py-2 text-sm border ${language === lang.code ? 'bg-[var(--brand-blue)] text-[var(--brand-white)] border-[var(--brand-blue)]' : 'bg-[var(--surface-secondary)] text-[var(--text-primary)] border-[var(--border-strong)]'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                   <PixelButton className="w-full" onClick={handleStartTestClick} language={language}>
                     {content.start}
                   </PixelButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Render the modal at the root level outside the nav flow */}
      <TestPromptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}