import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs hover:shadow-md hover:border-[#159A6A]/40 transition-all duration-200 overflow-hidden group flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden h-48 bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=60'; }}
          />
          <div className="absolute top-3 left-3">
            <span className="bg-[#E8F6F0]/95 backdrop-blur-xs text-[#159A6A] text-xs font-bold px-2.5 py-1 rounded-md border border-[#159A6A]/20 shadow-2xs">
              {product.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-[#12304A] text-base mb-1.5 group-hover:text-[#159A6A] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-400 font-medium">
          Min. {product.minQty?.toLocaleString()} units
        </span>
        <Link
          to={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#159A6A] hover:text-[#118057] transition-colors"
        >
          <span>Customize</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
