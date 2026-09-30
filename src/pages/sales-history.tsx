import { useState } from "react";

import Card from "../components/card";
import Icon from "../components/icon";
import Input from "../components/input";
import PageHeader from "../components/page-header";
import Select from "../components/select";
import { Page } from "../types";

export default function History({ setPage }: { setPage: (p: Page) => void }) {
  const rows = [["INV-250524-018","24 พ.ค. 2568, 10:42","4","฿1,250.00","QR Payment","สมชาย ใจดี"],["INV-250524-017","24 พ.ค. 2568, 10:18","2","฿485.00","เงินสด","สมชาย ใจดี"],["INV-250524-016","24 พ.ค. 2568, 09:55","7","฿2,180.00","Credit Card","สุดา พรดี"],["INV-250524-015","24 พ.ค. 2568, 09:31","3","฿720.00","เงินสด","สุดา พรดี"],["INV-250523-042","23 พ.ค. 2568, 18:25","5","฿1,465.00","QR Payment","สมชาย ใจดี"]];
  return <><PageHeader title="ประวัติการขาย" subtitle="ตรวจสอบรายการขายและรายละเอียดการชำระเงิน" />
    <Card><div className="grid grid-cols-4 items-end gap-3 border-b border-[#E5E7EB] p-5"><Input label="ค้นหารายการ" icon="search" placeholder="เลขที่รายการ"/><Input label="ช่วงวันที่" icon="calendar" value="18/05/2568 - 24/05/2568"/><Select label="วิธีชำระเงิน"><option>ทุกวิธี</option><option>เงินสด</option><option>QR Payment</option></Select><Select label="พนักงาน"><option>พนักงานทุกคน</option><option>สมชาย ใจดี</option></Select></div>
    <table className="w-full text-left"><thead className="bg-[#FAF7F0] text-[12px] text-[#596273]"><tr><th className="px-5 py-3.5">เลขที่รายการ</th><th>วันที่และเวลา</th><th>จำนวนสินค้า</th><th>ยอดรวม</th><th>วิธีชำระเงิน</th><th>พนักงาน</th><th className="pr-5 text-right">รายละเอียด</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]} className="border-t border-[#ECEEF1] text-[13px]"><td className="px-5 py-4 font-medium text-[#2457A6]">{r[0]}</td><td>{r[1]}</td><td>{r[2]} รายการ</td><td className="font-semibold">{r[3]}</td><td><span className="rounded-full bg-[#EAF2FF] px-3 py-1 text-[12px] text-[#2457A6]">{r[4]}</span></td><td>{r[5]}</td><td className="pr-5 text-right"><button onClick={()=>setPage("receipt")} className="inline-flex items-center gap-1.5 font-medium text-[#2457A6]"><Icon name="eye" size={17}/> ดูรายละเอียด</button></td></tr>)}</tbody></table><div className="flex justify-between border-t border-[#E5E7EB] px-5 py-4 text-[13px] text-[#6B7280]"><span>พบ 248 รายการ</span><span>ยอดขายรวมช่วงนี้ <b className="ml-2 text-[#2457A6]">฿86,450.00</b></span></div></Card></>;
}