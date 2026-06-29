import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { BrainCircuit } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'educator' | 'parent'>('educator');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        if (data.user) {
          // create profile
          const { error: profileError } = await supabase.from('profiles').insert([
            { id: data.user.id, full_name: name, role: role }
          ]);
          if (profileError) throw profileError;
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-hover)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'white' }}>
            <BrainCircuit size={32} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>SimplyAbled</h1>
        </div>
        
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 600 }}>
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name</label>
                <input type="text" required className="form-input" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">I am a...</label>
                <select className="form-select" value={role} onChange={e => setRole(e.target.value as any)}>
                  <option value="educator">Special Educator / Therapist</option>
                  <option value="parent">Parent / Guardian</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email</label>
            <input type="email" required className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Password</label>
            <input type="password" required className="form-input" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
