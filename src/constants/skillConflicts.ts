import { rescueSkillCategories } from "@/constants";

// ==================== CONFLICT RULES ====================
// When a "dominant" skill is selected, its "implies" skills are AUTO-CHECKED (disabled+checked)
// Group 4 (environmental conditions) intentionally has NO conflicts — each skill is independent.
export const SKILL_CONFLICT_RULES: { dominant: number; implies: number[] }[] = [
  // ── Nhóm kỹ năng nước ────────────────────────────────────────────────────────
  { dominant: 3, implies: [1, 2] }, // Cứu hộ dưới nước → Bơi thành thạo, Bơi cơ bản
  { dominant: 2, implies: [1] }, // Bơi thành thạo → Bơi cơ bản
  { dominant: 6, implies: [1] }, // Lặn cơ bản → Bơi cơ bản
  { dominant: 5, implies: [4] }, // Di chuyển dòng xiết → Di chuyển nước ngập sâu

  // ── Vai trò y tế chuyên môn (Tier 1–3) ────────────────────────────────────
  // Tier 1 — Bác sĩ: auto-check toàn bộ 15 kỹ năng y tế
  {
    dominant: 34,
    implies: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  },
  // Tier 1 — Cấp cứu tiền viện: auto-check toàn bộ 15 kỹ năng y tế
  {
    dominant: 35,
    implies: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  },
  // Tier 2 — Y tá: auto-check 9 kỹ năng an toàn (Sơ cứu ×6, CPR, Theo dõi sinh tồn, Vận chuyển)
  { dominant: 33, implies: [17, 18, 19, 20, 21, 22, 23, 27, 31] },
  // Tier 3 — Nhân viên y tế: auto-check nhóm sơ cứu cơ bản (6 kỹ năng)
  { dominant: 32, implies: [17, 18, 19, 20, 21, 22] },

  // ── Nhóm phương tiện & vận chuyển ──────────────────────────────────
  // Lái xe máy ngập nước → Lái xe máy cơ bản
  { dominant: 37, implies: [36] },
  // Lái ô tô địa hình → Lái ô tô
  { dominant: 39, implies: [38] },
  // Vận chuyển hàng nặng → Vận chuyển hàng cứu trợ
  { dominant: 47, implies: [46] },
];

// IDs of all "vehicle" skills (used to gate special-conditions skills 43 & 44)
export const VEHICLE_SKILL_IDS = [36, 37, 38, 39, 40, 41, 42];

// Flat list of all skills for label lookup
export const ALL_SKILLS_FLAT = rescueSkillCategories.flatMap((cat) =>
  cat.subgroups.flatMap((sg) => sg.skills),
);

/** Label của skill theo id */
export const getSkillLabel = (id: number): string =>
  ALL_SKILLS_FLAT.find((s) => s.id === id)?.label ?? "";

/** Skills mà skillId tự động bao gồm khi được chọn */
export const getImpliedBy = (skillId: number): number[] =>
  SKILL_CONFLICT_RULES.find((r) => r.dominant === skillId)?.implies ?? [];

/** Dominant skills đang bao gồm skillId này */
export const getDominantsFor = (skillId: number): number[] =>
  SKILL_CONFLICT_RULES.filter((r) => r.implies.includes(skillId)).map(
    (r) => r.dominant,
  );

/**
 * Tính tập implied từ danh sách manual đã chọn.
 * Kết quả không chứa các id đã có trong manual.
 */
export const computeImplied = (manual: number[]): number[] => {
  const implied = new Set<number>();
  for (const id of manual) {
    getImpliedBy(id).forEach((s) => implied.add(s));
  }
  return [...implied].filter((id) => !manual.includes(id));
};
