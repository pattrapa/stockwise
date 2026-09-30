import type { Product } from "../types";

export const products: Product[] = [
  { sku: "BEV-001", name: "น้ำดื่มคริสตัล 600 มล.", category: "เครื่องดื่ม", cost: 6, price: 10, stock: 124, status: "ปกติ", color: "bg-sky-100" },
  { sku: "SNK-014", name: "มันฝรั่งทอด รสดั้งเดิม", category: "ขนมขบเคี้ยว", cost: 14, price: 20, stock: 8, status: "ใกล้หมด", color: "bg-amber-100" },
  { sku: "HOU-032", name: "กระดาษทิชชู่ 6 ม้วน", category: "ของใช้ในบ้าน", cost: 49, price: 69, stock: 0, status: "หมด", color: "bg-rose-100" },
  { sku: "BEV-008", name: "กาแฟสำเร็จรูป 3 in 1", category: "เครื่องดื่ม", cost: 92, price: 115, stock: 42, status: "ปกติ", color: "bg-orange-100" },
  { sku: "PER-021", name: "สบู่เหลวล้างมือ 250 มล.", category: "ของใช้ส่วนตัว", cost: 38, price: 55, stock: 15, status: "ปกติ", color: "bg-emerald-100" },
  { sku: "SNK-027", name: "แครกเกอร์ธัญพืช", category: "ขนมขบเคี้ยว", cost: 22, price: 30, stock: 6, status: "ใกล้หมด", color: "bg-yellow-100" },
];