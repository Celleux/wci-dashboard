import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <main className="p-6">
      <ComingSoon title="Operator Panel" label="role-gated" accent="var(--fifa-red)">
        <p className="text-t3 text-sm">
          Only wallets in the ops multisig will see this surface. Wire auth
          from <code className="mono">lib/web3/auth.ts</code>.
        </p>
      </ComingSoon>
    </main>
  );
}
