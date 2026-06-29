import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const AddStudentModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tags, setTags] = useState('');
  const [school, setSchool] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      const diagnosisArray = tags.split(',').map(t => t.trim()).filter(Boolean);

      // 1. Insert student
      const { data: student, error: studentError } = await supabase
        .from('students')
        .insert([{
          name,
          dob: dob || null,
          diagnosis_tags: diagnosisArray,
          school
        }])
        .select()
        .single();

      if (studentError) throw studentError;

      // 2. Assign to educator
      const { error: assignmentError } = await supabase
        .from('student_educator_assignments')
        .insert([{
          student_id: student.id,
          educator_id: user.id
        }]);

      if (assignmentError) throw assignmentError;

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
    }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px', margin: '1rem', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }}>
          <X size={24} />
        </button>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Add New Student</h2>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Student Name</label>
            <input type="text" required className="form-input" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-input" value={dob} onChange={e => setDob(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Diagnosis Tags (comma separated)</label>
            <input type="text" placeholder="e.g. Autism, ADHD, Speech Delay" className="form-input" value={tags} onChange={e => setTags(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">School</label>
            <input type="text" className="form-input" value={school} onChange={e => setSchool(e.target.value)} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              {loading ? 'Adding...' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
