import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Menu, X, Phone, Mail, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useApp();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Packaging', to: '/products' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Contact', to: '/contact' },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-2xs">
      {/* Slim Professional Corporate Top Utility Bar */}
      <div className="bg-[#0B2235] text-slate-300 text-xs py-2 border-b border-[#12304A]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Timing */}
          <div className="flex items-center gap-2">
            <Clock size={13} className="text-[#159A6A] shrink-0" />
            <span className="text-slate-300 font-medium tracking-wide">Mon – Sat: 9:00 AM – 6:00 PM</span>
          </div>

          {/* Right: Email & Phone (Desktop & Tablet) */}
          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href="mailto:info@bmprintpack.com"
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail size={13} className="text-[#159A6A] shrink-0" />
              <span>info@bmprintpack.com</span>
            </a>
            <a
              href="tel:+923001234567"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white font-medium transition-colors"
            >
              <Phone size={13} className="text-[#159A6A] shrink-0" />
              <span>+92 300 1234567</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18">
            {/* Left: Brand Identity */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#12304A] border border-[#159A6A]/30 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:border-[#159A6A]">
                <Package size={22} className="text-[#159A6A]" />
              </div>
              <div className="leading-tight">
                <div className="text-lg font-extrabold text-[#0B2235] tracking-tight">
                  BM Print Pack
                </div>
                <div className="text-[11px] text-[#159A6A] font-semibold tracking-wider uppercase">
                  30+ Years of Excellence
                </div>
              </div>
            </Link>

            {/* Center: Primary Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'text-[#159A6A] font-semibold bg-[#E8F6F0]'
                        : 'text-[#12304A] hover:text-[#159A6A] hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-sm font-semibold text-[#12304A] hover:text-[#159A6A] transition-colors"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-semibold text-[#12304A] hover:text-[#159A6A] transition-colors px-2 py-1"
                >
                  Client Login
                </Link>
              )}

              {/* Primary Emerald Button */}
              <Link
                to="/customize"
                className="bg-[#159A6A] hover:bg-[#118057] text-white text-sm font-bold px-4.5 py-2.5 rounded-lg transition-all duration-150 shadow-xs hover:shadow flex items-center gap-2"
              >
                <span>Get Estimate</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-[#12304A] hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] bg-white pb-5 px-4 pt-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-[#159A6A] font-semibold bg-[#E8F6F0]'
                      : 'text-[#12304A] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-[#E2E8F0] flex flex-col gap-2.5">
                {isLoggedIn ? (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-3 py-2 text-sm font-semibold text-center text-[#12304A] border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                    >
                      My Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); navigate('/'); }}
                      className="px-3 py-2 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-sm font-semibold text-center text-[#12304A] border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                  >
                    Client Login
                  </Link>
                )}
                <Link
                  to="/customize"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#159A6A] hover:bg-[#118057] text-white text-sm font-bold py-2.5 rounded-lg text-center transition shadow-xs"
                >
                  Get Estimate
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
