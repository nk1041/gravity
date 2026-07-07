import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import FadeIn from './FadeIn';

const FinalCTA = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-primary to-amber-500" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Decorative orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        <FadeIn direction="up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-semibold mb-8 border border-white/20">
            <Sparkles size={14} />
            Join educators making an impact
          </div>

          <h2 className="text-4xl md:text-6xl font-black font-heading text-white mb-6 leading-tight tracking-tight">
            Stop spending hours on paperwork.{' '}
            <span className="relative inline-block">
              <span className="text-amber-200">Start in minutes.</span>
              <svg className="absolute -bottom-2 left-0 w-full opacity-50" viewBox="0 0 300 10" fill="none">
                <path d="M2 7 C60 2, 140 12, 300 5" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
          </h2>

          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            SimplyAbled gives special education professionals the time back they deserve — so you can focus on what matters most: your students.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a
              href="#generator"
              className="group bg-white text-primary hover:bg-orange-50 px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95"
            >
              Generate a Document Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Reassurance chips */}
          <div className="flex flex-wrap justify-center gap-4 text-white/70 text-sm">
            {['No credit card required', 'Free forever plan', 'FERPA compliant', 'Generate in seconds'].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-green-300" /> {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FinalCTA;
