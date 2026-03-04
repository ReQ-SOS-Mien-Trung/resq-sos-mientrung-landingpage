import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  ArrowRight,
  ArrowUpRight,
  Users,
  Package,
  CheckCircle,
  CopySimple,
  CaretDown,
  Spinner,
} from "@phosphor-icons/react";
import { useGetCampaignsMetadata } from "@/services/campaign/hooks";
import { useCreateDonation } from "@/services/donation/hooks";
import { toast } from "sonner";
import {
  donatePresetAmounts,
  donateImpactStats,
  donateBankInfo,
  donatePaymentLabels,
  donateStories,
} from "@/constants";

const formatVND = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")} triệu VNĐ`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K VNĐ`;
  return `${n.toLocaleString()} VNĐ`;
};

/* ── QR Corner marker ─────────────────────────────────── */
const QRFinder = ({ pos }: { pos: string }) => (
  <div className={`absolute ${pos} w-12 h-12 border-4 border-black`}>
    <div className="absolute inset-2 bg-black" />
  </div>
);

/* ════════════════════════════════════════════════════════ */
const DonatePage = () => {
  const { isAuthenticated, onboardingStatus, getNextOnboardingPath } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState(500_000);
  const [isCustom, setIsCustom] = useState(false);
  const [customRaw, setCustomRaw] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [fundCampaignId, setFundCampaignId] = useState<number | null>(null);

  const { data: campaigns, isLoading: campaignsLoading } = useGetCampaignsMetadata();
  const donateMutation = useCreateDonation();

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const donateRef = useRef<HTMLElement>(null);
  const storiesRef = useRef<HTMLElement>(null);

  /* ── GSAP ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.13, ease: "power4.out" }
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.55, ease: "power2.out", stagger: 0.1 }
      );
      gsap.fromTo(
        ".hero-panel",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, delay: 0.2, ease: "power3.out" }
      );

      // Ticker
      gsap.to(".ticker-track", {
        xPercent: -50,
        duration: 22,
        ease: "none",
        repeat: -1,
      });

      // Stats
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ".stat-item",
            { opacity: 0, y: 50, skewY: 3 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.1, ease: "back.out(1.5)" }
          );
        },
      });

      // Donate box
      ScrollTrigger.create({
        trigger: donateRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ".donate-anim",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power2.out" }
          );
        },
      });

      // Stories
      ScrollTrigger.create({
        trigger: storiesRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ".story-card",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" }
          );
        },
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Copy handler ── */
  const handleCopy = (value: string, i: number) => {
    navigator.clipboard.writeText(value.replace(/\s/g, ""));
    setCopiedIndex(i);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const displayAmount = isCustom
    ? parseInt(customRaw.replace(/\D/g, "") || "0")
    : selectedAmount;

  const handleSubmit = () => {
    if (!fundCampaignId) {
      toast.error("Vui lòng chọn chiến dịch quyên góp.");
      return;
    }
    if (displayAmount <= 0) {
      toast.error("Vui lòng nhập số tiền đóng góp.");
      return;
    }
    if (!donorName.trim()) {
      toast.error("Vui lòng nhập họ tên.");
      return;
    }
    if (!donorEmail.trim()) {
      toast.error("Vui lòng nhập email.");
      return;
    }
    donateMutation.mutate(
      {
        fundCampaignId: fundCampaignId,
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim(),
        amount: displayAmount,
        note: message,
      },
      {
        onSuccess: (data) => {
          if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
          }
        },
      }
    );
  };

  /* ════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px]">

          {/* LEFT */}
          <div
            ref={heroRef}
            className="px-8 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-28 border-b-2 lg:border-b-0 lg:border-r-2 border-black relative overflow-hidden"
          >
            {/* Giant bg text */}
            <span
              aria-hidden
              className="pointer-events-none select-none absolute -right-10 bottom-0 text-[22vw] font-black leading-none text-black/[0.028]"
            >
              SOS
            </span>

            <div className="relative">
              {/* Label */}
              <div className="overflow-hidden mb-10">
                <p className="hero-line text-[12px] sm:text-sm font-mono tracking-[0.35em] text-[#FF5722] uppercase">
                  Miền Trung cần bạn ngay hôm nay
                </p>
              </div>

              {/* Headline */}
              <div className="flex flex-col -mt-2">
                <div>
                  <h1 className="hero-line text-[clamp(3.8rem,10vw,9.5rem)] font-black tracking-tighter leading-[1.05] text-black">
                    ỦNG HỘ
                  </h1>
                </div>
                <div>
                  <h1 className="hero-line text-[clamp(3.8rem,10vw,9.5rem)] font-black tracking-tighter leading-[1.05] text-[#FF5722]">
                    ĐỒNG BÀO.
                  </h1>
                </div>
              </div>

              {/* Sub */}
              <p className="hero-sub mt-8 text-base sm:text-lg text-black/55 max-w-lg leading-relaxed">
                Mỗi năm, hàng chục nghìn gia đình miền Trung đối mặt với lũ lụt và sạt lở.
                Đóng góp của bạn — dù nhỏ hay lớn — đều tạo ra sự khác biệt thật sự.
              </p>

              {/* CTAs */}
              <div className="hero-sub mt-10 flex flex-wrap gap-3">
                <a
                  href="#donate-box"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5722] text-white text-sm font-black uppercase tracking-wider hover:bg-black transition-colors"
                >
                  ĐÓNG GÓP NGAY
                  <Heart className="w-4 h-4" weight="fill" />
                </a>
                <a
                  href="#bank-info"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black text-sm font-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                >
                  CHUYỂN KHOẢN
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — dark counter panel */}
          <div className="hero-panel bg-black text-white px-8 sm:px-12 py-14 sm:py-20 lg:py-28 flex flex-col justify-between">
            <div>
              <p className="text-[9px] font-mono tracking-[0.35em] text-white/50 mb-6">
                TỔNG QUYÊN GÓP / 2024
              </p>
              <div className="text-[5.5rem] sm:text-[6.5rem] xl:text-[7.5rem] font-black text-[#FF5722] leading-none">
                2.5
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white/45 mb-10">
                TỶ VNĐ
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-[9px] font-mono tracking-widest text-white/50 mb-2">
                  <span>ĐÃ ĐẠT</span>
                  <span>MỤC TIÊU 5 TỶ</span>
                </div>
                <div className="h-1 bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#FF5722]" style={{ width: "50%" }} />
                </div>
                <p className="mt-2 text-[9px] font-mono tracking-widest text-white/40">
                  50% mục tiêu đã hoàn thành
                </p>
              </div>
            </div>

            {/* Mini stats */}
            <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
              {[
                { label: "Lượt quyên góp", value: "12,480" },
                { label: "Tỉnh / thành", value: "14 tỉnh" },
                { label: "Cập nhật", value: "Hôm nay" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-white/55">{row.label}</span>
                  <span className="font-black text-white">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────── */}
      <div className="bg-[#FF5722] text-white py-3 border-b-2 border-black overflow-hidden select-none">
        <div className="ticker-track flex whitespace-nowrap" style={{ width: "200%" }}>
          {[0, 1].map((n) => (
            <div key={n} className="flex" style={{ width: "50%" }}>
              {["ĐANG CỨU TRỢ","LŨ LỤT MIỀN TRUNG","50,000 HỘ GIA ĐÌNH","HÃY CHUNG TAY","ĐỒNG BÀO CẦN BẠN","RESQ SOS","ĐANG CỨU TRỢ","LŨ LỤT MIỀN TRUNG","50,000 HỘ GIA ĐÌNH","HÃY CHUNG TAY","ĐỒNG BÀO CẦN BẠN","RESQ SOS"].map((text, i) => (
                <span key={i} className="inline-flex items-center gap-5 px-6 text-[10px] font-black tracking-[0.22em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── IMPACT STATS ────────────────────────────────────── */}
      <section ref={statsRef} className="border-b-2 border-black">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {donateImpactStats.map((s, i) => (
            <div
              key={i}
              className={`stat-item px-8 py-12 sm:py-16 text-center ${i < 3 ? "border-r-2" : ""} border-b-2 lg:border-b-0 border-black`}
            >
              <div className="text-3xl sm:text-4xl xl:text-5xl font-black leading-none">{s.number}</div>
              <div className="text-[9px] font-mono tracking-[0.3em] text-[#FF5722] mt-2 mb-1">{s.unit}</div>
              <div className="text-xs text-black/35 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DONATION BOX ────────────────────────────────────── */}
      <section id="donate-box" ref={donateRef} className="border-b-2 border-black bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-20">

          <div className="donate-anim text-center mb-12">
            <p className="text-[10px] font-mono tracking-[0.35em] text-white/50 mb-3">ĐÓNG GÓP</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              CHỌN MỨC ĐÓNG GÓP
            </h2>
          </div>

          {/* Presets */}
          <div className="donate-anim grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
            {donatePresetAmounts.map((p) => {
              const active = p.value === 0 ? isCustom : (!isCustom && selectedAmount === p.value);
              return (
                <button
                  key={p.label}
                  onClick={() => {
                    if (p.value === 0) { setIsCustom(true); }
                    else { setIsCustom(false); setSelectedAmount(p.value); }
                  }}
                  className={`group flex flex-col items-center justify-center py-4 px-1 border-2 transition-all duration-200 ${
                    active ? "border-[#FF5722] bg-[#FF5722]" : "border-white/15 hover:border-white/50"
                  }`}
                >
                  <span className="text-base sm:text-lg font-black leading-none">{p.label}</span>
                  <span className={`text-[12px] mt-1.5 tracking-wide ${active ? "text-white/85" : "text-white/35 group-hover:text-white/55"}`}>
                    {p.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom input */}
          {isCustom && (
            <div className="donate-anim mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={customRaw}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setCustomRaw(raw ? parseInt(raw).toLocaleString("vi-VN") : "");
                  }}
                  placeholder="Nhập số tiền..."
                  className="w-full bg-white/5 border-2 border-white/15 focus:border-[#FF5722] px-6 py-4 text-md font-bold text-white placeholder:text-white/15 focus:outline-none transition-colors text-center"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-white/30 font-bold">VNĐ</span>
              </div>
            </div>
          )}

          {/* Campaign selector */}
          <div className="donate-anim mb-6">
            <label className="text-xs font-mono tracking-[0.3em] text-white/50 block mb-2">QUỸ QUYÊN GÓP *</label>
            <div className="relative">
              <select
                value={fundCampaignId ?? ""}
                onChange={(e) => setFundCampaignId(Number(e.target.value))}
                disabled={campaignsLoading}
                className={`w-full appearance-none bg-white/5 border-2 border-white/15 focus:border-[#FF5722] px-4 py-3 text-sm focus:outline-none transition-colors cursor-pointer disabled:opacity-50 ${fundCampaignId === null ? "text-white/15" : "text-white"}`}
              >
                <option value="" disabled className="bg-black text-white/50">
                  {campaignsLoading ? "Đang tải..." : "— Chọn chiến dịch —"}
                </option>
                {campaigns?.map((c) => (
                  <option key={c.key} value={c.key} className="bg-black text-white">
                    {c.value}
                  </option>
                ))}
              </select>
              <CaretDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>
          </div>

          {/* Donor info */}
          <div className="donate-anim grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { label: "HỌ TÊN *", ph: "Nguyễn Văn A", val: donorName, set: setDonorName, type: "text" },
              { label: "EMAIL *", ph: "email@example.com", val: donorEmail, set: setDonorEmail, type: "email" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-mono tracking-[0.3em] text-white/50 block mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={field.val}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.ph}
                  className="w-full bg-white/5 border-2 border-white/15 focus:border-[#FF5722] px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="donate-anim mb-10">
            <label className="text-xs font-mono tracking-[0.3em] text-white/50 block mb-2">LỜI NHẮN (TÙY CHỌN)</label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Gửi lời nhắn đến đồng bào miền Trung..."
              className="w-full bg-white/5 border-2 border-white/15 focus:border-[#FF5722] px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="donate-anim">
            {displayAmount > 0 && (
              <p className="text-center text-sm text-white/40 mb-4">
                Đang đóng góp:{" "}
                <span className="font-black text-[#FF5722] text-base">{formatVND(displayAmount)}</span>
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={donateMutation.isPending}
              className="w-full py-5 bg-[#FF5722] text-white text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {donateMutation.isPending ? (
                <><Spinner className="w-5 h-5 animate-spin" />ĐANG XỬ LÝ...</>
              ) : (
                <><Heart className="w-5 h-5" weight="fill" />ĐÓNG GÓP NGAY<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
            <p className="text-center text-xs text-white/40 mt-4 tracking-wide">
              Giao dịch được mã hóa. Biên lai xác nhận sẽ gửi qua email.
            </p>
          </div>
        </div>
      </section>

      {/* ── BANK TRANSFER ───────────────────────────────────── */}
      <section id="bank-info" className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* QR Side */}
          <div className="p-8 sm:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black flex flex-col">
            <p className="text-[9px] font-mono tracking-[0.35em] text-black/35 mb-3">PHƯƠNG THỨC</p>
            <h2 className="text-2xl sm:text-3xl font-black mb-10">QUÉT MÃ QR</h2>

            <div className="flex-1 flex flex-col items-center justify-center py-4">
              {/* QR placeholder */}
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 bg-white border-4 border-black flex items-center justify-center">
                <QRFinder pos="top-3 left-3" />
                <QRFinder pos="top-3 right-3" />
                <QRFinder pos="bottom-3 left-3" />
                {/* Data dots */}
                <div className="absolute inset-0 top-20 left-3 right-20 bottom-20 grid grid-cols-7 gap-1 p-2 opacity-50">
                  {[1,0,1,0,1,1,0,0,1,1,0,1,0,1,1,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,1,0,1,0,1,1,1,0,1,1,0,0,1].map((v, i) => (
                    <div key={i} className={`${v ? "bg-black rounded-sm" : ""}`} />
                  ))}
                </div>
                <div className="absolute inset-0 top-3 left-20 right-3 bottom-20 grid grid-cols-5 gap-1 p-2 opacity-50">
                  {[1,0,1,1,0,0,1,0,0,1,1,0,1,0,0,0,1,0,1,1,1,0,0,1,0].map((v, i) => (
                    <div key={i} className={`${v ? "bg-black rounded-sm" : ""}`} />
                  ))}
                </div>
                {/* Center logo */}
                <div className="relative z-10 bg-white border-2 border-black/10 p-2">
                  <img src="/resq_typo_logo.svg" alt="ResQ" className="h-7 w-auto" />
                </div>
              </div>
              <p className="mt-6 text-xs text-black/40 text-center">
                Hỗ trợ MoMo · ZaloPay · VNPay · Internet Banking
              </p>
            </div>
          </div>

          {/* Bank info side */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col">
            <p className="text-[9px] font-mono tracking-[0.35em] text-black/35 mb-3">CHUYỂN KHOẢN</p>
            <h2 className="text-2xl sm:text-3xl font-black mb-8">THÔNG TIN TÀI KHOẢN</h2>

            <div className="flex-1 space-y-0">
              {donateBankInfo.map((row, i) => (
                <div key={i} className="py-5 border-b border-black/10 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[9px] font-mono tracking-[0.28em] text-black/30 mb-1">{row.label}</p>
                    <p className="font-black text-base sm:text-lg truncate">{row.value}</p>
                  </div>
                  {row.copy && (
                    <button
                      onClick={() => handleCopy(row.value, i)}
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-[10px] font-black uppercase tracking-wider border-2 transition-all ${
                        copiedIndex === i ? "border-green-500 text-green-500" : "border-black hover:bg-black hover:text-white"
                      }`}
                    >
                      {copiedIndex === i ? (
                        <><CheckCircle className="w-3.5 h-3.5" weight="bold" /> ĐÃ SAO CHÉP</>
                      ) : (
                        <><CopySimple className="w-3.5 h-3.5" weight="bold" /> SAO CHÉP</>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pl-4 border-l-4 border-[#FF5722]">
              <p className="text-sm text-black/60 leading-relaxed">
                <span className="font-black text-black">Nội dung chuyển khoản:</span>{" "}
                Ghi rõ họ tên + <span className="font-bold">"ung ho dong bao"</span> để chúng tôi xác nhận và gửi biên lai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAYMENT METHODS ─────────────────────────────────── */}
      <section className="border-b-2 border-black bg-black/2.5">
        <div className="px-8 sm:px-12 lg:px-16 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-12">
          <div className="shrink-0">
            <p className="text-[9px] font-mono tracking-[0.3em] text-black/30 mb-1">CHẤP NHẬN</p>
            <p className="text-sm font-black uppercase tracking-wider">Phương thức thanh toán</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {donatePaymentLabels.map((name) => (
              <span key={name} className="px-4 py-2 bg-white border-2 border-black/10 text-xs font-black text-black/50 hover:border-black hover:text-black transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORIES ─────────────────────────────────────────── */}
      <section ref={storiesRef} className="border-b-2 border-black">
        <div className="px-8 sm:px-12 lg:px-16 py-10 border-b-2 border-black">
          <p className="text-[9px] font-mono tracking-[0.35em] text-black/35 mb-2">CÂU CHUYỆN</p>
          <h2 className="text-2xl sm:text-3xl font-black">ĐỒNG BÀO NÓI GÌ</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {donateStories.map((s, i) => (
            <div
              key={i}
              className={`story-card p-8 sm:p-10 lg:p-12 ${i < 2 ? "border-b-2 md:border-b-0 md:border-r-2" : ""} border-black group hover:bg-[#FF5722] hover:text-white transition-colors duration-300`}
            >
              <span className="inline-block text-[9px] font-mono tracking-[0.25em] border border-[#FF5722] text-[#FF5722] group-hover:border-white group-hover:text-white px-2 py-0.5 mb-7">
                {s.tag}
              </span>
              <blockquote className="text-base sm:text-lg font-medium leading-relaxed mb-8 text-black/75 group-hover:text-white">
                "{s.quote}"
              </blockquote>
              <div>
                <p className="font-black text-sm">{s.name}</p>
                <p className="text-xs text-black/35 group-hover:text-white/60 mt-0.5">{s.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OTHER WAYS ──────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <Link
          to={isAuthenticated && onboardingStatus.isComplete ? "/profile" : isAuthenticated ? getNextOnboardingPath() : "/auth/register"}
          className="p-8 sm:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black hover:bg-black hover:text-white transition-colors duration-300 group"
        >
          <Users className="w-10 h-10 mb-6 text-[#FF5722]" />
          <p className="text-[9px] font-mono tracking-[0.3em] text-black/30 group-hover:text-white/30 mb-2">NGOÀI TIỀN BẠC</p>
          <h3 className="text-2xl sm:text-3xl font-black mb-4">THAM GIA CỨU HỘ</h3>
          <p className="text-sm text-black/55 group-hover:text-white/60 mb-8 leading-relaxed max-w-sm">
            Thời gian, sức lực và kỹ năng của bạn có thể cứu sống một mạng người. Hãy trở thành một phần của đội ngũ ResQ SOS.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-black border-b-2 border-current pb-0.5">
            ĐĂNG KÝ CỨU HỘ <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>
        <Link
          to="/contact"
          className="p-8 sm:p-12 lg:p-16 hover:bg-black hover:text-white transition-colors duration-300 group"
        >
          <Package className="w-10 h-10 mb-6 text-[#FF5722]" />
          <p className="text-[9px] font-mono tracking-[0.3em] text-black/30 group-hover:text-white/30 mb-2">NGOÀI TIỀN BẠC</p>
          <h3 className="text-2xl sm:text-3xl font-black mb-4">QUYÊN GÓP VẬT PHẨM</h3>
          <p className="text-sm text-black/55 group-hover:text-white/60 mb-8 leading-relaxed max-w-sm">
            Nhu yếu phẩm, thuốc men, quần áo — mọi thứ đều vô cùng quý giá với bà con vùng thiên tai.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-black border-b-2 border-current pb-0.5">
            LIÊN HỆ NGAY <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>
      </section>
    </div>
  );
};

export default DonatePage;
