"use client";

import Link from "next/link";
import { NavIcon, type NavIconKind } from "./NavIcon";

export interface NavItemDef {
  key: string;
  label: string;
  href: string;
  icon: NavIconKind;
  badge?: number;
}

interface SidebarNavItemProps {
  item: NavItemDef;
  active?: boolean;
}

export function SidebarNavItem({ item, active = false }: SidebarNavItemProps) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      data-active={active}
      className="sidebar-item"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 48,
        textDecoration: "none",
        ...(active
          ? {
              background:
                "linear-gradient(90deg, rgba(245,208,32,0.18), rgba(245,208,32,0.02))",
              border: "1px solid rgba(245,208,32,0.40)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 16px -6px var(--gold)",
              color: "var(--gold)",
            }
          : {}),
      }}
    >
      {/* Active left-bar accent */}
      {active && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 4,
            bottom: 4,
            width: 3,
            background:
              "linear-gradient(180deg, var(--gold), var(--fifa-orange))",
            borderRadius: "0 2px 2px 0",
            boxShadow: "0 0 8px var(--gold)",
          }}
        />
      )}

      {/* Icon tile */}
      <div
        aria-hidden
        style={{
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          flexShrink: 0,
          background: active
            ? "linear-gradient(180deg, rgba(245,208,32,0.20), rgba(245,208,32,0.05))"
            : "linear-gradient(180deg, #201838, #110A24)",
          border: `1px solid ${active ? "rgba(245,208,32,0.30)" : "var(--hair)"}`,
          boxShadow: active
            ? "inset 0 1px 0 rgba(255,255,255,0.10)"
            : "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <NavIcon kind={item.icon} active={active} size={14} />
      </div>

      {/* Label */}
      <span
        style={{
          flex: 1,
          fontSize: 13,
          fontWeight: active ? 700 : 600,
          letterSpacing: "0.005em",
          color: active ? "var(--gold)" : "inherit",
        }}
      >
        {item.label}
      </span>

      {/* Badge */}
      {item.badge != null && item.badge > 0 && (
        <span
          className="mono"
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: 999,
            background:
              "linear-gradient(180deg, var(--fifa-red), var(--fifa-orange))",
            color: "#fff",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.30), 0 2px 4px rgba(232,57,44,0.50)",
            minWidth: 18,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}
