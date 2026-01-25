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
    name: "Nguyễn Văn A",
    role: "Đối tác cứu hộ với ResQ từ 2020",
    image: "/images/testimonial-1.jpg",
    quote:
      "Mọi thứ đều có thể thực hiện ngay trên ứng dụng. Sự tiện lợi, khả năng dễ dàng theo dõi các yêu cầu cứu hộ và hỗ trợ kịp thời là điều làm cho trải nghiệm này trở nên tuyệt vời.",
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "Đối tác cứu hộ với ResQ từ 2021",
    image: "/images/testimonial-2.jpg",
    quote:
      "Hệ thống điều phối thông minh giúp chúng tôi tiếp cận các trường hợp khẩn cấp một cách nhanh chóng và hiệu quả nhất.",
  },
  {
    id: 3,
    name: "Lê Văn C",
    role: "Đối tác cứu hộ với ResQ từ 2019",
    image: "/images/testimonial-3.jpg",
    quote:
      "ResQ không chỉ là một nền tảng, mà còn là một cộng đồng hỗ trợ lẫn nhau trong những thời điểm khó khăn nhất.",
  },
];

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "Tôi có thể rút tiền thu nhập bao lâu một lần?",
    answer:
      "Bạn có thể rút tiền thu nhập của mình bất cứ lúc nào thông qua ứng dụng ResQ. Chúng tôi hỗ trợ rút tiền tức thì vào tài khoản ngân hàng của bạn.",
  },
  {
    id: 2,
    question: "Những phương tiện nào được phép cho ResQ?",
    answer:
      "ResQ chấp nhận nhiều loại phương tiện bao gồm xe ô tô, taxi, thuyền máy, ghe nhỏ, và xe gầm cao. Mỗi loại phương tiện phù hợp với các tình huống cứu hộ khác nhau.",
  },
  {
    id: 3,
    question:
      "Tôi có thể thực hiện nhiều điểm dừng trong một yêu cầu cứu hộ không?",
    answer:
      "Có, bạn có thể thực hiện nhiều điểm dừng trong một yêu cầu cứu hộ nếu cần thiết. Ứng dụng sẽ hỗ trợ bạn điều hướng đến từng điểm một cách hiệu quả.",
  },
  {
    id: 4,
    question: "Trẻ em có được phép trên phương tiện cứu hộ không?",
    answer:
      "Có, trẻ em hoàn toàn được phép trên phương tiện cứu hộ. Chúng tôi khuyến khích các gia đình có trẻ em sử dụng dịch vụ cứu hộ của ResQ trong các tình huống khẩn cấp.",
  },
  {
    id: 5,
    question: "Hành khách có thể đứng trên phương tiện cứu hộ không?",
    answer:
      "Để đảm bảo an toàn, chúng tôi khuyến khích tất cả hành khách ngồi xuống trong quá trình cứu hộ. Tuy nhiên, trong các tình huống đặc biệt, hành khách có thể đứng nếu phương tiện cho phép và điều kiện an toàn.",
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
  { id: "car", label: "Xe ô tô" },
  { id: "taxi", label: "Taxi" },
  { id: "boat", label: "Thuyền" },
  { id: "rescue_team", label: "Đội cứu hộ" },
];

export const benefitSections: Record<string, BenefitSection> = {
  car: {
    title: "Giữ cho phương tiện của bạn hoạt động",
    benefits: [
      "Nhận yêu cầu cứu hộ từ người dùng trong khu vực của bạn",
      "Không cần tìm kiếm các trường hợp khẩn cấp trên đường",
      "Nhận phân bổ ưu tiên và giảm giá nhiên liệu với Chương trình Khách hàng Thân thiết của chúng tôi",
    ],
    links: [
      { text: "Hướng dẫn ResQ Xe ô tô (Tiếng Việt)", href: "#" },
      { text: "Hướng dẫn ResQ Xe ô tô (English)", href: "#" },
    ],
  },
  taxi: {
    title: "Giữ cho đồng hồ của bạn hoạt động",
    benefits: [
      "Nhận yêu cầu cứu hộ từ người dùng trong khu vực của bạn",
      "Không cần tìm kiếm các trường hợp khẩn cấp trên đường",
      "Nhận phân bổ ưu tiên và giảm giá nhiên liệu với Chương trình Khách hàng Thân thiết của chúng tôi",
    ],
    links: [
      { text: "Hướng dẫn ResQ Taxi (Tiếng Việt)", href: "#" },
      { text: "Hướng dẫn ResQ Taxi (English)", href: "#" },
    ],
  },
  boat: {
    title: "Giữ cho thuyền của bạn sẵn sàng",
    benefits: [
      "Nhận yêu cầu cứu hộ từ người dùng trong khu vực của bạn",
      "Không cần tìm kiếm các trường hợp khẩn cấp trên đường",
      "Nhận phân bổ ưu tiên và hỗ trợ nhiên liệu với Chương trình Khách hàng Thân thiết của chúng tôi",
    ],
    links: [
      { text: "Hướng dẫn ResQ Thuyền (Tiếng Việt)", href: "#" },
      { text: "Hướng dẫn ResQ Thuyền (English)", href: "#" },
    ],
  },
  rescue_team: {
    title: "Giữ cho đội của bạn sẵn sàng",
    benefits: [
      "Nhận yêu cầu cứu hộ từ người dùng trong khu vực của bạn",
      "Không cần tìm kiếm các trường hợp khẩn cấp trên đường",
      "Nhận phân bổ ưu tiên và hỗ trợ trang thiết bị với Chương trình Khách hàng Thân thiết của chúng tôi",
    ],
    links: [
      { text: "Hướng dẫn ResQ Đội cứu hộ (Tiếng Việt)", href: "#" },
      { text: "Hướng dẫn ResQ Đội cứu hộ (English)", href: "#" },
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
