import { Sparkles, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <section className="bg-white pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
      {/* Single soft glow — not distracting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-orange-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <FadeIn delay={0}>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-5">
                Special Education Platform
              </p>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading leading-[1.1] tracking-tight text-gray-900 mb-6">
                The Complete Platform for<br />
                <span className="text-primary">Special Education.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg text-gray-500 leading-relaxed mb-10">
                Everything special educators need to manage documentation, assessments, lesson planning, student progress, and collaboration in one place.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                <a
                  href="#generator"
                  className="bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 active:translate-y-0"
                >
                  Get Started Free <ArrowRight size={17} />
                </a>
                <a
                  href="#features"
                  className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center"
                >
                  Explore Platform
                </a>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-5 text-sm text-gray-400">
                {['Free to use', 'FERPA compliant', 'No prompting needed'].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" /> {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Document card */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
            <FadeIn delay={200} direction="left">
              <div className="animate-float">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] overflow-hidden">
                  {/* Document header bar */}
                  <div className="h-1 bg-gradient-to-r from-primary to-orange-400" />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          Generated
                        </span>
                        <h3 className="text-base font-bold text-gray-900">IEP Draft — J.D.</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Grade 3 · Autism Spectrum</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-primary shrink-0">
                        <FileText size={18} />
                      </div>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Present Levels</p>
                        <p className="text-gray-600 leading-relaxed text-xs">Student demonstrates strong visual processing skills and is working toward grade-level reading comprehension with structured support.</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Accommodations</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Extended Time', 'Visual Schedules', 'Quiet Workspace'].map(tag => (
                            <span key={tag} className="px-2.5 py-1 text-[11px] font-medium bg-orange-50 text-orange-700 rounded-md border border-orange-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                      <span className="flex items-center gap-1"><Sparkles size={11} className="text-primary" /> SimplyAbled assisted</span>
                      <span>Completed in 1.3s</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
