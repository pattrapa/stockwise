import type { Page, Product } from "../types";
import Icon from "./icon";
import Status from "./status";

export default function ProductTable({
  products,
  setPage,
  onDelete,
  onEdit,
}: {
  products: Product[];
  setPage: (page: Page) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  return (
    <>
      <div className="overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#FAF7F0] text-[12px] font-semibold text-[#596273]">
              <th className="px-4 py-3.5">รูปสินค้า</th>
              <th>รหัสสินค้า</th>
              <th>ชื่อสินค้า</th>
              <th>หมวดหมู่</th>
              <th>ราคาทุน</th>
              <th>ราคาขาย</th>
              <th>คงเหลือ</th>
              <th>สถานะ</th>
              <th className="pr-5 text-right">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.sku}
                className="border-t border-[#ECEEF1] text-[13px] text-[#374151] hover:bg-[#FAFCFF]"
              >
                <td className="px-4 py-3">
                  <div
                    className={`grid h-11 w-11 place-items-center rounded-lg ${product.color}`}
                  >
                    <Icon
                      name="box"
                      size={20}
                      className="text-[#536176]"
                    />
                  </div>
                </td>

                <td className="font-medium text-[#2457A6]">
                  {product.sku}
                </td>

                <td className="max-w-48 font-medium text-[#1F2937]">
                  {product.name}
                </td>

                <td>{product.category}</td>

                <td>฿{product.cost.toFixed(2)}</td>

                <td className="font-medium">
                  ฿{product.price.toFixed(2)}
                </td>

                <td className="font-semibold">
                  {product.stock}
                </td>

                <td>
                  <Status value={product.status} />
                </td>

                <td className="pr-5">
                  <div className="flex justify-end gap-1">
                    <button
                      title="ดูรายละเอียด"
                      className="rounded-md p-2 text-[#2457A6] hover:bg-blue-50"
                    >
                      <Icon name="eye" size={18} />
                    </button>

                    <button
                      title="แก้ไข"
                      onClick={() => onEdit(product.id)}
                      className="rounded-md p-2 text-[#6B7280] hover:bg-gray-100"
                    >
                      <Icon name="edit" size={18} />
                    </button>

                    <button
                      title="ลบ"
                      onClick={() => onDelete(product.id)}
                      className="rounded-md p-2 text-[#D94A4A] hover:bg-red-50"
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#E5E7EB] px-5 py-4 text-[13px] text-[#6B7280]">
        <span>
          แสดง 1–{products.length} จาก {products.length} รายการ
        </span>

        <div className="flex gap-1">
          <button className="rounded-md border border-[#E5E7EB] px-3 py-1.5">
            ก่อนหน้า
          </button>

          <button className="rounded-md bg-[#2457A6] px-3 py-1.5 text-white">
            1
          </button>

          <button className="rounded-md border border-[#E5E7EB] px-3 py-1.5">
            2
          </button>

          <button className="rounded-md border border-[#E5E7EB] px-3 py-1.5">
            ถัดไป
          </button>
        </div>
      </div>
    </>
  );
}