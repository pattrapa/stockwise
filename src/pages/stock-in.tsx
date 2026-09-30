import { useState } from "react";

import Button from "../components/button";
import Card from "../components/card";
import Icon from "../components/icon";
import Input from "../components/input";
import PageHeader from "../components/page-header";
import Status from "../components/status";


export default function StockIn() {
  const [amount, setAmount] = useState("25");
  return <>
    <PageHeader title="รับสินค้าเข้า" subtitle="บันทึกสินค้าที่ได้รับและเพิ่มจำนวนเข้าสู่คลัง" />
    <div className="grid grid-cols-[1fr_340px] gap-5">
      <Card className="p-6"><h2 className="text-[17px] font-semibold">ข้อมูลการรับสินค้า</h2><div className="mt-5 grid grid-cols-2 gap-5"><Input label="วันที่รับสินค้า *" type="date" value="2025-05-24"/><div/><div className="col-span-2"><Input label="ค้นหาสินค้า *" icon="search" placeholder="ค้นหาด้วยชื่อสินค้า, SKU หรือบาร์โค้ด" value="กาแฟสำเร็จรูป 3 in 1"/></div>
      <div className="col-span-2 flex items-center gap-4 rounded-xl border border-[#CFE0F7] bg-[#F5F9FF] p-4"><div className="grid h-14 w-14 place-items-center rounded-lg bg-orange-100"><Icon name="box" className="text-orange-700"/></div><div className="flex-1"><p className="font-medium">กาแฟสำเร็จรูป 3 in 1</p><p className="mt-1 text-[13px] text-[#6B7280]">BEV-008 · เครื่องดื่ม</p></div><Status value="ปกติ"/></div>
      <Input label="จำนวนที่รับเข้า *" type="number" value={amount} onChange={setAmount}/><Input label="ราคาทุนต่อหน่วย (บาท) *" type="number" value="92.00"/><Input label="Supplier / ร้านที่ซื้อ *" placeholder="ระบุชื่อผู้จัดจำหน่าย"/><div/><label className="col-span-2"><span className="mb-2 block text-[14px] font-medium">หมายเหตุ</span><textarea rows={3} placeholder="ระบุหมายเหตุ (ถ้ามี)" className="w-full rounded-lg border border-[#DDE1E7] p-3.5 outline-none focus:border-[#2457A6]"/></label></div><div className="mt-6 flex justify-end gap-3 border-t border-[#E5E7EB] pt-5"><Button kind="outline">ล้างข้อมูล</Button><Button icon="check">บันทึกรับสินค้า</Button></div></Card>
      <div className="space-y-5"><Card className="p-5"><h2 className="font-semibold">ตัวอย่างสต็อกหลังบันทึก</h2><div className="mt-5 flex items-center justify-between rounded-lg bg-[#FAF7F0] p-4"><div><p className="text-[13px] text-[#6B7280]">สต็อกปัจจุบัน</p><p className="mt-1 text-2xl font-semibold">42 <small className="text-[13px] font-normal">ชิ้น</small></p></div><Icon name="chevron" className="text-[#9CA3AF]"/><div className="text-right"><p className="text-[13px] text-[#6B7280]">สต็อกใหม่</p><p className="mt-1 text-2xl font-semibold text-[#3A9D5D]">{42 + Number(amount || 0)} <small className="text-[13px] font-normal">ชิ้น</small></p></div></div><div className="mt-4 rounded-lg bg-green-50 p-3 text-[13px] text-[#2F854D]">จำนวนสินค้าจะเพิ่มขึ้น <b>{amount || 0} ชิ้น</b> หลังจากบันทึก</div></Card><Card className="p-5"><h2 className="font-semibold">รายการรับเข้าล่าสุด</h2><div className="mt-4 space-y-3 text-[13px]">{[["น้ำดื่มคริสตัล","120 ชิ้น","24 พ.ค."],["ทิชชู่ 6 ม้วน","30 ชิ้น","23 พ.ค."],["สบู่เหลวล้างมือ","48 ชิ้น","23 พ.ค."]].map(x=><div className="flex justify-between border-b border-[#EEF0F2] pb-3 last:border-0" key={x[0]}><div><p className="font-medium">{x[0]}</p><p className="text-[#9CA3AF]">{x[2]}</p></div><b className="text-[#2457A6]">+{x[1]}</b></div>)}</div></Card></div>
    </div>
  </>;
}