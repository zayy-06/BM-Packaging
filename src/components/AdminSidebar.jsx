import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, DollarSign,
  LogOut, LogIn, ChevronRight, Menu, X, Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Orders Queue', to: '/admin/orders', icon: ShoppingCart },
  { label: 'Products', to: '/admin/products', icon: Package },
  { label: 'Pricing Matrix', to: '/admin/pricing', icon: DollarSign },
  { label: 'Corporate Clients', to: '/admin/customers', icon: Users },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogout, isAdminLoggedIn } = useApp();

  const isActive = (to) => location.pathname === to;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Brand Header */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-[#E2E8F0] ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 bg-[#0B2235] border border-[#159A6A]/30 rounded-xl flex items-center justify-center shrink-0">
          <Package size={18} className="text-[#159A6A]" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-extrabold text-[#0B2235] text-sm tracking-tight">BM Print Pack</div>
            <div className="text-[10px] text-[#159A6A] font-bold uppercase tracking-wider">Internal Admin Console</div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                collapsed ? 'justify-center' : ''
              } ${
                active
                  ? 'bg-[#12304A] text-white shadow-2xs'
                  : 'text-[#12304A] hover:bg-slate-100 hover:text-[#0B2235]'
              }`}
              title={collapsed ? item.label : ''}
            >
              <Icon size={17} className={`shrink-0 ${active ? 'text-[#159A6A]' : 'text-slate-500'}`} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && <ChevronRight size={14} className="ml-auto text-[#159A6A]" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Auth & Navigation Section */}
      <div className="mt-auto px-3 pb-4 border-t border-[#E2E8F0] pt-3 space-y-2">
        {!collapsed && (
          <div className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-left">
            <div className="text-[11px] font-bold text-[#0B2235] truncate">
              {isAdminLoggedIn ? 'admin@bmprint.com' : 'Guest Administrator'}
            </div>
            <div className="text-[9px] text-[#159A6A] font-semibold uppercase tracking-wider">
              {isAdminLoggedIn ? 'Authenticated Admin' : 'Demo Console Mode'}
            </div>
          </div>
        )}

        <Link
          to="/"
          className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-[11px] font-bold text-[#12304A] hover:bg-slate-100 transition ${collapsed ? 'justify-center' : ''}`}
          title="Open Customer Front Page"
        >
          <span className="w-2 h-2 rounded-full bg-[#159A6A] shrink-0" />
          {!collapsed && <span>View Client Front</span>}
        </Link>

        {/* Admin Login button (if not logged in) */}
        {!isAdminLoggedIn && (
          <Link
            to="/admin/login"
            className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-xs font-bold text-white bg-[#159A6A] hover:bg-[#12835a] transition shadow-xs ${collapsed ? 'justify-center' : ''}`}
            title="Admin Login"
          >
            <LogIn size={15} className="shrink-0 text-white" />
            {!collapsed && <span>Admin Login</span>}
          </Link>
        )}

        {/* Admin Logout button */}
        <button
          onClick={() => { adminLogout(); navigate('/admin/login'); }}
          className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition cursor-pointer active:scale-98 ${collapsed ? 'justify-center' : ''}`}
          title="Sign Out of Admin Console"
        >
          <LogOut size={15} className="shrink-0 text-red-600" />
          {!collapsed && <span>Admin Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col bg-white border-r border-[#E2E8F0] transition-all duration-200 shrink-0 ${collapsed ? 'w-16' : 'w-56'}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-white border border-[#E2E8F0] rounded-full w-6 h-6 flex items-center justify-center text-slate-500 hover:text-[#12304A] shadow-xs z-10"
          style={{ position: 'relative', alignSelf: 'flex-end', margin: '8px 8px 0 0' }}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <Menu size={12} />
        </button>
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-[#0B2235] text-white rounded-lg flex items-center justify-center shadow-md border border-[#159A6A]/30"
      >
        <Menu size={18} />
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-white h-full shadow-2xl">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700">
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
