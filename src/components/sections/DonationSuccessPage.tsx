import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Heart, ArrowRight, CopySimple } from "@phosphor-icons/react";
import { useState } from "react";

const DonationSuccessPage = () => {
  const [params] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const orderCode = params.get("orderCode") ?? "—";
  const id        = params.get("id")        ?? "—";

  const STATUS_LABEL: Record<string, string> = {
    PAID: "ĐÃ ỦNG HỘ",
    SUCCESS: "ĐÃ ỦNG HỘ",
    PENDING: "ĐANG XỬ LÝ",
    CANCELLED: "ĐÃ HUỶ",
    FAILED: "THẤT BẠI",
  };
  const rawStatus = params.get("status") ?? "";
  const status = STATUS_LABEL[rawStatus.toUpperCase()] ?? rawStatus;

  const handleCopy = () => {
    navigator.clipboard.writeText(orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-neutral-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-10">
          <div className="relative flex items-center justify-center">
            {/* Ripple rings */}
            <span className="absolute w-20 h-20 rounded-full bg-emerald-400/20 animate-ping" style={{ animationDuration: "1.6s" }} />
            <span className="absolute w-28 h-28 rounded-full bg-emerald-400/10 animate-ping" style={{ animationDuration: "1.6s", animationDelay: "0.3s" }} />
            {/* Icon circle */}
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
            Thanh toán thành công
          </h1>
          <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
            Cảm ơn bạn đã chung tay cùng ResQ SOS.<br />
            Biên lai xác nhận sẽ được gửi qua email.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-100 overflow-hidden mb-5">

          {/* Order code highlight */}
          <div className="px-6 pt-6 pb-5">
            <p className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 mb-2 uppercase">
              Mã giao dịch
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                {orderCode}
              </span>
              <button
                onClick={handleCopy}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  copied
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <CopySimple className="w-3.5 h-3.5" weight="bold" />
                {copied ? "Đã sao chép" : "Sao chép"}
              </button>
            </div>
          </div>

          <div className="h-px bg-neutral-100" />

          {/* Meta rows */}
          <div className="divide-y divide-neutral-100">
            <div className="px-6 py-3.5 flex flex-col gap-1">
              <span className="text-xs text-neutral-400">Mã tham chiếu</span>
              <span className="font-mono text-xs font-semibold text-neutral-600 break-all">
                {id}
              </span>
            </div>
            <div className="px-6 py-3.5 flex items-center justify-between gap-4">
              <span className="text-xs text-neutral-400">Trạng thái</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {status}
              </span>
            </div>
          </div>
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
