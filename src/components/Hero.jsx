import { Play, Sparkles, ArrowRight, FileText } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-altBackground to-background pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="text-center lg:text-left max-w-2xl">
            <FadeIn direction="down" delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 hover:bg-primary/20 transition-colors cursor-default transform hover:scale-105 duration-300">
                <Sparkles size={16} className="animate-pulse" />
                <span>The intelligent workspace for special education</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading leading-tight mb-6 tracking-tight">
                AI-Assisted Document Generation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:-z-10 after:skew-x-[-15deg]">Special Education</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={500}>
              <p className="text-lg sm:text-2xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
                Effortlessly generate IEPs, ITPs, and Lesson Plans in minutes. <span className="font-bold text-primary">Zero prompting required.</span> Just fill out a simple form and let our AI handle the rest.
              </p>
            </FadeIn>
            
            <FadeIn delay={700}>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-5">
                <a 
                  href="#documentation" 
                  className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-medium text-lg shadow-[0_8px_30px_rgb(107,70,193,0.3)] hover:shadow-[0_8px_30px_rgb(107,70,193,0.5)] flex items-center justify-center gap-2 group transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Get Started Free
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert('Demo coming soon!'); }}
                  className="w-full sm:w-auto bg-white text-gray-700 px-8 py-4 rounded-xl font-medium text-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Watch Demo
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Floating Documents */}
          <div className="w-full lg:w-1/2 relative lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0 perspective-1000">
            <FadeIn delay={300} direction="up" className="relative w-full max-w-md aspect-[3/4] preserve-3d">
              
              {/* Document 3 (Back) */}
              <div className="absolute inset-0 bg-white rounded-xl shadow-xl border border-gray-100 p-6 transform translate-x-12 -translate-y-8 -rotate-6 opacity-60 backdrop-blur-sm z-10 transition-transform duration-500 hover:-translate-y-12">
                <div className="w-3/4 h-4 bg-gray-100 rounded mb-4"></div>
                <div className="w-1/2 h-4 bg-gray-100 rounded mb-8"></div>
                <div className="space-y-3">
                  <div className="w-full h-2 bg-gray-50 rounded"></div>
                  <div className="w-full h-2 bg-gray-50 rounded"></div>
                  <div className="w-5/6 h-2 bg-gray-50 rounded"></div>
                </div>
              </div>

              {/* Document 2 (Middle) */}
              <div className="absolute inset-0 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 transform translate-x-6 -translate-y-4 -rotate-3 opacity-80 backdrop-blur-md z-20 transition-transform duration-500 hover:-translate-y-8">
                <div className="w-3/4 h-4 bg-blue-100 rounded mb-4"></div>
                <div className="w-1/2 h-4 bg-gray-100 rounded mb-8"></div>
                <div className="space-y-3">
                  <div className="w-full h-2 bg-gray-50 rounded"></div>
                  <div className="w-full h-2 bg-gray-50 rounded"></div>
                  <div className="w-4/5 h-2 bg-gray-50 rounded"></div>
                </div>
              </div>

              {/* Document 1 (Front - Focused) */}
              <div className="absolute inset-0 bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-200 p-8 transform rotate-0 z-30 transition-transform duration-500 hover:-translate-y-4 flex flex-col">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-t-xl"></div>
                <div className="flex justify-between items-start mb-6 pt-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 font-heading">IEP Draft — J.D.</h3>
                    <p className="text-sm text-gray-500">Generated in 1.2s</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FileText size={16} />
                  </div>
                </div>
                
                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Objectives</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed">
                      By the end of the term, the student will demonstrate measurable progress toward reading comprehension goals using structured supports.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Accommodations</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-bold">Extended Time</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">Visual Schedules</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                  <span>Zero Prompting AI</span>
                  <span>100% Compliant</span>
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
