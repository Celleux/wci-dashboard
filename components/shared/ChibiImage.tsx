import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface Props {
  src: string;
  alt?: string;
  size?: number;
  glow?: string;
  className?: string;
  priority?: boolean;
}

/**
 * ChibiImage — Paul PNG with a multi-layer halo so the cutout edge blends
 * seamlessly into dark backgrounds. Two concentric glow layers (tight +
 * wide) + a subtle darken behind the feet to ground the character.
 */
export function ChibiImage({
  src,
  alt = "",
  size = 160,
  glow = "rgba(139,71,214,0.5)",
  className,
  priority,
}: Props) {
  return (
    <span
      className={cn("relative inline-block align-middle", className)}
      style={{ width: size, height: size }}
    >
      {/* Wide soft glow backplate */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: "-12%",
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, ${glow}, transparent 72%)`,
          filter: "blur(32px)",
          opacity: 0.95,
          pointerEvents: "none",
        }}
      />
      {/* Tight core glow */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: "5%",
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 55%, ${glow}, transparent 55%)`,
          filter: "blur(14px)",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />
      {/* Ground shadow under feet */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "15%",
          right: "15%",
          bottom: "3%",
          height: "14%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 70%)",
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        priority={priority}
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter:
            "drop-shadow(0 12px 24px rgba(0,0,0,0.5)) drop-shadow(0 0 14px rgba(10,6,21,0.9))",
        }}
      />
    </span>
  );
}
