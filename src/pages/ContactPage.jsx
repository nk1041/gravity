import FadeIn from '../components/FadeIn';
import { Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <section className="py-24 bg-altBackground relative overflow-hidden min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Have questions, feedback, or need support? We're here to help you get the most out of SimplyAbled.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl shadow-premium border border-gray-100/80 dark:border-white/10">
                <h3 className="text-2xl font-bold font-heading mb-6 text-gray-900 dark:text-white">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-primary shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">Email Us</p>
                      <a href="mailto:support@simplyabled.com" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">support@simplyabled.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">Registered Address</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">[Your Registered Address]<br />[City, State, ZIP]<br />India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-primary shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">Support Hours</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Monday - Friday<br />9:00 AM - 6:00 PM (IST)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-premium border border-gray-100/80 dark:border-white/10">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200/80 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]" placeholder="John" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200/80 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]" placeholder="Doe" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200/80 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea rows="5" className="w-full px-4 py-3 rounded-xl border border-gray-200/80 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] resize-none" placeholder="How can we help you?" required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-linear-curve shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactPage;
