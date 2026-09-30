import type { ChangeEventHandler } from "react";
import Icon, { type IconName } from "./icon";

export default function Input({
  label,
  placeholder,
  icon,
  type = "text",
  name,
  value,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  icon?: IconName;
  type?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-[14px] font-medium text-[#374151]">
          {label}
        </span>
      )}

      <span className="relative block">
        {icon && (
          <Icon
            name={icon}
            size={19}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8492]"
          />
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-11 w-full rounded-lg border border-[#DDE1E7] bg-white text-[15px] text-[#1F2937] outline-none placeholder:text-[#9CA3AF] focus:border-[#2457A6] focus:ring-3 focus:ring-blue-100 ${
            icon ? "pl-11 pr-3" : "px-3.5"
          }`}
        />
      </span>
    </label>
  );
}