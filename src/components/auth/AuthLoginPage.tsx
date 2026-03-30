import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ArrowRight, EnvelopeSimple, X } from "@phosphor-icons/react";
import { useGoogleAuth, useLogin } from "@/services/auth/hooks";
import { toast } from "sonner";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";
import { getUserMe } from "@/services/user/api";

const AuthLoginPage = () => {
  const navigate = useNavigate();
  const googleAuthMutation = useGoogleAuth();
  const loginMutation = useLogin();
  const { registerUser, getNextOnboardingPath } = useAuth();
  const [authMethod, setAuthMethod] = useState<"choice" | "email">("choice");

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [authMethod]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate email on change
    if (name === "email" && emailTouched) {
      validateEmail(value);
    }
  };

  // Validate email format
  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError(null);
      return true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Định dạng email không hợp lệ");
      return false;
    }

    setEmailError(null);
    return true;
  };

  // Handle email blur
  const handleEmailBlur = () => {
    setEmailTouched(true);
    validateEmail(formData.email);
  };

  const handleGoogleAuth = async () => {
    try {
      // Sign in with Firebase Google provider
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Call unified Google Auth API - backend decodes the token
      googleAuthMutation.mutate(
        { idToken },
        {
          onSuccess: async (data) => {
            // Register user locally with API response data
            registerUser({
              email: data.user?.email || "",
              name: data.user?.firstName || data.user?.lastName || "",
              avatar: data.user?.avatar,
              authMethod: "google",
            });

            // Fetch user profile to get the latest rescuerStep from backend
            try {
              const userProfile = await getUserMe();
              const nextPath = getNextOnboardingPath(userProfile.rescuerStep);

              if (nextPath === "/profile") {
                toast.success("Đăng nhập thành công!", {
                  description: "Chào mừng bạn quay trở lại.",
                  duration: 3000,
                });
                navigate("/profile");
              } else {
                toast.success("Xác thực thành công!", {
                  description: "Chào mừng bạn đến với ResQ.",
                  duration: 3000,
                });
                navigate(nextPath);
              }
            } catch {
              // Fallback
              navigate("/auth/personal-info");
            }
          },
          onError: (error) => {
            console.error("Google Auth failed:", error);
          },
        },
      );
    } catch (error) {
      console.error("Firebase sign-in failed:", error);
      toast.error("Đăng nhập thất bại", {
        description: "Vui lòng thử lại.",
        duration: 3000,
      });
    }
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) return;

    loginMutation.mutate(
      { email: formData.email, password: formData.password },
      {
        onSuccess: async (data) => {
          // Register user in auth context
          registerUser({
            email: data.email,
            name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
            authMethod: "email",
          });

          try {
            const userProfile = await getUserMe();
            const nextPath = getNextOnboardingPath(userProfile.rescuerStep);

            if (nextPath === "/profile") {
              toast.success("Đăng nhập thành công!", {
                description: "Chào mừng bạn quay trở lại.",
                duration: 3000,
              });
            }

            navigate(nextPath);
          } catch {
            navigate("/auth/personal-info");
          }
        },
      },
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-16 border-b border-black/10 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <Link to="/" className="hover:opacity-70 transition-opacity">
          <img
            src="/resq_typo_logo.svg"
            alt="ResQ SOS"
            className="h-12 sm:h-14 lg:h-16 w-auto"
          />
        </Link>
        <Link
          to="/auth/register"
          className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/60 hover:text-black transition-colors"
        >
          Chưa có tài khoản? Đăng ký
        </Link>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left - Form Section */}
        <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-12 sm:py-16 lg:py-20 border-b lg:border-b-0 lg:border-r border-black/10">
          <div ref={formRef} className="max-w-md mx-auto w-full">
            {/* Back Button */}
            {authMethod === "email" && (
              <button
                onClick={() => setAuthMethod("choice")}
                className="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-8"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Quay lại
              </button>
            )}

            {/* Header */}
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
              Chào mừng trở lại
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-4">
              ĐĂNG NHẬP
              <br />
              <span className="text-black/30">RESQ SOS</span>
            </h1>
            <p className="text-sm sm:text-base text-black/60 mb-8">
              Tiếp tục hành trình cứu hộ cùng cộng đồng
            </p>

            {/* Auth Methods */}
            {authMethod === "choice" ? (
              <div className="space-y-4">
                {/* Google Auth - Firebase signInWithPopup */}
                <button
                  onClick={handleGoogleAuth}
                  disabled={googleAuthMutation.isPending}
                  className="w-full px-6 py-4 bg-white border-2 border-black text-black text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {googleAuthMutation.isPending
                    ? "Đang xử lý..."
                    : "Tiếp tục với Google"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-black/10" />
                  <span className="text-xs text-black/40 uppercase tracking-wider">
                    Hoặc
                  </span>
                  <div className="flex-1 h-px bg-black/10" />
                </div>

                {/* Email Sign In */}
                <button
                  onClick={() => setAuthMethod("email")}
                  className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-3 group"
                >
                  <EnvelopeSimpleIcon className="w-5 h-5" weight="bold" />
                  Đăng nhập với Email
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              /* Email Form */
              <form onSubmit={handleEmailSignIn} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <EnvelopeSimple className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleEmailBlur}
                      placeholder="email@example.com"
                      required
                      className={`w-full pl-12 pr-12 py-4 border-2 focus:border-black outline-none text-sm transition-all rounded-lg ${
                        emailError && emailTouched
                          ? "border-red-500 focus:border-red-500"
                          : formData.email && !emailError && emailTouched
                            ? "border-green-500"
                            : "border-black/20"
                      }`}
                    />
                    <AnimatePresence>
                      {formData.email && (
                        <motion.button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, email: "" }));
                            setEmailError(null);
                            setEmailTouched(false);
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-black/5 rounded-full p-1 transition-colors group"
                        >
                          <X
                            className="w-4 h-4 text-black/40 group-hover:text-red-500 transition-colors"
                            weight="bold"
                          />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence mode="wait">
                    {emailError && emailTouched && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-sm text-red-500 flex items-center gap-1 mt-2"
                      >
                        <X className="w-4 h-4" /> {emailError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/60">
                      Mật khẩu
                    </label>
                    <Link
                      to="/auth/forgot-password"
                      className="text-xs text-[#FF5722] hover:underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-12 py-4 border-2 border-black/20 focus:border-black outline-none text-sm transition-colors rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    loginMutation.isPending ||
                    !!emailError ||
                    !formData.email ||
                    !formData.password
                  }
                  className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                >
                  {loginMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Đăng nhập
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Register Link */}
            <p className="text-sm text-black/60 mt-8 text-center">
              Chưa có tài khoản?{" "}
              <Link
                to="/auth/register"
                className="text-black font-bold hover:text-[#FF5722] transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        {/* Right - Visual Section */}
        <div className="hidden lg:flex flex-col bg-[#FF5722] text-white">
          <div className="flex-1 flex flex-col justify-center px-10 xl:px-16 py-16">
            <h2 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.1] mb-8">
              SẴN SÀNG
              <br />
              HỖ TRỢ
              <br />
              <span className="text-white/60">CỘNG ĐỒNG.</span>
            </h2>
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              Đăng nhập để tiếp tục tham gia các hoạt động cứu hộ và hỗ trợ cộng
              đồng miền Trung.
            </p>
          </div>

          {/* Image */}
          <div className="h-70 xl:h-86 relative overflow-hidden">
            <img
              src="/images/tnv.png"
              alt="Tình nguyện viên"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#FF6F37] to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-black" />
    </div>
  );
};

export default AuthLoginPage;
