import { create } from "zustand";

export interface CertEntry {
  id: string;
  certType: string;
  certTypeId: number;
  certTypeLabel: string;
  /** Cloudinary URL — rỗng cho đến khi upload thành công */
  fileUrl: string;
  fileName: string;
  /** Loại category trang kỹ năng (RESCUE / MEDICAL / ...) */
  categoryCode: string;
  /** File object gốc — dùng để upload sau */
  file?: File;
  /** Object URL tạm thời dùng để preview ảnh trước khi upload */
  localPreviewUrl?: string;
  /** Đang upload lên cloud */
  isUploading: boolean;
}

interface OnboardingStore {
  certEntries: CertEntry[];
  addCertEntry: (entry: CertEntry) => void;
  removeCertEntry: (id: string) => void;
  updateCertEntry: (id: string, updates: Partial<CertEntry>) => void;
  clearCertEntries: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  certEntries: [],

  addCertEntry: (entry) =>
    set((state) => ({ certEntries: [...state.certEntries, entry] })),

  removeCertEntry: (id) =>
    set((state) => {
      const entry = state.certEntries.find((e) => e.id === id);
      // Giải phóng object URL để tránh memory leak
      if (entry?.localPreviewUrl) URL.revokeObjectURL(entry.localPreviewUrl);
      return { certEntries: state.certEntries.filter((e) => e.id !== id) };
    }),

  updateCertEntry: (id, updates) =>
    set((state) => ({
      certEntries: state.certEntries.map((e) =>
        e.id === id ? { ...e, ...updates } : e,
      ),
    })),

  clearCertEntries: () => set({ certEntries: [] }),
}));
