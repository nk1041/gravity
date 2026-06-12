import React, { useState, useEffect } from 'react';
import { 
  Home, Users, Calendar, FileText, MessageSquare, Bell, Settings, LogOut, 
  Menu, Search, Moon, Sun, ChevronLeft, ChevronRight, CheckCircle, Clock, 
  X, Upload, Plus, Download, Edit, Star, MapPin, Video, User, Lock, Eye, 
  EyeOff, Shield, Trash2, ArrowRight, Activity, BookOpen, CheckSquare, 
  Filter, MoreVertical, Paperclip, Send, Folder, FileCheck, Check, Brain
} from 'lucide-react';

// --- UTILS ---
const AnimatedNumber = ({ end, duration = 1000 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return <span>{count}</span>;
};

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const EmptyState = ({ icon: Icon, title, message, action }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-[#1E1244] rounded-2xl border border-gray-100 dark:border-[#3D2A7A]">
    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">{message}</p>
    {action && action}
  </div>
);

// --- VIEWS ---

const Overview = ({ role, profile, changeView, supabase }) => {
  const [stats, setStats] = useState({ appointments: 0, documents: 0, professionals: 0, messages: 0, clients: 0, pending: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (!supabase || !profile) return;
      const isParent = profile.role === 'Parent';
      const field = isParent ? 'parent_id' : 'professional_id';

      const { count: apptCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq(field, profile.id)
        .eq('status', 'Confirmed');

      const { count: pendingCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq(field, profile.id)
        .eq('status', 'Pending');

      setStats({
        appointments: apptCount || 0,
        documents: 0, // Mocked for now, pending documents table fix
        professionals: 0,
        messages: 0,
        clients: apptCount || 0,
        pending: pendingCount || 0
      });
    };
    fetchStats();
  }, [supabase, profile]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-purple-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <Activity size={300} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Good morning, {profile?.full_name?.split(' ')[0] || 'User'} ðŸ‘‹</h1>
        <p className="text-purple-100 text-lg">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {role === 'Parent' ? (
        <>
          {/* PARENT STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Confirmed Appointments', count: stats.appointments, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { label: 'Pending Requests', count: stats.pending, icon: CheckSquare, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { label: 'Unread Messages', count: stats.messages, icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex items-center gap-4">
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={28} /></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white"><AnimatedNumber end={stat.count} /></div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => changeView('find_professionals')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left group">
                  <Calendar className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-bold text-gray-900 dark:text-white">Book Appointment</div>
                </button>
                <button onClick={() => changeView('find_professionals')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left group">
                  <Search className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-bold text-gray-900 dark:text-white">Find Professional</div>
                </button>
                <button onClick={() => changeView('messages')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left group">
                  <MessageSquare className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-bold text-gray-900 dark:text-white">Send Message</div>
                </button>
                <button onClick={() => changeView('appointments')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left group">
                  <FileText className="text-primary mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-bold text-gray-900 dark:text-white">View Appointments</div>
                </button>
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex flex-col justify-center">
              <EmptyState icon={Calendar} title="No upcoming appointments" message="You have no confirmed appointments for today." action={
                <button onClick={() => changeView('appointments')} className="text-primary text-sm font-bold hover:underline">View Calendar</button>
              }/>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* EDUCATOR STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Confirmed Appointments', count: stats.appointments, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { label: 'Pending Requests', count: stats.pending, icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { label: 'Documents Generated', count: stats.documents, icon: FileText, color: 'text-green-500', bg: 'bg-green-500/10' },
              { label: 'Profile Verified', count: profile?.is_approved ? 1 : 0, icon: CheckSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex items-center gap-4">
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={28} /></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white"><AnimatedNumber end={stat.count} /></div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Schedule */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex flex-col justify-center min-h-[300px]">
              <EmptyState icon={Calendar} title="No schedule for today" message="You have no confirmed appointments for today." action={
                <button onClick={() => changeView('appointments')} className="text-primary text-sm font-bold hover:underline">View Calendar</button>
              }/>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4">
                <button onClick={() => changeView('tools')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform"><Brain size={20}/></div>
                  <div className="font-bold text-gray-900 dark:text-white">AI Document Tools</div>
                </button>
                <button onClick={() => changeView('clients')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform"><Users size={20}/></div>
                  <div className="font-bold text-gray-900 dark:text-white">Manage Clients</div>
                </button>
                <button onClick={() => changeView('onboarding')} className="p-4 rounded-xl border border-gray-200 dark:border-[#3D2A7A] hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg group-hover:scale-110 transition-transform"><Edit size={20}/></div>
                  <div className="font-bold text-gray-900 dark:text-white">Update Profile</div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FindProfessionals = ({ supabase, userProfile, session }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingFor, setBookingFor] = useState(null);

  const handleBook = async (proId) => {
    if (!userProfile || userProfile.role !== 'Parent') {
      alert('Only parents can book appointments.');
      return;
    }
    setBookingFor(proId);
    const { error } = await supabase.from('appointments').insert([{
      parent_id: userProfile.id,
      professional_id: proId,
      booking_date: new Date().toISOString().split('T')[0],
      booking_time: '10:00 AM',
      status: 'Pending'
    }]);
    setBookingFor(null);
    if (!error) {
      alert('Appointment request sent!');
    } else {
      alert('Failed to send request.');
    }
  };

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'Professional')
        .eq('is_approved', true);
      
      if (data) setProfessionals(data);
      setLoading(false);
    };
    fetchProfessionals();
  }, [supabase]);

  const locateMe = () => {
    setIsLocating(true);
    setLocationError('');
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.state_district;
        if (city) setCityFilter(city);
      } catch (e) {
        setLocationError("Could not determine your city.");
      }
      setIsLocating(false);
    }, () => {
      setLocationError("Location access denied.");
      setIsLocating(false);
    });
  };

  const filteredPros = professionals.filter(pro => {
    const nameMatch = pro.full_name ? pro.full_name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const qualMatch = pro.qualifications ? pro.qualifications.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const searchMatch = nameMatch || qualMatch;
    
    const dFilter = deptFilter === '' || pro.dept === deptFilter;
    const cFilter = cityFilter === '' || (pro.city && pro.city.toLowerCase().includes(cityFilter.toLowerCase()));
    
    return searchMatch && dFilter && cFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-purple-800 p-8 rounded-3xl text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Find Specialized Professionals</h1>
        <p className="text-purple-100 max-w-2xl mb-8 text-lg">Connect with verified special educators, therapists, and psychologists across India.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input type="text" placeholder="Search by name or qualification..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-xl outline-none focus:ring-2 focus:ring-purple-300 shadow-sm" />
          </div>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="px-4 py-3 bg-white text-gray-900 rounded-xl outline-none focus:ring-2 focus:ring-purple-300 shadow-sm font-medium">
            <option value="">All Departments</option>
            <option>Special Education</option>
            <option>Speech-Language Therapy</option>
            <option>Occupational Therapy</option>
            <option>Clinical Psychology</option>
            <option>Behavioral Therapy</option>
          </select>
          <div className="relative flex-1 md:max-w-xs">
            <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input type="text" placeholder="City" value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-xl outline-none focus:ring-2 focus:ring-purple-300 shadow-sm" />
            <button onClick={locateMe} className="absolute right-2 top-2 p-1.5 bg-gray-100 hover:bg-gray-200 text-primary rounded-lg transition-colors flex items-center gap-1 text-xs font-bold" disabled={isLocating}>
              {isLocating ? 'Locating...' : 'Near Me'}
            </button>
          </div>
        </div>
        {locationError && <p className="text-red-300 text-sm mt-2 font-medium bg-red-900/20 w-fit px-3 py-1 rounded-full">{locationError}</p>}
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-12">Loading professionals...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPros.map((pro, i) => (
            <div key={i} className="bg-white dark:bg-[#1E1244] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex flex-col transition-all hover:shadow-md hover:border-primary/30">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-200 text-primary flex items-center justify-center font-bold text-xl shadow-inner shrink-0">{getInitials(pro.full_name)}</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{pro.full_name}</h3>
                    <p className="text-primary font-medium text-sm mt-1">{pro.dept || 'Professional'}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><BookOpen size={16} className="text-gray-400"/> {pro.qualifications || 'Certified'}</div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><MapPin size={16} className="text-gray-400"/> {pro.city || 'Online'}</div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Video size={16} className="text-gray-400"/> {pro.consultation_mode || 'Online'}</div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white"><Star size={16} className="text-yellow-400 fill-yellow-400"/> 5.0 <span className="text-gray-400 font-normal">(New)</span></div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-[#3D2A7A] flex gap-3 mt-auto">
                <button className="flex-1 py-2.5 border border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-colors">View Profile</button>
                <button onClick={() => handleBook(pro.id)} disabled={bookingFor === pro.id} className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50">{bookingFor === pro.id ? 'Booking...' : 'Book Now'}</button>
              </div>
            </div>
          ))}
          {filteredPros.length === 0 && (
            <div className="col-span-full py-12">
              <EmptyState icon={Search} title="No professionals found" message="Try adjusting your filters to find more results." />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const MyAppointments = ({ supabase, userProfile, session }) => {
  const [tab, setTab] = useState('upcoming');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const isParent = userProfile?.role === 'Parent';
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          professional:professional_id(full_name, dept),
          parent:parent_id(full_name)
        `)
        .eq(isParent ? 'parent_id' : 'professional_id', userProfile?.id);
      
      if (data) {
        setAppointments(data);
      }
      setLoading(false);
    };
    if (userProfile?.id) {
      fetchAppointments();
    }
  }, [supabase, userProfile]);

  const handleUpdateStatus = async (id, newStatus) => {
    const { error } = await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    }
  };

  const isParent = userProfile?.role === 'Parent';

  // Naive filtering for demo
  const filteredAppointments = appointments.filter(a => {
    if (tab === 'upcoming') return a.status !== 'Completed' && a.status !== 'Cancelled' && a.status !== 'Rejected';
    if (tab === 'past') return a.status === 'Completed';
    if (tab === 'cancelled') return a.status === 'Cancelled' || a.status === 'Rejected';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
        {isParent && (
          <button onClick={() => alert('Search for a professional and click Book Now on their profile')} className="bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2">
            <Plus size={18} /> New Appointment
          </button>
        )}
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-[#3D2A7A]">
        {['upcoming', 'past', 'cancelled'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`pb-3 px-2 font-bold capitalize transition-colors ${tab === t ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-12">Loading appointments...</p>
      ) : filteredAppointments.length > 0 ? (
        <div className="grid gap-4">
          {filteredAppointments.map(appt => {
            const displayName = isParent ? appt.professional?.full_name : appt.parent?.full_name;
            const subTitle = isParent ? appt.professional?.dept : 'Parent';
            
            return (
              <div key={appt.id} className="bg-white dark:bg-[#1E1244] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">{getInitials(displayName || 'U N')}</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{displayName || 'Unknown'}</h3>
                    <p className="text-gray-500 text-sm">{subTitle}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm font-medium">
                      <span className={`px-2 py-1 rounded ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : appt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{appt.status}</span>
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300"><Calendar size={14}/> {appt.booking_date || 'TBD'}</span>
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300"><Clock size={14}/> {appt.booking_time || 'TBD'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  {!isParent && appt.status === 'Pending' && (
                    <>
                      <button onClick={() => handleUpdateStatus(appt.id, 'Confirmed')} className="flex-1 md:flex-none px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors">Accept</button>
                      <button onClick={() => handleUpdateStatus(appt.id, 'Rejected')} className="flex-1 md:flex-none px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-colors">Reject</button>
                    </>
                  )}
                  {appt.status === 'Confirmed' && (
                    <button className="flex-1 md:flex-none px-4 py-2 bg-primary hover:bg-purple-700 text-white rounded-xl font-bold shadow-sm transition-colors">Join Session</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={Calendar} title={`No ${tab} appointments`} message={`You don't have any ${tab} appointments to show.`} />
      )}
    </div>
  );
};
const MyDocuments = ({ supabase, userProfile, session }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      const isParent = userProfile?.role === 'Parent';
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq(isParent ? 'parent_id' : 'professional_id', userProfile?.id);
      
      if (data) {
        setDocuments(data);
      }
      setLoading(false);
    };
    if (userProfile?.id) {
      fetchDocuments();
    }
  }, [supabase, userProfile]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Documents</h1>
        {userProfile?.role === 'Professional' && (
          <button className="bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2">
            <Plus size={18} /> Generate New
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-[#1E1244] rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] overflow-hidden">
        {loading ? (
          <p className="text-center py-12">Loading documents...</p>
        ) : documents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#1A1033] border-b border-gray-100 dark:border-[#3D2A7A]">
                  <th className="p-4 font-bold text-sm text-gray-600 dark:text-gray-400">Title</th>
                  <th className="p-4 font-bold text-sm text-gray-600 dark:text-gray-400">Type</th>
                  <th className="p-4 font-bold text-sm text-gray-600 dark:text-gray-400">Date</th>
                  <th className="p-4 font-bold text-sm text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-50 dark:border-[#1A1033] hover:bg-gray-50 dark:hover:bg-[#1A1033]/50">
                    <td className="p-4">
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText size={18} className="text-primary" /> {doc.title}
                      </div>
                    </td>
                    <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{doc.document_type}</span></td>
                    <td className="p-4 text-sm text-gray-500">{new Date(doc.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors"><Download size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={FileText} title="No documents found" message="There are no documents generated yet." />
        )}
      </div>
    </div>
  );
};
const EducatorOnboarding = ({ supabase, userProfile, session }) => {
  const [saving, setSaving] = useState(false);
  
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.target);
    const updates = {
      full_name: formData.get('fullName'),
      qualifications: formData.get('qual'),
      dept: formData.get('profession'),
      city: formData.get('city'),
      languages: formData.get('languages'),
      consultation_mode: formData.get('mode'),
      is_approved: true // Auto-approve for demo
    };

    const { error } = await supabase.from('profiles').update(updates).eq('id', userProfile?.id);
    setSaving(false);
    
    if (!error) {
      alert('Profile updated and approved successfully!');
    } else {
      alert('Error updating profile');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Profile</h1>
        <p className="text-gray-500">Provide your details to start connecting with parents and clients.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-[#1E1244] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="font-bold text-sm">Full Name</label><input name="fullName" defaultValue={userProfile?.full_name} required type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary" /></div>
          <div className="space-y-2"><label className="font-bold text-sm">Profession</label><select name="profession" defaultValue={userProfile?.dept || ''} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary">
            <option>Special Educator</option><option>Speech Therapist</option><option>Occupational Therapist</option><option>Psychologist</option>
          </select></div>
        </div>
        
        <div className="space-y-2"><label className="font-bold text-sm">Qualifications</label><input name="qual" defaultValue={userProfile?.qualifications} placeholder="e.g. B.Ed Special Education, M.Sc Psychology" type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary" /></div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2"><label className="font-bold text-sm">City</label><input name="city" defaultValue={userProfile?.city} type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary" /></div>
          <div className="space-y-2"><label className="font-bold text-sm">Languages Spoken</label><input name="languages" defaultValue={userProfile?.languages} placeholder="e.g. English, Hindi" type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary" /></div>
        </div>

        <div className="space-y-2"><label className="font-bold text-sm">Consultation Mode</label><select name="mode" defaultValue={userProfile?.consultation_mode || 'Online'} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none focus:border-primary">
          <option>Online</option><option>In-Person</option><option>Online & In-Person</option>
        </select></div>

        <button type="submit" disabled={saving} className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-purple-700 transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : 'Submit Profile for Verification'}
        </button>
      </form>
    </div>
  );
};
const EducatorTools = () => {
  const tools = [
    { title: "Child Assessment", desc: "Standardized screening and behavioral observation checklists.", icon: Activity, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "IEP Generator", desc: "AI-assisted Individualized Education Program creation.", icon: FileCheck, color: "text-purple-500", bg: "bg-purple-100" },
    { title: "ITP Generator", desc: "Transition planning tools for students 14+.", icon: ArrowRight, color: "text-orange-500", bg: "bg-orange-100" },
    { title: "Lesson Plan Builder", desc: "Differentiated daily/weekly lesson plans.", icon: BookOpen, color: "text-green-500", bg: "bg-green-100" },
    { title: "BIP Generator", desc: "Behavior Intervention Plans with positive support strategies.", icon: Brain, color: "text-pink-500", bg: "bg-pink-100" },
    { title: "Task Analysis Tool", desc: "Break down complex life skills into visual checklists.", icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-100" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Professional Tools</h1>
        <p className="text-gray-500 dark:text-gray-400">Streamline your documentation with our AI-powered templates.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((t, i) => (
          <div key={i} className="bg-white dark:bg-[#1E1244] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A] hover:border-primary transition-all group cursor-pointer">
            <div className={`w-16 h-16 rounded-2xl ${t.bg} ${t.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <t.icon size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">{t.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{t.desc}</p>
            <button className="flex items-center gap-2 text-primary font-bold hover:underline">
              Open Tool <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Messages = ({ supabase, userProfile, session }) => (
  <div className="h-full">
    <EmptyState icon={MessageSquare} title="No Messages Found" message="You don't have any active conversations." />
  </div>
);

const NotificationsView = ({ supabase, userProfile, session }) => (
  <div className="h-full">
    <EmptyState icon={Bell} title="No Notifications Found" message="You're all caught up!" />
  </div>
);

const AccountSettings = ({ supabase, userProfile, session }) => {
  const [tab, setTab] = useState('Profile');
  const [pw, setPw] = useState('');
  const strength = pw.length > 8 ? (pw.match(/[!@#$%^&*]/) ? 3 : 2) : (pw.length > 0 ? 1 : 0);
  const colors = ['bg-gray-200 dark:bg-gray-700', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h1>
      
      <div className="flex gap-4 border-b border-gray-200 dark:border-[#3D2A7A] mb-8 overflow-x-auto">
        {['Profile', 'Security', 'Notifications', 'Privacy'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`pb-3 px-4 font-bold transition-colors whitespace-nowrap ${tab === t ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1E1244] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#3D2A7A]">
        {tab === 'Profile' && (
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-2xl">{getInitials(userProfile?.full_name)}</div>
              <button className="px-4 py-2 border border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-colors">Change Photo</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="font-semibold text-sm">Full Name</label><input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" defaultValue={userProfile?.full_name} disabled /></div>
              <div className="space-y-2"><label className="font-semibold text-sm">Email Address</label><input type="email" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" defaultValue={session?.user?.email} disabled /></div>
              <div className="space-y-2"><label className="font-semibold text-sm">Phone Number</label><input type="tel" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" disabled /></div>
              <div className="space-y-2"><label className="font-semibold text-sm">City</label><input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" defaultValue={userProfile?.city} disabled /></div>
            </div>
          </div>
        )}

        {tab === 'Security' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Lock size={20}/> Change Password</h3>
              <div className="space-y-4 max-w-md">
                <input type="password" placeholder="Current Password" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" />
                <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="New Password" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none" />
                <div className="flex gap-2 h-1.5 mt-2">
                  {[1,2,3].map(i => <div key={i} className={`flex-1 rounded-full transition-colors ${strength >= i ? colors[strength] : colors[0]}`}></div>)}
                </div>
                <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-xl outline-none mt-4" />
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-purple-700 transition-colors mt-2">Update Password</button>
              </div>
            </div>
          </div>
        )}

        {(tab === 'Notifications' || tab === 'Privacy') && (
          <EmptyState icon={Settings} title={`${tab} Settings`} message={`Options for ${tab.toLowerCase()} are structural in this demo.`} />
        )}
      </div>
    </div>
  );
};
// --- MAIN DASHBOARD LAYOUT ---
export default function Dashboard({ session, userProfile, supabase, onClose, onLogout }) {
  const [activeView, setActiveView] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const role = userProfile?.role || 'Parent';

  // Mobile Back Button Optimization for Dashboard
  useEffect(() => {
    window.history.pushState({ view: activeView, dashboard: true }, '');
  }, [activeView]);

  useEffect(() => {
    const handlePopState = (e) => {
      if (isSidebarOpen && window.innerWidth < 768) {
        setSidebarOpen(false);
        window.history.pushState({ view: activeView, dashboard: true }, '');
      } else if (e.state && e.state.dashboard && e.state.view) {
        setActiveView(e.state.view);
      } else {
        onClose();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isSidebarOpen, activeView, onClose]);

  const toggleDarkMode = () => {
    const isDark = !isDarkMode;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const parentLinks = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'find_professionals', label: 'Find Professionals', icon: Search },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Profile Settings', icon: Settings },
  ];
  
  const educatorLinks = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Schedule', icon: Calendar },
    { id: 'clients', label: 'My Clients', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'tools', label: 'Professional Tools', icon: Brain },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'onboarding', label: 'Professional Profile', icon: Edit },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'overview': return <Overview role={role} profile={userProfile} changeView={setActiveView} supabase={supabase} session={session} />;
      case 'find_professionals': return <FindProfessionals supabase={supabase} userProfile={userProfile} session={session} />;
      case 'appointments': return <MyAppointments supabase={supabase} userProfile={userProfile} session={session} />;
      case 'documents': return <MyDocuments supabase={supabase} userProfile={userProfile} session={session} />;
      case 'onboarding': return <EducatorOnboarding supabase={supabase} userProfile={userProfile} session={session} />;
      case 'clients': return <MyClients supabase={supabase} userProfile={userProfile} session={session} />;
      case 'tools': return <EducatorTools supabase={supabase} userProfile={userProfile} session={session} />;
      case 'messages': return <Messages supabase={supabase} userProfile={userProfile} session={session} />;
      case 'notifications': return <NotificationsView supabase={supabase} userProfile={userProfile} session={session} />;
      case 'settings': return <AccountSettings supabase={supabase} userProfile={userProfile} session={session} />;
      default: return <Overview role={role} profile={userProfile} changeView={setActiveView} supabase={supabase} session={session} />;
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'dark bg-[#0A0514] text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-[#1A1033] border-r border-gray-200 dark:border-[#3D2A7A] transition-all duration-300 z-40 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'} md:relative md:translate-x-0 ${!isSidebarOpen && 'max-md:-translate-x-full'}`}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-[#3D2A7A]">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2 font-bold text-xl truncate">
              <img src="/SIMPLYLOGO-transparent.png" alt="Logo" className="h-8 object-contain shrink-0" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">SimplyAbled</span>
            </div>
          ) : (
            <img src="/SIMPLYLOGO-transparent.png" alt="Logo" className="h-8 object-contain mx-auto" />
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="hidden md:flex p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500">
            {isSidebarOpen ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
          </button>
        </div>

        {/* User Badge */}
        <div className={`p-4 border-b border-gray-200 dark:border-[#3D2A7A] ${!isSidebarOpen && 'hidden'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold shadow-md shrink-0">
              {getInitials(userProfile?.full_name)}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm truncate dark:text-white">{userProfile?.full_name || 'User Name'}</div>
              <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-bold mt-1 truncate max-w-full">{role}</span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActiveView(link.id); if(window.innerWidth < 768) setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all group relative ${activeView === link.id ? 'bg-primary text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary dark:hover:text-purple-300'}`}
              title={!isSidebarOpen ? link.label : ''}
            >
              <link.icon size={20} className={`shrink-0 ${activeView === link.id ? 'text-white' : 'text-gray-500 group-hover:text-primary'}`} />
              <span className={`truncate ${!isSidebarOpen && 'hidden'}`}>{link.label}</span>
              {activeView === link.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full"></div>}
            </button>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-gray-200 dark:border-[#3D2A7A] space-y-1">
          <button onClick={onClose} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${!isSidebarOpen && 'justify-center'}`} title={!isSidebarOpen ? "Back to Home" : ''}>
            <ArrowRight size={20} className="shrink-0" />
            <span className={`truncate ${!isSidebarOpen && 'hidden'}`}>Back to Home</span>
          </button>
          <button onClick={onLogout} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all ${!isSidebarOpen && 'justify-center'}`} title={!isSidebarOpen ? "Log Out" : ''}>
            <LogOut size={20} className="shrink-0" />
            <span className={`truncate ${!isSidebarOpen && 'hidden'}`}>Log Out</span>
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-gray-50 dark:bg-[#0A0514]">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-[#1E1244] border-b border-gray-200 dark:border-[#3D2A7A] flex items-center justify-between px-4 md:px-6 shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
              Dashboard <ChevronRight size={16} className="mx-1" /> <span className="text-primary capitalize">{activeView.replace('_', ' ')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search..." className="w-48 lg:w-64 pl-9 pr-4 py-2 bg-gray-50 dark:bg-[#1A1033] border border-gray-200 dark:border-[#3D2A7A] rounded-full outline-none focus:border-primary text-sm transition-all focus:w-64 lg:focus:w-80 dark:text-white" />
            </div>
            
            <button onClick={() => setActiveView('notifications')} className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-[#1E1244] rounded-full"></span>
            </button>
            
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </button>
            
            <button onClick={() => setActiveView('settings')} className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold ml-2 shadow-sm border border-primary/30">
              {getInitials(userProfile?.full_name)}
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
}
