import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";

const EmailVerificationSuccessPage = () => {
    const navigate = useNavigate();
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

    // Auto redirect to survey page after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/auth/login");
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

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
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6, bounce: 0.5 }}
                        className="w-28 h-28 mx-auto mb-8 bg-[#00A650]/10 rounded-full flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", duration: 0.5 }}
                        >
                            <CheckCircle className="w-14 h-14 text-[#00A650]" weight="duotone" />
                        </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-2xl sm:text-3xl font-black tracking-tight mb-4"
                    >
                        XÁC THỰC EMAIL THÀNH CÔNG!
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-sm sm:text-base text-black/60 mb-8"
                    >
                        Email của bạn đã được xác thực thành công. Bạn sẽ được chuyển đến trang đăng nhập...
                    </motion.p>

                    {/* Loading bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="w-full max-w-xs mx-auto mb-8"
                    >
                        <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#00A650] rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "linear" }}
                            />
                        </div>
                        <p className="text-xs text-black/40 mt-2">Đang chuyển hướng...</p>
                    </motion.div>

                    {/* Manual redirect button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Link
                            to="/auth/login"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors group"
                        >
                            Đăng nhập ngay
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default EmailVerificationSuccessPage;
