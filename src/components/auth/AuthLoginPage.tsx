import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon, EnvelopeSimpleIcon, EyeIcon, EyeSlashIcon, LockIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight, EnvelopeSimple, X } from "@phosphor-icons/react";
import { useGoogleLogin } from "@/services/auth/hooks";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

const AuthLoginPage = () => {
  const navigate = useNavigate();
  const googleLoginMutation = useGoogleLogin();
  const [authMethod, setAuthMethod] = useState<"choice" | "email">("choice");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
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

  const handleGoogleSignIn = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      googleLoginMutation.mutate(
        { idToken: credentialResponse.credential },
        {
          onSuccess: () => {
            // Navigate to home or dashboard after successful login
            navigate("/");
          },
        }
      );
    }
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login - Replace with actual implementation
    setTimeout(() => {
      console.log("Email Sign In:", formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-16 border-b border-black/10 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <Link to="/" className="text-lg font-black tracking-tight">
          ResQ SOS
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
                {/* Google Sign In */}
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSignIn}
                    onError={() => {
                      console.error('Google Login Failed');
                    }}
                    useOneTap
                    theme="outline"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                    width="100%"
                  />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-black/10" />
                  <span className="text-xs text-black/40 uppercase tracking-wider">Hoặc</span>
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
                          ? 'border-red-500 focus:border-red-500' 
                          : formData.email && !emailError && emailTouched
                          ? 'border-green-500'
                          : 'border-black/20'
                      }`}
                    />
                    <AnimatePresence>
                      {formData.email && (
                        <motion.button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, email: '' }));
                            setEmailError(null);
                            setEmailTouched(false);
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
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
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
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
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !!emailError || !formData.email || !formData.password}
                  className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                >
                  {isLoading ? (
                    "Đang xử lý..."
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
              <Link to="/auth/register" className="text-black font-bold hover:text-[#FF5722] transition-colors">
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
              Đăng nhập để tiếp tục tham gia các hoạt động cứu hộ và hỗ trợ cộng đồng miền Trung.
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
