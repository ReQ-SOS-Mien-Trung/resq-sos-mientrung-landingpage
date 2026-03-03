import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, EnvelopeSimple, X, ArrowRight } from "@phosphor-icons/react";
import { useForgotPassword } from "@/services/auth/hooks";

const ForgotPasswordPage = () => {
  const forgotMutation = useForgotPassword();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const validateEmail = (value: string) => {
    if (!value) { setEmailError(null); return true; }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(ok ? null : "Email không hợp lệ");
    return ok;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!validateEmail(email)) return;

    forgotMutation.mutate({ email }, {
      onSuccess: () => setSent(true),
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-16 border-b border-black/10 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <Link to="/" className="hover:opacity-70 transition-opacity">
          <img src="/resq_typo_logo.svg" alt="ResQ SOS" className="h-12 sm:h-14 lg:h-16 w-auto" />
        </Link>
        <Link
          to="/auth/login"
          className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/60 hover:text-black transition-colors"
        >
          Đã có tài khoản? Đăng nhập
        </Link>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left - Form */}
        <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-12 sm:py-16 lg:py-20 border-b lg:border-b-0 lg:border-r border-black/10">
          <div ref={formRef} className="max-w-md mx-auto w-full">
            {/* Back */}
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại đăng nhập
            </Link>

            {sent ? (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-[#00A650] rounded-full flex items-center justify-center mx-auto mb-6">
                  <EnvelopeSimple className="w-8 h-8 text-white" weight="bold" />
                </div>
                <h2 className="text-2xl font-black mb-3">Kiểm tra email của bạn</h2>
                <p className="text-sm text-black/60 mb-8 leading-relaxed">
                  Nếu email <span className="font-bold text-black">{email}</span> tồn tại trong hệ thống, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.
                </p>
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors group"
                >
                  Về trang đăng nhập
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
                  Khôi phục tài khoản
                </p>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
                  QUÊN
                  <br />
                  <span className="text-black/30">MẬT KHẨU?</span>
                </h1>
                <p className="text-sm text-black/60 mb-8">
                  Nhập email đã đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
                      Email <span className="text-[#FF5722]">*</span>
                    </label>
                    <div className="relative">
                      <EnvelopeSimple className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailTouched) validateEmail(e.target.value);
                        }}
                        onBlur={() => { setEmailTouched(true); validateEmail(email); }}
                        placeholder="email@example.com"
                        required
                        className={`w-full pl-12 pr-12 py-4 border-2 focus:border-black outline-none text-sm transition-all rounded-lg ${
                          emailError && emailTouched
                            ? "border-red-500 focus:border-red-500"
                            : email && !emailError && emailTouched
                            ? "border-green-500"
                            : "border-black/20"
                        }`}
                      />
                      <AnimatePresence>
                        {email && (
                          <motion.button
                            type="button"
                            onClick={() => { setEmail(""); setEmailError(null); setEmailTouched(false); }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-black/5 rounded-full p-1 transition-colors group"
                          >
                            <X className="w-4 h-4 text-black/40 group-hover:text-red-500 transition-colors" weight="bold" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                    <AnimatePresence mode="wait">
                      {emailError && emailTouched && (
                        <motion.p
                          initial={{ opacity: 0, y: -8, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -8, height: 0 }}
                          className="text-sm text-red-500 flex items-center gap-1 mt-2"
                        >
                          <X className="w-4 h-4" /> {emailError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotMutation.isPending || !!emailError || !email}
                    className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                  >
                    {forgotMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        Gửi email
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Right - Visual */}
        <div className="hidden lg:flex flex-col bg-black text-white">
          <div className="flex-1 flex flex-col justify-center px-10 xl:px-16 py-16">
            <h2 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.2] mb-8">
              KHÔI PHỤC
              <br />
              TÀI KHOẢN
              <br />
              <span className="text-white/30">CỦA BẠN.</span>
            </h2>
            <p className="text-lg text-white/60 max-w-md leading-relaxed mb-12">
              Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu đến email của bạn trong vài phút.
            </p>
            <div className="space-y-4">
              {["01 — Nhập email đăng ký", "02 — Kiểm tra hộp thư", "03 — Đặt mật khẩu mới"].map((step) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-[#FF5722] rounded-full shrink-0" />
                  <p className="text-sm text-white/50 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
