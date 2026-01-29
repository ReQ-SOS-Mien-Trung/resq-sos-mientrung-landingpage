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
