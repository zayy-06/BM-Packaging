import { Link } from 'react-router-dom';
import { Package, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B2235] text-slate-300 border-t border-[#12304A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#12304A] border border-[#159A6A]/30 rounded-xl flex items-center justify-center">
                <Package size={22} className="text-[#159A6A]" />
              </div>
              <div>
                <div className="text-white font-extrabold text-lg tracking-tight">BM Print Pack</div>
                <div className="text-[11px] text-[#159A6A] font-semibold tracking-wider uppercase">30+ Years of Excellence</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Industrial printing and custom packaging manufacturer serving pesticides, cosmetics, food, pharmaceutical, and retail sectors since 1994.
            </p>
            <div className="flex gap-2.5">
              <a
                href="#"
                className="w-8 h-8 bg-[#12304A] hover:bg-[#159A6A] text-slate-300 hover:text-white rounded-lg flex items-center justify-center text-xs font-bold transition-colors"
                title="Facebook"
              >
                fb
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-[#12304A] hover:bg-[#159A6A] text-slate-300 hover:text-white rounded-lg flex items-center justify-center text-xs font-bold transition-colors"
                title="Instagram"
              >
                ig
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-[#12304A] hover:bg-[#159A6A] text-slate-300 hover:text-white rounded-lg flex items-center justify-center text-xs font-bold transition-colors"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Industrial Services', to: '/services' },
                { label: 'Packaging Catalog', to: '/products' },
                { label: 'Get Instant Estimate', to: '/customize' },
                { label: 'Client Contact Desk', to: '/contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-[#159A6A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industrial Packaging Capabilities */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4">Packaging Capabilities</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {[
                'Agrochemical & Pesticide Pouches',
                'Cosmetic Cartons & Rigid Boxes',
                'FDA-Compliant Food Pouches',
                'GMP Pharmaceutical Boxes',
                'Flexible Multi-Layer Packaging',
                'High-Speed Self-Adhesive Labels',
              ].map(s => (
                <li key={s} className="hover:text-[#159A6A] transition-colors cursor-pointer">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4">Headquarters & Plant</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#159A6A] mt-0.5 shrink-0" />
                <span className="text-slate-400">Plot 45-B, Sundar Industrial Estate, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#159A6A] shrink-0" />
                <span className="text-slate-400">+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#159A6A] shrink-0" />
                <span className="text-slate-400">info@bmprintpack.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={16} className="text-[#159A6A] shrink-0" />
                <span className="text-slate-400">Mon – Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#12304A] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2026 BM Print Pack. All rights reserved. Built with 30+ years of manufacturing experience.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-slate-300 transition-colors">Quality Policy</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Plant Visit Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
