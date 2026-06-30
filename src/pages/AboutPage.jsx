import FadeIn from '../components/FadeIn';

const AboutPage = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden min-h-[60vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              About <span className="text-primary">SimplyAbled</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We are on a mission to empower special education professionals by removing the burden of paperwork, giving them more time to do what they do best: supporting students.
            </p>
            <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-500 leading-relaxed text-lg">
              Founded by a team of passionate educators and technologists, SimplyAbled leverages the latest in AI to create structured, zero-prompting workflows for generating IEPs, ITPs, and lesson plans securely and compliantly.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutPage;
