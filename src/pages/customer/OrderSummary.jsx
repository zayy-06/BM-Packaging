import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, Building, Mail, Phone, User, MapPin, AlertCircle } from 'lucide-react';
import Footer from '../../components/Footer';

export default function OrderSummary() {
  const navigate = useNavigate();
  const { currentEstimate, placeOrder } = useApp();

  const [customerInfo, setCustomerInfo] = useState({
    companyName: 'NatureBrew Organics Ltd.',
    contactPerson: 'Zubair Ahmed',
    email: 'purchasing@naturebrew.pk',
    phone: '+92 321 8849201',
    address: 'Plot 12, Industrial Triangle, Kahuta Road',
    city: 'Islamabad',
    deliveryMethod: 'Standard Freight (5-7 business days)',
    notes: 'Please double-check alignment with sample foil proof.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fallback defaults if accessed directly
  const estimateData = currentEstimate?.estimate || {
    matCost: 45000,
    printCost: 20000,
    finishCost: 4500,
    setupCost: 150,
    designCost: 0,
    subtotal: 69650,
    discountPct: 5,
    discountAmt: 3482.5,
    total: 66167.5,
    perUnit: 6.62,
    qty: 10000
  };

  const productData = currentEstimate?.product || {
    name: 'Food Grade Pouch',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80'
  };

  const formData = currentEstimate?.form || {
    productSlug: 'food-grade-pouch',
    material: 'PET/PE Laminate',
    size: '250g (13×20 cm)',
    quantity: '10000',
    printing: 'Gravure Print',
    finishing: 'Zipper',
    lamination: 'Yes',
    artwork: 'I will provide artwork files'
  };

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrderId = placeOrder({
        product: productData.name,
        category: productData.category,
        quantity: parseInt(formData.quantity) || 10000,
        material: formData.material,
        size: formData.size,
        printing: formData.printing,
        finishing: formData.finishing,
        amount: Math.round(estimateData.total),
        customer: customerInfo.companyName,
        artwork: formData.artwork,
        contactPerson: customerInfo.contactPerson,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: `${customerInfo.address}, ${customerInfo.city}`,
        deliveryMethod: customerInfo.deliveryMethod
      });

      setIsSubmitting(false);
      navigate(`/order-confirmation?orderId=${newOrderId || 'BMP-10025'}`);
    }, 600);
  };

  const fmt = (num) => `PKR ${Math.round(num).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <div>
        {/* Header Breadcrumbs */}
        <div className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to="/customize" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#12304A] hover:text-[#159A6A] transition-colors">
              <ArrowLeft size={16} /> Edit Customization
            </Link>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Step 2 of 3: Order Review & Customer Details
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2235] tracking-tight">
              Review Your Packaging Order
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              Confirm technical parameters, review cost estimation, and input manufacturing delivery details.
            </p>
          </div>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Specifications & Customer Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Packaging Specifications Card */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#E8F6F0] text-[#159A6A] border border-[#159A6A]/20">
                      {productData.category} Packaging
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-[#0B2235] mt-1.5">{productData.name}</h2>
                  </div>
                  <img
                    src={productData.image}
                    alt={productData.name}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80'; }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[11px] text-slate-400 font-bold uppercase block mb-0.5">Order Run</span>
                    <span className="font-bold text-[#0B2235]">{(parseInt(formData.quantity) || 10000).toLocaleString()} units</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[11px] text-slate-400 font-bold uppercase block mb-0.5">Substrate Board</span>
                    <span className="font-semibold text-[#12304A]">{formData.material}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[11px] text-slate-400 font-bold uppercase block mb-0.5">Dimensions / Size</span>
                    <span className="font-semibold text-[#12304A]">{formData.size}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[11px] text-slate-400 font-bold uppercase block mb-0.5">Press Technique</span>
                    <span className="font-semibold text-[#12304A]">{formData.printing}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[11px] text-slate-400 font-bold uppercase block mb-0.5">Finishing</span>
                    <span className="font-semibold text-[#12304A]">{formData.finishing}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[11px] text-slate-400 font-bold uppercase block mb-0.5">Lamination</span>
                    <span className="font-semibold text-[#12304A]">{formData.lamination}</span>
                  </div>
                </div>

                <div className="mt-4 p-3.5 bg-[#E8F6F0]/60 border border-[#159A6A]/20 rounded-lg flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#159A6A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-[#0B2235] uppercase">Artwork Asset Status</div>
                    <div className="text-xs sm:text-sm font-semibold text-[#159A6A]">{formData.artwork}</div>
                  </div>
                </div>
              </div>

              {/* Customer Information Form */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <h2 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2">
                  <Building size={17} className="text-[#159A6A]" />
                  Company & Production Contact
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Company / Brand *</label>
                    <div className="relative">
                      <Building size={16} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={customerInfo.companyName}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Contact Officer *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        name="contactPerson"
                        required
                        value={customerInfo.contactPerson}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Corporate Email *</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Phone / WhatsApp *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        name="phone"
                        required
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <h2 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2">
                  <Truck size={17} className="text-[#159A6A]" />
                  Dispatch Logistics & Destination
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Factory / Warehouse Delivery Address *</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        name="address"
                        required
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1">Destination City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1">Shipping Method</label>
                      <select
                        name="deliveryMethod"
                        value={customerInfo.deliveryMethod}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      >
                        <option>Standard Freight (5-7 business days)</option>
                        <option>Express Cargo (2-3 business days)</option>
                        <option>Self-Pickup from BM Print Pack Facility (Lahore)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Order Notes / Production Instructions</label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Cost Breakdown & Place Order CTA */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-md sticky top-24 space-y-6">
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B2235]">Production Quotation</h3>
                  <p className="text-xs text-[#64748B]">Calculated against configured toolings and volume</p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm border-b border-slate-100 pb-5">
                  <div className="flex justify-between text-[#64748B]">
                    <span>Base Substrate Cost</span>
                    <span className="font-bold text-[#12304A]">{fmt(estimateData.matCost)}</span>
                  </div>
                  <div className="flex justify-between text-[#64748B]">
                    <span>Precision Printing Cost</span>
                    <span className="font-bold text-[#12304A]">{fmt(estimateData.printCost)}</span>
                  </div>
                  <div className="flex justify-between text-[#64748B]">
                    <span>Finishing & Coating</span>
                    <span className="font-bold text-[#12304A]">{fmt(estimateData.finishCost)}</span>
                  </div>
                  <div className="flex justify-between text-[#64748B]">
                    <span>Tooling & Cylinder Setup</span>
                    <span className="font-bold text-[#12304A]">{fmt(estimateData.setupCost)}</span>
                  </div>
                  {estimateData.designCost > 0 && (
                    <div className="flex justify-between text-[#159A6A]">
                      <span>Artwork & Pre-Press Design</span>
                      <span className="font-bold">{fmt(estimateData.designCost)}</span>
                    </div>
                  )}

                  {estimateData.discountPct > 0 && (
                    <div className="flex justify-between text-[#159A6A] font-bold pt-2 border-t border-dashed border-slate-200">
                      <span>Volume Discount ({estimateData.discountPct}%)</span>
                      <span>-{fmt(estimateData.discountAmt)}</span>
                    </div>
                  )}
                </div>

                {/* Total in Deep Navy Card */}
                <div className="bg-[#0B2235] text-white rounded-xl p-4.5 border border-[#12304A]">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-300">Estimated Total</span>
                    <span className="text-2xl font-black text-[#159A6A]">{fmt(estimateData.total)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Estimated Unit Rate</span>
                    <span className="font-bold text-white">PKR {Number(estimateData.perUnit).toFixed(2)} / unit</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-800">
                  <AlertCircle size={16} className="shrink-0 text-amber-600 mt-0.5" />
                  <p>
                    <strong>Formal Quotation Note:</strong> Technical estimators will review your exact artwork files and confirm cylinder lead times and proforma invoice before press run.
                  </p>
                </div>

                <div className="space-y-2 py-1 text-xs text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#159A6A]" />
                    <span>30+ Years Industry Quality Assurance Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#159A6A]" />
                    <span>Free pre-flight artwork proofing before plate engraving</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#159A6A] hover:bg-[#118057] text-white font-bold py-3.5 px-6 rounded-lg transition duration-150 shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Logging Order Request...</span>
                  ) : (
                    <>
                      <span>Place Order Request</span>
                      <CheckCircle2 size={17} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
