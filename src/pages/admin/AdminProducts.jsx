import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { adminProducts as initialProducts } from '../../data/mockData';
import {
  Package, Plus, Search, Edit2, Trash2, CheckCircle2,
  XCircle, Filter, X
} from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cosmetic',
    material: 'Art Board 300gsm',
    status: 'Active',
    orders: 0
  });

  const categories = ['All', 'Cosmetic', 'Food', 'Pharmaceutical', 'Pesticide', 'General'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.material.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setFormData({
        name: prod.name,
        category: prod.category,
        material: prod.material,
        status: prod.status,
        orders: prod.orders || 0
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'Cosmetic',
        material: 'Art Board 300gsm',
        status: 'Active',
        orders: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
    } else {
      const newProd = {
        id: Date.now(),
        ...formData
      };
      setProducts([newProd, ...products]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this packaging product from the catalog?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
    ));
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2235] tracking-tight">
              Packaging Catalog Management
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Add, configure, or retire industrial packaging specifications available for client quotation.
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="bg-[#159A6A] hover:bg-[#118057] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition shadow-xs flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            <span>Add Packaging Product</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product name or material..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm border border-[#E2E8F0] rounded-lg text-[#12304A] focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter size={15} className="text-slate-400 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#12304A] text-white'
                    : 'bg-slate-100 text-[#12304A] hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#12304A]">
                  <th className="py-3.5 px-6">Product Line</th>
                  <th className="py-3.5 px-6">Industry Category</th>
                  <th className="py-3.5 px-6">Default Substrate / Material</th>
                  <th className="py-3.5 px-6">Total Runs</th>
                  <th className="py-3.5 px-6">Listing Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-6 font-bold text-[#0B2235] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#12304A]/5 text-[#12304A] flex items-center justify-center shrink-0">
                        <Package size={17} />
                      </div>
                      <span>{p.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-[#12304A]">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#64748B]">{p.material}</td>
                    <td className="py-4 px-6 font-semibold text-xs text-[#12304A]">{p.orders} orders</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleStatus(p.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                          p.status === 'Active'
                            ? 'bg-[#E8F6F0] text-[#159A6A] hover:bg-[#d5eee3]'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {p.status === 'Active' ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                        <span>{p.status}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(p)}
                          className="p-1.5 text-slate-400 hover:text-[#12304A] hover:bg-slate-100 rounded-lg transition"
                          title="Edit Product"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <Package size={36} className="mx-auto mb-2 opacity-30 text-[#12304A]" />
              <p className="text-xs">No packaging products found.</p>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-bold text-[#0B2235] mb-1">
                {editingProduct ? 'Edit Packaging Product' : 'Add New Packaging Product'}
              </h3>
              <p className="text-xs text-[#64748B] mb-6">
                Configure industrial packaging specs for client estimates.
              </p>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#12304A] mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. 5-Layer Barrier Agrochemical Bottle Sleeve"
                    className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg text-[#12304A] focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg text-[#12304A] focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                    >
                      <option>Cosmetic</option>
                      <option>Food</option>
                      <option>Pharmaceutical</option>
                      <option>Pesticide</option>
                      <option>General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg text-[#12304A] focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#12304A] mb-1">Primary Material Substrate *</label>
                  <input
                    type="text"
                    required
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g. PET/AL/PE 110 micron"
                    className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg text-[#12304A] focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-300 text-[#12304A] rounded-lg font-bold text-xs hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#159A6A] hover:bg-[#118057] text-white rounded-lg font-bold text-xs transition shadow-xs"
                  >
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
}
