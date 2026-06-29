import { useState } from 'react';
import { Users, Search, Plus, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentProfiles = () => {
  const [search, setSearch] = useState('');

  const students = [
    { id: 1, name: 'James Doe', grade: '3rd Grade', age: 8, diagnosis: 'Specific Learning Disability', strengths: 'Strong verbal reasoning, creative', goals: 'Improve reading fluency', docs: 3 },
    { id: 2, name: 'Sarah Smith', grade: '5th Grade', age: 10, diagnosis: 'Autism Spectrum Disorder', strengths: 'Excellent memory, detail-oriented', goals: 'Social skill development', docs: 5 },
    { id: 3, name: 'Michael Johnson', grade: '1st Grade', age: 6, diagnosis: 'Speech/Language Impairment', strengths: 'Enthusiastic, eager to learn', goals: 'Articulation and expressive language', docs: 1 },
  ];

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-textColor">Student Roster</h1>
          <p className="text-gray-500">Manage your students and their linked documentation.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm">
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
                <th className="px-6 py-4 text-center">Docs</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-gray-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-800 font-medium">{student.grade}</p>
                      <p className="text-gray-500">Age: {student.age}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-altBackground border border-gray-200 text-gray-600">
                      {student.diagnosis}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-sm">
                      {student.docs}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg font-medium">No students found</p>
                    <p className="text-sm mt-1">Try adjusting your search terms.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentProfiles;
