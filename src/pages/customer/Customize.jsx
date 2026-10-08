import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Calculator, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { products, pricingConfig } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import Footer from '../../components/Footer';

const artworkOptions = [
  'I will provide print-ready vector artwork files',
  'Need BM Print Pack design team to create artwork',
  'Have rough concepts, need pre-press structural dieline refinement',
];

function calcEstimate(form) {
  const product = products.find(p => p.slug === form.productSlug);
  if (!product) return null;

  const qty = parseInt(form.quantity) || 0;
  if (qty === 0) return null;

  const matCost = (pricingConfig.materials[form.material] || 2) * qty;
  const printCost = (pricingConfig.printing[form.printing] || 1) * qty;
  const finishCost = (pricingConfig.finishing[form.finishing] || 0.3) * qty;
  const setupCost = pricingConfig.setup;
  const designCost = form.artwork === 'Need BM Print Pack design team to create artwork' ? pricingConfig.designCost : 0;

  const subtotal = matCost + printCost + finishCost + setupCost + designCost;

  const discountRule = pricingConfig.quantityDiscounts.find(r => qty >= r.min && qty <= r.max);
  const discountPct = discountRule ? discountRule.discount : 0;
  const discountAmt = (subtotal * discountPct) / 100;

  const total = subtotal - discountAmt;
  const perUnit = total / qty;

  return { matCost, printCost, finishCost, setupCost, designCost, subtotal, discountPct, discountAmt, total, perUnit, qty };
}

export default function Customize() {
  const { selectedProduct, setCurrentEstimate } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productSlug: selectedProduct?.slug || products[0].slug,
    material: '',
    size: '',
    quantity: '1000',
    printing: '',
    finishing: '',
    lamination: 'Yes',
    artwork: artworkOptions[0],
    notes: '',
  });

  const currentProduct = useMemo(() => products.find(p => p.slug === form.productSlug), [form.productSlug]);

  // Auto-select defaults when product changes
  useEffect(() => {
    if (currentProduct) {
      setForm(f => ({
        ...f,
        material: currentProduct.materials[0] || '',
        size: currentProduct.sizes[0] || '',
        printing: currentProduct.printingOptions[0] || '',
        finishing: currentProduct.finishingOptions[0] || '',
      }));
    }
  }, [form.productSlug, currentProduct]);

  const estimate = useMemo(() => calcEstimate(form), [form]);

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleProceed = () => {
    setCurrentEstimate({ form, estimate, product: currentProduct });
    navigate('/order-summary');
  };

  const fmt = (n) => `PKR ${Math.round(n).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 bg-[#E8F6F0] text-[#159A6A] text-xs font-bold px-2.5 py-1 rounded-md mb-2 border border-[#159A6A]/20">
              Interactive Estimator
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2235] tracking-tight">
              Packaging Customizer & Quotation Engine
            </h1>
            <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
              Configure substrates, dimensions, press technology, and volume brackets to calculate instant production estimates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Select Product */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs p-6">
                <h2 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 bg-[#12304A] text-white rounded-md text-xs flex items-center justify-center font-bold">1</span>
                  Select Packaging Product
                </h2>
                <select
                  value={form.productSlug}
                  onChange={e => handleChange('productSlug', e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-sm text-[#12304A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#159A6A]"
                >
                  {products.map(p => (
                    <option key={p.slug} value={p.slug}>{p.name} — ({p.category} Packaging)</option>
                  ))}
                </select>
                {currentProduct && (
                  <p className="mt-3 text-xs text-[#64748B] bg-slate-50 rounded-lg p-3 border border-slate-100">
                    {currentProduct.description}
                  </p>
                )}
              </div>

              {/* Step 2: Specifications */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs p-6">
                <h2 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 bg-[#12304A] text-white rounded-md text-xs flex items-center justify-center font-bold">2</span>
                  Material Substrate & Finished Dimensions
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5 uppercase tracking-wider">Substrate Board / Barrier</label>
                    <select
                      value={form.material}
                      onChange={e => handleChange('material', e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#12304A] font-medium focus:outline-none focus:ring-2 focus:ring-[#159A6A]"
                    >
                      {currentProduct?.materials.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5 uppercase tracking-wider">Dimensions / Format</label>
                    <select
                      value={form.size}
                      onChange={e => handleChange('size', e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#12304A] font-medium focus:outline-none focus:ring-2 focus:ring-[#159A6A]"
                    >
                      {currentProduct?.sizes.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Quantity */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs p-6">
                <h2 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 bg-[#12304A] text-white rounded-md text-xs flex items-center justify-center font-bold">3</span>
                  Production Order Quantity
                </h2>
                <div>
                  <label className="block text-xs font-bold text-[#12304A] mb-1.5 uppercase tracking-wider">
                    Units Count (Min Run: {currentProduct?.minQty?.toLocaleString()} units)
                  </label>
                  <input
                    type="number"
                    value={form.quantity}
                    onChange={e => handleChange('quantity', e.target.value)}
                    min={currentProduct?.minQty || 500}
                    step="500"
                    className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-sm font-bold text-[#12304A] focus:outline-none focus:ring-2 focus:ring-[#159A6A]"
                  />
                  {parseInt(form.quantity) > 0 && (
                    <div className="mt-3 text-xs text-[#64748B] flex flex-wrap gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {pricingConfig.quantityDiscounts.filter(r => r.max < Infinity).map(r => (
                        <span
                          key={r.min}
                          className={`px-2 py-0.5 rounded ${
                            parseInt(form.quantity) >= r.min && parseInt(form.quantity) <= r.max
                              ? 'bg-[#159A6A] text-white font-bold'
                              : 'text-slate-600'
                          }`}
                        >
                          {r.min.toLocaleString()}–{r.max.toLocaleString()}: {r.discount}% discount
                        </span>
                      ))}
                      <span className={`px-2 py-0.5 rounded ${parseInt(form.quantity) >= 50000 ? 'bg-[#159A6A] text-white font-bold' : 'text-slate-600'}`}>
                        50,000+: 20% discount
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 4: Printing & Finishing */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs p-6">
                <h2 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 bg-[#12304A] text-white rounded-md text-xs flex items-center justify-center font-bold">4</span>
                  Press Technology & Surface Finishing
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5 uppercase tracking-wider">Printing Method</label>
                    <select
                      value={form.printing}
                      onChange={e => handleChange('printing', e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#12304A] font-medium focus:outline-none focus:ring-2 focus:ring-[#159A6A]"
                    >
                      {currentProduct?.printingOptions.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5 uppercase tracking-wider">Finishing Treatment</label>
                    <select
                      value={form.finishing}
                      onChange={e => handleChange('finishing', e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#12304A] font-medium focus:outline-none focus:ring-2 focus:ring-[#159A6A]"
                    >
                      {currentProduct?.finishingOptions.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5 uppercase tracking-wider">Protective Lamination</label>
                    <select
                      value={form.lamination}
                      onChange={e => handleChange('lamination', e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#12304A] font-medium focus:outline-none focus:ring-2 focus:ring-[#159A6A]"
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 5: Artwork & Notes */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs p-6">
                <h2 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2.5">
                  <span className="w-6 h-6 bg-[#12304A] text-white rounded-md text-xs flex items-center justify-center font-bold">5</span>
                  Artwork Dielines & Pre-Press Requirements
                </h2>
                <div className="space-y-3">
                  {artworkOptions.map(opt => (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                        form.artwork === opt
                          ? 'border-[#159A6A] bg-[#E8F6F0]'
                          : 'border-[#E2E8F0] hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="artwork"
                        value={opt}
                        checked={form.artwork === opt}
                        onChange={e => handleChange('artwork', e.target.value)}
                        className="text-[#159A6A] focus:ring-[#159A6A]"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-[#12304A]">{opt}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-[#12304A] mb-1.5 uppercase tracking-wider">Special Technical Instructions</label>
                  <textarea
                    value={form.notes}
                    onChange={e => handleChange('notes', e.target.value)}
                    rows={2}
                    placeholder="E.g., specific Pantone ink codes, registration marks, regulatory warning text..."
                    className="w-full border border-[#E2E8F0] rounded-lg p-3 text-xs sm:text-sm text-[#12304A] focus:outline-none focus:ring-2 focus:ring-[#159A6A] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Live Estimate Panel */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-md overflow-hidden">
                  {/* Header: Deep Navy */}
                  <div className="bg-[#0B2235] text-white px-6 py-4.5 border-b border-[#12304A]">
                    <div className="flex items-center gap-2">
                      <Calculator size={18} className="text-[#159A6A]" />
                      <h2 className="font-extrabold text-base tracking-tight">Estimated Price Breakdown</h2>
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5">Calculated in real-time from active configuration</p>
                  </div>

                  {/* Cost breakdown */}
                  <div className="p-6">
                    {estimate ? (
                      <div className="space-y-3 text-xs sm:text-sm">
                        <div className="flex justify-between text-[#64748B]">
                          <span>Substrate Material Cost</span>
                          <span className="font-bold text-[#12304A]">{fmt(estimate.matCost)}</span>
                        </div>
                        <div className="flex justify-between text-[#64748B]">
                          <span>Press Printing Cost</span>
                          <span className="font-bold text-[#12304A]">{fmt(estimate.printCost)}</span>
                        </div>
                        <div className="flex justify-between text-[#64748B]">
                          <span>Finishing & Coating</span>
                          <span className="font-bold text-[#12304A]">{fmt(estimate.finishCost)}</span>
                        </div>
                        <div className="flex justify-between text-[#64748B]">
                          <span>Die & Plate Setup Surcharge</span>
                          <span className="font-bold text-[#12304A]">{fmt(estimate.setupCost)}</span>
                        </div>
                        {estimate.designCost > 0 && (
                          <div className="flex justify-between text-[#159A6A]">
                            <span>Pre-Press Design Service</span>
                            <span className="font-bold">{fmt(estimate.designCost)}</span>
                          </div>
                        )}

                        <div className="border-t border-dashed border-slate-200 pt-2.5 mt-2">
                          <div className="flex justify-between text-slate-500">
                            <span>Subtotal</span>
                            <span>{fmt(estimate.subtotal)}</span>
                          </div>
                          {estimate.discountPct > 0 && (
                            <div className="flex justify-between text-[#159A6A] font-bold">
                              <span>Volume Scale Discount ({estimate.discountPct}%)</span>
                              <span>- {fmt(estimate.discountAmt)}</span>
                            </div>
                          )}
                        </div>

                        {/* Estimated Total */}
                        <div className="border-t border-[#E2E8F0] pt-3.5 mt-2 bg-[#F8FAFC] -mx-6 px-6 pb-2">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="font-extrabold text-[#0B2235] text-sm sm:text-base">Estimated Total</span>
                            <span className="font-black text-[#159A6A] text-xl sm:text-2xl">{fmt(estimate.total)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>Estimated Unit Cost</span>
                            <span className="font-bold text-[#0B2235]">PKR {estimate.perUnit.toFixed(2)} / unit</span>
                          </div>
                          <div className="flex justify-between text-xs text-slate-500 mt-0.5">
                            <span>Order Run</span>
                            <span>{parseInt(form.quantity).toLocaleString()} units</span>
                          </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-xs text-amber-800 mt-3">
                          <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
                          <p>
                            <strong>Price Notice:</strong> Final price may be confirmed after technical artwork review by our plant team.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-slate-400">
                        <Calculator size={32} className="mx-auto mb-2 opacity-30 text-[#12304A]" />
                        <p className="text-xs">Enter valid quantity to calculate estimate</p>
                      </div>
                    )}
                  </div>

                  {/* Action CTA */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={handleProceed}
                      disabled={!estimate}
                      className="w-full bg-[#159A6A] hover:bg-[#118057] text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Proceed to Order Review</span>
                      <ChevronRight size={17} />
                    </button>
                    <p className="text-center text-[11px] text-slate-400 mt-2">
                      Zero upfront commitment · Free dieline proofing
                    </p>
                  </div>
                </div>

                {/* Support Box */}
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex gap-3 text-xs">
                  <AlertCircle size={18} className="text-[#12304A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0B2235] block">Need assistance with die-lines?</strong>
                    <span className="text-[#64748B]">
                      Call our engineering desk at +92 300 1234567 or request a live dieline consultation.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
