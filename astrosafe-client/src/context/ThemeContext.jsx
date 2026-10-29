import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

// Business translations for 14 Indian languages using simple terms
export const themeTranslations = {
  en: { light: "Light Mode", dark: "Dark Mode" },
  hi: { light: "लाइट मोड", dark: "डार्क मोड" },
  mr: { light: "लाईट मोड", dark: "डार्क मोड" },
  ta: { light: "வெளிச்ச முறை", dark: "இருண்ட முறை" },
  te: { light: "లైట్ మోడ్", dark: "డార్క్ మోడ్" },
  kn: { light: "ಬೆಳಕಿನ ಮೋಡ್", dark: "ಡಾರ್ಕ್ ಮೋಡ್" },
  bn: { light: "হালকা মোড", dark: "ডার্ক মোড" },
  gu: { light: "લાઇટ મોડ", dark: "ડાર્ક મોડ" },
  pa: { light: "ਲਾਈਟ ਮੋਡ", dark: "ਡਾਰਕ ਮੋਡ" },
  ml: { light: "ലൈറ്റ് മോഡ്", dark: "ഡാർക്ക് മോഡ്" },
  or: { light: "ଲାଇଟ୍ ମୋଡ୍", dark: "ଡାର୍କ ମୋଡ୍" },
  as: { light: "লাইট মোড", dark: "ডাৰ্ক মোড" },
  ur: { light: "لائٹ موڈ", dark: "ڈارک موڈ" },
  sa: { light: "प्रकाश रूप", dark: "अन्धकार रूप" }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Read local storage for user theme preference
    const savedTheme = localStorage.getItem('astrosafe-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    }

    // Read local storage for user language preference
    const savedLanguage = localStorage.getItem('astrosafe-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Toggle dark class on the HTML tag and save to local storage
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('astrosafe-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('astrosafe-theme', 'light');
    }
  };

  // Change active language and save to local storage
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('astrosafe-language', newLanguage);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, language, changeLanguage, themeTranslations }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);