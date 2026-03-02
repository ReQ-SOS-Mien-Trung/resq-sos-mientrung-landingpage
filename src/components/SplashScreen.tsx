import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const logoRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let pageLoaded = false;
    let minTimeElapsed = false;
    const MIN_DURATION = 2400;

    const attemptReveal = () => {
      if (pageLoaded && minTimeElapsed) runExitAnimation();
    };

    // --- Track real page load ---
    const onLoad = () => {
      pageLoaded = true;
      setProgress(100);
      attemptReveal();
    };

    if (document.readyState === "complete") {
      pageLoaded = true;
      setProgress(100);
    } else {
      window.addEventListener("load", onLoad);
    }

    // --- Smooth progress tied to real load signal ---
    let fakeProgress = 0;
    const progressInterval = setInterval(() => {
      if (fakeProgress < (pageLoaded ? 100 : 85)) {
        fakeProgress += pageLoaded ? Math.random() * 12 : Math.random() * 4 + 1;
        fakeProgress = Math.min(fakeProgress, pageLoaded ? 100 : 85);
        setProgress(Math.floor(fakeProgress));
      } else if (pageLoaded) {
        setProgress(100);
        clearInterval(progressInterval);
      }
    }, 80);

    // --- Minimum display time ---
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      attemptReveal();
    }, MIN_DURATION);

    // --- Entrance animation ---
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: "transparent",
        stroke: "#FF5722",
        strokeWidth: 6,
      });

      const tl = gsap.timeline();

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.3,
        ease: "power2.inOut",
      })
        .to(path, {
          fill: "#FF5722",
          stroke: "#FF5722",
          strokeWidth: 0,
          duration: 0.45,
          ease: "power2.out",
        })
        .to(logoRef.current, { scale: 1.1, duration: 0.15, ease: "power1.out" })
        .to(logoRef.current, { scale: 1, duration: 0.2, ease: "power1.in" });

      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.2 }
      );
    }

    return () => {
      window.removeEventListener("load", onLoad);
      clearInterval(progressInterval);
      clearTimeout(minTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runExitAnimation = () => {
    const tl = gsap.timeline({ onComplete });

    // Fade out center content first
    tl.to(centerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.35,
      ease: "power2.in",
    })
      // Then split panels
      .to(topPanelRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
      })
      .to(
        bottomPanelRef.current,
        { yPercent: 100, duration: 0.75, ease: "power4.inOut" },
        "<"
      );
  };

  return (
    <div
      className="fixed inset-0 z-9999 pointer-events-none"
      aria-hidden="true"
    >
      {/* Top black panel — purely for split-reveal exit */}
      <div
        ref={topPanelRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-black"
      />

      {/* Bottom black panel */}
      <div
        ref={bottomPanelRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
      />

      {/* Center content — floats above both panels, never clipped */}
      <div
        ref={centerRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 sm:gap-8"
      >
        {/* Logo */}
        <svg
          ref={logoRef}
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
          style={{ filter: "drop-shadow(0 0 28px rgba(255,87,34,0.55))" }}
        >
          <path
            ref={pathRef}
            d="M393.724 123.906C387.609 118.729 381.307 114.266 374.849 110.474C361.443 122.542 348.406 136.203 351.083 152.953C353.547 165.896 355.135 176.682 355.203 189.938C348.396 198.24 343.953 183.12 342.328 175.01C335.828 144.573 305.917 188.214 300.177 197.672C297.083 202.771 289.828 197.911 293.099 192.328C297.297 184.859 307.089 175.786 306.604 167.771C302.589 165.099 284.318 179.302 278.078 182.802C272.438 186.422 267.714 179.016 273.177 175.521C306.672 154.005 307.563 151.786 270.016 161.672C265.818 162.932 263.62 156.526 268.083 155.203C288.646 148.203 319.984 139.125 276.13 139.786C269.339 140.188 269.688 134.01 273.995 133.708C284.094 133.292 290.443 133.224 303.01 129.854C320.823 124.266 334.307 112.396 344.214 97.9688C336.026 96 327.641 95 319.073 95C287.401 95 261.849 108.641 250.156 116.161C238.469 108.641 212.922 95 181.25 95C154.365 95 129.245 104.724 106.599 123.906C71.5729 153.563 58.599 193.375 70.0625 236.01C76.7396 260.839 94.0781 280.396 111.63 298.651C125.5 313.073 145.979 332.333 174.24 354.182C194.453 335.578 212.885 314.568 208.823 289.146C204.859 268.323 202.297 250.964 202.188 229.635C213.141 216.276 220.292 240.609 222.906 253.656C233.37 302.63 281.505 232.411 290.734 217.193C295.719 208.979 307.396 216.807 302.13 225.792C295.37 237.813 279.615 252.406 280.401 265.307C286.859 269.604 316.255 246.75 326.297 241.12C335.375 235.292 342.979 247.208 334.182 252.833C280.292 287.458 278.854 291.031 339.276 275.12C346.031 273.089 349.563 283.396 342.38 285.526C309.297 296.792 258.865 311.401 329.432 310.339C340.359 309.693 339.807 319.635 332.87 320.115C316.62 320.786 306.401 320.901 286.182 326.323C254.927 336.125 231.964 357.938 215.703 384.016C226.417 391.203 237.88 398.536 250.156 405.958C320.495 363.438 364.568 323.734 388.688 298.651C406.24 280.396 423.573 260.839 430.25 236.01C441.719 193.375 428.74 153.563 393.724 123.906Z"
          />
        </svg>

        {/* Tagline + progress */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <p
            ref={taglineRef}
            className="text-white/50 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium opacity-0 px-4 text-center"
          >
            Cứu hộ · Kết nối · Đồng hành
          </p>
          <div className="w-24 sm:w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF5722] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
