import { useState } from "react";

import Button from "../components/button";
import Card from "../components/card";
import Icon from "../components/icon";
import Input from "../components/input";
import PageHeader from "../components/page-header";
import { products } from "../data/mock-data";


export default function Sales() {
  const [cart, setCart] = useState([{...products[0], qty: 2}, {...products[3], qty: 1}]);
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const update = (sku: string, n: number) => setCart(c=>c.map(p=>p.sku===sku ? {...p, qty: Math.max(1,p.qty+n)} : p));
  const add = (p: typeof products[number]) => setCart(c=>c.some(x=>x.sku===p.sku) ? c.map(x=>x.sku===p.sku ? {...x,qty:x.qty+1}:x) : [...c,{...p,qty:1}]);
  return <>
    <PageHeader title="ขายสินค้า" subtitle="ค้นหาและเลือกสินค้าเพื่อสร้างรายการขาย" />
    <div className="grid grid-cols-[1fr_410px] gap-5">
      <div><Card className="p-4"><Input icon="search" placeholder="ค้นหาด้วยชื่อสินค้า, SKU หรือสแกนบาร์โค้ด"/><div className="mt-3 flex gap-2">{["ทั้งหมด","เครื่องดื่ม","ขนมขบเคี้ยว","ของใช้ในบ้าน"].map((x,i)=><button key={x} className={`rounded-lg px-3.5 py-2 text-[13px] font-medium ${i===0?"bg-[#2457A6] text-white":"bg-[#F4F6F8] text-[#4B5563]"}`}>{x}</button>)}</div></Card>
      <div className="mt-4 grid grid-cols-3 gap-3">{products.map(p=><button key={p.sku} onClick={()=>add(p)} disabled={p.stock===0} className="relative rounded-xl border border-[#E5E7EB] bg-white p-3 text-left shadow-[0_2px_8px_rgba(24,59,112,.04)] hover:border-[#8EB2E8] disabled:opacity-50"><div className={`grid h-20 w-full place-items-center rounded-lg ${p.color}`}><Icon name="box" size={28} className="text-[#536176]"/></div><p className="mt-3 min-h-10 text-[13px] font-medium leading-5">{p.name}</p><div className="mt-2 flex items-center justify-between"><b className="text-[#2457A6]">฿{p.price}</b><span className={`text-[11px] ${p.stock < 10 ? "text-[#D94A4A]":"text-[#6B7280]"}`}>เหลือ {p.stock}</span></div></button>)}</div></div>
      <Card className="sticky top-24 h-fit overflow-hidden"><div className="flex items-center justify-between border-b border-[#E5E7EB] p-5"><div><h2 className="text-[18px] font-semibold">รายการสินค้า</h2><p className="text-[13px] text-[#6B7280]">{cart.length} รายการ</p></div><button onClick={()=>setCart([])} className="text-[13px] text-[#D94A4A]">ล้างทั้งหมด</button></div>
      <div className="max-h-70 overflow-auto">{cart.map(p=><div key={p.sku} className="border-b border-[#EEF0F2] p-4"><div className="flex gap-3"><div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${p.color}`}><Icon name="box" size={18}/></div><div className="min-w-0 flex-1"><p className="truncate text-[13px] font-medium">{p.name}</p><p className="mt-1 text-[12px] text-[#6B7280]">฿{p.price.toFixed(2)} / ชิ้น</p></div><button onClick={()=>setCart(c=>c.filter(x=>x.sku!==p.sku))} className="text-[#D94A4A]" aria-label="นำสินค้าออก"><Icon name="trash" size={17}/></button></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-lg border border-[#DDE1E7]"><button onClick={()=>update(p.sku,-1)} className="p-2"><Icon name="minus" size={14}/></button><b className="min-w-8 text-center text-[13px]">{p.qty}</b><button onClick={()=>update(p.sku,1)} className="p-2 text-[#2457A6]"><Icon name="plus" size={14}/></button></div><b className="text-[14px]">฿{(p.price*p.qty).toFixed(2)}</b></div></div>)}</div>
      <div className="bg-[#FAF7F0] p-5"><div className="space-y-2 text-[14px]"><div className="flex justify-between text-[#6B7280]"><span>ยอดรวมย่อย</span><span>฿{total.toFixed(2)}</span></div><div className="flex justify-between text-[#6B7280]"><span>ส่วนลด</span><button className="font-medium text-[#2457A6]">เพิ่มส่วนลด</button></div><div className="flex justify-between border-t border-[#DCD7CD] pt-3 text-[20px] font-semibold"><span>ยอดสุทธิ</span><span className="text-[#2457A6]">฿{total.toFixed(2)}</span></div></div>
      <p className="mb-2 mt-5 text-[13px] font-medium">วิธีชำระเงิน</p><div className="grid grid-cols-3 gap-2">{["เงินสด","QR Payment","Credit Card"].map((x,i)=><button key={x} className={`min-h-14 rounded-lg border text-[12px] font-medium ${i===0?"border-[#2457A6] bg-[#EAF2FF] text-[#2457A6]":"border-[#DDE1E7] bg-white text-[#4B5563]"}`}>{x}</button>)}</div><div className="mt-4 rounded-lg bg-[#EAF2FF] p-3 text-[12px] leading-5 text-[#2457A6]">หลังยืนยันการขาย ระบบจะตัดจำนวนสินค้าออกจากคลังโดยอัตโนมัติ</div><Button className="mt-4 w-full" icon="check">ยืนยันการขาย ฿{total.toFixed(2)}</Button></div></Card>
    </div>
  </>;
}