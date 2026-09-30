import type { ReactNode } from "react";
import Icon, { type IconName } from "./icon";

export default function Button({
  children,
  kind = "primary",
  icon,
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  kind?: "primary" | "secondary" | "danger" | "outline";
  icon?: IconName;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const styles = {
    primary: "bg-[#2457A6] text-white hover:bg-[#173B70] shadow-sm",
    secondary: "bg-[#EAF2FF] text-[#2457A6] hover:bg-blue-100",
    danger: "bg-red-50 text-[#D94A4A] hover:bg-red-100",
    outline:
      "border border-[#D6DAE1] bg-white text-[#374151] hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-[15px] font-medium transition-colors ${styles[kind]} ${className}`}
    >
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}