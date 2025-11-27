"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  FolderOpen,
  Ticket,
  Users,
  Building,
  CreditCard,
  Settings,
  MoreHorizontal,
  ChevronDown,
  Moon,
  Sun,
  LogOut,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { toggleDarkMode } from "@/store/slices/teamSlice"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const dispatch = useDispatch()
  const { darkMode } = useSelector((state: RootState) => state.team)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", badge: null },
    { icon: FolderOpen, label: "Projects", badge: null },
    { icon: Ticket, label: "Tickets", badge: null },
    { icon: Users, label: "Our Clients", badge: null },
    { icon: Users, label: "Employees", badge: null },
    { icon: Building, label: "Accounts", badge: null },
    { icon: CreditCard, label: "Payroll", badge: null },
    { icon: Settings, label: "App", badge: null },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-sidebar border-r border-sidebar-border overflow-y-auto shadow-lg">
      
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">My-Task</h1>
          </div>
        </div>
      </div>

      
      <nav className="px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label}>
              <button
                onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm font-medium group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-sidebar-foreground group-hover:text-sidebar-accent-foreground" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            </div>
          )
        })}
      </nav>

      
      <div className="px-4 py-6 border-t border-sidebar-border space-y-4">
        <div>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm font-medium">
            <div className="flex items-center gap-3">
              <MoreHorizontal className="w-5 h-5" />
              <span>Other Pages</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm font-medium">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" />
              <span>UI Components</span>
            </div>
          </button>
        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-sidebar-border bg-sidebar space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => dispatch(toggleDarkMode())}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
