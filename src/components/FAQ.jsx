import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How much time will this actually save me?",
      answer: "On average, special educators using SimplyAbled cut their paperwork time by over 50%. Instead of staring at a blank page or copy-pasting old templates, you can generate a professional first draft in seconds."
    },
    {
      question: "Is my students' data secure and compliant?",
      answer: "Yes. Data privacy is our top priority. The platform is fully compliant with FERPA and HIPAA. We use enterprise-grade encryption, and we never use your students' personal information to train public AI models."
    },
    {
      question: "Do I need to learn how to write 'AI prompts'?",
      answer: "Not at all! We know you're busy, so we built the platform to be zero-prompt. You just fill out simple, structured forms (checkboxes, dropdowns, and short notes), and the platform handles all the complex drafting behind the scenes."
    },
    {
      question: "Can I edit the documents after they are created?",
      answer: "Absolutely. SimplyAbled acts as your assistant to create a high-quality foundation. You have a full rich-text editor to review, tweak, and finalize every detail before you download the PDF."
    },
    {
      question: "Can I manage multiple students on the platform?",
      answer: "Yes! You can create secure profiles for your entire caseload. This allows you to track individual progress, store past assessments, and keep all their documentation organized in one single dashboard."
    },
    {
      question: "Is there a free version I can try?",
      answer: "Yes, we offer a free tier designed specifically for individual educators so you can start generating documents, managing your workflow, and saving time immediately without needing a credit card."
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
