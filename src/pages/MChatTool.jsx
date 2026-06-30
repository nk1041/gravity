import { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { Download, AlertCircle, CheckCircle2, RotateCcw, Save } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import { supabase } from '../supabase';

const mchatQuestions = [
  "If you point at something across the room, does your child look at it?",
  "Have you ever wondered if your child might be deaf?",
  "Does your child play pretend or make-believe?",
  "Does your child like climbing on things?",
  "Does your child make unusual finger movements near their eyes?",
  "Does your child point with one finger to ask for something or to get help?",
  "Does your child point with one finger to show you something interesting?",
  "Is your child interested in other children?",
  "Does your child show you things by bringing them to you or holding them up for you to see?",
  "Does your child respond when you call their name?",
  "When you smile at your child, does your child smile back at you?",
  "Does your child get upset by everyday noises?",
  "Does your child walk?",
  "Does your child look you in the eye when you are talking to them, playing with them, or dressing them?",
  "Does your child try to copy what you do?",
  "If you turn your head to look at something, does your child look around to see what you are looking at?",
  "Does your child try to get you to watch them?",
  "Does your child understand when you tell them to do something?",
  "If something new happens, does your child look at your face to see how you feel about it?",
  "Does your child like movement activities?"
];

// Reversed scoring questions (where YES means risk, rather than NO meaning risk)
const reversedQuestions = [2, 5, 12]; 

const MChatTool = () => {
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [studentName, setStudentName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((ans, index) => {
      if (ans === null) return;
      const isReversed = reversedQuestions.includes(index + 1);
      // If it's reversed, Yes=1 risk point. Otherwise, No=1 risk point.
      if (isReversed && ans === 'Yes') score++;
      if (!isReversed && ans === 'No') score++;
    });
    return score;
  };

  const getResult = (score) => {
    if (score <= 2) return { risk: 'Low', color: 'text-green-600', bg: 'bg-green-50', text: 'Low risk of ASD. No follow-up needed unless developmental surveillance indicates risk.' };
    if (score <= 7) return { risk: 'Medium', color: 'text-orange-500', bg: 'bg-orange-50', text: 'Medium risk. Administer the M-CHAT-R/F Follow-Up to get more information.' };
    return { risk: 'High', color: 'text-red-600', bg: 'bg-red-50', text: 'High risk. Refer immediately for diagnostic evaluation and early intervention eligibility.' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.includes(null)) {
      alert("Please answer all 20 questions before submitting.");
      return;
    }
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setAnswers(Array(20).fill(null));
    setIsSubmitted(false);
  };

  const downloadPDF = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    executeDownload();
  };

  const executeDownload = async () => {
    const doc = new jsPDF();
    const score = calculateScore();
    const result = getResult(score);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    const splitText = doc.splitTextToSize(result.text, 170);
    doc.text(splitText, 20, 95);
    
    doc.setFontSize(22);
    doc.setTextColor(107, 70, 193); // Primary color
    doc.text("SimplyAbled", 20, 20);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("M-CHAT Screening Report", 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Student Name: ${studentName}`, 20, 45);
    doc.text(`Date of Birth: ${dateOfBirth}`, 20, 52);
    doc.text(`Date of Assessment: ${new Date().toLocaleDateString()}`, 20, 59);
    
    doc.setLineWidth(0.5);
    doc.line(20, 65, 190, 65);
    
    doc.setFontSize(14);
    doc.text(`Total Score: ${score} / 20`, 20, 75);
    doc.text(`Risk Level: ${result.risk}`, 20, 85);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    const splitText = doc.splitTextToSize(result.text, 170);
    doc.text(splitText, 20, 95);
    
    const fileName = `M-CHAT_Report_${studentName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;

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

        // 2. Insert record into Postgres with text AND pdf_url
        await supabase.from('documents').insert({
          user_id: user.id,
          title: `M-CHAT - ${studentName}`,
          type: 'M-CHAT',
          content: `Score: ${score}/20\nRisk Level: ${result.risk}\n\n${result.text}`,
          pdf_url: pdfUrl,
          metadata: { studentName, dateOfBirth, score, answers }
        });
      } catch (dbError) {
        console.error("Failed to save to database:", dbError);
      }
    }
    
    doc.save(fileName);
  };

  if (isSubmitted) {
    const score = calculateScore();
    const result = getResult(score);
    
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-heading">Screening Results</h1>
          <div className="flex gap-3">
            <button onClick={resetForm} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <RotateCcw size={18} /> Start Over
            </button>
            <button onClick={downloadPDF} className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 flex items-center gap-2 transition-colors shadow-md">
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
          <div className={`w-32 h-32 rounded-full ${result.bg} border-4 ${result.color.replace('text-', 'border-')} flex flex-col items-center justify-center flex-shrink-0`}>
            <span className={`text-4xl font-bold ${result.color}`}>{score}</span>
            <span className={`text-xs font-bold uppercase tracking-wider ${result.color}`}>/ 20</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.risk} Risk Identified</h2>
            <p className="text-gray-600 text-lg mb-4">{result.text}</p>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
              <span className="text-gray-800 font-bold">{studentName}</span> • DOB: {dateOfBirth}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold font-heading text-textColor mb-2">M-CHAT Screening Tool</h1>
        <p className="text-gray-500">Modified Checklist for Autism in Toddlers. Answer the following questions based on the child's usual behavior.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-gray-50">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Student Name</label>
            <input 
              required
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Liam Anderson" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
            <input 
              required
              type="date" 
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-700" 
            />
          </div>
        </div>

        <div className="space-y-6">
          {mchatQuestions.map((q, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <div className="flex gap-4 max-w-2xl">
                <span className="font-bold text-gray-400 mt-0.5">{i + 1}.</span>
                <p className="text-gray-800 font-medium leading-relaxed">{q}</p>
              </div>
              <div className="flex items-center gap-2 ml-8 md:ml-0 flex-shrink-0">
                <button 
                  type="button"
                  onClick={() => handleAnswer(i, 'Yes')}
                  className={`w-20 py-2 rounded-lg font-bold text-sm transition-all border ${answers[i] === 'Yes' ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50'}`}
                >
                  Yes
                </button>
                <button 
                  type="button"
                  onClick={() => handleAnswer(i, 'No')}
                  className={`w-20 py-2 rounded-lg font-bold text-sm transition-all border ${answers[i] === 'No' ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50'}`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-50 flex items-center justify-end">
          <button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_8px_20px_rgb(107,70,193,0.25)] flex items-center gap-2 hover:-translate-y-0.5"
          >
            Calculate Score
          </button>
        </div>
      </form>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={(user) => {
          setIsAuthModalOpen(false);
          if (isSubmitted) {
            executeDownload();
          }
        }}
      />
    </div>
  );
};

export default MChatTool;
