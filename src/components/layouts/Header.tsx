import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Heart, User } from "lucide-react";
import { menuItems } from "@/constants";
import SearchOverlay from "./SearchOverlay";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Close menus on route change
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

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
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleMenuMouseEnter = (menuId: string) => {
    setActiveMenu(menuId);
    setIsMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    setActiveMenu(null);
    setIsMenuOpen(false);
  };

  const activeMenuData = menuItems.find((item) => item.id === activeMenu);

  return (
    <>
      {/* LEFT SIDEBAR - Desktop Only */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 bg-black text-white z-50 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-white/10">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="text-white hover:text-[#FF5722] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 lg:w-8 lg:h-8"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </Link>
        </div>

        {/* Vertical Text - Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex-1 flex items-center justify-center hover:bg-white/10 transition-colors group"
        >
          <span
            className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em] text-white/60 group-hover:text-white transition-colors"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Tìm kiếm
          </span>
        </button>

        {/* Vertical Text - Find */}
        <button
          onClick={() => navigate("/register")}
          className="flex-1 flex items-center justify-center hover:bg-white/10 transition-colors group border-t border-white/10"
        >
          <span
            className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em] text-white/60 group-hover:text-white transition-colors"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Đăng ký cứu hộ
          </span>
        </button>

        {/* Bottom Icons */}
        <div className="border-t border-white/10 py-3 lg:py-4 flex flex-col items-center gap-3 lg:gap-4">
          <button className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          <button className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <User className="w-4 h-4 lg:w-5 lg:h-5" />
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
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Logo */}
            <Link
              to="/"
              onClick={handleHomeClick}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-70 transition-opacity"
            >
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight">
                ResQ SOS
              </span>
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
              onClick={() => navigate("/features")}
              className="text-xs xl:text-sm font-medium text-black/70 hover:text-black transition-colors uppercase tracking-wider"
            >
              Trung tâm trợ giúp
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-xs xl:text-sm font-medium text-black/70 hover:text-black transition-colors uppercase tracking-wider"
            >
              Dành cho cứu hộ
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-8 h-8 flex items-center justify-center text-black/70 hover:text-black transition-colors"
            >
              <Search className="w-4 h-4 xl:w-5 xl:h-5" />
            </button>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-black/70 hover:text-black transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-black/70 hover:text-black transition-colors">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mega Menu Overlay - Desktop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 pt-14 sm:pt-16 lg:pl-16 hidden lg:block"
          onMouseLeave={handleMenuMouseLeave}
        >
          <div
            className="absolute inset-0 bg-black/20"
            onClick={handleMenuMouseLeave}
          />

          <div className="relative bg-white border-b border-black">
            <div className="px-6 lg:px-12 py-8 lg:py-12">
              <div className="flex gap-8 lg:gap-16">
                {/* Left: Categories */}
                <div className="w-48 lg:w-64 shrink-0 border-r border-black/10 pr-6 lg:pr-8">
                  <ul className="space-y-0">
                    {menuItems.map((item) => (
                      <li key={item.id} className="border-b border-black/10">
                        <button
                          onMouseEnter={() => handleMenuMouseEnter(item.id)}
                          className={`w-full text-left py-3 lg:py-4 text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                            activeMenu === item.id
                              ? "text-[#FF5722]"
                              : "text-black/60 hover:text-black"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Sub-items */}
                {activeMenuData && activeMenuData.subItems && (
                  <div className="flex-1 grid grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
                    {activeMenuData.subItems.map((subItem, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (subItem.link) {
                            scrollToSection(subItem.link.replace("#", ""));
                          }
                        }}
                        className="text-left group p-3 lg:p-4 border border-transparent hover:border-black/10 transition-colors"
                      >
                        <h3 className="text-base lg:text-lg font-bold mb-1 lg:mb-2 group-hover:text-[#FF5722] transition-colors">
                          {subItem.title}
                        </h3>
                        <p className="text-xs lg:text-sm text-black/50 leading-relaxed">
                          {subItem.description}
                        </p>
                      </button>
                    ))}
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
              onClick={() => {
                navigate("/register");
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 sm:py-4 bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#FF5722] transition-colors"
            >
              Dành cho cứu hộ
            </button>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;
