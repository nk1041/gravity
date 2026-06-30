import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import LandingPage from './pages/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DocumentGenerator from './components/DocumentGenerator';
import MChatTool from './pages/MChatTool';
import ToolLayout from './pages/ToolLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        
        {/* Dedicated Tool Pages */}
        <Route path="/tool" element={<ToolLayout />}>
          <Route path="mchat" element={<MChatTool />} />
          <Route path="iep" element={<DocumentGenerator defaultType="iep" />} />
          <Route path="itp" element={<DocumentGenerator defaultType="itp" />} />
          <Route path="lp" element={<DocumentGenerator defaultType="lp" />} />
          <Route path="progress" element={<DocumentGenerator defaultType="progress" />} />
          <Route path="assessment" element={<DocumentGenerator defaultType="assessment" />} />
          <Route path="session" element={<DocumentGenerator defaultType="session" />} />
          <Route path="observation" element={<DocumentGenerator defaultType="observation" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
