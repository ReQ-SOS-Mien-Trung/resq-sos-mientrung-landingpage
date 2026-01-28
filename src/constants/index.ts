import type {
  BenefitSection,
  ContributionCard,
  DriverType,
  FAQ,
  MenuItem,
  NewsArticle,
  Testimonial,
} from "@type";
import {
  AlertTriangle,
  Filter,
  MapPin,
  MessageSquare,
  Send,
  WifiOff,
} from "lucide-react";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nguyễn Văn Hùng",
    role: "Tình nguyện viên cứu hộ từ 2020",
    image: "/images/testimonial-1.jpg",
    quote:
      "Ứng dụng ResQ giúp chúng tôi tiếp cận nạn nhân nhanh chóng hơn. Hệ thống định vị chính xác và thông tin chi tiết về tình huống giúp đội cứu hộ chuẩn bị tốt hơn trước khi đến hiện trường.",
  },
  {
    id: 2,
    name: "Trần Thị Mai",
    role: "Điều phối viên cứu hộ từ 2021",
    image: "/images/testimonial-2.jpg",
    quote:
      "Hệ thống điều phối thông minh giúp chúng tôi phân bổ lực lượng cứu hộ hiệu quả. Trong đợt lũ năm ngoái, chúng tôi đã hỗ trợ được hàng trăm gia đình nhờ ResQ.",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    role: "Đội trưởng đội cứu hộ từ 2019",
    image: "/images/testimonial-3.jpg",
    quote:
      "ResQ không chỉ là một ứng dụng, mà còn là cầu nối giữa những người cần giúp đỡ và những tấm lòng sẵn sàng hỗ trợ. Tôi tự hào là một phần của cộng đồng này.",
  },
];

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "Làm thế nào để đăng ký trở thành tình nguyện viên cứu hộ?",
    answer:
      "Bạn có thể đăng ký trực tiếp trên ứng dụng ResQ hoặc website. Sau khi đăng ký, bạn sẽ được xác minh thông tin và tham gia khóa đào tạo cơ bản về cứu hộ.",
  },
  {
    id: 2,
    question: "Những phương tiện nào được phép tham gia cứu hộ?",
    answer:
      "ResQ chấp nhận nhiều loại phương tiện bao gồm xe ô tô gầm cao, thuyền máy, ghe nhỏ, và ca nô. Mỗi loại phương tiện phù hợp với các tình huống cứu hộ khác nhau như lũ lụt, sạt lở đất.",
  },
  {
    id: 3,
    question: "Hệ thống điều phối cứu hộ hoạt động như thế nào?",
    answer:
      "Khi có yêu cầu SOS, hệ thống AI sẽ tự động phân tích mức độ khẩn cấp và tìm đội cứu hộ phù hợp trong bán kính gần nhất. Bạn sẽ nhận được thông báo với chi tiết vị trí và tình trạng nạn nhân.",
  },
  {
    id: 4,
    question: "Tôi cần chuẩn bị những gì khi tham gia cứu hộ?",
    answer:
      "Bạn nên chuẩn bị: áo phao, đèn pin, dây thừng, bộ sơ cứu cơ bản, và điện thoại có kết nối mạng. ResQ cũng cung cấp hỗ trợ trang thiết bị cho các đội cứu hộ đăng ký chính thức.",
  },
  {
    id: 5,
    question: "Làm sao để đảm bảo an toàn khi tham gia cứu hộ?",
    answer:
      "Luôn tuân thủ hướng dẫn an toàn trong ứng dụng, mặc áo phao và trang bị bảo hộ. Không tham gia cứu hộ khi điều kiện thời tiết quá nguy hiểm. Liên hệ đường dây nóng 24/7 nếu cần hỗ trợ.",
  },
];

export const contributions: ContributionCard[] = [
  {
    id: 1,
    image: "/images/rescuer_flood.jpg",
    title: "Tác động của ResQ Mientrung SOS đến cộng đồng",
    description:
      "Dịch vụ cứu hộ và hỗ trợ khẩn cấp của ResQ đã hỗ trợ hơn 50,000 trường hợp khẩn cấp tại miền Trung trong năm 2024, tạo ra hơn 5,000 cơ hội việc làm cho các nhân viên cứu hộ và tình nguyện viên, đồng thời góp phần nâng cao nhận thức về an toàn và ứng phó khẩn cấp trong cộng đồng.",
    link: "#",
  },
  {
    id: 2,
    image: "/images/noodle_flood.jpg",
    title: "ResQ ra mắt Trung tâm Đào tạo Cứu hộ và Ứng phó Khẩn cấp",
    description:
      "ResQ chính thức khai trương Trung tâm Đào tạo Cứu hộ và Ứng phó Khẩn cấp đầu tiên với sự hỗ trợ từ các tổ chức địa phương. Trung tâm nhằm mục tiêu đẩy nhanh các giải pháp cứu hộ hiện đại, nâng cao khả năng ứng phó khẩn cấp, và đóng góp vào việc xây dựng cộng đồng an toàn hơn tại miền Trung Việt Nam.",
    link: "#",
  },
  {
    id: 3,
    image: "/images/ghe_flood.jpg",
    title:
      "ResQ Mientrung SOS đạt chứng nhận An toàn Thông tin và Bảo mật Dữ liệu",
    description:
      "ResQ Mientrung SOS đã được chính thức công nhận đạt tiêu chuẩn An toàn Thông tin và Bảo mật Dữ liệu. Chứng nhận này phản ánh cam kết của ResQ trong việc tăng cường niềm tin số và đảm bảo dữ liệu cá nhân luôn được bảo vệ an toàn cho tất cả người dùng trên nền tảng.",
    link: "#",
  },
];

export const menuItems: MenuItem[] = [
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

export const features = [
  {
    icon: AlertTriangle,
    title: "Phân loại Priority",
    description:
      "Tự động phát hiện P1 (Nguy hiểm tính mạng) vs P3 (Cần nhu yếu phẩm)",
    color: "text-primary-red",
    bgColor: "bg-red-50",
  },
  {
    icon: MapPin,
    title: "Bản đồ Thời gian thực",
    description: "Theo dõi trực tiếp vị trí các đội cứu hộ trên bản đồ",
    color: "text-primary-blue",
    bgColor: "bg-blue-50",
  },
  {
    icon: WifiOff,
    title: "Hoạt động Offline",
    description:
      "Các tính năng cơ bản hoạt động với kết nối internet không ổn định",
    color: "text-primary-teal",
    bgColor: "bg-teal-50",
  },
];

export const steps = [
  {
    icon: MessageSquare,
    title: "Tiếp nhận (Parser)",
    description:
      "Gemini chuyển đổi tin nhắn SOS thô thành JSON với mức độ ưu tiên (P1/P2/P3) và nhu cầu cụ thể.",
    color: "from-primary-red to-primary-orange",
  },
  {
    icon: Filter,
    title: "Sàng lọc (Filter)",
    description:
      "Hệ thống quét bán kính 5-10km để tìm đội cứu hộ phù hợp sử dụng PostGIS.",
    color: "from-primary-blue to-cyan-500",
  },
  {
    icon: Send,
    title: "Điều phối (Dispatch)",
    description:
      'AI khớp nhu cầu (ví dụ: "Cần thuyền") với khả năng của đội cứu hộ (ví dụ: "Có thuyền máy").',
    color: "from-primary-teal to-emerald-500",
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    image: "/images/rescuer_flood.jpg",
    date: "15/01/25",
    title:
      "ResQ Mientrung SOS hợp tác với Bộ Y tế để nâng cao khả năng ứng phó khẩn cấp y tế tại miền Trung",
    link: "#",
  },
  {
    id: 2,
    image: "/images/noodle_flood.jpg",
    date: "10/12/24",
    title:
      "ResQ ra mắt công nghệ AI để tối ưu hóa phản ứng cứu hộ và phân bổ tài nguyên tại Việt Nam",
    link: "#",
  },
  {
    id: 3,
    image: "/images/ghe_flood.jpg",
    date: "25/11/24",
    title:
      "ResQ và các tổ chức địa phương ký kết hợp tác phát triển hệ thống cảnh báo sớm thiên tai",
    link: "#",
  },
  {
    id: 4,
    image: "/images/rescuer_flood.jpg",
    date: "18/11/24",
    title:
      "ResQ hợp tác với Hiệp hội Cứu hộ để tăng mức hỗ trợ tối thiểu cho các nhân viên cứu hộ",
    link: "#",
  },
];

export const driverTypes: DriverType[] = [
  { id: "boat", label: "Thuyền/Ghe" },
  { id: "car", label: "Xe gầm cao" },
  { id: "rescue_team", label: "Đội cứu hộ" },
  { id: "volunteer", label: "Tình nguyện viên" },
];

export const benefitSections: Record<string, BenefitSection> = {
  boat: {
    title: "Cứu hộ bằng thuyền/ghe",
    benefits: [
      "Nhận thông báo yêu cầu cứu hộ từ người dân trong vùng ngập lụt",
      "Tiếp cận các khu vực bị cô lập do lũ lụt để sơ tán nạn nhân",
      "Được cung cấp áo phao và trang thiết bị cứu hộ đường thủy",
    ],
    links: [
      { text: "Hướng dẫn cứu hộ đường thủy", href: "#" },
      { text: "Đăng ký làm tình nguyện viên", href: "#" },
    ],
  },
  car: {
    title: "Cứu hộ bằng xe gầm cao",
    benefits: [
      "Nhận thông báo yêu cầu cứu hộ từ người dân trong khu vực của bạn",
      "Hỗ trợ di chuyển nạn nhân đến nơi an toàn hoặc cơ sở y tế",
      "Vận chuyển nhu yếu phẩm và hàng cứu trợ đến vùng thiên tai",
    ],
    links: [
      { text: "Hướng dẫn cứu hộ bằng xe", href: "#" },
      { text: "Đăng ký làm tình nguyện viên", href: "#" },
    ],
  },
  rescue_team: {
    title: "Đội cứu hộ chuyên nghiệp",
    benefits: [
      "Nhận phân bổ ưu tiên các trường hợp khẩn cấp phức tạp",
      "Phối hợp với lực lượng chức năng và các đội cứu hộ khác",
      "Được hỗ trợ trang thiết bị chuyên dụng và đào tạo nâng cao",
    ],
    links: [
      { text: "Hướng dẫn đăng ký đội cứu hộ", href: "#" },
      { text: "Quy trình phối hợp cứu hộ", href: "#" },
    ],
  },
  volunteer: {
    title: "Tình nguyện viên hỗ trợ",
    benefits: [
      "Hỗ trợ phân phát nhu yếu phẩm tại các điểm cứu trợ",
      "Tham gia công tác sơ tán và hỗ trợ nạn nhân",
      "Được đào tạo kỹ năng sơ cứu cơ bản miễn phí",
    ],
    links: [
      { text: "Hướng dẫn tình nguyện viên", href: "#" },
      { text: "Đăng ký ngay", href: "#" },
    ],
  },
};

export const appStoreItems = [
  {
    key: "google-play",
    name: "Google Play",
    status: "Sắp ra mắt",
    iconSrc: "/icons/ch-play.png",
    iconAlt: "Google Play",
    iconClassName: "w-6 h-6 object-contain",
  },
  {
    key: "app-store",
    name: "App Store",
    status: "Sắp ra mắt",
    iconSrc: "/icons/apple_storee.png",
    iconAlt: "App Store",
    iconClassName: "w-10 h-10 object-contain",
  },
  {
    key: "appgallery",
    name: "AppGallery",
    status: "Sắp ra mắt",
    iconSrc: "/icons/apk.png",
    iconAlt: "AppGallery",
    iconClassName: "w-10 h-10 object-contain",
  },
] as const;
