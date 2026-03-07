export type { ApiErrorResponse } from "@/types/api";

export interface DonationRequest {
  fundCampaignId: number;
  donorName: string;
  donorEmail: string;
  amount: number;
  note: string;
  isPrivate: boolean;
}

export interface DonationResponse {
  donationId: number;
  checkoutUrl: string;
  qrCode: string;
}

export interface PublicDonation {
  id: number;
  fundCampaignId: number;
  fundCampaignName: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  note: string;
  createdAt: string;
  isPrivate: boolean;
}

export interface PublicDonationsParams {
  PageNumber?: number;
  PageSize?: number;
  FundCampaignId?: number;
}

export interface PublicDonationsResponse {
  items: PublicDonation[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
}
