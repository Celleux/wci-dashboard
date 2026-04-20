import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { OfflineBanner } from "@/components/pwa/OfflineBanner";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { Web3ProviderClient } from "@/components/providers/Web3ProviderClient";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0615" },
    { media: "(prefers-color-scheme: light)", color: "#0A0615" },
  ],
};

export const metadata: Metadata = {
  applicationName: "World Cup Inu",
  title: {
    default: "World Cup Inu — Paul's Oracle for WC26",
    template: "%s · World Cup Inu",
  },
  description:
    "Pari-mutuel betting & prediction markets for the FIFA World Cup 2026, fronted by Paul the Oracle. 0% house edge. 104 matches. One octopus.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "WCI",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    title: "World Cup Inu — Paul's Oracle for WC26",
    description:
      "Pari-mutuel betting & prediction markets for the FIFA World Cup 2026. Paul speaks.",
    siteName: "World Cup Inu",
  },
  twitter: {
    card: "summary_large_image",
    title: "World Cup Inu",
    description: "Paul's Oracle. 104 matches. 0% house edge.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg-deep text-t1">
        <div className="bg-fifa" aria-hidden />
        <div className="bg-arcs" aria-hidden />
        <div className="bg-grain" aria-hidden />
        <OfflineBanner />
        <Web3ProviderClient>
          <div className="relative z-10 min-h-full">{children}</div>
        </Web3ProviderClient>
        <InstallPrompt />
      </body>
    </html>
  );
}
