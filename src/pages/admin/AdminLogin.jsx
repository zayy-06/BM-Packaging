import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Package, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@bmprint.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { adminLogin } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = adminLogin(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Use admin@bmprint.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B2235] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background aesthetic blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#159A6A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#12304A]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-[#159A6A] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0B2235]/50">
            <Package size={28} className="text-white" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-extrabold text-white tracking-tight">
          BM Print Pack
        </h2>
        <p className="mt-1 text-center text-xs font-semibold uppercase tracking-wider text-[#159A6A]">
          Internal Administration Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-[#E2E8F0]">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:border-[#159A6A] focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:border-[#159A6A] focus:outline-none transition"
                />
              </div>
            </div>

            {/* Demo credentials hint */}
            <div className="p-3.5 bg-[#E8F6F0] rounded-xl border border-[#159A6A]/20 text-xs text-[#0B2235]">
              <span className="font-bold text-[#0B2235]">Prototype Demo Credentials:</span>
              <div className="mt-1 text-[#12304A]">
                Email: <code className="bg-white/80 px-1.5 py-0.5 rounded font-mono text-xs border border-[#159A6A]/20">admin@bmprint.com</code>
              </div>
              <div className="mt-1 text-[#12304A]">
                Password: <code className="bg-white/80 px-1.5 py-0.5 rounded font-mono text-xs border border-[#159A6A]/20">admin123</code>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-[#159A6A] hover:bg-[#12835a] transition active:scale-[0.99]"
            >
              <ShieldCheck size={18} />
              <span>Sign In to Admin Panel</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E2E8F0] text-center">
            <Link
              to="/"
              className="text-xs font-medium text-[#64748B] hover:text-[#12304A] transition inline-flex items-center gap-1"
            >
              <span>Return to Customer Front Page</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
