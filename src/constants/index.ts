type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

type ContributionCard = {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
};

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
