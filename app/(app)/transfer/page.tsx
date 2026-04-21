"use client";

import dynamic from "next/dynamic";

/**
 * Transfer Window page. The actual body uses wagmi hooks which require the
 * client-only Web3Provider context. Dynamic-import with ssr:false so prerender
 * doesn't try to call useAccount outside the provider.
 */
const TransferBody = dynamic(() => import("./TransferBody"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="h-[200px] card animate-pulse" aria-hidden />
      <div className="h-[400px] card animate-pulse" aria-hidden />
    </div>
  ),
});

export default function TransferPage() {
  return <TransferBody />;
}
