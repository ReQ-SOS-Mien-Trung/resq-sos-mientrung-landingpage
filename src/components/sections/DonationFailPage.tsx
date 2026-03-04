import { useSearchParams, Link } from "react-router-dom";
import { XCircle, ArrowLeft, Heart } from "@phosphor-icons/react";

const DonationFailPage = () => {
  const [params] = useSearchParams();

  const orderCode = params.get("orderCode") ?? "—";
  const id        = params.get("id")        ?? "—";
  const status    = params.get("status")    ?? "—";
  const cancel    = params.get("cancel");

  const isCancelled = cancel === "true";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-neutral-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isCancelled ? "bg-amber-50" : "bg-red-50"
          }`}>
            <XCircle
              className={`w-10 h-10 ${isCancelled ? "text-amber-500" : "text-red-500"}`}
              weight="fill"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <p className={`text-[10px] font-mono tracking-[0.3em] mb-2 uppercase ${
            isCancelled ? "text-amber-500" : "text-red-500"
          }`}>
            {isCancelled ? "Giao dịch bị huỷ" : "Giao dịch thất bại"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
            {isCancelled ? "Giao dịch đã huỷ" : "Thanh toán thất bại"}
          </h1>
          <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
            {isCancelled
              ? "Bạn đã huỷ giao dịch. Không có khoản tiền nào bị trừ. Bạn có thể thử lại bất cứ lúc nào."
              : "Giao dịch không thể hoàn tất. Vui lòng kiểm tra lại thông tin và thử lại."}
          </p>
        </div>

        {/* Card */}
        {orderCode !== "—" && (
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-100 overflow-hidden mb-5">

            {/* Order code */}
            <div className="px-6 pt-6 pb-5">
              <p className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 mb-2 uppercase">
                Mã giao dịch
              </p>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                {orderCode}
              </span>
            </div>

            <div className="h-px bg-neutral-100" />

            <div className="divide-y divide-neutral-100">
              {id !== "—" && (
                <div className="px-6 py-3.5 flex flex-col gap-1">
                  <span className="text-xs text-neutral-400">Mã tham chiếu</span>
                  <span className="font-mono text-xs font-semibold text-neutral-600 break-all">
                    {id}
                  </span>
                </div>
              )}
              <div className="px-6 py-3.5 flex items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">Trạng thái</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                  isCancelled
                    ? "bg-amber-50 text-amber-600"
                    : "bg-red-50 text-red-600"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isCancelled ? "bg-amber-500" : "bg-red-500"
                  }`} />
                  {status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-100 text-neutral-700 text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Về trang chủ
          </Link>
          <Link
            to="/donate"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF5722] text-white text-sm font-semibold hover:bg-[#e64d1f] transition-colors"
          >
            <Heart className="w-4 h-4" weight="fill" />
            Thử lại
          </Link>
        </div>

        <p className="text-center text-[11px] text-neutral-300 mt-6 font-mono tracking-widest">
          RESQ SOS
        </p>

      </div>
    </div>
  );
};

export default DonationFailPage;
