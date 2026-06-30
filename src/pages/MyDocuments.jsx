import { useState } from 'react';
import { Search, Filter, FileText, MoreVertical, Edit2, Copy, Trash2, Download } from 'lucide-react';

const MyDocuments = () => {
  const [search, setSearch] = useState('');
  
  const documents = [
    { id: 1, title: 'IEP - James Doe', type: 'IEP', date: 'Oct 12, 2026', status: 'Generated' },
    { id: 2, title: 'Lesson Plan: Fractions', type: 'Lesson Plan', date: 'Oct 10, 2026', status: 'Generated' },
    { id: 3, title: 'M-CHAT Report: Sarah', type: 'Assessment', date: 'Oct 08, 2026', status: 'Generated' },
    { id: 4, title: 'ITP - Michael Johnson', type: 'ITP', date: 'Oct 05, 2026', status: 'Generated' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-textColor">My Documents</h1>
          <p className="text-gray-500 mt-1">View and manage all your generated documentation.</p>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter size={16} /> Filter by Type
          </button>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documents.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <span className="font-bold text-gray-800">{doc.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-altBackground border border-gray-200 text-gray-600">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{doc.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Download PDF"><Download size={18} /></button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit2 size={18} /></button>
                      <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Duplicate"><Copy size={18} /></button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyDocuments;
