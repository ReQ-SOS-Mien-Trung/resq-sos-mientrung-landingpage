import type { LucideIcon } from "lucide-react";
import {
  Home,
  Download,
  UserPlus,
  Zap,
  Newspaper,
  HelpCircle,
  Users,
  MapPin,
  Shield,
  Info,
  Phone,
  Heart,
  FileText,
  Scale,
  Briefcase,
} from "lucide-react";

export type SearchItemType = "page" | "section" | "faq" | "news" | "feature";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  type: SearchItemType;
  path?: string;
  sectionId?: string;
  icon: LucideIcon;
}

export const searchData: SearchItem[] = [
  // ===== PAGES =====
  {
    id: "home",
    title: "Trang chủ",
    description: "Trang chính của ResQ SOS Miền Trung",
    keywords: ["home", "trang chu", "main", "giới thiệu"],
    type: "page",
    path: "/",
    icon: Home,
  },
  {
    id: "download",
    title: "Tải ứng dụng",
    description: "Tải ứng dụng ResQ SOS trên App Store, Google Play",
    keywords: [
      "download",
      "app",
      "ứng dụng",
      "cài đặt",
      "install",
      "apk",
      "ios",
      "android",
    ],
    type: "page",
    path: "/download-app",
    icon: Download,
  },
  {
    id: "register",
    title: "Đăng ký cứu hộ",
    description: "Đăng ký trở thành tình nguyện viên hoặc đội cứu hộ",
    keywords: [
      "đăng ký",
      "register",
      "tình nguyện",
      "volunteer",
      "cứu hộ",
      "rescuer",
    ],
    type: "page",
    path: "/register",
    icon: UserPlus,
  },
  {
    id: "features",
    title: "Trung tâm trợ giúp",
    description: "Hướng dẫn sử dụng và các tính năng của ứng dụng",
    keywords: ["features", "tính năng", "help", "trợ giúp", "hướng dẫn"],
    type: "page",
    path: "/features",
    icon: Zap,
  },
  {
    id: "about",
    title: "Về chúng tôi",
    description: "Thông tin về ResQ SOS Miền Trung và sứ mệnh của chúng tôi",
    keywords: ["about", "về chúng tôi", "giới thiệu", "thông tin", "sứ mệnh", "tầm nhìn"],
    type: "page",
    path: "/about",
    icon: Info,
  },
  {
    id: "news",
    title: "Tin tức",
    description: "Tin tức và cập nhật mới nhất từ ResQ SOS Miền Trung",
    keywords: ["news", "tin tức", "bài viết", "cập nhật", "blog"],
    type: "page",
    path: "/news",
    icon: Newspaper,
  },
  {
    id: "services-page",
    title: "Dịch vụ",
    description: "Các dịch vụ cứu hộ và hỗ trợ khẩn cấp của ResQ",
    keywords: ["services", "dịch vụ", "cứu hộ", "hỗ trợ", "khẩn cấp"],
    type: "page",
    path: "/services",
    icon: Briefcase,
  },
  {
    id: "contact",
    title: "Liên hệ",
    description: "Liên hệ với đội ngũ ResQ SOS Miền Trung",
    keywords: ["contact", "liên hệ", "hỗ trợ", "email", "điện thoại", "địa chỉ"],
    type: "page",
    path: "/contact",
    icon: Phone,
  },
  {
    id: "donate",
    title: "Quyên góp",
    description: "Đóng góp ủng hộ các hoạt động cứu trợ thiên tai",
    keywords: ["donate", "quyên góp", "ủng hộ", "đóng góp", "từ thiện", "hỗ trợ"],
    type: "page",
    path: "/donate",
    icon: Heart,
  },
  {
    id: "help-center",
    title: "Trung tâm hỗ trợ",
    description: "Giải đáp thắc mắc và hướng dẫn sử dụng ResQ",
    keywords: ["help", "hỗ trợ", "trợ giúp", "hướng dẫn", "FAQ", "câu hỏi"],
    type: "page",
    path: "/help-center",
    icon: HelpCircle,
  },
  {
    id: "privacy-policy",
    title: "Chính sách bảo mật",
    description: "Chính sách bảo mật thông tin người dùng",
    keywords: ["privacy", "bảo mật", "chính sách", "thông tin", "dữ liệu"],
    type: "page",
    path: "/privacy-policy",
    icon: FileText,
  },
  {
    id: "terms-of-service",
    title: "Điều khoản dịch vụ",
    description: "Điều khoản và điều kiện sử dụng dịch vụ ResQ",
    keywords: ["terms", "điều khoản", "dịch vụ", "quy định", "điều kiện"],
    type: "page",
    path: "/terms-of-service",
    icon: Scale,
  },

  // ===== SECTIONS =====
  {
    id: "hero",
    title: "SOS Miền Trung",
    description: "Hệ thống cứu hộ khẩn cấp miền Trung Việt Nam",
    keywords: ["sos", "khẩn cấp", "emergency", "cứu hộ"],
    type: "section",
    path: "/",
    sectionId: "hero",
    icon: Shield,
  },
  {
    id: "services",
    title: "Dịch vụ cứu hộ",
    description: "Các dịch vụ cứu hộ và hỗ trợ khẩn cấp",
    keywords: ["dịch vụ", "services", "cứu hộ", "hỗ trợ"],
    type: "section",
    path: "/",
    sectionId: "services",
    icon: Users,
  },
  {
    id: "newsroom",
    title: "Tin tức",
    description: "Tin tức và cập nhật mới nhất từ ResQ",
    keywords: ["tin tức", "news", "cập nhật", "blog"],
    type: "section",
    path: "/",
    sectionId: "newsroom",
    icon: Newspaper,
  },

  // ===== FAQs =====
  {
    id: "faq-register",
    title: "Làm thế nào để đăng ký trở thành tình nguyện viên cứu hộ?",
    description: "Đăng ký trực tiếp trên ứng dụng ResQ hoặc website",
    keywords: ["đăng ký", "tình nguyện", "volunteer", "register"],
    type: "faq",
    path: "/",
    sectionId: "faqs",
    icon: HelpCircle,
  },
  {
    id: "faq-vehicles",
    title: "Những phương tiện nào được phép tham gia cứu hộ?",
    description: "Xe ô tô gầm cao, thuyền máy, ghe nhỏ, ca nô",
    keywords: ["phương tiện", "xe", "thuyền", "ghe", "vehicle", "boat"],
    type: "faq",
    path: "/",
    sectionId: "faqs",
    icon: HelpCircle,
  },
  {
    id: "faq-dispatch",
    title: "Hệ thống điều phối cứu hộ hoạt động như thế nào?",
    description: "Hệ thống AI tự động phân tích mức độ khẩn cấp",
    keywords: ["điều phối", "dispatch", "AI", "hệ thống"],
    type: "faq",
    path: "/",
    sectionId: "faqs",
    icon: HelpCircle,
  },
  {
    id: "faq-prepare",
    title: "Tôi cần chuẩn bị những gì khi tham gia cứu hộ?",
    description: "Áo phao, đèn pin, dây thừng, bộ sơ cứu",
    keywords: ["chuẩn bị", "trang bị", "equipment", "prepare"],
    type: "faq",
    path: "/",
    sectionId: "faqs",
    icon: HelpCircle,
  },
  {
    id: "faq-safety",
    title: "Làm sao để đảm bảo an toàn khi tham gia cứu hộ?",
    description: "Tuân thủ hướng dẫn an toàn, mặc áo phao",
    keywords: ["an toàn", "safety", "bảo hộ"],
    type: "faq",
    path: "/",
    sectionId: "faqs",
    icon: HelpCircle,
  },

  // ===== FEATURES =====
  {
    id: "feature-sos",
    title: "Gửi tín hiệu SOS",
    description: "Gửi SOS một chạm với vị trí GPS chính xác",
    keywords: ["sos", "khẩn cấp", "gps", "vị trí", "location"],
    type: "feature",
    path: "/features",
    icon: MapPin,
  },
  {
    id: "feature-realtime",
    title: "Theo dõi thời gian thực",
    description: "Theo dõi vị trí đội cứu hộ trên bản đồ",
    keywords: ["realtime", "thời gian thực", "bản đồ", "map", "tracking"],
    type: "feature",
    path: "/features",
    icon: MapPin,
  },
];

// Group search results by type
export const groupSearchResults = (results: SearchItem[]) => {
  return {
    pages: results.filter((r) => r.type === "page"),
    sections: results.filter((r) => r.type === "section"),
    faqs: results.filter((r) => r.type === "faq"),
    features: results.filter((r) => r.type === "feature"),
    news: results.filter((r) => r.type === "news"),
  };
};

// Type labels in Vietnamese
export const typeLabels: Record<SearchItemType, string> = {
  page: "Trang",
  section: "Mục",
  faq: "Câu hỏi",
  news: "Tin tức",
  feature: "Tính năng",
};
