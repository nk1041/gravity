import { FileText, ClipboardList, BookOpen, TrendingUp, Users, Library, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

const features = [
  {
    icon: FileText,
    label: 'IEP Generator',
    description: 'Generate complete, IDEA-compliant IEPs from a simple form. No prompting, no guesswork.',
    toolType: 'iep',
    accent: 'text-primary bg-orange-50',
  },
  {
    icon: TrendingUp,
    label: 'ITP Generator',
    description: 'Create structured transition plans aligned to post-secondary goals for older students.',
    toolType: 'itp',
    accent: 'text-blue-600 bg-blue-50',
  },
  {
    icon: BookOpen,
    label: 'Lesson Plans',
    description: 'Differentiated lesson plans built around IEP goals and required accommodations.',
    toolType: 'lp',
    accent: 'text-purple-600 bg-purple-50',
  },
  {
    icon: ClipboardList,
    label: 'Progress Tracking',
    description: 'Visual dashboards that track student progress over time and generate summary reports.',
    toolType: 'iep',
    accent: 'text-green-600 bg-green-50',
  },
  {
    icon: Users,
    label: 'Collaboration',
    description: 'Securely share documents with your multidisciplinary team for review and sign-off.',
    toolType: 'iep',
    accent: 'text-rose-600 bg-rose-50',
  },
  {
    icon: Library,
    label: 'Document Library',
    description: 'A FERPA-compliant archive of every document, searchable by student, type, or date.',
    toolType: 'iep',
    accent: 'text-teal-600 bg-teal-50',
  },
];

const Features = () => {
  const handleTryTool = (toolType) => {
    window.dispatchEvent(new CustomEvent('openGenerator', { detail: { type: toolType } }));
    setTimeout(() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <section id="features" className="py-24 lg:py-32 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Features</p>
            <h2 className="text-3xl md:text-4xl font-black font-heading text-gray-900 leading-tight mb-4">
              Everything a special educator needs in one place.
            </h2>
            <p className="text-lg text-gray-500">
              Built around the real workflows of special education professionals — not generic AI tools.
            </p>
          </div>
        </FadeIn>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={i} delay={i * 60} direction="up">
                <div
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer group h-full flex flex-col"
                  onClick={() => handleTryTool(feature.toolType)}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${feature.accent}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{feature.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{feature.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Try it <ArrowRight size={14} />
                  </span>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Stats row */}
        <FadeIn delay={300} direction="up">
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
            {[
              { value: '< 2 min', label: 'To generate a document' },
              { value: '100%', label: 'IDEA & FERPA aligned' },
              { value: '3 tools', label: 'Document types' },
              { value: 'Free', label: 'No card required' },
            ].map((s, i) => (
              <div key={i} className="bg-white px-6 py-5 text-center">
                <p className="text-xl font-black text-gray-900 font-heading">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Features;
