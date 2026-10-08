import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Award, Users, Truck, Star,
  ChevronRight, ShieldCheck, Factory, Sparkles, Layers
} from 'lucide-react';
import { services, products } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';
import Footer from '../../components/Footer';

const stats = [
  { label: 'Years of Experience', value: '30+', icon: Award },
  { label: 'Corporate Clients', value: '500+', icon: Users },
  { label: 'Delivered Production Runs', value: '10K+', icon: Truck },
  { label: 'Quality Audit Score', value: '4.9/5', icon: Star },
];

const whyUs = [
  {
    icon: Award,
    title: '30+ Years of Industrial Expertise',
    description: 'Three decades of specialized manufacturing for high-stakes agrochemical, cosmetic, food, and pharmaceutical packaging.',
  },
  {
    icon: ShieldCheck,
    title: 'Strict ISO Quality Assurance',
    description: 'Every run undergoes pre-press bleed checks, ink adhesion testing, and barrier resistance inspections in our QC lab.',
  },
  {
    icon: Factory,
    title: 'Modern Machinery Lineup',
    description: 'Equipped with 8-color rotogravure presses, high-speed sheet-fed offset, and flexographic lines for precise color registration.',
  },
  {
    icon: Users,
    title: 'Experienced Technical Designers',
    description: 'In-house structural dieline specialists and prepress designers ensuring print-ready perfection and zero plate rework.',
  },
  {
    icon: Truck,
    title: 'On-Time Production & Logistics',
    description: 'Reliable scheduling and dedicated freight coordination ensuring commercial packaging batches arrive right on schedule.',
  },
  {
    icon: Layers,
    title: 'Scalable Custom Formulations',
    description: 'Tailored foil laminates, barrier coatings, and folding carton substrates built to your exact barrier and shelf-life needs.',
  },
];

const howItWorks = [
  { step: '01', title: 'Browse & Select', desc: 'Explore industry-certified folding cartons, barrier pouches, and labels.' },
  { step: '02', title: 'Customize & Estimate', desc: 'Select substrate board, dimensions, printing process, and get an immediate estimate.' },
  { step: '03', title: 'Pre-Press Review', desc: 'Upload vector artwork or request our structural team to calibrate your dielines.' },
  { step: '04', title: 'Manufacturing & Delivery', desc: 'Cylinder engraving, precision press run, and fast nationwide factory delivery.' },
];

export default function Home() {
  const featured = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION: Deep Navy (#0B2235 - #12304A) */}
      <section className="relative bg-gradient-to-br from-[#0B2235] via-[#12304A] to-[#0B2235] text-white overflow-hidden py-12 lg:py-16 border-b border-[#12304A]">
        {/* Subtle industrial background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#159A6A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#159A6A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-[#12304A]/80 border border-[#159A6A]/40 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#159A6A]" />
                <span>Established 1994 · 30+ Years of Manufacturing Leadership</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                Customized Printing &<br />
                <span className="text-[#159A6A]">Packaging Solutions</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
                Partner with Pakistan's trusted industrial packaging manufacturer. Explore our technical catalog, configure production parameters, and calculate estimated pricing in seconds.
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/customize"
                  className="bg-[#159A6A] hover:bg-[#118057] text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-150 shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
                >
                  <span>Get Packaging Estimate</span>
                  <ArrowRight size={17} />
                </Link>
                <Link
                  to="/products"
                  className="border border-slate-400/50 hover:border-white text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-white/5 transition-all text-sm"
                >
                  Browse Catalog
                </Link>
              </div>

              {/* Key Industries Bar */}
              <div className="mt-10 pt-8 border-t border-[#12304A] flex flex-wrap gap-y-3 gap-x-6 text-xs text-slate-300">
                {['Pesticide Packaging', 'Cosmetic Cartons', 'Food Grade Pouches', 'Pharma Packaging'].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 font-medium">
                    <CheckCircle size={14} className="text-[#159A6A]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Visual Imagery */}
            <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-[#12304A] shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80"
                    alt="Cosmetic packaging"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#12304A] shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80"
                    alt="Food packaging"
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden border border-[#12304A] shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80"
                    alt="Pharma cartons"
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#12304A] shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80"
                    alt="Pesticide pouch"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR: White (#FFFFFF) */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-9">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E8F6F0] rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-[#159A6A]" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0B2235]">{stat.value}</div>
                    <div className="text-xs text-[#64748B] font-medium mt-0.5">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION: Very light gray (#F8FAFC) */}
      <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-3 py-1 rounded-md mb-4 border border-[#159A6A]/20">
                About BM Print Pack
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2235] tracking-tight mb-5">
                Your Trusted Industrial Packaging Partner for <span className="text-[#159A6A]">30+ Years</span>
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-4">
                Founded in 1994, BM Print Pack has grown into one of Pakistan's premier industrial printing and packaging manufacturers. We engineer customized packaging solutions for chemical, cosmetic, food, pharmaceutical, and retail enterprises.
              </p>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-8">
                Operating high-speed gravure, offset, and flexographic press lines alongside precision die-cutting and barrier lamination, we guarantee exceptional print registration, durability, and on-time fulfillment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {[
                  'Senior In-House Prepress Designers',
                  'High-Speed Rotogravure & Offset Lines',
                  'ISO 9001 Certified Quality Assurance',
                  'Strict Regulatory & Hazard Labeling',
                  'Fast Turnaround & Sample Prototyping',
                  'Nationwide Commercial Freight Dispatch',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#12304A]">
                    <CheckCircle size={16} className="text-[#159A6A] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#12304A] hover:text-[#159A6A] transition-colors"
              >
                <span>Discover Our Manufacturing Heritage</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg bg-white">
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=700&q=80"
                  alt="BM Print Pack production line"
                  className="w-full h-96 object-cover"
                />
              </div>
              {/* Experience badge in Deep Navy */}
              <div className="absolute -bottom-6 -left-6 bg-[#0B2235] text-white p-5 rounded-2xl border border-[#159A6A]/30 shadow-xl hidden sm:block">
                <div className="text-3xl font-black text-[#159A6A]">30+</div>
                <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Years Manufacturing Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION: White (#FFFFFF) */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-3 py-1 rounded-md mb-3 border border-[#159A6A]/20">
              Packaging Domains
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2235] tracking-tight mb-4">
              Industries We Serve
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Engineered packaging specifications meeting stringent safety regulations, moisture barriers, and retail presentation standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to={`/services`}
                  className="group bg-white border border-[#E2E8F0] rounded-xl p-6 text-center hover:border-[#159A6A]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-13 h-13 bg-[#E8F6F0] text-[#159A6A] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#12304A] group-hover:text-white transition-colors duration-200">
                      {Icon ? <Icon size={24} /> : null}
                    </div>
                    <h3 className="font-bold text-[#12304A] text-sm mb-2 group-hover:text-[#159A6A] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                      {service.description.slice(0, 75)}...
                    </p>
                  </div>
                  <div className="mt-5 text-[#159A6A] text-xs font-bold flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                    <span>View Specifications</span>
                    <ChevronRight size={13} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US: Very light gray (#F8FAFC) */}
      <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-3 py-1 rounded-md mb-3 border border-[#159A6A]/20">
              Why Partner With Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2235] tracking-tight mb-4">
              The BM Print Pack Advantage
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Trusted by multinational and local brand leaders for consistent print quality, structural integrity, and dedicated account management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6.5 border border-[#E2E8F0] hover:border-[#159A6A]/40 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 bg-[#E8F6F0] rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#159A6A]" />
                  </div>
                  <h3 className="font-bold text-[#12304A] text-base mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS: Deep Navy (#0B2235 - #12304A) */}
      <section id="how-it-works" className="py-20 bg-[#0B2235] text-white border-b border-[#12304A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#12304A] border border-[#159A6A]/40 text-[#159A6A] text-xs font-bold px-3 py-1 rounded-full mb-3">
              Streamlined Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Order Your Custom Packaging in 4 Steps
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              From instant online estimations to physical dieline proofing and cylinder manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-[#12304A] border border-[#12304A] hover:border-[#159A6A]/40 rounded-xl p-6 transition-all duration-200">
                  <div className="text-4xl font-black text-[#159A6A]/40 mb-3">{step.step}</div>
                  <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <ArrowRight
                    size={20}
                    className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-[#159A6A] z-10"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#159A6A] hover:bg-[#118057] text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-150 shadow-md text-sm"
            >
              <span>Start Your Order</span>
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 bg-[#12304A] hover:bg-slate-800 text-slate-200 border border-[#E2E8F0]/20 font-bold px-6 py-3.5 rounded-lg transition text-sm"
            >
              <span>Explore Detailed 5-Step Process</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FEATURED PRODUCTS: White (#FFFFFF) */}
      <section className="py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-3 py-1 rounded-md mb-2 border border-[#159A6A]/20">
                Packaging Catalog
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2235] tracking-tight">
                Popular Industrial Packaging Lines
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#159A6A] hover:text-[#118057] transition-colors"
            >
              <span>Explore Entire Catalog</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA BANNER: Subtle Emerald Gradient / Navy Foundation */}
      <section className="py-16 bg-gradient-to-r from-[#12304A] via-[#159A6A] to-[#0B2235] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Calculate Your Packaging Run?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Configure your custom box dimensions, paperboard substrates, or multi-barrier films and view instant cost estimations with zero commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/customize"
              className="bg-white hover:bg-slate-100 text-[#0B2235] font-extrabold px-7 py-3.5 rounded-lg transition shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <span>Get Packaging Estimate</span>
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/contact"
              className="border border-white/60 hover:border-white hover:bg-white/10 text-white font-bold px-7 py-3.5 rounded-lg transition text-sm"
            >
              Speak with a Print Engineer
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER: Dark Navy (#0B2235) */}
      <Footer />
    </div>
  );
}
