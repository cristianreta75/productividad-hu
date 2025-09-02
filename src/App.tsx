import { Routes, Route } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import Dashboard from "@/pages/Dashboard"
import Productividad from "@/pages/Productividad"

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/productividad" element={<Productividad />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div className="p-6">Página no encontrada</div>} />
    </Routes>
  )
}