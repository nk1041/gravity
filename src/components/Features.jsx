import { useState, useEffect } from 'react';
import { FileText, ClipboardList, BookOpen, TrendingUp, Users, Library, ArrowRight, X } from 'lucide-react';
import FadeIn from './FadeIn';

const Features = () => {
  const features = [
    {
      icon: <FileText size={28} />,
      title: 'IEP Generator (Zero Prompting)',
      description: 'Create comprehensive, compliant IEPs without writing complex AI prompts. Just fill out a simple, structured form.',
      details: 'Our zero-prompting IEP Generator takes the guesswork out of AI. By asking you targeted, structured questions about a student’s present levels, goals, and accommodations, the system synthesizes a highly professional and compliant Individualized Education Program draft in seconds. It ensures all necessary legal sections are covered without requiring you to become a prompt engineer.',
      link: '#iep',
      toolType: 'iep'
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'ITP Generator',
      description: 'Develop structured Individualized Transition Plans to prepare older students for post-secondary education or employment.',
      details: 'Transition planning is critical for older students. The ITP Generator helps you align a student’s interests and strengths with measurable post-secondary goals. It automatically suggests age-appropriate transition assessments, independent living objectives, and employment strategies to ensure a seamless shift into adulthood.',
      link: '#itp',
      toolType: 'itp'
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Lesson Plan Generator',
      description: 'Generate differentiated lesson plans aligned with IEP goals and state standards in a fraction of the time.',
      details: 'Easily adapt general education curriculum for students with special needs. Simply input your core learning objective and the student’s required accommodations. The AI will generate a structured lesson plan complete with modified materials, differentiated instructional strategies, and built-in checks for understanding.',
      link: '#lp',
      toolType: 'lp'
    },
    {
      icon: <ClipboardList size={28} />,
      title: 'Progress Tracking',
      description: 'Monitor compliance and track student progress toward goals with intuitive dashboards and automated reminders.',
      details: 'Stop tracking data on scattered spreadsheets. Our Progress Tracking module provides visual dashboards that graph a student’s trajectory over time. Set baseline metrics, input weekly or monthly data points, and let the system generate beautiful progress reports for parents and administrators with just one click.',
      link: '#tracking',
      toolType: 'iep'
    },
    {
      icon: <Users size={28} />,
      title: 'Collaboration Tools',
      description: 'Share documents securely across multidisciplinary teams—teachers, therapists, and administrators.',
      details: 'Special education is a team effort. SimplyAbled allows you to invite Speech Therapists, Occupational Therapists, School Psychologists, and Gen-Ed teachers to securely view and comment on draft documents before finalizing. Built-in version control ensures everyone is working off the most current plan.',
      link: '#collaboration',
      toolType: 'iep'
    },
    {
      icon: <Library size={28} />,
      title: 'Document Library',
      description: 'Maintain a secure, searchable history of all student documents and revisions in one centralized repository.',
      details: 'Never lose a document again. The Document Library serves as your secure, FERPA-compliant digital filing cabinet. Search by student initials, document type, or date. Quickly duplicate previous years’ plans as a starting point for annual reviews, saving you hours of redundant data entry.',
      link: '#library',
      toolType: 'iep'
    }
  ];

  const handleTryTool = (e, toolType) => {
    if (e) e.preventDefault();
    window.dispatchEvent(new CustomEvent('openGenerator', { detail: { type: toolType } }));
    setTimeout(() => {
      document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="features" className="py-24 bg-altBackground relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              Everything you need to <span className="text-primary relative inline-block">
                empower your students
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                </svg>
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our comprehensive suite of tools is designed specifically for special education professionals to reduce paperwork and improve outcomes.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 100} direction="up">
              <div 
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 group h-full flex flex-col transform hover:-translate-y-2 relative overflow-hidden cursor-pointer"
                onClick={(e) => handleTryTool(e, feature.toolType)}
              >
                {/* Hover gradient background effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-6 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-textColor">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed flex-1">
                  {feature.description}
                </p>
                <div className="inline-flex items-center text-primary font-bold hover:text-primary/80 transition-colors group/link mt-auto w-fit">
                  Learn more 
                  <ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
