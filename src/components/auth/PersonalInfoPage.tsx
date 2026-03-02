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
  X,
  CaretDown
} from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";
import { useApplyRescuer } from "@/services/form/hooks";
import { toast } from "sonner";

const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, onboardingStatus, isLoading: authLoading } = useAuth();
  const applyMutation = useApplyRescuer();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Province / Ward dropdown state
  const [provinces, setProvinces] = useState<{ code: number; name: string }[]>([]);
  const [wards, setWards] = useState<{ code: number; name: string }[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<number | null>(null);
  const [cityOpen, setCityOpen] = useState(false);
  const [wardOpen, setWardOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [wardSearch, setWardSearch] = useState("");

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    ward: "",
    city: "",
    latitude: 0,
    longitude: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const wardDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authLoading) return; 

    if (!isAuthenticated) {
      navigate("/auth/register");
      return;
    }
    if (onboardingStatus.isComplete) {
      navigate("/profile");
      return;
    }
  }, [authLoading, isAuthenticated, onboardingStatus.isComplete, navigate]);



  useEffect(() => {
    if (!containerRef.current || !formRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [authLoading]);

  // Fetch provinces on mount
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/v2/")
      .then(r => r.json())
      .then(data => setProvinces(data))
      .catch(() => {});
  }, []);

  // Fetch wards when province changes
  useEffect(() => {
    if (!selectedProvinceCode) { setWards([]); return; }
    fetch(`https://provinces.open-api.vn/api/v2/p/${selectedProvinceCode}?depth=2`)
      .then(r => r.json())
      .then(data => setWards(data.wards || []))
      .catch(() => {});
  }, [selectedProvinceCode]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node)) setCityOpen(false);
      if (wardDropdownRef.current && !wardDropdownRef.current.contains(e.target as Node)) setWardOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            city: address.city || address.state || address.province || "",
            latitude,
            longitude,
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
      city: "",
      latitude: 0,
      longitude: 0,
    }));
    setSelectedProvinceCode(null);
    setWards([]);
    setLocationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Vui lòng đồng ý với điều khoản để tiếp tục");
      return;
    }

    let { latitude, longitude } = profileData;
    setGeocodeError(null);

    // If no GPS coords yet, try to geocode from the typed address
    if (latitude === 0 && longitude === 0) {
      const query = [profileData.address, profileData.ward, profileData.city]
        .filter(Boolean)
        .join(", ");

      if (!query.trim()) {
        setGeocodeError("Vui lòng nhập địa chỉ để xác định vị trí.");
        return;
      }

      setIsGeocoding(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&accept-language=vi`
        );
        const data = await res.json();
        if (data.length > 0) {
          latitude = parseFloat(data[0].lat);
          longitude = parseFloat(data[0].lon);
        } else {
          toast.warning("Không xác định được tọa độ chính xác. Hồ sơ vẫn được gửi, bạn có thể cập nhật vị trí sau.");
        }
      } catch {
        toast.warning("Lỗi kết nối khi tra cứu tọa độ. Hồ sơ vẫn được gửi với vị trí chưa xác định.");
      }
      setIsGeocoding(false);
    }

    setIsSubmitting(true);

    applyMutation.mutate(
      {
        rescuerType: "normal",
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone.startsWith("0") ? profileData.phone : `0${profileData.phone}`,
        address: profileData.address,
        ward: profileData.ward,
        province: profileData.city,
        latitude,
        longitude,
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          navigate("/auth/ability-check");
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
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
        <Link to="/" className="hover:opacity-70 transition-opacity">
          <img
            src="/resq_typo_logo.svg"
            alt="ResQ SOS"
            className="h-12 sm:h-14 lg:h-16 w-auto"
          />
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
                    className={`w-full pl-12 pr-4 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg ${profileData.firstName ? 'border-[#00A650]' : 'border-black/20'
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
                      className={`w-full pl-12 pr-4 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg ${phoneError ? 'border-red-500' : profileData.phone.length === 9 ? 'border-[#00A650]' : 'border-black/20'
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

                {/* City/Province Searchable Dropdown */}
                <div className="relative" ref={cityDropdownRef}>
                  <div className="relative">
                    <input
                      type="text"
                      value={citySearch || profileData.city}
                      onChange={e => { setCitySearch(e.target.value); setCityOpen(true); setProfileData(prev => ({ ...prev, city: "", ward: "" })); setSelectedProvinceCode(null); setWards([]); }}
                      onFocus={() => { setCityOpen(true); setCitySearch(""); }}
                      placeholder="Tỉnh/Thành phố *"
                      readOnly={!!profileData.city && !cityOpen}
                      className={`w-full px-4 pr-10 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg cursor-pointer ${
                        cityOpen ? 'border-black' : profileData.city ? 'border-[#00A650]' : 'border-black/20'
                      }`}
                    />
                    <CaretDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 transition-transform pointer-events-none ${cityOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {cityOpen && (
                    <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border-2 border-black rounded-lg shadow-xl overflow-y-auto" style={{ maxHeight: '220px' }}>
                      {provinces.length === 0 && (
                        <p className="text-sm text-black/40 px-4 py-3 text-center">Đang tải...</p>
                      )}
                      {provinces
                        .filter(p => p.name.toLowerCase().includes((citySearch || "").toLowerCase()))
                        .map(p => (
                          <button
                            key={p.code}
                            type="button"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => {
                              setProfileData(prev => ({ ...prev, city: p.name, ward: "" }));
                              setSelectedProvinceCode(p.code);
                              setWards([]);
                              setCityOpen(false);
                              setCitySearch("");
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-black/5 transition-colors ${
                              profileData.city === p.name ? 'bg-[#FF5722]/10 text-[#FF5722] font-bold' : ''
                            }`}
                          >
                            {p.name}
                          </button>
                        ))
                      }
                      {provinces.length > 0 && provinces.filter(p => p.name.toLowerCase().includes((citySearch || "").toLowerCase())).length === 0 && (
                        <p className="text-sm text-black/40 px-4 py-3 text-center">Không tìm thấy</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Ward Searchable Dropdown */}
                <div className="relative" ref={wardDropdownRef}>
                  <div className="relative">
                    <input
                      type="text"
                      value={wardSearch || profileData.ward}
                      disabled={!selectedProvinceCode}
                      onChange={e => { setWardSearch(e.target.value); setWardOpen(true); setProfileData(prev => ({ ...prev, ward: "" })); }}
                      onFocus={() => { setWardOpen(true); setWardSearch(""); }}
                      placeholder="Phường/Xã"
                      readOnly={!!profileData.ward && !wardOpen}
                      className={`w-full px-4 pr-10 py-4 border-2 focus:border-black outline-none text-sm transition-colors rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                        wardOpen ? 'border-black' : profileData.ward ? 'border-[#00A650]' : 'border-black/20'
                      }`}
                    />
                    <CaretDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 transition-transform pointer-events-none ${wardOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {wardOpen && (
                    <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border-2 border-black rounded-lg shadow-xl overflow-y-auto" style={{ maxHeight: '220px' }}>
                      {wards
                        .filter(w => w.name.toLowerCase().includes((wardSearch || "").toLowerCase()))
                        .map(w => (
                          <button
                            key={w.code}
                            type="button"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => {
                              setProfileData(prev => ({ ...prev, ward: w.name }));
                              setWardOpen(false);
                              setWardSearch("");
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-black/5 transition-colors ${
                              profileData.ward === w.name ? 'bg-[#FF5722]/10 text-[#FF5722] font-bold' : ''
                            }`}
                          >
                            {w.name}
                          </button>
                        ))
                      }
                      {wards.filter(w => w.name.toLowerCase().includes((wardSearch || "").toLowerCase())).length === 0 && (
                        <p className="text-sm text-black/40 px-4 py-3 text-center">Không tìm thấy</p>
                      )}
                    </div>
                  )}
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

              {/* Geocode error */}
              {geocodeError && (
                <p className="text-xs text-red-500 mt-1 -mb-2">{geocodeError}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!agreedToTerms || !profileData.firstName || !profileData.city || !isPhoneValid || isSubmitting || isGeocoding}
                className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg mt-6"
              >
                {isGeocoding ? (
                  <>
                    <SpinnerGap className="w-4 h-4 animate-spin" />
                    Đang xác định vị trí...
                  </>
                ) : isSubmitting ? (
                  <>
                    <SpinnerGap className="w-4 h-4 animate-spin" />
                    Đang nộp hồ sơ...
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
                <div className="w-10 h-10 bg-white text-[#FF5722] flex items-center justify-center font-black rounded shrink-0">
                  1
                </div>
                <div>
                  <p className="font-bold">Thông tin cá nhân</p>
                  <p className="text-sm text-white/60">Đang thực hiện</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg opacity-60">
                <div className="w-10 h-10 bg-white/20 flex items-center justify-center font-black rounded shrink-0">
                  2
                </div>
                <div>
                  <p className="font-bold">Câu hỏi tiên quyết</p>
                  <p className="text-sm text-white/60">4 câu hỏi đánh giá</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg opacity-60">
                <div className="w-10 h-10 bg-white/20 flex items-center justify-center font-black rounded shrink-0">
                  3
                </div>
                <div>
                  <p className="font-bold">Chứng chỉ &amp; Tài liệu</p>
                  <p className="text-sm text-white/60">Tải lên chứng chỉ</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg opacity-60">
                <div className="w-10 h-10 bg-white/20 flex items-center justify-center font-black rounded shrink-0">
                  4
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
