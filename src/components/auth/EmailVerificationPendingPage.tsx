import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { EnvelopeSimple, ArrowRight, PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";
import { useResendVerification } from "@/services/auth/hooks";
import { getUserMe } from "@/services/user/api";
import { toast } from "sonner";

const EmailVerificationPendingPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const resendMutation = useResendVerification();

    const email = searchParams.get("email") || "";
    const [cooldown, setCooldown] = useState(0);
    const [isVerified, setIsVerified] = useState(false);
    const [dots, setDots] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Animate entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Animated dots
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Cooldown timer
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    // Poll for email verification every 5 seconds
    useEffect(() => {
        if (isVerified) return;

        const pollInterval = setInterval(async () => {
            try {
                const userProfile = await getUserMe();
                if (userProfile.isEmailVerified) {
                    setIsVerified(true);
                    clearInterval(pollInterval);
                    toast.success("Email đã được xác thực!", {
                        description: "Đang chuyển hướng...",
                        duration: 2000,
                    });
                    // Wait a moment for the user to see the success state
                    setTimeout(() => {
                        if (userProfile.isOnboarded) {
                            navigate("/profile");
                        } else {
                            navigate("/auth/personal-info");
                        }
                    }, 2000);
                }
            } catch {
                // Silently fail - user may not have token yet
            }
        }, 5000);

        return () => clearInterval(pollInterval);
    }, [isVerified, navigate]);

    const handleResend = () => {
        if (!email) {
            toast.error("Không tìm thấy email", {
                description: "Vui lòng quay lại trang đăng ký.",
            });
            return;
        }

        resendMutation.mutate(
            { email },
            {
                onSuccess: () => {
                    setCooldown(60);
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
            <main className="flex items-center justify-center px-4 py-16 sm:py-24">
                <div ref={contentRef} className="w-full max-w-lg text-center">
                    {/* Animated Icon */}
                    {isVerified ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="w-24 h-24 mx-auto mb-8 bg-green-500/10 rounded-full flex items-center justify-center"
                        >
                            <CheckCircle className="w-12 h-12 text-green-500" weight="duotone" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="relative w-24 h-24 mx-auto mb-8"
                        >
                            {/* Pulsing ring */}
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-[#FF5722]/20 rounded-full"
                            />
                            <div className="absolute inset-0 bg-[#FF5722]/10 rounded-full flex items-center justify-center">
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <EnvelopeSimple className="w-12 h-12 text-[#FF5722]" weight="duotone" />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                        {isVerified ? "EMAIL ĐÃ XÁC THỰC!" : "KIỂM TRA EMAIL CỦA BẠN"}
                    </h1>

                    {/* Description */}
                    {isVerified ? (
                        <p className="text-sm sm:text-base text-green-600 mb-8">
                            Đang chuyển hướng đến trang khảo sát...
                        </p>
                    ) : (
                        <>
                            <p className="text-sm sm:text-base text-black/60 mb-2">
                                Chúng tôi đã gửi email xác thực đến:
                            </p>
                            <p className="text-base sm:text-lg font-bold text-black mb-6">
                                {email || "email của bạn"}
                            </p>
                            <p className="text-sm text-black/50 mb-8">
                                Vui lòng mở email và bấm vào link xác thực để tiếp tục{dots}
                            </p>
                        </>
                    )}

                    {/* Loading bar */}
                    {!isVerified && (
                        <div className="w-full max-w-xs mx-auto mb-8">
                            <div className="h-1 bg-black/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#FF5722] rounded-full"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ width: "40%" }}
                                />
                            </div>
                            <p className="text-xs text-black/40 mt-2">Đang chờ xác thực email...</p>
                        </div>
                    )}

                    {/* Resend Button */}
                    {!isVerified && (
                        <div className="space-y-4">
                            <button
                                onClick={handleResend}
                                disabled={resendMutation.isPending || cooldown > 0}
                                className="px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {resendMutation.isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Đang gửi...
                                    </>
                                ) : cooldown > 0 ? (
                                    <>Gửi lại sau {cooldown}s</>
                                ) : (
                                    <>
                                        <PaperPlaneTilt className="w-4 h-4" weight="bold" />
                                        Gửi lại email xác thực
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {/* Info */}
                            <div className="p-4 bg-black/5 rounded-lg max-w-sm mx-auto">
                                <p className="text-xs text-black/60">
                                    Không nhận được email? Kiểm tra thư mục <strong>Spam</strong> hoặc thử gửi lại.
                                    Link xác thực sẽ hết hạn sau <strong>24 giờ</strong>.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Back to register */}
                    {!isVerified && (
                        <p className="text-center text-sm text-black/60 mt-8">
                            Sai email?{" "}
                            <Link
                                to="/auth/register"
                                className="font-bold text-black hover:text-[#FF5722] transition-colors"
                            >
                                Đăng ký lại
                            </Link>
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EmailVerificationPendingPage;
