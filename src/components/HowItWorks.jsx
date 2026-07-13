import { XCircle, CheckCircle, Clock, FileWarning, Frown, Inbox, Layers, Zap, HeartHandshake, Smile } from 'lucide-react';
import FadeIn from './FadeIn';

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-textColor">How SimplyAbled Helps</h2>
            <p className="text-xl text-gray-500">Transforming special education through streamlined workflows.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-8">
          
          {/* Before SimplyAbled */}
          <FadeIn delay={100} direction="up" className="bg-gray-50 p-6 sm:p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-premium-hover border border-gray-100 flex flex-col group transition-all duration-300 ease-linear-curve hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gray-200/50 border border-gray-200 text-gray-500 flex items-center justify-center mb-8 shadow-inner transition-transform duration-300 ease-linear-curve group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-gray-200">
              <XCircle size={28} />
            </div>
            <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6 tracking-tight">Before SimplyAbled</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <Clock className="text-gray-400 mt-0.5 shrink-0" size={20} />
                <span className="text-base">Hours of paperwork</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <FileWarning className="text-gray-400 mt-0.5 shrink-0" size={20} />
                <span className="text-base">Multiple formats</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <Inbox className="text-gray-400 mt-0.5 shrink-0" size={20} />
                <span className="text-base">Manual reports</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <Layers className="text-gray-400 mt-0.5 shrink-0" size={20} />
                <span className="text-base">Scattered records</span>
              </li>
            </ul>
          </FadeIn>

          {/* After SimplyAbled */}
          <FadeIn delay={200} direction="up" className="bg-white p-6 sm:p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(107,70,193,0.15)] border border-primary/20 flex flex-col group transition-all duration-300 ease-linear-curve hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary opacity-100"></div>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-8 shadow-inner transition-transform duration-300 ease-linear-curve group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white">
              <CheckCircle size={28} />
            </div>
            <h3 className="text-2xl font-bold font-heading text-primary mb-6 tracking-tight group-hover:text-primary transition-colors">After SimplyAbled</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <CheckCircle className="text-primary mt-0.5 shrink-0" size={20} />
                <span className="text-base">Organized workflow</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Zap className="text-primary mt-0.5 shrink-0" size={20} />
                <span className="text-base">Faster documentation</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <HeartHandshake className="text-primary mt-0.5 shrink-0" size={20} />
                <span className="text-base">Better collaboration</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Smile className="text-primary mt-0.5 shrink-0" size={20} />
                <span className="text-base">More time with children</span>
              </li>
            </ul>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
