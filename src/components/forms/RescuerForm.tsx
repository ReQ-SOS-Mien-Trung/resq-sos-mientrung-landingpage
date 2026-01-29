import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Save, AlertCircle } from "lucide-react";
import { useState } from "react";

const rescuerFormSchema = z.object({
  name: z.string().min(2, "Tên đội/cá nhân phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ (10-11 số)"),

  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  latitude: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        (!isNaN(Number(val)) && Number(val) >= -90 && Number(val) <= 90),
      "Vĩ độ phải từ -90 đến 90",
    ),
  longitude: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        (!isNaN(Number(val)) && Number(val) >= -180 && Number(val) <= 180),
      "Kinh độ phải từ -180 đến 180",
    ),

  vehicleType: z.enum(["motorboat", "small_boat", "high_clearance_vehicle"], {
    message: "Vui lòng chọn phương tiện",
  }),

  hasMedicalStaff: z.boolean(),
  hasSwimmingRescue: z.boolean(),
  hasLifeJackets: z.boolean(),

  capacity: z
    .string()
    .min(1, "Tải trọng là bắt buộc")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Tải trọng phải là số dương",
    ),
});

type RescuerFormData = z.infer<typeof rescuerFormSchema>;

const RescuerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RescuerFormData>({
    resolver: zodResolver(rescuerFormSchema),
    defaultValues: {
      hasMedicalStaff: false,
      hasSwimmingRescue: false,
      hasLifeJackets: false,
    },
  });

  const vehicleType = watch("vehicleType");

  const onSubmit = async (data: RescuerFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Transform data to match backend format
      const payload = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        location: {
          latitude: data.latitude ? parseFloat(data.latitude) : undefined,
          longitude: data.longitude ? parseFloat(data.longitude) : undefined,
        },
        vehicleType: data.vehicleType,
        capabilities: {
          hasMedicalStaff: data.hasMedicalStaff,
          hasSwimmingRescue: data.hasSwimmingRescue,
          hasLifeJackets: data.hasLifeJackets,
        },
        capacity: parseInt(data.capacity, 10),
      };

      // TODO: Replace with actual API endpoint
      console.log("Submitting form data:", payload);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="register"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Đăng Ký Đội Cứu Hộ
            </h2>
            <p className="text-xl text-gray-600">
              Điền thông tin để tham gia mạng lưới cứu hộ Mientrung
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8"
          >
            {/* Thông tin cơ bản */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-red pb-2">
                Thông tin cơ bản
              </h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên đội / Cá nhân <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent`}
                  placeholder="VD: Đội cứu hộ ABC"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent`}
                  placeholder="VD: 0901234567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Vị trí tập kết */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-blue pb-2">
                Vị trí tập kết
              </h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
                  placeholder="VD: 123 Đường ABC, Phường XYZ, Thành phố..."
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vĩ độ (Latitude) - Tùy chọn
                  </label>
                  <input
                    type="text"
                    {...register("latitude")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.latitude ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
                    placeholder="VD: 16.0544"
                  />
                  {errors.latitude && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.latitude.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kinh độ (Longitude) - Tùy chọn
                  </label>
                  <input
                    type="text"
                    {...register("longitude")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.longitude ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
                    placeholder="VD: 108.2022"
                  />
                  {errors.longitude && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.longitude.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Phương tiện */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-orange pb-2">
                Phương tiện <span className="text-red-500">*</span>
              </h3>
              <div className="space-y-3">
                {[
                  {
                    value: "motorboat",
                    label: "Thuyền máy",
                    description: "Nước sâu, dòng chảy mạnh",
                  },
                  {
                    value: "small_boat",
                    label: "Ghe nhỏ",
                    description: "Ngõ hẹp, nước nông",
                  },
                  {
                    value: "high_clearance_vehicle",
                    label: "Xe gầm cao / Xe tải",
                    description: "Vận chuyển nhu yếu phẩm, nước < 0.5m",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      vehicleType === option.value
                        ? "border-primary-orange bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register("vehicleType")}
                      className="mt-1 mr-3 w-5 h-5 text-primary-orange focus:ring-primary-orange"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
                {errors.vehicleType && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.vehicleType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Kỹ năng & Trang bị */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-teal pb-2">
                Kỹ năng & Trang bị
              </h3>
              <div className="space-y-3">
                {[
                  {
                    field: "hasMedicalStaff" as const,
                    label: "Có nhân viên y tế / Sơ cứu",
                  },
                  {
                    field: "hasSwimmingRescue" as const,
                    label: "Bơi lội giỏi / Cứu hộ dưới nước",
                  },
                  {
                    field: "hasLifeJackets" as const,
                    label: "Có áo phao dự trữ",
                  },
                ].map((option) => (
                  <label
                    key={option.field}
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-teal cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      {...register(option.field)}
                      className="w-5 h-5 text-primary-teal rounded focus:ring-primary-teal mr-3"
                    />
                    <span className="text-gray-900 font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tải trọng */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-red pb-2">
                Tải trọng <span className="text-red-500">*</span>
              </h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số người hoặc kg hàng
                </label>
                <input
                  type="number"
                  min="1"
                  {...register("capacity")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.capacity ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent`}
                  placeholder="VD: 10 (người) hoặc 500 (kg)"
                />
                {errors.capacity && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.capacity.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center"
                >
                  <p className="text-green-700 font-semibold">
                    ✓ Đăng ký thành công! Cảm ơn bạn đã tham gia mạng lưới cứu
                    hộ.
                  </p>
                </motion.div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-red to-primary-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Đăng ký
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RescuerForm;
