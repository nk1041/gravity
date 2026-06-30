import { User, Mail, Briefcase, Building, GraduationCap, Save } from 'lucide-react';

const MyProfile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-3xl font-bold font-heading text-textColor">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information and professional details.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
          <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center text-3xl font-bold shadow-md">
            ED
          </div>
        </div>
        
        <div className="px-8 pt-16 pb-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><User size={16}/> Full Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all" defaultValue="Educator Name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Mail size={16}/> Email Address</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-500 bg-gray-50" readOnly defaultValue="educator@school.edu" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Briefcase size={16}/> Profession / Title</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="e.g. Special Education Teacher" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Building size={16}/> Organization / School</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="e.g. Lincoln High School" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><GraduationCap size={16}/> Years of Experience</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                <option value="">Select experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-50 flex justify-end">
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md hover:-translate-y-0.5">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
