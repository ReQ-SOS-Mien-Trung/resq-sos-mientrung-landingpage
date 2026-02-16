import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Warning,
  ShieldCheck,
  Handshake,
  GraduationCap,
  CheckCircle
} from "@phosphor-icons/react";
import { prerequisiteQuestions } from "@/constants";
import { PersonSimpleSwimIcon } from "@phosphor-icons/react/dist/ssr";
import { useAuth } from "@/hooks/useAuth";
import { useSubmitRescuerConsent } from "@/services/form/hooks";

// Icon mapping
const iconMap = {
  PersonSimpleSwimIcon: <PersonSimpleSwimIcon className="w-8 h-8" weight="bold" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" weight="bold" />,
  Handshake: <Handshake className="w-8 h-8" weight="bold" />,
  GraduationCap: <GraduationCap className="w-8 h-8" weight="bold" />,
};

const AbilityQuestionsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, onboardingStatus, isLoading: authLoading } = useAuth();
  const consentMutation = useSubmitRescuerConsent();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: boolean | null }>({});
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (questionRef.current) {
      gsap.fromTo(
        questionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [currentQuestion]);

  const handleAnswer = (answer: boolean) => {
    if (!answer) {
      // Show warning for "No" answers
      setWarningMessage(prerequisiteQuestions[currentQuestion].warningMessage);
      setShowWarning(true);
      return;
    }

    // Save "Yes" answer and move to next question
    setAnswers((prev) => ({ ...prev, [currentQuestion]: true }));

    if (currentQuestion < prerequisiteQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // All questions answered with "Yes"
      setIsCompleted(true);
    }
  };

  const handleWarningConfirm = () => {
    // User confirms they want to select "No" - show they can't proceed
    setShowWarning(false);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      // At first question, go back to personal info page
      navigate("/auth/personal-info");
    }
  };

  const handleContinue = () => {
    // Call consent API - all 4 must be true
    consentMutation.mutate(
      {
        agreeMedicalFitness: true,
        agreeLegalResponsibility: true,
        agreeTraining: true,
        agreeCodeOfConduct: true,
      },
      {
        onSuccess: () => {
          navigate("/auth/detailed-abilities");
        },
      }
    );
  };

  const progress = ((currentQuestion + (isCompleted ? 1 : 0)) / prerequisiteQuestions.length) * 100;

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
          Bước 2/3 - Câu hỏi tiên quyết
        </span>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left - Questions Section */}
        <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-black/10">

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black/60">
                Câu hỏi {currentQuestion + 1}/{prerequisiteQuestions.length}
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

          {!isCompleted ? (
            <div ref={questionRef} className="flex-1 flex flex-col">
              {/* Question Number & Category */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-10 h-10 bg-black text-white flex items-center justify-center text-lg font-black">
                    {currentQuestion + 1}
                  </span>
                  <div className="text-[#FF5722]">
                    {iconMap[prerequisiteQuestions[currentQuestion].iconName]}
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#FF5722]">
                  {prerequisiteQuestions[currentQuestion].category}
                </p>
                <p className="text-xs text-black/40 uppercase tracking-wider">
                  {prerequisiteQuestions[currentQuestion].categoryEn}
                </p>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight text-black">
                  {prerequisiteQuestions[currentQuestion].question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 flex-1">
                {/* Yes Answer */}
                <button
                  onClick={() => handleAnswer(true)}
                  className="w-full p-4 sm:p-6 border-2 border-black/20 hover:border-[#00A650] hover:bg-[#00A650]/5 transition-all rounded-lg text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-black/20 group-hover:border-[#00A650] group-hover:bg-[#00A650] flex items-center justify-center transition-all flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-black/80 group-hover:text-black">
                      {prerequisiteQuestions[currentQuestion].yesAnswer}
                    </span>
                  </div>
                </button>

                {/* No Answer */}
                <button
                  onClick={() => handleAnswer(false)}
                  className="w-full p-4 sm:p-6 border-2 border-black/20 hover:border-red-500 hover:bg-red-50 transition-all rounded-lg text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-black/20 group-hover:border-red-500 group-hover:bg-red-500 flex items-center justify-center transition-all flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" weight="bold" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-black/80 group-hover:text-black">
                      {prerequisiteQuestions[currentQuestion].noAnswer}
                    </span>
                  </div>
                </button>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm font-bold text-black/60 hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {currentQuestion === 0 ? "Quay lại thông tin" : "Quay lại"}
                </button>
                <div className="flex items-center gap-2">
                  {prerequisiteQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${index === currentQuestion
                        ? "bg-[#FF5722]"
                        : answers[index]
                          ? "bg-[#00A650]"
                          : "bg-black/20"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Completion Screen */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-[#00A650] rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-white" weight="bold" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                Xuất sắc!
              </h2>
              <p className="text-black/60 mb-8 max-w-md">
                Bạn đã hoàn thành các câu hỏi tiên quyết. Tiếp theo, chúng tôi sẽ tìm hiểu về kỹ năng chi tiết của bạn.
              </p>
              <button
                onClick={handleContinue}
                className="px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors flex items-center gap-2 group"
              >
                Tiếp tục
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Right - Info Section */}
        <div className="hidden lg:flex flex-col bg-black text-white">
          <div className="flex-1 flex flex-col justify-center px-10 xl:px-16 py-16">
            <h2 className="text-3xl xl:text-4xl font-black tracking-tight leading-[1.1] mb-6">
              ĐÁNH GIÁ
              <br />
              KHẢ NĂNG
              <br />
              <span className="text-white/40">CỨU HỘ.</span>
            </h2>
            <p className="text-base text-white/60 max-w-md leading-relaxed mb-8">
              Để đảm bảo an toàn cho bạn và những người được cứu trợ, chúng tôi cần đánh giá một số khả năng cơ bản.
            </p>

            {/* Question Progress Cards */}
            <div className="space-y-3">
              {prerequisiteQuestions.map((q, index) => (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg transition-all ${index === currentQuestion && !isCompleted
                    ? "bg-[#FF5722] text-white"
                    : answers[index]
                      ? "bg-white/10 text-white/80"
                      : "bg-white/5 text-white/40"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded ${answers[index] ? "bg-[#00A650] text-white" : "bg-white/10"
                      }`}>
                      {answers[index] ? <Check className="w-4 h-4" weight="bold" /> : index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{q.category}</p>
                      <p className="text-xs opacity-60">{q.categoryEn}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Warning className="w-6 h-6 text-red-500" weight="bold" />
                </div>
                <h3 className="text-xl font-black text-black">
                  Không đủ điều kiện
                </h3>
              </div>

              <p className="text-black/70 mb-6 leading-relaxed">
                {warningMessage}
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleWarningConfirm}
                  className="w-full px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors"
                >
                  Tôi hiểu, để tôi suy nghĩ lại
                </button>
                <p className="text-xs text-center text-black/40">
                  Bạn có thể chọn lại câu trả lời khác
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Accent */}
      <div className="h-1 bg-black" />
    </div>
  );
};

export default AbilityQuestionsPage;
