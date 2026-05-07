export interface CampaignMetadata {
  key: string;
  value: string;
}

export interface ActiveCampaign {
  id: number;
  code: string;
  name: string;
  region: string;
  campaignStartDate: string;
  campaignEndDate: string;
  targetAmount: number;
  currentBalance: number;
  totalAmount: number;
}

export interface PublicCampaignSpendingItem {
  itemName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedDate: string;
  expiredDate: string;
  itemType: string;
}

export interface PublicCampaignAllocation {
  id: number;
  amount: number;
  purpose: string;
  type: string;
  fundingRequestId: number | null;
  allocatedAt: string;
}

export interface PublicCampaignImport {
  vatInvoiceId: number;
  depotFundId: number;
  invoiceSerial: string;
  invoiceNumber: string;
  supplierName: string;
  invoiceDate: string;
  invoiceTotalAmount: number;
  importedAt: string;
  totalSpent: number;
  items: PublicCampaignSpendingItem[];
}

export interface PublicCampaignDepotSpending {
  depotId: number;
  depotName: string;
  totalAllocated: number;
  allocations: PublicCampaignAllocation[];
  totalSpent: number;
  imports: PublicCampaignImport[];
}

export interface PublicCampaignSpendingResponse {
  campaignId: number;
  campaignName: string;
  totalRaised: number;
  totalDisbursed: number;
  remainingBalance: number;
  depots: PublicCampaignDepotSpending[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface PublicCampaignSpendingParams {
  pageNumber?: number;
  pageSize?: number;
}
