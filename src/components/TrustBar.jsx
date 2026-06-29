const TrustBar = () => {
  const stats = [
    { label: "Documents Generated", value: "100k+" },
    { label: "Time Saved", value: "15 hrs/wk" },
    { label: "School Districts", value: "250+" },
    { label: "Happy Educators", value: "10,000+" },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
          Trusted by special education professionals nationwide
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-altBackground transition-colors">
              <span className="text-3xl md:text-4xl font-bold font-heading text-primary mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
