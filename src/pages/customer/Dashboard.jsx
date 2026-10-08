import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { statusColors } from '../../data/mockData';
import {
  Package, Clock, CheckCircle2, ArrowUpRight,
  RotateCcw, FileText, User, Building, Mail, Phone,
  PlusCircle, Search, Filter, ShieldCheck
} from 'lucide-react';
import Footer from '../../components/Footer';

export default function Dashboard() {
  const navigate = useNavigate();
  const { orders, isLoggedIn } = useApp();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'quotations', 'profile'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Customer Profile mock data
  const profile = {
    company: 'NatureBrew Organics Ltd.',
    contact: 'Zubair Ahmed',
    email: 'purchasing@naturebrew.pk',
    phone: '+92 321 8849201',
    taxId: 'NTN-894721-0',
    address: 'Plot 12, Industrial Triangle, Kahuta Road, Islamabad',
    accountTier: 'Verified Enterprise Partner',
    memberSince: 'March 2021'
  };

  const quotations = [
    {
      id: 'QTN-8821',
      date: '2026-10-04',
      item: 'Custom Holographic Foil Pesticide Sleeves',
      qty: 25000,
      estTotal: 145000,
      validUntil: '2026-10-25',
      status: 'Active'
    },
    {
      id: 'QTN-8794',
      date: '2026-09-18',
      item: 'Matte Black Embossed Perfume Rigid Box',
      qty: 3000,
      estTotal: 84000,
      validUntil: '2026-10-18',
      status: 'Active'
    },
    {
      id: 'QTN-8512',
      date: '2026-08-10',
      item: 'Kraft Stand-up Pouch with Clear Oval Window',
      qty: 50000,
      estTotal: 215000,
      validUntil: '2026-09-10',
      status: 'Expired'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleReorder = () => {
    navigate(`/customize`);
  };

  const pendingCount = orders.filter(o => o.status === 'Pending' || o.status === 'Under Review').length;
  const inProdCount = orders.filter(o => o.status === 'In Production').length;
  const readyCompletedCount = orders.filter(o => o.status === 'Completed' || o.status === 'Ready').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <div>
        {/* Top Header Banner: Deep Navy (#0B2235 - #12304A) */}
        <div className="bg-[#0B2235] text-white py-10 px-4 sm:px-6 border-b border-[#12304A]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#12304A] text-[#159A6A] text-xs font-bold px-3 py-1 rounded-full border border-[#159A6A]/40 mb-2">
                <ShieldCheck size={14} /> Client Portal & Manufacturing Queue
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {profile.contact}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                {profile.company} · <span className="text-[#159A6A] font-semibold">{profile.accountTier}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="bg-[#12304A] hover:bg-slate-800 text-slate-200 border border-[#E2E8F0]/20 font-bold px-4 py-2.5 rounded-lg transition text-xs flex items-center gap-1.5"
                >
                  <User size={14} className="text-[#159A6A]" />
                  <span>Switch / Sign In</span>
                </Link>
              )}
              <Link
                to="/customize"
                className="bg-[#159A6A] hover:bg-[#118057] text-white font-bold px-5 py-2.5 rounded-lg transition text-xs sm:text-sm flex items-center gap-2 shadow-xs"
              >
                <PlusCircle size={17} />
                <span>New Packaging Order</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In Review / Pending</div>
                <div className="text-2xl font-extrabold text-[#0B2235]">{pendingCount} Runs</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 bg-[#12304A]/5 text-[#12304A] rounded-xl flex items-center justify-center shrink-0">
                <Package size={22} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Press Runs</div>
                <div className="text-2xl font-extrabold text-[#0B2235]">{inProdCount} Active</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E8F6F0] text-[#159A6A] rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ready / Dispatched</div>
                <div className="text-2xl font-extrabold text-[#0B2235]">{readyCompletedCount} Delivered</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#E2E8F0] mb-6 gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
                activeTab === 'orders'
                  ? 'border-[#159A6A] text-[#0B2235]'
                  : 'border-transparent text-slate-500 hover:text-[#0B2235]'
              }`}
            >
              Order History ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('quotations')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
                activeTab === 'quotations'
                  ? 'border-[#159A6A] text-[#0B2235]'
                  : 'border-transparent text-slate-500 hover:text-[#0B2235]'
              }`}
            >
              Quotations & Inquiries ({quotations.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
                activeTab === 'profile'
                  ? 'border-[#159A6A] text-[#0B2235]'
                  : 'border-transparent text-slate-500 hover:text-[#0B2235]'
              }`}
            >
              Company Profile & Billing
            </button>
          </div>

          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Filter Bar */}
              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-72">
                  <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by Order ID or Product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-[#E2E8F0] rounded-lg text-[#12304A] focus:outline-none focus:ring-2 focus:ring-[#159A6A]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter size={15} className="text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-500">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-xs border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 bg-slate-50 font-bold text-[#12304A] focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="In Production">In Production</option>
                    <option value="Ready">Ready</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Order List Table */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#12304A]">
                        <th className="py-3.5 px-4">Order ID</th>
                        <th className="py-3.5 px-4">Packaging Specification</th>
                        <th className="py-3.5 px-4">Batch Run</th>
                        <th className="py-3.5 px-4">Quoted Amount</th>
                        <th className="py-3.5 px-4">Date Placed</th>
                        <th className="py-3.5 px-4">Live Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                      {filteredOrders.map((order) => {
                        const statusClass = statusColors[order.status] || 'bg-slate-100 text-slate-700';
                        return (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-4 px-4 font-mono font-bold text-[#159A6A]">
                              <Link to={`/order-details/${order.id}`} className="hover:underline flex items-center gap-1">
                                {order.id}
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-[#0B2235]">{order.product}</div>
                              <div className="text-xs text-[#64748B]">{order.material} · {order.size}</div>
                            </td>
                            <td className="py-4 px-4 font-semibold text-[#12304A]">
                              {order.quantity?.toLocaleString()} units
                            </td>
                            <td className="py-4 px-4 font-extrabold text-[#0B2235]">
                              PKR {order.amount?.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-xs text-slate-500">
                              {order.date}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${statusClass}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={handleReorder}
                                  className="inline-flex items-center gap-1 text-xs font-bold text-[#159A6A] hover:bg-[#159A6A] hover:text-white bg-[#E8F6F0] px-2.5 py-1.5 rounded-md transition"
                                  title="Reorder this packaging with same specs"
                                >
                                  <RotateCcw size={13} />
                                  <span>Reorder</span>
                                </button>
                                <Link
                                  to={`/order-details/${order.id}`}
                                  className="inline-flex items-center gap-1 text-xs font-bold text-[#12304A] hover:text-[#159A6A] border border-[#E2E8F0] hover:border-[#159A6A] px-2.5 py-1.5 rounded-md transition bg-white"
                                >
                                  <span>Details</span>
                                  <ArrowUpRight size={13} />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredOrders.length === 0 && (
                  <div className="py-12 text-center text-slate-400">
                    <Package size={36} className="mx-auto mb-2 opacity-30 text-[#12304A]" />
                    <p className="text-xs">No packaging orders match your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: QUOTATIONS */}
          {activeTab === 'quotations' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0B2235]">Recent Packaging Quotations</h3>
                    <p className="text-xs text-[#64748B]">Technical estimates issued by BM Print Pack engineering team</p>
                  </div>
                  <Link
                    to="/customize"
                    className="text-xs font-bold bg-[#159A6A] hover:bg-[#118057] text-white px-3.5 py-2 rounded-lg transition"
                  >
                    Request New Quote
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {quotations.map(q => (
                    <div key={q.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-bold text-[#0B2235]">{q.id}</span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            q.status === 'Active' ? 'bg-[#E8F6F0] text-[#159A6A]' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {q.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-[#0B2235] text-sm">{q.item}</h4>
                        <div className="text-xs text-slate-500 mt-1 flex gap-4">
                          <span>Batch: {q.qty.toLocaleString()} pcs</span>
                          <span>Issued: {q.date}</span>
                          <span>Valid: {q.validUntil}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="text-right">
                          <div className="text-[11px] text-slate-400 uppercase font-bold">Estimated Cost</div>
                          <div className="text-base font-black text-[#0B2235]">PKR {q.estTotal.toLocaleString()}</div>
                        </div>
                        <Link
                          to="/customize"
                          className="bg-[#12304A] hover:bg-[#0B2235] text-white font-bold text-xs px-3.5 py-2 rounded-lg transition shadow-2xs"
                        >
                          Convert to Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <h3 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2">
                  <Building size={17} className="text-[#159A6A]" />
                  Corporate Account Details
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Company Name</span>
                    <span className="font-bold text-[#0B2235]">{profile.company}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Tax Identification (NTN)</span>
                    <span className="font-bold text-[#0B2235]">{profile.taxId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Commercial Tier</span>
                    <span className="font-bold text-[#159A6A]">{profile.accountTier}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Client Partner Since</span>
                    <span className="font-bold text-[#0B2235]">{profile.memberSince}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <h3 className="text-base font-bold text-[#0B2235] mb-4 flex items-center gap-2">
                  <User size={17} className="text-[#159A6A]" />
                  Designated Procurement Contact
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Contact Officer</span>
                    <span className="font-bold text-[#0B2235]">{profile.contact}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Corporate Email</span>
                    <span className="font-bold text-[#0B2235]">{profile.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Phone Number</span>
                    <span className="font-bold text-[#0B2235]">{profile.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Registered Plant Address</span>
                    <span className="font-semibold text-[#0B2235] text-right max-w-xs">{profile.address}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
