import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-[#E5E7EB] bg-white shadow-[0_2px_10px_rgba(24,59,112,0.04)] ${className}`}
    >
      {children}
    </section>
  );
}