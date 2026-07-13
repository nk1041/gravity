import { Sparkles, ArrowRight, FileText, CheckCircle2, LayoutDashboard, Users, LayoutTemplate, Settings, BarChart2 } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <section className="relative bg-white pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Left: Copy */}
          <div className="flex-1 min-w-0 w-full text-center lg:text-left max-w-xl mx-auto lg:mx-0">


            <FadeIn delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading leading-[1.1] tracking-tight text-gray-900 mb-6 break-words">
                The Complete Platform for<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Special Education.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg text-gray-500 leading-relaxed mb-10">
                Everything special educators need to manage documentation, assessments, lesson planning, student progress, and collaboration in one place.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 w-full">
                <button
                  onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openAuthModal')); }}
                  className="bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
                >
                  Get Started Free <ArrowRight size={17} />
                </button>
                <a
                  href="#features"
                  className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
                >
                  Explore Platform
                </a>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-5 text-sm text-gray-400 mb-10">
                {['Free to use', 'FERPA compliant', 'No prompting needed'].map((t, i) => (
                  <span key={i} className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" /> {t}
                  </span>
                ))}
              </div>
              
              {/* Social Proof */}
              <div className="pt-8 border-t border-gray-100 flex flex-col items-center lg:items-start gap-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center">Trusted by 10,000+ educators</p>
                <div className="flex gap-4 opacity-50 grayscale justify-center flex-wrap">
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: SaaS Dashboard Mockup */}
          <div className="flex-1 min-w-0 w-full max-w-full lg:max-w-2xl mx-auto lg:mx-0">
            <FadeIn delay={200} direction="up">
              <div className="animate-float-slow group perspective-1000">
                <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden transform transition-all duration-700 ease-out group-hover:rotate-y-2 group-hover:rotate-x-2 flex flex-col h-[400px] sm:h-[500px]">
                  
                  {/* Browser / App Header */}
                  <div className="h-12 bg-gray-50/80 backdrop-blur border-b border-gray-200/60 flex items-center px-3 sm:px-4 gap-2">
                    <div className="flex gap-1.5 hidden sm:flex">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="h-6 w-3/4 sm:w-1/2 max-w-[200px] bg-white rounded-md border border-gray-200/80 flex items-center justify-center overflow-hidden px-2">
                        <span className="text-[10px] text-gray-400 font-medium truncate">app.simplyabled.com</span>
                      </div>
                    </div>
                  </div>

                  {/* App Body */}
                  <div className="flex flex-1 overflow-hidden bg-[#FAFAFA]">
                    {/* Sidebar */}
                    <div className="w-48 bg-white border-r border-gray-200/60 p-4 flex flex-col gap-2 hidden sm:flex">
                      <div className="flex items-center gap-2 px-2 py-1.5 mb-4">
                        <div className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center"><Sparkles size={14} /></div>
                        <span className="text-xs font-bold font-heading text-gray-900">SimplyAbled</span>
                      </div>
                      
                      <div className="px-2 py-2 rounded-lg bg-primary/5 text-primary text-xs font-medium flex items-center gap-2">
                        <LayoutDashboard size={14} /> Dashboard
                      </div>
                      <div className="px-2 py-2 rounded-lg text-gray-500 text-xs font-medium flex items-center gap-2 hover:bg-gray-50">
                        <Users size={14} /> Students
                      </div>
                      <div className="px-2 py-2 rounded-lg text-gray-500 text-xs font-medium flex items-center gap-2 hover:bg-gray-50">
                        <LayoutTemplate size={14} /> Templates
                      </div>
                      <div className="mt-auto px-2 py-2 rounded-lg text-gray-400 text-xs font-medium flex items-center gap-2 hover:bg-gray-50">
                        <Settings size={14} /> Settings
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-secondary/5 rounded-full blur-2xl sm:blur-3xl -translate-y-1/2"></div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 z-10">
                        <div>
                          <h2 className="text-sm font-bold text-gray-900">Student Overview</h2>
                          <p className="text-[10px] text-gray-400">Welcome back, Sarah.</p>
                        </div>
                        <button className="bg-primary text-white text-[10px] font-medium px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 w-fit">
                          <Sparkles size={12} /> New Doc
                        </button>
                      </div>

                      {/* Metrics Row */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 z-10">
                        <div className="bg-white p-2 sm:p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1 min-w-0">
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase truncate">Active IEPs</span>
                          <span className="text-base sm:text-lg font-black text-gray-900">24</span>
                        </div>
                        <div className="bg-white p-2 sm:p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1 min-w-0">
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase truncate">Assessments</span>
                          <span className="text-base sm:text-lg font-black text-gray-900">12</span>
                        </div>
                      </div>

                      {/* Document Card inside Dashboard */}
                      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden flex-1 flex flex-col z-10 min-h-0">
                        <div className="h-1 bg-gradient-to-r from-primary to-orange-400 shrink-0" />
                        <div className="p-3 sm:p-4 flex flex-col flex-1 min-h-0">
                          <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
                            <div className="min-w-0 flex-1">
                              <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full mb-1">
                                <span className="w-1 h-1 rounded-full bg-green-400" /> Generated
                              </span>
                              <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">IEP Draft — J.D.</h3>
                            </div>
                            <FileText size={14} className="text-primary shrink-0" />
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-100 mb-2 sm:mb-3 min-h-0 flex-shrink">
                            <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Present Levels</p>
                            <p className="text-[9px] sm:text-[10px] text-gray-600 leading-relaxed line-clamp-2">Student demonstrates strong visual processing skills and is working toward grade-level reading comprehension.</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-auto">
                            <span className="px-2 py-1 text-[8px] sm:text-[9px] font-medium bg-orange-50 text-orange-700 rounded border border-orange-100 truncate">Extended Time</span>
                            <span className="px-2 py-1 text-[8px] sm:text-[9px] font-medium bg-orange-50 text-orange-700 rounded border border-orange-100 truncate">Visual Schedules</span>
                          </div>
                        </div>
                      </div>

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
