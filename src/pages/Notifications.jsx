import { Bell, Megaphone, Zap, MessageSquare } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    { id: 1, icon: Megaphone, color: 'text-blue-500', bg: 'bg-blue-50', title: 'New Feature: Custom Templates', desc: 'You can now create and save custom templates for faster document generation.', time: '2 hours ago', unread: true },
    { id: 2, icon: Zap, color: 'text-primary', bg: 'bg-primary/10', title: 'Performance Update', desc: 'Document generation is now 2x faster thanks to our latest AI model upgrade.', time: '1 day ago', unread: false },
    { id: 3, icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50', title: 'Support Ticket Resolved', desc: 'Your question regarding IEP exports has been answered by our team.', time: '3 days ago', unread: false },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-textColor">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay up to date with platform changes and announcements.</p>
        </div>
        <button className="text-primary font-bold text-sm hover:underline">Mark all as read</button>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {notifications.map(note => (
          <div key={note.id} className={`p-6 flex gap-4 transition-colors hover:bg-gray-50/50 ${note.unread ? 'bg-primary/5' : ''}`}>
            <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${note.bg} ${note.color}`}>
              <note.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-bold text-gray-800 ${note.unread ? '' : 'text-gray-700'}`}>{note.title}</h4>
                <span className="text-xs font-medium text-gray-400">{note.time}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{note.desc}</p>
            </div>
            {note.unread && (
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
