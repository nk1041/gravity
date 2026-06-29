import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { BrainCircuit, Check } from 'lucide-react';

interface Props {
  studentId: string;
  onSuccess: () => void;
}

const AIDocumentGenerator: React.FC<Props> = ({ studentId, onSuccess }) => {
  const { user } = useAuth();
  const [docType, setDocType] = useState('iep');
  const [focusArea, setFocusArea] = useState('General');
  const [observations, setObservations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedDoc, setGeneratedDoc] = useState<{ id: string, content: string } | null>(null);
  
  // For editing draft
  const [editedContent, setEditedContent] = useState('');
  const [savingFinal, setSavingFinal] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      const formData = { focusArea, observations };
      
      const { data, error: funcError } = await supabase.functions.invoke('generate-document', {
        body: { type: docType, formData }
      });
      
      if (funcError) throw funcError;

      // Save as draft in DB
      const { data: dbData, error: dbError } = await supabase
        .from('documents')
        .insert([{
          student_id: studentId,
          educator_id: user.id,
          type: docType,
          form_data: formData,
          generated_content: data.content,
          is_draft: true
        }])
        .select()
        .single();
        
      if (dbError) throw dbError;

      setGeneratedDoc({ id: dbData.id, content: data.content });
      setEditedContent(data.content);
    } catch (err: any) {
      setError(err.message || 'Error generating document');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFinal = async () => {
    if (!generatedDoc) return;
    setSavingFinal(true);
    try {
      const { error } = await supabase
        .from('documents')
        .update({ generated_content: editedContent, is_draft: false })
        .eq('id', generatedDoc.id);

      if (error) throw error;
      
      setGeneratedDoc(null);
      setEditedContent('');
      setObservations('');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error saving final document');
    } finally {
      setSavingFinal(false);
    }
  };

  if (generatedDoc) {
    return (
      <div className="card animate-fade-in" style={{ border: '2px solid var(--primary-light)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Review Generated Document</h2>
          <span className="badge badge-purple">Draft Mode</span>
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Please review and edit the AI-generated document before saving it as final. Once final, parents will be able to view it (if applicable).
        </p>

        <textarea 
          className="form-textarea" 
          rows={12} 
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6' }}
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => setGeneratedDoc(null)} 
            style={{ flex: 1, justifyContent: 'center' }}
            disabled={savingFinal}
          >
            Discard Draft
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSaveFinal} 
            style={{ flex: 1, justifyContent: 'center' }}
            disabled={savingFinal}
          >
            <Check size={18} /> {savingFinal ? 'Saving...' : 'Save as Final'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>AI Document Generator</h2>
        <p style={{ color: 'var(--text-muted)' }}>Fill the form to generate professional documents.</p>
      </div>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      <form onSubmit={handleGenerate}>
        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Document Type</label>
            <select className="form-select" value={docType} onChange={e => setDocType(e.target.value)}>
              <option value="iep">IEP Generator</option>
              <option value="itp">ITP (Individualized Transition Plan)</option>
              <option value="lesson_plan">Lesson Plan (LP)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Focus Area</label>
            <select className="form-select" value={focusArea} onChange={e => setFocusArea(e.target.value)}>
              <option value="General">General</option>
              <option value="Speech & Language">Speech & Language</option>
              <option value="Occupational / Fine Motor">Occupational / Fine Motor</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Academic">Academic</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Key Observations (Bullet points or rough notes)</label>
          <textarea 
            className="form-textarea" 
            rows={4} 
            required
            placeholder="e.g. Leo had trouble maintaining eye contact today but successfully used his communication board for requesting snacks..."
            value={observations}
            onChange={e => setObservations(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          <BrainCircuit size={18} /> {loading ? 'Generating...' : 'Generate Professional Document'}
        </button>
      </form>
    </div>
  );
};

export default AIDocumentGenerator;
