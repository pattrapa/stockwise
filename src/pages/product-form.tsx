import { useState } from "react";

import PageHeader from "../components/page-header";
import Card from "../components/card";
import Input from "../components/input";
import Select from "../components/select";
import Button from "../components/button";
import Icon from "../components/icon";
import type { Page } from "../types";

export default function ProductForm({
  setPage,
  editingProductId,
}: {
  setPage: (p: Page) => void;
  editingProductId: number | null;
}) {
  const [form, setForm] = useState({
    sku: "",
    barcode: "",
    name: "",
    category_id: "",
    description: "",
    cost: "",
    price: "",
    stock: "",
    minimum_stock: "10",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!form.sku || !form.name || !form.category_id) {
        setError("กรุณากรอก SKU, ชื่อสินค้า และหมวดหมู่");
        return;
      }

      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku: form.sku,
          name: form.name,
          category_id: Number(form.category_id),
          cost: Number(form.cost),
          price: Number(form.price),
          stock: Number(form.stock),
          minimum_stock: Number(form.minimum_stock),
          image_url: null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "ไม่สามารถเพิ่มสินค้าได้");
      }

      setPage("inventory");
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("เกิดข้อผิดพลาด");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="เพิ่มสินค้าใหม่"
        subtitle="กรอกข้อมูลสินค้าให้ครบถ้วนเพื่อเพิ่มลงในคลัง"
      />

      <div className="grid grid-cols-[280px_1fr] gap-5">
        <Card className="h-fit p-5">
          <h2 className="font-semibold">รูปสินค้า</h2>

          <p className="mt-1 text-[13px] text-[#6B7280]">
            รองรับ JPG หรือ PNG ไม่เกิน 5 MB
          </p>

          <button className="mt-4 grid aspect-square w-full place-items-center rounded-xl border-2 border-dashed border-[#C9D3E2] bg-[#FAFCFF] text-[#6B7280] hover:border-[#2457A6]">
            <span className="flex flex-col items-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#EAF2FF] text-[#2457A6]">
                <Icon name="image" size={23} />
              </span>

              <b className="mt-3 text-[14px] font-medium text-[#2457A6]">
                อัปโหลดรูปสินค้า
              </b>

              <small className="mt-1">หรือลากไฟล์มาวางที่นี่</small>
            </span>
          </button>
        </Card>

        <Card className="p-6">
          <h2 className="border-b border-[#E5E7EB] pb-4 text-[17px] font-semibold">
            ข้อมูลสินค้า
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <Input
              label="รหัสสินค้า (SKU) *"
              placeholder="เช่น BEV-001"
              name="sku"
              value={form.sku}
              onChange={handleChange}
            />

            <Input
              label="บาร์โค้ด"
              placeholder="ระบุหรือสแกนบาร์โค้ด"
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
            />

            <div className="col-span-2">
              <Input
                label="ชื่อสินค้า *"
                placeholder="ระบุชื่อสินค้า"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <Select
              label="หมวดหมู่ *"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
            >
              <option value="">เลือกหมวดหมู่</option>
              <option value="3">เครื่องดื่ม</option>
              <option value="4">ขนมขบเคี้ยว</option>
              <option value="5">ของใช้ในบ้าน</option>
              <option value="6">ของใช้ส่วนตัว</option>
            </Select>

            <div />

            <label className="col-span-2">
              <span className="mb-2 block text-[14px] font-medium">
                รายละเอียดสินค้า
              </span>

              <textarea
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับสินค้า"
                className="w-full resize-none rounded-lg border border-[#DDE1E7] p-3.5 text-[15px] outline-none focus:border-[#2457A6]"
              />
            </label>
          </div>

          <h2 className="mt-7 border-b border-[#E5E7EB] pb-4 text-[17px] font-semibold">
            ราคาและจำนวนคงเหลือ
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <Input
              label="ราคาทุน (บาท) *"
              placeholder="0.00"
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
            />

            <Input
              label="ราคาขาย (บาท) *"
              placeholder="0.00"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />

            <Input
              label="จำนวนคงเหลือ *"
              placeholder="0"
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />

            <Input
              label="ระดับสต็อกขั้นต่ำ *"
              placeholder="10"
              type="number"
              name="minimum_stock"
              value={form.minimum_stock}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="mt-4 text-[14px] text-red-500">
              {error}
            </p>
          )}

          <div className="mt-7 flex justify-end gap-3 border-t border-[#E5E7EB] pt-5">
            <Button
              kind="outline"
              onClick={() => setPage("inventory")}
            >
              ยกเลิก
            </Button>

            <Button
              icon="check"
              onClick={handleSubmit}
            >
              {loading ? "กำลังบันทึก..." : "บันทึกสินค้า"}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}