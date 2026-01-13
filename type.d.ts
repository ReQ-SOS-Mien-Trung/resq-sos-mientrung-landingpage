export type ContributionCard = {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
};

export type ContributionCardProps = {
  contribution: ContributionCardProps;
};
