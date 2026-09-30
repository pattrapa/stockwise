import { useState } from "react";

import Button from "../components/button";
import Card from "../components/card";
import Input from "../components/input";
import PageHeader from "../components/page-header";

export default function Settings() {
  return <><PageHeader title="ตั้งค่าระบบ" subtitle="จัดการข้อมูลร้านค้า ผู้ใช้งาน และการแจ้งเตือน" /><div className="grid grid-cols-[240px_1fr] gap-5"><Card className="h-fit p-2">{["ข้อมูลบริษัท","ผู้ใช้งานและสิทธิ์","หมวดหมู่สินค้า","การแจ้งเตือน","ข้อมูลใบเสร็จ"].map((x,i)=><button key={x} className={`w-full rounded-lg px-4 py-3 text-left text-[14px] ${i===0?"bg-[#EAF2FF] font-medium text-[#2457A6]":"text-[#4B5563]"}`}>{x}</button>)}</Card><Card className="p-6"><h2 className="text-[18px] font-semibold">ข้อมูลบริษัท / ร้านค้า</h2><div className="mt-6 grid grid-cols-2 gap-5"><div className="col-span-2"><Input label="ชื่อบริษัท / ร้านค้า" value="บริษัท สต็อกไวส์ จำกัด"/></div><Input label="หมายเลขโทรศัพท์" value="02-123-4567"/><Input label="เลขประจำตัวผู้เสียภาษี" value="0105558123456"/><div className="col-span-2"><Input label="ที่อยู่" value="99/9 ถนนสุขุมวิท กรุงเทพมหานคร 10110"/></div></div><div className="mt-6 flex justify-end border-t border-[#E5E7EB] pt-5"><Button>บันทึกการเปลี่ยนแปลง</Button></div></Card></div></>;
}