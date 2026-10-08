import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { adminClients as initialClients } from '../../data/mockData';
import {
  Users, Search, Plus, Building2, Phone, Mail, MapPin,
  CheckCircle2, Clock, AlertCircle, Eye, X, Filter, Download
} from 'lucide-react';

export default function AdminCustomers() {
  const [clients, setClients] = useState(initialClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Client Form State
  const [newClient, setNewClient] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: 'Food',
    location: '',
    tier: 'Standard Corporate',
    status: 'Active'
  });

  const industries = ['All', 'Food', 'Cosmetic', 'Pesticide', 'Pharmaceutical', 'General'];

  const filteredClients = clients.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.contactPerson || !newClient.email) return;

    const created = {
      id: clients.length + 1,
      ...newClient,
      ordersCount: 0,
      totalSpent: 'PKR 0',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setClients([created, ...clients]);
    setIsAddModalOpen(false);
    setNewClient({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      industry: 'Food',
      location: '',
      tier: 'Standard Corporate',
      status: 'Active'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-[#E8F6F0] text-[#159A6A] border-[#159A6A]/20';
      case 'Pending KYC':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Inactive':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-[#E2E8F0] px-6 py-5 sticky top-0 z-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1 font-medium">
                <span>Admin Console</span>
                <span>/</span>
                <span className="text-[#12304A] font-semibold">Corporate Accounts</span>
              </div>
              <h1 className="text-2xl font-black text-[#0B2235] tracking-tight">
                Corporate Clients & Brand Partners
              </h1>
              <p className="text-xs text-[#64748B] mt-0.5">
                Manage commercial client accounts, credit terms, sector classifications, and order histories.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#159A6A] hover:bg-[#12835a] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-sm"
              >
                <Plus size={16} />
                <span>Add Corporate Client</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto space-y-6">
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#64748B]">Total Clients</span>
                <div className="w-8 h-8 rounded-lg bg-[#E8F6F0] flex items-center justify-center text-[#159A6A]">
                  <Users size={16} />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0B2235]">{clients.length}</div>
              <div className="text-[11px] text-[#159A6A] font-semibold mt-1">Enterprise B2B Accounts</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#64748B]">Active Accounts</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#12304A]">
                  <CheckCircle2 size={16} />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0B2235]">
                {clients.filter(c => c.status === 'Active').length}
              </div>
              <div className="text-[11px] text-[#64748B] font-semibold mt-1">Verified with Active Orders</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#64748B]">Industrial Sectors</span>
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700">
                  <Building2 size={16} />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0B2235]">5</div>
              <div className="text-[11px] text-[#64748B] font-semibold mt-1">Pesticide, Food, Pharma, Cosmetic</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#64748B]">Gross Invoiced</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#159A6A]">
                  <CheckCircle2 size={16} />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0B2235]">PKR 27.0M</div>
              <div className="text-[11px] text-[#159A6A] font-semibold mt-1">Contract Lifetime Value</div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search by company name, contact person, email, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:border-[#159A6A] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-semibold">
                  <Filter size={14} />
                  <span>Status:</span>
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-xs border border-[#E2E8F0] rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#159A6A] text-[#12304A] font-semibold"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending KYC">Pending KYC</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Industry Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
              <span className="text-[11px] font-bold text-[#64748B] shrink-0 mr-1">Industry:</span>
              {industries.map(ind => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`text-xs px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                    selectedIndustry === ind
                      ? 'bg-[#12304A] text-white shadow-2xs'
                      : 'bg-slate-100 text-[#64748B] hover:bg-slate-200'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#12304A] text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Company / Partner</th>
                    <th className="py-3.5 px-4 font-bold">Primary Contact</th>
                    <th className="py-3.5 px-4 font-bold">Industry Sector</th>
                    <th className="py-3.5 px-4 font-bold">Location</th>
                    <th className="py-3.5 px-4 font-bold text-center">Orders</th>
                    <th className="py-3.5 px-4 font-bold">Total Invoiced</th>
                    <th className="py-3.5 px-4 font-bold text-center">Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-[#64748B]">
                        <Building2 size={32} className="mx-auto mb-2 text-slate-300" />
                        No corporate client found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-extrabold text-[#0B2235] text-sm">
                            {client.name}
                          </div>
                          <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                            <span className="font-semibold text-[#159A6A]">{client.tier}</span>
                            <span>•</span>
                            <span>Since {client.joinedDate}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#12304A]">{client.contactPerson}</div>
                          <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                            <Mail size={11} className="text-slate-400" />
                            <span>{client.email}</span>
                          </div>
                          <div className="text-[11px] text-[#64748B] flex items-center gap-1">
                            <Phone size={11} className="text-slate-400" />
                            <span>{client.phone}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#E8F6F0] text-[#159A6A] border border-[#159A6A]/20">
                            {client.industry} Packaging
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1 font-semibold text-[#12304A]">
                            <MapPin size={12} className="text-slate-400" />
                            <span>{client.location}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center font-bold text-[#0B2235]">
                          <span className="bg-slate-100 text-[#12304A] px-2 py-0.5 rounded-md font-mono text-xs">
                            {client.ordersCount} runs
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-[#12304A]">
                          {client.totalSpent}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(client.status)}`}>
                            {client.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedClient(client)}
                            className="bg-white border border-[#E2E8F0] hover:border-[#159A6A] hover:text-[#159A6A] text-[#12304A] px-2.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition shadow-2xs"
                          >
                            <Eye size={13} />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Client Details Slideover / Modal */}
        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="bg-[#0B2235] text-white px-6 py-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#159A6A]">
                    Client Dossier
                  </span>
                  <h3 className="text-lg font-black text-white">{selectedClient.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
                <div className="grid grid-cols-2 gap-3 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                  <div>
                    <span className="text-[#64748B] block font-medium">Industry Sector</span>
                    <span className="text-sm font-bold text-[#0B2235]">{selectedClient.industry}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block font-medium">Commercial Tier</span>
                    <span className="text-sm font-bold text-[#159A6A]">{selectedClient.tier}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block font-medium">Total Orders Placed</span>
                    <span className="text-sm font-bold text-[#0B2235]">{selectedClient.ordersCount} Production Runs</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block font-medium">Gross Turnover</span>
                    <span className="text-sm font-bold text-[#12304A]">{selectedClient.totalSpent}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-[#0B2235] text-xs uppercase tracking-wider">Contact Information</h4>
                  <div className="border border-[#E2E8F0] rounded-xl p-3.5 space-y-2 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Key Representative:</span>
                      <span className="font-bold text-[#12304A]">{selectedClient.contactPerson}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Email Address:</span>
                      <span className="font-semibold text-[#12304A]">{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Phone Number:</span>
                      <span className="font-semibold text-[#12304A]">{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Plant / Headquarters:</span>
                      <span className="font-semibold text-[#12304A]">{selectedClient.location}, Pakistan</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-[#0B2235] text-xs uppercase tracking-wider">Production Terms</h4>
                  <div className="border border-[#E2E8F0] rounded-xl p-3.5 space-y-1.5 bg-[#F8FAFC]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Payment Terms:</span>
                      <span className="font-bold text-[#12304A]">50% Advance / 50% Dispatch</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Volume Rebate:</span>
                      <span className="font-bold text-[#159A6A]">Tier-1 (15% on runs &gt; 50K)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Cylinder Storage:</span>
                      <span className="font-bold text-[#12304A]">Stored at Lahore Facility (Bay 4)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="flex-1 py-2.5 rounded-xl border border-[#E2E8F0] font-bold text-[#12304A] hover:bg-slate-50 transition"
                  >
                    Close Dossier
                  </button>
                  <button
                    onClick={() => {
                      alert(`Initiating production quote for ${selectedClient.name}`);
                      setSelectedClient(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#159A6A] hover:bg-[#12835a] text-white font-bold transition shadow-sm"
                  >
                    Create Factory Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Client Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="bg-[#0B2235] text-white px-6 py-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#159A6A]">
                    Account Registration
                  </span>
                  <h3 className="text-lg font-black text-white">Add New Corporate Client</h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddClient} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold text-[#12304A] mb-1">Company / Entity Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Packages Chem Tech Ltd."
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asim Raza"
                      value={newClient.contactPerson}
                      onChange={(e) => setNewClient({ ...newClient, contactPerson: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">City / Region</label>
                    <input
                      type="text"
                      placeholder="e.g. Lahore / Sheikhupura"
                      value={newClient.location}
                      onChange={(e) => setNewClient({ ...newClient, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="contact@company.pk"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+92 300 0000000"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Industry Sector</label>
                    <select
                      value={newClient.industry}
                      onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-xl bg-white focus:ring-2 focus:ring-[#159A6A] focus:outline-none font-semibold text-[#12304A]"
                    >
                      <option value="Food">Food Packaging</option>
                      <option value="Cosmetic">Cosmetic Packaging</option>
                      <option value="Pesticide">Pesticide Packaging</option>
                      <option value="Pharmaceutical">Pharmaceutical</option>
                      <option value="General">General Packaging</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Account Tier</label>
                    <select
                      value={newClient.tier}
                      onChange={(e) => setNewClient({ ...newClient, tier: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-xl bg-white focus:ring-2 focus:ring-[#159A6A] focus:outline-none font-semibold text-[#12304A]"
                    >
                      <option value="Standard Corporate">Standard Corporate</option>
                      <option value="Gold Corporate">Gold Corporate</option>
                      <option value="Enterprise Partner">Enterprise Partner</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[#E2E8F0] font-bold text-[#12304A] hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#159A6A] hover:bg-[#12835a] text-white font-bold transition shadow-sm"
                  >
                    Register Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
