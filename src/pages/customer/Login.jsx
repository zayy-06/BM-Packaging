import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Package, Lock, Mail, ArrowRight, CheckCircle2,
  AlertCircle, ShieldCheck, Building2, UserCheck
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('customer@bmprint.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use customer@bmprint.com / demo123, or click Quick Demo Sign In.');
    }
  };

  const handleQuickDemo = () => {
    setEmail('customer@bmprint.com');
    setPassword('demo123');
    const success = login('customer@bmprint.com', 'demo123');
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B2235] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#159A6A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#12304A]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center justify-center gap-3 mb-4 group">
          <div className="w-12 h-12 bg-[#12304A] border border-[#159A6A]/40 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <Package size={26} className="text-[#159A6A]" />
          </div>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          BM Print Pack
        </h2>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#159A6A]">
          Commercial Client Portal
        </p>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-[#E2E8F0]">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-extrabold text-[#0B2235]">Client Sign In</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Track manufacturing runs, dieline proofs, and active packaging quotations.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:border-[#159A6A] focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#1F2937]">
                  Password
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert('For this prototype, please use demo credentials below.'); }} className="text-[11px] font-semibold text-[#159A6A] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:border-[#159A6A] focus:outline-none transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#64748B] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#159A6A] focus:ring-[#159A6A]"
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Quick Demo Credentials Box */}
            <div className="p-3.5 bg-[#E8F6F0] rounded-xl border border-[#159A6A]/20 text-xs text-[#0B2235] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0B2235]">Prototype Demo Account:</span>
                <span className="text-[10px] uppercase font-bold text-[#159A6A] bg-white/80 px-2 py-0.5 rounded-full border border-[#159A6A]/20">Ready</span>
              </div>
              <div className="text-[11px] text-[#12304A] flex justify-between">
                <span>Email: <code className="bg-white/80 px-1 py-0.5 rounded font-mono">customer@bmprint.com</code></span>
              </div>
              <div className="text-[11px] text-[#12304A] flex justify-between">
                <span>Pass: <code className="bg-white/80 px-1 py-0.5 rounded font-mono">demo123</code></span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-md text-xs sm:text-sm font-bold text-white bg-[#159A6A] hover:bg-[#12835a] transition active:scale-[0.99]"
            >
              <UserCheck size={16} />
              <span>Sign In to Client Portal</span>
            </button>

            {/* 1-Click Fast Demo Login Button */}
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-[#12304A] bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-100 transition"
            >
              <span>1-Click Demo Client Sign In</span>
              <ArrowRight size={14} className="text-[#159A6A]" />
            </button>
          </form>

          {/* Navigation Links */}
          <div className="mt-6 pt-5 border-t border-[#E2E8F0] space-y-3 text-center">
            <div className="text-xs text-[#64748B]">
              New enterprise client?{' '}
              <Link to="/contact" className="font-bold text-[#159A6A] hover:underline">
                Request Corporate Account
              </Link>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#64748B]">
              <Link
                to="/"
                className="hover:text-[#12304A] transition inline-flex items-center gap-1 font-medium"
              >
                <span>← Back to Website</span>
              </Link>

              <Link
                to="/admin/login"
                className="hover:text-[#159A6A] transition inline-flex items-center gap-1 font-semibold text-[#12304A]"
              >
                <ShieldCheck size={13} className="text-[#159A6A]" />
                <span>Plant Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
