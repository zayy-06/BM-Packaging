import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { adminPricing as initialPricing } from '../../data/mockData';
import {
  DollarSign, Layers, Printer, Sparkles, Percent,
  Wrench, Save, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function AdminPricing() {
  const [pricing, setPricing] = useState(initialPricing);
  const [activeTab, setActiveTab] = useState('materials');
  const [savedNotification, setSavedNotification] = useState(false);

  const handlePriceChange = (category, index, newPrice) => {
    const updated = { ...pricing };
    updated[category][index].price = parseFloat(newPrice) || 0;
    setPricing(updated);
  };

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235] tracking-tight">
              Cost & Estimation Engine Matrix
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Configure baseline substrate rates, printing passes, tooling surcharges, and volume discount brackets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="bg-[#159A6A] hover:bg-[#118057] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition shadow-xs flex items-center gap-2"
            >
              <Save size={15} />
              <span>Save Pricing Matrix</span>
            </button>
          </div>
        </div>

        {savedNotification && (
          <div className="mb-6 p-4 bg-[#E8F6F0] border border-[#159A6A]/30 rounded-xl flex items-center gap-3 text-xs font-bold text-[#0B2235] shadow-2xs">
            <CheckCircle2 size={18} className="text-[#159A6A]" />
            <span>Pricing matrix rules saved successfully. Real-time estimate engine is now referencing active values.</span>
          </div>
        )}

        {/* Prototype Explanation Note */}
        <div className="mb-6 p-4 bg-slate-100 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-[#12304A]">
          <AlertCircle size={18} className="text-[#159A6A] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#0B2235]">Interactive Commercial Engine Simulation:</strong> In production deployment, this matrix links to raw paperboard commodity indices and polymer resin market prices. Edit rates below and click <em>Save Pricing Matrix</em>.
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E2E8F0] mb-6 gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'materials', label: 'Material Substrates', icon: Layers },
            { id: 'printing', label: 'Printing Presses', icon: Printer },
            { id: 'finishing', label: 'Surface Finishing', icon: Sparkles },
            { id: 'setup', label: 'Tooling & Cylinders', icon: Wrench },
            { id: 'discounts', label: 'Volume Discounts', icon: Percent },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'border-[#159A6A] text-[#0B2235]'
                    : 'border-transparent text-slate-500 hover:text-[#0B2235]'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: MATERIALS */}
        {activeTab === 'materials' && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0B2235]">Board & Barrier Film Base Rates</h3>
                <p className="text-xs text-[#64748B]">Unit base price calculated per packaging item</p>
              </div>
              <span className="text-xs font-semibold text-slate-400">{pricing.materials.length} substrates active</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#12304A]">
                    <th className="py-3 px-6">Material Description</th>
                    <th className="py-3 px-6">Classification</th>
                    <th className="py-3 px-6">Billing Unit</th>
                    <th className="py-3 px-6">Unit Price (PKR)</th>
                    <th className="py-3 px-6 text-right">Adjustment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {pricing.materials.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0B2235]">{m.name}</td>
                      <td className="py-3.5 px-6">
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-[#12304A]">
                          {m.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-xs text-slate-500">{m.unit}</td>
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400 font-bold">PKR</span>
                          <input
                            type="number"
                            step="0.1"
                            value={m.price}
                            onChange={(e) => handlePriceChange('materials', idx, e.target.value)}
                            className="w-24 px-2 py-1 text-sm border border-[#E2E8F0] rounded-lg font-bold text-[#0B2235] focus:outline-none focus:ring-1 focus:ring-[#159A6A]"
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right text-xs text-[#159A6A] font-semibold">
                        Live Sync
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRINTING */}
        {activeTab === 'printing' && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0B2235]">Press Technology Unit Surcharges</h3>
                <p className="text-xs text-[#64748B]">Rotogravure, sheet-fed offset, and flexographic press unit charges</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#12304A]">
                    <th className="py-3 px-6">Printing Process</th>
                    <th className="py-3 px-6">Measurement Unit</th>
                    <th className="py-3 px-6">Rate (PKR)</th>
                    <th className="py-3 px-6 text-right">Standard Ink Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {pricing.printing.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0B2235]">{p.type}</td>
                      <td className="py-3.5 px-6 text-xs text-slate-500">{p.unit}</td>
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400 font-bold">PKR</span>
                          <input
                            type="number"
                            step="0.1"
                            value={p.price}
                            onChange={(e) => handlePriceChange('printing', idx, e.target.value)}
                            className="w-24 px-2 py-1 text-sm border border-[#E2E8F0] rounded-lg font-bold text-[#0B2235] focus:outline-none focus:ring-1 focus:ring-[#159A6A]"
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right text-xs text-[#159A6A] font-bold">
                        CMYK / Spot Pantone
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: FINISHING */}
        {activeTab === 'finishing' && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0B2235]">Surface Embellishments & Treatments</h3>
                <p className="text-xs text-[#64748B]">Thermal lamination, spot UV varnishes, embossing, and foil stamping</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#12304A]">
                    <th className="py-3 px-6">Finish Style</th>
                    <th className="py-3 px-6">Unit</th>
                    <th className="py-3 px-6">Unit Cost (PKR)</th>
                    <th className="py-3 px-6 text-right">Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {pricing.finishing.map((f, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0B2235]">{f.type}</td>
                      <td className="py-3.5 px-6 text-xs text-slate-500">{f.unit}</td>
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400 font-bold">PKR</span>
                          <input
                            type="number"
                            step="0.05"
                            value={f.price}
                            onChange={(e) => handlePriceChange('finishing', idx, e.target.value)}
                            className="w-24 px-2 py-1 text-sm border border-[#E2E8F0] rounded-lg font-bold text-[#0B2235] focus:outline-none focus:ring-1 focus:ring-[#159A6A]"
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right text-xs text-slate-500">
                        Inline Automated
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SETUP */}
        {activeTab === 'setup' && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0B2235]">Tooling, Dies & Pre-Press Setups</h3>
                <p className="text-xs text-[#64748B]">One-time fixed prepress, gravure cylinder engraving, and die-cutting charges</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#12304A]">
                    <th className="py-3 px-6">Tooling Step</th>
                    <th className="py-3 px-6">Setup Cost (PKR)</th>
                    <th className="py-3 px-6 text-right">Applicability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {pricing.setup.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0B2235]">{s.item}</td>
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400 font-bold">PKR</span>
                          <input
                            type="number"
                            value={s.price}
                            onChange={(e) => handlePriceChange('setup', idx, e.target.value)}
                            className="w-28 px-2 py-1 text-sm border border-[#E2E8F0] rounded-lg font-bold text-[#0B2235] focus:outline-none focus:ring-1 focus:ring-[#159A6A]"
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right text-xs text-slate-500">
                        First Batch Run Only
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: DISCOUNTS */}
        {activeTab === 'discounts' && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0B2235]">Volume Scale Discount Matrix</h3>
                <p className="text-xs text-[#64748B]">Automated discounts applied on commercial run volumes</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#12304A]">
                    <th className="py-3 px-6">Order Run Tier</th>
                    <th className="py-3 px-6">Discount Rate</th>
                    <th className="py-3 px-6 text-right">Client Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {pricing.discounts.map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0B2235]">{d.qty} units</td>
                      <td className="py-3.5 px-6">
                        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#E8F6F0] text-[#159A6A]">
                          {d.discount}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right text-xs text-slate-500">
                        High-speed press efficiency rebate
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
