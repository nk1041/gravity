import { Key, Lock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const ChangePassword = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-3xl font-bold font-heading text-textColor">Change Password</h1>
        <p className="text-gray-500 mt-1">Ensure your account is using a long, random password to stay secure.</p>
      </header>

      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={20} /> Password updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Minimum 8 characters, include numbers and special characters.</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-50 flex justify-end">
          <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md hover:-translate-y-0.5">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
