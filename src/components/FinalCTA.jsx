const FinalCTA = () => {
  return (
    <section className="bg-primary py-24 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6 leading-tight">
          Ready to focus on your students instead of paperwork?
        </h2>
        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          Join thousands of special education professionals who have reclaimed their time with SimplyAbled.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); alert('Sign up flow is coming soon!'); }}
            className="bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
