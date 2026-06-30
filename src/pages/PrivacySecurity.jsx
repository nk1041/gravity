import { Shield, Mail, Trash2, Smartphone } from 'lucide-react';

const PrivacySecurity = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-3xl font-bold font-heading text-textColor">Privacy & Security</h1>
        <p className="text-gray-500 mt-1">Manage your account security and data privacy settings.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-8 border-b border-gray-50 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
            <Mail size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">Change Email Address</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">Update the email address associated with your account.</p>
            <div className="flex gap-4">
              <input type="email" placeholder="New Email Address" className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              <button className="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-50 transition-all">Update</button>
            </div>
          </div>
        </div>

        <div className="p-8 border-b border-gray-50 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
            <Smartphone size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">Active Sessions</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">You are currently logged in on 1 device. If you notice suspicious activity, log out from all devices.</p>
            <button className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all">Logout from all devices</button>
          </div>
        </div>

        <div className="p-8 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
            <Trash2 size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-600">Delete Account</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <button className="bg-red-50 text-red-600 px-6 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all border border-red-100">Delete Account</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacySecurity;
