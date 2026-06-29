import { Check } from 'lucide-react';
import FadeIn from './FadeIn';

const Pricing = () => {
  const tiers = [
    {
      name: 'Individual Educator',
      price: '$29',
      period: '/mo',
      description: 'Perfect for individual special education teachers.',
      features: [
        'Up to 15 students',
        'Unlimited IEP & Lesson Plan generation',
        'Basic progress tracking',
        'Standard templates',
        'Email support'
      ],
      highlighted: false,
      ctaText: 'Start Free Trial',
      ctaLink: '#signup'
    },
    {
      name: 'School / Team',
      price: '$149',
      period: '/mo',
      description: 'For multidisciplinary teams and small schools.',
      features: [
        'Up to 100 students',
        'Everything in Individual',
        'Collaboration & sharing tools',
        'Advanced compliance tracking',
        'Custom template builder',
        'Priority support'
      ],
      highlighted: true,
      ctaText: 'Get Started',
      ctaLink: '#signup'
    },
    {
      name: 'District / Enterprise',
      price: 'Custom',
      period: '',
      description: 'Full-scale solution for entire school districts.',
      features: [
        'Unlimited students',
        'Everything in School tier',
        'SIS Integration (Clever, ClassLink)',
        'District-wide analytics dashboard',
        'Dedicated success manager',
        'Custom onboarding'
      ],
      highlighted: false,
      ctaText: 'Contact Sales',
      ctaLink: '#contact'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Choose the plan that fits your needs. No hidden fees, cancel anytime.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <FadeIn key={index} delay={index * 150} direction="up" className={tier.highlighted ? "md:-mt-4 md:mb-4" : ""}>
              <div 
                className={`relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 ${
                  tier.highlighted 
                    ? 'bg-primary text-white shadow-[0_20px_50px_rgba(107,70,193,0.3)] transform hover:scale-105 border-none z-10' 
                    : 'bg-white text-textColor border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase shadow-lg animate-bounce">
                    Most Popular
                  </div>
                )}
                
                <div className={`mb-6 border-b pb-6 ${tier.highlighted ? 'border-white/20' : 'border-gray-100'}`}>
                  <h3 className={`text-2xl font-bold font-heading mb-3 ${tier.highlighted ? 'text-white' : 'text-textColor'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm h-12 ${tier.highlighted ? 'text-primary-100' : 'text-gray-500'}`}>
                    {tier.description}
                  </p>
                  <div className="mt-6 flex items-baseline">
                    <span className={`text-5xl font-extrabold tracking-tight ${tier.highlighted ? 'text-white' : 'text-textColor'}`}>
                      {tier.price}
                    </span>
                    <span className={`ml-2 text-lg font-medium ${tier.highlighted ? 'text-primary-100' : 'text-gray-500'}`}>
                      {tier.period}
                    </span>
                  </div>
                </div>
                
                <ul className="flex-1 space-y-5 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start group/feature">
                      <div className={`mr-4 flex-shrink-0 rounded-full p-1 transition-transform group-hover/feature:scale-110 ${tier.highlighted ? 'bg-secondary/20 text-white' : 'bg-primary/10 text-primary'}`}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <span className={`text-base font-medium ${tier.highlighted ? 'text-white' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={tier.ctaLink} 
                  className={`block w-full py-4 px-6 text-center rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    tier.highlighted 
                      ? 'bg-white text-primary hover:bg-gray-50 hover:shadow-lg' 
                      : 'bg-primary/10 text-primary hover:bg-primary hover:text-white hover:shadow-lg'
                  }`}
                >
                  {tier.ctaText}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
