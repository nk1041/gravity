import { FileText, ClipboardList, BookOpen, TrendingUp, Presentation, BookType, LineChart, Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const Documentation = () => {
  const tools = [
    {
      icon: FileText,
      title: 'IEP Generator',
      description: 'Draft comprehensive Individualized Education Programs instantly.',
      link: '/tool/iep',
      accent: 'text-primary bg-orange-50'
    },
    {
      icon: TrendingUp,
      title: 'ITP Generator',
      description: 'Build Individualized Transition Plans for post-secondary goals.',
      link: '/tool/itp',
      accent: 'text-blue-600 bg-blue-50'
    },
    {
      icon: BookOpen,
      title: 'Lesson Plan Generator',
      description: 'Create differentiated lesson plans with built-in accommodations.',
      link: '/tool/lp',
      accent: 'text-purple-600 bg-purple-50'
    },
    {
      icon: LineChart,
      title: 'Progress Report Generator',
      description: 'Generate data-driven progress updates for parents and admin.',
      link: '/tool/progress',
      accent: 'text-green-600 bg-green-50'
    },
    {
      icon: ClipboardList,
      title: 'Assessment Report',
      description: 'Synthesize raw assessment data into readable narrative reports.',
      link: '/tool/assessment',
      accent: 'text-rose-600 bg-rose-50'
    },
    {
      icon: Presentation,
      title: 'Session Notes',
      description: 'Log therapy or intervention session notes quickly and compliantly.',
      link: '/tool/session',
      accent: 'text-teal-600 bg-teal-50'
    },
    {
      icon: BookType,
      title: 'Daily Observation',
      description: 'Record structured behavioral and academic observations.',
      link: '/tool/observation',
      accent: 'text-amber-600 bg-amber-50'
    },
    {
      icon: Brain,
      title: 'M-CHAT Screening',
      description: 'Automated autism screening checklist, scoring, and PDF reports.',
      link: '/tool/mchat',
      accent: 'text-indigo-600 bg-indigo-50'
    }
  ];

  return (
    <section id="documentation" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Templates & Tools</p>
            <h2 className="text-3xl md:text-4xl font-black font-heading mb-4 text-gray-900 tracking-tight leading-tight">
              AI-powered templates for every special ed need.
            </h2>
            <p className="text-lg text-gray-500">
              Select a specialized tool, complete a structured form, and generate professional documents in seconds.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <FadeIn key={index} delay={index * 40} direction="up" className="h-full">
                <Link 
                  to={tool.link}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-200 group h-full flex flex-col cursor-pointer block"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 shrink-0 ${tool.accent}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Open Tool <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Documentation;
