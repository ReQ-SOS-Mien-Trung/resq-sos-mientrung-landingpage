export interface DonationRequest {
  fundCampaignId: number;
  donorName: string;
  donorEmail: string;
  amount: number;
  note: string;
}

export interface DonationResponse {
  donationId: number;
  checkoutUrl: string;
  qrCode: string;
}

export interface DonationError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  additionalProp1?: string;
  additionalProp2?: string;
  additionalProp3?: string;
}
