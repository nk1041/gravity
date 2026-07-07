import { useState, useEffect } from 'react';
import { Users, Search, Plus, FileText, ChevronRight, Loader2, X } from 'lucide-react';
import { supabase } from '../supabase';

const StudentProfiles = () => {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', grade: '', age: '', diagnosis: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setStudents(data || []);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('students')
        .insert({ ...form, user_id: user.id, age: parseInt(form.age) || null })
        .select()
        .single();
      if (error) throw error;
      setStudents(prev => [data, ...prev]);
      setForm({ name: '', grade: '', age: '', diagnosis: '' });
      setShowModal(false);
    } catch (err) {
      console.error('Error adding student:', err);
      alert('Failed to add student. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-textColor">Student Roster</h1>
          <p className="text-gray-500">Manage your students and their linked documentation.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Add Student
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name..."
              className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Diagnosis</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <Loader2 size={32} className="animate-spin mx-auto text-primary/60 mb-3" />
                    <p className="text-gray-500 font-medium">Loading students...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg font-medium">
                      {students.length === 0 ? 'No students added yet.' : 'No students found.'}
                    </p>
                    <p className="text-sm mt-1">
                      {students.length === 0
                        ? 'Click "Add Student" to get started.'
                        : 'Try adjusting your search terms.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                          {student.name?.split(' ').map(n => n[0]).join('') || '?'}
                        </div>
                        <span className="font-bold text-gray-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">{student.grade || '—'}</p>
                        {student.age && <p className="text-gray-500">Age: {student.age}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {student.diagnosis ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-altBackground border border-gray-200 text-gray-600">
                          {student.diagnosis}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading text-gray-800">Add New Student</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. James Doe"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Grade</label>
                  <select
                    value={form.grade}
                    onChange={e => setForm(p => ({ ...p, grade: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select</option>
                    <option>Kindergarten</option>
                    <option>1st Grade</option>
                    <option>2nd Grade</option>
                    <option>3rd Grade</option>
                    <option>4th Grade</option>
                    <option>5th Grade</option>
                    <option>Middle School</option>
                    <option>High School</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="3" max="22"
                    placeholder="e.g. 8"
                    value={form.age}
                    onChange={e => setForm(p => ({ ...p, age: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Diagnosis / Category</label>
                <select
                  value={form.diagnosis}
                  onChange={e => setForm(p => ({ ...p, diagnosis: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-white"
                >
                  <option value="">Select</option>
                  <option>Autism Spectrum Disorder</option>
                  <option>Specific Learning Disability</option>
                  <option>Speech/Language Impairment</option>
                  <option>Emotional Disturbance</option>
                  <option>Intellectual Disability</option>
                  <option>Other Health Impairment</option>
                </select>
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70">
                  {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfiles;
