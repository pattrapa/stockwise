import Icon, { type IconName } from "../components/icon";
import Card from "../components/card";
import PageHeader from "../components/page-header";
import Select from "../components/select";
import { products } from "../data/mock-data";
import StatCard from "../components/stat-card";

export default function Dashboard() {
  const summaries = [
    ["จำนวนสินค้าทั้งหมด", "1,248", "รายการ", "box", "bg-[#EAF2FF] text-[#2457A6]"],
    ["สินค้าใกล้หมด", "18", "รายการ", "in", "bg-orange-50 text-[#E99A2C]"],
    ["สินค้าหมด", "7", "รายการ", "minus", "bg-red-50 text-[#D94A4A]"],
    ["ยอดขายวันนี้", "฿24,580", "+12.5%", "cart", "bg-green-50 text-[#3A9D5D]"],
    ["ยอดขายเดือนนี้", "฿486,250", "+8.2%", "report", "bg-[#EAF2FF] text-[#2457A6]"],
    ["กำไรเดือนนี้", "฿128,490", "26.4%", "dashboard", "bg-violet-50 text-violet-600"],
  ];
  const chart = [42, 54, 48, 68, 58, 76, 64, 83, 72, 88, 81, 94];
  return <>
    <PageHeader title="ภาพรวมระบบ" subtitle="ข้อมูลล่าสุด ณ วันที่ 24 พฤษภาคม 2568" />
    <div className="grid grid-cols-3 gap-4">
      {summaries.map(([label, value, meta, icon, color]) => (
        <StatCard
          key={label}
          label={label}
          value={value}
          meta={meta}
          icon={icon as IconName}
          iconClassName={color}
        />
      ))}
    </div>
    <div className="mt-5 grid grid-cols-[1.55fr_1fr] gap-5">
      <Card className="p-5">
        <div className="flex items-start justify-between"><div><h2 className="font-semibold text-[#1F2937]">ยอดขายรายเดือน</h2><p className="mt-1 text-[13px] text-[#6B7280]">ยอดขายรวมในปี 2568</p></div><Select><option>ปี 2568</option><option>ปี 2567</option></Select></div>
        <div className="mt-5 flex h-52.5 items-end gap-3 border-b border-[#E5E7EB] px-1">
          {chart.map((h, i) => <div key={i} className="group flex h-full flex-1 items-end"><div style={{height: `${h}%`}} className={`w-full rounded-t-md ${i === 11 ? "bg-[#2457A6]" : "bg-[#BFD4F4] group-hover:bg-[#8EB2E8]"}`}/></div>)}
        </div>
        <div className="mt-2 grid grid-cols-12 text-center text-[11px] text-[#7B8492]">{["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."].map(m => <span key={m}>{m}</span>)}</div>
      </Card>
      <Card className="p-5"><h2 className="font-semibold text-[#1F2937]">ยอดขายเทียบกำไร</h2><p className="mt-1 text-[13px] text-[#6B7280]">6 เดือนล่าสุด</p>
        <div className="mt-6 space-y-5">{[["ธ.ค.","486,250","128,490",84,38],["พ.ย.","442,800","112,300",76,34],["ต.ค.","461,500","119,800",80,36],["ก.ย.","395,200","96,400",68,29],["ส.ค.","428,900","108,200",74,32]].map(([m,s,p,sw,pw]) => <div key={m as string} className="grid grid-cols-[38px_1fr] items-center gap-2"><span className="text-[12px] text-[#6B7280]">{m}</span><div><div className="h-2 rounded-full bg-[#EAF2FF]"><div className="h-full rounded-full bg-[#2457A6]" style={{width:`${sw}%`}}/></div><div className="mt-1 h-1.5 rounded-full bg-[#F4EFE5]"><div className="h-full rounded-full bg-[#E99A2C]" style={{width:`${pw}%`}}/></div></div></div>)}</div>
        <div className="mt-5 flex gap-5 border-t border-[#E5E7EB] pt-4 text-[12px]"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#2457A6]"/>ยอดขาย</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#E99A2C]"/>กำไร</span></div>
      </Card>
    </div>
    <div className="mt-5 grid grid-cols-3 gap-5">
      <Card><div className="flex items-center justify-between border-b border-[#E5E7EB] p-5"><div><h2 className="font-semibold">สินค้าใกล้หมด</h2><p className="mt-1 text-[13px] text-[#6B7280]">ควรสั่งซื้อเพิ่มเร็วๆ นี้</p></div><button className="text-[13px] font-medium text-[#2457A6]">ดูทั้งหมด</button></div>{products.filter(p=>p.status!=="ปกติ").map(p=><div key={p.sku} className="flex items-center gap-3 border-b border-[#EEF0F2] px-5 py-3 last:border-0"><div className={`grid h-10 w-10 place-items-center rounded-lg ${p.color}`}><Icon name="box" size={19} className="text-[#536176]"/></div><div className="min-w-0 flex-1"><p className="truncate text-[14px] font-medium">{p.name}</p><p className="text-[12px] text-[#6B7280]">{p.sku}</p></div><div className="text-right"><p className={`text-[14px] font-semibold ${p.stock ? "text-[#E99A2C]" : "text-[#D94A4A]"}`}>{p.stock} ชิ้น</p><p className="text-[11px] text-[#9CA3AF]">ขั้นต่ำ 10</p></div></div>)}</Card>
      <Card><div className="flex items-center justify-between border-b border-[#E5E7EB] p-5"><div><h2 className="font-semibold">รายการขายล่าสุด</h2><p className="mt-1 text-[13px] text-[#6B7280]">อัปเดตแบบเรียลไทม์</p></div><button className="text-[13px] font-medium text-[#2457A6]">ดูทั้งหมด</button></div>{[["INV-250524-018","10:42 น.","฿1,250","QR Payment"],["INV-250524-017","10:18 น.","฿485","เงินสด"],["INV-250524-016","09:55 น.","฿2,180","Credit Card"],["INV-250524-015","09:31 น.","฿720","เงินสด"]].map(r=><div key={r[0]} className="flex items-center gap-3 border-b border-[#EEF0F2] px-5 py-3 last:border-0"><div className="grid h-10 w-10 place-items-center rounded-lg bg-green-50 text-[#3A9D5D]"><Icon name="check" size={19}/></div><div className="flex-1"><p className="text-[14px] font-medium">{r[0]}</p><p className="text-[12px] text-[#6B7280]">{r[1]} · {r[3]}</p></div><p className="font-semibold text-[#2457A6]">{r[2]}</p></div>)}</Card>
      <Card><div className="flex items-center justify-between border-b border-[#E5E7EB] p-5"><div><h2 className="font-semibold">สินค้าขายดี</h2><p className="mt-1 text-[13px] text-[#6B7280]">ประจำเดือนพฤษภาคม</p></div><button className="text-[13px] font-medium text-[#2457A6]">ดูรายงาน</button></div>{products.slice(0,4).map((p,i)=><div key={p.sku} className="flex items-center gap-3 border-b border-[#EEF0F2] px-5 py-3 last:border-0"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[13px] font-semibold ${i===0?"bg-[#EAF2FF] text-[#2457A6]":"bg-[#F4F6F8] text-[#6B7280]"}`}>{i+1}</span><div className="min-w-0 flex-1"><p className="truncate text-[13px] font-medium">{p.name}</p><p className="text-[11px] text-[#9CA3AF]">{p.sku}</p></div><p className="text-[13px] font-semibold text-[#2457A6]">{342-i*51} ชิ้น</p></div>)}</Card>
    </div>
  </>;
}