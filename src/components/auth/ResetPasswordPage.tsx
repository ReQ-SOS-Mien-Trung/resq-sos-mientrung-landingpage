import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, LockSimple, CheckCircle, XCircle } from "@phosphor-icons/react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react/dist/ssr";
import { useResetPassword } from "@/services/auth/hooks";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const resetMutation = useResetPassword();

  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [touched, setTouched] = useState<{ newPassword?: boolean; confirmPassword?: boolean }>({});

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

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Vui lòng nhập mật khẩu";
    if (value.length < 6 || value.length > 20) return "Mật khẩu từ 6-20 ký tự";
    if (!/[A-Z]/.test(value)) return "Cần ít nhất 1 chữ hoa";
    if (!/[a-z]/.test(value)) return "Cần ít nhất 1 chữ thường";
    if (!/[0-9]/.test(value)) return "Cần ít nhất 1 chữ số";
    return undefined;
  };

  const validate = () => {
    const newErr: typeof errors = {};
    const pwErr = validatePassword(formData.newPassword);
    if (pwErr) newErr.newPassword = pwErr;
    if (!formData.confirmPassword) {
      newErr.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErr.confirmPassword = "Mật khẩu không khớp";
    }
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const newErrors = { ...errors };
    if (name === "newPassword") {
      if (touched.newPassword) {
        newErrors.newPassword = validatePassword(value);
      }
      // Always re-check confirm match when new password changes
      if (formData.confirmPassword) {
        newErrors.confirmPassword = value !== formData.confirmPassword ? "Mật khẩu không khớp" : undefined;
      }
    }
    if (name === "confirmPassword") {
      // Always validate match as user types
      newErrors.confirmPassword = value !== formData.newPassword ? "Mật khẩu không khớp" : undefined;
    }
    setErrors(newErrors);
  };

  const handleBlur = (name: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ newPassword: true, confirmPassword: true });
    if (!validate()) return;

    resetMutation.mutate(
      { token, newPassword: formData.newPassword, confirmPassword: formData.confirmPassword },
      { onSuccess: () => navigate("/auth/login") }
    );
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-lg font-bold text-red-500">Link không hợp lệ hoặc đã hết hạn.</p>
        <Link to="/auth/forgot-password" className="px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors">
          Yêu cầu link mới
        </Link>
      </div>
    );
  }

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

            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
              Đặt lại mật khẩu
            </p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
              MẬT KHẨU
              <br />
              <span className="text-black/30">MỚI.</span>
            </h1>
            <p className="text-sm text-black/60 mb-8">
              Mật khẩu từ 6-20 ký tự, có chữ hoa, chữ thường và số.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
                  Mật khẩu mới <span className="text-[#FF5722]">*</span>
                </label>
                <div className="relative">
                  <LockSimple className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur("newPassword")}
                    placeholder="••••••••"
                    required
                    className={`w-full pl-12 pr-12 py-4 border-2 focus:border-black outline-none text-sm transition-all rounded-lg ${
                      errors.newPassword && touched.newPassword
                        ? "border-red-500 focus:border-red-500"
                        : formData.newPassword && !errors.newPassword && touched.newPassword
                        ? "border-green-500"
                        : "border-black/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                  >
                    {showNew ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
                <AnimatePresence mode="wait">
                  {errors.newPassword && touched.newPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      className="text-sm text-red-500 mt-2"
                    >
                      {errors.newPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
                  Xác nhận mật khẩu <span className="text-[#FF5722]">*</span>
                </label>
                <div className="relative">
                  <LockSimple className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="••••••••"
                    required
                    className={`w-full pl-12 pr-20 py-4 border-2 focus:border-black outline-none text-sm transition-all rounded-lg ${
                      formData.confirmPassword && errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : formData.confirmPassword && !errors.confirmPassword
                        ? "border-green-500"
                        : "border-black/20"
                    }`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {/* Match indicator */}
                    <AnimatePresence mode="wait">
                      {formData.confirmPassword && (
                        <motion.span
                          key={errors.confirmPassword ? "no" : "yes"}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.15 }}
                        >
                          {errors.confirmPassword ? (
                            <XCircle className="w-5 h-5 text-red-500" weight="fill" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
                          )}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-black/40 hover:text-black transition-colors"
                    >
                      {showConfirm ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  {errors.confirmPassword && formData.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      className="text-sm text-red-500 mt-2"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                  {!errors.confirmPassword && formData.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      className="text-sm text-green-500 mt-2"
                    >
                      Mật khẩu khớp ✓
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={resetMutation.isPending}
                className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                {resetMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    Đặt lại mật khẩu
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right - Visual */}
        <div className="hidden lg:flex flex-col bg-[#FF5722] text-white">
          <div className="flex-1 flex flex-col justify-center px-10 xl:px-16 py-16">
            <h2 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.1] mb-8">
              BẢO MẬT
              <br />
              TÀI KHOẢN
              <br />
              <span className="text-white/50">CỦA BẠN.</span>
            </h2>
            <p className="text-lg text-white/80 max-w-md leading-relaxed mb-12">
              Tạo mật khẩu mạnh để bảo vệ tài khoản ResQ SOS của bạn.
            </p>
            <div className="space-y-4">
              {[
                "Ít nhất 6 ký tự",
                "Có chữ hoa và chữ thường",
                "Có ít nhất 1 chữ số",
              ].map((rule) => (
                <div key={rule} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0" />
                  <p className="text-sm text-white/70 font-medium">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
