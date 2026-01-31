import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  User, 
  ArrowLeft,
  Phone,
  MapPin,
  Check,
  Crosshair,
  SpinnerGap,
  X
} from "@phosphor-icons/react";
import { ArrowLeftIcon, ArrowRightIcon, EnvelopeSimpleIcon, EyeIcon, EyeSlashIcon, LockIcon } from "@phosphor-icons/react/dist/ssr";
import { useRegisterRescuer, useGoogleLogin } from "@/services/auth/hooks";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";

interface GoogleJwtPayload {
  email: string;
  name?: string;
  picture?: string;
}

const AuthRegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterRescuer();
  const googleLoginMutation = useGoogleLogin();
  const { registerUser, isAuthenticated, onboardingStatus, isLoading: authLoading } = useAuth();
  const [step, setStep] = useState<"auth" | "profile">("auth");
  const [authMethod, setAuthMethod] = useState<"choice" | "email">("choice");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailTouched, setEmailTouched] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    city: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (authLoading) return; // Wait until auth state is loaded
    
    if (isAuthenticated) {
      if (onboardingStatus.isComplete) {
        navigate("/profile");
      } else {
        navigate("/auth/personal-info");
      }
    }
  }, [authLoading, isAuthenticated, onboardingStatus.isComplete, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [authMethod, step]);

  const handleAuthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
    
    // Validate email on change
    if (name === "email" && emailTouched) {
      validateEmail(value);
    }
    
    // Validate password on change
    if (name === "password") {
      validatePassword(value);
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
    validateEmail(authData.email);
  };

  // Validate password requirements
  const validatePassword = (password: string) => {
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push("Tối thiểu 6 ký tự");
    }
    if (password.length > 20) {
      errors.push("Tối đa 20 ký tự");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Ít nhất 1 chữ hoa");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Ít nhất 1 chữ thường");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Ít nhất 1 số");
    }
    
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Lấy vị trí GPS từ thiết bị và reverse geocoding
  const handleGetLocation = () => {
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError("Trình duyệt không hỗ trợ định vị");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Dùng Nominatim API (OpenStreetMap) để lấy địa chỉ chi tiết
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=vi&addressdetails=1`
          );
          const data = await response.json();
          
          if (data.address) {
            const addr = data.address;
            
            // Lấy các thông tin địa chỉ
            const road = addr.road || addr.street || addr.pedestrian || "";
            const houseNumber = addr.house_number || "";
            const ward = addr.suburb || addr.quarter || addr.neighbourhood || addr.village || "";
            const district = addr.city_district || addr.district || addr.county || addr.town || "";
            const city = addr.city || addr.state || addr.province || "";
            
            // Tạo địa chỉ đường đầy đủ
            const fullAddress = [houseNumber, road].filter(Boolean).join(" ").trim();
            
            setProfileData(prev => ({
              ...prev,
              address: fullAddress,
              ward: ward,
              district: district,
              city: city,
            }));
            
            setLocationError(null);
          } else {
            setLocationError("Không thể xác định địa chỉ. Vui lòng nhập thủ công.");
          }
        } catch {
          setLocationError("Lỗi kết nối. Vui lòng nhập thủ công.");
        }
        
        setIsGettingLocation(false);
      },
      (error) => {
        setIsGettingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Bạn đã từ chối quyền truy cập vị trí");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Không thể xác định vị trí");
            break;
          case error.TIMEOUT:
            setLocationError("Hết thời gian chờ. Vui lòng thử lại.");
            break;
          default:
            setLocationError("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Xóa địa chỉ đã lấy
  const handleClearLocation = () => {
    setProfileData(prev => ({
      ...prev,
      address: "",
      ward: "",
      district: "",
      city: "",
    }));
    setLocationError(null);
  };

  const handleGoogleSignUp = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      // Decode JWT to get user info
      try {
        const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
        
        // Register user locally
        registerUser({
          email: decoded.email,
          name: decoded.name,
          avatar: decoded.picture,
          authMethod: "google",
        });

        // Call API
        googleLoginMutation.mutate(
          { idToken: credentialResponse.credential },
          {
            onSuccess: () => {
              // Navigate to personal info step
              navigate("/auth/personal-info");
            },
            onError: () => {
              // Still navigate to personal info even if API fails (for demo)
              navigate("/auth/personal-info");
            },
          }
        );
      } catch (error) {
        console.error("Failed to decode Google JWT:", error);
      }
    }
  };

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email and password
    if (!validateEmail(authData.email)) {
      return;
    }
    
    if (!validatePassword(authData.password)) {
      return;
    }
    
    // Register user locally
    registerUser({
      email: authData.email,
      authMethod: "email",
    });
    
    // Call the register mutation
    registerMutation.mutate(
      {
        email: authData.email,
        password: authData.password,
      },
      {
        onSuccess: () => {
          navigate("/auth/personal-info");
        },
        onError: () => {
          // Still navigate to personal info even if API fails (for demo)
          navigate("/auth/personal-info");
        },
      }
    );
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Vui lòng đồng ý với điều khoản dịch vụ!");
      return;
    }
    setIsLoading(true);
    // Simulate profile save - Replace with actual implementation
    setTimeout(() => {
      console.log("Profile Data:", profileData);
      setIsLoading(false);
      // Navigate to success or dashboard
      navigate("/");
    }, 1500);
  };

  const renderAuthStep = () => (
    <>
      {/* Back Button */}
      {authMethod === "email" && (
        <button
          onClick={() => setAuthMethod("choice")}
          className="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>
      )}

      {/* Header */}
      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
        Bước 1/2 - Tạo tài khoản
      </p>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-4">
        ĐĂNG KÝ
        <br />
        <span className="text-black/30">RESQ SOS</span>
      </h1>
      <p className="text-sm sm:text-base text-black/60 mb-8">
        Tham gia cộng đồng cứu hộ lớn nhất miền Trung
      </p>

      {/* Auth Methods */}
      {authMethod === "choice" ? (
        <div className="space-y-4">
          {/* Google Sign Up */}
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleSignUp}
              onError={() => {
                console.error('Google Login Failed');
              }}
              useOneTap
              theme="outline"
              size="large"
              text="signup_with"
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

          {/* Email Sign Up */}
          <button
            onClick={() => setAuthMethod("email")}
            className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-3 group"
          >
            <EnvelopeSimpleIcon className="w-5 h-5" weight="bold" />
            Đăng ký với Email
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        /* Email Form */
        <form onSubmit={handleEmailSignUp} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
              Email <span className="text-[#FF5722]">*</span>
            </label>
            <div className="relative">
              <EnvelopeSimpleIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type="email"
                name="email"
                value={authData.email}
                onChange={handleAuthInputChange}
                onBlur={handleEmailBlur}
                placeholder="email@example.com"
                required
                className={`w-full pl-12 pr-12 py-4 border-2 focus:border-black outline-none text-sm transition-all rounded-lg ${
                  emailError && emailTouched 
                    ? 'border-red-500 focus:border-red-500' 
                    : authData.email && !emailError && emailTouched
                    ? 'border-green-500'
                    : 'border-black/20'
                }`}
              />
              <AnimatePresence>
                {authData.email && (
                  <motion.button
                    type="button"
                    onClick={() => {
                      setAuthData(prev => ({ ...prev, email: '' }));
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
            <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
              Mật khẩu <span className="text-[#FF5722]">*</span>
            </label>
            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={authData.password}
                onChange={handleAuthInputChange}
                placeholder="••••••••"
                required
                minLength={6}
                maxLength={20}
                className={`w-full pl-12 pr-12 py-4 border-2 focus:border-black outline-none text-sm transition-all rounded-lg ${
                  passwordErrors.length > 0 && authData.password
                    ? 'border-red-500 focus:border-red-500'
                    : authData.password && passwordErrors.length === 0
                    ? 'border-green-500'
                    : 'border-black/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            {/* Password Requirements */}
            <AnimatePresence mode="wait">
              {authData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="mt-2 space-y-1 overflow-hidden"
                >
                  {passwordErrors.length > 0 ? (
                    passwordErrors.map((error, index) => (
                      <motion.p
                        key={error}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <X className="w-4 h-4" /> {error}
                      </motion.p>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-green-600 flex items-center gap-1 font-medium"
                    >
                      <Check className="w-4 h-4" weight="bold" /> Mật khẩu hợp lệ
                    </motion.p>
                  )}
                </motion.div>
              )}
              {!authData.password && (
                <p className="text-sm text-black/40 mt-2">6-20 ký tự, có chữ hoa, chữ thường và số</p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={registerMutation.isPending || passwordErrors.length > 0 || !!emailError || !authData.email || !authData.password}
            className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
          >
            {registerMutation.isPending ? (
              <>
                <SpinnerGap className="w-4 h-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                Đăng ký
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Terms */}
      <p className="text-xs text-black/40 mt-6 leading-relaxed">
        Bằng việc đăng ký, bạn đồng ý với{" "}
        <Link to="/terms-of-service" className="text-black hover:text-[#FF5722] underline">
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link to="/privacy-policy" className="text-black hover:text-[#FF5722] underline">
          Chính sách bảo mật
        </Link>{" "}
        của chúng tôi.
      </p>
    </>
  );

  const renderProfileStep = () => (
    <>
      {/* Back Button */}
      <button
        onClick={() => setStep("auth")}
        className="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Quay lại
      </button>

      {/* Header */}
      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF5722] mb-4">
        Bước 2/2 - Thông tin cá nhân
      </p>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-4">
        HOÀN TẤT
        <br />
        <span className="text-black/30">HỒ SƠ CỦA BẠN</span>
      </h1>
      <p className="text-sm sm:text-base text-black/60 mb-8">
        Điền thông tin để chúng tôi có thể liên hệ với bạn
      </p>

      {/* Profile Form */}
      <form onSubmit={handleProfileSubmit} className="space-y-5">
        {/* First Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
            Tên <span className="text-[#FF5722]">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileInputChange}
              placeholder="Ngọc Thảo"
              required
              className="w-full pl-12 pr-4 py-4 border-2 border-black/20 focus:border-black outline-none text-sm transition-colors rounded-lg"
            />
          </div>
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
            Họ
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileInputChange}
              placeholder="Nguyễn"
              className="w-full pl-12 pr-4 py-4 border-2 border-black/20 focus:border-black outline-none text-sm transition-colors rounded-lg"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
            Số điện thoại di động
          </label>
          <div className="flex gap-3">
            {/* Country Code */}
            <div className="flex items-center gap-2 px-4 py-4 border-2 border-black/20 rounded-lg bg-gray-50 min-w-[100px]">
              <img 
                src="https://flagcdn.com/w20/vn.png" 
                alt="Vietnam" 
                className="w-5 h-auto"
              />
              <span className="text-sm font-medium">+84</span>
            </div>
            {/* Phone Input */}
            <div className="relative flex-1">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileInputChange}
                placeholder="964648530"
                className="w-full pl-12 pr-4 py-4 border-2 border-black/20 focus:border-black outline-none text-sm transition-colors rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-black/60">
              Địa chỉ <span className="text-[#FF5722]">*</span>
            </label>
            <div className="flex items-center gap-2">
              {(profileData.address || profileData.city) && (
                <button
                  type="button"
                  onClick={handleClearLocation}
                  className="flex items-center gap-1 text-xs font-medium text-black/40 hover:text-black transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Xóa
                </button>
              )}
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={isGettingLocation}
                className="flex items-center gap-1.5 text-xs font-medium text-[#FF5722] hover:text-[#e64a19] transition-colors disabled:opacity-50"
              >
                {isGettingLocation ? (
                  <>
                    <SpinnerGap className="w-4 h-4 animate-spin" />
                    Đang lấy vị trí...
                  </>
                ) : (
                  <>
                    <Crosshair className="w-4 h-4" />
                    Lấy vị trí hiện tại
                  </>
                )}
              </button>
            </div>
          </div>
          
          {locationError && (
            <p className="text-xs text-red-500">{locationError}</p>
          )}

          {/* Address (Street) */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleProfileInputChange}
              placeholder="Số nhà, tên đường"
              className={`w-full pl-12 pr-4 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg ${profileData.address ? 'border-[#00A650]' : 'border-black/20'}`}
            />
          </div>

          {/* Ward & District Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Ward */}
            <div>
              <input
                type="text"
                name="ward"
                value={profileData.ward}
                onChange={handleProfileInputChange}
                placeholder="Phường/Xã"
                className={`w-full px-4 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg ${profileData.ward ? 'border-[#00A650]' : 'border-black/20'}`}
              />
            </div>
            {/* District */}
            <div>
              <input
                type="text"
                name="district"
                value={profileData.district}
                onChange={handleProfileInputChange}
                placeholder="Quận/Huyện"
                className={`w-full px-4 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg ${profileData.district ? 'border-[#00A650]' : 'border-black/20'}`}
              />
            </div>
          </div>

          {/* City/Province */}
          <div>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={handleProfileInputChange}
              placeholder="Tỉnh/Thành phố *"
              required
              className={`w-full px-4 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg ${profileData.city ? 'border-[#00A650]' : 'border-black/20'}`}
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <button
            type="button"
            onClick={() => setAgreedToTerms(!agreedToTerms)}
            className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-colors ${agreedToTerms ? 'bg-[#00A650] text-white' : 'border-2 border-black/20'}`}
          >
            {agreedToTerms && <Check className="w-4 h-4" weight="bold" />}
          </button>
          <p className="text-sm text-black/60 leading-relaxed">
            Bằng cách tiếp tục, tôi đồng ý với việc ResQ có thể thu thập, sử dụng và tiết lộ thông tin do tôi cung cấp theo{" "}
            <Link to="/privacy-policy" className="text-[#FF5722] hover:underline">
              Thông báo về quyền riêng tư
            </Link>
            . Tôi cũng xác nhận đã đọc, hiểu rõ và hoàn toàn tuân thủ các{" "}
            <Link to="/terms-of-service" className="text-[#FF5722] hover:underline">
              Điều khoản và điều kiện
            </Link>
            .
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !agreedToTerms || !profileData.firstName || !profileData.city}
          className="w-full px-6 py-4 bg-[#00A650] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#008f44] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg mt-6"
        >
          {isLoading ? (
            "Đang xử lý..."
          ) : (
            <>
              Tiếp theo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-16 border-b border-black/10 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <Link to="/" className="text-lg font-black tracking-tight">
          ResQ SOS
        </Link>
        <Link 
          to="/auth/login" 
          className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/60 hover:text-black transition-colors"
        >
          Đã có tài khoản? Đăng nhập
        </Link>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left - Form Section */}
        <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-12 sm:py-16 lg:py-20 border-b lg:border-b-0 lg:border-r border-black/10">
          <div ref={formRef} className="max-w-md mx-auto w-full">
            {step === "auth" ? renderAuthStep() : renderProfileStep()}
          </div>
        </div>

        {/* Right - Visual Section */}
        <div className="hidden lg:flex flex-col bg-black text-white">
          <div className="flex-1 flex flex-col justify-center px-12 xl:px-20 py-20">
            <h2 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.1] mb-8">
              {step === "auth" ? (
                <>
                  THAM GIA
                  <br />
                  CÙNG HÀNG NGÀN
                  <br />
                  <span className="text-[#FF5722]">TÌNH NGUYỆN VIÊN.</span>
                </>
              ) : (
                <>
                  CHỈ CÒN
                  <br />
                  MỘT BƯỚC NỮA
                  <br />
                  <span className="text-[#FF5722]">LÀ HOÀN TẤT.</span>
                </>
              )}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${step === "auth" ? "bg-[#FF5722]" : "bg-[#00A650]"}`}>
                  {step === "profile" ? <Check className="w-4 h-4" weight="bold" /> : <span className="text-sm font-bold">01</span>}
                </div>
                <div>
                  <h3 className="font-bold mb-1">Tạo tài khoản</h3>
                  <p className="text-sm text-white/60">Đăng ký bằng Google hoặc Email</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${step === "profile" ? "bg-[#FF5722]" : "bg-white/20"}`}>
                  <span className="text-sm font-bold">02</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Thông tin cá nhân</h3>
                  <p className="text-sm text-white/60">Hoàn tất hồ sơ của bạn</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">03</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Sẵn sàng hỗ trợ</h3>
                  <p className="text-sm text-white/60">Bắt đầu hành trình cứu hộ</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 border-t border-white/10">
            <div className="p-6 xl:p-8 border-r border-white/10 text-center">
              <span className="block text-2xl xl:text-3xl font-black text-[#FF5722]">500+</span>
              <span className="text-xs uppercase tracking-wider text-white/60">Tình nguyện viên</span>
            </div>
            <div className="p-6 xl:p-8 border-r border-white/10 text-center">
              <span className="block text-2xl xl:text-3xl font-black text-[#FF5722]">50+</span>
              <span className="text-xs uppercase tracking-wider text-white/60">Đội cứu hộ</span>
            </div>
            <div className="p-6 xl:p-8 text-center">
              <span className="block text-2xl xl:text-3xl font-black text-[#FF5722]">24/7</span>
              <span className="text-xs uppercase tracking-wider text-white/60">Hỗ trợ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-[#FF5722]" />
    </div>
  );
};

export default AuthRegisterPage;
