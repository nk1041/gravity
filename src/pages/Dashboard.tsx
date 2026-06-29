import React, { useState, useEffect } from 'react';
import { Users, FileText, BrainCircuit, Activity, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { profile } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentStudents = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      if (data) setStudents(data);
      setLoading(false);
    };
    
    fetchRecentStudents();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, {profile?.full_name?.split(' ')[0] || 'Educator'}!</h1>
          <p className="page-subtitle">Here's your schedule and tasks for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', color: 'white' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{students.length}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Students</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--secondary)', borderRadius: 'var(--radius-md)', color: 'white' }}>
              <FileText size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>0</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Docs Generated</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#D946EF', borderRadius: 'var(--radius-md)', color: 'white' }}>
              <Activity size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>0</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Goals Met this Week</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ marginTop: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Students</h2>
            <Link to="/students" style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.875rem' }}>View All</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {loading ? <p>Loading students...</p> : students.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No students yet.</p> : students.map((student) => (
              <div key={student.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: 'var(--primary)' }}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{student.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{student.diagnosis_tags?.join(', ') || 'General'}</div>
                  </div>
                </div>
                <Link to={`/student/${student.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <BrainCircuit size={24} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Quick AI Actions</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Select a student to generate documentation instantly based on your form entries.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/students" className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FileText size={18} style={{ marginRight: '0.5rem' }} /> Generate IEP Draft
            </Link>
            <Link to="/students" className="btn" style={{ background: 'white', color: 'var(--text-main)', border: '1px solid var(--border)', width: '100%', justifyContent: 'flex-start' }}>
              <Calendar size={18} style={{ marginRight: '0.5rem' }} /> Create Lesson Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
