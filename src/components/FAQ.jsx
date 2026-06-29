import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is SimplyAbled FERPA and HIPAA compliant?",
      answer: "Yes. Data privacy is our top priority. We use enterprise-grade encryption, and our platform is fully compliant with FERPA, HIPAA, and state-level student privacy laws. We never train our base models on your students' PII."
    },
    {
      question: "Can I use SimplyAbled for any special education document?",
      answer: "Currently, we support comprehensive IEPs, ITPs (Transition Plans), and differentiated Lesson Plans. We are actively developing templates for 504 Plans and Behavioral Intervention Plans (BIPs)."
    },
    {
      question: "Does the AI replace the teacher's judgment?",
      answer: "Absolutely not. SimplyAbled acts as an intelligent assistant to draft the foundational paperwork based on your inputs. The educator remains fully in control to review, edit, and finalize every document."
    },
    {
      question: "How does the school/district billing work?",
      answer: "We offer flexible invoicing for schools and districts, and we accept purchase orders (POs). District plans also include dedicated account management and custom integrations."
    },
    {
      question: "Does it integrate with our Student Information System (SIS)?",
      answer: "District-level plans include integrations with major SIS platforms like Clever, ClassLink, PowerSchool, and Infinite Campus to automatically sync student rosters securely."
    },
    {
      question: "What if I need help or training?",
      answer: "All users have access to our comprehensive knowledge base and email support. School and District plans include live training sessions, onboarding support, and priority response times."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-textColor">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Have questions? We've got answers. Contact our team if you need more information.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-colors ${
                openIndex === index ? 'border-primary/50 bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/30'
              }`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold font-heading text-lg text-textColor pr-8">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-primary flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
