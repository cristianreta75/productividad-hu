import { Routes, Route } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import Dashboard from "@/pages/Dashboard"
import ProductividadList from "@/pages/ProductividadList"

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/productividad" element={<ProductividadList />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div className="p-6">Página no encontrada</div>} />
    </Routes>
  )
}