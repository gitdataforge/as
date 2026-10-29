import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

// Simple, non-technical business translations for 14 Indian languages
const footerTranslations = {
  en: { 
    rights: "© 2026 AstroSafe by AnyAstro Techno Solutions.", 
    tools: "Tools", business: "Business", resources: "Resources", company: "Company", social: "Social",
    privacy: "Privacy", terms: "Terms", usage: "Usage Policy"
  },
  hi: { 
    rights: "© 2026 AstroSafe द्वारा AnyAstro Techno Solutions.", 
    tools: "उपकरण", business: "व्यापार", resources: "संसाधन", company: "कंपनी", social: "सोशल",
    privacy: "गोपनीयता", terms: "शर्तें", usage: "उपयोग नीति"
  },
  mr: { 
    rights: "© 2026 AstroSafe द्वारा AnyAstro Techno Solutions.", 
    tools: "साधने", business: "व्यवसाय", resources: "संसाधने", company: "कंपनी", social: "सोशल",
    privacy: "गोपनीयता", terms: "अटी", usage: "वापर धोरण"
  },
  ta: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "கருவிகள்", business: "வணிகம்", resources: "வளங்கள்", company: "நிறுவனம்", social: "சமூக",
    privacy: "தனியுரிமை", terms: "விதிகள்", usage: "பயன்பாட்டுக் கொள்கை"
  },
  te: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "సాధనాలు", business: "వ్యాపారం", resources: "వనరులు", company: "కంపెనీ", social: "సామాజిక",
    privacy: "గోప్యత", terms: "నిబంధనలు", usage: "వినియోగ విధానం"
  },
  kn: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "ಸಾಧನಗಳು", business: "ವ್ಯಾಪಾರ", resources: "ಸಂಪನ್ಮೂಲಗಳು", company: "ಕಂಪನಿ", social: "ಸಾಮಾಜಿಕ",
    privacy: "ಗೌಪ್ಯತೆ", terms: "ನಿಯಮಗಳು", usage: "ಬಳಕೆ ನೀತಿ"
  },
  bn: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "টুলস", business: "ব্যবসা", resources: "সম্পদ", company: "কোম্পানি", social: "সামাজিক",
    privacy: "গোপনীয়তা", terms: "শর্তাবলী", usage: "ব্যবহার নীতি"
  },
  gu: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "સાધનો", business: "વ્યાપાર", resources: "સંસાધનો", company: "કંપની", social: "સામાજિક",
    privacy: "ગોપનીયતા", terms: "શરતો", usage: "ઉપયોગ નીતિ"
  },
  pa: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "ਟੂਲ", business: "ਵਪਾਰ", resources: "ਸਰੋਤ", company: "ਕੰਪਨੀ", social: "ਸਮਾਜਿਕ",
    privacy: "ਗੋਪਨੀਯਤਾ", terms: "ਨਿਯਮ", usage: "ਵਰਤੋਂ ਨੀਤੀ"
  },
  ml: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "ഉപകരണങ്ങൾ", business: "ബിസിനസ്സ്", resources: "വിഭവങ്ങൾ", company: "കമ്പനി", social: "സോഷ്യൽ",
    privacy: "സ്വകാര്യത", terms: "നിബന്ധനകൾ", usage: "ഉപയോഗ നയം"
  },
  or: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "ଉପକରଣ", business: "ବ୍ୟବସାୟ", resources: "ସମ୍ବଳ", company: "କମ୍ପାନୀ", social: "ସାମାଜିକ",
    privacy: "ଗୋପନୀୟତା", terms: "ସର୍ତ୍ତାବଳୀ", usage: "ବ୍ୟବହାର ନୀତି"
  },
  as: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "সঁজুলি", business: "ব্যৱসায়", resources: "সম্পদ", company: "কোম্পানী", social: "সামাজিক",
    privacy: "গোপনীয়তা", terms: "চৰ্তসমূহ", usage: "ব্যৱহাৰ নীতি"
  },
  ur: { 
    rights: "© 2026 AstroSafe از AnyAstro Techno Solutions.", 
    tools: "ٹولز", business: "کاروبار", resources: "وسائل", company: "کمپنی", social: "سماجی",
    privacy: "رازداری", terms: "شرائط", usage: "استعمال کی پالیسی"
  },
  sa: { 
    rights: "© 2026 AstroSafe - AnyAstro Techno Solutions.", 
    tools: "साधनानि", business: "व्यापारः", resources: "संसाधनानि", company: "कम्पनी", social: "सामाजिक",
    privacy: "गोपनीयता", terms: "नियमाः", usage: "उपयोगनीतिः"
  }
};

export default function Footer() {
  const { language = 'en' } = useTheme();
  const content = footerTranslations[language] || footerTranslations['en'];

  return (
    <footer className="w-full bg-[#111111] text-[#A1A1AA] pt-20 pb-8 relative overflow-hidden font-sans border-t border-[var(--border-strong)]">
      
      {/* Blue Pixel Graphic (Top Right) */}
      <div className="absolute top-0 right-[5%] md:right-[15%] w-32 h-48 opacity-90 pointer-events-none">
        <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="0" width="25" height="25" fill="#2563EB" />
          <rect x="75" y="25" width="25" height="25" fill="#2563EB" />
          <rect x="50" y="50" width="25" height="25" fill="#2563EB" />
          <rect x="75" y="75" width="25" height="25" fill="#2563EB" />
          <rect x="25" y="75" width="25" height="25" fill="#2563EB" />
          <rect x="50" y="100" width="25" height="25" fill="#2563EB" />
          <rect x="75" y="125" width="25" height="25" fill="#2563EB" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Multi-Column Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-24">
          
          {/* Column 1: Tools */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-medium mb-2">{content.tools}</h4>
            <Link to="#" className="hover:text-white transition-colors text-sm">IP Checker</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">WebRTC Leak Test</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Canvas Fingerprint</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">DNS Security</Link>
          </div>

          {/* Column 2: Business */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-medium mb-2">{content.business}</h4>
            <Link to="#" className="hover:text-white transition-colors text-sm">Overview</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Enterprise Security</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm mt-4 text-[#71717A]">Department</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Customer Support</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Cybersecurity</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Legal</Link>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-medium mb-2">{content.resources}</h4>
            <Link to="#" className="hover:text-white transition-colors text-sm">Documentation</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">API Reference</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Tutorials</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Changelog</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">System Status</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Community</Link>
          </div>

          {/* Column 4: Company */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-medium mb-2">{content.company}</h4>
            <Link to="#" className="hover:text-white transition-colors text-sm">About AstroSafe</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Research</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Careers</Link>
            <Link to="#" className="hover:text-white transition-colors text-sm">Newsroom</Link>
          </div>

          {/* Column 5: Social */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-medium mb-2">{content.social}</h4>
            <a href="#" className="hover:text-white transition-colors text-sm">Instagram</a>
            <a href="#" className="hover:text-white transition-colors text-sm">Threads</a>
            <a href="#" className="hover:text-white transition-colors text-sm">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors text-sm">X</a>
          </div>

        </div>

        {/* Bottom Copyright & Legal Row */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#27272A] gap-6">
          
          {/* Left: Logo and Copyright */}
          <div className="flex items-center gap-3">
            <img 
              src="https://anyastro.web.app/assets/branding/logo.png" 
              alt="AnyAstro Logo" 
              className="h-5 w-auto object-contain filter grayscale brightness-200"
            />
            <p className="text-sm font-medium tracking-wide">
              {content.rights}
            </p>
          </div>

          {/* Right: Legal Links */}
          <div className="flex items-center space-x-6 text-sm">
            <Link to="#" className="hover:text-white transition-colors">{content.privacy}</Link>
            <Link to="#" className="hover:text-white transition-colors">{content.terms}</Link>
            <Link to="#" className="hover:text-white transition-colors">{content.usage}</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}