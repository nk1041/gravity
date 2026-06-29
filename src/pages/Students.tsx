import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AddStudentModal from '../components/modals/AddStudentModal';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching students:', error);
    } else {
      setStudents(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.diagnosis_tags && s.diagnosis_tags.join(', ').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Students</h1>
          <p className="page-subtitle">Manage profiles, IEPs, and track progress.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} /> Add Student
        </button>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search students by name, diagnosis..." 
              className="form-input"
              style={{ paddingLeft: '2.75rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Student Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Age / DOB</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Diagnosis</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>School</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: '1.5rem', textAlign: 'center' }}>Loading...</td></tr>
              ) : filteredStudents.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '1.5rem', textAlign: 'center' }}>No students found.</td></tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-light)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.875rem' }}>
                          {student.name.charAt(0)}
                        </div>
                        <Link to={`/student/${student.id}`} style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                          {student.name}
                        </Link>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{student.dob || 'N/A'}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{student.diagnosis_tags?.join(', ') || 'N/A'}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{student.school || 'N/A'}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span className="badge badge-green">Active</span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button style={{ color: 'var(--text-muted)', padding: '0.25rem' }}>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isAddModalOpen && (
        <AddStudentModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSuccess={() => {
            setIsAddModalOpen(false);
            fetchStudents();
          }} 
        />
      )}
    </div>
  );
};

export default Students;
