import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, FileText, Calendar, CheckCircle } from 'lucide-react';

export default function Dashboard({ session, userProfile, supabase, onClose }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [documents, setDocuments] = useState([]);
  const [leads, setLeads] = useState([]);
  
  // Profile Form State
  const [dept, setDept] = useState(userProfile?.dept || '');
  const [qual, setQual] = useState(userProfile?.qual || '');
  const [city, setCity] = useState(userProfile?.city || '');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    fetchDocuments();
    if (userProfile?.role === 'Professional') {
      fetchLeads();
    }
  }, [userProfile]);

  const fetchDocuments = async () => {
    const { data } = await supabase.from('documents').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
    if (data) setDocuments(data);
  };

  const fetchLeads = async () => {
    if (!userProfile?.full_name) return;
    const { data } = await supabase.from('bookings').select('*').eq('professional', userProfile.full_name).order('created_at', { ascending: false });
    if (data) setLeads(data);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const { error } = await supabase.from('profiles').update({ dept, qual, city }).eq('id', session.user.id);
    if (!error) {
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } else {
      alert("Error saving profile");
    }
    setSavingProfile(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0514] text-gray-900 dark:text-white pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-darkCard shadow-sm sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <div className="font-bold text-lg hidden sm:block text-primary">
            {userProfile?.role === 'Professional' ? 'Educator Dashboard' : 'Parent Dashboard'}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              {userProfile?.full_name?.[0] || 'U'}
            </div>
            <span className="font-medium">{userProfile?.full_name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-2">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <User size={20} /> My Profile
          </button>
          <button onClick={() => setActiveTab('documents')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'documents' ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <FileText size={20} /> Saved Documents
          </button>
          {userProfile?.role === 'Professional' && (
            <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'leads' ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <Calendar size={20} /> Appointment Leads
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-darkCard p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-primary">Profile Settings</h2>
              
              <div className="space-y-4 mb-8">
                <div><span className="font-semibold text-gray-500">Name:</span> {userProfile?.full_name}</div>
                <div><span className="font-semibold text-gray-500">Email:</span> {userProfile?.email}</div>
                <div><span className="font-semibold text-gray-500">Role:</span> <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{userProfile?.role}</span></div>
              </div>

              {userProfile?.role === 'Professional' && (
                <form onSubmit={handleSaveProfile} className="space-y-6 bg-gray-50 dark:bg-darkBg p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2">Professional Onboarding</h3>
                  <p className="text-sm text-gray-500">Complete this information to appear in the public booking list and receive appointment leads.</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Specialization / Department</label>
                      <select required value={dept} onChange={(e) => setDept(e.target.value)} className="w-full bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary">
                        <option value="">Select Department</option>
                        <option value="Special Education">Special Education</option>
                        <option value="Speech-Language Therapy">Speech-Language Therapy</option>
                        <option value="Occupational Therapy">Occupational Therapy</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Qualification</label>
                      <input required type="text" value={qual} onChange={(e) => setQual(e.target.value)} className="w-full bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. M.Ed. Special Education" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold">City / Location</label>
                      <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Bangalore or Remote" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button disabled={savingProfile} type="submit" className="bg-primary hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50">
                      {savingProfile ? 'Saving...' : 'Save Profile'}
                    </button>
                    {profileSaved && <span className="text-green-600 font-medium flex items-center gap-2"><CheckCircle size={18} /> Saved!</span>}
                  </div>
                </form>
              )}
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="bg-white dark:bg-darkCard p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-primary">Saved Documents</h2>
              {documents.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No documents generated yet. Use the tools on the homepage to create IEPs, ITPs, and more!</div>
              ) : (
                <div className="grid gap-4">
                  {documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-lg"><FileText size={24} /></div>
                        <div>
                          <div className="font-bold text-lg">{doc.title}</div>
                          <div className="text-sm text-gray-500">{new Date(doc.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <button onClick={() => {
                        const blob = new Blob(['\\ufeff', doc.content], { type: 'application/msword' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a'); a.href = url; a.download = `${doc.title}.doc`; a.click();
                        URL.revokeObjectURL(url);
                      }} className="text-primary font-bold hover:underline px-4">Download</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* LEADS TAB */}
          {activeTab === 'leads' && userProfile?.role === 'Professional' && (
            <div className="bg-white dark:bg-darkCard p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-primary">Appointment Leads</h2>
              {leads.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No leads yet. Make sure your profile is fully completed so parents can book you!</div>
              ) : (
                <div className="grid gap-4">
                  {leads.map(lead => (
                    <div key={lead.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-darkBg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-xl">{lead.parent_name} <span className="text-sm font-normal text-gray-500">- Parent</span></h3>
                          <div className="text-primary font-medium">{lead.session_mode} Session</div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>{new Date(lead.created_at).toLocaleDateString()}</div>
                          <div>{new Date(lead.created_at).toLocaleTimeString()}</div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-y-2 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div><span className="font-semibold text-gray-500">Email:</span> {lead.email}</div>
                        <div><span className="font-semibold text-gray-500">Phone:</span> {lead.phone}</div>
                        <div><span className="font-semibold text-gray-500">Child's Age:</span> {lead.child_age}</div>
                        <div><span className="font-semibold text-gray-500">Condition:</span> {lead.condition}</div>
                        <div><span className="font-semibold text-gray-500">Pref. Date:</span> {lead.booking_date}</div>
                        <div><span className="font-semibold text-gray-500">Pref. Time:</span> {lead.booking_time}</div>
                      </div>
                      {lead.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                          <span className="font-semibold text-gray-500 block mb-1">Notes:</span>
                          <p className="bg-white dark:bg-darkCard p-3 rounded-lg border border-gray-200 dark:border-gray-700">{lead.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
