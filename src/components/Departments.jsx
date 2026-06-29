import { useState } from 'react';
import { Stethoscope, Brain, User, Calendar, MessageSquare, BriefcaseMedical } from 'lucide-react';

const Departments = () => {
  const [activeTab, setActiveTab] = useState('speech');

  const departments = [
    { id: 'speech', name: 'Speech Therapy', icon: <MessageSquare size={20} /> },
    { id: 'occupational', name: 'Occupational Therapy', icon: <BriefcaseMedical size={20} /> },
    { id: 'behavioral', name: 'Behavioral & ABA', icon: <Brain size={20} /> },
    { id: 'psychoed', name: 'Psychoeducational', icon: <Stethoscope size={20} /> },
  ];

  const professionals = {
    speech: [
      {
        name: 'Dr. Sarah Jenkins',
        credential: 'Ph.D., CCC-SLP',
        specialty: 'Early Intervention',
        image: 'https://i.pravatar.cc/150?img=1'
      },
      {
        name: 'Mark Davis',
        credential: 'M.S., CCC-SLP',
        specialty: 'Articulation Disorders',
        image: 'https://i.pravatar.cc/150?img=11'
      }
    ],
    occupational: [
      {
        name: 'Emily Chen',
        credential: 'OTD, OTR/L',
        specialty: 'Sensory Processing',
        image: 'https://i.pravatar.cc/150?img=5'
      },
      {
        name: 'Dr. James Wilson',
        credential: 'Ph.D., OTR/L',
        specialty: 'Fine Motor Development',
        image: 'https://i.pravatar.cc/150?img=8'
      }
    ],
    behavioral: [
      {
        name: 'Dr. Robert Garcia',
        credential: 'Ph.D., BCBA-D',
        specialty: 'Autism Spectrum Disorder',
        image: 'https://i.pravatar.cc/150?img=12'
      },
      {
        name: 'Lisa Thompson',
        credential: 'M.A., BCBA',
        specialty: 'Behavior Intervention Plans',
        image: 'https://i.pravatar.cc/150?img=9'
      }
    ],
    psychoed: [
      {
        name: 'Dr. Amanda Roberts',
        credential: 'Ph.D., NCSP',
        specialty: 'Cognitive Assessments',
        image: 'https://i.pravatar.cc/150?img=40'
      }
    ]
  };

  return (
    <section id="services" className="py-24 bg-altBackground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-textColor">
            Our Professional Network
          </h2>
          <p className="text-lg text-gray-600">
            Connect with certified specialists across multiple disciplines to build your complete special education team.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Tabs */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl transition-all whitespace-nowrap lg:whitespace-normal ${
                    activeTab === dept.id 
                      ? 'bg-primary text-white font-medium shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary font-medium'
                  }`}
                >
                  <span className={activeTab === dept.id ? 'text-white' : 'text-primary/70'}>
                    {dept.icon}
                  </span>
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-3/4">
            <div className="grid md:grid-cols-2 gap-6">
              {professionals[activeTab].map((pro, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={pro.image} 
                      alt={pro.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-lg font-bold font-heading">{pro.name}</h4>
                      <p className="text-primary font-medium text-sm">{pro.credential}</p>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <User size={14} />
                        <span>{pro.specialty}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 flex gap-3">
                    <button className="flex-1 bg-white border border-primary text-primary hover:bg-primary/5 py-2.5 rounded-xl text-sm font-medium transition-colors text-center">
                      View Profile
                    </button>
                    <button className="flex-1 bg-primary hover:bg-primary/90 text-white py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2">
                      <Calendar size={16} /> Book Consult
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Departments;
