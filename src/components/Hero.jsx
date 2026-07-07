import { Sparkles, ArrowRight, FileText, CheckCircle2, Zap, Shield } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50/60">

      {/* Layered Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-amber-200/25 rounded-full blur-3xl" />
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#EA580C12_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Column */}
          <div className="text-center lg:text-left max-w-2xl">

            <FadeIn direction="down" delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-100 shadow-[0_2px_15px_-3px_rgba(234,88,12,0.12)] text-primary text-sm font-semibold mb-8 cursor-default hover:-translate-y-0.5 transition-transform duration-300">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                  <Sparkles size={12} className="text-primary" />
                </span>
                The intelligent workspace for special education
                <span className="ml-1 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold tracking-wide uppercase">Free</span>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-heading leading-[1.08] mb-6 tracking-tight text-gray-900">
                AI Documents for{' '}
                <span className="relative inline-block">
                  <span className="text-gradient">Special Ed</span>
                  {/* Underline squiggle */}
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 280 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8 C40 2, 80 12, 140 7 S220 2, 278 8" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.5"/>
                  </svg>
                </span>
                {' '}Professionals.
              </h1>
            </FadeIn>

            <FadeIn delay={350}>
              <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
                Generate IEPs, ITPs, and Lesson Plans in seconds.{' '}
                <span className="font-semibold text-gray-700">No complex prompts required.</span>{' '}
                Just fill a form — our AI handles the rest.
              </p>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-10">
                <a
                  href="#generator"
                  className="w-full sm:w-auto group bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 ease-linear-curve flex items-center justify-center gap-2 hover:-translate-y-1 active:translate-y-0 active:scale-95 animate-pulse-glow"
                >
                  Generate for Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#features"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-gray-600 border border-gray-200 bg-white hover:border-primary/30 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
                >
                  See all features
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-5 text-sm text-gray-500">
                {[
                  { icon: <CheckCircle2 size={15} className="text-green-500" />, text: 'Free forever plan' },
                  { icon: <Zap size={15} className="text-amber-500" />, text: 'Generates in seconds' },
                  { icon: <Shield size={15} className="text-blue-500" />, text: 'FERPA compliant' },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 font-medium">
                    {item.icon} {item.text}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column — Animated Floating Document Stack */}
          <div className="w-full lg:w-1/2 relative h-[480px] lg:h-[580px] flex items-center justify-center mt-8 lg:mt-0">

            {/* Glow behind cards */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            </div>

            {/* Document 3 (Back) */}
            <div className="absolute w-[300px] sm:w-[340px] bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-gray-100 p-6 animate-float-slow z-10 left-[5%] lg:left-[0%]"
              style={{ transform: 'rotate(-8deg) translateY(30px)' }}>
              <div className="w-2/3 h-3 bg-gray-100 rounded-full mb-3" />
              <div className="w-1/2 h-3 bg-gray-50 rounded-full mb-6" />
              <div className="space-y-2">
                {[1,1,0.75].map((w, i) => <div key={i} className="h-2 bg-gray-50 rounded-full" style={{width:`${w*100}%`}} />)}
              </div>
            </div>

            {/* Document 2 (Middle) */}
            <div className="absolute w-[300px] sm:w-[340px] bg-white/85 backdrop-blur-md rounded-3xl shadow-xl border border-orange-100/80 p-6 animate-float-delayed z-20"
              style={{ transform: 'rotate(-3deg) translateY(10px)' }}>
              <div className="w-3 h-3 rounded-full bg-primary/30 mb-4" />
              <div className="w-3/4 h-3 bg-primary/10 rounded-full mb-3" />
              <div className="w-1/2 h-2 bg-gray-100 rounded-full mb-6" />
              <div className="space-y-2">
                {[1,1,0.85].map((w, i) => <div key={i} className="h-2 bg-orange-50 rounded-full" style={{width:`${w*100}%`}} />)}
              </div>
            </div>

            {/* Document 1 (Front - Featured) */}
            <div className="relative w-[300px] sm:w-[360px] bg-white rounded-3xl shadow-[0_24px_60px_-12px_rgba(234,88,12,0.2)] border border-gray-100 p-7 z-30 animate-float flex flex-col gap-5">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-orange-400 to-amber-400 rounded-t-3xl" />

              <div className="flex justify-between items-start pt-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100 text-green-600 text-[11px] font-bold mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Generated in 1.3s
                  </div>
                  <h3 className="text-lg font-black text-gray-900 font-heading">IEP Draft — J.D.</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Grade 3 · Autism Spectrum</p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary">
                  <FileText size={20} />
                </div>
              </div>

              <div className="bg-orange-50/70 border border-orange-100 rounded-2xl p-4">
                <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2">Present Levels</p>
                <p className="text-sm text-gray-600 leading-relaxed">Student demonstrates strong visual processing skills and is working toward grade-level reading comprehension with structured support.</p>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">Accommodations</p>
                <div className="flex flex-wrap gap-2">
                  {['Extended Time', 'Visual Schedules', 'Quiet Space'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-primary/60" /> Zero Prompting AI</span>
                <span className="text-green-500 font-bold">✓ Compliant</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-6 right-4 lg:-right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-40 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-gray-800">500+ Docs</p>
                <p className="text-[10px] text-gray-400">Generated this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
