import { Sparkles, ArrowRight, FileText, CheckCircle2, LayoutDashboard, Users, LayoutTemplate, Settings, Zap, ShieldCheck } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <section className="relative bg-white pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
      {/* Animated SaaS Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float opacity-70 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] animate-float opacity-70 mix-blend-multiply pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Left: Copy */}
          <div className="flex-1 min-w-0 w-full text-center lg:text-left max-w-xl mx-auto lg:mx-0">

            <FadeIn delay={100}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-primary text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                <Sparkles size={14} className="animate-pulse" /> The New Standard
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading leading-[1.1] tracking-tight text-gray-900 mb-6 break-words">
                The Complete Platform for<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-purple-600 animate-gradient-x">Special Education.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg text-gray-500 leading-relaxed mb-10">
                Everything special educators need to manage documentation, assessments, lesson planning, student progress, and collaboration in one place.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 w-full">
                <button
                  onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openAuthModal')); }}
                  className="group relative overflow-hidden bg-primary text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)] hover:shadow-[0_0_60px_-15px_rgba(234,88,12,0.7)] hover:-translate-y-1 w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <span className="relative z-10 flex items-center gap-2">Get Started Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                </button>
                <a
                  href="#features"
                  className="border-2 border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center w-full sm:w-auto shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  Explore Platform
                </a>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 text-sm text-gray-500 mb-12 font-medium">
                {['Free to use', 'FERPA compliant', 'No prompting needed'].map((t, i) => (
                  <span key={i} className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" /> {t}
                  </span>
                ))}
              </div>
              
              {/* Social Proof */}
              <div className="pt-8 border-t border-gray-100 flex flex-col items-center lg:items-start gap-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Trusted by 10,000+ educators</p>
                <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 justify-center flex-wrap">
                  {/* Abstract logos representing school districts/partners */}
                  <div className="flex items-center gap-2 text-gray-700 font-bold text-lg font-heading"><div className="w-6 h-6 rounded bg-gray-900 text-white flex items-center justify-center text-xs">E</div> EduCorp</div>
                  <div className="flex items-center gap-2 text-gray-700 font-bold text-lg font-heading"><div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">S</div> Scholaris</div>
                  <div className="flex items-center gap-2 text-gray-700 font-bold text-lg font-heading"><div className="w-6 h-6 rotate-45 bg-purple-600"></div> Apex</div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: SaaS Dashboard Mockup */}
          <div className="flex-1 min-w-0 w-full max-w-full lg:max-w-2xl mx-auto lg:mx-0 relative">
            
            {/* Floating Badges */}
            <div className="absolute -left-6 top-20 z-20 hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><ShieldCheck size={16} /></div>
              <div className="flex flex-col"><span className="text-xs font-bold text-gray-900">IDEA Compliant</span><span className="text-[10px] text-gray-500">100% Validated</span></div>
            </div>

            <div className="absolute -right-6 bottom-32 z-20 hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 animate-float" style={{ animationDelay: '1.2s' }}>
              <div className="w-8 h-8 rounded-full bg-orange-100 text-primary flex items-center justify-center"><Zap size={16} /></div>
              <div className="flex flex-col"><span className="text-xs font-bold text-gray-900">10x Faster</span><span className="text-[10px] text-gray-500">Document Generation</span></div>
            </div>

            <FadeIn delay={200} direction="up">
              <div className="group perspective-1000 relative">
                
                {/* Glowing backdrop for the mockup */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-700"></div>

                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden transform transition-all duration-700 ease-out group-hover:rotate-y-2 group-hover:rotate-x-2 flex flex-col h-[400px] sm:h-[500px]">
                  
                  {/* Browser / App Header */}
                  <div className="h-12 bg-gray-50/80 backdrop-blur border-b border-gray-200/60 flex items-center px-3 sm:px-4 gap-2">
                    <div className="flex gap-1.5 hidden sm:flex">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="h-6 w-3/4 sm:w-1/2 max-w-[200px] bg-white rounded-md border border-gray-200/80 flex items-center justify-center overflow-hidden px-2 shadow-sm">
                        <span className="text-[10px] text-gray-400 font-medium truncate">app.simplyabled.com</span>
                      </div>
                    </div>
                  </div>

                  {/* App Body */}
                  <div className="flex flex-1 overflow-hidden bg-[#FAFAFA]/50">
                    {/* Sidebar */}
                    <div className="w-48 bg-white/60 backdrop-blur-md border-r border-gray-200/60 p-4 flex flex-col gap-2 hidden sm:flex">
                      <div className="flex items-center gap-2 px-2 py-1.5 mb-4">
                        <div className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center"><Sparkles size={14} /></div>
                        <span className="text-xs font-bold font-heading text-gray-900">SimplyAbled</span>
                      </div>
                      
                      <div className="px-2 py-2 rounded-lg bg-white shadow-sm border border-gray-100 text-primary text-xs font-bold flex items-center gap-2">
                        <LayoutDashboard size={14} /> Dashboard
                      </div>
                      <div className="px-2 py-2 rounded-lg text-gray-500 text-xs font-medium flex items-center gap-2 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                        <Users size={14} /> Students
                      </div>
                      <div className="px-2 py-2 rounded-lg text-gray-500 text-xs font-medium flex items-center gap-2 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                        <LayoutTemplate size={14} /> Templates
                      </div>
                      <div className="mt-auto px-2 py-2 rounded-lg text-gray-400 text-xs font-medium flex items-center gap-2 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                        <Settings size={14} /> Settings
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2"></div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 z-10">
                        <div>
                          <h2 className="text-sm font-bold text-gray-900">Student Overview</h2>
                          <p className="text-[10px] text-gray-500">Welcome back, Sarah.</p>
                        </div>
                        <button className="bg-gray-900 hover:bg-black transition-colors text-white text-[10px] font-medium px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1 w-fit">
                          <Sparkles size={12} className="text-orange-400" /> New Doc
                        </button>
                      </div>

                      {/* Metrics Row */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 z-10">
                        <div className="bg-white/80 backdrop-blur p-2 sm:p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1 min-w-0 group/card hover:-translate-y-0.5 transition-transform cursor-pointer">
                          <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">Active IEPs</span>
                          <span className="text-base sm:text-xl font-black text-gray-900">24</span>
                        </div>
                        <div className="bg-white/80 backdrop-blur p-2 sm:p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1 min-w-0 group/card hover:-translate-y-0.5 transition-transform cursor-pointer">
                          <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">Assessments</span>
                          <span className="text-base sm:text-xl font-black text-gray-900">12</span>
                        </div>
                      </div>

                      {/* Document Card inside Dashboard */}
                      <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200/80 shadow-md overflow-hidden flex-1 flex flex-col z-10 min-h-0 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="h-1 bg-gradient-to-r from-primary to-purple-500 shrink-0" />
                        <div className="p-3 sm:p-4 flex flex-col flex-1 min-h-0">
                          <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
                            <div className="min-w-0 flex-1">
                              <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-bold tracking-wide text-green-700 bg-green-100/80 px-2 py-0.5 rounded-full mb-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Generated
                              </span>
                              <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">IEP Draft — J.D.</h3>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                              <FileText size={14} className="text-primary" />
                            </div>
                          </div>
                          
                          <div className="bg-gray-50/80 rounded-lg p-2 sm:p-3 border border-gray-100/50 mb-2 sm:mb-3 min-h-0 flex-shrink">
                            <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Present Levels</p>
                            <p className="text-[9px] sm:text-[10px] text-gray-600 leading-relaxed line-clamp-2">Student demonstrates strong visual processing skills and is working toward grade-level reading comprehension.</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-auto">
                            <span className="px-2 py-1 text-[8px] sm:text-[9px] font-bold bg-orange-50/80 text-orange-700 rounded border border-orange-100/50 truncate">Extended Time</span>
                            <span className="px-2 py-1 text-[8px] sm:text-[9px] font-bold bg-orange-50/80 text-orange-700 rounded border border-orange-100/50 truncate">Visual Schedules</span>
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
