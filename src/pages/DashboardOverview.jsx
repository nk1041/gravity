import { useState, useEffect } from 'react';
import { FileText, Users, Brain, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const DashboardOverview = () => {
  const [user, setUser] = useState(null);
  const [recentDocs, setRecentDocs] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUser(user);

        // Fetch recent documents (last 3)
        const { data: docs } = await supabase
          .from('documents')
          .select('id, title, type, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        setRecentDocs(docs || []);

        // Fetch recent students (last 3)
        const { data: students } = await supabase
          .from('students')
          .select('id, name, grade, updated_at')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(3);

        setRecentStudents(students || []);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getDocColor = (type) => {
    if (!type) return 'bg-primary/10 text-primary';
    const t = type.toUpperCase();
    if (t === 'IEP') return 'bg-primary/10 text-primary';
    if (t === 'LP') return 'bg-blue-50 text-blue-500';
    return 'bg-green-50 text-green-500';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold font-heading text-textColor">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''} 👋
        </h1>
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
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={28} className="animate-spin text-primary/60" />
              </div>
            ) : recentStudents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Users size={36} className="mb-3 text-gray-200" />
                <p className="font-medium text-gray-500">No students added yet.</p>
                <Link to="/dashboard/students" className="text-sm text-primary mt-2 hover:underline">Add your first student →</Link>
              </div>
            ) : (
              recentStudents.map(student => (
                <div key={student.id} className="p-4 px-6 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {student.name?.split(' ').map(n => n[0]).join('') || '?'}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">{student.name}</h4>
                      <p className="text-xs text-gray-500">{student.grade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Clock size={14} /> {timeAgo(student.updated_at)}
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent Documents */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 font-heading">Recent Documents</h2>
            <Link to="/dashboard/documents" className="text-sm text-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-50 flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={28} className="animate-spin text-primary/60" />
              </div>
            ) : recentDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <FileText size={36} className="mb-3 text-gray-200" />
                <p className="font-medium text-gray-500">No documents generated yet.</p>
                <Link to="/dashboard/tools/iep" className="text-sm text-primary mt-2 hover:underline">Generate your first document →</Link>
              </div>
            ) : (
              recentDocs.map(doc => (
                <div key={doc.id} className="p-4 px-6 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getDocColor(doc.type)}`}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">{doc.title}</h4>
                      <p className="text-xs font-medium text-gray-500">{doc.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    {new Date(doc.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardOverview;
