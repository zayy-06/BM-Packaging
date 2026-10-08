import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Layers, Maximize2, Printer, Sparkles, AlertCircle } from 'lucide-react';
import { products } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import Footer from '../../components/Footer';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setSelectedProduct } = useApp();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center p-8 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm">
          <Package size={48} className="mx-auto mb-4 text-[#12304A]/40" />
          <h2 className="text-xl font-bold text-[#0B2235] mb-2">Product Not Found</h2>
          <Link to="/products" className="text-[#159A6A] font-semibold hover:underline text-sm">
            ← Return to Packaging Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleCustomize = () => {
    setSelectedProduct(product);
    navigate('/customize');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#64748B] mb-6">
            <Link to="/products" className="hover:text-[#159A6A] font-medium flex items-center gap-1">
              <ArrowLeft size={14} /> Packaging Catalog
            </Link>
            <span>/</span>
            <span className="text-[#12304A] font-bold">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left: Product Media */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 lg:h-[450px] object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=60'; }}
                />
              </div>
              <div className="mt-4 bg-slate-100 border border-slate-200 rounded-xl p-4 flex gap-3 text-xs text-[#64748B]">
                <AlertCircle size={18} className="text-[#12304A] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#12304A]">Manufacturing Note:</strong> Dieline blueprints, Pantone calibrations, and barrier films are customized during order review.
                </p>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2E8F0] p-7 shadow-2xs">
              <div className="inline-flex items-center gap-1.5 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-2.5 py-1 rounded-md mb-3 border border-[#159A6A]/20">
                {product.category} Packaging Line
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235] tracking-tight mb-3">
                {product.name}
              </h1>
              <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="space-y-5">
                {/* Available Materials */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#12304A] mb-2 uppercase tracking-wider">
                    <Layers size={14} className="text-[#159A6A]" /> Certified Substrates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map(m => (
                      <span key={m} className="bg-slate-100 text-[#12304A] text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#12304A] mb-2 uppercase tracking-wider">
                    <Maximize2 size={14} className="text-[#159A6A]" /> Standard Dieline Formats
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <span key={s} className="bg-slate-100 text-[#12304A] text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Printing */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#12304A] mb-2 uppercase tracking-wider">
                    <Printer size={14} className="text-[#159A6A]" /> Press Options
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.printingOptions.map(p => (
                      <span key={p} className="bg-[#12304A]/5 text-[#12304A] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#12304A]/10">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Finishing */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#12304A] mb-2 uppercase tracking-wider">
                    <Sparkles size={14} className="text-[#159A6A]" /> Surface Embellishments
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.finishingOptions.map(f => (
                      <span key={f} className="bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#159A6A]/20">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Minimum Order */}
                <div className="bg-[#0B2235] text-white rounded-xl p-4.5 flex items-center justify-between border border-[#12304A]">
                  <div>
                    <div className="text-xs text-slate-300 font-medium">Minimum Commercial Batch Run</div>
                    <div className="text-2xl font-extrabold text-[#159A6A] mt-0.5">
                      {product.minQty?.toLocaleString()} units
                    </div>
                  </div>
                  <Package size={30} className="text-[#159A6A]/40" />
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCustomize}
                  className="flex-1 bg-[#159A6A] hover:bg-[#118057] text-white font-bold py-3.5 rounded-lg transition-all shadow-xs text-center text-sm"
                >
                  Configure & Get Estimate
                </button>
                <Link
                  to="/contact"
                  className="flex-1 border border-[#12304A] hover:bg-slate-100 text-[#12304A] font-bold py-3.5 rounded-lg transition text-center text-sm"
                >
                  Request Plant Sample
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
