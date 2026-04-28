export type { ApiErrorResponse } from "@/types/api";

export interface DonationRequest {
  fundCampaignId: number;
  donorName: string;
  donorEmail: string;
  amount: number;
  note: string;
  isPrivate: boolean;
  paymentMethodCode: string;
}

export interface DonationResponse {
  donationId: number;
  checkoutUrl: string;
  qrCode: string;
  paymentMethod: string;
  orderId: string; // apptransid for ZaloPay
}

export interface PublicDonation {
  id: number;
  receiptCode?: string;
  fundCampaignId: number;
  fundCampaignName: string;
  donorName: string;
  donorEmail?: string;
  amount: number;
  note?: string | null;
  createdAt: string;
  paidAt?: string | null;
  isPrivate: boolean;
  displayText?: string | null;
  changedAt?: string | null;
}

export interface PublicDonationHubPayload {
  donationId: number;
  receiptCode?: string;
  fundCampaignId: number;
  fundCampaignName: string;
  donorName: string;
  amount: number;
  note?: string | null;
  createdAt: string;
  paidAt?: string | null;
  isPrivate: boolean;
  displayText?: string | null;
  changedAt?: string | null;
}

export interface PublicDonationsParams {
  PageNumber?: number;
  PageSize?: number;
  FundCampaignId?: number;
  Search?: string;
}

export interface PublicDonationsResponse {
  items: PublicDonation[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
}

export interface PaymentMethod {
  key: string;
  value: string;
}
