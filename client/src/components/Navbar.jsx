import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiSearch, HiLogout, HiUser } from 'react-icons/hi';

export default function Navbar({ onSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const handleSearch = (val) => {
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <nav style={{ borderBottom: '1px solid #e5e7eb', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: 60, gap: 16 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, color: '#111827', fontFamily:'georgia' }}>
          <span>Greet Craft</span>
        </Link>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 420, margin: '0 auto', position: 'relative' }}>
          <HiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search templates..."
            className="input"
            style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
          />
        </div>

        {/* Right side */}
        {user ? (
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', padding: '4px 8px', borderRadius: 10 }}
            >
              {user.profileImage ? (
                <img src={user.profileImage} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 600 }}>
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>{user.name}</span>
            </button>

            {menuOpen && (
              <div className="fade-in" style={{ position: 'absolute', right: 0, top: '100%', marginTop: 6, width: 220, background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', padding: '6px 0', zIndex: 50 }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #f3f4f6' }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{user.name}</p>
                  <p style={{ fontSize: 12, color: '#9ca3af' }}>{user.email}</p>
                </div>
                <Link to="/profile" onClick={() => setMenuOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', fontSize: 14, color: '#374151' }}
                  onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                  <HiUser /> Profile
                </Link>
                <button onClick={() => { logout(); navigate('/login'); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', fontSize: 14, color: '#ef4444', width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
                  onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                  <HiLogout /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: 13 }}>Log in</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Sign up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
