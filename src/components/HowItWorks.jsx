import { FileSignature, FormInput, Bot, DownloadCloud } from 'lucide-react';
import FadeIn from './FadeIn';

const HowItWorks = () => {
  const steps = [
    {
      icon: FileSignature,
      title: '1. Select Template',
      description: 'Choose from 8 distinct documentation templates tailored for special education.'
    },
    {
      icon: FormInput,
      title: '2. Fill Out Form',
      description: 'Complete a highly structured, simple form with basic student details.'
    },
    {
      icon: Bot,
      title: '3. Generate Instantly',
      description: 'Zero prompting required. Our structured AI model writes the draft.'
    },
    {
      icon: DownloadCloud,
      title: '4. Export PDF',
      description: 'Review the generated text, make final adjustments, and export to PDF.'
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black font-heading text-gray-900 mb-4">How it works</h2>
            <p className="text-lg text-gray-500">From a blank template to a fully compliant document in four simple steps.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={i} delay={i * 80} direction="up">
                <div className="bg-white p-6 rounded-xl border border-gray-200 h-full flex flex-col hover:border-gray-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-primary flex items-center justify-center mb-5 shrink-0">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
