export type ProductStatus = "ปกติ" | "ใกล้หมด" | "หมด";

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  cost: number;
  price: number;
  stock: number;
  status: ProductStatus;
  color: string;
}

export type Page =
  | "dashboard"
  | "inventory"
  | "product-form"
  | "stock-in"
  | "sales"
  | "history"
  | "reports"
  | "receipt"
  | "settings"
  | "login";