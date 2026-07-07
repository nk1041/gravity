import { FileText, ClipboardList, BookOpen, TrendingUp, Users, Library, ArrowRight, Sparkles } from 'lucide-react';
import FadeIn from './FadeIn';

const features = [
  {
    icon: <FileText size={24} />,
    badge: 'Most Popular',
    badgeColor: 'bg-primary text-white',
    title: 'IEP Generator',
    subtitle: 'Zero Prompting',
    description: 'Create comprehensive, compliant IEPs without writing complex AI prompts. Just fill out a simple structured form.',
    color: 'from-orange-500/10 to-orange-50',
    iconBg: 'bg-orange-50 text-primary',
    iconHover: 'group-hover:bg-primary group-hover:text-white',
    toolType: 'iep',
  },
  {
    icon: <TrendingUp size={24} />,
    badge: null,
    title: 'ITP Generator',
    subtitle: 'Transition Planning',
    description: 'Develop structured Individualized Transition Plans to prepare older students for post-secondary life.',
    color: 'from-blue-500/10 to-blue-50',
    iconBg: 'bg-blue-50 text-blue-600',
    iconHover: 'group-hover:bg-blue-600 group-hover:text-white',
    toolType: 'itp',
  },
  {
    icon: <BookOpen size={24} />,
    badge: null,
    title: 'Lesson Plans',
    subtitle: 'Differentiated Learning',
    description: 'Generate differentiated lesson plans aligned with IEP goals and state standards in a fraction of the time.',
    color: 'from-purple-500/10 to-purple-50',
    iconBg: 'bg-purple-50 text-purple-600',
    iconHover: 'group-hover:bg-purple-600 group-hover:text-white',
    toolType: 'lp',
  },
  {
    icon: <ClipboardList size={24} />,
    badge: null,
    title: 'Progress Tracking',
    subtitle: 'Data Visualization',
    description: 'Monitor compliance and track student progress toward goals with intuitive dashboards and automated reminders.',
    color: 'from-green-500/10 to-green-50',
    iconBg: 'bg-green-50 text-green-600',
    iconHover: 'group-hover:bg-green-600 group-hover:text-white',
    toolType: 'iep',
  },
  {
    icon: <Users size={24} />,
    badge: null,
    title: 'Collaboration',
    subtitle: 'Team Workspace',
    description: 'Share documents securely across multidisciplinary teams—teachers, therapists, and administrators.',
    color: 'from-rose-500/10 to-rose-50',
    iconBg: 'bg-rose-50 text-rose-600',
    iconHover: 'group-hover:bg-rose-600 group-hover:text-white',
    toolType: 'iep',
  },
  {
    icon: <Library size={24} />,
    badge: null,
    title: 'Document Library',
    subtitle: 'FERPA Compliant',
    description: 'Maintain a secure, searchable history of all student documents and revisions in one centralized repository.',
    color: 'from-teal-500/10 to-teal-50',
    iconBg: 'bg-teal-50 text-teal-600',
    iconHover: 'group-hover:bg-teal-600 group-hover:text-white',
    toolType: 'iep',
  },
];

const Features = () => {
  const handleTryTool = (e, toolType) => {
    if (e) e.preventDefault();
    window.dispatchEvent(new CustomEvent('openGenerator', { detail: { type: toolType } }));
    setTimeout(() => {
      document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="features" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-primary text-sm font-semibold mb-6">
              <Sparkles size={14} />
              Everything you need
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-heading mb-6 text-gray-900 tracking-tight leading-tight">
              Powerful tools to{' '}
              <span className="text-gradient">
                transform your workflow
              </span>
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Designed specifically for special education professionals to reduce paperwork and improve student outcomes.
            </p>
          </div>
        </FadeIn>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 80} direction="up">
              <div
                className="relative bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 ease-linear-curve group cursor-pointer flex flex-col h-full hover:-translate-y-2 card-shine overflow-hidden"
                onClick={(e) => handleTryTool(e, feature.toolType)}
              >
                {/* Top gradient fill on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                {/* Badge */}
                {feature.badge && (
                  <span className={`absolute top-5 right-5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${feature.badgeColor} shadow-sm z-10`}>
                    {feature.badge}
                  </span>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${feature.iconBg} ${feature.iconHover} w-12 h-12`}>
                    {feature.icon}
                  </div>

                  {/* Text */}
                  <div className="mb-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{feature.subtitle}</p>
                    <h3 className="text-xl font-black font-heading text-gray-900 group-hover:text-gray-900 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed flex-1 mt-2 text-sm">
                    {feature.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-1.5 text-primary font-bold text-sm group/link w-fit">
                    Try it now
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom stat bar */}
        <FadeIn delay={400} direction="up">
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '< 2 min', label: 'Average generation time' },
              { number: '100%', label: 'IDEA & FERPA compliant' },
              { number: '3 tools', label: 'Document types supported' },
              { number: 'Free', label: 'No credit card required' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-orange-50/70 rounded-2xl border border-orange-100">
                <p className="text-2xl font-black text-primary font-heading">{stat.number}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Features;
