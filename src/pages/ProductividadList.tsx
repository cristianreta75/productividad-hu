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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

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
  const [loading, setLoading] = useState(false)

  // filtros
  const [anio, setAnio] = useState(2025)
  const [mes, setMes] = useState(5)
  const [empleadoId, setEmpleadoId] = useState("")

  const fetchData = async () => {
    setLoading(true)
    try {
								
      let url = `http://172.22.116.159:8081/api/productividad/ver?anio=${anio}&mes=${mes}`
      if (empleadoId) {
        url += `&empleadoId=${empleadoId}`
									 
					 
					 
						  
				 
						 
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error("Error al cargar productividad")
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  // carga inicial
  useEffect(() => {
    fetchData()
  }, [])

															
																				 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productividad</CardTitle>
        {/* FILTROS */}
        <div className="flex flex-wrap gap-2 items-center mt-4">
          <Select value={anio.toString()} onValueChange={(v) => setAnio(parseInt(v))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {[2023, 2024, 2025].map((a) => (
                <SelectItem key={a} value={a.toString()}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={mes.toString()} onValueChange={(v) => setMes(parseInt(v))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <SelectItem key={m} value={m.toString()}>
                  {m.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="EmpleadoId (opcional)"
            value={empleadoId}
            onChange={(e) => setEmpleadoId(e.target.value)}
            className="w-[200px]"
          />

          <Button onClick={fetchData}>Buscar</Button>
          {/* Agregado de Botón de refrescar Productividad */}
          <Button variant="secondary" onClick={fetchData}>
            Refrescar
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {loading && <p className="p-4">Cargando...</p>}
        {!loading && !data && <p className="p-4">No se pudo cargar la productividad</p>}

        {data && (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Período: {data.anio}-{String(data.mes).padStart(2, "0")} | Estado:{" "}
              {data.estado} | Importe total:{" "}
              {data.importeTotal.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </p>

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
                      {e.importe !== null
                        ? e.importe.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })
                        : "-"}
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
          </>
        )}
      </CardContent>
    </Card>
  )
}
