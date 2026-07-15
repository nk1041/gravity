import FadeIn from '../components/FadeIn';

const AboutPage = () => {
  return (
    <section className="py-24 bg-altBackground relative overflow-hidden min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              About <span className="text-primary">SimplyAbled</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              We are on a mission to empower special education professionals by removing the burden of paperwork, giving them more time to do what they do best: supporting students.
            </p>
          </div>
        </FadeIn>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn direction="up" delay={100}>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-premium border border-gray-100/80 dark:border-white/10">
              <h2 className="text-2xl font-bold font-heading mb-4 text-gray-900 dark:text-white">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Founded by a team of passionate educators and technologists in India, SimplyAbled was born out of a simple observation: highly trained special educators were spending up to 60% of their working hours on administrative documentation rather than direct student intervention.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                By leveraging advanced, secure Artificial Intelligence, we built a platform that translates raw observations and goals into structured, professional documents—like IEPs and ITPs—in minutes instead of hours.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={200}>
            <div className="flex flex-col gap-6">
              <div className="bg-orange-50 dark:bg-orange-500/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-500/20">
                <h3 className="text-xl font-bold text-primary mb-2">Our Mission</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">To democratize access to high-quality educational documentation tools, ensuring every special education professional has the resources they need to succeed.</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-500/10 p-6 rounded-2xl border border-purple-100 dark:border-purple-500/20">
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-2">Security First</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">We understand the extreme sensitivity of student data. Our architecture is built ground-up to comply with stringent data protection laws, including the Indian DPDP Act.</p>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;
