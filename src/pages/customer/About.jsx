import { Award, Users, Settings, CheckCircle, Target, Eye } from 'lucide-react';
import Footer from '../../components/Footer';

const timeline = [
  { year: '1994', event: 'BM Print Pack founded in Lahore with high-precision sheet-fed offset presses.' },
  { year: '2000', event: 'Expanded into certified pharmaceutical cartons and FDA-grade food barrier packaging.' },
  { year: '2008', event: 'Commissioned 8-color rotogravure printing line for flexible packaging and pouches.' },
  { year: '2015', event: 'Awarded ISO 9001 certification and established in-house QA barrier test laboratory.' },
  { year: '2020', event: 'Integrated HP digital pre-press & prototype dieline cutting lines for agile turnarounds.' },
  { year: '2024', event: 'Celebrated 30 years with 500+ active enterprise clients and expanded modern plant facilities.' },
];

const team = [
  { name: 'Muhammad Bilal', role: 'Founder & Managing Director', exp: '30+ years', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
  { name: 'Fatima Noor', role: 'Head of Prepress & Structural Design', exp: '15 years', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80' },
  { name: 'Usman Malik', role: 'Senior Plant Operations Manager', exp: '18 years', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
  { name: 'Ayesha Khan', role: 'Quality Assurance & Compliance Lead', exp: '12 years', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
];

const machinery = [
  { name: '8-Color Rotogravure Line', desc: 'Heavy-duty rotogravure press delivering ultra-consistent ink density on flexible multi-layer films.' },
  { name: 'Sheet-Fed Offset Presses', desc: 'Multi-unit offset presses calibrated for high-GSM duplex and SBS board folding cartons.' },
  { name: 'Flexographic Web Presses', desc: 'High-speed inline flexo printing for pressure-sensitive labels and barrier wraps.' },
  { name: 'Digital Proofing & Plotters', desc: 'Pre-flight digital proofing and automatic dieline sample cutters for rapid prototyping.' },
  { name: 'Precision Die-Cutting & Foiling', desc: 'Automated flatbed die-cutting, embossing, thermal lamination, and hot-stamping units.' },
  { name: 'Certified QC Testing Lab', desc: 'In-house barrier spectrometer, rub resistance, seal strength, and ink adhesion testing.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero: Deep Navy */}
      <section className="bg-gradient-to-br from-[#0B2235] via-[#12304A] to-[#0B2235] text-white py-20 border-b border-[#12304A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#12304A] border border-[#159A6A]/40 text-[#159A6A] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
            Industrial Manufacturing Heritage
          </div>
          <h1 className="text-slate-300  text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            30+ Years of Printing &<br />
            <span className="text-[#159A6A]">Packaging Excellence</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering precision packaging engineering, ISO quality compliance, and on-time industrial manufacturing for leading commercial brands since 1994.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-[#E2E8F0] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '30+', label: 'Years in Business' },
            { value: '500+', label: 'Corporate Clients' },
            { value: '10,000+', label: 'Delivered Production Runs' },
            { value: '5', label: 'Certified Industry Sectors' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-[#0B2235] mb-1">{s.value}</div>
              <div className="text-xs text-[#64748B] font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-3 py-1 rounded-md mb-4 border border-[#159A6A]/20">
                Our Heritage
              </div>
              <h2 className="text-3xl font-extrabold text-[#0B2235] tracking-tight mb-5">
                Built on Trust, Driven by Precision Engineering
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-4">
                BM Print Pack was established in 1994 in Lahore with a dedicated offset press and a fundamental mission: to provide commercial brands with industrial packaging that protects products, reflects premium quality, and arrives without manufacturing delays.
              </p>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-4">
                Over three decades, our plant has evolved into a fully integrated manufacturing facility operating high-speed rotogravure, offset, and flexographic lines, coupled with computerized die-making and barrier lamination capabilities.
              </p>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                We partner with agrochemical manufacturers requiring UN-compliant hazard packaging, cosmetic producers demanding luxury soft-touch finishes, and pharmaceutical houses requiring zero-defect serialization and tamper seals.
              </p>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg bg-white">
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=700&q=80"
                  alt="Production facility"
                  className="w-full h-84 object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#0B2235] text-white p-5 rounded-2xl border border-[#159A6A]/30 shadow-xl text-center hidden sm:block">
                <div className="text-2xl font-black text-[#159A6A]">ISO 9001</div>
                <div className="text-xs text-slate-300 font-semibold uppercase">Certified Quality Plant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-3 py-1 rounded-md mb-3 border border-[#159A6A]/20">
              Three Decades of Growth
            </div>
            <h2 className="text-3xl font-extrabold text-[#0B2235] tracking-tight">Key Milestones & Expansion</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className={`flex gap-6 lg:gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : ''} hidden lg:block`} />
                  <div className="relative flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#12304A] border-2 border-[#159A6A] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-sm">
                      {item.year.slice(2)}
                    </div>
                  </div>
                  <div className="flex-1 bg-[#F8FAFC] rounded-xl p-4.5 border border-[#E2E8F0]">
                    <div className="text-[#159A6A] font-bold text-sm mb-1">{item.year}</div>
                    <p className="text-[#12304A] text-xs sm:text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision: Deep Navy */}
      <section className="py-20 bg-[#0B2235] text-white border-b border-[#12304A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8">
          <div className="bg-[#12304A] border border-[#12304A] hover:border-[#159A6A]/40 rounded-2xl p-8 transition-colors">
            <div className="w-12 h-12 bg-[#159A6A]/20 text-[#159A6A] rounded-xl flex items-center justify-center mb-5">
              <Target size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To engineer innovative, cost-effective, and regulation-compliant packaging solutions that safeguard industrial products, elevate retail branding, and guarantee seamless on-time production runs.
            </p>
          </div>
          <div className="bg-[#12304A] border border-[#12304A] hover:border-[#159A6A]/40 rounded-2xl p-8 transition-colors">
            <div className="w-12 h-12 bg-[#159A6A]/20 text-[#159A6A] rounded-xl flex items-center justify-center mb-5">
              <Eye size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To stand as South Asia's most technologically advanced industrial printing house, benchmarked globally for print fidelity, sustainable barrier materials, and transparent digital ordering.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-3 py-1 rounded-md mb-3 border border-[#159A6A]/20">
              Plant Leadership
            </div>
            <h2 className="text-3xl font-extrabold text-[#0B2235] tracking-tight">Experienced Production Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0] text-center hover:border-[#159A6A]/40 transition-colors">
                <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-white shadow" />
                <h4 className="font-bold text-[#0B2235] text-base">{member.name}</h4>
                <p className="text-[#159A6A] text-xs font-semibold mt-0.5">{member.role}</p>
                <p className="text-slate-400 text-xs mt-1.5">{member.exp} experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Machinery */}
      <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-3 py-1 rounded-md mb-3 border border-[#159A6A]/20">
              Equipment Infrastructure
            </div>
            <h2 className="text-3xl font-extrabold text-[#0B2235] tracking-tight mb-3">Modern Printing Machinery</h2>
            <p className="text-sm text-[#64748B] max-w-xl mx-auto">
              Precision high-speed presses configured for exact Pantone ink fidelity, UV varnishing, and structural die-cutting.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machinery.map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-[#159A6A]/40 shadow-2xs transition-all">
                <div className="w-10 h-10 bg-[#E8F6F0] rounded-lg flex items-center justify-center mb-4">
                  <Settings size={20} className="text-[#159A6A]" />
                </div>
                <h4 className="font-bold text-[#0B2235] text-base mb-2">{m.name}</h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
