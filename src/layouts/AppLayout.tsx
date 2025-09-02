import { Outlet, NavLink } from "react-router-dom"
import { Menu, LayoutDashboard, Users, CalendarDays, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/productividad", label: "Productividad", icon: Users },
]

function NavLinkItem({ to, label, Icon }: { to: string; label: string; Icon: any }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition
         ${isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`
      }
      end={to === "/"}
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  )
}

function SidebarContent() {
  return (
    <div className="h-full">
      <div className="py-3 text-xl font-bold">Productividad HU</div>
      <Separator className="mb-3" />
      <nav className="grid gap-1">
        {navItems.map((i) => (
          <NavLinkItem key={i.to} to={i.to} label={i.label} Icon={i.icon} />
        ))}
      </nav>
    </div>
  )
}

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* topbar */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-2 px-4">
          {/* menú móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <div className="ml-1 text-lg font-semibold">Panel</div>

          <div className="ml-auto flex items-center gap-2">
            {/* espacio para acciones (perfil, notifs, etc.) */}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-[220px_1fr]">
        {/* sidebar desktop */}
        <aside className="hidden border-r md:block w-56">
          <SidebarContent />
        </aside>

        {/* contenido */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
