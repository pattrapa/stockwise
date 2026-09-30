import { useMemo, useState } from "react";

import type { Page } from "./types";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Inventory from "./pages/inventory";
import ProductForm from "./pages/product-form";
import StockIn from "./pages/stock-in";
import Sales from "./pages/sales";
import History from "./pages/sales-history";
import Reports from "./pages/reports";
import Receipt from "./pages/receipt";
import Settings from "./pages/settings";
import Login from "./pages/login";

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const screen = useMemo(() => {
    if (page === "dashboard") 
      return <Dashboard />;
    
    if (page === "inventory") {
    return (
      <Inventory
        setPage={setPage}
        setEditingProductId={setEditingProductId}
      />
    );
  }

  if (page === "product-form") {
    return (
      <ProductForm
        setPage={setPage}
        editingProductId={editingProductId}
      />
    );
  }

    if (page === "stock-in") return <StockIn />;
    if (page === "sales") return <Sales />;
    if (page === "history")
      return <History setPage={setPage} />;
    if (page === "reports") return <Reports />;
    if (page === "receipt")
      return <Receipt setPage={setPage} />;

    return <Settings />;
  }, [page, editingProductId]);

  if (page === "login") {
    return (
      <Login
        onLogin={() => setPage("dashboard")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#1F2937]">
      <Sidebar
        page={page}
        setPage={setPage}
      />

      <Header />

      <main className="ml-60 min-h-screen pt-18">
        <div className="mx-auto max-w-360 p-8">
          {screen}
        </div>
      </main>
    </div>
  );
}
