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
    <section className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] opacity-60 pointer-events-none animate-float" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[80px] opacity-50 pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 text-textColor tracking-tight">Why SimplyAbled</h2>
            <p className="text-xl text-gray-500 font-medium">Built for the entire special education ecosystem.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {personas.map((persona, index) => (
            <FadeIn key={index} delay={index * 100} direction="up" className="relative group h-full">
              {/* Gradient border and glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col items-center group-hover:-translate-y-2 transition-transform duration-500">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg] group-hover:from-primary group-hover:to-secondary group-hover:text-white shadow-[inset_0_2px_10px_rgba(255,255,255,1)] group-hover:shadow-[0_10px_25px_-5px_rgba(107,70,193,0.5)]">
                  {persona.icon}
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">{persona.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{persona.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltFor;
