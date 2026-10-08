import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Package, Clock, Phone, FileText, Download } from 'lucide-react';
import Footer from '../../components/Footer';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'BMP-10025';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          {/* Main Success Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 sm:p-12 text-center">
            <div className="w-18 h-18 bg-[#E8F6F0] text-[#159A6A] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#159A6A]/20 shadow-xs">
              <CheckCircle2 size={40} className="stroke-[2.5]" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#159A6A] bg-[#E8F6F0] px-3.5 py-1 rounded-md border border-[#159A6A]/20">
              Quotation Request Logged
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2235] mt-4 mb-2 tracking-tight">
              Order Request Submitted
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] max-w-lg mx-auto">
              Thank you for choosing <strong className="text-[#0B2235]">BM Print Pack</strong>. Your industrial packaging specifications have been registered for technical review.
            </p>

            {/* Order Reference Box */}
            <div className="my-8 max-w-md mx-auto bg-slate-50 border border-[#E2E8F0] rounded-xl p-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Your Order Reference Code
              </div>
              <div className="text-3xl font-mono font-black text-[#0B2235] tracking-wider">
                <span className="text-[#159A6A]">{orderId}</span>
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <Clock size={13} className="text-[#159A6A]" />
                <span>Assigned technical estimator review within 2-4 business hours</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="border-t border-slate-100 pt-8 mt-6 text-left max-w-xl mx-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#12304A] mb-4">
                Manufacturing Next Steps
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-[#64748B]">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#12304A] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <p>
                    <strong className="text-[#0B2235]">Pre-Press Dieline Check:</strong> Our prepress team examines bleed boundaries, structural cut lines, and substrate grain direction.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#12304A] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <p>
                    <strong className="text-[#0B2235]">Color & Proof Approval:</strong> We coordinate with your procurement manager to verify Pantone ink swatches and formal dieline sign-off.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#12304A] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <p>
                    <strong className="text-[#0B2235]">Tooling & Press Run:</strong> Cylinders/plates are mounted on our press lines at the Sundar Industrial Estate plant in Lahore.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={`/order-details/${orderId}`}
                className="w-full sm:w-auto bg-[#159A6A] hover:bg-[#118057] text-white font-bold px-7 py-3 rounded-lg transition shadow-xs flex items-center justify-center gap-2 text-sm"
              >
                <Package size={17} />
                <span>Track This Order</span>
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto border border-[#12304A] hover:bg-slate-50 text-[#12304A] font-bold px-7 py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <span>Go to Client Portal</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 hover:text-[#12304A] cursor-pointer">
                <Download size={13} className="text-[#159A6A]" /> Download Proforma Quote (PDF)
              </span>
              <span className="flex items-center gap-1.5 hover:text-[#12304A] cursor-pointer">
                <FileText size={13} className="text-[#159A6A]" /> Print Order Summary
              </span>
              <Link to="/contact" className="flex items-center gap-1.5 text-[#159A6A] font-bold hover:underline">
                <Phone size={13} /> Need Urgent Dispatch Assistance?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
