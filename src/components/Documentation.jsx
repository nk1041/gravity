import { FileText, ClipboardList, BookOpen, TrendingUp, Presentation, BookType, LineChart, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const Documentation = () => {
  const tools = [
    {
      icon: <FileText size={28} />,
      title: 'IEP Generator',
      description: 'Draft comprehensive Individualized Education Programs instantly.',
      link: '/tool/iep'
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'ITP Generator',
      description: 'Build Individualized Transition Plans for post-secondary goals.',
      link: '/tool/itp'
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Lesson Plan Generator',
      description: 'Create differentiated lesson plans with built-in accommodations.',
      link: '/tool/lp'
    },
    {
      icon: <LineChart size={28} />,
      title: 'Progress Report Generator',
      description: 'Generate data-driven progress updates for parents and admin.',
      link: '/tool/progress'
    },
    {
      icon: <ClipboardList size={28} />,
      title: 'Assessment Report',
      description: 'Synthesize raw assessment data into readable narrative reports.',
      link: '/tool/assessment'
    },
    {
      icon: <Presentation size={28} />,
      title: 'Session Notes',
      description: 'Log therapy or intervention session notes quickly and compliantly.',
      link: '/tool/session'
    },
    {
      icon: <BookType size={28} />,
      title: 'Daily Observation',
      description: 'Record structured behavioral and academic observations.',
      link: '/tool/observation'
    },
    {
      icon: <Brain size={28} />,
      title: 'M-CHAT Screening',
      description: 'Automated autism screening checklist, scoring, and PDF reports.',
      link: '/tool/mchat'
    }
  ];

  return (
    <section id="documentation" className="py-24 bg-altBackground relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              Documentation in <span className="text-primary">Minutes</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Select a tool, fill a structured form, and let our zero-prompting AI generate a professional document instantly.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <FadeIn key={index} delay={index * 50} direction="up" className="h-full">
              <Link 
                to={tool.link}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] hover:shadow-premium-hover transition-all duration-300 ease-linear-curve border border-gray-100/60 group h-full flex flex-col transform hover:-translate-y-1.5 active:translate-y-0 active:scale-95 cursor-pointer block"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 ease-linear-curve transform group-hover:rotate-[8deg] group-hover:scale-110 shadow-inner group-hover:shadow-[0_8px_16px_-4px_rgba(107,70,193,0.4)]">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 text-textColor group-hover:text-primary transition-colors duration-300">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {tool.description}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Documentation;
