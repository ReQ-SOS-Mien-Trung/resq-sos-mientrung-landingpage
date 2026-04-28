import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import type {
  PublicDonation,
  PublicDonationHubPayload,
} from "@/services/donation/type";

const HUB_PATH = "/hubs/public-donations";
const RECEIVE_PUBLIC_DONATION = "ReceivePublicDonation";
const SUBSCRIBE_PUBLIC_DONATIONS = "SubscribePublicDonations";
const SUBSCRIBE_CAMPAIGN_DONATIONS = "SubscribeCampaignDonations";

type HubStatus = "connected" | "connecting" | "disconnected";

type SubscriptionOptions = {
  campaignId?: number | null;
  onDonation: (donation: PublicDonation) => void;
  onStatusChange?: (status: HubStatus) => void;
};

const getPublicDonationHubUrl = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (!apiBaseUrl) {
    throw new Error("Missing VITE_API_BASE_URL in environment.");
  }

  return new URL(HUB_PATH, apiBaseUrl.replace(/\/+$/, "")).toString();
};

const normalizePublicDonation = (
  payload: PublicDonationHubPayload,
): PublicDonation => ({
  id: payload.donationId,
  receiptCode: payload.receiptCode,
  fundCampaignId: payload.fundCampaignId,
  fundCampaignName: payload.fundCampaignName,
  donorName: payload.donorName,
  amount: payload.amount,
  note: payload.note,
  createdAt: payload.createdAt,
  paidAt: payload.paidAt,
  isPrivate: payload.isPrivate,
  displayText: payload.displayText,
  changedAt: payload.changedAt,
});

export const subscribePublicDonationHub = ({
  campaignId,
  onDonation,
  onStatusChange,
}: SubscriptionOptions) => {
  let stopped = false;

  const connection = new HubConnectionBuilder()
    .withUrl(getPublicDonationHubUrl())
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Warning)
    .build();

  const subscribe = async () => {
    if (connection.state !== HubConnectionState.Connected) return;

    if (typeof campaignId === "number" && campaignId > 0) {
      await connection.invoke(SUBSCRIBE_CAMPAIGN_DONATIONS, campaignId);
      return;
    }

    await connection.invoke(SUBSCRIBE_PUBLIC_DONATIONS);
  };

  connection.on(RECEIVE_PUBLIC_DONATION, (payload: PublicDonationHubPayload) => {
    onDonation(normalizePublicDonation(payload));
  });

  connection.onreconnecting(() => {
    onStatusChange?.("connecting");
  });

  connection.onreconnected(() => {
    onStatusChange?.("connected");
    void subscribe().catch((error) => {
      console.error("Failed to resubscribe public donation hub:", error);
    });
  });

  connection.onclose(() => {
    if (!stopped) {
      onStatusChange?.("disconnected");
    }
  });

  onStatusChange?.("connecting");
  void connection
    .start()
    .then(async () => {
      if (stopped) {
        await connection.stop();
        return;
      }

      onStatusChange?.("connected");
      await subscribe();
    })
    .catch((error) => {
      if (!stopped) {
        onStatusChange?.("disconnected");
        console.error("Failed to connect public donation hub:", error);
      }
    });

  return () => {
    stopped = true;
    void connection.stop();
  };
};
