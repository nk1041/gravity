import { useState, useEffect } from 'react';
import { Loader2, FileCheck2, Lock, Download, Copy, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import FadeIn from './FadeIn';
import AuthModal from './AuthModal';
import { supabase } from '../supabase';

const DocumentGenerator = ({ defaultType = 'iep' }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [error, setError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const [formData, setFormData] = useState({
    initials: '',
    grade: '',
    category: '',
    type: defaultType,
    goals: '',
    subject: '',
    postSecondary: '',
    accommodations: {
      time: false,
      visual: false,
      breaks: false,
      quiet: false
    }
  });

  // Listen for custom event from Features section to pre-select tool
  useEffect(() => {
    const handleOpen = (e) => {
      if (e.detail?.type) {
        setFormData(prev => ({ ...prev, type: e.detail.type }));
        setIsGenerated(false); // Reset if they are switching tools
      }
    };
    window.addEventListener('openGenerator', handleOpen);
    
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      accommodations: { ...prev.accommodations, [name]: checked }
    }));
  };

  const generateDocument = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke('generate-document', {
        body: { formData }
      });

      if (error) {
        // Log detailed error and throw message to be caught below
        console.error("Function invocation error:", error);
        throw new Error(error.message || "Failed to generate document.");
      }

      if (data?.error) {
        throw new Error(data.error);
      }
      
      setGeneratedContent(data.result);
      setIsGenerated(true);
      
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while generating your document. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateDocument();
  };

  const resetForm = () => {
    setIsGenerated(false);
  };

  // Helper to generate dynamic content based on selections
  const getDocumentTitle = () => {
    switch (formData.type) {
      case 'iep': return 'Individualized Education Program (IEP)';
      case 'itp': return 'Individualized Transition Plan (ITP)';
      case 'lp': return 'Differentiated Lesson Plan';
      default: return 'Document Preview';
    }
  };

  const getActiveAccommodations = () => {
    const active = [];
    if (formData.accommodations.time) active.push("Extended Time");
    if (formData.accommodations.visual) active.push("Visual Schedules");
    if (formData.accommodations.breaks) active.push("Frequent Breaks");
    if (formData.accommodations.quiet) active.push("Quiet Workspace");
    return active.length > 0 ? active.join(", ") : "Standard accommodations applied";
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
      // Dynamic import of jsPDF to save bundle size
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      const title = getDocumentTitle();
      const contentId = formData.type === 'lp' ? 'this lesson' : formData.initials.toUpperCase();
      
      doc.setFontSize(22);
      doc.setTextColor(30, 41, 59); // text-slate-800
      doc.text(title, 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139); // text-slate-500
      doc.text(`Student/Topic: ${contentId}`, 20, 30);
      doc.text(`Grade: ${formData.grade.toUpperCase()}`, 20, 37);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 44);
      
      doc.setDrawColor(226, 232, 240); // border-slate-200
      doc.line(20, 48, 190, 48);
      
      doc.setFontSize(11);
      doc.setTextColor(51, 65, 85); // text-slate-700
      
      // We'll add some generic structure based on the type
      let yPos = 60;
      doc.setFontSize(10);
      
      // Clean basic markdown for PDF text output (remove bold/italics markers)
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
      
      // Save to database and bucket if user is logged in
      if (user) {
        try {
          const pdfBlob = doc.output('blob');
          
          // 1. Upload PDF to Storage Bucket
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(`${user.id}/${fileName}`, pdfBlob, {
              contentType: 'application/pdf',
              upsert: false
            });
            
          let pdfUrl = null;
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('documents')
              .getPublicUrl(`${user.id}/${fileName}`);
            pdfUrl = publicUrl;
          } else {
            console.error("Storage upload error:", uploadError);
          }

          // 2. Insert record into Postgres with raw text AND pdf_url
          await supabase.from('documents').insert({
            user_id: user.id,
            title: `${formData.type.toUpperCase()} - ${formData.initials.toUpperCase()}`,
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

  return (
    <section id="generator" className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-altBackground/50 -skew-x-12 transform origin-top-right"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          <div className={`w-full lg:w-1/2 ${isGenerated ? 'order-2 lg:order-1' : 'order-1'}`}>
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {formData.type === 'iep' ? 'IEP' : formData.type === 'itp' ? 'ITP' : 'Lesson Plan'} Generator — <span className="text-primary">Zero Prompting</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience the power of our AI with just a few structured inputs. The output will instantly reflect your choices. 
              </p>
              

              {!isGenerated ? (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-md p-5 sm:p-8 rounded-3xl shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.08)] border border-gray-100/80 relative transition-all duration-500 ease-linear-curve">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {formData.type !== 'lp' ? (
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Student Initials</label>
                        <input 
                          required 
                          name="initials"
                          value={formData.initials}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="e.g. J.D." 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200/80 focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 ease-linear-curve hover:border-primary/40 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]" 
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Subject Area</label>
                        <select 
                          required 
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200/80 focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 ease-linear-curve hover:border-primary/40 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] bg-white appearance-none"
                        >
                          <option value="">Select Subject</option>
                          <option value="math">Mathematics</option>
                          <option value="reading">Reading / ELA</option>
                          <option value="science">Science</option>
                          <option value="history">Social Studies</option>
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Grade Level</label>
                      <select 
                        required 
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                      >
                        <option value="">Select Grade</option>
                        <option value="k">Kindergarten</option>
                        <option value="1">1st Grade</option>
                        <option value="3">3rd Grade</option>
                        <option value="6-8">Middle School</option>
                        <option value="9-12">High School</option>
                      </select>
                    </div>
                  </div>

                  {formData.type === 'iep' && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Disability Category</label>
                      <select 
                        required 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                      >
                        <option value="">Select Category</option>
                        <option value="autism">Autism</option>
                        <option value="sld">Specific Learning Disability</option>
                        <option value="sli">Speech/Language Impairment</option>
                        <option value="edd">Emotional Disturbance</option>
                      </select>
                    </div>
                  )}

                  {formData.type === 'itp' && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Post-Secondary Goal</label>
                      <select 
                        required 
                        name="postSecondary"
                        value={formData.postSecondary}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                      >
                        <option value="">Select Goal</option>
                        <option value="university">4-Year University</option>
                        <option value="community">Community College</option>
                        <option value="trade">Vocational / Trade School</option>
                        <option value="employment">Direct Employment</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      {formData.type === 'iep' && 'Primary Goals / Concerns'}
                      {formData.type === 'itp' && 'Student Interests & Strengths'}
                      {formData.type === 'lp' && 'Lesson Objective / Topic'}
                    </label>
                    <input 
                      required 
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder={
                        formData.type === 'iep' ? "e.g. Needs support with reading comprehension" :
                        formData.type === 'itp' ? "e.g. Enjoys technology, strong visual learner" :
                        "e.g. Understanding fractions and decimals"
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/80 focus:ring-4 focus:ring-primary/15 focus:border-primary outline-none transition-all duration-300 ease-linear-curve hover:border-primary/40 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Accommodations Needed</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 ease-linear-curve shadow-[0_2px_5px_-1px_rgba(0,0,0,0.05)] ${formData.accommodations.time ? 'bg-primary border-primary shadow-primary/20' : 'border-gray-300 group-hover:border-primary/60 bg-white'}`}>
                          {formData.accommodations.time && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                        </div>
                        <input type="checkbox" name="time" checked={formData.accommodations.time} onChange={handleCheckboxChange} className="hidden" /> Extra Time
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 ease-linear-curve shadow-[0_2px_5px_-1px_rgba(0,0,0,0.05)] ${formData.accommodations.visual ? 'bg-primary border-primary shadow-primary/20' : 'border-gray-300 group-hover:border-primary/60 bg-white'}`}>
                          {formData.accommodations.visual && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                        </div>
                        <input type="checkbox" name="visual" checked={formData.accommodations.visual} onChange={handleCheckboxChange} className="hidden" /> Visual Schedules
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 ease-linear-curve shadow-[0_2px_5px_-1px_rgba(0,0,0,0.05)] ${formData.accommodations.breaks ? 'bg-primary border-primary shadow-primary/20' : 'border-gray-300 group-hover:border-primary/60 bg-white'}`}>
                          {formData.accommodations.breaks && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                        </div>
                        <input type="checkbox" name="breaks" checked={formData.accommodations.breaks} onChange={handleCheckboxChange} className="hidden" /> Frequent Breaks
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 ease-linear-curve shadow-[0_2px_5px_-1px_rgba(0,0,0,0.05)] ${formData.accommodations.quiet ? 'bg-primary border-primary shadow-primary/20' : 'border-gray-300 group-hover:border-primary/60 bg-white'}`}>
                          {formData.accommodations.quiet && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                        </div>
                        <input type="checkbox" name="quiet" checked={formData.accommodations.quiet} onChange={handleCheckboxChange} className="hidden" /> Quiet Workspace
                      </label>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100 animate-fade-in">
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium leading-relaxed">{error}</p>
                    </div>
                  )}

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isGenerating}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-linear-curve shadow-premium hover:shadow-premium-hover flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 size={24} className="animate-spin" />
                          Synthesizing Document...
                        </>
                      ) : (
                        'Generate Document Now'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_40px_-10px_rgba(34,197,94,0.15)] border border-green-100/80 overflow-hidden transition-all duration-500 animate-fade-in">
                  {/* Success Header */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-[inset_0_2px_8px_rgba(34,197,94,0.1)]">
                      <FileCheck2 size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-800">Document Generated!</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {getDocumentTitle()} — <span className="font-semibold text-primary">{formData.type === 'lp' ? formData.subject : formData.initials.toUpperCase()}</span> · Grade {formData.grade.toUpperCase()} · {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Document Content */}
                  <div className="p-6 max-h-[60vh] overflow-y-auto text-sm text-gray-700 leading-relaxed">
                    <ReactMarkdown
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-xl font-bold text-gray-900 mb-3 mt-5 pb-1 border-b border-gray-100" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-lg font-bold text-gray-800 mb-2 mt-4" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-base font-bold text-primary mb-2 mt-3" {...props} />,
                        h4: ({node, ...props}) => <h4 className="text-sm font-bold text-gray-800 mb-1 mt-2" {...props} />,
                        p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-3" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 text-gray-700 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 text-gray-700 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                      }}
                    >
                      {generatedContent}
                    </ReactMarkdown>

                    {/* Accommodations Badge */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-bold text-primary mb-1 uppercase tracking-wide text-xs">Applied Accommodations</h4>
                      <div className="bg-primary/5 p-3 rounded-lg text-primary font-medium border border-primary/10 text-xs">
                        {getActiveAccommodations()}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-4 border-t border-gray-100 bg-gray-50/60 flex flex-col gap-3">
                    <a
                      href="#"
                      onClick={handleExportClick}
                      className="w-full bg-primary text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-premium hover:shadow-premium-hover flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                      <Download size={20} /> Export as PDF
                    </a>
                    <button onClick={resetForm} className="w-full bg-transparent hover:bg-gray-100 border border-gray-200 text-gray-600 py-3.5 rounded-xl font-bold transition-all duration-300">
                      Create Another Document
                    </button>
                  </div>
                </div>
              )}

            </FadeIn>
          </div>

          <div className={`w-full lg:w-1/2 justify-center lg:sticky top-24 ${(!isGenerated && !isGenerating) ? 'hidden lg:flex' : 'flex'} ${isGenerated ? 'order-1 lg:order-2' : 'order-2'}`}>
            <FadeIn direction="left" delay={200} className="w-full">
              {/* Dynamic Document Preview */}
              <div className={`relative w-full max-w-lg aspect-[8.5/11] bg-white rounded-2xl shadow-[0_15px_50px_-10px_rgba(0,0,0,0.1)] border border-gray-200/80 p-8 transition-all duration-700 ease-linear-curve ${isGenerating ? 'opacity-70 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-t-2xl"></div>
                
                {isGenerated ? (
                  <div className="h-full flex flex-col font-sans animate-fade-in">
                    <div className="border-b-2 border-gray-100 pb-4 mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{getDocumentTitle()}</h3>
                      <div className="flex justify-between text-sm text-gray-500 font-medium">
                        {formData.type === 'lp' ? (
                          <>
                            <span className="capitalize">Subject: {formData.subject}</span>
                            <span>Grade: {formData.grade.toUpperCase()}</span>
                          </>
                        ) : (
                          <>
                            <span>Student: {formData.initials.toUpperCase()}</span>
                            <span>Grade: {formData.grade.toUpperCase()}</span>
                          </>
                        )}
                        <span>Date: {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6 flex-1 text-gray-700 text-sm leading-relaxed overflow-y-auto overflow-x-hidden relative pr-4 pb-12">
                      
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-6" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-800 mb-3 mt-5" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4" {...props} />,
                          h4: ({node, ...props}) => <h4 className="text-base font-bold text-gray-800 mb-2 mt-3" {...props} />,
                          p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4 text-justify" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 text-gray-700 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />
                        }}
                      >
                        {generatedContent}
                      </ReactMarkdown>

                      <div>
                        <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">Applied Accommodations</h4>
                        <div className="bg-primary/5 p-3 rounded-lg text-primary-800 font-medium border border-primary/10">
                          {getActiveAccommodations()}
                        </div>
                      </div>
                      
                      {/* Fade out text at the bottom */}
                      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                    </div>
                  </div>
                ) : (
                  // Placeholder wireframe when not generated
                  <div className="h-full w-full pointer-events-none animate-pulse">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="h-8 w-48 bg-gray-200 rounded mb-3"></div>
                        <div className="h-4 w-32 bg-gray-100 rounded"></div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-primary/10"></div>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <div className="h-4 w-32 bg-primary/20 rounded mb-4"></div>
                        <div className="h-3 w-full bg-gray-100 rounded mb-2"></div>
                        <div className="h-3 w-full bg-gray-100 rounded mb-2"></div>
                        <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
                      </div>
                      <div>
                        <div className="h-4 w-40 bg-primary/20 rounded mb-4"></div>
                        <div className="p-4 rounded-lg border border-gray-50 bg-gray-50 space-y-3">
                          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                          <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                
                {isGenerating && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center rounded-2xl z-10 flex-col gap-5 transition-all duration-500">
                    <Loader2 size={56} className="text-primary animate-spin" />
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-gray-900 text-xl tracking-tight">Synthesizing data...</span>
                      <span className="text-primary font-medium mt-1">Applying AI models</span>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
          
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={(user) => {
          setIsAuthModalOpen(false);
          if (isGenerated) {
            executeExport();
          }
        }}
      />
    </section>
  );
};

export default DocumentGenerator;
