import { Sparkles, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <section className="bg-white pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden relative">
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-70 pointer-events-none animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-secondary/20 rounded-full blur-[130px] opacity-60 pointer-events-none animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[20%] left-[40%] w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[100px] opacity-50 pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]">
                <Sparkles size={14} /> Special Education Platform
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-heading leading-[1.1] tracking-tight text-gray-900 mb-6 drop-shadow-sm">
                The Complete Platform for<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary drop-shadow-sm">Special Education.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 font-medium">
                Everything special educators need to manage documentation, assessments, lesson planning, student progress, and collaboration in one place.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <a
                  href="#generator"
                  className="relative group overflow-hidden bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_25px_-5px_rgba(107,70,193,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(107,70,193,0.6)] hover:-translate-y-1 active:translate-y-0"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  Get Started Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#features"
                  className="bg-white/60 backdrop-blur-md border border-gray-200/80 hover:bg-white hover:border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  Explore Platform
                </a>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
                {['Free to use', 'FERPA compliant', 'No prompting needed'].map((t, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" /> {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Document card */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 relative">
            {/* Glowing orb behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-br from-primary to-secondary rounded-full blur-[80px] opacity-30 animate-pulse" />
            
            <FadeIn delay={200} direction="left">
              <div className="animate-float relative z-10">
                <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1">
                  {/* Document header bar */}
                  <div className="h-1.5 bg-gradient-to-r from-primary via-purple-400 to-orange-400" />

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100/80 border border-green-200 px-2.5 py-1 rounded-full mb-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          Generated
                        </span>
                        <h3 className="text-lg font-black text-gray-900 tracking-tight">IEP Draft — J.D.</h3>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Grade 3 · Autism Spectrum</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200/50 flex items-center justify-center text-orange-600 shrink-0 shadow-sm">
                        <FileText size={22} />
                      </div>
                    </div>

                    <div className="space-y-5 text-sm">
                      <div className="bg-white/50 rounded-2xl p-5 border border-gray-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Present Levels</p>
                        <p className="text-gray-700 leading-relaxed font-medium">Student demonstrates strong visual processing skills and is working toward grade-level reading comprehension with structured support.</p>
                      </div>

                      <div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2.5">Accommodations</p>
                        <div className="flex flex-wrap gap-2">
                          {['Extended Time', 'Visual Schedules', 'Quiet Workspace'].map(tag => (
                            <span key={tag} className="px-3 py-1.5 text-xs font-bold bg-orange-50 text-orange-700 rounded-lg border border-orange-200/60 shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400">
                      <span className="flex items-center gap-1.5 bg-primary/5 text-primary px-2.5 py-1 rounded-md"><Sparkles size={14} className="text-primary" /> SimplyAbled assisted</span>
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
