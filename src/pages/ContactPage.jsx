import FadeIn from '../components/FadeIn';

const ContactPage = () => {
  return (
    <section className="py-24 bg-altBackground relative overflow-hidden min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions, feedback, or need support? We'd love to hear from you.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-premium border border-gray-100/80">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200/80 focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]" placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200/80 focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]" placeholder="your@email.com" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200/80 focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-linear-curve shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactPage;
