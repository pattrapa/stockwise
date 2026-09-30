import type { ReactNode } from "react";

export default function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-6">
      <div>
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#1F2937]">
          {title}
        </h1>

        <p className="mt-1 text-[15px] text-[#6B7280]">
          {subtitle}
        </p>
      </div>

      {children && (
        <div className="flex shrink-0 gap-3">
          {children}
        </div>
      )}
    </div>
  );
}