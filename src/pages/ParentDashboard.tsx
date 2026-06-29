import React, { useState, useEffect } from 'react';
import { Target, MessageCircle, FileText, Calendar, ArrowRight, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const ParentDashboard = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      if (!user) return;
      
      const { data: links, error: linkError } = await supabase
        .from('student_parent_links')
        .select('student_id')
        .eq('parent_id', user.id);
        
      if (linkError || !links?.length) {
        setLoading(false);
        return;
      }
      
      const studentIds = links.map(l => l.student_id);
      const { data: students } = await supabase
        .from('students')
        .select('*')
        .in('id', studentIds);
        
      if (students && students.length > 0) {
        setChildren(students);
        setSelectedChild(students[0]);
      } else {
        setLoading(false);
      }
    };
    
    fetchChildren();
  }, [user]);

  useEffect(() => {
    const fetchChildData = async () => {
      if (!selectedChild) return;
      setLoading(true);
      
      const { data: goalsData } = await supabase.from('goals').select('*').eq('student_id', selectedChild.id);
      if (goalsData) setGoals(goalsData);
      
      // Parents only see final documents
      const { data: docsData } = await supabase.from('documents').select('*').eq('student_id', selectedChild.id).eq('is_draft', false).order('created_at', { ascending: false });
      if (docsData) setDocuments(docsData);
      
      setLoading(false);
    };
    
    fetchChildData();
  }, [selectedChild]);

  if (loading && children.length === 0) return <div style={{ padding: '2rem' }}>Loading portal...</div>;

  if (children.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Welcome to SimplyAbled</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>You don't have any children linked to your account yet. Please contact your educator to receive your access link.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ background: 'var(--primary)', color: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', margin: '-2rem -2rem 2rem -2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, border: '4px solid rgba(255,255,255,0.2)' }}>
            {selectedChild.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{selectedChild.name}'s Portal</h1>
            <p style={{ opacity: 0.9, marginTop: '0.25rem' }}>Stay connected with {selectedChild.name}'s progress and care team.</p>
          </div>
          
          {children.length > 1 && (
            <div style={{ marginLeft: 'auto' }}>
              <select className="form-select" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }} onChange={(e) => setSelectedChild(children.find(c => c.id === e.target.value))}>
                {children.map(c => <option key={c.id} value={c.id} style={{ color: 'black' }}>{c.name}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Current Goals & Progress</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {goals.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No active goals.</p> : goals.map(goal => (
                <div key={goal.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Target size={18} color="var(--primary)" /> {goal.title}
                    </div>
                    <div style={{ color: goal.status === 'achieved' ? 'var(--secondary)' : 'var(--primary)', fontWeight: 600, textTransform: 'capitalize' }}>
                      {goal.status.replace('_', ' ')}
                    </div>
                  </div>
                  {goal.description && <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{goal.description}</div>}
                  <div style={{ width: '100%', height: '8px', background: 'var(--surface-hover)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: goal.status === 'achieved' ? '100%' : goal.status === 'in_progress' ? '50%' : '5%', 
                      height: '100%', 
                      background: goal.status === 'achieved' ? 'var(--secondary)' : 'var(--primary)', 
                      borderRadius: '999px' 
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card">
             <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Progress Reports & Documents</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {documents.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No finalized reports yet.</p> : documents.map(doc => (
                  <div key={doc.id} style={{ background: 'var(--surface-hover)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{doc.type.replace('_', ' ')}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{new Date(doc.created_at).toLocaleDateString()}</div>
                    </div>
                    <p style={{ color: 'var(--text-main)', marginBottom: '1rem', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                      {doc.generated_content}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={() => alert('Acknowledged!')}>
                        <Heart size={16} /> Acknowledge
                      </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', border: 'none' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#0369A1' }}>Home Activities</h2>
            <p style={{ color: '#0C4A6E', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Check back here for customized activities to practice at home based on your child's recent sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
