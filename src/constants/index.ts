import type {
  BenefitSection,
  ContributionCard,
  DriverType,
  FAQ,
  MenuItem,
  NewsArticle,
  PrerequisiteQuestion,
  Region,
  Service,
  ServiceCategory,
  Testimonial,
} from "@type";
import {
  Warning,
  Car,
  Funnel,
  Heart,
  House,
  MapPin,
  ChatCircle,
  Package,
  Phone,
  PaperPlaneTilt,
  Shield,
  ShoppingBag,
  Truck,
  Users,
  Wallet,
  WifiSlash,
  Target,
  Handshake,
  Envelope,
} from "@phosphor-icons/react";

// ==================== ABOUT PAGE ====================
export const aboutStats = [
  { number: "50,000+", label: "NGƯỜI ĐƯỢC CỨU TRỢ" },
  { number: "5,000+", label: "TÌNH NGUYỆN VIÊN" },
  { number: "100+", label: "ĐỘI CỨU HỘ" },
  { number: "24/7", label: "SẴN SÀNG HỖ TRỢ" },
];

export const aboutValues = [
  {
    icon: Heart,
    title: "NHÂN ÁI",
    desc: "Đặt con người làm trung tâm, hành động vì cộng đồng",
  },
  {
    icon: Target,
    title: "HIỆU QUẢ",
    desc: "Phản ứng nhanh, điều phối chính xác, tối ưu nguồn lực",
  },
  {
    icon: Users,
    title: "ĐOÀN KẾT",
    desc: "Kết nối cộng đồng, cùng nhau vượt qua khó khăn",
  },
  {
    icon: Handshake,
    title: "MINH BẠCH",
    desc: "Hoạt động công khai, báo cáo rõ ràng, đáng tin cậy",
  },
];

export const aboutTeam = [
  { name: "Huỳnh Kim Cương", role: "Giám đốc điều hành", image: "public/images/team/team-1.jpeg" },
  { name: "Lê Minh Đăng Khoa", role: "Trưởng phòng Điều phối", image: "public/images/team/team-2.jpeg" },
  { name: "Nguyễn Trần Phương An", role: "Trưởng phòng Công nghệ", image: "public/images/team/team-3.jpeg" },
  { name: "Nguyễn Ngọc Thảo", role: "Trưởng phòng Truyền thông", image: "public/images/team/team-4.jpeg" },
  { name: "Lê Bảo Châu", role: "Trưởng phòng Vận hành", image: "public/images/team/team-5.jpeg" },
];

// ==================== NEWS PAGE ====================
export const featuredNews = {
  id: 0,
  image: "/images/rescuer_flood.jpg",
  date: "20/01/26",
  title: "ResQ SOS Miền Trung chính thức ra mắt phiên bản 2.0 với nhiều tính năng mới",
  description: "Phiên bản mới tích hợp AI để phân loại mức độ khẩn cấp tự động, cải thiện thời gian phản hồi và nâng cao trải nghiệm người dùng.",
  category: "SẢN PHẨM",
};

export const newsCategories = ["TẤT CẢ", "SẢN PHẨM", "CỘNG ĐỒNG", "ĐỐI TÁC", "SỰ KIỆN"];

// ==================== CONTACT PAGE ====================
export const contactMethods = [
  {
    icon: Phone,
    title: "ĐƯỜNG DÂY NÓNG",
    value: "1900 1234",
    desc: "Hoạt động 24/7 cho các trường hợp khẩn cấp",
    action: "tel:19001234",
    color: "bg-[#FF5722]",
  },
  {
    icon: Envelope,
    title: "EMAIL",
    value: "contact@resq.vn",
    desc: "Phản hồi trong vòng 24 giờ làm việc",
    action: "mailto:contact@resq.vn",
    color: "bg-black",
  },
  {
    icon: ChatCircle,
    title: "LIVE CHAT",
    value: "Chat trực tuyến",
    desc: "Hỗ trợ nhanh qua chat trong giờ làm việc",
    action: "#",
    color: "bg-blue-500",
  },
];

// ==================== DONATE PAGE ====================
export const donationOptions = [
  { amount: "100,000", label: "VNĐ", desc: "Hỗ trợ 1 gia đình với nhu yếu phẩm cơ bản" },
  { amount: "500,000", label: "VNĐ", desc: "Cung cấp áo phao và đèn pin cho đội cứu hộ" },
  { amount: "1,000,000", label: "VNĐ", desc: "Hỗ trợ vận chuyển hàng cứu trợ một chuyến" },
  { amount: "Khác", label: "", desc: "Nhập số tiền bạn muốn đóng góp" },
];

export const impactStats = [
  { number: "50,000+", label: "Người được hỗ trợ" },
  { number: "10,000+", label: "Phần quà cứu trợ" },
  { number: "500+", label: "Chuyến xe cứu trợ" },
  { number: "100%", label: "Minh bạch tài chính" },
];

// ==================== SERVICES ====================

export const services: Service[] = [
  {
    id: 'sos',
    icon: Warning,
    title: 'Gửi tín hiệu SOS',
    description: 'Gửi yêu cầu cứu trợ khẩn cấp với vị trí chính xác đến đội ngũ cứu hộ.',
    region: 'Khẩn cấp',
  },
  {
    id: 'shelter',
    icon: House,
    title: 'Tìm nơi trú ẩn',
    description: 'Định vị điểm sơ tán an toàn gần nhất trong vùng thiên tai.',
    region: 'An toàn',
  },
  {
    id: 'rescue',
    icon: Users,
    title: 'Đội cứu hộ',
    description: 'Kết nối với đội ngũ tình nguyện viên và lực lượng cứu hộ chuyên nghiệp.',
    region: 'Hỗ trợ',
  },
  {
    id: 'supply',
    icon: Truck,
    title: 'Tiếp tế vật tư',
    description: 'Nhận thông tin về các điểm phân phối nhu yếu phẩm và hàng cứu trợ.',
    region: 'Cứu trợ',
  },
  {
    id: 'medical',
    icon: Heart,
    title: 'Hỗ trợ y tế',
    description: 'Tìm kiếm cơ sở y tế hoạt động và nhận hướng dẫn sơ cứu.',
    region: 'Y tế',
  },
  {
    id: 'hotline',
    icon: Phone,
    title: 'Đường dây nóng',
    description: 'Liên hệ trực tiếp với trung tâm điều phối cứu hộ 24/7.',
    region: 'Liên lạc',
  },
];

export const regions: Region[] = [
  { id: 'mien-trung', name: 'Miền Trung', image: '/images/mien-trung.jpg' },
  { id: 'mien-bac', name: 'Miền Bắc', image: '/images/mien-bac.jpg' },
  { id: 'mien-nam', name: 'Miền Nam', image: '/images/mien-nam.jpg' },
];

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Deliveries",
    items: [
      {
        icon: ShoppingBag,
        title: "Food",
        desc: "Have all your cravings delivered to your doorstep.",
      },
      {
        icon: Package,
        title: "Mart",
        desc: "Groceries and essentials in one convenient place.",
      },
      {
        icon: PaperPlaneTilt,
        title: "Express",
        desc: "Send packages, documents, and beyond.",
      },
    ],
  },
  {
    title: "Mobility",
    items: [
      {
        icon: Car,
        title: "Rides",
        desc: "Choose from a variety of vehicles to get from A to B safely.",
      },
    ],
  },
  {
    title: "Financial Services",
    items: [
      {
        icon: Wallet,
        title: "Pay",
        desc: "Cashless payments that are seamless and secure.",
      },
      {
        icon: Shield,
        title: "Insurance",
        desc: "Everyday protection with accessible coverage.",
      },
    ],
  },
];

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
    image: "/images/hoi_chu_thap_do.png",
    title: "Kêu gọi nguồn lực hỗ trợ khẩn cấp cho người dân vùng lũ",
    description:
      "Hội Chữ thập đỏ các địa phương đang khẩn trương hỗ trợ nhu yếu phẩm để giúp người dân vượt qua giai đoạn khó khăn nhất.",
    link: "https://redcross.org.vn/keu-goi-nguon-luc-ho-tro-khan-cap-cho-nguoi-dan-vung-lu.html/",
  },
  {
    id: 2,
    image: "/images/mttq.png",
    title: "Ủy ban Trung ương MTTQ Việt Nam phát động toàn dân ủng hộ",
    description:
      "Trước những thiệt hại nặng nề do bão, lũ gây ra đối với đồng bào các tỉnh khu vực miền Trung, Tây Nguyên, chiều 21/11, Đoàn Chủ tịch Ủy ban Trung ương MTTQ Việt Nam tổ chức Lễ phát động “Toàn dân ủng hộ đồng bào miền Trung, Tây Nguyên khắc phục hậu quả mưa lũ”.",
    link: "https://baochinhphu.vn/uy-ban-trung-uong-mttq-viet-nam-phat-dong-toan-dan-ung-ho-dong-bao-mien-trung-tay-nguyen-khac-phuc-hau-qua-mua-lu-102251121184431511.htm",
  },
  {
    id: 3,
    image: "/images/quan_doi.png",
    title:
      "Các đơn vị Quân đội tập trung ứng phó lũ đặc biệt lớn",
    description:
      "Ngày 20-11, Bộ Quốc phòng có Công điện số 7453/CĐ-BQP về việc tập trung ứng phó lũ đặc biệt lớn tại Khánh Hòa, Đắk Lắk và Gia Lai",
    link: "https://www.qdnd.vn/quoc-phong-an-ninh/tin-tuc/cac-don-vi-quan-doi-tap-trung-ung-pho-lu-dac-biet-lon-1012970",
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
  {
    id: "ability-check",
    label: "🧪 Test Khảo sát",
    subItems: [
      {
        title: "1. Thông tin cá nhân",
        description: "Test trang nhập thông tin cá nhân (Dev only)",
        link: "/auth/personal-info",
      },
      {
        title: "2. Câu hỏi tiên quyết",
        description: "Test trang khảo sát năng lực cứu hộ (Dev only)",
        link: "/auth/ability-check",
      },
    ],
  },
];

export const features = [
  {
    icon: Warning,
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
    icon: WifiSlash,
    title: "Hoạt động Offline",
    description:
      "Các tính năng cơ bản hoạt động với kết nối internet không ổn định",
    color: "text-primary-teal",
    bgColor: "bg-teal-50",
  },
];

export const steps = [
  {
    icon: ChatCircle,
    title: "Tiếp nhận (Parser)",
    description:
      "Gemini chuyển đổi tin nhắn SOS thô thành JSON với mức độ ưu tiên (P1/P2/P3) và nhu cầu cụ thể.",
    color: "from-primary-red to-primary-orange",
  },
  {
    icon: Funnel,
    title: "Sàng lọc (Filter)",
    description:
      "Hệ thống quét bán kính 5-10km để tìm đội cứu hộ phù hợp sử dụng PostGIS.",
    color: "from-primary-blue to-cyan-500",
  },
  {
    icon: PaperPlaneTilt,
    title: "Điều phối (Dispatch)",
    description:
      'AI khớp nhu cầu (ví dụ: "Cần thuyền") với khả năng của đội cứu hộ (ví dụ: "Có thuyền máy").',
    color: "from-primary-teal to-emerald-500",
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    image: "/images/image.png",
    date: "31/12/25",
    title:
      "Hệ thống MTTQ Việt Nam vận động được hơn 3.900 tỷ đồng hỗ trợ đồng bào khắc phục hậu quả mưa lũ",
    link: "https://tienphong.vn/he-thong-mttq-viet-nam-van-dong-duoc-hon-3900-ty-dong-ho-tro-dong-bao-khac-phuc-hau-qua-mua-lu-post1809370.tpo",
  },
  {
    id: 2,
    image: "/images/fix.png",
    date: "15/12/25",
    title:
      "Thiên tai khốc liệt tại Khánh Hòa năm 2025 gây thiệt hại trên 6.000 tỉ đồng",
    link: "https://thanhnien.vn/thien-tai-khoc-liet-tai-khanh-hoa-nam-2025-gay-thiet-hai-tren-6000-ti-dong-185251215164812173.htm",
  },
  {
    id: 3,
    image: "/images/cong_an.png",
    date: "04/12/25",
    title:
      "Công an Lâm Đồng chủ động ứng phó, xuyên đêm cứu dân trong mưa lũ",
    link: "https://bocongan.gov.vn/bai-viet/cong-an-lam-dong-chu-dong-ung-pho-xuyen-dem-cuu-dan-trong-mua-lu-1764835632",
  },
  {
    id: 4,
    image: "/images/rescue_team.png",
    date: "24/11/25",
    title:
      "'Vỡ trận' đăng ký, 1.000 tình nguyện viên chen nhau xin trực vì vùng lũ miền Trung",
    link: "https://thanhnien.vn/vo-tran-dang-ky-1000-tinh-nguyen-vien-chen-nhau-xin-truc-vi-vung-lu-mien-trung-185251124004155295.htm",
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
] as const;

export const badges = [
  { text: "24/7 Sẵn sàng hỗ trợ", color: "bg-orange-500" },
  { text: "Bản đồ điểm ngập & tuyến an toàn", color: "bg-sky-500" },
  { text: "Kết nối đội cứu hộ địa phương", color: "bg-amber-500" },
];

// Terms of Service Page Constants
export const termsOfServiceSections = [
  {
    number: "01",
    title: "CHẤP NHẬN ĐIỀU KHOẢN",
    content: [
      "Bằng việc tải xuống, cài đặt hoặc sử dụng ứng dụng ResQ SOS Miền Trung, bạn đồng ý tuân thủ các điều khoản và điều kiện được quy định trong tài liệu này.",
      "Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng dịch vụ của chúng tôi.",
      "Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào. Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.",
    ],
  },
  {
    number: "02",
    title: "MÔ TẢ DỊCH VỤ",
    content: [
      "ResQ SOS Miền Trung là nền tảng kết nối người dân gặp nạn trong thiên tai với đội ngũ cứu hộ.",
    ],
    list: [
      { label: "GỬI TÍN HIỆU SOS", desc: "Gửi yêu cầu cứu hộ khẩn cấp kèm vị trí GPS" },
      { label: "TÌM NƠI TRÚ ẨN", desc: "Xác định các điểm sơ tán an toàn gần nhất" },
      { label: "YÊU CẦU TIẾP TẾ", desc: "Đăng ký nhu cầu về lương thực, nước uống, thuốc men" },
      { label: "CẬP NHẬT THÔNG TIN", desc: "Nhận thông tin về tình hình thiên tai" },
      { label: "KẾT NỐI CỘNG ĐỒNG", desc: "Liên lạc với tình nguyện viên và đội cứu hộ" },
    ],
  },
  {
    number: "03",
    title: "TRÁCH NHIỆM NGƯỜI DÙNG",
    content: [
      "Khi sử dụng ResQ SOS Miền Trung, bạn cam kết:",
      "Cung cấp thông tin chính xác, trung thực khi đăng ký và gửi yêu cầu cứu hộ.",
      "CHỈ GỬI TÍN HIỆU SOS KHI THỰC SỰ CẦN CỨU HỘ — việc gửi tín hiệu giả có thể khiến người khác gặp nguy hiểm.",
      "Không sử dụng dịch vụ cho mục đích bất hợp pháp hoặc gây hại cho người khác.",
      "Bảo mật thông tin tài khoản và thông báo ngay nếu phát hiện truy cập trái phép.",
    ],
  },
  {
    number: "04",
    title: "HÀNH VI BỊ CẤM",
    content: [
      "Các hành vi sau đây bị nghiêm cấm:",
    ],
    warnings: [
      "Gửi tín hiệu SOS giả — có thể bị xử lý theo quy định pháp luật",
      "Cố ý cung cấp thông tin sai lệch về vị trí hoặc tình trạng khẩn cấp",
      "Sử dụng dịch vụ để quấy rối, đe dọa hoặc gây hại cho người khác",
      "Cố gắng truy cập trái phép vào hệ thống hoặc dữ liệu",
      "Phát tán virus, mã độc hoặc nội dung có hại",
    ],
    footer: "Vi phạm có thể dẫn đến khóa tài khoản vĩnh viễn và chịu trách nhiệm pháp lý.",
  },
  {
    number: "05",
    title: "GIỚI HẠN TRÁCH NHIỆM",
    content: [
      "ResQ SOS Miền Trung cung cấp nền tảng kết nối và không chịu trách nhiệm trực tiếp về hoạt động cứu hộ.",
      "Chúng tôi nỗ lực để dịch vụ hoạt động liên tục nhưng không đảm bảo 100% thời gian hoạt động.",
      "Trong tình huống thiên tai, hiệu quả cứu hộ phụ thuộc vào nhiều yếu tố ngoài tầm kiểm soát.",
    ],
  },
  {
    number: "06",
    title: "DỊCH VỤ KHẨN CẤP",
    isEmergency: true,
    content: [
      "ResQ SOS Miền Trung KHÔNG thay thế các dịch vụ cứu hộ khẩn cấp chính thức.",
      "Trong tình huống đe dọa tính mạng, hãy gọi ngay đường dây nóng cứu hộ.",
      "Ứng dụng yêu cầu kết nối internet để hoạt động.",
    ],
    emergency: [
      { number: "113", label: "CÔNG AN" },
      { number: "114", label: "CỨU HỎA" },
      { number: "115", label: "CẤP CỨU" },
    ],
  },
];

export const termsOfServiceAdditionalTerms = [
  { number: "07", title: "QUYỀN SỞ HỮU TRÍ TUỆ", content: "Tất cả nội dung, thiết kế, logo, mã nguồn thuộc quyền sở hữu của ResQ SOS và được bảo vệ bởi luật sở hữu trí tuệ." },
  { number: "08", title: "CHẤM DỨT DỊCH VỤ", content: "Chúng tôi có quyền tạm ngưng hoặc chấm dứt quyền truy cập nếu bạn vi phạm điều khoản hoặc gây hại cho cộng đồng." },
  { number: "09", title: "LUẬT ÁP DỤNG", content: "Các điều khoản được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp sẽ được giải quyết tại Tòa án có thẩm quyền." },
  { number: "10", title: "ĐIỀU KHOẢN RIÊNG BIỆT", content: "Nếu bất kỳ điều khoản nào bị tuyên bố vô hiệu, các điều khoản còn lại vẫn có hiệu lực đầy đủ." },
];

// Privacy Policy Page Constants
export const privacyPolicySections = [
  {
    number: "01",
    title: "THU THẬP THÔNG TIN",
    intro: "Khi bạn sử dụng ứng dụng ResQ SOS Miền Trung, chúng tôi có thể thu thập:",
    items: [
      { label: "THÔNG TIN CÁ NHÂN", desc: "Họ tên, số điện thoại, địa chỉ email khi đăng ký tài khoản hoặc gửi yêu cầu SOS" },
      { label: "THÔNG TIN VỊ TRÍ", desc: "Vị trí GPS để xác định chính xác nơi cần cứu hộ và kết nối với đội cứu trợ gần nhất" },
      { label: "THÔNG TIN THIẾT BỊ", desc: "Loại thiết bị, hệ điều hành, mã nhận dạng để đảm bảo ứng dụng hoạt động tối ưu" },
      { label: "THÔNG TIN SỨC KHỎE", desc: "Trong trường hợp khẩn cấp, thông tin y tế để đội cứu trợ chuẩn bị phương án phù hợp" },
    ],
  },
  {
    number: "02",
    title: "MỤC ĐÍCH SỬ DỤNG",
    intro: "Chúng tôi sử dụng thông tin thu thập được để:",
    content: [
      "Cung cấp dịch vụ cứu hộ khẩn cấp và kết nối bạn với đội ngũ cứu trợ",
      "Xác định vị trí của bạn để điều phối lực lượng cứu hộ hiệu quả",
      "Liên lạc về tình trạng yêu cầu cứu hộ hoặc thông báo quan trọng",
      "Cải thiện chất lượng dịch vụ và trải nghiệm người dùng",
      "Phân tích xu hướng thiên tai để nâng cao khả năng ứng phó",
      "Tuân thủ các yêu cầu pháp lý và hỗ trợ cơ quan chức năng",
    ],
  },
  {
    number: "03",
    title: "BẢO MẬT THÔNG TIN",
    isHighlight: true,
    intro: "ResQ SOS Miền Trung cam kết bảo vệ thông tin của bạn:",
    features: [
      { stat: "256-BIT", label: "Mã hóa dữ liệu đầu-cuối" },
      { stat: "24/7", label: "Giám sát hoạt động đáng ngờ" },
      { stat: "ISO", label: "Tiêu chuẩn bảo mật quốc tế" },
      { stat: "99.9%", label: "Cam kết bảo vệ dữ liệu" },
    ],
  },
  {
    number: "04",
    title: "CHIA SẺ THÔNG TIN",
    intro: "Chúng tôi có thể chia sẻ thông tin trong các trường hợp:",
    shares: [
      { to: "ĐỘI NGŨ CỨU HỘ", reason: "Chia sẻ vị trí và thông tin liên lạc để thực hiện cứu trợ" },
      { to: "CƠ QUAN CHỨC NĂNG", reason: "Khi có yêu cầu từ cơ quan nhà nước theo quy định pháp luật" },
      { to: "ĐỐI TÁC Y TẾ", reason: "Trong trường hợp khẩn cấp cần hỗ trợ y tế" },
    ],
    warning: "Chúng tôi KHÔNG bán hoặc cho thuê thông tin cá nhân cho bên thứ ba vì mục đích thương mại.",
  },
  {
    number: "05",
    title: "QUYỀN CỦA NGƯỜI DÙNG",
    intro: "Bạn có các quyền sau đối với thông tin cá nhân:",
    rights: [
      { right: "QUYỀN TRUY CẬP", desc: "Yêu cầu xem thông tin cá nhân chúng tôi đang lưu trữ" },
      { right: "QUYỀN CHỈNH SỬA", desc: "Cập nhật hoặc sửa đổi thông tin không chính xác" },
      { right: "QUYỀN XÓA", desc: "Yêu cầu xóa thông tin cá nhân" },
      { right: "QUYỀN HẠN CHẾ", desc: "Yêu cầu hạn chế việc xử lý thông tin" },
      { right: "QUYỀN PHẢN ĐỐI", desc: "Phản đối việc sử dụng thông tin" },
    ],
  },
  {
    number: "06",
    title: "COOKIE & THEO DÕI",
    intro: "Website và ứng dụng của chúng tôi sử dụng:",
    cookies: [
      { type: "CẦN THIẾT", desc: "Để đảm bảo ứng dụng hoạt động bình thường", required: true },
      { type: "PHÂN TÍCH", desc: "Để hiểu cách người dùng sử dụng dịch vụ", required: false },
    ],
  },
  {
    number: "07",
    title: "LƯU TRỮ DỮ LIỆU",
    intro: "Thời gian lưu trữ thông tin:",
    timeline: [
      { period: "ĐANG SỬ DỤNG", desc: "Thông tin được lưu trữ trong thời gian bạn sử dụng dịch vụ" },
      { period: "SAU KHI XÓA", desc: "Xóa hoặc ẩn danh hóa trong vòng 30 ngày" },
      { period: "THEO PHÁP LUẬT", desc: "Một số thông tin có thể được giữ lâu hơn nếu được yêu cầu" },
    ],
  },
];

// ==================== ABILITY CHECK PAGE ====================
export const prerequisiteQuestions: PrerequisiteQuestion[] = [
  {
    id: 1,
    category: "Kỹ năng bơi",
    categoryEn: "Swimming Ability",
    question: "Bạn có thể tự bơi và giữ an toàn cho bản thân trong môi trường nước ngập không?",
    yesAnswer: "Có, tôi có thể tự bơi và không hoảng loạn khi ở dưới nước",
    noAnswer: "Không",
    warningMessage: "Nếu chọn \"Không\" → không thể tham gia cứu hộ lũ. Khả năng bơi là yêu cầu bắt buộc để đảm bảo an toàn cho chính bạn trong các tình huống ngập nước.",
    iconName: "PersonSimpleSwimIcon",
  },
  {
    id: 2,
    category: "Nhận thức an toàn cá nhân",
    categoryEn: "Personal Safety Awareness",
    question: "Trong tình huống nguy hiểm (nước xiết, điện giật, sạt lở), bạn có sẵn sàng rút lui và không cố cứu vượt khả năng của mình không?",
    yesAnswer: "Có, tôi ưu tiên an toàn cho bản thân và đội",
    noAnswer: "Không / Tôi sẽ cố cứu bằng mọi giá",
    warningMessage: "Chọn phương án này → không đủ điều kiện. Việc cố cứu vượt khả năng có thể gây nguy hiểm cho cả bạn và người được cứu, đồng thời tạo thêm gánh nặng cho đội cứu hộ.",
    iconName: "ShieldCheck",
  },
  {
    id: 3,
    category: "Giao tiếp & tuân thủ điều phối",
    categoryEn: "Communication & Coordination",
    question: "Khi tham gia cứu hộ, bạn có cam kết tuân thủ sự điều phối của hệ thống và người điều phối, không tự ý hành động ngoài nhiệm vụ được giao không?",
    yesAnswer: "Có, tôi cam kết tuân thủ điều phối",
    noAnswer: "Không",
    warningMessage: "Không tuân thủ → không thể tham gia hệ thống ResQ. Sự phối hợp nhịp nhàng giữa các thành viên là yếu tố quyết định thành công của mỗi nhiệm vụ cứu hộ.",
    iconName: "Handshake",
  },
  {
    id: 4,
    category: "Khả năng học nhanh & tuân thủ quy trình",
    categoryEn: "Trainability",
    question: "Bạn có sẵn sàng học và tuân thủ quy trình cứu hộ do ResQ hướng dẫn trước khi tham gia nhiệm vụ không?",
    yesAnswer: "Có, tôi sẵn sàng học và làm theo quy trình",
    noAnswer: "Không",
    warningMessage: "Không sẵn sàng học → rủi ro cao cho toàn đội. Quy trình cứu hộ được thiết kế để bảo vệ tất cả mọi người, việc không tuân thủ có thể dẫn đến hậu quả nghiêm trọng.",
    iconName: "GraduationCap",
  },
];

// ==================== DETAILED ABILITIES ====================
export const rescueSkillCategories = [
  {
    id: "rescue-survival",
    title: "I. CỨU HỘ & SINH TỒN",
    titleEn: "RESCUE & SURVIVAL",
    subgroups: [
      {
        subtitle: "Kỹ năng bơi lội",
        skills: [
          { id: "basic-swimming", label: "Bơi cơ bản" },
          { id: "advanced-swimming", label: "Bơi thành thạo" },
          { id: "underwater-rescue", label: "Cứu hộ dưới nước" },
          { id: "deep-water-movement", label: "Di chuyển trong nước ngập sâu" },
          { id: "strong-current-movement", label: "Di chuyển trong dòng nước chảy xiết" },
          { id: "basic-diving", label: "Lặn cơ bản" },
          { id: "flooded-escape", label: "Thoát hiểm trong môi trường ngập nước" },
        ],
      },
      {
        subtitle: "Kỹ năng cứu người",
        skills: [
          { id: "house-rescue", label: "Cứu người bị mắc kẹt trong nhà ngập" },
          { id: "roof-rescue", label: "Cứu người bị mắc kẹt trên mái nhà" },
          { id: "vehicle-rescue", label: "Cứu người bị kẹt trong phương tiện (xe, ghe)" },
          { id: "rope-rescue", label: "Sử dụng dây thừng cứu hộ" },
          { id: "life-jacket-use", label: "Sử dụng áo phao, phao cứu sinh" },
        ],
      },
      {
        subtitle: "Cứu hộ trong điều kiện khắc nghiệt",
        skills: [
          { id: "night-rescue", label: "Cứu hộ ban đêm / tầm nhìn kém" },
          { id: "storm-rescue", label: "Cứu hộ trong mưa lớn / bão" },
          { id: "debris-rescue", label: "Cứu hộ tại khu vực đổ nát" },
          { id: "hazard-rescue", label: "Cứu hộ trong môi trường nguy hiểm" },
        ],
      },
    ],
  },
  {
    id: "medical-first-aid",
    title: "II. Y TẾ & SƠ CỨU",
    titleEn: "MEDICAL & FIRST AID",
    subgroups: [
      {
        subtitle: "Sơ cứu cơ bản",
        skills: [
          { id: "open-wound-first-aid", label: "Sơ cứu vết thương hở" },
          { id: "bleeding-control", label: "Cầm máu" },
          { id: "wound-bandaging", label: "Băng bó vết thương" },
          { id: "minor-injury-treatment", label: "Xử lý trầy xước, chấn thương nhẹ" },
          { id: "minor-burn-treatment", label: "Xử lý bỏng nhẹ" },
        ],
      },
      {
        subtitle: "Cấp cứu",
        skills: [
          { id: "cpr", label: "Hồi sức tim phổi (CPR)" },
          { id: "drowning-treatment", label: "Xử lý đuối nước" },
          { id: "shock-treatment", label: "Xử lý sốc" },
          { id: "hypothermia-treatment", label: "Xử lý hạ thân nhiệt" },
          { id: "vital-signs-monitoring", label: "Theo dõi dấu hiệu sinh tồn" },
          { id: "victim-assessment", label: "Đánh giá mức độ nguy kịch nạn nhân" },
        ],
      },
      {
        subtitle: "Chấn thương",
        skills: [
          { id: "fracture-immobilization", label: "Cố định gãy xương tạm thời" },
          { id: "spinal-injury-handling", label: "Xử lý chấn thương cột sống (cơ bản)" },
          { id: "safe-patient-transport", label: "Vận chuyển người bị thương an toàn" },
        ],
      },
      {
        subtitle: "Y tế chuyên môn",
        singleSelect: true, // Chỉ được chọn 1 vai trò
        skills: [
          { id: "medical-staff", label: "Nhân viên y tế" },
          { id: "nurse", label: "Y tá" },
          { id: "doctor", label: "Bác sĩ" },
          { id: "pre-hospital-emergency", label: "Cấp cứu tiền viện" },
        ],
      },
    ],
  },
  // ==================== III. PHƯƠNG TIỆN & VẬN CHUYỂN ====================
  {
    id: "mobility-transport",
    title: "III. PHƯƠNG TIỆN & VẬN CHUYỂN",
    titleEn: "MOBILITY & TRANSPORT",
    subgroups: [
      {
        subtitle: "Lái xe cơ giới",
        skills: [
          { id: "motorbike", label: "Lái xe máy" },
          { id: "motorbike-flood", label: "Lái xe máy trong điều kiện ngập nước" },
          { id: "car", label: "Lái ô tô" },
          { id: "offroad-car", label: "Lái ô tô địa hình" },
        ],
      },
      {
        subtitle: "Lái phương tiện thủy",
        skills: [
          { id: "boat-ghe", label: "Lái ghe" },
          { id: "boat-xuong", label: "Lái xuồng" },
          { id: "speedboat", label: "Lái ca nô" },
        ],
      },
      {
        subtitle: "Kỹ năng điều khiển đặc biệt",
        skills: [
          { id: "night-driving", label: "Điều khiển phương tiện ban đêm" },
          { id: "rain-driving", label: "Điều khiển phương tiện trong mưa lớn" },
        ],
      },
      {
        subtitle: "Vận chuyển",
        skills: [
          { id: "victim-transport", label: "Vận chuyển nạn nhân" },
          { id: "relief-transport", label: "Vận chuyển hàng cứu trợ" },
          { id: "heavy-transport", label: "Vận chuyển hàng nặng" },
        ],
      },
    ],
  },
  // ==================== IV. KINH NGHIỆM & CHỨNG CHỈ ====================
  {
    id: "experience-certificates",
    title: "IV. KINH NGHIỆM & CHỨNG CHỈ",
    titleEn: "EXPERIENCE & CERTIFICATES (OPTIONAL)",
    subgroups: [
      {
        subtitle: "Kinh nghiệm thực tế",
        skills: [
          { id: "disaster-relief-exp", label: "Đã tham gia cứu trợ thiên tai" },
          { id: "flood-rescue-exp", label: "Kinh nghiệm cứu hộ lũ lụt" },
          { id: "community-rescue-exp", label: "Kinh nghiệm cứu hộ cộng đồng" },
        ],
      },
      {
        subtitle: "Chứng chỉ",
        skills: [
          { id: "rescue-certificate", label: "Chứng chỉ cứu hộ" },
          { id: "first-aid-certificate", label: "Chứng chỉ sơ cứu / y tế" },
        ],
      },
      {
        subtitle: "Tổ chức",
        skills: [
          { id: "local-rescue-team", label: "Thành viên đội cứu hộ địa phương" },
          { id: "volunteer-org", label: "Thành viên tổ chức thiện nguyện" },
        ],
      },
    ],
  },
];
