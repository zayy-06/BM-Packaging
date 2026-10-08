import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { statusColors } from '../../data/mockData';
import {
  ArrowLeft, Package, Calendar, Clock, CheckCircle2,
  FileText, ShieldCheck, Printer, Layers, Maximize2,
  Sparkles, Download, Phone
} from 'lucide-react';
import Footer from '../../components/Footer';

const timelineSteps = [
  { id: 1, title: 'Order Submitted', desc: 'Custom packaging specs & quantity submitted online.' },
  { id: 2, title: 'Technical Pre-Press Review', desc: 'Dieline check, bleed verification, and ink approval.' },
  { id: 3, title: 'In Production', desc: 'Plate mounting, press setup, gravure/offset printing.' },
  { id: 4, title: 'Finishing & Quality Inspection', desc: 'Lamination, foil stamping, die-cutting & QA lab test.' },
  { id: 5, title: 'Ready & Dispatched', desc: 'Packaged in heavy-duty shipper cartons for freight delivery.' },
];

export default function OrderDetails() {
  const { orderId } = useParams();
  const { orders } = useApp();

  const order = orders.find(o => o.id === orderId) || orders[0];

  const getStepProgress = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Under Review':
      case 'Reviewed':
      case 'Approved': return 2;
      case 'In Production': return 3;
      case 'Ready': return 4;
      case 'Completed':
      case 'Delivered': return 5;
      default: return 1;
    }
  };

  const currentStep = getStepProgress(order.status);
  const statusClass = statusColors[order.status] || 'bg-slate-100 text-slate-700';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <div>
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#12304A] hover:text-[#159A6A] transition-colors">
              <ArrowLeft size={16} /> Back to Client Portal
            </Link>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-400">Order ID:</span>
              <span className="font-mono font-bold text-xs text-[#0B2235] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
                {order.id}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Top Banner */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-2xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${statusClass}`}>
                  {order.status}
                </span>
                <span className="text-xs text-slate-300">|</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar size={13} /> Placed on {order.date}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235] tracking-tight">{order.product}</h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">Client Account: <strong className="text-[#0B2235]">{order.customer || 'NatureBrew Organics Ltd.'}</strong></p>
            </div>

            <div className="text-left sm:text-right w-full sm:w-auto p-4 sm:p-0 bg-slate-50 sm:bg-transparent rounded-xl">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quoted Total</div>
              <div className="text-2xl sm:text-3xl font-black text-[#0B2235]">
                PKR {order.amount?.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {(order.quantity || 10000).toLocaleString()} units · Approx PKR {((order.amount || 50000) / (order.quantity || 10000)).toFixed(2)} / unit
              </div>
            </div>
          </div>

          {/* Visual Order Progress Timeline */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-2xs mb-8">
            <h2 className="text-base font-bold text-[#0B2235] mb-6 flex items-center gap-2">
              <Clock size={17} className="text-[#159A6A]" />
              Production & Manufacturing Timeline
            </h2>

            {/* Stepper Bar */}
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-6 z-0" />
              <div
                className="hidden lg:block absolute top-1/2 left-4 h-1 bg-[#159A6A] -translate-y-6 z-0 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (timelineSteps.length - 1)) * 96}%` }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
                {timelineSteps.map((step) => {
                  const isDone = step.id < currentStep;
                  const isCurrent = step.id === currentStep;
                  return (
                    <div
                      key={step.id}
                      className={`p-4 rounded-xl border transition ${
                        isCurrent
                          ? 'border-[#159A6A] bg-[#E8F6F0]/50 shadow-2xs'
                          : isDone
                          ? 'border-slate-200 bg-slate-50/50'
                          : 'border-slate-100 bg-slate-50/30 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isDone
                              ? 'bg-[#159A6A] text-white'
                              : isCurrent
                              ? 'bg-[#12304A] text-white ring-4 ring-[#159A6A]/20'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isDone ? <CheckCircle2 size={16} /> : step.id}
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Step 0{step.id}
                        </span>
                      </div>
                      <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{step.title}</div>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <h3 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2">
                  <Package size={17} className="text-[#159A6A]" />
                  Manufacturing Parameters
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
                      <Layers size={13} className="text-[#159A6A]" /> Substrate
                    </div>
                    <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.material}</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
                      <Maximize2 size={13} className="text-[#159A6A]" /> Dieline Format
                    </div>
                    <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.size}</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
                      <Printer size={13} className="text-[#159A6A]" /> Press Line
                    </div>
                    <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.printing}</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
                      <Sparkles size={13} className="text-[#159A6A]" /> Embellishment
                    </div>
                    <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.finishing}</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
                      <Package size={13} className="text-[#159A6A]" /> Batch Count
                    </div>
                    <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.quantity?.toLocaleString()} pcs</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
                      <Calendar size={13} className="text-[#159A6A]" /> Target Dispatch
                    </div>
                    <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.estimatedDelivery || '10-14 days'}</div>
                  </div>
                </div>
              </div>

              {/* Artwork Section */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <h3 className="text-base font-bold text-[#0B2235] mb-3 flex items-center gap-2">
                  <FileText size={17} className="text-[#159A6A]" />
                  Artwork & Dieline Blueprint Status
                </h3>
                <div className="p-4 bg-[#E8F6F0]/60 border border-[#159A6A]/20 rounded-lg flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Requirement Registered</div>
                    <div className="text-sm font-bold text-[#0B2235] mt-0.5">{order.artwork}</div>
                    <p className="text-xs text-[#64748B] mt-1.5">
                      Pre-press digital PDF proof generated with calibrated CMYK and spot-color layers.
                    </p>
                  </div>
                  <button className="shrink-0 bg-white hover:bg-slate-50 text-[#12304A] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition">
                    <Download size={13} className="text-[#159A6A]" /> Dieline PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar actions & contact: Deep Navy */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <h4 className="font-bold text-[#0B2235] text-sm mb-3">Order Documentation</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between text-xs p-3 rounded-lg border border-[#E2E8F0] hover:border-[#159A6A] hover:bg-slate-50 font-semibold text-[#12304A] transition">
                    <span className="flex items-center gap-2">
                      <FileText size={14} className="text-[#159A6A]" /> Proforma Quotation
                    </span>
                    <Download size={13} className="text-slate-400" />
                  </button>
                  <button className="w-full flex items-center justify-between text-xs p-3 rounded-lg border border-[#E2E8F0] hover:border-[#159A6A] hover:bg-slate-50 font-semibold text-[#12304A] transition">
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-[#159A6A]" /> ISO QA Spec Sheet
                    </span>
                    <Download size={13} className="text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="bg-[#0B2235] text-white rounded-xl p-6 shadow-sm border border-[#12304A]">
                <h4 className="font-bold text-base mb-1">Direct Plant Production Desk</h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Have questions regarding cylinder mounting schedules or need emergency priority dispatch? Contact the shift engineer.
                </p>
                <div className="p-3 bg-[#12304A] rounded-lg mb-4 text-xs space-y-1 border border-[#12304A]">
                  <div className="font-bold text-white">Engr. Usman Malik</div>
                  <div className="text-[#159A6A] font-semibold">Plant Operations Manager</div>
                  <div className="text-slate-300">+92 300 1234567 ext 204</div>
                </div>
                <Link
                  to="/contact"
                  className="w-full bg-[#159A6A] hover:bg-[#118057] text-white font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 transition"
                >
                  <Phone size={14} /> Contact Production Desk
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
