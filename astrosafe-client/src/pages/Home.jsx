import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

// Import all sections in strict order
import HeroGrid from '../components/sections/HeroGrid';
import AwardsBanner from '../components/sections/AwardsBanner';
import EngineFeatures from '../components/sections/EngineFeatures';
import ImpactStats from '../components/sections/ImpactStats';
import InteractiveWorkspace from '../components/sections/InteractiveWorkspace';
import PrincipleCards from '../components/sections/PrincipleCards';
import IntegrationsGraph from '../components/sections/IntegrationsGraph';

// Simple, non-technical business translations for the browser tab title
const pageTitles = {
  en: "AstroSafe - Security Checking System",
  hi: "AstroSafe - सुरक्षा जांच प्रणाली",
  mr: "AstroSafe - सुरक्षा तपासणी प्रणाली",
  ta: "AstroSafe - பாதுகாப்பு சோதனை அமைப்பு",
  te: "AstroSafe - భద్రతా తనిఖీ వ్యవస్థ",
  kn: "AstroSafe - ಭದ್ರತಾ ತಪಾಸಣಾ ವ್ಯವಸ್ಥೆ",
  bn: "AstroSafe - নিরাপত্তা চেকিং সিস্টেম",
  gu: "AstroSafe - સુરક્ષા ચકાસણી સિસ્ટમ",
  pa: "AstroSafe - ਸੁਰੱਖਿਆ ਜਾਂਚ ਸਿਸਟਮ",
  ml: "AstroSafe - സുരക്ഷാ പരിശോധന സംവിധാനം",
  or: "AstroSafe - ସୁରକ୍ଷା ଯାଞ୍ଚ ବ୍ୟବସ୍ଥା",
  as: "AstroSafe - সুৰক্ষা পৰীক্ষা ব্যৱস্থা",
  ur: "AstroSafe - حفاظتی چیکنگ کا نظام",
  sa: "AstroSafe - सुरक्षा परीक्षण तन्त्रम्"
};

export default function Home() {
  const { language = 'en' } = useTheme();

  useEffect(() => {
    // Dynamically update the browser tab title based on the selected language
    document.title = pageTitles[language] || pageTitles['en'];
    
    // Ensure the page starts at the top when loaded
    window.scrollTo(0, 0);
  }, [language]);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Top Hero Section */}
      <HeroGrid language={language} />
      
      {/* 2. Trust Badge Row */}
      <AwardsBanner language={language} />
      
      {/* 3. Diagnostic Tests Section (Mapped to Navigation Anchor) */}
      <div id="tools">
        <EngineFeatures language={language} />
      </div>
      
      {/* 4. Business Statistics Section (Mapped to Navigation Anchor) */}
      <div id="reports">
        <ImpactStats language={language} />
        <InteractiveWorkspace language={language} />
      </div>
      
      {/* 5. Core Business Principles */}
      <PrincipleCards language={language} />
      
      {/* 6. Bottom Browser Integration Graph */}
      <IntegrationsGraph language={language} />
    </div>
  );
}