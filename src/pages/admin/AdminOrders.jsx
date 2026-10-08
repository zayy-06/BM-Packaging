import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { useApp } from '../../context/AppContext';
import { statusColors, orderStatuses } from '../../data/mockData';
import {
  ShoppingCart, Search, Filter, Eye
} from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      (o.customer && o.customer.toLowerCase().includes(search.toLowerCase())) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235] tracking-tight">
              Order Fulfillment Queue
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Review and monitor commercial client orders across technical prepress, cylinder engraving, and dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#E8F6F0] text-[#159A6A] border border-[#159A6A]/20">
              Total Production Runs: {orders.length}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Client, or Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm border border-[#E2E8F0] rounded-lg text-[#12304A] focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={15} className="text-slate-400 shrink-0" />
            <span className="text-xs text-[#64748B] font-semibold">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-[#E2E8F0] rounded-lg px-3 py-1.5 bg-slate-50 font-bold text-[#12304A] focus:outline-none"
            >
              <option value="All">All Statuses ({orders.length})</option>
              {orderStatuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#12304A]">
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Client / Brand</th>
                  <th className="py-3.5 px-6">Packaging Specification</th>
                  <th className="py-3.5 px-6">Batch Size</th>
                  <th className="py-3.5 px-6">Quoted Amount</th>
                  <th className="py-3.5 px-6">Order Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredOrders.map((o) => {
                  const statusClass = statusColors[o.status] || 'bg-slate-100 text-slate-700';
                  return (
                    <tr key={o.id} className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-mono font-bold text-[#159A6A]">
                        <Link to={`/admin/orders/${o.id}`} className="hover:underline">
                          {o.id}
                        </Link>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#0B2235]">
                        {o.customer || 'Commercial Client'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-[#12304A] font-semibold">{o.product}</div>
                        <div className="text-xs text-slate-400">{o.material}</div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-[#12304A]">
                        {o.quantity?.toLocaleString()} pcs
                      </td>
                      <td className="py-4 px-6 font-black text-[#0B2235]">
                        PKR {o.amount?.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {o.date}
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border-0 focus:ring-1 focus:ring-[#159A6A] cursor-pointer ${statusClass}`}
                        >
                          {orderStatuses.map(st => (
                            <option key={st} value={st} className="bg-white text-slate-900 font-normal">
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/admin/orders/${o.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12304A] hover:text-[#159A6A] bg-slate-100 hover:bg-[#E8F6F0] px-3 py-1.5 rounded-md transition"
                        >
                          <Eye size={13} />
                          <span>View Details</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <ShoppingCart size={36} className="mx-auto mb-2 opacity-30 text-[#12304A]" />
              <p className="text-xs">No orders match your filter criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
