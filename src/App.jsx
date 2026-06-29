import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DocumentGenerator from './components/DocumentGenerator';
import MChatTool from './pages/MChatTool';
import ToolLayout from './pages/ToolLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
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
