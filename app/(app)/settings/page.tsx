"use client";

import Image from "next/image";
import { useState } from "react";
import { ChibiImage } from "@/components/shared/ChibiImage";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { cn } from "@/lib/utils/cn";

const CHIBIS = [
  { key: "chibi_jumping",  label: "Jumping" },
  { key: "chibi_oracle",   label: "Oracle" },
  { key: "chibi_cheerful", label: "Cheerful" },
  { key: "chibi_battle",   label: "Battle" },
  { key: "chibi_galaxy",   label: "Galaxy" },
  { key: "chibi_jars",     label: "Jars" },
  { key: "chibi_tarot",    label: "Tarot" },
] as const;

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string>("chibi_jumping");
  const [handle, setHandle] = useState("paulfan.eth");
  const [country, setCountry] = useState("USA");
  const [walletVisible, setWalletVisible] = useState(true);
  const [notif, setNotif] = useState({
    kickoff: true,
    paulPick: true,
    win: true,
    merkle: true,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <AccentCard accent="var(--fifa-blue)" className="p-6 overflow-visible">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <ChibiImage src={`/assets/${avatar}.png`} size={170} glow="rgba(46,111,230,0.55)" />
          <div>
            <Chip>Profile</Chip>
            <h1 className="display text-4xl md:text-5xl mt-2 leading-none">
              Settings
            </h1>
            <p className="text-t2 mt-2">
              Tune your handle, pick a chibi, manage wallet visibility and
              notifications.
            </p>
          </div>
        </div>
      </AccentCard>

      {/* Avatar picker */}
      <AccentCard accent="var(--fifa-magenta)" className="p-5">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="card-title">Chibi avatar</h2>
            <p className="text-t3 text-xs">
              Pick any Paul pose. Changes sync to your profile + bet-slip tag.
            </p>
          </div>
          <Chip kind="gold">{avatar.replace("chibi_", "")}</Chip>
        </header>
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-5 lg:grid-cols-7">
          {CHIBIS.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setAvatar(c.key)}
              className={cn(
                "rounded-xl border p-2 transition",
                avatar === c.key
                  ? "border-[var(--fifa-magenta)] bg-[rgba(230,55,168,0.1)] ring-2 ring-[var(--fifa-magenta)]"
                  : "border-hair hover:border-hair-strong"
              )}
            >
              <Image
                src={`/assets/${c.key}.png`}
                alt={c.label}
                width={96}
                height={96}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="label mt-1 text-center">{c.label}</div>
            </button>
          ))}
        </div>
      </AccentCard>

      {/* Form */}
      <AccentCard accent="var(--fifa-teal)" className="p-5">
        <header className="mb-4">
          <h2 className="card-title">Identity</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="label">Handle</span>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="mono w-full rounded-xl border border-hair-strong bg-[rgba(10,6,21,0.6)] p-3 mt-1 text-t1 outline-none focus:border-gold"
            />
          </label>
          <label className="block">
            <span className="label">Country (3-letter code)</span>
            <input
              type="text"
              maxLength={3}
              value={country}
              onChange={(e) => setCountry(e.target.value.toUpperCase())}
              className="mono w-full rounded-xl border border-hair-strong bg-[rgba(10,6,21,0.6)] p-3 mt-1 uppercase text-t1 outline-none focus:border-gold"
            />
          </label>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl border border-hair bg-[rgba(10,6,21,0.4)] p-4">
          <div>
            <div className="label">Wallet address visible on profile</div>
            <div className="text-t3 text-xs mt-1">
              Turn off to appear anonymous on cope cards & leaderboard.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setWalletVisible((v) => !v)}
            className={cn(
              "relative inline-flex h-7 w-12 items-center rounded-full transition",
              walletVisible
                ? "bg-[var(--fifa-lime)]"
                : "bg-[rgba(255,255,255,0.08)]"
            )}
            aria-pressed={walletVisible}
          >
            <span
              className="inline-block h-5 w-5 transform rounded-full bg-white transition"
              style={{ transform: walletVisible ? "translateX(24px)" : "translateX(4px)" }}
            />
          </button>
        </div>
      </AccentCard>

      {/* Notifications */}
      <AccentCard accent="var(--fifa-orange)" className="p-5">
        <header className="mb-4">
          <h2 className="card-title">Notifications</h2>
          <p className="text-t3 text-xs mt-1">
            Web push + in-app toasts. Requires PWA install.
          </p>
        </header>
        <div className="flex flex-col gap-2">
          {(
            [
              ["kickoff", "T−15 kickoff reminders"],
              ["paulPick", "Paul just picked"],
              ["win", "Your bet settled as a win"],
              ["merkle", "Weekly Merkle rewards ready"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center justify-between rounded-xl border border-hair bg-[rgba(10,6,21,0.4)] p-3 cursor-pointer hover:border-hair-strong"
            >
              <span className="text-t1">{label}</span>
              <input
                type="checkbox"
                checked={notif[key]}
                onChange={() => setNotif((n) => ({ ...n, [key]: !n[key] }))}
                className="h-5 w-5 accent-gold"
              />
            </label>
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            className="label px-4 py-2 rounded-lg border border-hair text-t2 hover:bg-white/5"
          >
            Cancel
          </button>
          <button type="button" className="btn-3d">
            SAVE CHANGES
          </button>
        </div>
      </AccentCard>
    </div>
  );
}
