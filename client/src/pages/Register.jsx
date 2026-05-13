import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: '#f9fafb' }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: 36 }}>🎨</span>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginTop: 8 }}>Create account</h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Start making personalized greeting cards</p>
        </div>

        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 28 }}>
          <form onSubmit={handleSubmit}>
            {[
              { label: 'Full Name', key: 'name', type: 'text', ph: 'John Doe' },
              { label: 'Email', key: 'email', type: 'email', ph: 'you@example.com' },
              { label: 'Password', key: 'password', type: 'password', ph: 'Min. 6 characters' },
              { label: 'Confirm Password', key: 'confirm', type: 'password', ph: 'Repeat password' },
            ].map(({ label, key, type, ph }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>{label}</label>
                <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={ph} className="input" required minLength={key === 'password' ? 6 : undefined} />
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: 4 }}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#6b7280', marginTop: 20 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#4f46e5', fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
