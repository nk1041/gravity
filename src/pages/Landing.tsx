import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, FileText, Target, Users, Shield, CheckCircle2, ChevronDown, ArrowRight, HeartPulse, Sparkles } from 'lucide-react';

const Landing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="landing-page" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-main)', background: '#FAFAFA' }}>
      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)', zIndex: 1000 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'white' }}>
              <BrainCircuit size={24} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>SimplyAbled</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>Features</a>
            <a href="#how-it-works" style={{ color: 'inherit', textDecoration: 'none' }}>How It Works</a>
            <a href="#for-parents" style={{ color: 'inherit', textDecoration: 'none' }}>For Parents</a>
            <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/login" style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>Log In</Link>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#F0FDF4', color: '#166534', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem' }}>
          <Sparkles size={16} /> AI-Powered Documentation for Special Ed
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Spend time with students, <span style={{ color: 'var(--primary)' }}>not paperwork.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          SimplyAbled is the all-in-one digital workspace that turns your quick form inputs into professional IEPs, lesson plans, and session notes instantly.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Start Free Trial <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </Link>
          <a href="#how-it-works" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.125rem', background: 'white' }}>
            See How It Works
          </a>
        </div>
      </section>

      {/* Problem Statement */}
      <section style={{ background: 'white', padding: '5rem 2rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>The scattered record nightmare ends here.</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 3rem' }}>
            Special educators and therapists spend up to 40% of their week writing reports, hunting down past IEPs, and manually tracking goals across endless spreadsheets and physical binders. 
          </p>
          <div className="grid grid-cols-3" style={{ gap: '2rem', textAlign: 'left' }}>
            <div style={{ background: '#FEF2F2', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: '#991B1B', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.125rem' }}>Hours Lost to Typing</div>
              <p style={{ color: '#7F1D1D', fontSize: '0.875rem' }}>Writing session notes and formatting IEPs manually drains energy that belongs to your students.</p>
            </div>
            <div style={{ background: '#FFFBEB', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: '#92400E', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.125rem' }}>Fragmented Histories</div>
              <p style={{ color: '#78350F', fontSize: '0.875rem' }}>When a child changes therapists or schools, crucial historical context is often lost in transition.</p>
            </div>
            <div style={{ background: '#EFF6FF', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: '#1E40AF', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.125rem' }}>Disconnected Parents</div>
              <p style={{ color: '#1E3A8A', fontSize: '0.875rem' }}>Parents feel out of the loop, relying on infrequent meetings rather than continuous visibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>How SimplyAbled Works</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>From observation to professional document in three simple steps.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ background: 'var(--primary-light)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>1</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Fill simple, guided forms</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>No staring at a blank page. Just fill out structured dropdowns, checkboxes, and quick bullet points about the student's session or goals.</p>
              </div>
              <div style={{ flex: 1, background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
                <div style={{ background: 'var(--surface-hover)', height: '12px', width: '30%', borderRadius: '4px', marginBottom: '1rem' }}></div>
                <div style={{ background: 'var(--surface-hover)', height: '40px', width: '100%', borderRadius: '4px', marginBottom: '1rem' }}></div>
                <div style={{ background: 'var(--surface-hover)', height: '80px', width: '100%', borderRadius: '4px' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexDirection: 'row-reverse' }}>
              <div style={{ flex: 1 }}>
                <div style={{ background: 'var(--primary-light)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>2</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>AI Generates the Document</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>Our specialized AI takes your inputs and instantly formats them into clinical, professional, and compliant documentation—no prompt engineering required.</p>
              </div>
              <div style={{ flex: 1, background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid var(--border)', position: 'relative' }}>
                <BrainCircuit size={48} color="var(--primary)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1 }} />
                <div style={{ background: 'var(--border)', height: '12px', width: '100%', borderRadius: '4px', marginBottom: '0.75rem' }}></div>
                <div style={{ background: 'var(--border)', height: '12px', width: '90%', borderRadius: '4px', marginBottom: '0.75rem' }}></div>
                <div style={{ background: 'var(--border)', height: '12px', width: '95%', borderRadius: '4px', marginBottom: '0.75rem' }}></div>
                <div style={{ background: 'var(--border)', height: '12px', width: '60%', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ background: 'var(--primary-light)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>3</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Track Progress & Share</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>Saved documents automatically update the student's historical timeline. Parents get simplified, read-only updates in their secure portal.</p>
              </div>
              <div style={{ flex: 1, background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ background: 'var(--surface-hover)', height: '12px', width: '40%', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                    <div style={{ background: 'var(--surface-hover)', height: '8px', width: '100%', borderRadius: '999px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ background: 'white', padding: '5rem 2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Everything you need in one place</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>Replace five different tools with one seamless ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            {[
              { icon: <Users size={24} />, title: "Student Profiles", desc: "A centralized digital record for demographics, diagnoses, and active services." },
              { icon: <FileText size={24} />, title: "Assessments", desc: "Structured forms that generate comprehensive, formal assessment reports." },
              { icon: <BrainCircuit size={24} />, title: "IEP Builder", desc: "Draft Individualized Education Plans quickly with AI-assisted goal structuring." },
              { icon: <FileText size={24} />, title: "Lesson Plans", desc: "Generate standards-aligned lesson plans tailored to specific student goals." },
              { icon: <CheckCircle2 size={24} />, title: "Session Notes", desc: "Log daily activities and behaviors; let AI expand them into clinical notes." },
              { icon: <Target size={24} />, title: "Goals Tracking", desc: "Set measurable objectives and visually track progress status over time." },
              { icon: <FileText size={24} />, title: "Progress Reports", desc: "Auto-generate parent-friendly summaries from aggregated session data." },
              { icon: <HeartPulse size={24} />, title: "Parent Portal", desc: "Secure read-only dashboard for parents to view goals and home activities." },
              { icon: <Shield size={24} />, title: "Continuity of Care", desc: "Permanent student history that persists even when assigned to new educators." }
            ].map((f, i) => (
              <div key={i} style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: '#FAFAFA' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Parents */}
      <section id="for-parents" style={{ padding: '5rem 2rem', background: 'var(--primary)', color: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <HeartPulse size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Keep Parents in the Loop</h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
            The SimplyAbled Parent Portal gives families a secure, read-only view of their child's goals, progress, and educator updates. No more forgotten emails or lost paper reports. Parents can even view tailored home activities to support their child's development outside of school.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left', minWidth: '200px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Live Goals</div>
              <div style={{ opacity: 0.8, fontSize: '0.875rem' }}>Parents see real-time progress status.</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
            <div style={{ textAlign: 'left', minWidth: '200px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Home Activities</div>
              <div style={{ opacity: 0.8, fontSize: '0.875rem' }}>Actionable exercises tied to IEPs.</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
            <div style={{ textAlign: 'left', minWidth: '200px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Clinical Translations</div>
              <div style={{ opacity: 0.8, fontSize: '0.875rem' }}>AI translates notes to plain language.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Educators, Not Engineers */}
      <section style={{ padding: '5rem 2rem', background: '#FAFAFA' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Built for Educators, Not Prompt Engineers</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            You shouldn't have to learn how to "talk to AI" to get good results. With SimplyAbled, the AI is completely invisible. You just fill out standard forms, dropdowns, and checkboxes—exactly like you're used to—and our system handles the complex AI prompting in the background to generate perfect documents.
          </p>
        </div>
      </section>

      {/* Security & Trust */}
      <section style={{ padding: '5rem 2rem', background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Enterprise-Grade Security</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Student data privacy is our absolute priority. We employ industry-standard encryption, strict role-based access controls, and secure data isolation to ensure confidentiality is maintained at all times.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><CheckCircle2 size={20} color="#059669" /> End-to-end data encryption</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><CheckCircle2 size={20} color="#059669" /> Strict Role-Based Access Control (RBAC)</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}><CheckCircle2 size={20} color="#059669" /> Data deletion and retention policies</li>
            </ul>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Shield size={160} color="var(--primary)" style={{ opacity: 0.1 }} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>Trusted by Special Educators</h2>
          <div className="grid grid-cols-2" style={{ gap: '2rem', textAlign: 'left' }}>
            <div className="card">
              <div style={{ display: 'flex', gap: '0.5rem', color: '#F59E0B', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                "This platform gave me back 10 hours a week. I just check a few boxes after a session, and by the end of the month, the progress report practically writes itself."
              </p>
              <div style={{ fontWeight: 600 }}>Sarah J.</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Occupational Therapist</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', gap: '0.5rem', color: '#F59E0B', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                "As a parent, I finally feel connected to my son's IEP goals. The portal is so easy to read, and I know exactly what we need to practice at home."
              </p>
              <div style={{ fontWeight: 600 }}>Michael T.</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Parent of a 7-year-old</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '5rem 2rem', background: 'white', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Simple, Transparent Pricing</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>Start for free, upgrade when you need to.</p>
          
          <div className="grid grid-cols-3" style={{ gap: '2rem', textAlign: 'left' }}>
            <div className="card" style={{ border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Individual Educator</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>$29<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Perfect for independent therapists.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} color="var(--primary)" /> Up to 30 Students</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} color="var(--primary)" /> Unlimited AI Documents</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} color="var(--primary)" /> Parent Portal Access</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Started</button>
            </div>
            
            <div className="card" style={{ border: '2px solid var(--primary)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>POPULAR</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>School / Clinic</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>$99<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>For small teams and clinics.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} color="var(--primary)" /> Up to 5 Educators</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} color="var(--primary)" /> Unlimited Students</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} color="var(--primary)" /> Shared Student Records</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start Free Trial</button>
            </div>

            <div className="card" style={{ border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Enterprise</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Custom</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>For large districts and networks.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} color="var(--primary)" /> Advanced Administration</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} color="var(--primary)" /> Priority Support</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} color="var(--primary)" /> Custom Integrations</li>
              </ul>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '5rem 2rem', background: '#FAFAFA' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: "Is the data secure?", a: "Yes, we use industry-standard encryption to protect all student records and comply with data privacy best practices." },
              { q: "Do I need to know how to use AI?", a: "Not at all. You just fill out simple forms with checkboxes and dropdowns, and our system handles all the AI generation in the background." },
              { q: "Can parents edit the documents?", a: "No. The parent portal is strictly read-only. Parents can view finalized goals, progress reports, and home activities, but they cannot edit clinical documentation." },
              { q: "What happens if a student changes therapists?", a: "SimplyAbled maintains a permanent historical record for each student. If a student is reassigned, the new educator instantly has access to all past IEPs and session notes." },
              { q: "Can I edit the AI-generated documents?", a: "Absolutely. All AI generations are initially saved as 'Drafts'. You have full control to edit and refine the text before saving it as a final document." },
              { q: "Is this a marketplace for finding therapists?", a: "No. SimplyAbled is purely a workflow and documentation tool for educators and a collaboration portal for the parents of their existing students." }
            ].map((faq, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => toggleFaq(i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600 }}>
                  {faq.q}
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </div>
                {openFaq === i && <div style={{ marginTop: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '6rem 2rem', background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Ready to simplify your documentation?</h2>
        <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem' }}>Join thousands of special educators who have eliminated paperwork stress.</p>
        <Link to="/login" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111827', color: 'white', padding: '4rem 2rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-4" style={{ gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <BrainCircuit size={24} color="var(--primary-light)" />
                <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>SimplyAbled</span>
              </div>
              <p style={{ opacity: 0.7, fontSize: '0.875rem', lineHeight: 1.6 }}>Digital documentation and student management for the modern special educator.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.7, fontSize: '0.875rem' }}>
                <li>Features</li>
                <li>Pricing</li>
                <li>For Educators</li>
                <li>For Parents</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.7, fontSize: '0.875rem' }}>
                <li>About Us</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.7, fontSize: '0.875rem' }}>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.875rem' }}>
            <div>&copy; 2026 SimplyAbled Inc. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span>Twitter</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
