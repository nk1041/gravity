import { XCircle, CheckCircle, Clock, FileWarning, Frown, Inbox, Layers, Zap, HeartHandshake, Smile } from 'lucide-react';
import FadeIn from './FadeIn';

const HowItWorks = () => {
  return (
    <section className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-60 pointer-events-none animate-float" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] opacity-60 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 text-textColor tracking-tight">How SimplyAbled Helps</h2>
            <p className="text-xl text-gray-500 font-medium">Transforming special education through streamlined workflows.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative mt-8 max-w-5xl mx-auto">
          
          {/* Before SimplyAbled */}
          <FadeIn delay={100} direction="up" className="relative group">
            {/* Subtle glow border */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            
            <div className="relative bg-white/60 backdrop-blur-2xl p-12 rounded-[2.5rem] shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-white flex flex-col transition-transform duration-500 hover:-translate-y-2 h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border border-white text-gray-500 flex items-center justify-center mb-8 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-[10deg]">
                <XCircle size={32} />
              </div>
              <h3 className="text-3xl font-black font-heading text-gray-800 mb-8 tracking-tight">Before SimplyAbled</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                  <div className="p-2 rounded-xl bg-gray-100 text-gray-400"><Clock size={22} /></div>
                  Hours of paperwork
                </li>
                <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                  <div className="p-2 rounded-xl bg-gray-100 text-gray-400"><FileWarning size={22} /></div>
                  Multiple formats
                </li>
                <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                  <div className="p-2 rounded-xl bg-gray-100 text-gray-400"><Inbox size={22} /></div>
                  Manual reports
                </li>
                <li className="flex items-center gap-4 text-gray-600 font-medium text-lg">
                  <div className="p-2 rounded-xl bg-gray-100 text-gray-400"><Layers size={22} /></div>
                  Scattered records
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* After SimplyAbled */}
          <FadeIn delay={200} direction="up" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[2.5rem] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(107,70,193,0.15)] border border-white flex flex-col transition-transform duration-500 hover:-translate-y-2 h-full overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-purple-400 to-secondary" />
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mb-8 shadow-[0_10px_20px_-5px_rgba(107,70,193,0.5)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[10deg]">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-8 tracking-tight">After SimplyAbled</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-gray-800 font-bold text-lg">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary"><CheckCircle size={22} /></div>
                  Organized workflow
                </li>
                <li className="flex items-center gap-4 text-gray-800 font-bold text-lg">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary"><Zap size={22} /></div>
                  Faster documentation
                </li>
                <li className="flex items-center gap-4 text-gray-800 font-bold text-lg">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary"><HeartHandshake size={22} /></div>
                  Better collaboration
                </li>
                <li className="flex items-center gap-4 text-gray-800 font-bold text-lg">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary"><Smile size={22} /></div>
                  More time with children
                </li>
              </ul>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
