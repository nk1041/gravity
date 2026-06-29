import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Target, Plus } from 'lucide-react';

interface Props {
  studentId: string;
  onSuccess: () => void;
}

const AddGoalForm: React.FC<Props> = ({ studentId, onSuccess }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('goals')
        .insert([{
          student_id: studentId,
          educator_id: user.id,
          title,
          description,
          status: 'not_started'
        }]);

      if (error) throw error;
      
      setTitle('');
      setDescription('');
      setIsOpen(false);
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        className="btn btn-outline" 
        onClick={() => setIsOpen(true)} 
        style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem', borderStyle: 'dashed' }}
      >
        <Plus size={18} /> Add New Goal
      </button>
    );
  }

  return (
    <div className="card" style={{ marginBottom: '1.5rem', background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Target size={18} color="var(--primary)" /> Define New Goal
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label className="form-label" style={{ fontSize: '0.875rem' }}>Goal Title</label>
          <input type="text" required className="form-input" placeholder="e.g. Improve expressive language" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="form-label" style={{ fontSize: '0.875rem' }}>Description / Measurement</label>
          <textarea className="form-textarea" rows={2} placeholder="e.g. Will use 3-word sentences 80% of the time..." value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={() => setIsOpen(false)} className="btn btn-outline" style={{ flex: 1, padding: '0.5rem' }}>Cancel</button>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>
            {loading ? 'Saving...' : 'Save Goal'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalForm;
