import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        loading?: "eager" | "lazy";
        autoplay?: boolean;
        "animation-loop"?: boolean;
        ar?: boolean;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        "camera-orbit"?: string;
        "min-camera-orbit"?: string;
        "max-camera-orbit"?: string;
        "disable-zoom"?: boolean;
        "disable-pan"?: boolean;
        "interaction-prompt"?: string;
        "shadow-intensity"?: string | number;
        exposure?: string | number;
      };
    }
  }
}
