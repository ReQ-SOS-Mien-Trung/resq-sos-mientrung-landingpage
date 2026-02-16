import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { EnvelopeSimple, ArrowRight, PaperPlaneTilt } from "@phosphor-icons/react";
import { useResendVerification } from "@/services/auth/hooks";

const ResendVerificationPage = () => {
    const [searchParams] = useSearchParams();
    const resendMutation = useResendVerification();

    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [emailTouched, setEmailTouched] = useState(false);
    const [cooldown, setCooldown] = useState(0);

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

    // Cooldown timer
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const validateEmail = (email: string) => {
        if (!email) {
            setEmailError("Vui lòng nhập email");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Định dạng email không hợp lệ");
            return false;
        }
        setEmailError(null);
        return true;
    };

    const handleEmailBlur = () => {
        setEmailTouched(true);
        validateEmail(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            return;
        }

        resendMutation.mutate(
            { email },
            {
                onSuccess: () => {
                    setCooldown(60); // 60 seconds cooldown
                },
            }
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
                    to="/auth/login"
                    className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black hover:text-[#FF5722] transition-colors"
                >
                    Đăng nhập
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center px-4 py-12 sm:py-20">
                <div ref={formRef} className="w-full max-w-md">
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="w-20 h-20 mx-auto mb-8 bg-[#FF5722]/10 rounded-full flex items-center justify-center"
                    >
                        <EnvelopeSimple className="w-10 h-10 text-[#FF5722]" weight="duotone" />
                    </motion.div>

                    {/* Header */}
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-center mb-4">
                        XÁC THỰC EMAIL
                    </h1>
                    <p className="text-sm sm:text-base text-black/60 text-center mb-8">
                        Nhập email của bạn để nhận lại link xác thực tài khoản
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
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
                                    onBlur={handleEmailBlur}
                                    placeholder="email@example.com"
                                    required
                                    className={`w-full pl-12 pr-4 py-4 border-2 focus:border-black outline-none text-sm transition-all rounded-lg ${emailError && emailTouched
                                        ? "border-red-500 focus:border-red-500"
                                        : email && !emailError && emailTouched
                                            ? "border-green-500"
                                            : "border-black/20"
                                        }`}
                                />
                            </div>
                            {emailError && emailTouched && (
                                <p className="mt-2 text-xs text-red-500">{emailError}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={resendMutation.isPending || cooldown > 0}
                            className="w-full px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {resendMutation.isPending ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Đang gửi...
                                </>
                            ) : cooldown > 0 ? (
                                <>Gửi lại sau {cooldown}s</>
                            ) : (
                                <>
                                    <PaperPlaneTilt className="w-5 h-5" weight="bold" />
                                    Gửi email xác thực
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Info Note */}
                    <div className="mt-8 p-4 bg-black/5 rounded-lg">
                        <p className="text-xs text-black/60 text-center">
                            Không nhận được email? Kiểm tra thư mục <strong>Spam</strong> hoặc thử gửi lại sau vài phút.
                        </p>
                    </div>

                    {/* Back to Register */}
                    <p className="text-center text-sm text-black/60 mt-8">
                        Chưa có tài khoản?{" "}
                        <Link
                            to="/auth/register"
                            className="font-bold text-black hover:text-[#FF5722] transition-colors"
                        >
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default ResendVerificationPage;
