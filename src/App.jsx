import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Sparkles, FileText, Brain, BookOpen, Users, LayoutDashboard, Target, Calendar, ClipboardList, CheckCircle2, Loader2, LineChart, Download, Plus, Lock, Sun, Moon, ArrowRight, Save, Edit3, MessageSquare, Send } from 'lucide-react';
import { supabase } from './supabaseClient';

// --- Theme Context / Toggle ---
const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return { theme, toggleTheme };
};

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button onClick={toggleTheme} className="btn-icon" aria-label="Toggle Theme">
    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);

// --- Auth Component ---
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault(); setLoading(true); setMessage(null);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error; navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error; setMessage("Success! Check your email to verify your account.");
      }
    } catch (error) { setMessage(error.message); } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="navbar"><div className="nav-container"><Link to="/" className="logo"><Sparkles size={24} /> SimplyAbled</Link></div></nav>
      <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2.5rem', background: 'var(--surface-opaque)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        {message && <div style={{ padding: '1rem', background: 'var(--primary-light)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>{message}</div>}
        <form onSubmit={handleAuth}>
          <div className="form-group"><label className="form-label">Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="ai-input" required /></div>
          <div className="form-group"><label className="form-label">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="ai-input" required /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>{loading ? <Loader2 className="spin" size={18} /> : (isLogin ? 'Log In' : 'Sign Up')}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Log In'}</span>
        </p>
      </div>
    </div>
  );
};

// --- Dashboard ---
const Dashboard = ({ session }) => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [showChildModal, setShowChildModal] = useState(false);
  const [newChild, setNewChild] = useState({ name: '', age: '', diagnosis: '', strengths: '', needs: '' });

  useEffect(() => {
    if (session) {
      supabase.from('children').select('*').eq('user_id', session.user.id).then(({data}) => setChildren(data || []));
      supabase.from('documents').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false }).then(({data}) => setDocuments(data || []));
    }
  }, [session]);

  const handleAddChild = async (e) => {
    e.preventDefault();
    const { data } = await supabase.from('children').insert([{ ...newChild, user_id: session.user.id }]).select();
    if (data) setChildren([...children, data[0]]);
    setShowChildModal(false);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo"><Sparkles size={24} /> SimplyAbled</Link>
          <div className="nav-actions"><button onClick={() => supabase.auth.signOut()} className="btn btn-outline">Log Out</button></div>
        </div>
      </nav>
      
      <div className="section-padding" style={{ paddingTop: '3rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Professional Workspace</h1>
        
        {/* Child Management */}
        <div className="tool-workspace" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>My Caseload</h2>
            <button className="btn btn-primary" onClick={() => setShowChildModal(true)}><Plus size={18} /> Add Child</button>
          </div>
          {children.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No child profiles created yet.</p> : (
            <div style={{ overflowX: 'auto' }}><table className="data-table">
              <thead><tr><th>Name</th><th>Age</th><th>Diagnosis</th><th>Action</th></tr></thead>
              <tbody>{children.map(c => <tr key={c.id}><td><strong>{c.name}</strong></td><td>{c.age}</td><td>{c.diagnosis}</td><td><button className="btn btn-outline" style={{ padding: '0.2rem 0.8rem', fontSize: '0.8rem' }}>View</button></td></tr>)}</tbody>
            </table></div>
          )}
        </div>

        {/* Expanded AI Tools Grid */}
        <h2 style={{ marginBottom: '1.5rem' }}>AI Toolkits (Zero Prompts)</h2>
        <div className="tools-grid" style={{ marginBottom: '3rem' }}>
          <div className="tool-card" onClick={() => navigate('/tools/iep')}><div className="tool-icon"><FileText size={28} /></div><h3>IEP & Goal Generator</h3><p>Draft robust educational plans and IEP goals instantly.</p></div>
          <div className="tool-card" onClick={() => navigate('/tools/lesson')}><div className="tool-icon"><BookOpen size={28} /></div><h3>Lesson Planner</h3><p>Generate highly engaging, adaptive therapy activities.</p></div>
          <div className="tool-card" onClick={() => navigate('/tools/notes')}><div className="tool-icon"><ClipboardList size={28} /></div><h3>Session Notes</h3><p>Automatically summarize daily therapy or teaching sessions.</p></div>
          <div className="tool-card" onClick={() => navigate('/tools/mchat')}><div className="tool-icon"><Brain size={28} /></div><h3>M-CHAT Assessment</h3><p>Run guided screenings and generate home programs.</p></div>
        </div>

        {/* Recent Documents */}
        <div className="tool-workspace">
          <h2 style={{ marginBottom: '1.5rem' }}>Saved Documents</h2>
          {documents.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No documents saved yet.</p> : (
            <div style={{ overflowX: 'auto' }}><table className="data-table">
              <thead><tr><th>Title</th><th>Type</th><th>Date</th><th>Action</th></tr></thead>
              <tbody>{documents.map(d => <tr key={d.id}><td>{d.title}</td><td><span className="hero-badge" style={{marginBottom: 0, padding: '0.2rem 0.5rem'}}>{d.type}</span></td><td>{new Date(d.created_at).toLocaleDateString()}</td><td><button className="btn btn-outline" onClick={() => window.print()} style={{ padding: '0.2rem 0.8rem', fontSize: '0.8rem' }}><Download size={14} /> PDF</button></td></tr>)}</tbody>
            </table></div>
          )}
        </div>
      </div>

      {showChildModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="tool-workspace animate-up" style={{ width: '90%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Create Child Profile</h2>
            <form onSubmit={handleAddChild}>
              <div className="form-group"><label className="form-label">First Name</label><input type="text" className="ai-input" required onChange={e=>setNewChild({...newChild, name: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Age</label><input type="number" className="ai-input" required onChange={e=>setNewChild({...newChild, age: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Primary Diagnosis</label><input type="text" className="ai-input" required onChange={e=>setNewChild({...newChild, diagnosis: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Strengths</label><input type="text" className="ai-input" onChange={e=>setNewChild({...newChild, strengths: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Areas of Need</label><input type="text" className="ai-input" onChange={e=>setNewChild({...newChild, needs: e.target.value})} /></div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}><button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Profile</button><button type="button" className="btn btn-outline" onClick={() => setShowChildModal(false)} style={{ flex: 1 }}>Cancel</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Reusable Generic Generator Tool (Handles Frictionless Paywall & Editing) ---
const GenericGeneratorTool = ({ session, title, description, icon: Icon, toolType, generateMockContent }) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [editableResult, setEditableResult] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  
  const [selectedChildId, setSelectedChildId] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualAge, setManualAge] = useState('');
  const [manualDiag, setManualDiag] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    if (session) supabase.from('children').select('*').eq('user_id', session.user.id).then(({data}) => setChildren(data || []));
  }, [session]);

  const handleGenerate = (e) => {
    e.preventDefault();
    setLoading(true); setSaved(false);
    setTimeout(async () => {
      let childData = { name: manualName || "Student", age: manualAge || "N/A", diagnosis: manualDiag || "N/A" };
      if (session && selectedChildId) {
        const c = children.find(x => x.id === selectedChildId);
        if (c) childData = c;
      }

      const generatedText = generateMockContent(childData, topic);
      setResult(generatedText);
      setEditableResult(generatedText);
      
      if (session && selectedChildId) {
        await supabase.from('documents').insert([{
          user_id: session.user.id, child_id: selectedChildId, title: `${childData.name} - ${toolType}`, type: toolType, content: generatedText
        }]);
        setSaved(true);
      }
      setLoading(false);
    }, 2500);
  };

  const handleManualSave = async () => {
    if (!session || !selectedChildId) return;
    setLoading(true);
    await supabase.from('documents').insert([{
      user_id: session.user.id, child_id: selectedChildId, title: `Updated - ${toolType}`, type: toolType, content: editableResult
    }]);
    setSaved(true);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="navbar"><div className="nav-container"><Link to="/" className="logo"><Sparkles size={24} /> SimplyAbled</Link><div className="nav-actions">{session ? <Link to="/dashboard" className="btn btn-outline">Dashboard</Link> : <Link to="/auth" className="btn btn-outline">Log In</Link>}</div></div></nav>
      <main className="tool-content">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}><div className="tool-icon" style={{ margin: '0 auto 1rem', width: '64px', height: '64px', background: 'var(--primary-color)', color: 'white' }}><Icon size={32} /></div><h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>{title}</h1><p style={{ color: 'var(--text-muted)' }}>{description}</p></div>
        
        <div className="tool-workspace">
          {!result ? (
            <form onSubmit={handleGenerate}>
              {session ? (
                <div className="form-group">
                  <label className="form-label">Select Student Profile (From Caseload)</label>
                  <select className="ai-input" required value={selectedChildId} onChange={e=>setSelectedChildId(e.target.value)}>
                    <option value="">-- Select a saved child --</option>
                    {children.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              ) : (
                <>
                  <div className="form-group" style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}><Sparkles size={16} style={{display:'inline', marginRight: '5px', verticalAlign: 'middle'}}/><strong>Try it for free!</strong> Fill in basic details to test the AI. (Log in to save profiles)</div>
                  <div className="form-group"><label className="form-label">Student First Name</label><input type="text" className="ai-input" required value={manualName} onChange={e=>setManualName(e.target.value)} /></div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="form-group" style={{ flex: 1 }}><label className="form-label">Age</label><input type="number" className="ai-input" required value={manualAge} onChange={e=>setManualAge(e.target.value)} /></div>
                    <div className="form-group" style={{ flex: 2 }}><label className="form-label">Primary Diagnosis</label><input type="text" className="ai-input" required value={manualDiag} onChange={e=>setManualDiag(e.target.value)} /></div>
                  </div>
                </>
              )}
              <div className="form-group"><label className="form-label">{toolType === 'Session Note' ? 'Session Focus / Activities Completed' : 'Primary Focus Area / Topic'}</label><input type="text" className="ai-input" required value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. Fine motor skills, Reading comprehension..." /></div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }} disabled={loading}>{loading ? <><Loader2 className="spin" /> Generating Form-Based AI...</> : <><Sparkles /> Generate Document</>}</button>
            </form>
          ) : (
            <div className="animate-up">
              {session ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: saved ? 'var(--secondary-color)' : 'var(--text-muted)', fontWeight: 600 }}>{saved ? <CheckCircle2 /> : <Edit3 />} {saved ? 'Saved to Dashboard' : 'Editing Mode'}</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline" onClick={handleManualSave} disabled={loading} style={{ padding: '0.4rem 1rem' }}><Save size={16} /> Save Edits</button>
                      <button className="btn btn-primary" onClick={() => window.print()} style={{ padding: '0.4rem 1rem' }}><Download size={16} /> Export PDF</button>
                    </div>
                  </div>
                  <textarea className="ai-input" style={{ minHeight: '400px', resize: 'vertical', lineHeight: '1.6' }} value={editableResult} onChange={(e) => { setEditableResult(e.target.value); setSaved(false); }} />
                  <button onClick={() => { setResult(null); setTopic(''); }} className="btn btn-outline" style={{ marginTop: '1.5rem', width: '100%' }}>Create Another (No Prompts!)</button>
                </>
              ) : (
                <div className="preview-container">
                  <div className="preview-content">
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Draft Document: {toolType}</div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{result.substring(0, 200)}... [Content continues detailing specific goals, strategies, and individualized metrics based on your form input]...</div>
                  </div>
                  <div className="preview-overlay">
                    <Lock size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Your AI Document is Ready!</h2>
                    <p style={{ color: 'var(--text-main)', marginBottom: '1.5rem', maxWidth: '400px' }}>Sign up or log in to view the full generated document, edit the text, save it to a child's secure profile, and export it as a PDF.</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Link to="/auth" className="btn btn-primary">Sign Up for Free</Link>
                      <button onClick={() => setResult(null)} className="btn btn-outline">Back to Form Editor</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const IEP_Generator_Logic = (child, topic) => `Individualized Education Program Draft\n\nStudent: ${child.name} (Age ${child.age})\nDiagnosis: ${child.diagnosis}\nFocus Area: ${topic}\n\nAnnual Goal (AI Generated):\nBy the end of the term, ${child.name} will improve relevant functional skills related to ${topic} by demonstrating target behaviors with 80% accuracy in 4 out of 5 observed trials across 3 consecutive weeks.\n\nIntervention Strategies:\n- Provide clear, visual schedules.\n- Break complex tasks into smaller, manageable steps.\n- Offer sensory breaks as needed.\n\nRecommended Home Program:\n- Practice functional communication during meal times.\n- 15 minutes of structured play focusing on joint attention.`;
const Lesson_Planner_Logic = (child, topic) => `Adaptive Lesson Plan / Therapy Activity\n\nTarget Demographic: Age ${child.age} with ${child.diagnosis}\nSubject / Focus: ${topic}\n\nObjective:\nThe student will actively participate in the ${topic} activity and demonstrate comprehension of the core concepts.\n\nMaterials Needed:\n- Visual timer\n- Manipulatives relevant to ${topic}\n- Choice board\n\nStep-by-Step Instructions:\n1. Introduction (5 mins): Introduce the topic using high-interest visuals.\n2. Guided Practice (10 mins): Model the activity. Allow ${child.name} to attempt with hand-over-hand prompting if necessary.\n3. Independent Practice (10 mins): Fade prompts. Provide immediate positive reinforcement.\n\nAccommodations & Modifications:\n- Allow extra time for processing.\n- Reduce auditory distractions in the environment.`;
const Session_Notes_Logic = (child, topic) => `SOAP Session Note\n\nStudent: ${child.name} (Age ${child.age})\nDiagnosis: ${child.diagnosis}\nDate: ${new Date().toLocaleDateString()}\n\nSubjective:\n${child.name} transitioned to the session smoothly today. Reported feeling "good".\n\nObjective:\nEngaged in activities focusing on: ${topic}. Completed 3 trials of the primary task with moderate verbal prompting.\n\nAssessment:\n${child.name} demonstrated a 15% increase in on-task behavior compared to the previous session. Response to visual cues was highly effective.\n\nPlan:\nContinue current plan of care. Introduce fading of verbal prompts next session to encourage independence.`;

// --- Landing Page ---
const LandingPage = ({ session, themeProps }) => {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('newsletter_subscribers').insert([{ email: newsletterEmail }]);
    if (error) setNewsletterStatus('You are already subscribed!');
    else { setNewsletterStatus('Subscribed successfully!'); setNewsletterEmail(''); }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo"><Sparkles size={28} /> SimplyAbled</div>
          <div className="nav-actions">
            <ThemeToggle {...themeProps} />
            <a href="#features" className="btn btn-outline" style={{ border: 'none' }}>Features</a>
            <a href="#workflow" className="btn btn-outline" style={{ border: 'none' }}>Workflow</a>
            {session ? <Link to="/dashboard" className="btn btn-primary">Dashboard</Link> : <Link to="/auth" className="btn btn-primary">Sign up free</Link>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-badge">✨ The All-in-One AI Workspace for Special Education</div>
        <h1 className="hero-title">Reduce Paperwork. <br/><span>Amplify Your Impact.</span></h1>
        <p className="hero-subtitle">Create IEPs, lesson plans, goals, home programs, and progress reports from a single child profile powered by AI — <strong>no prompting required.</strong></p>
        <div className="hero-actions">
          <Link to="/auth" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Start Free Trial</Link>
          <a href="#features" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Explore Tools <ArrowRight size={18} /></a>
        </div>
      </header>

      {/* Benefits / High Level */}
      <section className="section-padding" style={{ background: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-header">
          <h2>Why SimplyAbled?</h2>
          <p style={{ color: 'var(--text-muted)' }}>We removed the learning curve. You never need to write an AI prompt.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className="tool-icon" style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}><Users color="var(--primary-color)" size={28} /></div>
            <div><h3 style={{ marginBottom: '0.5rem' }}>Single Child Profile</h3><p style={{ color: 'var(--text-muted)' }}>Enter a student's data once. SimplyAbled uses it to generate personalized plans across all our tools.</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className="tool-icon" style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}><CheckCircle2 color="var(--primary-color)" size={28} /></div>
            <div><h3 style={{ marginBottom: '0.5rem' }}>Zero Prompting</h3><p style={{ color: 'var(--text-muted)' }}>Simply fill out checkboxes and dropdowns. Our guided forms replace complex prompt engineering.</p></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className="tool-icon" style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}><Target color="var(--primary-color)" size={28} /></div>
            <div><h3 style={{ marginBottom: '0.5rem' }}>Data-Driven Goals</h3><p style={{ color: 'var(--text-muted)' }}>Generate SMART goals and automatically track progress using our integrated dashboard.</p></div>
          </div>
        </div>
      </section>

      {/* Frictionless Tools / Features */}
      <section id="features" className="section-padding">
        <div className="section-header"><h2>Frictionless AI Tools</h2><p style={{ color: 'var(--text-muted)' }}>No account required to test the magic. Select a tool and see for yourself.</p></div>
        <div className="tools-grid">
          <div className="tool-card" onClick={() => navigate('/tools/iep')}><div className="tool-icon"><FileText size={28} /></div><h3>IEP & Goal Generator</h3><p>Instantly draft educational plans by filling out a simple form. No prompts needed.</p></div>
          <div className="tool-card" onClick={() => navigate('/tools/lesson')}><div className="tool-icon"><BookOpen size={28} /></div><h3>Lesson Planner</h3><p>Generate highly engaging, adaptive therapy and classroom activities.</p></div>
          <div className="tool-card" onClick={() => navigate('/tools/notes')}><div className="tool-icon"><ClipboardList size={28} /></div><h3>Session Notes Builder</h3><p>Turn quick bullet points into professional, compliant SOAP notes instantly.</p></div>
        </div>
      </section>

      {/* Workflow Explanation */}
      <section id="workflow" className="section-padding" style={{ background: 'var(--surface-opaque)' }}>
        <div className="section-header"><h2>How SimplyAbled Works</h2><p style={{ color: 'var(--text-muted)' }}>A seamless workflow designed specifically for educators and therapists.</p></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-light)' }}>1</div>
            <div><h3>Create a Secure Profile</h3><p style={{ color: 'var(--text-muted)' }}>Add your student's age, diagnosis, strengths, and needs into our HIPAA-compliant database just once.</p></div>
          </div>
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-light)' }}>2</div>
            <div><h3>Select a Guided Tool</h3><p style={{ color: 'var(--text-muted)' }}>Choose the IEP generator, Lesson Planner, or Assessment form. Select the student from a dropdown and hit generate.</p></div>
          </div>
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-light)' }}>3</div>
            <div><h3>Edit, Save, & Export</h3><p style={{ color: 'var(--text-muted)' }}>The AI produces a beautiful draft. Edit it directly in the app, save it to the dashboard, or export it to PDF instantly.</p></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="section-header"><h2>Loved by Special Educators</h2></div>
        <div className="tools-grid">
          <div className="tool-card" style={{ cursor: 'default', transform: 'none' }}>
            <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>★★★★★</div>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-main)' }}>"SimplyAbled gives me back my weekends. The fact that I don't have to think of AI prompts—I just click checkboxes and it writes my IEP drafts—is incredible."</p>
            <h4 style={{ color: 'var(--text-muted)' }}>— Priya Sharma, Special Educator</h4>
          </div>
          <div className="tool-card" style={{ cursor: 'default', transform: 'none' }}>
            <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>★★★★★</div>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-main)' }}>"I love the single child profile feature. I input my client's diagnosis once, and every session note and home program I generate is automatically tailored to them."</p>
            <h4 style={{ color: 'var(--text-muted)' }}>— Rahul Patel, Occupational Therapist</h4>
          </div>
          <div className="tool-card" style={{ cursor: 'default', transform: 'none' }}>
            <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>★★★★★</div>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-main)' }}>"The frictionless preview hooked me immediately. I generated a lesson plan in 10 seconds, and it was better than what I used to spend an hour making."</p>
            <h4 style={{ color: 'var(--text-muted)' }}>— Anjali Desai, Speech Therapist</h4>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding" style={{ background: 'var(--surface-opaque)', borderTop: '1px solid var(--border-color)' }}>
        <div className="section-header"><h2>Frequently Asked Questions</h2></div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Do I need to know how to write AI prompts?</h3>
            <p style={{ color: 'var(--text-muted)' }}>Absolutely not! Our platform is 100% form-based. You select dropdowns and checkboxes, and our custom backend handles all the complex AI prompting for you.</p>
          </div>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Is my student data secure?</h3>
            <p style={{ color: 'var(--text-muted)' }}>Yes. We utilize enterprise-grade security and authentication via Supabase. All child profiles and generated documents are protected by strict row-level security.</p>
          </div>
          <div style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Can I edit the generated documents?</h3>
            <p style={{ color: 'var(--text-muted)' }}>Yes. Once the AI generates an IEP, Session Note, or Lesson Plan, it is loaded into a text editor where you can easily modify the text, save it, and download it as a PDF.</p>
          </div>
        </div>
      </section>

      {/* Newsletter & Final CTA */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--surface-opaque), var(--surface-color))', border: '1px solid var(--primary-color)', borderRadius: 'var(--radius-lg)', padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', boxShadow: '0 0 30px var(--primary-glow)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Join the AI Revolution in Special Education</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Create your free account today and start saving hours every week.</p>
          <Link to="/auth" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', marginBottom: '3rem' }}>Sign Up For Free</Link>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem', maxWidth: '500px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}><MessageSquare size={18} style={{ display: 'inline', marginRight: '5px' }}/> Subscribe to our Newsletter</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Get special education resources, teaching tips, and AI updates directly in your inbox.</p>
            <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="email" placeholder="Enter your email" className="ai-input" required value={newsletterEmail} onChange={e=>setNewsletterEmail(e.target.value)} style={{ flex: 1 }} />
              <button type="submit" className="btn btn-outline"><Send size={18}/></button>
            </form>
            {newsletterStatus && <p style={{ marginTop: '1rem', color: 'var(--primary-color)', fontSize: '0.9rem' }}>{newsletterStatus}</p>}
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>&copy; 2026 SimplyAbled. Built for Special Education Professionals.</p>
      </footer>
    </div>
  );
};

// --- App Router ---
function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const themeProps = useTheme();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="spin" size={48} color="var(--primary-color)" /></div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage session={session} themeProps={themeProps} />} />
        <Route path="/auth" element={session ? <Navigate to="/dashboard" /> : <AuthPage />} />
        <Route path="/dashboard" element={session ? <Dashboard session={session} /> : <Navigate to="/auth" />} />
        
        {/* Expanded Frictionless AI Tools */}
        <Route path="/tools/iep" element={<GenericGeneratorTool session={session} title="IEP Generator" description="Generate customized educational plans instantly. No prompts required." icon={FileText} toolType="IEP" generateMockContent={IEP_Generator_Logic} />} />
        <Route path="/tools/lesson" element={<GenericGeneratorTool session={session} title="Adaptive Lesson Planner" description="Create specialized activities for any demographic." icon={BookOpen} toolType="Lesson Plan" generateMockContent={Lesson_Planner_Logic} />} />
        <Route path="/tools/notes" element={<GenericGeneratorTool session={session} title="Session Notes Builder" description="Convert brief observations into compliant SOAP notes." icon={ClipboardList} toolType="Session Note" generateMockContent={Session_Notes_Logic} />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
