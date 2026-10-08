import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogOut, Globe, ShieldCheck } from 'lucide-react';

export default function AdminTopBar({ title, subtitle, children }) {
  const { adminLogout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E2E8F0]">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#159A6A] uppercase tracking-wider mb-1">
          <ShieldCheck size={14} />
          <span>BM Print Pack Admin Console</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B2235] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {children}

        {/* Client Website link */}
        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#12304A] bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded-xl transition shadow-2xs"
          title="Open Customer Front Page"
        >
          <Globe size={14} className="text-[#159A6A]" />
          <span>Client Site</span>
        </Link>

        {/* Admin User Chip */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs">
          <div className="w-6 h-6 rounded-lg bg-[#0B2235] text-[#159A6A] flex items-center justify-center font-black text-[10px]">
            AD
          </div>
          <div className="text-left leading-tight">
            <div className="text-[11px] font-bold text-[#0B2235]">admin@bmprint.com</div>
            <div className="text-[9px] text-[#159A6A] font-semibold uppercase tracking-wider">Super Admin</div>
          </div>
        </div>

        {/* Prominent Admin Logout Button */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition shadow-2xs cursor-pointer active:scale-95"
          title="Sign out of Admin Portal"
        >
          <LogOut size={14} className="text-red-600" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
