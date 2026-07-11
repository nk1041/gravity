import { FileText, ClipboardList, BookOpen, TrendingUp, Presentation, BookType, LineChart, Brain, Users, FolderOpen, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const Documentation = () => {
  const tools = [
    {
      icon: <FileText size={28} />,
      title: 'Documentation',
      description: 'Draft comprehensive Individualized Education Programs instantly.',
      link: '/tool/iep'
    },
    {
      icon: <Brain size={28} />,
      title: 'Assessments',
      description: 'Automated screening checklists, scoring, and PDF reports.',
      link: '/tool/mchat'
    },
    {
      icon: <Users size={28} />,
      title: 'Student Profiles',
      description: 'Maintain detailed, secure records of student progress and needs.',
      link: '/dashboard/students'
    },
    {
      icon: <LineChart size={28} />,
      title: 'Progress Tracking',
      description: 'Generate data-driven progress updates for parents and administration.',
      link: '/tool/progress'
    },
    {
      icon: <MessageCircle size={28} />,
      title: 'Parent Communication',
      description: 'Easily share updates, reports, and collaborate with families.',
      link: '#'
    },
    {
      icon: <ClipboardList size={28} />,
      title: 'Reports',
      description: 'Synthesize raw assessment data into readable narrative reports.',
      link: '/dashboard/documents'
    },
    {
      icon: <Presentation size={28} />,
      title: 'AI Assistant',
      description: 'Smart assistance to help you log session notes and draft materials.',
      link: '/tool/session'
    },
    {
      icon: <FolderOpen size={28} />,
      title: 'Resource Library',
      description: 'Access templates and educational materials tailored for special ed.',
      link: '/dashboard/templates'
    }
  ];

  return (
    <section id="features" className="py-32 bg-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-full h-[800px] bg-gradient-to-b from-transparent via-primary/5 to-transparent -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 text-textColor tracking-tight">
              Platform <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Features</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Explore the comprehensive suite of tools built to manage every aspect of special education.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <FadeIn key={index} delay={index * 50} direction="up" className="h-full relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2rem] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Link 
                to={tool.link}
                className="relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(107,70,193,0.15)] transition-all duration-500 border border-white group h-full flex flex-col transform hover:-translate-y-2 cursor-pointer overflow-hidden block"
              >
                {/* Subtle corner glow inside card */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[10deg] group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-500 shadow-[inset_0_2px_10px_rgba(255,255,255,1)] group-hover:shadow-[0_10px_20px_-5px_rgba(107,70,193,0.4)] relative z-10">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300 relative z-10">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium group-hover:text-gray-600 transition-colors duration-300 relative z-10">
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
