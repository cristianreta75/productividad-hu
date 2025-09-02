import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card><CardContent className="p-6">Bienvenido al Sistema de Productividad - HU.</CardContent></Card>
    </div>
  )
}