import { FileText, Users, Brain, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  const recentStudents = [
    { id: 1, name: 'James Doe', grade: '3rd Grade', lastActive: '2 hours ago' },
    { id: 2, name: 'Sarah Smith', grade: '5th Grade', lastActive: 'Yesterday' },
    { id: 3, name: 'Michael Johnson', grade: '1st Grade', lastActive: '2 days ago' },
  ];

  const recentDocs = [
    { id: 1, title: 'IEP Draft - J.D.', type: 'IEP', date: 'Oct 12, 2026' },
    { id: 2, title: 'Math Lesson Plan - Fractions', type: 'Lesson Plan', date: 'Oct 10, 2026' },
    { id: 3, title: 'M-CHAT Screening - S.S.', type: 'Assessment', date: 'Oct 08, 2026' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold font-heading text-textColor">Welcome back, Educator 👋</h1>
        <p className="text-gray-500 mt-2">Here's what's happening with your students today.</p>
      </header>

      {/* Quick Actions / Favourite Tools */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 font-heading">Favourite Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/dashboard/tools/iep" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors">IEP Generator</h3>
              <p className="text-sm text-gray-500 mt-1">Draft compliant IEPs in seconds.</p>
            </div>
          </Link>
          <Link to="/dashboard/tools/mchat" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">M-CHAT Screening</h3>
              <p className="text-sm text-gray-500 mt-1">Automated autism screening and scoring.</p>
            </div>
          </Link>
          <Link to="/dashboard/students" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors">Student Roster</h3>
              <p className="text-sm text-gray-500 mt-1">Manage profiles and linked documents.</p>
            </div>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Students */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 font-heading">Recently Accessed Students</h2>
            <Link to="/dashboard/students" className="text-sm text-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-50 flex-1">
            {recentStudents.map(student => (
              <div key={student.id} className="p-4 px-6 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">{student.name}</h4>
                    <p className="text-xs text-gray-500">{student.grade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Clock size={14} /> {student.lastActive}
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Documents */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 font-heading">Recent Documents</h2>
            <Link to="/dashboard/documents" className="text-sm text-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-50 flex-1">
            {recentDocs.map(doc => (
              <div key={doc.id} className="p-4 px-6 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${doc.type === 'IEP' ? 'bg-primary/10 text-primary' : doc.type === 'Lesson Plan' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'}`}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">{doc.title}</h4>
                    <p className="text-xs font-medium text-gray-500">{doc.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  {doc.date}
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardOverview;
