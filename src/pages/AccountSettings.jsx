import { Save, Settings, Moon, Globe, Clock, FileDown } from 'lucide-react';

const AccountSettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-3xl font-bold font-heading text-textColor">Account Settings</h1>
        <p className="text-gray-500 mt-1">Customize your platform preferences.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Globe size={18} className="text-primary"/> Localization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Time Zone</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                  <option>Pacific Time (PT)</option>
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Greenwich Mean Time (GMT)</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-50" />

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Moon size={18} className="text-primary"/> Appearance</h3>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Theme Preference</label>
              <div className="flex gap-4">
                <label className="flex-1 border border-primary bg-primary/5 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="theme" defaultChecked className="text-primary focus:ring-primary h-4 w-4" />
                  <span className="font-bold text-gray-800">Light Mode</span>
                </label>
                <label className="flex-1 border border-gray-200 hover:bg-gray-50 rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors">
                  <input type="radio" name="theme" className="text-primary focus:ring-primary h-4 w-4" />
                  <span className="font-bold text-gray-800">Dark Mode</span>
                </label>
              </div>
            </div>
          </div>

          <hr className="border-gray-50" />

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><FileDown size={18} className="text-primary"/> Default PDF Settings</h3>
            <div>
              <label className="flex items-center gap-3 mb-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary h-4 w-4" />
                <span className="text-sm font-medium text-gray-700">Include Organization Logo on export</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary h-4 w-4" />
                <span className="text-sm font-medium text-gray-700">Add Date/Time stamp automatically</span>
              </label>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-50 flex justify-end">
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md hover:-translate-y-0.5">
              <Save size={18} /> Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
