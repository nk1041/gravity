import { Edit3, Wand2, FileSearch, Send } from 'lucide-react';
import { FileSignature, FormInput, Bot, DownloadCloud } from 'lucide-react';
import FadeIn from './FadeIn';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileSignature size={24} />,
      title: '1. Select Document',
      description: 'Choose from 8 distinct documentation templates.'
    },
    {
      icon: <FormInput size={24} />,
      title: '2. Fill Form',
      description: 'Complete a highly structured, simple form.'
    },
    {
      icon: <Bot size={24} />,
      title: '3. AI Generation',
      description: 'Zero prompting. AI writes the document instantly.'
    },
    {
      icon: <DownloadCloud size={24} />,
      title: '4. Edit & Export',
      description: 'Review the text, make adjustments, and download PDF.'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-textColor">How It Works</h2>
            <p className="text-xl text-gray-500">From blank page to compliant document in 4 steps.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-12"></div>
          
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 100} direction="up" className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-inner">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
