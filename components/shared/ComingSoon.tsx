import type { ReactNode } from "react";

interface Props {
  title: string;
  label?: string;
  accent?: string; // CSS var name, e.g. "var(--fifa-teal)"
  children?: ReactNode;
}

/**
 * Placeholder card used by routes whose real surface is being generated in a
 * subsequent v0 batch. Styled with the dashboard's tokens; unambiguous "WIP".
 */
export function ComingSoon({ title, label = "in the v0 queue", accent = "var(--fifa-teal)", children }: Props) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div
        className="card w-full max-w-xl p-8"
        style={{ "--card-accent": accent } as React.CSSProperties}
      >
        <div className="card-accent-bar" aria-hidden />
        <div className="label mb-2">{label}</div>
        <h1 className="display text-3xl mb-3">{title}</h1>
        <p className="text-t2 mb-6">
          Paul is still dictating this one. It lands in the next generation
          batch — style already matches the rest of the app.
        </p>
        {children}
      </div>
    </section>
  );
}
