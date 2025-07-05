"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FileText, FlaskConical, LayoutDashboard, Settings, Trophy, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, id: "dashboard", href: "/dashboard" },
  { title: "Templates", icon: FileText, id: "templates", href: "/palmlets", badge: "24" },
  { title: "Community", icon: Users, id: "community", href: "/community" },
  { title: "Lab", icon: FlaskConical, id: "lab", href: "/lab", badge: "3" },
  { title: "Leaderboard", icon: Trophy, id: "leaderboard", href: "/leaderboard" },
  { title: "Settings", icon: Settings, id: "settings", href: "/settings" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const activePath = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="grid gap-2 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                activePath === item.href || activePath.startsWith(item.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4",
                activePath === item.href || activePath.startsWith(item.href)
                  ? "text-yellow-500"
                  : ""
              )} />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
} 