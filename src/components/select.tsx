import type {
  ChangeEventHandler,
  ReactNode,
} from "react";

export default function Select({
  label,
  children,
  className = "",
  name,
  value,
  onChange,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-2 block text-[14px] font-medium text-[#374151]">
          {label}
        </span>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-lg border border-[#DDE1E7] bg-white px-3.5 text-[15px] text-[#1F2937] outline-none focus:border-[#2457A6] focus:ring-3 focus:ring-blue-100"
      >
        {children}
      </select>
    </label>
  );
}