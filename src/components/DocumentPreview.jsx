import FadeIn from './FadeIn';

const DocumentPreview = () => {
  return (
    <section className="py-24 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black font-heading text-gray-900 mb-4">Professional, compliant output</h2>
            <p className="text-lg text-gray-500">Every document is generated following strict special education standards.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* IEP Preview */}
          <FadeIn delay={100} direction="up">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm aspect-[8.5/11] flex flex-col relative overflow-hidden hover:border-gray-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="mb-5 mt-2 border-b border-gray-100 pb-4">
                <h3 className="text-base font-bold text-gray-900">IEP Goal Draft</h3>
                <p className="text-xs text-gray-400 mt-1 font-medium">Student: J.D. · Grade 3</p>
              </div>
              <div className="space-y-4 flex-1 text-xs">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Present Levels</h4>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                    J.D. is currently reading at a mid-1st grade level. He struggles with decoding multisyllabic words and identifying main ideas in grade-level texts.
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Annual Goal</h4>
                  <p className="text-primary font-medium leading-relaxed bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                    By October 2027, when given a 3rd-grade level text, J.D. will accurately decode multisyllabic words and state the main idea with 80% accuracy in 4 out of 5 consecutive trials.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Lesson Plan Preview */}
          <FadeIn delay={200} direction="up">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm aspect-[8.5/11] flex flex-col relative overflow-hidden hover:border-gray-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <div className="mb-5 mt-2 border-b border-gray-100 pb-4">
                <h3 className="text-base font-bold text-gray-900">Math Lesson Plan</h3>
                <p className="text-xs text-gray-400 mt-1 font-medium">Topic: Fractions · Duration: 45m</p>
              </div>
              <div className="space-y-4 flex-1 text-xs">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Objective</h4>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                    Students will be able to identify and create equivalent fractions using visual models (fraction bars and pie charts).
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Accommodations</h4>
                  <ul className="text-blue-700 space-y-2 bg-blue-50/30 p-3 rounded-lg border border-blue-100 font-medium">
                    <li className="flex items-start gap-1.5"><span className="text-blue-400 mt-0.5">•</span> Provide physical fraction manipulatives</li>
                    <li className="flex items-start gap-1.5"><span className="text-blue-400 mt-0.5">•</span> Allow verbal responses instead of written</li>
                    <li className="flex items-start gap-1.5"><span className="text-blue-400 mt-0.5">•</span> Extended time for independent practice (1.5x)</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Progress Report Preview */}
          <FadeIn delay={300} direction="up">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm aspect-[8.5/11] flex flex-col relative overflow-hidden hover:border-gray-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
              <div className="mb-5 mt-2 border-b border-gray-100 pb-4">
                <h3 className="text-base font-bold text-gray-900">Progress Report</h3>
                <p className="text-xs text-gray-400 mt-1 font-medium">Term: Q1 · Goal: Social Skills</p>
              </div>
              <div className="space-y-4 flex-1 text-xs">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Data Summary</h4>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                    Data collected over the past 9 weeks indicates that Sarah has successfully initiated interactions with peers in 65% of recorded opportunities (baseline: 30%).
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Narrative</h4>
                  <p className="text-green-700 leading-relaxed bg-green-50/30 p-3 rounded-lg border border-green-100 font-medium">
                    Sarah has made excellent progress this quarter. She is consistently utilizing her "social script" cards during unstructured recess time. We will continue to fade physical prompts as she approaches her 80% mastery goal.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default DocumentPreview;
