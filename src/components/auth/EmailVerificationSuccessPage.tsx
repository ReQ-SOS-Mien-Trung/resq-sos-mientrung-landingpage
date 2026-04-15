import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";

const EmailVerificationSuccessPage = () => {
  const REDIRECT_DELAY_MS = 10_000;
  const REDIRECT_DELAY_SECONDS = REDIRECT_DELAY_MS / 1000;
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [canStartRedirect, setCanStartRedirect] = useState(
    sessionStorage.getItem("splash_seen") === "1",
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (canStartRedirect) return;

    const timer = setInterval(() => {
      if (sessionStorage.getItem("splash_seen") === "1") {
        setCanStartRedirect(true);
        clearInterval(timer);
      }
    }, 120);

    return () => clearInterval(timer);
  }, [canStartRedirect]);

  useEffect(() => {
    if (!canStartRedirect) return;

    const timer = setTimeout(() => {
      navigate("/auth/login");
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(timer);
  }, [canStartRedirect, navigate]);

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
              <CheckCircle
                className="w-14 h-14 text-[#00A650]"
                weight="duotone"
              />
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
            Email của bạn đã được xác thực thành công. Bạn sẽ được chuyển đến
            trang đăng nhập sau {REDIRECT_DELAY_SECONDS} giây...
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
                animate={{ width: canStartRedirect ? "100%" : "0%" }}
                transition={{
                  duration: canStartRedirect ? REDIRECT_DELAY_SECONDS : 0,
                  ease: "linear",
                }}
              />
            </div>
            <p className="text-xs text-black/40 mt-2">
              {canStartRedirect ? "Đang chuyển hướng..." : "Đang tải..."}
            </p>
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
