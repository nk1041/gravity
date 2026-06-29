import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';
import ParentDashboard from './pages/ParentDashboard';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole?: 'educator' | 'parent' }) => {
  const { user, role, loading } = useAuth();
  
  if (loading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  if (allowedRole && role !== allowedRole) {
    if (role === 'educator') return <Navigate to="/dashboard" />;
    if (role === 'parent') return <Navigate to="/parent" />;
  }

  return <>{children}</>;
};

// Placeholder component for mock pages
const MockPage = ({ title }: { title: string }) => (
  <div className="animate-fade-in" style={{ padding: '2rem' }}>
    <h1 className="page-title">{title}</h1>
    <div className="card" style={{ marginTop: '2rem' }}>
      <p style={{ color: 'var(--text-muted)' }}>This section is part of the integrated workflow and is primarily managed within individual Student Profiles.</p>
    </div>
  </div>
);

const NotFound = () => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>404</h1>
    <p style={{ color: 'var(--text-muted)' }}>Page not found.</p>
  </div>
);

function App() {
  const { user, role } = useAuth();

  return (
    <BrowserRouter>
      {user ? (
        <div className="app-container">
          <Sidebar role={role} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to={role === 'educator' ? '/dashboard' : '/parent'} />} />
              <Route path="/login" element={<Navigate to={role === 'educator' ? '/dashboard' : '/parent'} />} />
              <Route path="/dashboard" element={<ProtectedRoute allowedRole="educator"><Dashboard /></ProtectedRoute>} />
              <Route path="/students" element={<ProtectedRoute allowedRole="educator"><Students /></ProtectedRoute>} />
              <Route path="/student/:id" element={<ProtectedRoute allowedRole="educator"><StudentProfile /></ProtectedRoute>} />
              
              {/* Mock routes for sidebar */}
              <Route path="/assessments" element={<ProtectedRoute allowedRole="educator"><MockPage title="Assessments" /></ProtectedRoute>} />
              <Route path="/ieps" element={<ProtectedRoute allowedRole="educator"><MockPage title="IEPs" /></ProtectedRoute>} />
              <Route path="/lesson-plans" element={<ProtectedRoute allowedRole="educator"><MockPage title="Lesson Plans" /></ProtectedRoute>} />
              <Route path="/session-notes" element={<ProtectedRoute allowedRole="educator"><MockPage title="Session Notes" /></ProtectedRoute>} />
              <Route path="/goals" element={<ProtectedRoute allowedRole="educator"><MockPage title="Goals" /></ProtectedRoute>} />
              <Route path="/progress-reports" element={<ProtectedRoute allowedRole="educator"><MockPage title="Progress Reports" /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute allowedRole="educator"><MockPage title="Parent Messages" /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute allowedRole="educator"><MockPage title="Settings" /></ProtectedRoute>} />

              <Route path="/parent" element={<ProtectedRoute allowedRole="parent"><ParentDashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={
            <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
              <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 style={{ marginBottom: '1rem', fontWeight: 600 }}>Reset Password</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Enter your email to receive a reset link.</p>
                <input type="email" className="form-input" placeholder="Email" style={{ marginBottom: '1rem' }} />
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Link</button>
              </div>
            </div>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
