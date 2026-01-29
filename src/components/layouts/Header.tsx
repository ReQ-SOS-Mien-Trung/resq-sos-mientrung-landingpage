import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { List, XIcon } from "@phosphor-icons/react";
import { menuItems } from "@/constants";
import gsap from "gsap";
import { HeartIcon, MagnifyingGlassIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // GSAP refs
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const subItemsRef = useRef<HTMLDivElement>(null);

  // Close menus on route change using useLayoutEffect
  useEffect(() => {
    // Reset menu states when location changes
    return () => {
      setIsMenuOpen(false);
      setIsMobileMenuOpen(false);
    };
  }, [location.pathname]);

  // GSAP animation for menu open/close
  useEffect(() => {
    if (isMenuOpen) {
      // Animate menu open
      const tl = gsap.timeline();
      
      if (menuOverlayRef.current) {
        gsap.set(menuOverlayRef.current, { display: 'block' });
        tl.fromTo(menuOverlayRef.current, 
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
      
      if (menuContentRef.current) {
        tl.fromTo(menuContentRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
          '-=0.2'
        );
      }
      
      if (menuItemsRef.current) {
        const items = menuItemsRef.current.querySelectorAll('li');
        tl.fromTo(items,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
          '-=0.2'
        );
      }
    }
  }, [isMenuOpen]);

  // GSAP animation for sub-items when activeMenu changes
  useEffect(() => {
    if (subItemsRef.current && activeMenu) {
      const items = subItemsRef.current.querySelectorAll('.sub-item');
      gsap.fromTo(items,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' }
      );
    }
  }, [activeMenu]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleMenuMouseEnter = (menuId: string) => {
    setActiveMenu(menuId);
    setIsMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    // Animate menu close
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveMenu(null);
        setIsMenuOpen(false);
      }
    });
    
    if (menuContentRef.current) {
      tl.to(menuContentRef.current, {
        y: -10, opacity: 0, duration: 0.25, ease: 'power2.in'
      });
    }
    
    if (menuOverlayRef.current) {
      tl.to(menuOverlayRef.current, {
        opacity: 0, duration: 0.2, ease: 'power2.in'
      }, '-=0.1');
    }
  };

  const handleMenuIconClick = () => {
    if (!isMenuOpen) {
      setActiveMenu(menuItems[0]?.id || null);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const activeMenuData = menuItems.find((item) => item.id === activeMenu);

  return (
    <>
      {/* LEFT SIDEBAR - Desktop Only */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 bg-black text-white z-50 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-white/10">
          <Link to="/" onClick={handleHomeClick} className="text-white hover:text-[#FF5722] transition-colors">
            <svg viewBox="0 0 500 500" className="w-8 h-8 lg:w-9 lg:h-9" fill="currentColor">
              <path d="M393.724 123.906C387.609 118.729 381.307 114.266 374.849 110.474C361.443 122.542 348.406 136.203 351.083 152.953C353.547 165.896 355.135 176.682 355.203 189.938C348.396 198.24 343.953 183.12 342.328 175.01C335.828 144.573 305.917 188.214 300.177 197.672C297.083 202.771 289.828 197.911 293.099 192.328C297.297 184.859 307.089 175.786 306.604 167.771C302.589 165.099 284.318 179.302 278.078 182.802C272.438 186.422 267.714 179.016 273.177 175.521C306.672 154.005 307.563 151.786 270.016 161.672C265.818 162.932 263.62 156.526 268.083 155.203C288.646 148.203 319.984 139.125 276.13 139.786C269.339 140.188 269.688 134.01 273.995 133.708C284.094 133.292 290.443 133.224 303.01 129.854C320.823 124.266 334.307 112.396 344.214 97.9688C336.026 96 327.641 95 319.073 95C287.401 95 261.849 108.641 250.156 116.161C238.469 108.641 212.922 95 181.25 95C154.365 95 129.245 104.724 106.599 123.906C71.5729 153.563 58.599 193.375 70.0625 236.01C76.7396 260.839 94.0781 280.396 111.63 298.651C125.5 313.073 145.979 332.333 174.24 354.182C194.453 335.578 212.885 314.568 208.823 289.146C204.859 268.323 202.297 250.964 202.188 229.635C213.141 216.276 220.292 240.609 222.906 253.656C233.37 302.63 281.505 232.411 290.734 217.193C295.719 208.979 307.396 216.807 302.13 225.792C295.37 237.813 279.615 252.406 280.401 265.307C286.859 269.604 316.255 246.75 326.297 241.12C335.375 235.292 342.979 247.208 334.182 252.833C280.292 287.458 278.854 291.031 339.276 275.12C346.031 273.089 349.563 283.396 342.38 285.526C309.297 296.792 258.865 311.401 329.432 310.339C340.359 309.693 339.807 319.635 332.87 320.115C316.62 320.786 306.401 320.901 286.182 326.323C254.927 336.125 231.964 357.938 215.703 384.016C226.417 391.203 237.88 398.536 250.156 405.958C320.495 363.438 364.568 323.734 388.688 298.651C406.24 280.396 423.573 260.839 430.25 236.01C441.719 193.375 428.74 153.563 393.724 123.906Z" />
            </svg>
          </Link>
        </div>

        {/* Vertical Text - Search */}
        <button
          onClick={handleMenuIconClick}
          className="flex-1 flex items-center justify-center hover:bg-white/10 transition-colors group"
        >
          <span
            className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em] text-white/60 group-hover:text-white transition-colors"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Tìm kiếm
          </span>
        </button>

        {/* Vertical Text - Find */}
        <button
          onClick={() => handleNavigate("/register")}
          className="flex-1 flex items-center justify-center hover:bg-white/10 transition-colors group border-t border-white/10"
        >
          <span
            className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em] text-white/60 group-hover:text-white transition-colors"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Đăng ký cứu hộ
          </span>
        </button>

        {/* Bottom Icons */}
        <div className="border-t border-white/10 py-3 lg:py-4 flex flex-col items-center gap-3 lg:gap-4">
          <button className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <HeartIcon className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          <button className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <UserIcon className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </aside>

      {/* MAIN HEADER */}
      <header className="fixed top-0 left-0 lg:left-16 right-0 z-40 bg-white border-b border-black/10">
        <nav className="h-14 sm:h-16 px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-black hover:text-[#FF5722] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <XIcon className="w-5 h-5 sm:w-6 sm:h-6" /> : <List className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            {/* Logo */}
            <Link
              to="/"
              onClick={handleHomeClick}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-70 transition-opacity"
            >
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight">ResQ SOS</span>
            </Link>
          </div>

          {/* Right: Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <button
              onClick={handleHomeClick}
              className="text-xs xl:text-sm font-medium text-black/70 hover:text-black transition-colors uppercase tracking-wider"
            >
              Trang chủ
            </button>
            <button
              onClick={() => handleNavigate("/features")}
              className="text-xs xl:text-sm font-medium text-black/70 hover:text-black transition-colors uppercase tracking-wider"
            >
              Trung tâm trợ giúp
            </button>
            <button
              onClick={() => handleNavigate("/register")}
              className="text-xs xl:text-sm font-medium text-black/70 hover:text-black transition-colors uppercase tracking-wider"
            >
              Dành cho cứu hộ
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-black/70 hover:text-black transition-colors">
              <MagnifyingGlassIcon className="w-4 h-4 xl:w-5 xl:h-5" />
            </button>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-black/70 hover:text-black transition-colors">
              <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-black/70 hover:text-black transition-colors">
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mega Menu Overlay - Desktop */}
      {isMenuOpen && (
        <div
          ref={menuOverlayRef}
          className="fixed inset-0 z-30 pt-14 sm:pt-16 lg:pl-16 hidden lg:block"
          onMouseLeave={handleMenuMouseLeave}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20" onClick={handleMenuMouseLeave} />

          {/* Menu Content */}
          <div ref={menuContentRef} className="relative bg-white border-b border-black shadow-xl overflow-hidden">
            {/* Top accent line */}
            <div className="h-0.5 bg-[#FF5722]" />
            
            <div className="px-8 lg:px-12 py-10 lg:py-12">
              <div className="flex gap-12 lg:gap-20">
                {/* Left: Categories */}
                <div ref={menuItemsRef} className="w-56 lg:w-64 shrink-0 border-r border-black/10 pr-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 mb-6">Danh mục</p>
                  <ul className="space-y-0">
                    {menuItems.map((item) => (
                      <li key={item.id} className="border-b border-black/10 last:border-b-0">
                        <button
                          onMouseEnter={() => handleMenuMouseEnter(item.id)}
                          className={`relative w-full text-left py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 group ${
                            activeMenu === item.id 
                              ? "text-black pl-3" 
                              : "text-black/40 hover:text-black hover:pl-3"
                          }`}
                        >
                          {item.label}
                          {/* Underline indicator */}
                          <span 
                            className={`absolute bottom-3 left-0 h-0.5 bg-[#FF5722] transition-all duration-300 ${
                              activeMenu === item.id ? "w-8" : "w-0 group-hover:w-6"
                            }`} 
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Sub-items */}
                {activeMenuData && activeMenuData.subItems && (
                  <div ref={subItemsRef} className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 mb-6">
                      {activeMenuData.label}
                    </p>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
                      {activeMenuData.subItems.map((subItem, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (subItem.link) {
                              scrollToSection(subItem.link.replace("#", ""));
                            }
                          }}
                          className="sub-item text-left group py-4 border-b border-black/10 hover:border-[#FF5722] transition-all duration-300"
                        >
                          <h3 className="text-base font-bold text-black mb-1 group-hover:text-[#FF5722] transition-colors">
                            {subItem.title}
                          </h3>
                          <p className="text-xs text-black/40 leading-relaxed">
                            {subItem.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu - Full Screen */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 pt-14 sm:pt-16 bg-white lg:hidden overflow-y-auto">
          <div className="border-b border-black">
            {menuItems.map((item) => (
              <div key={item.id} className="border-b border-black/10">
                <button
                  onClick={() => {
                    if (item.subItems?.[0]?.link) {
                      scrollToSection(item.subItems[0].link.replace("#", ""));
                    }
                  }}
                  className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black hover:text-[#FF5722] transition-colors"
                >
                  {item.label}
                </button>
                {item.subItems && (
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4 space-y-1 sm:space-y-2">
                    {item.subItems.map((subItem, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (subItem.link) {
                            scrollToSection(subItem.link.replace("#", ""));
                          }
                        }}
                        className="block w-full text-left text-xs sm:text-sm text-black/50 hover:text-[#FF5722] py-1.5 sm:py-2 transition-colors"
                      >
                        {subItem.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-6">
            <button
              onClick={() => handleNavigate("/register")}
              className="w-full py-3 sm:py-4 bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors"
            >
              Dành cho cứu hộ
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
