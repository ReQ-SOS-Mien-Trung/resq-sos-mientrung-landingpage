import { useEffect, useId, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import type { RescuerScore } from "@/services/user/type";
import { Icon } from "@iconify/react";

const MAX_SCORE = 10;
const RING_COUNT = 5;
const VIEWBOX_SIZE = 500;
const CENTER = VIEWBOX_SIZE / 2;
const RADIUS = 215;
const TOOLTIP_WIDTH = 220;
const TOOLTIP_HEIGHT = 128;
const TOOLTIP_OFFSET = 6;
const TOOLTIP_CONTAINER_MARGIN = 8;

type MetricKey =
  | "responseTimeScore"
  | "rescueEffectivenessScore"
  | "decisionHandlingScore"
  | "safetyMedicalSkillScore"
  | "teamworkCommunicationScore";

const METRIC_CONFIG: Array<{
  key: MetricKey;
  label: string;
  hint: string;
  rubric: string;
  glyph: string;
}> = [
    {
      key: "responseTimeScore",
      label: "Thời gian phản ứng",
      hint: "Từ lúc nhận SOS đến khi bắt đầu di chuyển hoặc có mặt tại hiện trường.",
      rubric: "Càng nhanh càng tốt.",
      glyph: "mdi:clock-fast",
    },
    {
      key: "rescueEffectivenessScore",
      label: "Hiệu quả cứu hộ",
      hint: "Khả năng hoàn thành nhiệm vụ và đáp ứng đúng nhu cầu cứu trợ.",
      rubric: "Đủ người, đúng nhu cầu.",
      glyph: "fluent-emoji-high-contrast:safety-vest",
    },
    {
      key: "decisionHandlingScore",
      label: "Xử lý tình huống",
      hint: "Mức độ ưu tiên đúng ca nguy cấp và xử lý biến cố bất ngờ.",
      rubric: "Ưu tiên chuẩn, quyết định dứt khoát.",
      glyph: "ri:lightbulb-flash-line",
    },
    {
      key: "safetyMedicalSkillScore",
      label: "An toàn & chuyên môn",
      hint: "Khả năng sơ cứu đúng quy trình và không tạo thêm rủi ro.",
      rubric: "Ít sai sót, đúng chuyên môn.",
      glyph: "mdi:shield-plus-outline",
    },
    {
      key: "teamworkCommunicationScore",
      label: "Hợp tác & giao tiếp",
      hint: "Phối hợp với rescuer khác, trấn an nạn nhân và báo cáo rõ ràng.",
      rubric: "Nhóm càng mượt, điểm càng cao.",
      glyph: "mdi:account-group-outline",
    },
  ];

const clampScore = (value: number | null | undefined) => {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return Math.max(0, Math.min(MAX_SCORE, value));
};

const formatScore = (value: number | null) => {
  if (value === null) return "—";
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
};

const getPoint = (index: number, ratio: number, total: number) => {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / total;
  return {
    x: CENTER + Math.cos(angle) * RADIUS * ratio,
    y: CENTER + Math.sin(angle) * RADIUS * ratio,
  };
};

const buildPolygonPath = (ratios: number[], total: number) => {
  const path = ratios
    .map((ratio, index) => {
      const point = getPoint(index, ratio, total);
      return `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    })
    .join(" ");
  return `${path} Z`;
};

/** Fan-shaped sector from center covering 1/total of the circle, out to outerRadius */
const buildSectorPath = (index: number, total: number, outerRadius: number): string => {
  const ARC_STEPS = 12;
  const angleStep = (2 * Math.PI) / total;
  const startAngle = -Math.PI / 2 + (index - 0.5) * angleStep;
  const endAngle = -Math.PI / 2 + (index + 0.5) * angleStep;
  const pts = [`M ${CENTER} ${CENTER}`];
  for (let s = 0; s <= ARC_STEPS; s++) {
    const a = startAngle + (s / ARC_STEPS) * (endAngle - startAngle);
    pts.push(`L ${(CENTER + Math.cos(a) * outerRadius).toFixed(2)} ${(CENTER + Math.sin(a) * outerRadius).toFixed(2)}`);
  }
  pts.push("Z");
  return pts.join(" ");
};

const AXIS_LABEL_POSITIONS: Array<{ x: number; y: number; anchor: string; dy: string }> = [
  { x: CENTER, y: CENTER - RADIUS - 20, anchor: "middle", dy: "-0.4em" },
  {
    x: CENTER + (RADIUS + 22) * Math.cos(-Math.PI / 2 + (2 * Math.PI) / 5),
    y: CENTER + (RADIUS + 22) * Math.sin(-Math.PI / 2 + (2 * Math.PI) / 5),
    anchor: "start",
    dy: "0.35em",
  },
  {
    x: CENTER + (RADIUS + 22) * Math.cos(-Math.PI / 2 + (4 * Math.PI) / 5),
    y: CENTER + (RADIUS + 22) * Math.sin(-Math.PI / 2 + (4 * Math.PI) / 5),
    anchor: "start",
    dy: "0.35em",
  },
  {
    x: CENTER + (RADIUS + 22) * Math.cos(-Math.PI / 2 + (6 * Math.PI) / 5),
    y: CENTER + (RADIUS + 22) * Math.sin(-Math.PI / 2 + (6 * Math.PI) / 5),
    anchor: "end",
    dy: "0.35em",
  },
  {
    x: CENTER + (RADIUS + 22) * Math.cos(-Math.PI / 2 + (8 * Math.PI) / 5),
    y: CENTER + (RADIUS + 22) * Math.sin(-Math.PI / 2 + (8 * Math.PI) / 5),
    anchor: "end",
    dy: "0.35em",
  },
];

interface RescuerScoreRadarProps {
  rescuerScore?: RescuerScore | null;
}

const RescuerScoreRadar = ({ rescuerScore }: RescuerScoreRadarProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const gridGroupRef = useRef<SVGGElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);
  const echoPathRef = useRef<SVGPathElement>(null);
  const gradientId = useId().replace(/:/g, "");

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

  const updateTooltipPosition = (x: number, y: number, index: number) => {
    setHoveredIndex(index);

    const shellRect = shellRef.current?.getBoundingClientRect();
    if (!shellRect) return;

    const localX = x - shellRect.left;
    const localY = y - shellRect.top;

    const idealLeft = localX + TOOLTIP_OFFSET;
    const idealTop = localY + TOOLTIP_OFFSET;

    const clampedLeft = Math.max(
      TOOLTIP_CONTAINER_MARGIN,
      Math.min(idealLeft, shellRect.width - TOOLTIP_WIDTH - TOOLTIP_CONTAINER_MARGIN)
    );
    const clampedTop = Math.max(
      TOOLTIP_CONTAINER_MARGIN,
      Math.min(idealTop, shellRect.height - TOOLTIP_HEIGHT - TOOLTIP_CONTAINER_MARGIN)
    );

    setTooltipPosition({ left: clampedLeft, top: clampedTop });
  };

  const metrics = useMemo(() => {
    return METRIC_CONFIG.map((metric, index) => {
      const value = clampScore(rescuerScore?.[metric.key]);
      const ratio = (value ?? 0) / MAX_SCORE;
      return {
        ...metric,
        index,
        value,
        ratio,
        point: getPoint(index, ratio, METRIC_CONFIG.length),
      };
    });
  }, [rescuerScore]);

  const hasData = metrics.some((m) => m.value !== null);

  const overallScore = useMemo(() => {
    const directScore = clampScore(rescuerScore?.overallAverageScore);
    if (directScore !== null) return directScore;
    const validValues = metrics.map((m) => m.value).filter((v): v is number => v !== null);
    if (!validValues.length) return null;
    return clampScore(validValues.reduce((s, v) => s + v, 0) / validValues.length);
  }, [metrics, rescuerScore?.overallAverageScore]);

  const dataPath = useMemo(
    () => buildPolygonPath(metrics.map((m) => m.ratio), METRIC_CONFIG.length),
    [metrics]
  );

  const collapsedPath = useMemo(
    () => buildPolygonPath(metrics.map(() => 0), METRIC_CONFIG.length),
    [metrics]
  );

  const ringPaths = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) =>
        buildPolygonPath(
          Array.from({ length: METRIC_CONFIG.length }, () => (i + 1) / RING_COUNT),
          METRIC_CONFIG.length
        )
      ),
    []
  );

  const axisPoints = useMemo(
    () => Array.from({ length: METRIC_CONFIG.length }, (_, i) => getPoint(i, 1, METRIC_CONFIG.length)),
    []
  );

  const evaluationCount = rescuerScore?.evaluationCount ?? 0;
  const updatedLabel = rescuerScore?.updatedAt
    ? new Date(rescuerScore.updatedAt).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ringElements = gridGroupRef.current?.querySelectorAll(".radar-ring") ?? [];
      const axisElements = gridGroupRef.current?.querySelectorAll(".radar-axis") ?? [];

      gsap.set(shellRef.current, { opacity: 0, y: 24 });
      gsap.set(ringElements, { opacity: 0, scale: 0.6, transformOrigin: `${CENTER}px ${CENTER}px` });
      gsap.set(axisElements, { opacity: 0, scaleY: 0, transformOrigin: `${CENTER}px ${CENTER}px` });

      if (fillPathRef.current)
        gsap.set(fillPathRef.current, { attr: { d: collapsedPath }, opacity: hasData ? 0.72 : 0.1 });
      if (echoPathRef.current)
        gsap.set(echoPathRef.current, { attr: { d: collapsedPath }, opacity: hasData ? 0.28 : 0.06 });
      if (strokePathRef.current)
        gsap.set(strokePathRef.current, {
          attr: { d: collapsedPath },
          strokeDasharray: 1400,
          strokeDashoffset: 1400,
          opacity: hasData ? 1 : 0.3,
        });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(shellRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .to(ringElements, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.055 }, "-=0.5")
        .to(axisElements, { opacity: 1, scaleY: 1, duration: 0.5, stagger: 0.04 }, "-=0.5");

      if (fillPathRef.current)
        gsap.to(fillPathRef.current, { attr: { d: dataPath }, duration: 1.5, delay: 0.5, ease: "expo.out" });

      if (echoPathRef.current) {
        gsap.to(echoPathRef.current, { attr: { d: dataPath }, duration: 1.6, delay: 0.45, ease: "expo.out" });
        if (hasData)
          gsap.to(echoPathRef.current, {
            opacity: 0.1,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
      }

      if (strokePathRef.current)
        gsap.to(strokePathRef.current, {
          attr: { d: dataPath },
          strokeDashoffset: 0,
          duration: 1.8,
          delay: 0.48,
          ease: "expo.out",
        });
    }, sectionRef);

    return () => ctx.revert();
  }, [collapsedPath, dataPath, hasData]);

  return (
    <section ref={sectionRef} className="border-b border-black/10">
      <div className="max-w-350 mx-auto px-6 lg:px-10 py-10">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/10 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5722] mb-1">Mục II</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em]">Chỉ số cứu hộ</h2>
          </div>
          {updatedLabel && (
            <p className="text-xs text-black/35 font-mono tracking-widest hidden sm:block">
              Cập nhật {updatedLabel}
            </p>
          )}
        </div>

        {/* Main card */}
        {!hasData ? (
          <div className="flex flex-col items-center justify-center gap-2 px-8 py-16 text-center">
            <Icon icon="mdi:chart-arc" width={48} height={48} className="text-black/20" />
            <p className="text-lg font-regular text-black/50">Chưa đủ tiêu chí để đánh giá năng lực cứu hộ viên</p>
          </div>
        ) : (
        <div
          ref={shellRef}
          className="relative text-[#2B1A10]"
        >
          {/* Score badge — top-right of card */}
          <div className="pointer-events-none absolute top-6 right-6 z-20 text-right rotate-0 transform-none">
            <div
              className="rounded-[24px] border border-[#E8D6C2] bg-[rgba(255,251,245,0.88)] px-5 py-3.5 backdrop-blur-xl rotate-0 transform-none"
              style={{ boxShadow: "0 12px 28px rgba(181,132,92,0.14), inset 0 1px 0 rgba(255,255,255,0.95)" }}
            >
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.38em] text-[#8B6B54]">Điểm TB</p>
              <p className="text-6xl font-black leading-none tracking-tight text-[#24140B]">
                {formatScore(overallScore)}
              </p>
              <p className="mt-1.5 text-xs uppercase tracking-[0.22em] text-[#D86E34]">
                {hasData ? `${evaluationCount} đánh giá` : "Chờ dữ liệu"}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 px-6 pt-6 pb-5 lg:px-12 lg:pt-12 lg:pb-8">

            {/* ── Radar ── */}
            <div className="w-full max-w-125 shrink-0 relative">
              <svg viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} className="w-full overflow-visible">
                <defs>
                  <linearGradient id={`${gradientId}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D89438" />
                    <stop offset="52%" stopColor="#F7EBDD" />
                    <stop offset="100%" stopColor="#E97643" />
                  </linearGradient>
                  <radialGradient id={`${gradientId}-fill`} cx="50%" cy="44%" r="60%">
                    <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0.88" />
                    <stop offset="55%" stopColor="#F2BA70" stopOpacity="0.26" />
                    <stop offset="100%" stopColor="#EF8458" stopOpacity="0.1" />
                  </radialGradient>
                  <filter id={`${gradientId}-glow`} x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="9" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id={`${gradientId}-nodeglow`} x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Grid rings */}
                <g ref={gridGroupRef}>
                  {ringPaths.map((ringPath, i) => (
                    <path
                      key={ringPath}
                      d={ringPath}
                      className="radar-ring"
                      fill="none"
                      stroke={i === RING_COUNT - 1 ? "rgba(89,61,39,0.28)" : "rgba(89,61,39,0.11)"}
                      strokeWidth={i === RING_COUNT - 1 ? 1.5 : 1}
                      strokeDasharray={i % 2 === 0 ? undefined : "3 7"}
                    />
                  ))}
                  {axisPoints.map((pt, i) => (
                    <line
                      key={`ax-${i}`}
                      className="radar-axis"
                      x1={CENTER}
                      y1={CENTER}
                      x2={pt.x}
                      y2={pt.y}
                      stroke="rgba(107,77,54,0.16)"
                      strokeWidth={1}
                    />
                  ))}
                </g>

                {/* Data shape */}
                <path
                  ref={echoPathRef}
                  d={collapsedPath}
                  fill="none"
                  stroke={`url(#${gradientId}-stroke)`}
                  strokeWidth={20}
                  strokeOpacity={0.14}
                  filter={`url(#${gradientId}-glow)`}
                />
                <path ref={fillPathRef} d={collapsedPath} fill={`url(#${gradientId}-fill)`} />
                <path
                  ref={strokePathRef}
                  d={collapsedPath}
                  fill="none"
                  stroke={`url(#${gradientId}-stroke)`}
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  filter={`url(#${gradientId}-glow)`}
                />

                {/* Planetary glyphs at axis tips */}
                {metrics.map((m, i) => {
                  const pos = AXIS_LABEL_POSITIONS[i];

                  let foreignX = pos.x;
                  let foreignY = pos.y;

                  if (pos.anchor === "middle") foreignX -= 12;
                  else if (pos.anchor === "end") foreignX -= 24;

                  if (pos.dy === "-0.4em") foreignY -= 16;
                  else if (pos.dy === "0.35em") foreignY -= 4;

                  return (
                    <foreignObject
                      key={`glyph-${m.key}`}
                      x={foreignX}
                      y={foreignY}
                      width={24}
                      height={24}
                      className="overflow-visible"
                    >
                      <div className="flex items-center justify-center w-full h-full text-[#9F8067]">
                        <Icon icon={m.glyph} width={24} height={24} color="currentColor" />
                      </div>
                    </foreignObject>
                  );
                })}

                {/* Static data nodes */}
                {metrics.map((m) => (
                  <g key={m.key} style={{ pointerEvents: "none" }}>
                    <circle
                      cx={m.point.x}
                      cy={m.point.y}
                      r={hoveredIndex === m.index ? 9 : 6.5}
                      fill="none"
                      stroke={hoveredIndex === m.index ? "#D89438" : "rgba(216,148,56,0.35)"}
                      strokeWidth={1.2}
                      style={{ transition: "r 0.18s ease, stroke 0.18s ease" }}
                    />
                    <circle
                      cx={m.point.x}
                      cy={m.point.y}
                      r={hoveredIndex === m.index ? 4.5 : 3}
                      fill={m.value === null ? "rgba(110,84,64,0.24)" : "#FFF8EF"}
                      stroke={hoveredIndex === m.index ? "#E97643" : "rgba(233,118,67,0.62)"}
                      strokeWidth={hoveredIndex === m.index ? 2 : 1.2}
                      filter={hoveredIndex === m.index ? `url(#${gradientId}-nodeglow)` : undefined}
                      style={{ transition: "r 0.15s ease, stroke-width 0.15s ease" }}
                    />
                  </g>
                ))}

                {/* Invisible sector hit areas — hover anywhere in the polygon zone */}
                {metrics.map((m) => (
                  <path
                    key={`sector-${m.key}`}
                    d={buildSectorPath(m.index, METRIC_CONFIG.length, RADIUS + 14)}
                    fill="transparent"
                    stroke="none"
                    style={{ cursor: "default" }}
                    onMouseEnter={(event) => updateTooltipPosition(event.clientX, event.clientY, m.index)}
                    onMouseMove={(event) => updateTooltipPosition(event.clientX, event.clientY, m.index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </svg>

            </div>

            {/* ── Right panel ── */}
            <div className="w-full flex flex-col gap-2">

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#D8C6B7]" />
                <span className="text-[#C7A98A] text-base font-serif select-none">✦</span>
                <div className="h-px flex-1 bg-[#D8C6B7]" />
              </div>

              {/* Score rows */}
              <div className="grid gap-4">
                {metrics.map((m) => (
                  <div
                    key={m.key}
                    className="flex items-center gap-3"
                    onMouseEnter={(event) => updateTooltipPosition(event.clientX, event.clientY, m.index)}
                    onMouseMove={(event) => updateTooltipPosition(event.clientX, event.clientY, m.index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ cursor: "default" }}
                  >
                    <span
                      className="w-7 flex justify-center shrink-0 transition-colors duration-200"
                      style={{ color: hoveredIndex === m.index ? "#D86E34" : "#AA8263" }}
                    >
                      <Icon icon={m.glyph} width={24} height={24} />
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-[#E9DCCF] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.max(m.ratio * 100, m.value === null ? 8 : 0)}%`,
                          background:
                            hoveredIndex === m.index
                              ? "linear-gradient(90deg,#E1A13E,#E97643)"
                              : "linear-gradient(90deg,#E4B25C,#D98658)",
                        }}
                      />
                    </div>
                    <span
                      className="text-base font-black tabular-nums w-10 text-right shrink-0 transition-colors duration-200"
                      style={{ color: hoveredIndex === m.index ? "#D86E34" : "#6F5645" }}
                    >
                      {formatScore(m.value)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#D8C6B7]" />
                <span className="text-[#C7A98A] text-base font-serif select-none">✦</span>
                <div className="h-px flex-1 bg-[#D8C6B7]" />
              </div>

              <p className="text-center text-sm tracking-[0.28em] uppercase text-[#765C49]">Thang đo 0 – 10</p>
            </div>

          </div>

          {/* Tooltip — follows cursor and avoids covering hovered points */}
          {hoveredIndex !== null && (() => {
            const m = metrics[hoveredIndex];
            return (
              <div
                className="pointer-events-none absolute z-50 w-60"
                style={{
                  left: tooltipPosition.left,
                  top: tooltipPosition.top,
                }}
              >
                <div
                  className="rounded-2xl border border-[#E7D5C3] bg-[rgba(255,251,246,0.96)] px-3.5 py-3 backdrop-blur-xl"
                  style={{ boxShadow: "0 16px 36px rgba(157,112,75,0.16), inset 0 1px 0 rgba(255,255,255,0.9)" }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-base font-semibold text-[#2A1910] leading-tight">{m.label}</span>
                    <span className="text-base font-black text-[#D86E34] leading-none shrink-0">{formatScore(m.value)}</span>
                  </div>
                  <p className="text-sm leading-normal text-[#7C6554]">{m.hint}</p>
                  <p className="mt-1 text-sm uppercase tracking-tight text-[#A36A43]">{m.rubric}</p>
                </div>
              </div>
            );
          })()}
        </div>
        )}
      </div>
    </section>
  );
};

export default RescuerScoreRadar;
