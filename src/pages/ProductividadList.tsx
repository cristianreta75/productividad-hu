import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProductividadDetalleDrawer from "@/components/ProductividadDetalleDrawer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Detalle = {
  detalleId: number
  metodo: string
  formaCalculo: string
  cantidadPracticas: number
  importe: number
}

type Empleado = {
  empleadoId: number
  empleadoNombre: string
  importe: number | null
  detalles: Detalle[]
}

type ProductividadResponse = {
  anio: number
  mes: number
  estado: string
  importeTotal: number
  empleados: Empleado[]
}

export default function ProductividadList() {
  const [data, setData] = useState<ProductividadResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "http://172.22.116.159:8081/api/productividad/ver?anio=2025&mes=5"
        )
        if (!res.ok) throw new Error("Error al cargar productividad")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="p-4">Cargando...</div>
  if (!data) return <div className="p-4">No se pudo cargar la productividad</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Productividad {data.anio}-{String(data.mes).padStart(2, "0")} | Estado:{" "}
          {data.estado}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Importe total calculado:{" "}
          {data.importeTotal.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Empleado</TableHead>
              <TableHead>Importe</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.empleados.map((e) => (
              <TableRow key={e.empleadoId}>
                <TableCell>{e.empleadoId}</TableCell>
                <TableCell>{e.empleadoNombre}</TableCell>
                <TableCell>
                  {e.importe !== null ? e.importe.toLocaleString("es-AR", { style: "currency", currency: "ARS", }) : "-"}
                </TableCell>
                <TableCell>
                  <ProductividadDetalleDrawer
                    empleadoId={e.empleadoId}
                    empleadoNombre={e.empleadoNombre}
                    anio={data.anio}
                    mes={data.mes}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}