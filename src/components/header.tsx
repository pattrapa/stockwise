import Input from "./input";
import Icon from "./icon";

export default function Header() {
  return (
    <header className="fixed left-[240px] right-0 top-0 z-10 flex h-[72px] items-center justify-between border-b border-[#E5E7EB] bg-white px-8">
      <div className="w-[390px]">
        <Input
          icon="search"
          placeholder="ค้นหาสินค้า รายการขาย หรือเมนู..."
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative grid h-11 w-11 place-items-center rounded-lg border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F7F8FA]"
          aria-label="การแจ้งเตือน"
        >
          <Icon name="bell" size={21} />

          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#D94A4A] ring-2 ring-white" />
        </button>

        <div className="h-8 w-px bg-[#E5E7EB]" />

        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EAF2FF] font-semibold text-[#2457A6]">
            ส
          </div>

          <div>
            <p className="text-[14px] font-medium text-[#1F2937]">
              สมชาย ใจดี
            </p>

            <p className="text-[12px] text-[#6B7280]">
              พนักงานขาย
            </p>
          </div>

          <Icon
            name="chevron"
            size={16}
            className="rotate-90 text-[#6B7280]"
          />
        </div>
      </div>
    </header>
  );
}