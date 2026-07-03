import { Play, Sparkles, ArrowRight, FileText } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-altBackground to-background pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="text-center lg:text-left max-w-2xl">
            <FadeIn direction="down" delay={100}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-sm text-primary text-sm font-medium mb-8 border border-primary/10 shadow-[0_2px_10px_-2px_rgba(107,70,193,0.08)] transition-all duration-300 ease-linear-curve cursor-default hover:shadow-premium hover:-translate-y-0.5">
                <Sparkles size={16} className="text-primary animate-pulse" />
                <span>The intelligent workspace for special education</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading leading-tight mb-6 tracking-tight text-gray-900">
                AI-Assisted Document Generation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative inline-block">Special Education</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={500}>
              <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-3xl leading-relaxed font-light">
                Effortlessly generate IEPs, ITPs, and Lesson Plans in minutes. <span className="font-semibold text-primary">Zero prompting required.</span> Just fill out a simple form and let our AI handle the rest.
              </p>
            </FadeIn>
            
            <FadeIn delay={700}>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                <a 
                  href="#documentation" 
                  className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 ease-linear-curve flex items-center justify-center gap-2 group hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                  Get Started Free
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Floating Documents */}
          <div className="w-full lg:w-1/2 relative lg:h-[600px] flex items-center justify-center mt-16 lg:mt-0 perspective-1000">
            <FadeIn delay={300} direction="up" className="relative w-full max-w-md aspect-[3/4] preserve-3d">
              
              {/* Document 3 (Back) */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100/50 p-6 transform translate-x-12 -translate-y-8 -rotate-6 opacity-60 z-10 transition-all duration-500 ease-linear-curve hover:-translate-y-12 hover:rotate-[-4deg] hover:opacity-80">
                <div className="w-3/4 h-4 bg-gray-100 rounded-md mb-4"></div>
                <div className="w-1/2 h-4 bg-gray-100 rounded-md mb-8"></div>
                <div className="space-y-3">
                  <div className="w-full h-2 bg-gray-50 rounded-md"></div>
                  <div className="w-full h-2 bg-gray-50 rounded-md"></div>
                  <div className="w-5/6 h-2 bg-gray-50 rounded-md"></div>
                </div>
              </div>

              {/* Document 2 (Middle) */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/60 p-6 transform translate-x-6 -translate-y-4 -rotate-3 opacity-80 z-20 transition-all duration-500 ease-linear-curve hover:-translate-y-8 hover:rotate-[-2deg] hover:opacity-100">
                <div className="w-3/4 h-4 bg-primary/10 rounded-md mb-4"></div>
                <div className="w-1/2 h-4 bg-gray-100 rounded-md mb-8"></div>
                <div className="space-y-3">
                  <div className="w-full h-2 bg-gray-50 rounded-md"></div>
                  <div className="w-full h-2 bg-gray-50 rounded-md"></div>
                  <div className="w-4/5 h-2 bg-gray-50 rounded-md"></div>
                </div>
              </div>

              {/* Document 1 (Front - Focused) */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-premium border border-gray-100 p-8 transform rotate-0 z-30 transition-all duration-500 ease-linear-curve hover:-translate-y-4 hover:shadow-premium-hover flex flex-col group">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-6 pt-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-heading tracking-tight">IEP Draft — J.D.</h3>
                    <p className="text-sm text-gray-400 mt-1 font-medium">Generated in 1.2s</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <FileText size={18} />
                  </div>
                </div>
                
                <div className="space-y-6 flex-1 mt-2">
                  <div className="group/item transition-all">
                    <h4 className="text-[11px] font-bold text-primary/80 uppercase tracking-widest mb-3">Objectives</h4>
                    <p className="text-sm text-gray-600 bg-gray-50/80 p-4 rounded-xl leading-relaxed border border-gray-100/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                      By the end of the term, the student will demonstrate measurable progress toward reading comprehension goals using structured supports.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-primary/80 uppercase tracking-widest mb-3">Accommodations</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-green-50/80 border border-green-100 text-green-700 rounded-lg text-xs font-semibold shadow-sm">Extended Time</span>
                      <span className="px-3 py-1.5 bg-blue-50/80 border border-blue-100 text-blue-700 rounded-lg text-xs font-semibold shadow-sm">Visual Schedules</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-5 border-t border-gray-100/80 flex justify-between items-center text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-primary/60"/> Zero Prompting AI</span>
                  <span className="flex items-center gap-1.5">100% Compliant</span>
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
