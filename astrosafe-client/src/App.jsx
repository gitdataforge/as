import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';

// Core Navigation Pages
import Home from './pages/Home';
import Reports from './pages/Reports';
import Contact from './pages/Contact';

// Tools & Diagnostics Pages
import IpChecker from './pages/IpChecker';
import WebRtcLeakTest from './pages/WebRtcLeakTest';
import CanvasFingerprint from './pages/CanvasFingerprint';
import DnsSecurity from './pages/DnsSecurity';

// Business & Enterprise Infrastructure Pages
import Overview from './pages/Overview';
import EnterpriseSecurity from './pages/EnterpriseSecurity';
import Department from './pages/Department';
import CustomerSupport from './pages/CustomerSupport';
import Cybersecurity from './pages/Cybersecurity';
import Legal from './pages/Legal';

// System Health & Developer Resources
import Resources from './pages/Resources';
import ApiReference from './pages/ApiReference';
import Tutorials from './pages/Tutorials';
import Changelog from './pages/Changelog';
import SystemStatus from './pages/SystemStatus';
import Community from './pages/Community';

// Company Information Pages
import About from './pages/About';
import Research from './pages/Research';
import Careers from './pages/Careers';
import Newsroom from './pages/Newsroom';

// Dedicated Functional Pages
import PrivacyReport from './pages/PrivacyReport';
import ScamSafety from './pages/ScamSafety';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Core Navigation Routes */}
            <Route index element={<Home />} />
            <Route path="reports" element={<Reports />} />
            <Route path="contact" element={<Contact />} />
            
            {/* Tools & Diagnostics Routes */}
            <Route path="ip-checker" element={<IpChecker />} />
            <Route path="webrtc-leak-test" element={<WebRtcLeakTest />} />
            <Route path="canvas-fingerprint" element={<CanvasFingerprint />} />
            <Route path="dns-security" element={<DnsSecurity />} />
            
            {/* Business & Enterprise Routes */}
            <Route path="overview" element={<Overview />} />
            <Route path="enterprise-security" element={<EnterpriseSecurity />} />
            <Route path="department" element={<Department />} />
            <Route path="customer-support" element={<CustomerSupport />} />
            <Route path="cybersecurity" element={<Cybersecurity />} />
            <Route path="legal" element={<Legal />} />
            
            {/* System Health & Resources Routes */}
            <Route path="resources" element={<Resources />} />
            <Route path="api-reference" element={<ApiReference />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="changelog" element={<Changelog />} />
            <Route path="system-status" element={<SystemStatus />} />
            <Route path="community" element={<Community />} />
            
            {/* Company Information Routes */}
            <Route path="about" element={<About />} />
            <Route path="research" element={<Research />} />
            <Route path="careers" element={<Careers />} />
            <Route path="newsroom" element={<Newsroom />} />

            {/* Additional Functional Routes */}
            <Route path="privacy-report" element={<PrivacyReport />} />
            <Route path="scam-safety" element={<ScamSafety />} />
            
            {/* Fallback Route for Invalid URLs */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}