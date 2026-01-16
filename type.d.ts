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
