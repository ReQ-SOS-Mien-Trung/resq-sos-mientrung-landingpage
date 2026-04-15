export interface CampaignMetadata {
  key: number;
  value: string;
}

export interface PublicCampaignSpendingItem {
  itemName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PublicCampaignDisbursement {
  id: number;
  depotId: number;
  depotName: string;
  amount: number;
  purpose: string;
  type: string;
  createdAt: string;
  depotFundBalance: number;
  items: PublicCampaignSpendingItem[];
}

export interface PublicCampaignSpendingResponse {
  campaignId: number;
  campaignName: string;
  totalRaised: number;
  totalDisbursed: number;
  remainingBalance: number;
  disbursements: PublicCampaignDisbursement[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface PublicCampaignSpendingParams {
  pageNumber?: number;
  pageSize?: number;
}
