import { Bookmark, Plus, FileText, Trash2, Edit2 } from 'lucide-react';

const SavedTemplates = () => {
  const templates = [
    { id: 1, name: 'Standard IEP (Autism)', type: 'IEP', lastUsed: '2 days ago' },
    { id: 2, name: 'Weekly Progress Note', type: 'Session Note', lastUsed: '5 days ago' },
    { id: 3, name: 'Initial Evaluation Report', type: 'Assessment', lastUsed: '1 week ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-textColor">Saved Templates</h1>
          <p className="text-gray-500 mt-1">Manage your custom templates for faster document generation.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm">
          <Plus size={18} /> New Template
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Bookmark size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{template.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <FileText size={14} /> {template.type}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <span className="text-xs text-gray-400">Used {template.lastUsed}</span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="bg-altBackground border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer min-h-[220px]">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary mb-4">
            <Plus size={24} />
          </div>
          <h3 className="font-bold text-gray-800">Create Custom Template</h3>
          <p className="text-sm text-gray-500 mt-1">Start from scratch or use an existing document.</p>
        </div>
      </div>
    </div>
  );
};

export default SavedTemplates;
