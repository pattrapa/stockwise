import Icon, { type IconName } from "./icon";
import Logo from "../components/logo";
import type { Page } from "../types";

const navItems: {
  page: Page;
  label: string;
  icon: IconName;
}[] = [
  {
    page: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
  },
  {
    page: "inventory",
    label: "สินค้าคงคลัง",
    icon: "box",
  },
  {
    page: "stock-in",
    label: "รับสินค้าเข้า",
    icon: "in",
  },
  {
    page: "sales",
    label: "ขายสินค้า",
    icon: "cart",
  },
  {
    page: "history",
    label: "ประวัติการขาย",
    icon: "history",
  },
  {
    page: "reports",
    label: "รายงาน",
    icon: "report",
  },
  {
    page: "settings",
    label: "ตั้งค่า",
    icon: "settings",
  },
];

export default function Sidebar({
  page,
  setPage,
}: {
  page: Page;
  setPage: (page: Page) => void;
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-60 flex-col bg-[#173B70] px-4 py-6 text-white">
      <div className="px-2">
        <Logo dark />
      </div>

      <div className="mx-2 mt-7 h-px bg-white/10" />

      <nav className="mt-5 space-y-1.5">
        {navItems.map((item) => {
          const active =
            page === item.page ||
            (page === "product-form" &&
              item.page === "inventory") ||
            (page === "receipt" &&
              item.page === "history");

          return (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className={`flex min-h-12 w-full items-center gap-3 rounded-lg px-3.5 text-left text-[15px] font-medium transition-colors ${
                active
                  ? "bg-white text-[#173B70] shadow-sm"
                  : "text-blue-50 hover:bg-white/10"
              }`}
            >
              <Icon
                name={item.icon}
                size={20}
              />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl bg-white/8 p-3.5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EAF2FF] font-semibold text-[#2457A6]">
            ส
          </div>

          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium">
              สมชาย ใจดี
            </p>

            <p className="text-[12px] text-blue-200">
              พนักงานขาย
            </p>
          </div>
        </div>

        <button
          onClick={() => setPage("login")}
          className="mt-3 flex w-full items-center gap-2 border-t border-white/10 pt-3 text-[13px] text-blue-100 hover:text-white"
        >
          <Icon name="logout" size={17} />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}