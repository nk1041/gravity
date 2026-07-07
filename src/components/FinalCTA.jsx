import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

const FinalCTA = () => {
  return (
    <section className="bg-gray-900 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn direction="up">
          <p className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-5">
            Get started today
          </p>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-white leading-tight mb-6">
            Focus on your students.<br />
            We'll handle the paperwork.
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Join special education professionals who use SimplyAbled to cut document time by hours every week.
          </p>
          <a
            href="#generator"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 active:translate-y-0"
          >
            Generate a Document Free <ArrowRight size={17} />
          </a>
          <p className="mt-5 text-sm text-gray-600">
            No credit card required · Free plan available
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default FinalCTA;
