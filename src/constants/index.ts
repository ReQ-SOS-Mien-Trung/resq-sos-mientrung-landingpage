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
  {
    name: "Huỳnh Kim Cương",
    role: "Giám đốc điều hành",
    image: "/images/team/Team%201.jpg",
  },
  {
    name: "Lê Minh Đăng Khoa",
    role: "Trưởng phòng Điều phối",
    image: "/images/team/Team%202.jpg",
  },
  {
    name: "Nguyễn Trần Phương An",
    role: "Trưởng phòng Công nghệ",
    image: "/images/team/Team%203.jpg",
  },
  {
    name: "Nguyễn Ngọc Thảo",
    role: "Trưởng phòng Truyền thông",
    image: "/images/team/Team%204.jpg",
  },
  {
    name: "Lê Bảo Châu",
    role: "Trưởng phòng Vận hành",
    image: "/images/team/Team%205.jpg",
  },
];

// ==================== NEWS PAGE ====================
export const featuredNews = {
  id: 0,
  image: "/images/rescuer_flood.jpg",
  date: "20/01/26",
  title:
    "ResQ SOS Miền Trung chính thức ra mắt phiên bản 2.0 với nhiều tính năng mới",
  description:
    "Phiên bản mới tích hợp AI để phân loại mức độ khẩn cấp tự động, cải thiện thời gian phản hồi và nâng cao trải nghiệm người dùng.",
  category: "SẢN PHẨM",
};

export const newsCategories = [
  "TẤT CẢ",
  "SẢN PHẨM",
  "CỘNG ĐỒNG",
  "ĐỐI TÁC",
  "SỰ KIỆN",
];

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
  {
    amount: "100,000",
    label: "VNĐ",
    desc: "Hỗ trợ 1 gia đình với nhu yếu phẩm cơ bản",
  },
  {
    amount: "500,000",
    label: "VNĐ",
    desc: "Cung cấp áo phao và đèn pin cho đội cứu hộ",
  },
  {
    amount: "1,000,000",
    label: "VNĐ",
    desc: "Hỗ trợ vận chuyển hàng cứu trợ một chuyến",
  },
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
    id: "sos",
    icon: Warning,
    title: "Gửi tín hiệu SOS",
    description:
      "Gửi yêu cầu cứu trợ khẩn cấp với vị trí chính xác đến đội ngũ cứu hộ.",
    region: "Khẩn cấp",
  },
  {
    id: "shelter",
    icon: House,
    title: "Tìm nơi trú ẩn",
    description: "Định vị điểm sơ tán an toàn gần nhất trong vùng thiên tai.",
    region: "An toàn",
  },
  {
    id: "rescue",
    icon: Users,
    title: "Đội cứu hộ",
    description:
      "Kết nối với đội ngũ tình nguyện viên và lực lượng cứu hộ chuyên nghiệp.",
    region: "Hỗ trợ",
  },
  {
    id: "supply",
    icon: Truck,
    title: "Tiếp tế vật tư",
    description:
      "Nhận thông tin về các điểm phân phối nhu yếu phẩm và hàng cứu trợ.",
    region: "Cứu trợ",
  },
  {
    id: "medical",
    icon: Heart,
    title: "Hỗ trợ y tế",
    description: "Tìm kiếm cơ sở y tế hoạt động và nhận hướng dẫn sơ cứu.",
    region: "Y tế",
  },
  {
    id: "hotline",
    icon: Phone,
    title: "Đường dây nóng",
    description: "Liên hệ trực tiếp với trung tâm điều phối cứu hộ 24/7.",
    region: "Liên lạc",
  },
];

export const regions: Region[] = [
  { id: "mien-trung", name: "Miền Trung", image: "/images/mien-trung.jpg" },
  { id: "mien-bac", name: "Miền Bắc", image: "/images/mien-bac.jpg" },
  { id: "mien-nam", name: "Miền Nam", image: "/images/mien-nam.jpg" },
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
    title: "Các đơn vị Quân đội tập trung ứng phó lũ đặc biệt lớn",
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
        link: "/about",
      },
      {
        title: "Tầm nhìn & Sứ mệnh",
        description: "Mục tiêu và giá trị cốt lõi của chúng tôi",
        link: "/about",
      },
      {
        title: "Đội ngũ",
        description: "Gặp gỡ những người đang xây dựng tương lai cứu hộ",
        link: "/about",
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
        link: "/register",
      },
      {
        title: "Tài nguyên",
        description: "Công cụ và tài liệu hỗ trợ đội cứu hộ",
        link: "/help-center",
      },
      {
        title: "Cộng đồng",
        description: "Kết nối với các đội cứu hộ khác",
        link: "/register",
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
        link: "/contact",
      },
      {
        title: "Đối tác hiện tại",
        description: "Các tổ chức đang hợp tác với chúng tôi",
        link: "/contact",
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
        link: "/news",
      },
      {
        title: "Blog",
        description: "Câu chuyện và chia sẻ từ cộng đồng cứu hộ",
        link: "/news",
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
    title: "Công an Lâm Đồng chủ động ứng phó, xuyên đêm cứu dân trong mưa lũ",
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
    title: "PHẠM VI ÁP DỤNG",
    content: [
      "Điều khoản này áp dụng đối với mọi cá nhân tải xuống, cài đặt, đăng ký, đăng nhập, truy cập hoặc sử dụng ứng dụng RESQ.",
      "Khi tạo tài khoản, đăng nhập, gửi yêu cầu khẩn cấp, chia sẻ vị trí, sử dụng tính năng nhắn tin, trợ lý ảo, hồ sơ khẩn cấp hoặc tiếp tục sử dụng ứng dụng, người dùng được xem là đã đọc, hiểu và đồng ý với toàn bộ nội dung của Điều khoản này.",
      "Nếu người dùng không đồng ý với bất kỳ nội dung nào trong Điều khoản này, người dùng phải ngừng sử dụng ứng dụng.",
    ],
  },
  {
    number: "02",
    title: "MỤC ĐÍCH CỦA ỨNG DỤNG",
    content: [
      "RESQ là ứng dụng hỗ trợ tiếp nhận, ghi nhận, chuyển thông tin và phối hợp hỗ trợ trong các tình huống khẩn cấp, thiên tai, tai nạn hoặc hoàn cảnh nguy hiểm cần cứu trợ, cứu nạn, cứu hộ.",
      "Ứng dụng được tạo ra để hỗ trợ người dùng gửi thông tin nhanh hơn, rõ hơn và thuận tiện hơn. Tuy nhiên, RESQ không thay thế số điện thoại khẩn cấp, cơ quan công an, ủy ban nhân dân địa phương hoặc cơ quan nhà nước có thẩm quyền.",
      "Trong trường hợp nguy cấp, đe dọa trực tiếp đến tính mạng, sức khỏe hoặc an toàn, người dùng phải ưu tiên liên hệ cơ quan chức năng phù hợp. Việc gửi thông tin qua RESQ chỉ là một kênh hỗ trợ bổ sung.",
    ],
    emergency: [
      { number: "113", label: "CÔNG AN" },
      { number: "114", label: "CỨU HỎA" },
      { number: "115", label: "CẤP CỨU" },
    ],
  },
  {
    number: "03",
    title: "QUYỀN SỬ DỤNG ỨNG DỤNG",
    content: [
      "Đơn vị vận hành cho phép người dùng sử dụng ứng dụng RESQ trong phạm vi cá nhân, đúng mục đích, đúng quy định và không trái pháp luật.",
      "Người dùng không được:",
    ],
    warnings: [
      "Sao chép, sửa đổi, phát tán hoặc sử dụng ứng dụng vào mục đích kinh doanh trái phép",
      "Tìm cách can thiệp, phá hoại, làm sai lệch hoặc gây ảnh hưởng xấu đến hoạt động của ứng dụng",
      "Dùng công cụ hoặc cách thức không hợp pháp để lấy dữ liệu, làm nghẽn ứng dụng hoặc vượt qua các biện pháp bảo vệ",
      "Sử dụng ứng dụng vào mục đích lừa đảo, quấy rối, trục lợi hoặc gây hại cho người khác",
    ],
  },
  {
    number: "04",
    title: "TÀI KHOẢN NGƯỜI DÙNG",
    content: [
      "Người dùng phải cung cấp thông tin đúng sự thật, đầy đủ và còn hiệu lực khi đăng ký tài khoản hoặc khi được yêu cầu bổ sung thông tin.",
      "Người dùng có trách nhiệm:",
    ],
    warnings: [
      "Giữ bí mật thông tin đăng nhập",
      "Tự bảo quản thiết bị dùng để truy cập ứng dụng",
      "Không cho người khác mượn, dùng chung, mua bán hoặc chuyển nhượng tài khoản",
      "Thông báo kịp thời cho đơn vị vận hành nếu phát hiện tài khoản bị sử dụng trái phép",
    ],
    footer:
      "Đơn vị vận hành có quyền yêu cầu người dùng xác minh lại thông tin trong trường hợp cần thiết.",
  },
  {
    number: "05",
    title: "CÁC TÍNH NĂNG CỦA ỨNG DỤNG",
    content: [
      "Tùy từng thời điểm vận hành, RESQ có thể cung cấp một hoặc nhiều tính năng như:",
    ],
    list: [
      {
        label: "GỬI YÊU CẦU KHẨN CẤP",
        desc: "Gửi yêu cầu hỗ trợ kèm thông tin vị trí",
      },
      { label: "LỊCH SỬ YÊU CẦU", desc: "Theo dõi lịch sử các yêu cầu đã gửi" },
      {
        label: "CHIA SẺ VỊ TRÍ",
        desc: "Chia sẻ vị trí và tình trạng cần hỗ trợ",
      },
      {
        label: "NHẮN TIN",
        desc: "Nhắn tin với bộ phận điều phối hoặc người hỗ trợ",
      },
      { label: "TRỢ LÝ ẢO", desc: "Sử dụng trợ lý ảo để tham khảo thông tin" },
      {
        label: "HỒ SƠ KHẨN CẤP",
        desc: "Lưu hồ sơ khẩn cấp của bản thân hoặc người thân",
      },
    ],
  },
  {
    number: "06",
    title: "QUYỀN TRUY CẬP THÔNG TIN CẦN THIẾT",
    content: [
      "Để ứng dụng hoạt động đúng mục đích, người dùng đồng ý cho RESQ sử dụng các thông tin cần thiết phù hợp với tính năng đang dùng.",
      "Người dùng hiểu rằng một số tính năng của ứng dụng sẽ không hoạt động đầy đủ nếu người dùng không cho phép sử dụng những thông tin cần thiết nói trên.",
    ],
    list: [
      {
        label: "VỊ TRÍ",
        desc: "Vị trí hiện tại hoặc vị trí do người dùng chọn",
      },
      { label: "THỜI ĐIỂM", desc: "Thời điểm gửi thông tin" },
      { label: "KẾT NỐI", desc: "Tình trạng kết nối và mức pin của thiết bị" },
      { label: "LIÊN HỆ", desc: "Thông tin liên hệ của người dùng" },
      { label: "HỒ SƠ", desc: "Thông tin trong hồ sơ khẩn cấp" },
      {
        label: "MEDIA",
        desc: "Hình ảnh, âm thanh nếu người dùng chủ động cung cấp",
      },
    ],
  },
  {
    number: "07",
    title: "GỬI YÊU CẦU KHẨN CẤP",
    isEmergency: true,
    content: [
      "Người dùng chỉ được gửi yêu cầu khẩn cấp khi thực sự có nhu cầu hỗ trợ hoặc có căn cứ hợp lý để tin rằng một người hoặc một nhóm người đang cần được giúp đỡ.",
      "Người dùng phải cung cấp thông tin trung thực, rõ ràng và trong phạm vi cần thiết, bao gồm:",
      "Người dùng phải tự chịu trách nhiệm về nội dung mình cung cấp. Nếu người dùng cố ý báo tin giả, báo sai sự thật hoặc cung cấp thông tin gây hiểu nhầm làm ảnh hưởng đến hoạt động hỗ trợ, người dùng phải chịu trách nhiệm theo quy định của ứng dụng và theo pháp luật.",
      "Việc một yêu cầu được ghi nhận trên ứng dụng không có nghĩa là yêu cầu đó chắc chắn sẽ được xử lý ngay hoặc được hỗ trợ trong một thời hạn nhất định.",
    ],
    warnings: [
      "Người đang cần hỗ trợ",
      "Vị trí xảy ra sự việc",
      "Số lượng người liên quan",
      "Tình trạng nguy hiểm, bị thương, mắc kẹt hoặc thiếu nhu yếu phẩm",
      "Thông tin liên hệ",
      "Ghi chú quan trọng khác nếu có",
    ],
  },
  {
    number: "08",
    title: "NỘI DUNG DO NGƯỜI DÙNG CUNG CẤP",
    content: [
      "Mọi thông tin, hình ảnh, âm thanh, tin nhắn, hồ sơ, tài liệu hoặc dữ liệu do người dùng cung cấp qua RESQ đều thuộc trách nhiệm của người dùng.",
      "Người dùng đồng ý cho đơn vị vận hành được lưu giữ, sắp xếp, xem xét, hiển thị, chuyển tiếp, giới hạn hoặc gỡ bỏ các nội dung đó trong phạm vi cần thiết để vận hành ứng dụng, kiểm tra tính xác thực, hỗ trợ điều phối, xử lý vi phạm và thực hiện yêu cầu hợp pháp của cơ quan có thẩm quyền.",
      "Đơn vị vận hành có quyền từ chối hiển thị, gỡ bỏ hoặc hạn chế bất kỳ nội dung nào nếu có căn cứ cho rằng nội dung đó sai sự thật, không phù hợp, gây hại, xâm phạm quyền riêng tư hoặc vi phạm Điều khoản này.",
    ],
  },
  {
    number: "09",
    title: "HỒ SƠ KHẨN CẤP",
    content: [
      "Ứng dụng có thể cho phép người dùng lưu hồ sơ khẩn cấp của bản thân hoặc của người thân để phục vụ việc hỗ trợ trong tình huống nguy cấp.",
      "Người dùng chỉ được lưu thông tin của người khác khi có căn cứ hợp pháp và phù hợp với mục đích hỗ trợ khẩn cấp. Người dùng không được lợi dụng tính năng này để thu thập, lưu giữ hoặc phát tán trái phép thông tin riêng tư của người khác.",
    ],
    list: [
      { label: "HỌ TÊN", desc: "Tên đầy đủ của người cần hỗ trợ" },
      { label: "SỐ ĐIỆN THOẠI", desc: "Thông tin liên hệ khẩn cấp" },
      { label: "MỐI QUAN HỆ", desc: "Quan hệ với người đăng ký hồ sơ" },
      { label: "SỨC KHỎE", desc: "Tình trạng sức khỏe và nhu cầu đặc biệt" },
      { label: "ĐI LẠI", desc: "Khả năng di chuyển" },
      {
        label: "GHI CHÚ",
        desc: "Ghi chú quan trọng liên quan đến việc hỗ trợ",
      },
    ],
  },
  {
    number: "10",
    title: "NHẮN TIN VÀ TRỢ LÝ ẢO",
    content: [
      "Ứng dụng có thể cung cấp tính năng nhắn tin để người dùng trao đổi với bộ phận điều phối hoặc người hỗ trợ.",
      "Trợ lý ảo trong ứng dụng chỉ có tính chất tham khảo. Nội dung do trợ lý ảo đưa ra có thể chưa đầy đủ, chưa chính xác hoặc không phù hợp với mọi trường hợp cụ thể. Người dùng không được xem đó là căn cứ duy nhất để đưa ra quyết định ảnh hưởng đến tính mạng, sức khỏe, tài sản hoặc an toàn.",
      "Người dùng không được dùng tính năng nhắn tin để:",
    ],
    warnings: [
      "Gửi nội dung quấy rối, xúc phạm, đe dọa hoặc vu khống",
      "Phát tán tin sai sự thật",
      "Gửi nội dung phản cảm, độc hại hoặc trái pháp luật",
      "Làm phiền, gây nghẽn hoặc cản trở quá trình hỗ trợ",
    ],
  },
  {
    number: "11",
    title: "CHUYỂN TÀI KHOẢN VÀ MÃ KHẨN CẤP",
    content: [
      "Ứng dụng có thể cho phép người dùng chuyển quyền sử dụng tài khoản từ thiết bị cũ sang thiết bị mới hoặc dùng mã khẩn cấp trong một số trường hợp cần thiết.",
      "Người dùng chỉ được sử dụng tính năng này đối với tài khoản của chính mình. Người dùng không được:",
    ],
    warnings: [
      "Chiếm đoạt tài khoản của người khác",
      "Sao chép hoặc sử dụng trái phép mã khẩn cấp",
      "Dùng tính năng này để vượt qua các biện pháp bảo vệ của ứng dụng",
    ],
    footer:
      "Đơn vị vận hành có quyền áp dụng các biện pháp cần thiết để bảo đảm một tài khoản không bị sử dụng trái phép trên nhiều thiết bị theo cách gây mất an toàn.",
  },
  {
    number: "12",
    title: "HÀNH VI BỊ CẤM",
    isDark: true,
    content: ["Người dùng không được thực hiện các hành vi sau:"],
    warnings: [
      "Báo tin giả hoặc cung cấp thông tin sai sự thật",
      "Mạo danh người khác",
      "Cản trở, gây rối hoặc làm chậm hoạt động tiếp nhận và xử lý thông tin khẩn cấp",
      "Phá hoại, làm hỏng hoặc làm sai lệch hoạt động của ứng dụng",
      "Thu thập, công khai, chia sẻ hoặc sử dụng trái phép thông tin cá nhân của người khác",
      "Lợi dụng thiên tai, tai nạn hoặc hoàn cảnh nguy cấp để trục lợi",
      "Sử dụng ứng dụng vào mục đích trái pháp luật hoặc trái đạo đức xã hội",
      "Né tránh việc bị xử lý bằng cách tạo tài khoản mới hoặc dùng cách thức khác để tiếp tục vi phạm",
    ],
    footer:
      "Vi phạm có thể dẫn đến khóa tài khoản vĩnh viễn và chịu trách nhiệm pháp lý.",
  },
  {
    number: "13",
    title: "QUYỀN CỦA ĐƠN VỊ VẬN HÀNH",
    isEmergency: true,
    content: [
      "Để bảo đảm an toàn cho người dùng và cho hoạt động của ứng dụng, đơn vị vận hành có quyền:",
      "Trong trường hợp có nguy cơ gây hại ngay lập tức cho con người, cho dữ liệu hoặc cho hoạt động hỗ trợ, đơn vị vận hành có thể áp dụng biện pháp ngăn chặn ngay mà không cần chờ người dùng giải trình trước.",
    ],
    warnings: [
      "Yêu cầu người dùng cung cấp thêm thông tin để xác minh",
      "Đánh dấu thông tin chưa được kiểm tra hoặc có dấu hiệu rủi ro",
      "Hạn chế một phần quyền sử dụng của người dùng",
      "Ẩn hoặc gỡ nội dung",
      "Tạm khóa hoặc khóa vĩnh viễn tài khoản",
      "Lưu giữ thông tin cần thiết để phục vụ việc kiểm tra, xử lý vi phạm hoặc đáp ứng yêu cầu của cơ quan có thẩm quyền",
    ],
  },
  {
    number: "14",
    title: "DỮ LIỆU CÁ NHÂN VÀ CHIA SẺ THÔNG TIN",
    content: [
      "Đơn vị vận hành thu thập và sử dụng dữ liệu cá nhân trong phạm vi cần thiết để: vận hành ứng dụng; tiếp nhận và xử lý thông tin hỗ trợ; xác minh, điều phối và liên lạc khi cần; bảo đảm an toàn cho người dùng; xử lý vi phạm; thực hiện nghĩa vụ theo quy định của pháp luật.",
      "Trong trường hợp khẩn cấp, đơn vị vận hành có thể chia sẻ những thông tin thật sự cần thiết với lực lượng hỗ trợ, cơ quan có thẩm quyền hoặc bên liên quan phù hợp để phục vụ việc cứu trợ, cứu nạn, cứu hộ hoặc bảo vệ tính mạng, sức khỏe và an toàn của con người.",
      "Việc thu thập, sử dụng, lưu giữ và chia sẻ dữ liệu cá nhân còn được thực hiện theo Chính sách bảo mật dữ liệu của ứng dụng và theo quy định của pháp luật hiện hành.",
    ],
  },
  {
    number: "15",
    title: "GIỚI HẠN TRÁCH NHIỆM",
    content: [
      "Người dùng hiểu và đồng ý rằng thông tin vị trí có thể sai lệch do thiết bị, tín hiệu hoặc điều kiện thực tế; kết nối mạng có thể chậm, gián đoạn hoặc mất hoàn toàn; ứng dụng có thể bị lỗi, quá tải, ngừng hoạt động tạm thời trong một số hoàn cảnh bất khả kháng.",
      "Trong phạm vi pháp luật cho phép, đơn vị vận hành không chịu trách nhiệm đối với thiệt hại phát sinh từ:",
    ],
    warnings: [
      "Thông tin sai do người dùng cung cấp",
      "Sự cố thiết bị, mất mạng, mất điện hoặc thiên tai",
      "Sai lệch của dữ liệu vị trí",
      "Việc người dùng chậm liên hệ cơ quan chức năng trong tình huống nguy cấp",
      "Quyết định của người dùng dựa hoàn toàn vào thông tin tham khảo trên ứng dụng",
    ],
  },
  {
    number: "16",
    title: "TẠM NGỪNG HOẶC CHẤM DỨT QUYỀN SỬ DỤNG",
    content: [
      "Đơn vị vận hành có quyền tạm ngừng hoặc chấm dứt quyền sử dụng ứng dụng của người dùng nếu:",
    ],
    warnings: [
      "Người dùng vi phạm Điều khoản này",
      "Người dùng gây nguy cơ mất an toàn cho ứng dụng hoặc cho người khác",
      "Có yêu cầu từ cơ quan có thẩm quyền",
      "Việc tiếp tục cho sử dụng không còn phù hợp với yêu cầu pháp luật hoặc yêu cầu vận hành an toàn",
    ],
    footer:
      "Người dùng cũng có thể ngừng sử dụng ứng dụng bất cứ lúc nào bằng cách ngừng truy cập hoặc thực hiện việc xóa tài khoản theo hướng dẫn của ứng dụng.",
  },
  {
    number: "17",
    title: "THAY ĐỔI ĐIỀU KHOẢN",
    content: [
      "Đơn vị vận hành có quyền sửa đổi, bổ sung hoặc cập nhật Điều khoản này khi cần thiết.",
      "Phiên bản mới sẽ được thông báo trên ứng dụng hoặc bằng hình thức phù hợp khác. Nếu người dùng tiếp tục sử dụng ứng dụng sau thời điểm điều khoản mới có hiệu lực, người dùng được xem là đã đồng ý với nội dung đã được cập nhật.",
    ],
  },
  {
    number: "18",
    title: "ĐIỀU KHOẢN RIÊNG CHO MỘT SỐ TÍNH NĂNG",
    content: [
      "Đối với một số tính năng đặc biệt như trợ lý ảo, hồ sơ khẩn cấp, chuyển tài khoản, mã khẩn cấp, quyên góp hoặc các tính năng cộng đồng nếu được bổ sung trong tương lai, đơn vị vận hành có thể ban hành quy định riêng để áp dụng bổ sung.",
      "Trong trường hợp có sự khác nhau giữa Điều khoản này và quy định riêng của từng tính năng, quy định riêng của tính năng đó sẽ được ưu tiên áp dụng trong phạm vi liên quan.",
    ],
  },
  {
    number: "19",
    title: "LIÊN HỆ",
    isDark: true,
    content: [
      "Nếu có câu hỏi, phản ánh, khiếu nại hoặc yêu cầu liên quan đến việc sử dụng ứng dụng, người dùng có thể liên hệ với đơn vị vận hành qua các kênh chính thức được công bố trong ứng dụng.",
      "Phiên bản: 1.0 — Ngày có hiệu lực: 25/04/2026",
    ],
    list: [
      { label: "EMAIL HỖ TRỢ", desc: "support@resq.vn" },
      { label: "HOTLINE", desc: "1900 1234 (24/7)" },
      { label: "ĐỊA CHỈ", desc: "FPT University HCMC, TP. Hồ Chí Minh" },
    ],
  },
];

export const termsOfServiceAdditionalTerms: never[] = [];

// Privacy Policy Page Constants
export const privacyPolicySections = [
  {
    number: "01",
    title: "THU THẬP THÔNG TIN",
    intro:
      "Khi bạn sử dụng ứng dụng ResQ SOS Miền Trung, chúng tôi có thể thu thập:",
    items: [
      {
        label: "THÔNG TIN CÁ NHÂN",
        desc: "Họ tên, số điện thoại, địa chỉ email khi đăng ký tài khoản hoặc gửi yêu cầu SOS",
      },
      {
        label: "THÔNG TIN VỊ TRÍ",
        desc: "Vị trí GPS để xác định chính xác nơi cần cứu hộ và kết nối với đội cứu trợ gần nhất",
      },
      {
        label: "THÔNG TIN THIẾT BỊ",
        desc: "Loại thiết bị, hệ điều hành, mã nhận dạng để đảm bảo ứng dụng hoạt động tối ưu",
      },
      {
        label: "THÔNG TIN SỨC KHỎE",
        desc: "Trong trường hợp khẩn cấp, thông tin y tế để đội cứu trợ chuẩn bị phương án phù hợp",
      },
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
      {
        to: "ĐỘI NGŨ CỨU HỘ",
        reason: "Chia sẻ vị trí và thông tin liên lạc để thực hiện cứu trợ",
      },
      {
        to: "CƠ QUAN CHỨC NĂNG",
        reason: "Khi có yêu cầu từ cơ quan nhà nước theo quy định pháp luật",
      },
      {
        to: "ĐỐI TÁC Y TẾ",
        reason: "Trong trường hợp khẩn cấp cần hỗ trợ y tế",
      },
    ],
    warning:
      "Chúng tôi KHÔNG bán hoặc cho thuê thông tin cá nhân cho bên thứ ba vì mục đích thương mại.",
  },
  {
    number: "05",
    title: "QUYỀN CỦA NGƯỜI DÙNG",
    intro: "Bạn có các quyền sau đối với thông tin cá nhân:",
    rights: [
      {
        right: "QUYỀN TRUY CẬP",
        desc: "Yêu cầu xem thông tin cá nhân chúng tôi đang lưu trữ",
      },
      {
        right: "QUYỀN CHỈNH SỬA",
        desc: "Cập nhật hoặc sửa đổi thông tin không chính xác",
      },
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
      {
        type: "CẦN THIẾT",
        desc: "Để đảm bảo ứng dụng hoạt động bình thường",
        required: true,
      },
      {
        type: "PHÂN TÍCH",
        desc: "Để hiểu cách người dùng sử dụng dịch vụ",
        required: false,
      },
    ],
  },
  {
    number: "07",
    title: "LƯU TRỮ DỮ LIỆU",
    intro: "Thời gian lưu trữ thông tin:",
    timeline: [
      {
        period: "ĐANG SỬ DỤNG",
        desc: "Thông tin được lưu trữ trong thời gian bạn sử dụng dịch vụ",
      },
      {
        period: "SAU KHI XÓA",
        desc: "Xóa hoặc ẩn danh hóa trong vòng 30 ngày",
      },
      {
        period: "THEO PHÁP LUẬT",
        desc: "Một số thông tin có thể được giữ lâu hơn nếu được yêu cầu",
      },
    ],
  },
];

// ==================== ABILITY CHECK PAGE ====================
export const prerequisiteQuestions: PrerequisiteQuestion[] = [
  {
    id: 1,
    category: "Kỹ năng bơi",
    categoryEn: "Swimming Ability",
    question:
      "Bạn có thể tự bơi và giữ an toàn cho bản thân trong môi trường nước ngập không?",
    yesAnswer: "Có, tôi có thể tự bơi và không hoảng loạn khi ở dưới nước",
    noAnswer: "Không",
    warningMessage:
      'Nếu chọn "Không" → không thể tham gia cứu hộ lũ. Khả năng bơi là yêu cầu bắt buộc để đảm bảo an toàn cho chính bạn trong các tình huống ngập nước.',
    iconName: "PersonSimpleSwimIcon",
  },
  {
    id: 2,
    category: "Nhận thức an toàn cá nhân",
    categoryEn: "Personal Safety Awareness",
    question:
      "Trong tình huống nguy hiểm (nước xiết, điện giật, sạt lở), bạn có sẵn sàng rút lui và không cố cứu vượt khả năng của mình không?",
    yesAnswer: "Có, tôi ưu tiên an toàn cho bản thân và đội",
    noAnswer: "Không / Tôi sẽ cố cứu bằng mọi giá",
    warningMessage:
      "Chọn phương án này → không đủ điều kiện. Việc cố cứu vượt khả năng có thể gây nguy hiểm cho cả bạn và người được cứu, đồng thời tạo thêm gánh nặng cho đội cứu hộ.",
    iconName: "ShieldCheck",
  },
  {
    id: 3,
    category: "Giao tiếp & tuân thủ điều phối",
    categoryEn: "Communication & Coordination",
    question:
      "Khi tham gia cứu hộ, bạn có cam kết tuân thủ sự điều phối của hệ thống và người điều phối, không tự ý hành động ngoài nhiệm vụ được giao không?",
    yesAnswer: "Có, tôi cam kết tuân thủ điều phối",
    noAnswer: "Không",
    warningMessage:
      "Không tuân thủ → không thể tham gia hệ thống ResQ. Sự phối hợp nhịp nhàng giữa các thành viên là yếu tố quyết định thành công của mỗi nhiệm vụ cứu hộ.",
    iconName: "Handshake",
  },
  {
    id: 4,
    category: "Khả năng học nhanh & tuân thủ quy trình",
    categoryEn: "Trainability",
    question:
      "Bạn có sẵn sàng học và tuân thủ quy trình cứu hộ do ResQ hướng dẫn trước khi tham gia nhiệm vụ không?",
    yesAnswer: "Có, tôi sẵn sàng học và làm theo quy trình",
    noAnswer: "Không",
    warningMessage:
      "Không sẵn sàng học → rủi ro cao cho toàn đội. Quy trình cứu hộ được thiết kế để bảo vệ tất cả mọi người, việc không tuân thủ có thể dẫn đến hậu quả nghiêm trọng.",
    iconName: "GraduationCap",
  },
];

// ==================== DONATE PAGE ====================
export const donatePresetAmounts = [
  { value: 50_000, label: "50K", desc: "1 suất cơm" },
  { value: 200_000, label: "200K", desc: "1 túi cứu trợ" },
  { value: 500_000, label: "500K", desc: "1 gia đình / tuần" },
  { value: 1_000_000, label: "1 TRIỆU", desc: "Nhà tạm 1 tháng" },
  { value: 5_000_000, label: "5 TRIỆU", desc: "Trang bị cứu hộ" },
  { value: 0, label: "TỰ NHẬP", desc: "Số tiền khác" },
];

export const donateImpactStats = [
  { number: "2.5 TỲ", unit: "VNĐ", label: "Đã quyên góp năm 2024" },
  { number: "50,000", unit: "HỘ", label: "Gia đình được hỗ trợ" },
  { number: "1,200+", unit: "TNV", label: "Tình nguyện viên" },
  { number: "<48H", unit: "XỬ LÝ", label: "Thời gian triển khai" },
];

export const donateStories = [
  {
    tag: "LŨ LỤT 10/2024",
    name: "Chị Nguyễn Thị Hoa",
    location: "Hội An, Quảng Nam",
    quote:
      "Nhờ đội cứu hộ ResQ, gia đình tôi được sơ tán kịp thời trước khi lũ tràn vào nhà. Không có các bạn, chúng tôi không biết sẽ ra sao.",
  },
  {
    tag: "CÔ LẬP 11/2024",
    name: "Anh Trần Văn Minh",
    location: "Huế, Thừa Thiên Huế",
    quote:
      "Những thùng hàng cứu trợ đến đúng lúc nhất — khi cả xóm bị cô lập 3 ngày không có gì ăn. Cảm ơn mọi tấm lòng.",
  },
  {
    tag: "SAU LŨ 12/2024",
    name: "Em Lê Thị Mai",
    location: "Đồng Hới, Quảng Bình",
    quote:
      "Chúng tôi mất tất cả nhưng được mọi người khắp nơi gửi yêu thương về. Điều đó cho chúng tôi sức mạnh để tiếp tục.",
  },
];

export const donateNotePresets = [
  "GỬI CHÚT TẤM LÒNG ĐẾN ĐỒNG BÀO MIỀN TRUNG",
  "CHUNG TAY VƯỢT QUA THIÊN TAI, VUI BUỒN CÓ NHAU",
  "HY VỌNG ĐỒNG BÀO SỚM ỔN ĐỊNH VÀ AN LÀNH",
  "MỘT PHẦN NHỎ GIÚP BÀ CON SỚM VƯỢT KHÓ",
  "ĐỒNG LÒNG HƯỚNG VỀ MIỀN TRUNG THÂN YÊU",
  "THƯƠNG GỬI MIỀN TRUNG VƯỢT QUA BÃO LŨ",
  "SAN SẺ YÊU THƯƠNG, HƯỚNG VỀ ĐỒNG BÀO",
  "CÙNG ĐỒNG BÀO VƯỢT QUA GIAN KHÓ",
  "MỘT MIỀN TRUNG KIÊN CƯỜNG, KHÔNG BAO GIỜ BỎ CUỘC",
  "CỦA ÍT LÒNG VÒNG, MIỀN TRUNG ƠI FIGHTING",
  "TIẾT KIỆM TRÀ SỮA 1 TUẦN ĐỂ ỦNG HỘ MIỀN TRUNG",
  "LƯƠNG VỀ CHƯA KỊP NÓNG TAY ĐÃ GỬI MIỀN TRUNG",
];
