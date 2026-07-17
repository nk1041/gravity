import { useState, useEffect } from 'react';
import { Loader2, FileCheck2, Lock, Download, Copy, AlertCircle, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import FadeIn from './FadeIn';
import AuthModal from './AuthModal';
import { supabase } from '../supabase';

const adaptiveQuestions = {
  "Autism Spectrum Disorder (ASD)": [
    { id: "communication", label: "Communication Level", type: "select", options: ["Non-verbal", "Emerging (Few words/signs)", "Verbal but limited", "Fluent but lacks pragmatics"] },
    { id: "eyeContact", label: "Eye Contact", type: "select", options: ["Avoids completely", "Inconsistent", "Appropriate"] },
    { id: "social", label: "Social Interaction", type: "select", options: ["Withdrawn/Isolated", "Interested but awkward", "Appropriate with peers"] },
    { id: "sensory", label: "Sensory Sensitivities", type: "select", options: ["Highly sensitive (Auditory/Visual/Tactile)", "Mildly sensitive", "Sensory seeking", "None"] },
    { id: "repetitive", label: "Repetitive Behaviours", type: "select", options: ["Frequent (Interferes with learning)", "Occasional", "Rare/None"] },
    { id: "transitions", label: "Transition Difficulties", type: "select", options: ["Severe distress", "Moderate reluctance", "Needs mild prompts", "None"] },
    { id: "learningStyle", label: "Preferred Learning Style", type: "select", options: ["Highly Visual", "Hands-on / Kinesthetic", "Auditory"] }
  ],
  "Attention Deficit Hyperactivity Disorder (ADHD)": [
    { id: "attention", label: "Attention Span", type: "select", options: ["Very Short (<5 mins)", "Short (5-15 mins)", "Moderate", "Age appropriate"] },
    { id: "hyperactivity", label: "Hyperactivity Level", type: "select", options: ["Severe (Constantly moving)", "Moderate (Fidgety)", "Mild", "None"] },
    { id: "impulsivity", label: "Impulsivity", type: "select", options: ["Frequent interruptions/blurting", "Occasional", "Controlled"] },
    { id: "taskCompletion", label: "Task Completion", type: "select", options: ["Rarely finishes", "Needs constant prompts", "Finishes with occasional reminders"] },
    { id: "participation", label: "Classroom Participation", type: "select", options: ["Disruptive", "Passive/Distracted", "Active but off-topic", "Appropriate"] }
  ],
  "Specific Learning Disability": [
    { id: "reading", label: "Reading", type: "select", options: ["Significantly below grade level", "Mildly below grade level", "At grade level"] },
    { id: "writing", label: "Writing", type: "select", options: ["Poor sentence structure", "Struggles with organization", "Adequate"] },
    { id: "spelling", label: "Spelling", type: "select", options: ["Severe phonetic errors", "Inconsistent", "Adequate"] },
    { id: "math", label: "Mathematics", type: "select", options: ["Difficulty with basic operations", "Struggles with word problems", "Adequate"] },
    { id: "comprehension", label: "Comprehension", type: "select", options: ["Needs significant support/read-alouds", "Needs visual aids", "Adequate"] },
    { id: "handwriting", label: "Handwriting", type: "select", options: ["Illegible", "Slow and laborious", "Clear"] }
  ],
  "Intellectual Disability": [
    { id: "adaptive", label: "Adaptive Behaviour", type: "select", options: ["Needs constant support", "Needs verbal prompts", "Semi-independent"] },
    { id: "functional", label: "Functional Academics", type: "select", options: ["Pre-academic (Colors, Shapes)", "Early elementary (Basic reading/math)", "Mid elementary"] },
    { id: "selfHelp", label: "Self-help Skills", type: "select", options: ["Dependent for toileting/feeding", "Needs supervision", "Independent"] },
    { id: "communication", label: "Communication", type: "select", options: ["Non-verbal", "Basic needs only", "Conversational"] },
    { id: "social", label: "Social Interaction", type: "select", options: ["Isolated", "Parallel play", "Interactive"] }
  ],
  "Hearing Impairment": [
    { id: "device", label: "Assistive Device Used", type: "select", options: ["None", "Hearing Aid(s)", "Cochlear Implant"] },
    { id: "commMode", label: "Communication Mode", type: "select", options: ["Indian Sign Language (ISL)", "Lip Reading", "Verbal/Oral", "Total Communication (Mixed)"] },
    { id: "speech", label: "Speech Clarity", type: "select", options: ["Unintelligible to strangers", "Partially intelligible", "Clear"] },
    { id: "listening", label: "Classroom Listening", type: "select", options: ["Needs FM system", "Needs quiet environment", "Adequate with device"] }
  ],
  "Visual Impairment": [
    { id: "vision", label: "Residual Vision", type: "select", options: ["Total blindness", "Light perception only", "Low vision (needs large print)"] },
    { id: "device", label: "Assistive Tool Usage", type: "select", options: ["Braille", "Large Print", "Screen Reader / Audio", "Magnifier"] },
    { id: "mobility", label: "Orientation & Mobility", type: "select", options: ["Needs sighted guide", "Uses white cane independently", "Independent in familiar areas"] }
  ]
};

const commonStrengths = ["Visual memory", "Friendly/Sociable", "Musical ability", "Rote memory", "Creative/Artistic", "Follows routines", "Good with technology", "Athletic/Motor skills", "Math computation", "Reading decoding"];
const commonNeeds = ["Reading comprehension", "Expressive language", "Fine motor skills", "Self-regulation", "Focus/Attention", "Peer interactions", "Following multi-step directions", "Transitions", "Math reasoning", "Writing organization"];
const accommodationsList = ["Extended time on tests", "Visual schedules", "Frequent breaks", "Quiet workspace", "Read-aloud for exams", "Use of calculator", "Scribe for writing", "Reduced homework", "Sensory tools (fidgets)", "Preferential seating"];

const DocumentGenerator = ({ defaultType = 'iep' }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [error, setError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    type: defaultType,
    studentName: '',
    grade: '',
    gender: '',
    category: '',
    adaptiveAnswers: {},
    strengths: [],
    needs: [],
    accommodations: [],
    observations: ''
  });

  useEffect(() => {
    const handleOpen = (e) => {
      if (e.detail?.type) {
        setFormData(prev => ({ ...prev, type: e.detail.type }));
        setIsGenerated(false);
        setCurrentStep(1);
      }
    };
    window.addEventListener('openGenerator', handleOpen);
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('openGenerator', handleOpen);
      subscription.unsubscribe();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdaptiveChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      adaptiveAnswers: { ...prev.adaptiveAnswers, [id]: value }
    }));
  };

  const toggleArrayItem = (arrayName, item) => {
    setFormData(prev => {
      const arr = prev[arrayName];
      if (arr.includes(item)) {
        return { ...prev, [arrayName]: arr.filter(i => i !== item) };
      } else {
        return { ...prev, [arrayName]: [...arr, item] };
      }
    });
  };

  const generateDocument = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke('generate-document', {
        body: { formData }
      });

      if (error) throw new Error(error.message || "Failed to generate document.");
      if (data?.error) throw new Error(data.error);
      
      setGeneratedContent(data.result);
      setIsGenerated(true);
      
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while generating your document.");
    } finally {
      setIsGenerating(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 2 && !formData.category && formData.type === 'iep') {
      setError("Please select a disability category to continue.");
      return;
    }
    setError(null);
    if (currentStep < totalSteps) setCurrentStep(c => c + 1);
    else generateDocument();
  };

  const prevStep = () => {
    setError(null);
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  const resetForm = () => {
    setIsGenerated(false);
    setCurrentStep(1);
    setFormData({
      type: defaultType,
      studentName: '',
      grade: '',
      gender: '',
      category: '',
      adaptiveAnswers: {},
      strengths: [],
      needs: [],
      accommodations: [],
      observations: ''
    });
  };

  const getDocumentTitle = () => {
    switch (formData.type) {
      case 'iep': return 'Individualized Education Plan (IEP)';
      case 'itp': return 'Individualized Transition Plan (ITP)';
      case 'lp': return 'Differentiated Lesson Plan';
      default: return 'Document Preview';
    }
  };

  const handleExportClick = (e) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    executeExport();
  };

  const executeExport = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      const title = getDocumentTitle();
      const contentId = formData.studentName.toUpperCase() || 'DOCUMENT';
      
      doc.setFontSize(22);
      doc.setTextColor(30, 41, 59);
      doc.text(title, 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139);
      doc.text(`Student: ${contentId}`, 20, 30);
      doc.text(`Grade: ${formData.grade.toUpperCase()}`, 20, 37);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 44);
      
      doc.setDrawColor(226, 232, 240);
      doc.line(20, 48, 190, 48);
      
      doc.setFontSize(11);
      doc.setTextColor(51, 65, 85);
      
      let yPos = 60;
      doc.setFontSize(10);
      
      const cleanText = generatedContent.replace(/[*_]/g, '');
      const paragraphs = cleanText.split('\n').filter(p => p.trim() !== '');
      
      for (let p of paragraphs) {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        if (p.startsWith('#')) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          const headingText = p.replace(/^#+\s*/, '');
          const split = doc.splitTextToSize(headingText, 170);
          doc.text(split, 20, yPos);
          yPos += (split.length * 6) + 4;
        } else {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          const split = doc.splitTextToSize(p, 170);
          doc.text(split, 20, yPos);
          yPos += (split.length * 5) + 4;
        }
      }
      
      const fileName = `SimplyAbled_${formData.type.toUpperCase()}_${new Date().getTime()}.pdf`;
      
      if (user) {
        try {
          const pdfBlob = doc.output('blob');
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(`${user.id}/${fileName}`, pdfBlob, { contentType: 'application/pdf', upsert: false });
            
          let pdfUrl = null;
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(`${user.id}/${fileName}`);
            pdfUrl = publicUrl;
          }
          await supabase.from('documents').insert({
            user_id: user.id,
            title: `${formData.type.toUpperCase()} - ${formData.studentName.toUpperCase()}`,
            type: formData.type.toUpperCase(),
            content: generatedContent,
            pdf_url: pdfUrl,
            metadata: formData
          });
        } catch (dbError) {
          console.error("Failed to save to database:", dbError);
        }
      }
      doc.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  // Render specific steps for IEP
  const renderStepContent = () => {
    // If not an IEP, we just show a simplified version (for brevity here, we focus on IEP as requested)
    if (formData.type !== 'iep') {
      return (
        <div className="space-y-4 animate-fade-in">
          <p className="text-gray-500 mb-6">Note: The intelligent interview is optimized for IEPs. For {formData.type.toUpperCase()}, please provide basic details.</p>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Student/Topic Name</label>
            <input required name="studentName" value={formData.studentName} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Goals / Focus</label>
            <input required name="observations" value={formData.observations} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 1: Student Information</h3>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Student Name</label>
              <input required name="studentName" value={formData.studentName} onChange={handleInputChange} type="text" placeholder="Enter student name..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Grade / Age</label>
                <select name="grade" value={formData.grade} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none bg-white">
                  <option value="">Select Grade</option>
                  <option value="Pre-K">Pre-K / Early Intervention</option>
                  <option value="K-2">Lower Elementary (K-2)</option>
                  <option value="3-5">Upper Elementary (3-5)</option>
                  <option value="6-8">Middle School (6-8)</option>
                  <option value="9-12">High School (9-12)</option>
                  <option value="Transition">Transition (18+)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none bg-white">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 2: Primary Disability</h3>
            <p className="text-sm text-gray-500 mb-4">Select the primary RPwD Act category. This will adapt the next set of questions.</p>
            <div className="space-y-2">
              {Object.keys(adaptiveQuestions).concat(["Multiple Disabilities", "Other/Not Listed"]).map(cat => (
                <label key={cat} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.category === cat ? 'bg-primary/5 border-primary shadow-sm' : 'border-gray-200 hover:border-primary/50'}`}>
                  <input type="radio" name="category" value={cat} checked={formData.category === cat} onChange={handleInputChange} className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
                  <span className="ml-3 font-medium text-gray-800">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        const questions = adaptiveQuestions[formData.category];
        if (!questions) {
          return (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Step 3: Adaptive Questions</h3>
              <p className="text-gray-600">No specific adaptive questionnaire mapped for this category. You can proceed to the next step.</p>
            </div>
          );
        }
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 3: Adaptive Profile</h3>
            <p className="text-sm text-gray-500 mb-4">Please answer these brief questions tailored to {formData.category}.</p>
            {questions.map(q => (
              <div key={q.id}>
                <label className="block text-sm font-bold text-gray-700 mb-2">{q.label}</label>
                <div className="flex flex-wrap gap-2">
                  {q.options.map(opt => {
                    const isSelected = formData.adaptiveAnswers[q.id] === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleAdaptiveChange(q.id, opt)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 4: Student Strengths</h3>
            <p className="text-sm text-gray-500 mb-4">Select all that apply or add your own in the observations later.</p>
            <div className="flex flex-wrap gap-3">
              {commonStrengths.map(strength => (
                <button
                  type="button"
                  key={strength}
                  onClick={() => toggleArrayItem('strengths', strength)}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-all flex items-center gap-2 ${formData.strengths.includes(strength) ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  {formData.strengths.includes(strength) && <Check size={14} />} {strength}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 5: Areas Requiring Support</h3>
            <p className="text-sm text-gray-500 mb-4">What are the primary areas where the student needs help?</p>
            <div className="flex flex-wrap gap-3">
              {commonNeeds.map(need => (
                <button
                  type="button"
                  key={need}
                  onClick={() => toggleArrayItem('needs', need)}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-all flex items-center gap-2 ${formData.needs.includes(need) ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  {formData.needs.includes(need) && <Check size={14} />} {need}
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 6: Classroom Accommodations</h3>
            <p className="text-sm text-gray-500 mb-4">Select the accommodations necessary for the student's success.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {accommodationsList.map(acc => (
                <label key={acc} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.accommodations.includes(acc) ? 'bg-primary/5 border-primary' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                  <input type="checkbox" checked={formData.accommodations.includes(acc)} onChange={() => toggleArrayItem('accommodations', acc)} className="w-4 h-4 text-primary rounded border-gray-300" />
                  <span className="ml-3 text-sm font-medium text-gray-700">{acc}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 7: Teacher Observations (Optional)</h3>
            <p className="text-sm text-gray-500 mb-4">Any specific goals, parent requests, or additional notes you want the AI to include in the final IEP?</p>
            <textarea 
              name="observations" 
              value={formData.observations} 
              onChange={handleInputChange} 
              rows="4"
              placeholder="e.g., Parent requested focus on reading comprehension. Student responds well to token economy system."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            ></textarea>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="generator" className="py-12 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {!isGenerated ? (
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Intelligent <span className="text-primary">IEP Interview</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                No more long forms or complex prompts. Answer a few simple questions, and our AI will instantly draft a comprehensive, compliant Individualized Education Plan.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
              
              {/* Progress Bar */}
              {formData.type === 'iep' && (
                <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Step {currentStep} of {totalSteps}</span>
                  <div className="flex gap-1 w-1/2">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i < currentStep ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-6 md:p-10 min-h-[400px]">
                {isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-6 py-20 animate-fade-in">
                    <Loader2 size={64} className="text-primary animate-spin" />
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Synthesizing Profile...</h3>
                      <p className="text-gray-500">Drafting present levels, goals, and accommodations.</p>
                    </div>
                  </div>
                ) : (
                  renderStepContent()
                )}
              </div>

              {!isGenerating && (
                <div className="bg-gray-50 border-t border-gray-100 p-6 flex justify-between items-center">
                  <button 
                    onClick={prevStep}
                    disabled={currentStep === 1 || formData.type !== 'iep'}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${currentStep === 1 || formData.type !== 'iep' ? 'opacity-0 pointer-events-none' : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-100'}`}
                  >
                    <ChevronLeft size={18} /> Back
                  </button>
                  
                  <button 
                    onClick={nextStep}
                    className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    {currentStep === totalSteps || formData.type !== 'iep' ? 'Generate IEP' : 'Continue'} 
                    {currentStep !== totalSteps && formData.type === 'iep' && <ChevronRight size={18} />}
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_-10px_rgba(34,197,94,0.15)] border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 p-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center shadow-inner">
                    <FileCheck2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">IEP Successfully Generated!</h3>
                    <p className="text-sm text-gray-500">Student: {formData.studentName} | Category: {formData.category}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={resetForm} className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm">
                    Start New
                  </button>
                  <button onClick={handleExportClick} className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md flex items-center gap-2 text-sm">
                    <Download size={16} /> Export PDF
                  </button>
                </div>
              </div>

              <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto bg-white document-markdown">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 pb-2 border-b-2 border-gray-100 uppercase tracking-tight" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8 text-primary" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-bold text-gray-800 mb-3 mt-6 bg-gray-50 py-2 px-4 border-l-4 border-primary rounded-r" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4 text-justify" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-5 text-gray-700 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-5 text-gray-700 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                    table: ({node, ...props}) => <div className="overflow-x-auto mb-6"><table className="w-full text-left border-collapse border border-gray-200" {...props} /></div>,
                    th: ({node, ...props}) => <th className="bg-gray-50 p-3 border border-gray-200 font-bold text-gray-800" {...props} />,
                    td: ({node, ...props}) => <td className="p-3 border border-gray-200 text-gray-700" {...props} />,
                  }}
                >
                  {generatedContent}
                </ReactMarkdown>
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={(user) => { setIsAuthModalOpen(false); if (isGenerated) executeExport(); }} />
    </section>
  );
};

export default DocumentGenerator;
