import FadeIn from './FadeIn';
import { GraduationCap, Stethoscope, School, Users } from 'lucide-react';

const BuiltFor = () => {
  const personas = [
    {
      icon: <GraduationCap size={28} />,
      title: 'Special Educators',
      description: 'Streamline documentation and focus on teaching.'
    },
    {
      icon: <Stethoscope size={28} />,
      title: 'Therapists',
      description: 'Manage session notes and assessments easily.'
    },
    {
      icon: <School size={28} />,
      title: 'Schools',
      description: 'Ensure compliance and coordinate care seamlessly.'
    },
    {
      icon: <Users size={28} />,
      title: 'Parents',
      description: 'Stay connected and track student progress.'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-textColor">Why SimplyAbled</h2>
            <p className="text-xl text-gray-500">Built for the entire special education ecosystem.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {personas.map((persona, index) => (
            <FadeIn key={index} delay={index * 100} direction="up" className="bg-white/80 p-8 rounded-3xl shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] hover:shadow-premium-hover border border-gray-100/50 text-center flex flex-col items-center group transition-all duration-300 ease-linear-curve hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 transition-all duration-300 ease-linear-curve group-hover:scale-110 group-hover:rotate-[8deg] group-hover:bg-primary group-hover:text-white shadow-inner group-hover:shadow-[0_8px_16px_-4px_rgba(107,70,193,0.4)]">
                {persona.icon}
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">{persona.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{persona.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltFor;
