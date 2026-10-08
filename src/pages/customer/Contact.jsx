import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import Footer from '../../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Pesticide & Agrochemical Packaging',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <div>
        {/* Header: Deep Navy */}
        <section className="bg-gradient-to-br from-[#0B2235] via-[#12304A] to-[#0B2235] text-white py-16 border-b border-[#12304A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#12304A] border border-[#159A6A]/40 text-[#159A6A] text-xs font-bold px-3 py-1 rounded-full mb-3">
              Direct Production Inquiries
            </div>
            <h1 className="text-[#159A6A] text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Contact BM Print Pack
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Connect with our structural prepress engineers, estimating desk, and commercial account managers for plant visits and bulk quotations.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-7 sm:p-8 shadow-2xs">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B2235]">Send an Engineering Inquiry</h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  Our estimating desk typically responds within 2-4 business hours with dieline specifications and bulk volume pricing.
                </p>
              </div>

              {isSent ? (
                <div className="bg-[#E8F6F0] border border-[#159A6A]/30 rounded-xl p-8 text-center my-6">
                  <div className="w-14 h-14 bg-white text-[#159A6A] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#159A6A]/20 shadow-xs">
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B2235]">Inquiry Registered!</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-2 max-w-md mx-auto">
                    Thank you for reaching out. A BM Print Pack technical consultant will contact you via email or phone shortly.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="mt-6 text-xs font-bold bg-[#159A6A] hover:bg-[#118057] text-white px-5 py-2.5 rounded-lg transition"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Asad Rauf"
                        className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1">Company / Brand *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. AgriGrow Chemicals Ltd."
                        className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1">Official Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1">Phone / WhatsApp *</label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Target Packaging Domain</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none"
                    >
                      <option>Pesticide & Agrochemical Packaging</option>
                      <option>Cosmetic & Personal Care Boxes</option>
                      <option>Food Grade Barrier Pouches</option>
                      <option>Pharmaceutical GMP Cartons</option>
                      <option>General Retail & Consumer Cartons</option>
                      <option>Custom Self-Adhesive Labels</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1">Packaging Requirements & Estimated Batch Size *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify substrate preferences (e.g. SBS Board, PET/PE foil), dimensions, estimated run quantity, and target delivery window..."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#159A6A] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#159A6A] hover:bg-[#118057] text-white font-bold py-3.5 rounded-lg transition shadow-xs flex items-center justify-center gap-2 text-sm"
                  >
                    <Send size={15} />
                    <span>Submit Manufacturing Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details & Facility Location */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-7 shadow-2xs space-y-6">
                <h3 className="text-lg font-bold text-[#0B2235]">Headquarters & Manufacturing Plant</h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F6F0] text-[#159A6A] flex items-center justify-center shrink-0 border border-[#159A6A]/20">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-[#0B2235]">Plant & Administrative Office</div>
                      <p className="text-[#64748B] mt-0.5">
                        Plot 45-B, Sundar Industrial Estate, Raiwind Road, Lahore, Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F6F0] text-[#159A6A] flex items-center justify-center shrink-0 border border-[#159A6A]/20">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-[#0B2235]">Direct Telephone Lines</div>
                      <p className="text-[#64748B] mt-0.5">+92 300 1234567 / +92 42 35890000</p>
                      <p className="text-xs text-[#159A6A] font-semibold mt-0.5">Dedicated procurement WhatsApp available</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F6F0] text-[#159A6A] flex items-center justify-center shrink-0 border border-[#159A6A]/20">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-[#0B2235]">Official Inquiries</div>
                      <p className="text-[#64748B] mt-0.5">orders@bmprintpack.com</p>
                      <p className="text-[#64748B] text-xs">info@bmprintpack.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F6F0] text-[#159A6A] flex items-center justify-center shrink-0 border border-[#159A6A]/20">
                      <Clock size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-[#0B2235]">Production Shifts & Operating Hours</div>
                      <p className="text-[#64748B] mt-0.5">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                      <p className="text-slate-400 text-xs mt-0.5">Sunday: Closed for preventive press maintenance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-2xs">
                <div className="relative h-52 bg-slate-200 flex flex-col items-center justify-center text-center p-6">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#12304A_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10">
                    <div className="w-11 h-11 bg-[#0B2235] text-[#159A6A] border border-[#159A6A]/30 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                      <MapPin size={22} />
                    </div>
                    <div className="font-bold text-[#0B2235] text-sm">BM Print Pack Plant & Warehouse</div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Sundar Industrial Estate, Lahore (Google Maps Geolocation)
                    </p>
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
