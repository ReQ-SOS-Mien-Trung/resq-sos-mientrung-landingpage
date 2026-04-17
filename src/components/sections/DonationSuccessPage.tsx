import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Heart, ArrowRight } from "@phosphor-icons/react";
import { useVerifyZaloPay } from "@/services/donation/hooks";

const formatVND = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")} triệu VNĐ`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K VNĐ`;
  return `${n.toLocaleString()} VNĐ`;
};

const DonationSuccessPage = () => {
  const [params] = useSearchParams();

  // ZaloPay callback params
  const apptransid = params.get("apptransid") ?? "";
  const isZaloPay  = !!apptransid;

  // Amount (both PayOS and ZaloPay pass this)
  const rawAmount = parseInt(params.get("amount") ?? "0");
  const amount = rawAmount > 0 ? formatVND(rawAmount) : null;

  // Notify BE to update ZaloPay donation status (fire and forget)
  useVerifyZaloPay({ apptransid }, isZaloPay);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-neutral-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-10">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-20 h-20 rounded-full bg-emerald-400/20 animate-ping" style={{ animationDuration: "1.6s" }} />
            <span className="absolute w-28 h-28 rounded-full bg-emerald-400/10 animate-ping" style={{ animationDuration: "1.6s", animationDelay: "0.3s" }} />
            <div className="relative w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <CheckCircle className="w-10 h-10 text-white" weight="fill" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-[10px] font-mono tracking-[0.3em] text-emerald-500 mb-4 uppercase">
            Giao dịch hoàn tất
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
            Quyên góp thành công
          </h1>
          <p className="mt-4 text-sm text-neutral-500 leading-relaxed">
            Cảm ơn bạn đã quyên góp ủng hộ chúng tôi
            {amount && (
              <> <span className="font-black text-emerald-600">{amount}</span></>
            )}
            .<br />
            Vui lòng kiểm tra email để xem biên lai xác nhận.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link
            to="/donate"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-100 text-neutral-700 text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            <Heart className="w-4 h-4 text-[#FF5722]" weight="fill" />
            Đóng góp thêm
          </Link>
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF5722] text-white text-sm font-semibold hover:bg-[#e64d1f] transition-colors"
          >
            Về trang chủ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        

      </div>
    </div>
  );
};

export default DonationSuccessPage;
