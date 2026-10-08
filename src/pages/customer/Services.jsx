import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { services } from '../../data/mockData';
import Footer from '../../components/Footer';

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero: Deep Navy */}
      <section className="bg-gradient-to-br from-[#0B2235] via-[#12304A] to-[#0B2235] text-white py-20 border-b border-[#12304A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#12304A] border border-[#159A6A]/40 text-[#159A6A] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
            Industrial Capabilities
          </div>
          <h1 className="text-slate-300 text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Packaging Solutions for <span className="text-[#159A6A]">Every Industry</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From pesticide safety compliance to luxury cosmetic folding cartons — BM Print Pack engineers certified packaging calibrated to your industry's exact technical demands.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md bg-slate-50">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-80 object-cover hover:scale-104 transition-transform duration-300"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=60'; }}
                  />
                </div>
              </div>

              <div>
                {service.icon && (
                  <div className="w-14 h-14 bg-[#E8F6F0] text-[#159A6A] rounded-xl flex items-center justify-center mb-4 border border-[#159A6A]/20 shadow-2xs">
                    <service.icon size={28} />
                  </div>
                )}
                <div className="inline-flex items-center gap-1.5 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-2.5 py-0.5 rounded mb-2 border border-[#159A6A]/20">
                  Certified Packaging Line
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235] tracking-tight mb-4">
                  {service.name}
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#12304A]">
                      <CheckCircle size={16} className="text-[#159A6A] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/products?category=${service.slug}`}
                  className="inline-flex items-center gap-2 bg-[#159A6A] hover:bg-[#118057] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-lg transition-all shadow-xs"
                >
                  <span>View Packaging Specifications</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#12304A] via-[#159A6A] to-[#0B2235] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">
            Need a Custom Substrate or Barrier Formulation?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Our material specialists can recommend exact laminate layers, barrier ratings, and structural dielines for your product requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/customize"
              className="bg-white hover:bg-slate-100 text-[#0B2235] font-extrabold px-7 py-3 rounded-lg transition shadow text-sm"
            >
              Get Live Price Estimate
            </Link>
            <Link
              to="/contact"
              className="border border-white/60 hover:border-white hover:bg-white/10 text-white font-bold px-7 py-3 rounded-lg transition text-sm"
            >
              Contact Our Engineers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
