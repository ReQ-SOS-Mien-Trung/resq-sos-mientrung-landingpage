export type ContributionCard = {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
};

export type ContributionCardProps = {
  contribution: ContributionCard;
};

export interface MenuItem {
  id: string;
  label: string;
  subItems?: {
    title: string;
    description: string;
    link?: string;
  }[];
}

export type NewsArticle = {
  id: number;
  image: string;
  date: string;
  title: string;
  link: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export type DriverType = {
  id: string;
  label: string;
};

export type BenefitSection = {
  title: string;
  benefits: string[];
  links?: {
    text: string;
    href: string;
  }[];
};

export type StoreItem = {
  key: string;
  name: string;
  status: string;
  icon: React.ReactNode;
};

export type Service = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  region: string;
};

export type Region = {
  id: string;
  name: string;
  image: string;
};

export type ServiceCategory = {
  title: string;
  items: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
  }[];
};

export type CTABannerProps = {
  onSignUpClick: () => void;
};

export type StickPersonProps = {
  src: string;
  alt: string;
  /** Tailwind size classes, e.g. "w-16 h-16 md:w-20 md:h-20" */
  sizeClassName: string;
  /** Optional extra classes for the face container (borders/rings/bg) */
  faceClassName?: string;
  /** Show/hide stick body under the face */
  showBody?: boolean;
  /** Body color classes for stick parts */
  bodyColorClassName?: string;
  /** Scale the body relative to the face */
  bodyScaleClassName?: string;
};

export type RescuerFormData = {
  name: string;
  phone: string;
  address: string;
  latitude?: string;
  longitude?: string;
  vehicleType: "motorboat" | "small_boat" | "high_clearance_vehicle";
  hasMedicalStaff: boolean;
  hasSwimmingRescue: boolean;
  hasLifeJackets: boolean;
  capacity: string;
};

export type PrerequisiteQuestion = {
  id: number;
  category: string;
  categoryEn: string;
  question: string;
  yesAnswer: string;
  noAnswer: string;
  warningMessage: string;
  iconName: "PersonSimpleSwimIcon" | "ShieldCheck" | "Handshake" | "GraduationCap";
};

export type RescueSkill = {
  id: string;
  label: string;
};

export type RescueSkillSubgroup = {
  subtitle: string;
  singleSelect?: boolean; // true = chỉ được chọn 1 trong nhóm
  skills: RescueSkill[];
};

export type RescueSkillCategory = {
  id: string;
  title: string;
  titleEn: string;
  subgroups: RescueSkillSubgroup[];
};