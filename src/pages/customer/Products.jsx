import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Package } from 'lucide-react';
import { products } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';
import Footer from '../../components/Footer';

const categories = ['All', 'Cosmetic', 'Food', 'Pharmaceutical', 'Pesticide', 'General'];

export default function Products() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      const match = categories.find(c => c.toLowerCase() === cat.toLowerCase() || c.toLowerCase().startsWith(cat.toLowerCase()));
      if (match) setActiveCategory(match);
    }
  }, [searchParams]);

  const filtered = products.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <div>
        {/* Hero: Deep Navy */}
        <section className="bg-gradient-to-br from-[#0B2235] via-[#12304A] to-[#0B2235] text-white py-16 border-b border-[#12304A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#12304A] border border-[#159A6A]/40 text-[#159A6A] text-xs font-bold px-3 py-1 rounded-full mb-3">
              Industrial Catalog
            </div>
            <h1 className="text-[#159A6A] text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Commercial Packaging Solutions
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Explore certified folding boxes, barrier barrier pouches, and labels. Select any product to customize substrates, dimensions, and live pricing.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-white border-b border-[#E2E8F0] sticky top-16 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search packaging lines..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#12304A] focus:outline-none focus:ring-2 focus:ring-[#159A6A] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-1.5 flex-wrap w-full sm:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#12304A] text-white shadow-2xs'
                      : 'bg-slate-100 text-[#12304A] hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs font-medium text-slate-400 hidden lg:block">
              Showing {filtered.length} packaging specifications
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-[#E2E8F0] p-8 max-w-md mx-auto">
                <Package size={40} className="mx-auto mb-3 opacity-30 text-[#12304A]" />
                <p className="text-base font-bold text-[#12304A]">No packaging lines found</p>
                <p className="text-xs text-slate-500 mt-1">Try adjusting your keyword search or category filters.</p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('All'); }}
                  className="mt-4 text-[#159A6A] font-bold text-xs hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
