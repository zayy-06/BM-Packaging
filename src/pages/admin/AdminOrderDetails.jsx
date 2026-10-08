import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { useApp } from '../../context/AppContext';
import { statusColors, orderStatuses } from '../../data/mockData';
import {
  ArrowLeft, CheckCircle2, Clock, Package, Printer,
  Layers, Maximize2, Sparkles, Building, User, Mail,
  Phone, MapPin, Truck, Save, FileText
} from 'lucide-react';

export default function AdminOrderDetails() {
  const { orderId } = useParams();
  const { orders, updateOrderStatus } = useApp();

  const order = orders.find(o => o.id === orderId) || orders[0];
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [internalNotes, setInternalNotes] = useState('Plate cylinder engraved for 8-color press. Substrate approved by QA lab.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    updateOrderStatus(order.id, currentStatus);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const statusClass = statusColors[currentStatus] || 'bg-slate-100 text-slate-700';

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Breadcrumb Header */}
          <div className="flex items-center justify-between mb-6">
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#12304A] hover:text-[#159A6A] transition"
          >
            <ArrowLeft size={16} /> Back to Orders Queue
          </Link>

          <span className="text-xs font-mono font-bold text-[#0B2235] bg-white border border-[#E2E8F0] px-3 py-1 rounded-md shadow-2xs">
            {order.id}
          </span>
        </div>

        {savedSuccess && (
          <div className="mb-6 p-4 bg-[#E8F6F0] border border-[#159A6A]/30 rounded-xl flex items-center gap-3 text-xs font-bold text-[#0B2235] shadow-2xs">
            <CheckCircle2 size={18} className="text-[#159A6A]" />
            <span>Order status updated to "{currentStatus}" successfully! Changes reflect on customer portal immediately.</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-2xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${statusClass}`}>
                {currentStatus}
              </span>
              <span className="text-xs text-slate-300">|</span>
              <span className="text-xs text-slate-500">Submitted on {order.date}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235]">{order.product}</h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Client Account: <strong className="text-[#0B2235]">{order.customer || 'Commercial Client'}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-xl w-full sm:w-auto">
            <div className="text-xs font-bold text-slate-400 uppercase">Total Quoted Value</div>
            <div className="text-2xl sm:text-3xl font-black text-[#0B2235]">
              PKR {order.amount?.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">
              {order.quantity?.toLocaleString()} units (approx PKR {((order.amount || 50000) / (order.quantity || 10000)).toFixed(2)}/unit)
            </div>
          </div>
        </div>

        {/* Status Control Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs mb-8">
          <form onSubmit={handleStatusUpdate} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#0B2235] flex items-center gap-2">
                <Clock size={17} className="text-[#159A6A]" />
                Update Manufacturing Lifecycle Status
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Adjusting this status immediately updates the customer order tracker timeline.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="text-xs font-bold border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 bg-slate-50 text-[#12304A] focus:outline-none focus:ring-2 focus:ring-[#159A6A]"
              >
                {orderStatuses.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-[#159A6A] hover:bg-[#118057] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition shadow-xs flex items-center gap-1.5"
              >
                <Save size={15} />
                <span>Apply Status</span>
              </button>
            </div>
          </form>
        </div>

        {/* Main Grid: Specifications & Client Logistics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Packaging Specs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
              <h3 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2">
                <Package size={17} className="text-[#159A6A]" />
                Manufacturing Parameters
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                    <Layers size={13} className="text-[#159A6A]" /> Substrate
                  </div>
                  <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.material}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                    <Maximize2 size={13} className="text-[#159A6A]" /> Dieline Format
                  </div>
                  <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.size}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                    <Printer size={13} className="text-[#159A6A]" /> Press Line
                  </div>
                  <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.printing}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                    <Sparkles size={13} className="text-[#159A6A]" /> Embellishment
                  </div>
                  <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.finishing}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                    <Package size={13} className="text-[#159A6A]" /> Batch Count
                  </div>
                  <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.quantity?.toLocaleString()} pcs</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                    <Truck size={13} className="text-[#159A6A]" /> Target Dispatch
                  </div>
                  <div className="font-bold text-[#0B2235] text-xs sm:text-sm">{order.estimatedDelivery || '12-14 business days'}</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#E8F6F0]/60 border border-[#159A6A]/20 rounded-lg">
                <div className="text-xs font-bold text-[#0B2235] uppercase">Artwork Asset State</div>
                <div className="text-xs sm:text-sm font-semibold text-[#159A6A] mt-0.5">{order.artwork}</div>
              </div>
            </div>

            {/* Plant Operator Notes */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
              <h3 className="text-base font-bold text-[#0B2235] mb-2 flex items-center gap-2">
                <FileText size={17} className="text-[#159A6A]" />
                Floor Shift Supervisor Remarks
              </h3>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 border border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#159A6A] focus:outline-none text-[#12304A]"
              />
              <button
                onClick={() => {
                  setSavedSuccess(true);
                  setTimeout(() => setSavedSuccess(false), 2000);
                }}
                className="mt-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#12304A] px-3.5 py-1.5 rounded-md transition"
              >
                Save Supervisor Note
              </button>
            </div>
          </div>

          {/* Client & Dispatch Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
              <h3 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2">
                <Building size={17} className="text-[#159A6A]" />
                Customer Account Details
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#12304A]">
                <div className="flex items-start gap-2.5">
                  <User size={15} className="text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-slate-400 text-xs block">Contact Officer</span>
                    <strong className="text-[#0B2235]">{order.contactPerson || 'Zubair Ahmed'}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail size={15} className="text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-slate-400 text-xs block">Corporate Email</span>
                    <strong className="text-[#0B2235]">{order.email || 'purchasing@naturebrew.pk'}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone size={15} className="text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-slate-400 text-xs block">Phone</span>
                    <strong className="text-[#0B2235]">{order.phone || '+92 321 8849201'}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-slate-400 text-xs block">Delivery Destination</span>
                    <span className="text-[#64748B]">
                      {order.address || 'Plot 12, Industrial Triangle, Kahuta Road, Islamabad'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Truck size={15} className="text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-slate-400 text-xs block">Freight Carrier</span>
                    <span className="font-semibold text-[#0B2235]">
                      {order.deliveryMethod || 'Standard Freight (5-7 business days)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
