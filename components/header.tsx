"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { switchRole, toggleDarkMode } from "@/store/slices/teamSlice"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Users, Menu } from "lucide-react"
import { useState } from "react"

export function Header() {
  const dispatch = useDispatch()
  const { currentRole, darkMode } = useSelector((state: RootState) => state.team)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-lg p-2.5">
            <Users className="text-primary-foreground" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Team Pulse</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Team Management Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
        
          <div className="hidden md:flex gap-1 bg-secondary/50 rounded-lg p-1 border border-border">
            <Button
              variant={currentRole === "lead" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(switchRole("lead"))}
              className="text-xs md:text-sm font-medium"
            >
              Team Lead
            </Button>
            <Button
              variant={currentRole === "member" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(switchRole("member"))}
              className="text-xs md:text-sm font-medium"
            >
              Team Member
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(toggleDarkMode())}
            className="px-2.5 md:px-3 hover:bg-secondary"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden px-2.5"
          >
            <Menu size={18} />
          </Button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-2">
          <div className="flex gap-2">
            <Button
              variant={currentRole === "lead" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                dispatch(switchRole("lead"))
                setShowMobileMenu(false)
              }}
              className="flex-1 text-xs"
            >
              Team Lead
            </Button>
            <Button
              variant={currentRole === "member" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                dispatch(switchRole("member"))
                setShowMobileMenu(false)
              }}
              className="flex-1 text-xs"
            >
              Team Member
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
