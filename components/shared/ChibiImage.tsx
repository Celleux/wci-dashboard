import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface Props {
  src: string;
  alt?: string;
  size?: number;
  glow?: string; // CSS color
  className?: string;
  priority?: boolean;
}

/**
 * ChibiImage — Paul PNG with a soft radial glow halo behind it so the white/
 * cutout edges blend into the dark background instead of popping out flat.
 * Use this wrapper any time we render a chibi asset.
 */
export function ChibiImage({
  src,
  alt = "",
  size = 160,
  glow = "rgba(139,71,214,0.45)",
  className,
  priority,
}: Props) {
  return (
    <span
      className={cn("relative inline-block align-middle", className)}
      style={{ width: size, height: size }}
    >
      {/* Soft glow halo behind */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 55%, ${glow}, transparent 68%)`,
          filter: "blur(24px)",
          opacity: 0.95,
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
            "drop-shadow(0 14px 28px rgba(0,0,0,0.65)) drop-shadow(0 0 22px rgba(10,6,21,0.9))",
        }}
      />
    </span>
  );
}
