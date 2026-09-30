import Icon from "./icon";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          dark
            ? "bg-white text-[#2457A6]"
            : "bg-[#2457A6] text-white"
        } shadow-sm`}
      >
        <Icon name="box" size={25} />
      </div>

      <div>
        <div
          className={`text-[19px] font-semibold leading-tight ${
            dark ? "text-white" : "text-[#173B70]"
          }`}
        >
          StockWise
        </div>

        <div
          className={`text-[11px] ${
            dark ? "text-blue-200" : "text-[#6B7280]"
          }`}
        >
          INVENTORY SYSTEM
        </div>
      </div>
    </div>
  );
}