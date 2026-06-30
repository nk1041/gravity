import { HelpCircle, MessageCircle, Bug, Lightbulb } from 'lucide-react';

const HelpSupport = () => {
  const faqs = [
    { q: "How do I export a document?", a: "Click the 'Export as PDF' button at the bottom of the generated document. Make sure you are logged in." },
    { q: "Can I edit an IEP after generation?", a: "Yes, once exported as a PDF or copied to clipboard, you can make adjustments in your preferred text editor." },
    { q: "Is patient data secure?", a: "Yes, we do not store PII (Personally Identifiable Information) in our database. Documents are generated on the fly." },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-3xl font-bold font-heading text-textColor">Help & Support</h1>
        <p className="text-gray-500 mt-1">We're here to help you get the most out of SimplyAbled.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-primary/30 transition-all cursor-pointer hover:shadow-md">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Contact Support</h3>
          <p className="text-sm text-gray-500">Get in touch with our friendly support team.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-primary/30 transition-all cursor-pointer hover:shadow-md">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
            <Bug size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Report a Bug</h3>
          <p className="text-sm text-gray-500">Found something broken? Let us know.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-primary/30 transition-all cursor-pointer hover:shadow-md">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-4">
            <Lightbulb size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Request a Feature</h3>
          <p className="text-sm text-gray-500">Have an idea? We'd love to hear it.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <HelpCircle size={20} className="text-primary"/> Frequently Asked Questions
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6">
              <h4 className="font-bold text-gray-800 mb-2 text-lg">{faq.q}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
