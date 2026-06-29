import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      content: "SimplyAbled has completely transformed how I write IEPs. What used to take me 3 hours on a Sunday afternoon now takes 20 minutes, and the quality of the goals is actually better.",
      author: "Jennifer M.",
      title: "Special Education Teacher",
      organization: "Oakridge Elementary",
      image: "https://i.pravatar.cc/150?img=47"
    },
    {
      content: "The ability to collaborate seamlessly with our speech and physical therapists in one document library has eliminated so much friction. Compliance tracking is finally easy.",
      author: "David R.",
      title: "School District Administrator",
      organization: "Westfield Public Schools",
      image: "https://i.pravatar.cc/150?img=33"
    },
    {
      content: "As an OT, finding time to write detailed reports is my biggest struggle. The AI generator structures my clinical observations perfectly into parent-friendly documents.",
      author: "Sarah L.",
      title: "Occupational Therapist",
      organization: "Pediatric Therapy Network",
      image: "https://i.pravatar.cc/150?img=5"
    }
  ];

  return (
    <section className="py-24 bg-altBackground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-textColor">
            Loved by Educators & Specialists
          </h2>
          <p className="text-lg text-gray-600">
            See how professionals are reclaiming their time and focusing on what matters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col relative">
              <div className="flex text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-8 flex-1 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold font-heading text-textColor">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                  <p className="text-xs text-primary font-medium">{testimonial.organization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
