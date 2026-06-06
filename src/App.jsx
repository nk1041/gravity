import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Menu, X, Moon, Sun, Brain, Star, ChevronRight, CheckCircle, 
  MapPin, Phone, Mail, FileText, Activity, Users, Video, Calendar,
  ChevronDown, ChevronUp, Quote, GraduationCap, Heart, Clock, BookOpen
} from 'lucide-react';

const departments = [
  "Special Education", "Speech-Language Therapy", "Occupational Therapy"
];

const professionals = [
  { name: "Dr. Priya Nair", dept: "Speech-Language Therapy", qual: "M.Sc. SLP", city: "Chennai", rating: 4.9 },
  { name: "Ms. Kavitha Ramachandran", dept: "Special Education", qual: "M.Ed. Special Education", city: "Bangalore", rating: 5.0 },
  { name: "Ms. Deepa Krishnamurthy", dept: "Occupational Therapy", qual: "BOT", city: "Hyderabad", rating: 4.7 },
  { name: "Ms. Neha Joshi", dept: "Speech-Language Therapy", qual: "M.Sc. SLP", city: "Jaipur", rating: 4.7 },
  { name: "Mr. Rajeev Kulkarni", dept: "Special Education", qual: "M.Ed. Special Education", city: "Pune", rating: 5.0 },
  { name: "Ms. Meena Pillai", dept: "Occupational Therapy", qual: "OT (SI)", city: "Kochi", rating: 4.8 }
];

const testimonials = [
  { quote: "SimplyAbled made finding the right speech therapist for my son incredibly easy. The entire process is seamless.", name: "Aarti M.", role: "Parent", city: "Delhi" },
  { quote: "The IEP Generator has saved me countless hours every week. I can finally focus more on my students rather than paperwork.", name: "Kavitha R.", role: "Special Educator", city: "Bangalore" },
  { quote: "As an OT, having a platform that connects me to families who genuinely need my specialized help is a game changer.", name: "Deepa K.", role: "Occupational Therapist", city: "Hyderabad" },
  { quote: "We booked Dr. Mehta for a developmental assessment. The virtual session option was a lifesaver for our busy schedule.", name: "Rohan S.", role: "Parent", city: "Mumbai" },
  { quote: "The lesson plan builder creates specialized activities that my autistic students absolutely love. Highly recommended!", name: "Rajeev K.", role: "Special Educator", city: "Pune" },
  { quote: "SimplyAbled is a centralized hub that Indian special education has needed for a very long time.", name: "Pooja A.", role: "Child Psychiatrist", city: "Delhi" }
];

const faqs = [
  { q: "What is SimplyAbled?", a: "SimplyAbled is a dedicated platform connecting parents of children with special needs to expert educators, therapists, and related services." },
  { q: "Who can use this platform?", a: "Parents looking for support, and verified special education professionals (educators, therapists, psychologists) looking to manage their practice and connect with families." },
  { q: "How do I book an appointment?", a: "Navigate to the 'Booking' section, select the specialization, choose a professional, pick a date/time, and submit your request." },
  { q: "What is an IEP?", a: "An Individualized Education Program (IEP) is a legally binding document detailing the specialized instruction and services a student with a disability will receive." },
  { q: "Can I use the tools as a parent?", a: "Certain tracking tools are available to parents, but the IEP and Lesson Plan generators are designed specifically for educators and therapists." },
  { q: "Are sessions available online?", a: "Yes, many of our professionals offer virtual/online sessions as well as in-person appointments." },
  { q: "How are professionals verified?", a: "We strictly verify the educational qualifications, licenses, and background checks of every professional before they can list their services." },
  { q: "Is my child's data secure?", a: "Absolutely. We follow strict data privacy protocols and ensure all health and educational records are encrypted and securely stored." }
];

const toolGoals = [
  "Speech Articulation", "Sensory Regulation", "Fine Motor Skills", 
  "Gross Motor Skills", "Social Interaction", "Behavioral Control", 
  "Reading Comprehension", "Self-Feeding", "Task Focus", "Transitions"
];

const mchatQuestions = [
  "1. If you point at something across the room, does your child look at it?",
  "2. Have you ever wondered if your child might be deaf?",
  "3. Does your child play pretend or make-believe?",
  "4. Does your child like climbing on things?",
  "5. Does your child make unusual finger movements near his or her eyes?",
  "6. Does your child point with one finger to ask for something or to get help?",
  "7. Does your child point with one finger to show you something interesting?",
  "8. Is your child interested in other children?",
  "9. Does your child show you things by bringing them to you or holding them up for you to see?",
  "10. Does your child respond when you call his or her name?",
  "11. When you smile at your child, does he or she smile back at you?",
  "12. Does your child get upset by everyday noises?",
  "13. Does your child walk?",
  "14. Does your child look you in the eye when you are talking, playing, or dressing?",
  "15. Does your child try to copy what you do?",
  "16. If you turn your head to look at something, does your child look around to see what you are looking at?",
  "17. Does your child try to get you to watch him or her?",
  "18. Does your child understand when you tell him or her to do something?",
  "19. If something new happens, does your child look at your face to see how you feel about it?",
  "20. Does your child like movement activities?"
];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || false;
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingDept, setBookingDept] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeTool, setActiveTool] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [mchatAnswers, setMchatAnswers] = useState(Array(20).fill(null));

  // Supabase Auth State
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authRole, setAuthRole] = useState('Parent');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authMsg, setAuthMsg] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setUserProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setUserProfile(data);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true); setAuthError(''); setAuthMsg('');
    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: authEmail, password: authPassword,
          options: { data: { full_name: authName, role: authRole } }
        });
        if (error) throw error;
        if (data.user) {
          // Fallback manual insert in case trigger isn't setup
          await supabase.from('profiles').upsert({ id: data.user.id, email: authEmail, full_name: authName, role: authRole });
        }
        setAuthMsg('Success! Check your email for verification.');
      } else if (authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
        if (error) throw error;
        setShowSignup(false);
      } else if (authMode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(authEmail);
        if (error) throw error;
        setAuthMsg('Password reset link sent.');
      }
    } catch (err) { setAuthError(err.message); } 
    finally { setAuthLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    try {
      setAuthLoading(true); setAuthError(''); setAuthMsg('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
      });
      if (error) throw error;
    } catch (err) {
      setAuthError(err.message);
      setAuthLoading(false);
    }
  };

  const handleLogout = () => supabase.auth.signOut();

  const handleGenerate = async () => {
    if (!session) {
      setActiveTool(null);
      setAuthMode('signup');
      setShowSignup(true);
      return;
    }

    let docContent = '';
    
    if (activeTool === 'M-CHAT Assessment') {
      if (mchatAnswers.includes(null)) {
        alert("Please answer all 20 questions before generating the report.");
        return;
      }
      let riskScore = 0;
      mchatAnswers.forEach((ans, idx) => {
        const isReverse = [1, 4, 11].includes(idx); // 0-indexed for questions 2, 5, 12
        if ((isReverse && ans === 'Yes') || (!isReverse && ans === 'No')) riskScore++;
      });
      
      let riskLevel = "Low Risk"; let color = "green";
      let rec = "If child is under 24 months, screen again after 2nd birthday. No further action needed right now.";
      if (riskScore >= 3 && riskScore <= 7) {
        riskLevel = "Medium Risk"; color = "orange";
        rec = "Administer Follow-Up interview. If score remains 2 or higher, refer for diagnostic evaluation.";
      } else if (riskScore >= 8) {
        riskLevel = "High Risk"; color = "red";
        rec = "Bypass Follow-Up and refer immediately for diagnostic evaluation and early intervention.";
      }

      docContent = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #333;">
          <h1 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">M-CHAT-R Screening Report</h1>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <hr style="margin: 20px 0; border: 1px solid #eee;" />
          
          <div style="background-color: #f8fafc; padding: 20px; border-left: 5px solid ${color}; margin: 20px 0;">
            <h2 style="color: ${color}; margin-top: 0;">Total Score: ${riskScore} / 20 (${riskLevel})</h2>
            <p><strong>Recommendation:</strong> ${rec}</p>
          </div>

          <h3 style="color: #1e40af; margin-top: 30px;">Detailed Responses</h3>
          <div style="overflow-x: auto;">
            <table style="width: 100%; min-width: 500px; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tr style="background-color: #f1f5f9;">
                <th style="padding: 10px; border: 1px solid #ddd;">Question</th>
                <th style="padding: 10px; border: 1px solid #ddd; width: 100px;">Response</th>
              </tr>
              ${mchatQuestions.map((q, i) => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${q}</td>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: ${((i===1||i===4||i===11)?(mchatAnswers[i]==='Yes'):(mchatAnswers[i]==='No')) ? 'red' : 'green'}">${mchatAnswers[i]}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        </div>
      `;
    } else {
      docContent = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #333;">
          <h1 style="color: #7C3AED; border-bottom: 2px solid #7C3AED; padding-bottom: 10px;">${activeTool} Document</h1>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Prepared By:</strong> ${userProfile?.full_name || 'Educator'}</p>
          <hr style="margin: 20px 0; border: 1px solid #eee;" />
          
          <h3 style="color: #4c1d95;">Primary Focus Areas</h3>
          <ul style="line-height: 1.6;">
            ${selectedGoals.length > 0 ? selectedGoals.map(g => `<li>${g}</li>`).join('') : '<li>General Assessment</li>'}
          </ul>
          
          <h3 style="color: #4c1d95; margin-top: 30px;">AI-Generated Action Plan</h3>
          <p style="line-height: 1.6;">Based on the selected focus areas, the following tailored interventions are recommended. This plan includes specific benchmarks for progress monitoring and suggested sensory and behavioral regulation strategies tailored for the individual needs.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #7C3AED; margin-top: 20px;">
            <strong>Next Steps:</strong> Review this document with the support team and update benchmarks monthly.
          </div>
        </div>
      `;
    }

    const { error } = await supabase.from('documents').insert([{ 
      user_id: session.user.id, title: `${activeTool} - ${new Date().toLocaleDateString()}`, 
      type: activeTool, content: docContent
    }]);

    if (!error) {
      setActiveTool(null);
      setGeneratedDocument({ title: activeTool, content: docContent });
    } else alert('Error saving document: ' + error.message);
  };

  const toggleGoal = (goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
    e.target.reset();
  };

  const NavLink = ({ href, children }) => (
    <a href={href} className="text-lightText dark:text-darkText hover:text-primary transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
      {children}
    </a>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-darkBg text-darkText' : 'bg-white text-lightText'}`}>
      {/* 1. NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-darkBg/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#" className="flex items-center gap-2">
              <Brain className="text-primary h-8 w-8" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                SimplyAbled
              </span>
            </a>
            
            <div className="hidden md:flex items-center gap-6">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#tools">Tools</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-accent dark:hover:bg-darkCard transition-colors">
                {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
              </button>
              
              {session ? (
                <div className="flex items-center gap-4">
                  <span className="font-medium text-primary hidden lg:inline-block">Hi, {userProfile?.full_name?.split(' ')[0] || 'User'}</span>
                  <button onClick={handleLogout} className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full font-medium transition-all">
                    Log out
                  </button>
                  <a href="#booking" className="bg-primary hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg hover:shadow-primary/50 btn-animated">
                    Book Now
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={() => { setAuthMode('login'); setShowSignup(true); }} className="text-primary font-medium px-4 py-2 hover:bg-accent dark:hover:bg-darkCard rounded-full transition-all">
                    Sign In
                  </button>
                  <a href="#booking" className="bg-primary hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg hover:shadow-primary/50 btn-animated">
                    Book Now
                  </a>
                </div>
              )}
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2">
                {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-lightText dark:text-darkText">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-darkBgAlt shadow-xl border-t dark:border-gray-800 py-4 px-6 flex flex-col gap-4">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#tools">Tools</NavLink>
            <NavLink href="#booking">Booking</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 bg-gradient-to-br from-accent via-white to-white dark:from-darkBgAlt dark:via-darkBg dark:to-darkBg overflow-hidden relative">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Empowering Every Child. <br/>
              <span className="text-primary">Connecting Every Family.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              India's trusted platform connecting parents of children with special needs to expert educators, therapists, and support services — all in one secure place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#professionals" className="bg-primary hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-lg shadow-primary/30 text-center btn-animated">
                Find a Professional
              </a>
              <a href="#tools" className="border-2 border-primary text-primary dark:text-white dark:border-gray-600 dark:hover:border-primary px-8 py-3 rounded-full font-semibold text-lg transition-all hover:bg-accent dark:hover:bg-darkCard text-center btn-animated">
                I'm an Educator
              </a>
            </div>
          </div>

          <div className="relative h-[400px] hidden md:block">
            <div className="absolute top-0 right-10 bg-white dark:bg-darkCard p-4 rounded-2xl shadow-xl w-64 animate-float border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-accent text-primary p-2 rounded-lg"><FileText size={20} /></div>
                <div className="font-bold">IEP Generator</div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            </div>

            <div className="absolute top-1/3 left-0 bg-white dark:bg-darkCard p-4 rounded-2xl shadow-xl w-64 animate-float-delayed border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Calendar size={20} /></div>
                <div className="font-bold">Appointment Booked</div>
              </div>
              <div className="text-sm text-gray-500">Dr. Priya Nair - Tomorrow, 10 AM</div>
            </div>

            <div className="absolute bottom-10 right-20 bg-white dark:bg-darkCard p-4 rounded-2xl shadow-xl w-64 animate-float border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg"><Activity size={20} /></div>
                <div className="font-bold">Milestone Tracked</div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Speech</span>
                <span className="text-green-600 font-bold">+15%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-darkBg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What is SimplyAbled?
            <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                SimplyAbled was built on a singular belief: every child deserves the right support, and every parent deserves peace of mind. Navigating the world of special education and therapy can be overwhelming. We simplify the journey.
              </p>
              <p>
                Whether you need a Speech Therapist in Chennai, a Special Educator in Delhi, or an AI tool to generate an IEP for your classroom, SimplyAbled bridges the gap between dedicated professionals and the families who need them most.
              </p>
              <div className="flex items-center gap-2 text-primary font-bold mt-4">
                <CheckCircle className="h-6 w-6" />
                <span>Focusing on inclusive education & early intervention.</span>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-accent dark:bg-darkCard p-6 rounded-2xl text-center shadow-lg hover:-translate-y-1 transition-transform">
                <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-extrabold text-lightText dark:text-white">500+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Verified Professionals</div>
              </div>
              <div className="bg-accent dark:bg-darkCard p-6 rounded-2xl text-center shadow-lg hover:-translate-y-1 transition-transform sm:translate-y-4">
                <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-extrabold text-lightText dark:text-white">10k+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Families Helped</div>
              </div>
              <div className="bg-accent dark:bg-darkCard p-6 rounded-2xl text-center shadow-lg hover:-translate-y-1 transition-transform sm:col-span-2">
                <Brain className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-extrabold text-lightText dark:text-white">20+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Specializations Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 bg-accent dark:bg-darkBgAlt">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How SimplyAbled Works
            <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-primary/20 z-0"></div>
            
            <div className="bg-white dark:bg-darkCard p-8 rounded-2xl shadow-xl relative z-10 text-center border-b-4 border-primary">
              <div className="bg-primary text-white h-16 w-16 rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 shadow-lg text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-400">Join as a parent seeking support or as a professional offering services. Setup takes 2 minutes.</p>
            </div>
            
            <div className="bg-white dark:bg-darkCard p-8 rounded-2xl shadow-xl relative z-10 text-center border-b-4 border-primary mt-8 md:mt-0">
              <div className="bg-primary text-white h-16 w-16 rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 shadow-lg text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-3">Find the Right Expert</h3>
              <p className="text-gray-600 dark:text-gray-400">Filter by location, specialization, and ratings to find the perfect match for your child's needs.</p>
            </div>
            
            <div className="bg-white dark:bg-darkCard p-8 rounded-2xl shadow-xl relative z-10 text-center border-b-4 border-primary mt-8 md:mt-0">
              <div className="bg-primary text-white h-16 w-16 rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 shadow-lg text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-3">Book & Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-400">Schedule online or in-person sessions securely. Generate reports and track milestones effortlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section id="services" className="py-20 px-4 bg-white dark:bg-darkBg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Specializations
            <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departments.map((dept, idx) => (
              <div key={idx} className="group bg-white dark:bg-darkCard border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer text-center">
                <div className="bg-accent dark:bg-darkBgAlt w-16 h-16 mx-auto rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6 shadow-sm">
                  {idx === 0 ? <Users size={28} /> : idx === 1 ? <Activity size={28} /> : <Brain size={28} />}
                </div>
                <h3 className="font-bold text-xl mb-3">{dept}</h3>
                <p className="text-gray-500 dark:text-gray-400">Expert, evidence-based support from verified professionals.</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. TOOLS */}
      <section id="tools" className="py-20 px-4 bg-white dark:bg-darkBg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Powerful Tools for Parents & Educators
            <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          </h2>
          
          <div className="space-y-16">
            {/* Clinical Screening */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8 text-blue-800 dark:text-blue-400">Clinical Screening</h3>
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-darkBgAlt dark:to-gray-900 border border-blue-100 dark:border-gray-800 p-8 md:p-12 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform text-center flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Activity size={200} /></div>
                <div className="w-24 h-24 bg-white dark:bg-darkCard rounded-full flex items-center justify-center mb-6 shadow-md relative z-10">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <h4 className="text-3xl font-extrabold mb-4 text-blue-900 dark:text-blue-300 relative z-10">M-CHAT Assessment</h4>
                <p className="text-lg text-blue-700 dark:text-blue-500 mb-8 max-w-2xl relative z-10">The Modified Checklist for Autism in Toddlers. A globally validated developmental screening tool to identify early signs of autism. Recommended for children between 16-30 months.</p>
                <button onClick={() => { setActiveTool('M-CHAT Assessment'); setMchatAnswers(Array(20).fill(null)); }} className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition-all btn-animated text-lg relative z-10">Start Full Screening</button>
              </div>
            </div>

            {/* Educator Document Generators */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8 text-primary">AI Document Generators</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-darkCard border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform flex flex-col">
                  <Activity className="h-12 w-12 text-primary mb-6" />
                  <h4 className="text-xl font-bold mb-3">IEP Generator</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">AI-assisted Individual Education Plan creation with smart goals, benchmarks, and timelines.</p>
                  <button onClick={() => setActiveTool('IEP Generator')} className="w-full text-center py-3 bg-accent text-primary dark:bg-darkBgAlt hover:bg-primary hover:text-white font-bold rounded-xl transition-colors border border-primary/20">Use Tool</button>
                </div>
                
                <div className="bg-white dark:bg-darkCard border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform flex flex-col">
                  <GraduationCap className="h-12 w-12 text-primary mb-6" />
                  <h4 className="text-xl font-bold mb-3">ITP Generator</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">Individual Transition Plans for older students with vocational and life-skills goals.</p>
                  <button onClick={() => setActiveTool('ITP Generator')} className="w-full text-center py-3 bg-accent text-primary dark:bg-darkBgAlt hover:bg-primary hover:text-white font-bold rounded-xl transition-colors border border-primary/20">Use Tool</button>
                </div>

                <div className="bg-white dark:bg-darkCard border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform flex flex-col">
                  <BookOpen className="h-12 w-12 text-primary mb-6" />
                  <h4 className="text-xl font-bold mb-3">Lesson Planner</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">Customizable, disability-specific weekly lesson plans with downloadable templates.</p>
                  <button onClick={() => setActiveTool('Lesson Planner')} className="w-full text-center py-3 bg-accent text-primary dark:bg-darkBgAlt hover:bg-primary hover:text-white font-bold rounded-xl transition-colors border border-primary/20">Use Tool</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BOOKING SECTION */}
      <section id="booking" className="py-20 px-4 bg-accent dark:bg-darkBgAlt">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Book an Appointment
            <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          </h2>
          
          <div className="bg-white dark:bg-darkCard rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {bookingSuccess ? (
              <div className="text-center py-16 animate-up">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Appointment Requested!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Your appointment has been booked. The professional will confirm via email within 24 hours.</p>
                <button onClick={() => setBookingSuccess(false)} className="bg-primary hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all">
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Parent / Guardian Name *</label>
                  <input required type="text" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Email Address *</label>
                  <input required type="email" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Phone Number *</label>
                  <input required type="tel" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Child's Age *</label>
                  <input required type="number" min="0" max="25" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="e.g. 5" />
                </div>
                
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold">Primary Concern / Condition *</label>
                  <select required className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                    <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select Condition</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Autism Spectrum Disorder</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">ADHD</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Down Syndrome</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Learning Disability</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Speech Delay</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Cerebral Palsy</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Behavioral Issues</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Other / Unsure</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold">Department *</label>
                  <select required value={bookingDept} onChange={(e) => setBookingDept(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                    <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select Department</option>
                    {departments.map(d => <option key={d} value={d} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">{d}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold">Select Professional *</label>
                  <select required className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50" disabled={!bookingDept}>
                    <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">{bookingDept ? "Select Expert" : "Select Department First"}</option>
                    {professionals.filter(p => p.dept === bookingDept).map(p => (
                      <option key={p.name} value={p.name} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">{p.name} - {p.city}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold">Preferred Date *</label>
                  <input required type="date" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold">Preferred Time *</label>
                  <select required className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                    <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select Time Slot</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Morning (9 AM - 12 PM)</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Afternoon (12 PM - 3 PM)</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Evening (3 PM - 6 PM)</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Session Mode *</label>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="mode" value="Online" required className="text-primary focus:ring-primary"/> Online (Video Call)</label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="mode" value="Home Session" required className="text-primary focus:ring-primary"/> Home Session</label>
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold">Additional Notes (Optional)</label>
                  <textarea rows="3" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Briefly describe any specific requirements..."></textarea>
                </div>

                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="w-full bg-primary hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/30 btn-animated">
                    Confirm Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-4 bg-white dark:bg-darkBg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What Families & Educators Say
            <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          </h2>
          
          <div className="bg-accent dark:bg-darkCard p-8 md:p-12 rounded-3xl relative shadow-xl min-h-[300px] flex flex-col justify-center transition-all duration-500">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/20 rotate-180" />
            <p className="text-xl md:text-2xl italic font-medium mb-8 px-4 md:px-12 leading-relaxed">
              "{testimonials[testimonialIndex].quote}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                {testimonials[testimonialIndex].name.substring(0,2)}
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">{testimonials[testimonialIndex].name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{testimonials[testimonialIndex].role} • {testimonials[testimonialIndex].city}</div>
                <div className="flex text-yellow-500 mt-1"><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/></div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIndex(i)} className={`h-2 rounded-full transition-all ${i === testimonialIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-700'}`}></button>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BLOG PREVIEW */}
      <section id="blog" className="py-20 px-4 bg-accent dark:bg-darkBgAlt">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Resources & Insights
            <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-darkCard rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-purple-200 dark:bg-purple-900 flex items-center justify-center"><FileText size={48} className="text-primary opacity-50"/></div>
              <div className="p-6">
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">IEP Tips</span>
                <h3 className="text-xl font-bold mb-3">Demystifying the IEP Process for Parents</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">Understanding your child's Individualized Education Program doesn't have to be overwhelming. Here's a step-by-step guide.</p>
                <a href="#" className="font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">Read More <ChevronRight size={16}/></a>
              </div>
            </div>
            
            <div className="bg-white dark:bg-darkCard rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-blue-200 dark:bg-blue-900 flex items-center justify-center"><Brain size={48} className="text-blue-500 opacity-50"/></div>
              <div className="p-6">
                <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Autism</span>
                <h3 className="text-xl font-bold mb-3">Creating a Sensory Diet at Home</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">Practical strategies for occupational therapy at home to help children with autism regulate their sensory needs.</p>
                <a href="#" className="font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">Read More <ChevronRight size={16}/></a>
              </div>
            </div>

            <div className="bg-white dark:bg-darkCard rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-green-200 dark:bg-green-900 flex items-center justify-center"><Activity size={48} className="text-green-500 opacity-50"/></div>
              <div className="p-6">
                <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Early Intervention</span>
                <h3 className="text-xl font-bold mb-3">Why the First 5 Years Matter Most</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">Research shows that early intervention can significantly alter a child's developmental trajectory. Learn the signs.</p>
                <a href="#" className="font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">Read More <ChevronRight size={16}/></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section id="faq" className="py-20 px-4 bg-white dark:bg-darkBg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
            <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} 
                  className="w-full flex justify-between items-center p-5 text-left bg-gray-50 dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-darkBgAlt transition-colors font-bold text-lg"
                >
                  {faq.q}
                  {activeFaq === idx ? <ChevronUp className="text-primary flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
                </button>
                {activeFaq === idx && (
                  <div className="p-5 bg-white dark:bg-darkBg border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 13. FOOTER */}
      <footer className="bg-[#110B24] text-white pt-16 pb-8 px-4 border-t-4 border-primary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <a href="#" className="flex items-center gap-2 mb-6">
              <Brain className="text-primary h-8 w-8" />
              <span className="text-2xl font-bold text-white">SimplyAbled</span>
            </a>
            <p className="text-gray-400 mb-6">
              Empowering Every Child.<br/>Connecting Every Family.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">Fb</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">Ig</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">Tw</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">In</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Services</a></li>
              <li><a href="#booking" className="text-gray-400 hover:text-primary transition-colors">Book Now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">For Professionals</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Join as Expert</a></li>
              <li><a href="#tools" className="text-gray-400 hover:text-primary transition-colors">Educator Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Dashboard Login</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Upload Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 SimplyAbled. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for every child in India & beyond.</p>
        </div>
      </footer>

      {/* TOOL MODAL */}
      {activeTool && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-darkCard w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative animate-slide-up">
            <button onClick={() => setActiveTool(null)} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-darkBg rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors z-10">
              <X size={20} />
            </button>
            <div className="p-8 border-b border-gray-100 dark:border-gray-800 bg-accent/50 dark:bg-darkBgAlt/50">
              <h3 className="text-2xl font-bold text-primary mb-2">
                {activeTool === 'M-CHAT Assessment' ? 'M-CHAT Screening Tool' : `${activeTool} Generator`}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {activeTool === 'M-CHAT Assessment' 
                  ? 'Fill in the child details to begin the AI-guided M-CHAT developmental screening.'
                  : 'Fill in the details below to generate the document using AI without writing prompts.'}
              </p>
            </div>
            <div className={`p-8 ${activeTool === 'M-CHAT Assessment' ? 'max-h-[60vh] overflow-y-auto' : ''} space-y-6`}>
              {activeTool === 'M-CHAT Assessment' ? (
                <div className="space-y-6">
                  {mchatQuestions.map((question, qIdx) => (
                    <div key={qIdx} className="bg-gray-50 dark:bg-darkBg p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="font-semibold mb-3">{question}</p>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => { const newAns = [...mchatAnswers]; newAns[qIdx] = 'Yes'; setMchatAnswers(newAns); }}
                          className={`flex-1 py-2 rounded-lg font-bold border-2 transition-all ${mchatAnswers[qIdx] === 'Yes' ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-500 hover:border-primary'}`}
                        >
                          Yes
                        </button>
                        <button 
                          onClick={() => { const newAns = [...mchatAnswers]; newAns[qIdx] = 'No'; setMchatAnswers(newAns); }}
                          className={`flex-1 py-2 rounded-lg font-bold border-2 transition-all ${mchatAnswers[qIdx] === 'No' ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-500 hover:border-primary'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold">Child Name</label>
                      <input type="text" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Rahul" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold">Age / Grade</label>
                      <select className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-gray-900 dark:text-white">
                        <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value="">Select Age</option>
                        {[3,4,5,6,7,8,9,10,11,12,13,14,15].map(a => <option key={a} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">{a} Years</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Primary Diagnosis / Need</label>
                    <select className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-gray-900 dark:text-white">
                      <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value="">Select Condition</option>
                      <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Autism Spectrum Disorder</option>
                      <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">ADHD</option>
                      <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Down Syndrome</option>
                      <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Learning Disability</option>
                      <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Speech Delay</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Select Focus Areas <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded ml-2">Zero Prompting</span></label>
                    <div className="flex flex-wrap gap-2">
                      {toolGoals.map(goal => (
                        <button 
                          key={goal}
                          onClick={() => toggleGoal(goal)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedGoals.includes(goal) ? 'bg-primary text-white shadow-md scale-105' : 'bg-gray-100 dark:bg-darkBgAlt text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <button 
                onClick={handleGenerate}
                className="w-full bg-primary hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 animate-pulse-glow"
              >
                <Brain size={20} className="animate-bounce" />
                {activeTool === 'M-CHAT Assessment' ? 'Calculate & Generate Report' : `Generate ${activeTool}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-darkCard w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-slide-up">
            <button onClick={() => setShowSignup(false)} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-darkBg rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
              <X size={20} />
            </button>
            <div className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">
                {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Create Account' : 'Reset Password'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center text-sm">
                {authMode === 'login' ? 'Sign in to access your saved documents.' : authMode === 'signup' ? 'Sign up to generate and save documents.' : 'Enter your email to get a reset link.'}
              </p>
              
              {authError && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{authError}</div>}
              {authMsg && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">{authMsg}</div>}

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <>
                    <div>
                      <label className="text-sm font-semibold block mb-1">Full Name</label>
                      <input required value={authName} onChange={e => setAuthName(e.target.value)} type="text" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 outline-none" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold block mb-1">I am a...</label>
                      <select value={authRole} onChange={e => setAuthRole(e.target.value)} className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 outline-none">
                        <option value="Parent">Parent</option>
                        <option value="Professional">Professional</option>
                      </select>
                    </div>
                  </>
                )}
                <div>
                  <label className="text-sm font-semibold block mb-1">Email Address</label>
                  <input required value={authEmail} onChange={e => setAuthEmail(e.target.value)} type="email" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 outline-none" placeholder="your@email.com" />
                </div>
                {authMode !== 'reset' && (
                  <div>
                    <label className="text-sm font-semibold block mb-1">Password</label>
                    <input required value={authPassword} onChange={e => setAuthPassword(e.target.value)} type="password" minLength="6" className="w-full bg-gray-50 dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 outline-none" placeholder="Min 6 characters" />
                  </div>
                )}
                
                <button disabled={authLoading} type="submit" className="w-full bg-primary hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-lg transition-all mt-2 btn-animated">
                  {authLoading ? 'Processing...' : authMode === 'login' ? 'Log In' : authMode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
                </button>
              </form>

              {authMode !== 'reset' && (
                <>
                  <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
                    <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  
                  <button 
                    onClick={handleGoogleSignIn}
                    disabled={authLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-darkBg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white font-bold py-3 rounded-xl transition-all shadow-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>
                </>
              )}

              <div className="mt-6 text-center text-sm space-y-2">
                {authMode === 'login' ? (
                  <>
                    <p><button onClick={() => setAuthMode('reset')} className="text-primary hover:underline">Forgot password?</button></p>
                    <p>Don't have an account? <button onClick={() => setAuthMode('signup')} className="text-primary font-bold hover:underline">Sign up</button></p>
                  </>
                ) : authMode === 'signup' ? (
                  <p>Already have an account? <button onClick={() => setAuthMode('login')} className="text-primary font-bold hover:underline">Log in</button></p>
                ) : (
                  <p>Remember your password? <button onClick={() => setAuthMode('login')} className="text-primary font-bold hover:underline">Log in</button></p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GENERATED DOCUMENT VIEWER */}
      {generatedDocument && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-darkCard w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col relative animate-slide-up">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-darkBgAlt rounded-t-3xl">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2"><CheckCircle /> Document Ready</h3>
              <button onClick={() => setGeneratedDocument(null)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-8 bg-gray-100 dark:bg-[#0A0514]">
              {/* This is the printable area */}
              <div id="printable-document" className="bg-white text-black p-10 shadow-lg min-h-full max-w-3xl mx-auto border border-gray-200" dangerouslySetInnerHTML={{ __html: generatedDocument.content }}></div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 justify-end bg-gray-50 dark:bg-darkBgAlt rounded-b-3xl">
              <button onClick={() => {
                const blob = new Blob(['\\ufeff', generatedDocument.content], { type: 'application/msword' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url; a.download = `${generatedDocument.title}.doc`; a.click();
                URL.revokeObjectURL(url);
              }} className="px-6 py-3 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-bold rounded-xl btn-animated shadow-lg transition-all">
                Download .DOC
              </button>
              <button onClick={() => window.print()} className="px-6 py-3 bg-primary hover:bg-purple-700 text-white font-bold rounded-xl btn-animated shadow-lg">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
