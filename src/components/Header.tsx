import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, Search } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  subItems?: {
    title: string;
    description: string;
    link?: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    id: "about",
    label: "Về chúng tôi",
    subItems: [
      {
        title: "Giới thiệu",
        description: "Chúng tôi là ai và chúng tôi đại diện cho điều gì",
        link: "#about",
      },
      {
        title: "Tầm nhìn & Sứ mệnh",
        description: "Mục tiêu và giá trị cốt lõi của chúng tôi",
        link: "#vision",
      },
      {
        title: "Đội ngũ",
        description: "Gặp gỡ những người đang xây dựng tương lai cứu hộ",
        link: "#team",
      },
    ],
  },
  {
    id: "services",
    label: "Dịch vụ",
    subItems: [
      {
        title: "Cứu hộ khẩn cấp",
        description: "Kết nối nạn nhân với đội cứu hộ trong thời gian thực",
        link: "#emergency",
      },
      {
        title: "Điều phối đội cứu hộ",
        description: "Hệ thống quản lý và điều phối đội cứu hộ thông minh",
        link: "#coordination",
      },
      {
        title: "Đào tạo",
        description: "Chương trình đào tạo và nâng cao kỹ năng cứu hộ",
        link: "#training",
      },
    ],
  },
  {
    id: "for-rescuers",
    label: "Dành cho Đội cứu hộ",
    subItems: [
      {
        title: "Đăng ký đội cứu hộ",
        description: "Tham gia mạng lưới cứu hộ của chúng tôi",
        link: "#register",
      },
      {
        title: "Tài nguyên",
        description: "Công cụ và tài liệu hỗ trợ đội cứu hộ",
        link: "#resources",
      },
      {
        title: "Cộng đồng",
        description: "Kết nối với các đội cứu hộ khác",
        link: "#community",
      },
    ],
  },
  {
    id: "partners",
    label: "Đối tác",
    subItems: [
      {
        title: "Trở thành đối tác",
        description: "Hợp tác với chúng tôi để mở rộng mạng lưới cứu hộ",
        link: "#partner",
      },
      {
        title: "Đối tác hiện tại",
        description: "Các tổ chức đang hợp tác với chúng tôi",
        link: "#partners",
      },
    ],
  },
  {
    id: "news",
    label: "Tin tức",
    subItems: [
      {
        title: "Tin tức mới nhất",
        description: "Cập nhật về hoạt động và sự kiện của chúng tôi",
        link: "#news",
      },
      {
        title: "Blog",
        description: "Câu chuyện và chia sẻ từ cộng đồng cứu hộ",
        link: "#blog",
      },
    ],
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleMenuMouseEnter = (menuId: string) => {
    setActiveMenu(menuId);
    setIsMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    setActiveMenu(null);
    setIsMenuOpen(false);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Menu Icon + Logo */}
            <div className="flex items-center gap-3">
              <button
                className="text-gray-700 hover:text-primary-red transition-colors"
                onClick={handleMenuIconClick}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-red to-primary-orange rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  ResQ Mientrung SOS
                </span>
              </div>
            </div>

            {/* Right: Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-700 hover:text-primary-red transition-colors font-medium"
              >
                Trang chủ
              </button>
              <div className="relative group">
                <button
                  onMouseEnter={() => handleMenuMouseEnter("services")}
                  className="text-gray-700 hover:text-primary-red transition-colors font-medium flex items-center gap-1"
                >
                  Dịch vụ
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => scrollToSection("register")}
                className="text-gray-700 hover:text-primary-red transition-colors font-medium flex items-center gap-1"
              >
                Đăng ký Đội cứu hộ
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-700 hover:text-primary-red transition-colors font-medium"
              >
                Trung tâm trợ giúp
              </button>
              <button className="text-gray-700 hover:text-primary-red transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mega Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 pt-16"
          onMouseLeave={handleMenuMouseLeave}
        >
          {/* Blurred Background */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={handleMenuMouseLeave}
          />
          
          {/* Menu Content */}
          <div className="relative bg-white shadow-2xl">
            <div className="container mx-auto px-4 py-8">
              <div className="flex gap-12">
                {/* Left Panel: Main Categories */}
                <div className="w-64 flex-shrink-0 border-r border-gray-200 pr-8">
                  <ul className="space-y-1">
                    {menuItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onMouseEnter={() => handleMenuMouseEnter(item.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            activeMenu === item.id
                              ? "bg-primary-red/10 text-primary-red font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Panel: Sub-items */}
                {activeMenuData && activeMenuData.subItems && (
                  <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeMenuData.subItems.map((subItem, index) => (
                      <div key={index} className="space-y-2">
                        <button
                          onClick={() => {
                            if (subItem.link) {
                              scrollToSection(subItem.link.replace("#", ""));
                            }
                          }}
                          className="text-left group"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-red transition-colors mb-1">
                            {subItem.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {subItem.description}
                          </p>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-16 bg-white lg:hidden">
          <div className="container mx-auto px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => {
                    if (item.subItems?.[0]?.link) {
                      scrollToSection(
                        item.subItems[0].link.replace("#", "")
                      );
                    }
                  }}
                  className="w-full text-left text-gray-700 hover:text-primary-red py-2 font-medium"
                >
                  {item.label}
                </button>
                {item.subItems && (
                  <div className="mt-2 ml-4 space-y-2">
                    {item.subItems.map((subItem, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (subItem.link) {
                            scrollToSection(subItem.link.replace("#", ""));
                          }
                        }}
                        className="block w-full text-left text-sm text-gray-600 hover:text-primary-red py-1"
                      >
                        {subItem.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => scrollToSection("register")}
              className="w-full bg-primary-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium mt-4"
            >
              Đăng ký Đội cứu hộ
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
