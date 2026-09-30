import Icon, { type IconName } from "./icon";

type StatCardProps = {
  label: string;
  value: string;
  meta: string;
  icon: IconName;
  iconClassName: string;
};

export default function StatCard({
  label,
  value,
  meta,
  icon,
  iconClassName,
}: StatCardProps) {
  const isPositive =
    meta.includes("%") || meta.startsWith("+");

  return (
    <section className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-[0_2px_10px_rgba(24,59,112,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[14px] text-[#6B7280]">
            {label}
          </p>

          <p className="mt-2 text-[25px] font-semibold text-[#1F2937]">
            {value}
          </p>

          <p
            className={`mt-1 text-[12px] ${
              isPositive
                ? "font-medium text-[#3A9D5D]"
                : "text-[#9CA3AF]"
            }`}
          >
            {meta}
          </p>
        </div>

        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${iconClassName}`}
        >
          <Icon
            name={icon}
            size={21}
          />
        </div>
      </div>
    </section>
  );
}