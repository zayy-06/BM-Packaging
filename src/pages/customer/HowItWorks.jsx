import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Cpu, Printer, Sparkles, Truck,
  CheckCircle2, ArrowRight, ShieldCheck, Clock,
  Layers, Settings, HelpCircle, ChevronDown, Award
} from 'lucide-react';
import Footer from '../../components/Footer';

const stages = [
  {
    step: '01',
    name: 'Specification & Online Estimate',
    subtitle: 'Transparent Pricing & Parameters',
    icon: FileText,
    duration: 'Immediate / < 1 hour',
    summary: 'Choose your packaging format, board substrate, dimensions, print techniques, and batch quantity to receive a calculated live quotation.',
    details: [
      'Interactive parametric cost calculation with instant tiered volume discounts',
      'Flexible substrate selection: Art Card, Duplex, SBS, Kraft, and multi-layer barrier laminates',
      'Downloadable standard dieline templates and dimension specifications',
      'Immediate technical feasibility check based on factory machine tolerances'
    ],
    deliverable: 'Instant Digital Quotation & Technical Parameter Sheet'
  },
  {
    step: '02',
    name: 'Prepress & Dieline Engineering',
    subtitle: 'Digital Proofing & Regulatory Review',
    icon: Cpu,
    duration: '24 – 48 Hours',
    summary: 'Our dedicated in-house prepress team inspects artwork for color trapping, bleed margins, barcode readability, and regulatory compliance.',
    details: [
      'Comprehensive inspection for pesticide hazard labeling, nutrition facts, and pharma serialization',
      'Pantone Matching System (PMS) color separation and ink density curve calibration',
      '3D folding digital mockups to inspect box ergonomics and structural seals before physical tooling',
      'Customer sign-off on 1:1 scale contract press proofs'
    ],
    deliverable: 'Approved High-Res PDF Contract Proof & Laser Dieline Blueprint'
  },
  {
    step: '03',
    name: 'Cylinder Engraving & Tooling',
    subtitle: 'Precision Hardware Preparation',
    icon: Settings,
    duration: '3 – 5 Days',
    summary: 'High-precision electronic engraving of rotogravure copper cylinders and CNC laser cutting of steel rule dies.',
    details: [
      'Direct-to-copper electromechanical cylinder engraving for microscopic micro-text and crisp line art',
      'Diamond-ground impression rollers guaranteeing consistent micron-level ink transfer',
      'Custom laser-cut steel rule die boards for crisp carton crease lines without paper cracking',
      'Secure long-term cylinder archiving in our climate-controlled tooling vault for rapid re-orders'
    ],
    deliverable: 'Engraved Rotogravure Cylinders & Master Cutting Dies'
  },
  {
    step: '04',
    name: 'Press Printing & Lamination',
    subtitle: 'High-Speed Commercial Manufacturing',
    icon: Printer,
    duration: '5 – 8 Days',
    summary: 'Your packaging enters high-speed production on our multi-color gravure or multi-unit offset press lines.',
    details: [
      'Up to 8-color simultaneous printing with in-line computerized registration monitoring',
      'Solvent-less eco-lamination for food barrier pouches and agrochemical pouch sleeves',
      'High-impact surface embellishments: Soft-touch matte, high-gloss UV, metallic foil stamping, and debossing',
      'Automatic robotic high-speed carton gluing and pouch heat-sealing'
    ],
    deliverable: 'Fully Printed, Coated & Formed Packaging Inventory'
  },
  {
    step: '05',
    name: 'Quality Assurance & Logistics',
    subtitle: 'Rigorous Testing & Delivery',
    icon: Truck,
    duration: '2 – 3 Days',
    summary: 'Every batch undergoes batch tensile testing, moisture barrier verification, and barcode grading before packed dispatch.',
    details: [
      'Bursting strength, drop impact, and moisture barrier vapor transmission testing (MVTR)',
      '100% optical camera inspection detecting pinholes, ink splatter, or registration shifts',
      'Heavy-duty corrugated palletizing with weather-resistant shrink-wrap protection',
      'Nationwide freight delivery across Lahore, Karachi, Faisalabad, Multan, and Islamabad'
    ],
    deliverable: 'Certificate of Analysis (COA) & Dispatched Cargo Consignment'
  }
];

const faqs = [
  {
    q: 'What is the minimum order quantity (MOQ) for custom packaging?',
    a: 'For folded paperboard cartons and luxury rigid boxes, our standard MOQ starts at 1,000 units. For multi-layer flexible printed pouches or rotogravure roll films, the typical initial run is 5,000 to 10,000 pouches due to cylinder changeover and reel calibration.'
  },
  {
    q: 'Who owns the engraved printing cylinders and cutting dies?',
    a: 'Once the initial setup/tooling fee is paid, all cylinders and custom cutting dies belong exclusively to your company. We catalog, clean, and store them securely in our Lahore factory vault for quick zero-setup reorders.'
  },
  {
    q: 'Can BM Print Pack help us design dielines or adapt existing artwork?',
    a: 'Yes. Our senior prepress department has over 30 years of packaging structural design experience. We provide free dieline vector files (.AI and .PDF) and assist your branding team in adapting graphics for optimal press reproduction.'
  },
  {
    q: 'Are your materials certified for direct food or pesticide contact?',
    a: 'Yes. We supply FDA-grade virgin SBS board, food-grade solventless laminated barrier films, and certified chemical-resistant barrier foils engineered to resist corrosive organophosphates and moisture penetration.'
  },
  {
    q: 'How fast can repeat orders be dispatched?',
    a: 'Because cylinders and cutting dies are already manufactured and stored in our vault, repeat orders bypass the tooling phase and typically ship within 5 to 7 working days.'
  }
];

export default function HowItWorks() {
  const [activeStage, setActiveStage] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const current = stages[activeStage];
  const CurrentIcon = current.icon;

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION: Deep Navy (#0B2235 - #12304A) */}
      <section className="bg-linear-to-b from-[#0B2235] to-[#12304A] text-white py-20 relative overflow-hidden border-b border-[#12304A]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#159A6A_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#12304A] border border-[#159A6A]/40 text-[#159A6A] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
            <Settings size={14} className="text-[#159A6A]" />
            <span>Industrial Manufacturing Workflow</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight mb-4">
            How BM Print Pack Works – From Design to Delivery
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Over 30 years of industrial packaging expertise engineered into a transparent, high-precision 5-stage lifecycle. Explore how your product packaging is conceptualized, tooled, printed, and delivered.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/customize"
              className="bg-[#159A6A] hover:bg-[#12835a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md flex items-center gap-2"
            >
              <span>Launch Live Packaging Estimator</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="bg-[#12304A] hover:bg-slate-800 text-slate-200 border border-[#E2E8F0]/20 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition"
            >
              <span>Consult a Packaging Engineer</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE 5-STAGE PIPELINE: Light Section (#F8FAFC) */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#159A6A] text-xs font-bold uppercase tracking-wider">The 5-Step Pipeline</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235] mt-1 tracking-tight">
              Interactive Manufacturing Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-2">
              Select any stage below to inspect technical requirements, machine tooling, and client deliverables.
            </p>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStage === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#12304A] text-white border-[#12304A] shadow-md scale-[1.02]'
                      : 'bg-white text-[#12304A] border-[#E2E8F0] hover:border-[#159A6A]/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-black ${isSelected ? 'text-[#159A6A]' : 'text-slate-400'}`}>
                      {stage.step}
                    </span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/10 text-[#159A6A]' : 'bg-[#E8F6F0] text-[#159A6A]'}`}>
                      <Icon size={14} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-snug">{stage.name}</div>
                    <div className={`text-[10px] mt-1 font-semibold ${isSelected ? 'text-slate-300' : 'text-[#64748B]'}`}>
                      {stage.duration}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive Card */}
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#E8F6F0] text-[#159A6A] rounded-2xl flex items-center justify-center shadow-xs">
                    <CurrentIcon size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#159A6A]">
                      Stage {current.step} • {current.subtitle}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2235]">
                      {current.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#1F2937] leading-relaxed">
                  {current.summary}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#12304A]">
                    Key Industrial Protocols:
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {current.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                        <CheckCircle2 size={16} className="text-[#159A6A] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#1F2937] font-medium leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Stage Deliverable & Turnaround Specs */}
              <div className="lg:col-span-5 bg-[#0B2235] text-white p-6 sm:p-8 rounded-2xl border border-[#12304A] space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#159A6A]">
                    Stage Turnaround
                  </span>
                  <div className="text-2xl font-black text-white mt-1 flex items-center gap-2">
                    <Clock size={20} className="text-[#159A6A]" />
                    <span>{current.duration}</span>
                  </div>
                </div>

                <div className="border-t border-[#12304A] pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#159A6A]">
                    Client Deliverable
                  </span>
                  <div className="text-sm font-bold text-slate-100 mt-1 flex items-start gap-2">
                    <Award size={18} className="text-[#159A6A] shrink-0 mt-0.5" />
                    <span>{current.deliverable}</span>
                  </div>
                </div>

                <div className="bg-[#12304A] p-4 rounded-xl border border-[#159A6A]/20">
                  <div className="text-xs font-bold text-white mb-1">Quality Standard Guarantee</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Compliant with ISO 9001:2015 certification, GMP standards, and strict zero-defect pre-dispatch batch inspections.
                  </p>
                </div>

                <Link
                  to="/customize"
                  className="w-full bg-[#159A6A] hover:bg-[#12835a] text-white font-bold text-xs py-3 rounded-xl transition text-center block shadow-md"
                >
                  Configure Packaging for this Process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BM PRINT PACK ADVANTAGE: White Section (#FFFFFF) */}
      <section className="py-16 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#159A6A] text-xs font-bold uppercase tracking-wider">Industrial Benchmarking</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235] mt-1">
              Why Corporate Brands Choose BM Print Pack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 bg-[#E8F6F0] rounded-xl flex items-center justify-center text-[#159A6A]">
                <Layers size={20} />
              </div>
              <h3 className="font-bold text-[#0B2235] text-base">In-House Manufacturing Only</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Unlike packaging brokers or third-party middlemen, every single sheet and pouch is produced directly at our own facility on high-speed presses.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 bg-[#E8F6F0] rounded-xl flex items-center justify-center text-[#159A6A]">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-[#0B2235] text-base">Rigid Quality & Tolerance</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Micro-calibrated densitometers and digital dieline registration guarantee that carton folding lines never split and pesticide inks never fade under sunlight.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 bg-[#E8F6F0] rounded-xl flex items-center justify-center text-[#159A6A]">
                <Clock size={20} />
              </div>
              <h3 className="font-bold text-[#0B2235] text-base">Guaranteed Delivery Milestones</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Over 30 years in continuous production ensures on-time freight schedules to match your factory bottling and packaging packing lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS: Light Gray (#F8FAFC) */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#159A6A] uppercase tracking-wider mb-2">
              <HelpCircle size={14} />
              <span>Procurement & Engineering FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235]">
              Common Questions from Commercial Clients
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0B2235] hover:text-[#159A6A] transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#64748B] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#159A6A]' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#64748B] leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA: Deep Navy with Emerald Accent */}
      <section className="py-16 bg-[#0B2235] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-12 h-12 bg-[#159A6A] rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg shadow-[#159A6A]/20">
            <Printer size={24} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Begin Your Packaging Production Run?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Test custom board substrates, finishes, and quantities with real-time price estimation or speak with our sales engineers for sample prototypes.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/customize"
              className="bg-[#159A6A] hover:bg-[#12835a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md"
            >
              Get Instant Online Price Estimate
            </Link>
            <Link
              to="/contact"
              className="bg-[#12304A] hover:bg-slate-800 text-white border border-[#E2E8F0]/20 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition"
            >
              Schedule Factory Technical Visit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
