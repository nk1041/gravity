import React, { useState, useEffect } from 'react';
import { FileText, Target, BrainCircuit } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AIDocumentGenerator from '../components/forms/AIDocumentGenerator';
import AddGoalForm from '../components/forms/AddGoalForm';

const StudentProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [student, setStudent] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    
    // Fetch student
    const { data: studentData } = await supabase.from('students').select('*').eq('id', id).single();
    if (studentData) setStudent(studentData);
    
    // Fetch goals
    const { data: goalsData } = await supabase.from('goals').select('*').eq('student_id', id).order('created_at', { ascending: false });
    if (goalsData) setGoals(goalsData);
    
    // Fetch docs
    const { data: docsData } = await supabase.from('documents').select('*').eq('student_id', id).order('created_at', { ascending: false });
    if (docsData) setDocuments(docsData);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const updateGoalStatus = async (goalId: string, status: string) => {
    await supabase.from('goals').update({ status }).eq('id', goalId);
    fetchData();
  };

  if (loading) return <div>Loading profile...</div>;
  if (!student) return <div>Student not found.</div>;

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-light)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '2.5rem' }}>
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="page-title">{student.name}</h1>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              {student.dob && <span>DOB: {student.dob}</span>}
              {student.dob && <span>•</span>}
              {student.diagnosis_tags && student.diagnosis_tags.length > 0 && (
                <>
                  <span>{student.diagnosis_tags.join(', ')}</span>
                  <span>•</span>
                </>
              )}
              <span style={{ color: '#166534', background: '#DCFCE7', padding: '0.125rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>Active</span>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setActiveTab('ieps')}>
          <BrainCircuit size={18} /> Generate Document
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
        {['overview', 'ieps', 'history'].map((tab) => (
          <button
            key={tab}
            style={{
              padding: '0.75rem 0',
              fontWeight: 600,
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              textTransform: 'capitalize'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'ieps' ? 'AI Generator & Documents' : tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-3">
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Track Goals</h2>
              
              <AddGoalForm studentId={student.id} onSuccess={fetchData} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {goals.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No goals set yet.</p>
                ) : (
                  goals.map(goal => (
                    <div key={goal.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-hover)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Target size={18} color="var(--primary)" /> {goal.title}
                          </div>
                          {goal.description && <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{goal.description}</div>}
                        </div>
                        <select 
                          className="form-select" 
                          style={{ width: '150px', padding: '0.25rem 0.5rem', height: 'fit-content' }}
                          value={goal.status}
                          onChange={(e) => updateGoalStatus(goal.id, e.target.value)}
                        >
                          <option value="not_started">Not Started</option>
                          <option value="in_progress">In Progress</option>
                          <option value="achieved">Achieved</option>
                        </select>
                      </div>
                      
                      {/* Simple progress bar representation based on status */}
                      <div style={{ width: '100%', height: '8px', background: 'var(--surface-hover)', borderRadius: '999px', overflow: 'hidden', marginTop: '0.75rem' }}>
                        <div style={{ 
                          width: goal.status === 'achieved' ? '100%' : goal.status === 'in_progress' ? '50%' : '0%', 
                          height: '100%', 
                          background: goal.status === 'achieved' ? 'var(--secondary)' : 'var(--primary)', 
                          borderRadius: '999px',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Recent Finalized Documents</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {documents.filter(d => !d.is_draft).slice(0,3).map(doc => (
                  <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ color: '#059669', background: '#ECFDF5', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <FileText size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{doc.type.replace('_', ' ')}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{new Date(doc.created_at).toLocaleDateString()}</div>
                    </div>
                    <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View</button>
                  </div>
                ))}
                {documents.filter(d => !d.is_draft).length === 0 && <p style={{ color: 'var(--text-muted)' }}>No final documents yet.</p>}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Parent Collaboration</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Parents linked to this student will see active goals and finalized documents in their read-only portal.
              </p>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                Manage Parent Links
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ieps' && (
        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          <div>
            <AIDocumentGenerator studentId={student.id} onSuccess={fetchData} />
          </div>
          <div>
            <div className="card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Drafts & History</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {documents.map(doc => (
                  <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ color: doc.is_draft ? '#D97706' : '#059669', background: doc.is_draft ? '#FFFBEB' : '#ECFDF5', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <FileText size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                        {doc.type.replace('_', ' ')}
                        {doc.is_draft && <span className="badge badge-purple" style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>Draft</span>}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{new Date(doc.created_at).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
                {documents.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No documents generated yet.</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Chronological History</h2>
          <p style={{ color: 'var(--text-muted)' }}>A digital record of all documents and goals, preserved across educator assignments.</p>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Very simple chronological view combining docs and goals */}
            {[...documents.map(d => ({ ...d, sortDate: new Date(d.created_at), tag: 'Document' })), 
              ...goals.map(g => ({ ...g, sortDate: new Date(g.created_at), tag: 'Goal Added' }))]
              .sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime())
              .map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontWeight: 600, minWidth: '100px' }}>{item.sortDate.toLocaleDateString()}</div>
                  <div>
                    <span className="badge badge-blue" style={{ marginRight: '0.5rem' }}>{item.tag}</span>
                    <span style={{ fontWeight: 500 }}>{item.title || item.type?.replace('_', ' ')}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
