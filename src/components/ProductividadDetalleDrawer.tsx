import { useEffect, useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

type Detalle = {
  detalleId: number
  metodo: string
  formaCalculo: string
  cantidadPracticas: number
  importe: number
}

export default function ProductividadDetalleDrawer({
  empleadoId,
  empleadoNombre,
  anio,
  mes,
}: {
  empleadoId: number
  empleadoNombre: string
  anio: number
  mes: number
}) {
  const [detalles, setDetalles] = useState<Detalle[]>([])
  const [loading, setLoading] = useState(false)

  const fetchDetalles = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `http://172.22.116.159:8081/api/productividad/ver?anio=${anio}&mes=${mes}&empleadoId=${empleadoId}`
      )
      const data = await res.json()
      const emp = data.empleados?.[0]
      setDetalles(emp?.detalles || [])
    } catch (e) {
      console.error("Error cargando detalles:", e)
      setDetalles([])
    } finally {
      setLoading(false)
    }
  }
  {/* Re-calcular Productividad */}
  const recalcularDetalle = async (detalleId: number) => {
      try {
        await fetch(
          `http://172.22.116.159:8081/api/productividad/recalcular-detalle/${detalleId}`,
          { method: "POST" }
        )
        await fetchDetalles() // refrescar después de recalcular
      } catch (e) {
        console.error("Error recalculando detalle:", e)
      }
    }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" onClick={fetchDetalles} title="Ver productividad">
          <BarChart3 className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Productividad de {empleadoNombre}</DrawerTitle>
          <DrawerDescription>
            Mes {mes}/{anio}
          </DrawerDescription>
        </DrawerHeader>

        {loading ? (
          <p className="p-4">Cargando...</p>
        ) : detalles.length === 0 ? (
          <p className="p-4">Sin detalles disponibles</p>
        ) : (
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Método</TableHead>
                  <TableHead>Forma</TableHead>
                  <TableHead>Cant.</TableHead>
                  <TableHead>Importe</TableHead>
                  {/* Encabezado de Acciones */}
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detalles.map((d) => (
                  <TableRow key={d.detalleId}>
                    <TableCell>{d.metodo}</TableCell>
                    <TableCell>{d.formaCalculo}</TableCell>
                    <TableCell>{d.cantidadPracticas}</TableCell>
                    <TableCell>${d.importe.toFixed(2)}</TableCell>
                    {/* Acciones por fila */}
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => recalcularDetalle(d.detalleId)}
                      >
                        Recalcular
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
