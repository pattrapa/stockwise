import { useEffect, useMemo, useState } from "react";

import type { Page, Product } from "../types";
import ProductTable from "../components/product-table";
import PageHeader from "../components/page-header";
import Button from "../components/button";
import Input from "../components/input";
import Select from "../components/select";
import Card from "../components/card";

export default function Inventory({ setPage,
  setEditingProductId,
}: {
  setPage: (page: Page) => void;
  setEditingProductId: (id: number | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const filtered = products.filter(p => `${p.name}${p.sku}${p.category}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const formattedProducts: Product[] = data.map((item: any) => ({
          id: item.id,
          sku: item.sku,
          name: item.name,
          category: item.category ?? "-",
          cost: Number(item.cost),
          price: Number(item.price),
          stock: item.stock,
          status:
            item.stock === 0
              ? "หมด"
              : item.stock <= item.minimum_stock
                ? "ใกล้หมด"
                : "ปกติ",
          color: "bg-sky-100",
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถโหลดข้อมูลสินค้าได้");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>กำลังโหลดข้อมูลสินค้า...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("ต้องการลบสินค้านี้ใช่หรือไม่?");

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "ไม่สามารถลบสินค้าได้");
      }

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการลบสินค้า");
    }
  };

  const handleEdit = (id: number) => {
    setEditingProductId(id);
    setPage("product-form");
  };

  return <>
    <PageHeader title="สินค้าคงคลัง" subtitle="จัดการและตรวจสอบสินค้าทั้งหมดในระบบ"><Button icon="plus" onClick={() => {
      setEditingProductId(null);
      setPage("product-form");
    }}>เพิ่มสินค้า</Button></PageHeader>
    <Card>
      <div className="flex items-end gap-3 border-b border-[#E5E7EB] p-5"><div className="flex-1"><Input label="ค้นหาสินค้า" icon="search" placeholder="ค้นหาด้วยชื่อสินค้า, SKU หรือบาร์โค้ด" value={query} onChange={(e) => setQuery(e.target.value)} /></div><Select label="หมวดหมู่" className="w-48"><option>ทุกหมวดหมู่</option><option>เครื่องดื่ม</option><option>ขนมขบเคี้ยว</option></Select><Select label="สถานะสต็อก" className="w-44"><option>ทุกสถานะ</option><option>ปกติ</option><option>ใกล้หมด</option><option>หมด</option></Select></div>
      <ProductTable
        products={filtered}
        setPage={setPage}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Card>
  </>;
}