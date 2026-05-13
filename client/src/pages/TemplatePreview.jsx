import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiLockClosed } from 'react-icons/hi';
import PreviewCanvas from '../components/PreviewCanvas';
import ShareButtons from '../components/ShareButtons';
import PremiumModal from '../components/PremiumModal';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function TemplatePreview() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [premiumOpen, setPremiumOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/templates/${id}`);
        if (data.isPremium && user?.subscriptionStatus !== 'premium') setPremiumOpen(true);
        setTemplate(data);
      } catch { toast.error('Template not found'); navigate('/'); }
      finally { setLoading(false); }
    };
    load();
  }, [id, navigate, user]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: '3px solid #e5e7eb', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!template) return null;
  const locked = template.isPremium && user?.subscriptionStatus !== 'premium';

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px', height: 52, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280', fontSize: 14 }}>
            <HiArrowLeft /> Back
          </Link>
          <h1 style={{ fontSize: 15, fontWeight: 600, color: '#111827', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{template.title}</h1>
          {template.isPremium
            ? <span className="badge-premium">★ Pro</span>
            : <span className="badge-free">Free</span>
          }
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          {/* On larger screens, side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>

            {/* Canvas */}
            <div style={{ position: 'relative' }}>
              <PreviewCanvas ref={canvasRef} template={template} user={user} />
              {locked && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <HiLockClosed style={{ fontSize: 40, color: '#f59e0b' }} />
                  <p style={{ fontWeight: 600, color: '#111827' }}>Premium Template</p>
                  <button onClick={() => setPremiumOpen(true)} className="btn btn-primary">Unlock</button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 14, padding: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{template.title}</h2>
                <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Category: {template.category}</p>

                {user && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, background: '#f9fafb', borderRadius: 10, marginBottom: 16 }}>
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 14 }}>
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{user.name}</p>
                      <p style={{ fontSize: 12, color: '#9ca3af' }}>Personalized for you</p>
                    </div>
                  </div>
                )}

                {!locked && <ShareButtons canvasRef={canvasRef} templateTitle={template.title} />}
              </div>

              {!user && (
                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 14, padding: 20, textAlign: 'center', marginTop: 16 }}>
                  <p style={{ fontSize: 14, color: '#374151', marginBottom: 12 }}>Sign in to personalize with your photo</p>
                  <Link to="/login" className="btn btn-primary">Sign in</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <PremiumModal isOpen={premiumOpen} onClose={() => setPremiumOpen(false)} />
    </div>
  );
}
