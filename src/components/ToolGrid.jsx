import { FileText, ClipboardList, BookOpen, TrendingUp, Presentation, BookType, LineChart, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const ToolGrid = () => {
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
    <section id="tools" className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] opacity-60 pointer-events-none animate-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 text-textColor tracking-tight">
              Specialized <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Tools</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Access individual tools designed specifically for special education workflows.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <FadeIn key={index} delay={index * 50} direction="up" className="h-full relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[2rem] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Link 
                to={tool.link}
                className="relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(107,70,193,0.15)] transition-all duration-500 border border-white group h-full flex flex-col transform hover:-translate-y-2 cursor-pointer block"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-white text-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[10deg] group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[0_10px_20px_-5px_rgba(107,70,193,0.4)]">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium group-hover:text-gray-600 transition-colors duration-300">
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

export default ToolGrid;
