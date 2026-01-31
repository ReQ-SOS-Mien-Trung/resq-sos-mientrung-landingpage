import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  User, 
  Phone,
  MapPin,
  Check,
  Crosshair,
  SpinnerGap,
  X
} from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";

const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, onboardingStatus, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

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

  // Redirect if not authenticated or already completed onboarding
  useEffect(() => {
    if (authLoading) return; // Wait until auth state is loaded
    
    if (!isAuthenticated) {
      navigate("/auth/register");
      return;
    }
    if (onboardingStatus.isComplete) {
      navigate("/profile");
      return;
    }
  }, [authLoading, isAuthenticated, onboardingStatus.isComplete, navigate]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("personalInfo");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProfileData(parsed);
      } catch (error) {
        console.error("Error loading saved profile data:", error);
      }
    }
  }, []);

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

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validate phone number
    if (name === "phone") {
      // Only allow digits and remove leading zeros
      const digitsOnly = value.replace(/\D/g, "").replace(/^0+/, "");
      
      // Check validation - only show error for length
      if (digitsOnly.length > 0 && digitsOnly.length !== 9) {
        setPhoneError("Số điện thoại phải có đúng 9 chữ số");
      } else {
        setPhoneError(null);
      }
      
      // Limit to 9 digits
      const cleanedValue = digitsOnly.slice(0, 9);
      
      setProfileData((prev) => ({ ...prev, [name]: cleanedValue }));
      return;
    }
    
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Check if phone is valid (empty or exactly 9 digits)
  const isPhoneValid = profileData.phone.length === 0 || profileData.phone.length === 9;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Trình duyệt không hỗ trợ định vị");
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use Nominatim API (OpenStreetMap) for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=vi`
          );
          
          if (!response.ok) throw new Error("Failed to fetch location");
          
          const data = await response.json();
          const address = data.address;
          
          // Build street address
          let streetAddress = "";
          if (address.house_number) streetAddress += address.house_number + " ";
          if (address.road) streetAddress += address.road;
          if (!streetAddress && address.neighbourhood) streetAddress = address.neighbourhood;
          
          setProfileData((prev) => ({
            ...prev,
            address: streetAddress.trim() || "",
            ward: address.suburb || address.quarter || address.village || "",
            district: address.city_district || address.county || address.town || "",
            city: address.city || address.state || address.province || "",
          }));
          
        } catch {
          setLocationError("Không thể lấy địa chỉ. Vui lòng nhập thủ công.");
        } finally {
          setIsGettingLocation(false);
        }
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
            setLocationError("Hết thời gian chờ");
            break;
          default:
            setLocationError("Có lỗi xảy ra khi lấy vị trí");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleClearLocation = () => {
    setProfileData((prev) => ({
      ...prev,
      address: "",
      ward: "",
      district: "",
      city: "",
    }));
    setLocationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Vui lòng đồng ý với điều khoản để tiếp tục");
      return;
    }
    
    setIsLoading(true);
    
    // Save profile data to localStorage for later use
    localStorage.setItem("personalInfo", JSON.stringify(profileData));
    
    // Navigate to ability questions
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth/ability-check");
    }, 500);
  };

  // Calculate progress
  const filledFields = [
    profileData.firstName,
    profileData.city,
    agreedToTerms,
  ].filter(Boolean).length;
  const progress = (filledFields / 3) * 100;

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-black/60">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-16 border-b border-black/10 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <Link to="/" className="text-lg font-black tracking-tight">
          ResQ SOS
        </Link>
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/60">
          Thông tin cá nhân
        </span>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left - Form Section */}
        <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-black/10">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black/60">
                Bước 1/3 - Thông tin cá nhân
              </span>
              <span className="text-xs font-bold text-black">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF5722]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          <div ref={formRef} className="flex-1">
            {/* Header */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-4">
              THÔNG TIN
              <br />
              <span className="text-black/30">CÁ NHÂN</span>
            </h1>
            <p className="text-sm sm:text-base text-black/60 mb-8">
              Điền thông tin để chúng tôi có thể liên hệ với bạn khi cần
            </p>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                    placeholder="Văn A"
                    required
                    className={`w-full pl-12 pr-4 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg ${
                      profileData.firstName ? 'border-[#00A650]' : 'border-black/20'
                    }`}
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
                  <div className="flex items-center gap-2 px-4 py-4 border-2 border-black/20 rounded-lg bg-gray-50 min-w-25">
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
                      placeholder="xxxxxxxxx"
                      maxLength={9}
                      className={`w-full pl-12 pr-4 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg ${
                        phoneError ? 'border-red-500' : profileData.phone.length === 9 ? 'border-[#00A650]' : 'border-black/20'
                      }`}
                    />
                  </div>
                </div>
                {phoneError && (
                  <p className="text-xs text-red-500 mt-1">{phoneError}</p>
                )}
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
                  className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-colors ${agreedToTerms ? 'bg-[#00A650] text-white' : 'border-2 border-black/20'}`}
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
                disabled={isLoading || !agreedToTerms || !profileData.firstName || !profileData.city || !isPhoneValid}
                className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg mt-6"
              >
                {isLoading ? (
                  <>
                    <SpinnerGap className="w-4 h-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    Tiếp tục
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right - Info Section */}
        <div className="hidden lg:flex flex-col bg-[#FF5722] text-white">
          <div className="flex-1 flex flex-col justify-center px-10 xl:px-16 py-16">
            <h2 className="text-3xl xl:text-4xl font-black tracking-tight leading-[1.1] mb-6">
              HOÀN TẤT
              <br />
              HỒ SƠ
              <br />
              <span className="text-white/40">CỦA BẠN.</span>
            </h2>
            <p className="text-base text-white/80 max-w-md leading-relaxed mb-8">
              Thông tin này giúp chúng tôi liên hệ với bạn khi có nhiệm vụ cứu hộ phù hợp trong khu vực của bạn.
            </p>

            {/* Steps Progress */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
                <div className="w-10 h-10 bg-white text-[#FF5722] flex items-center justify-center font-black rounded">
                  1
                </div>
                <div>
                  <p className="font-bold">Thông tin cá nhân</p>
                  <p className="text-sm text-white/60">Đang thực hiện</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg opacity-60">
                <div className="w-10 h-10 bg-white/20 flex items-center justify-center font-black rounded">
                  2
                </div>
                <div>
                  <p className="font-bold">Câu hỏi tiên quyết</p>
                  <p className="text-sm text-white/60">4 câu hỏi đánh giá</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg opacity-60">
                <div className="w-10 h-10 bg-white/20 flex items-center justify-center font-black rounded">
                  3
                </div>
                <div>
                  <p className="font-bold">Kỹ năng chi tiết</p>
                  <p className="text-sm text-white/60">Đánh giá năng lực</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-black" />
    </div>
  );
};

export default PersonalInfoPage;
