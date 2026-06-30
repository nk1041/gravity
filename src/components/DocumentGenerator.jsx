import { useState, useEffect } from 'react';
import { Loader2, FileCheck2, Lock, Download, Copy } from 'lucide-react';
import FadeIn from './FadeIn';
import AuthModal from './AuthModal';
import { supabase } from '../supabase';

const DocumentGenerator = ({ defaultType = 'iep' }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
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

  const generateDocument = () => {
    setIsGenerating(true);
    // Simulate API call processing the inputs
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
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
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("1. Overview & Context", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      yPos += 7;
      
      const overviewText = `This document represents a comprehensive AI-generated record focusing on "${formData.goals}". All data and observations have been synthesized based on the provided parameters.`;
      const splitOverview = doc.splitTextToSize(overviewText, 170);
      doc.text(splitOverview, 20, yPos);
      yPos += (splitOverview.length * 6) + 10;
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("2. Key Details", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      yPos += 7;
      
      const detailsText = `Based on the selected criteria, appropriate scaffolding and Universal Design for Learning (UDL) principles are embedded within the instruction. Accommodations applied: ${getActiveAccommodations()}.`;
      const splitDetails = doc.splitTextToSize(detailsText, 170);
      doc.text(splitDetails, 20, yPos);
      
      doc.save(`SimplyAbled_${formData.type.toUpperCase()}_${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  return (
    <section id="generator" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-altBackground/50 -skew-x-12 transform origin-top-right"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="w-full lg:w-1/2">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {formData.type === 'iep' ? 'IEP' : formData.type === 'itp' ? 'ITP' : 'Lesson Plan'} Generator — <span className="text-primary">Zero Prompting</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience the power of our AI with just a few structured inputs. The output will instantly reflect your choices. 
              </p>
              

              {!isGenerated ? (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.08)] border border-gray-100/80 relative transition-all duration-500 ease-linear-curve">
                  <div className="grid grid-cols-2 gap-5">
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
                    <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
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
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_40px_-10px_rgba(34,197,94,0.15)] border border-green-100/80 flex flex-col items-center justify-center text-center h-[520px] transition-all duration-500">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-[inset_0_2px_10px_rgba(34,197,94,0.1)] transition-transform duration-500 hover:scale-110">
                    <FileCheck2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold font-heading mb-3 text-gray-800">Success!</h3>
                  <p className="text-gray-600 mb-8 max-w-sm text-lg">
                    The {getDocumentTitle().split(' ')[0]} for <span className="font-bold text-primary">{formData.type === 'lp' ? 'this lesson' : formData.initials.toUpperCase()}</span> has been successfully generated using the AI engine. 
                  </p>
                  <div className="flex flex-col w-full max-w-sm gap-4">
                    <a 
                      href="#" 
                      onClick={handleExportClick}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold transition-all duration-300 ease-linear-curve shadow-premium hover:shadow-premium-hover flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                      <Download size={20} /> Export as PDF
                    </a>
                    <button onClick={resetForm} className="w-full bg-gray-50/80 backdrop-blur-sm hover:bg-gray-100 border border-gray-200/80 text-gray-700 py-4 rounded-xl font-bold transition-all duration-300 ease-linear-curve hover:shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                      Create Another Document
                    </button>
                  </div>
                </div>
              )}
            </FadeIn>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center sticky top-24">
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
                      
                      {formData.type === 'iep' && (
                        <>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">1. Present Levels of Academic Achievement and Functional Performance (PLAAFP)</h4>
                            <p className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 leading-relaxed mb-4 text-justify">
                              {formData.initials.toUpperCase()} is currently a student in the {formData.grade.toUpperCase()} grade. Formal and informal assessments indicate that {formData.initials.toUpperCase()} qualifies for special education services under the category of <span className="font-bold">{formData.category.toUpperCase()}</span>. The primary area of concern as noted by the multidisciplinary team is "{formData.goals}". Observations within the general education environment indicate that while {formData.initials.toUpperCase()} is highly motivated and participates eagerly in preferred activities, they experience significant challenges maintaining focus during unstructured tasks or independent work. Current reading and comprehension levels demonstrate a delay compared to neurotypical peers, significantly impacting their ability to access the general curriculum without targeted interventions.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">2. Measurable Annual Goals</h4>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                              <p className="font-bold text-gray-800 mb-2">Goal 1: Academic / Functional Progress</p>
                              <p className="text-gray-700 leading-relaxed mb-3">
                                By the end of the annual IEP cycle, when presented with grade-level materials and tasks related to {formData.goals.toLowerCase()}, {formData.initials.toUpperCase()} will utilize provided scaffolds and strategies to successfully complete the task with 80% accuracy in 4 out of 5 consecutive trials, as measured by teacher observations, work samples, and quarterly data collection.
                              </p>
                              <p className="font-bold text-gray-800 mb-2">Short-Term Objectives:</p>
                              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                <li>By the end of the first quarter, {formData.initials.toUpperCase()} will accurately demonstrate the skill with 50% accuracy given maximum prompting.</li>
                                <li>By the end of the second quarter, {formData.initials.toUpperCase()} will accurately demonstrate the skill with 65% accuracy given moderate prompting.</li>
                                <li>By the end of the third quarter, {formData.initials.toUpperCase()} will accurately demonstrate the skill with 75% accuracy given minimal prompting.</li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">3. Specialized Instruction & Services</h4>
                            <p className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 leading-relaxed">
                              {formData.initials.toUpperCase()} will receive specialized academic instruction targeting {formData.goals.toLowerCase()} for 45 minutes daily within a small group setting. Additionally, consultation between the special education teacher and general education teacher will occur weekly to ensure consistent implementation of accommodations across all learning environments.
                            </p>
                          </div>
                        </>
                      )}

                      {formData.type === 'itp' && (
                        <>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">1. Transition Assessments and Student Profile</h4>
                            <p className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 leading-relaxed mb-4 text-justify">
                              Based on recent age-appropriate transition assessments (including student interviews, career interest inventories, and observational data), {formData.initials.toUpperCase()} demonstrates a strong inclination towards the following interests and strengths: "{formData.goals}". The student has expressed a clear desire to pursue a post-secondary pathway focused on <span className="font-bold capitalize">{formData.postSecondary.replace('-', ' ')}</span>. Currently in {formData.grade.toUpperCase()} grade, {formData.initials.toUpperCase()} requires targeted transition services to bridge the gap between current academic performance and the independence required for their chosen post-secondary environment.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">2. Measurable Post-Secondary Goals</h4>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4 space-y-4">
                              <div>
                                <p className="font-bold text-gray-800">Education/Training Goal:</p>
                                <p className="text-gray-700">Upon graduation from high school, {formData.initials.toUpperCase()} will enroll in a <span className="capitalize">{formData.postSecondary.replace('-', ' ')}</span> program to advance their skills related to {formData.goals}.</p>
                              </div>
                              <div>
                                <p className="font-bold text-gray-800">Employment Goal:</p>
                                <p className="text-gray-700">Upon completion of their post-secondary education/training, {formData.initials.toUpperCase()} will maintain competitive, integrated employment in a field related to their strengths.</p>
                              </div>
                              <div>
                                <p className="font-bold text-gray-800">Independent Living Goal (if appropriate):</p>
                                <p className="text-gray-700">Upon graduation from high school, {formData.initials.toUpperCase()} will independently manage a daily schedule and personal budget, utilizing assistive technology as needed.</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">3. Transition Services & Activities</h4>
                            <ul className="list-disc pl-5 space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700">
                              <li><strong>Instruction:</strong> Enroll in elective courses that directly align with {formData.postSecondary.replace('-', ' ')} requirements.</li>
                              <li><strong>Career Exploration:</strong> Participate in at least two job shadowing experiences or informational interviews by the end of the spring semester.</li>
                              <li><strong>Self-Advocacy:</strong> Lead their upcoming IEP meeting by presenting a 3-minute summary of their strengths and required accommodations.</li>
                            </ul>
                          </div>
                        </>
                      )}

                      {formData.type === 'lp' && (
                        <>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">1. Lesson Context & Objectives</h4>
                            <p className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 leading-relaxed mb-4 text-justify">
                              <strong>Subject:</strong> <span className="capitalize">{formData.subject}</span> | <strong>Grade:</strong> {formData.grade.toUpperCase()} <br/>
                              This lesson is designed around the core objective: <span className="font-bold">"{formData.goals}"</span>. The curriculum is scaffolded to ensure accessibility for diverse learners, specifically incorporating Universal Design for Learning (UDL) principles. By the end of the 50-minute block, students will be able to demonstrate conceptual understanding through both formative assessment and peer-collaborative tasks.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">2. Instructional Sequence & Timing</h4>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4 space-y-3">
                              <p className="text-gray-700"><strong>Warm-up / Bell Ringer (10 min):</strong><br/>Activate prior knowledge by presenting a real-world scenario related to {formData.goals.toLowerCase()}. Students will complete a brief "Think-Pair-Share" exercise using visual prompts provided on the smartboard.</p>
                              <p className="text-gray-700"><strong>Direct Instruction (15 min):</strong><br/>Introduce the primary concept using multi-modal representations (visual, auditory, and kinesthetic elements). The teacher will explicitly model the steps required to achieve the objective, pausing every 5 minutes for quick comprehension checks.</p>
                              <p className="text-gray-700"><strong>Guided Practice (15 min):</strong><br/>Students transition into heterogeneous small groups. They will work collaboratively on a guided activity while the educator circulates to provide targeted interventions and immediate feedback.</p>
                              <p className="text-gray-700"><strong>Independent Application & Closure (10 min):</strong><br/>Students independently complete an exit ticket demonstrating their understanding of {formData.goals.toLowerCase()}. The educator will review the objective and preview the next lesson.</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">3. Differentiation & Assessment</h4>
                            <p className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 leading-relaxed">
                              <strong>Formative Assessment:</strong> Exit tickets will be graded on a 3-point rubric. Observational data collected during Guided Practice will inform tomorrow's grouping strategies.<br/>
                              <strong>Differentiation Strategy:</strong> Provide graphic organizers and sentence starters for students requiring writing support. Advanced learners will be given extension tasks requiring higher-order critical thinking.
                            </p>
                          </div>
                        </>
                      )}

                      {/* Generic fallback for other types (progress, assessment, etc.) */}
                      {['progress', 'assessment', 'session', 'observation'].includes(formData.type) && (
                        <>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">1. Overview & Context</h4>
                            <p className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 leading-relaxed mb-4 text-justify">
                              This document represents a comprehensive record regarding the student's current status and recent activities. The primary focus of this documentation is centered around: <span className="font-bold">"{formData.goals}"</span>. All data and observations have been collected in a naturalistic educational environment, adhering to standard compliance protocols.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">2. Detailed Data & Narrative</h4>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4 space-y-3">
                              <p className="text-gray-700"><strong>Quantitative Data:</strong><br/>During the observation period, the student demonstrated target behaviors at a frequency that indicates steady progress towards baseline goals. Accuracy levels fluctuated between 60% and 80% depending on the complexity of the task and the level of scaffolding provided.</p>
                              <p className="text-gray-700"><strong>Qualitative Narrative:</strong><br/>The student engaged well with the provided materials and showed a positive response to positive reinforcement strategies. Moving forward, the focus will remain on building independence and gradually fading physical and verbal prompts.</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">3. Next Steps & Recommendations</h4>
                            <p className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 leading-relaxed">
                              Continue current intervention strategies while monitoring progress weekly. Maintain consistent communication with the multidisciplinary team to ensure accommodations are applied uniformly across all settings.
                            </p>
                          </div>
                        </>
                      )}

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
