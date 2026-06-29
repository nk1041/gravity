import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, HeartPulse, BrainCircuit, LogOut, CheckSquare, Target, MessageSquare, Briefcase, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ role }: { role: 'educator' | 'parent' | null }) => {
  const { profile, signOut } = useAuth();

  return (
    <aside className="sidebar" style={{ overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'white' }}>
          <BrainCircuit size={24} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
          SimplyAbled
        </h1>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {role === 'educator' && (
          <>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, paddingLeft: '1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
              Main Workspace
            </div>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <LayoutDashboard size={20} className="icon" />
              Dashboard
            </NavLink>
            <NavLink to="/students" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Users size={20} className="icon" />
              Students
            </NavLink>
            
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, paddingLeft: '1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              Documentation
            </div>
            <NavLink to="/assessments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Briefcase size={20} className="icon" />
              Assessments
            </NavLink>
            <NavLink to="/ieps" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FileText size={20} className="icon" />
              IEPs
            </NavLink>
            <NavLink to="/lesson-plans" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Calendar size={20} className="icon" />
              Lesson Plans
            </NavLink>
            <NavLink to="/session-notes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <CheckSquare size={20} className="icon" />
              Session Notes
            </NavLink>
            
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, paddingLeft: '1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              Progress & Comms
            </div>
            <NavLink to="/goals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Target size={20} className="icon" />
              Goals
            </NavLink>
            <NavLink to="/progress-reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FileText size={20} className="icon" />
              Progress Reports
            </NavLink>
            <NavLink to="/messages" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <MessageSquare size={20} className="icon" />
              Parent Messages
            </NavLink>
            
            <div style={{ marginTop: '1.5rem' }}></div>
            <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Settings size={20} className="icon" />
              Settings
            </NavLink>
          </>
        )}

        {role === 'parent' && (
          <>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, paddingLeft: '1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
              Parent Portal
            </div>
            <NavLink to="/parent" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <HeartPulse size={20} className="icon" />
              My Children
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Settings size={20} className="icon" />
              Settings
            </NavLink>
          </>
        )}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, flexShrink: 0 }}>
          {profile?.full_name?.charAt(0) || 'U'}
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{profile?.full_name || 'User'}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{role}</div>
        </div>
        <button onClick={signOut} style={{ color: 'var(--text-muted)', padding: '0.25rem', cursor: 'pointer', flexShrink: 0 }} title="Sign Out">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
