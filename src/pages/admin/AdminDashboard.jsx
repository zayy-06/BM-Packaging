import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { adminStats, monthlyOrderData, categoryData, statusColors } from '../../data/mockData';
import AdminSidebar from '../../components/AdminSidebar';
import {
  Package, ShoppingCart, Clock, CheckCircle2, Users, FileText,
  TrendingUp, ArrowUpRight, DollarSign, Calendar
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';

export default function AdminDashboard() {
  const { orders } = useApp();

  const statCards = [
    { label: 'Total Orders', value: adminStats.totalOrders, icon: ShoppingCart, color: 'text-[#12304A]', bg: 'bg-slate-100' },
    { label: 'Pending Review', value: adminStats.pendingOrders, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Factory Runs', value: adminStats.inProduction, icon: Package, color: 'text-[#12304A]', bg: 'bg-[#12304A]/5' },
    { label: 'Completed Deliveries', value: adminStats.completedOrders, icon: CheckCircle2, color: 'text-[#159A6A]', bg: 'bg-[#E8F6F0]' },
    { label: 'Corporate Clients', value: adminStats.totalCustomers, icon: Users, color: 'text-[#12304A]', bg: 'bg-slate-100' },
    { label: 'Pending Quotations', value: adminStats.pendingQuotations, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235] tracking-tight">
              Executive Production Console
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              BM Print Pack · Real-time operational metrics & commercial run monitoring
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#12304A] flex items-center gap-1.5 shadow-2xs">
              <Calendar size={13} className="text-[#159A6A]" /> FY 2026 Production Cycle
            </span>
            <Link
              to="/admin/orders"
              className="bg-[#159A6A] hover:bg-[#118057] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-2xs"
            >
              Manage Orders Queue
            </Link>
          </div>
        </div>

        {/* 6 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-white p-4.5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 ${card.bg} ${card.color} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon size={16} />
                  </div>
                  <TrendingUp size={13} className="text-[#159A6A]" />
                </div>
                <div className="text-2xl font-black text-[#0B2235]">{card.value}</div>
                <div className="text-[11px] font-bold text-slate-400 mt-0.5 line-clamp-1">{card.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Revenue & Run Volume Trend */}
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-[#0B2235]">Monthly Manufacturing Volume & Revenue</h3>
                <p className="text-xs text-[#64748B]">Gross commercial manufacturing turnover (PKR)</p>
              </div>
              <span className="text-xs font-bold text-[#159A6A] bg-[#E8F6F0] px-2.5 py-1 rounded border border-[#159A6A]/20">
                +18.4% YoY Growth
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyOrderData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#159A6A" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#159A6A" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    formatter={(value, name) => [
                      name === 'revenue' ? `PKR ${value.toLocaleString()}` : `${value} runs`,
                      name === 'revenue' ? 'Revenue' : 'Orders'
                    ]}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', borderColor: '#e2e8f0', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#159A6A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Share Distribution */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#0B2235]">Output by Sector</h3>
              <p className="text-xs text-[#64748B] mb-4">Volume distribution across client sectors</p>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(v) => [`${v}% share`, 'Volume']} />
                    <Bar dataKey="value" fill="#12304A" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-[#64748B] flex justify-between">
              <span>Top Output: <strong className="text-[#0B2235]">Cosmetics (32%)</strong></span>
              <span>Highest Growth: <strong className="text-[#159A6A]">Food Pouches</strong></span>
            </div>
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#0B2235]">Active Commercial Orders</h3>
              <p className="text-xs text-[#64748B]">Real-time queue synchronized with client submissions</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-[#159A6A] hover:text-[#118057] flex items-center gap-1"
            >
              <span>View Full Queue ({orders.length})</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#12304A]">
                  <th className="py-3 px-6">Order ID</th>
                  <th className="py-3 px-6">Client Brand</th>
                  <th className="py-3 px-6">Specification</th>
                  <th className="py-3 px-6">Batch Run</th>
                  <th className="py-3 px-6">Quoted Amount</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {orders.slice(0, 5).map((order) => {
                  const statusClass = statusColors[order.status] || 'bg-slate-100 text-slate-700';
                  return (
                    <tr key={order.id} className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-mono font-bold text-[#159A6A]">{order.id}</td>
                      <td className="py-4 px-6 font-bold text-[#0B2235]">{order.customer || 'Commercial Client'}</td>
                      <td className="py-4 px-6">{order.product}</td>
                      <td className="py-4 px-6 font-medium">{order.quantity?.toLocaleString()} pcs</td>
                      <td className="py-4 px-6 font-black text-[#0B2235]">PKR {order.amount?.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${statusClass}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="text-xs font-bold text-[#12304A] hover:text-[#159A6A] hover:underline"
                        >
                          Details & Status
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
