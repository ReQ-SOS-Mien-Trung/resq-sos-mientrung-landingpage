import { QrCode } from "lucide-react";
import { appStoreItems } from "@/constants";

const DownloadAppPage = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-white">
      {/* Split screen wrapper */}
      <div className="min-h-[calc(100vh-80px)] grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 lg:px-12 pt-16 md:pt-24 pb-10 md:pb-14">
            <div className="max-w-2xl">
              <h1 className="text-[44px] leading-[1.05] md:text-[64px] md:leading-[1.05] font-semibold tracking-tight text-slate-900">
                Tải ứng dụng
                <br />
                <span className="text-slate-900">ResQ SOS Miền Trung</span>
                <br />
                ngay!
              </h1>
              <p className="mt-6 text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
                Cảnh báo mưa lũ theo thời gian thực, gửi tín hiệu SOS chỉ với một
                chạm và định vị nhanh để đội cứu hộ hỗ trợ kịp thời.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  24/7 Sẵn sàng hỗ trợ
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  Bản đồ điểm ngập & tuyến an toàn
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Kết nối đội cứu hộ địa phương
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white">
          <div className="h-full flex flex-col">
            {/* top-right stores (no full-width card) */}
            <div className="container mx-auto px-4 lg:px-12 pt-16 md:pt-16">
              <div className="max-w-3xl mx-auto mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">
                    App Stores
                  </span>
                  <span className="text-xs font-semibold text-slate-500">QR</span>
                </div>

                <div className="mt-6 space-y-8">
                  {appStoreItems.map((store) => (
                    <div
                      key={store.key}
                      className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-6"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <img
                            src={store.iconSrc}
                            alt={store.iconAlt}
                            className={store.iconClassName}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900 truncate">
                            {store.name}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled
                        className="inline-flex items-center justify-center rounded-full bg-orange-50 px-6 py-2 text-sm font-semibold text-orange-700 cursor-not-allowed"
                        title="Bản phát hành đang được chuẩn bị"
                      >
                        Download
                      </button>

                      <div className="w-14 h-14 flex items-center justify-center text-slate-400">
                        <QrCode className="w-12 h-12" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* bottom-right orange panel */}
            <div className="mt-8 md:mt-10 bg-orange-500 flex-1">
              <div className="container mx-auto px-4 lg:px-12 py-10 md:py-14 h-full">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-10 h-full">
                  <div className="text-white/95">
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      Một chạm gửi SOS. Một hệ thống cùng phản ứng.
                    </h2>
                    <p className="mt-3 text-white/80 leading-relaxed max-w-xl">
                      Khi có lũ, bạn có thể gửi vị trí và tình trạng ngay lập tức để
                      đội cứu hộ tiếp cận nhanh hơn. Dữ liệu được tổng hợp giúp ưu tiên
                      những trường hợp khẩn cấp.
                    </p>
                  </div>

                  <div className="relative h-full flex items-end">
                    <div className="relative mx-auto w-full max-w-xs md:max-w-sm lg:max-w-md">
                      <img
                        src="/images/app_mockup.png"
                        alt="Giao diện ứng dụng ResQ SOS Miền Trung"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppPage;

