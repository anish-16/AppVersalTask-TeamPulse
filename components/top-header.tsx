"use client"

import { Bell, Settings, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function TopHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="fixed top-0 left-56 right-0 h-20 bg-card border-b border-border flex items-center justify-between px-8 z-40 shadow-sm">
      
      <div className="flex-1 max-w-md">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border placeholder:text-muted-foreground"
          />
        </div>
      </div>

      
      <div className="flex items-center gap-6 ml-8">
        
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="Team member"
              className="w-8 h-8 rounded-full border-2 border-card"
            />
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Team member"
              className="w-8 h-8 rounded-full border-2 border-card"
            />
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="Team member"
              className="w-8 h-8 rounded-full border-2 border-card"
            />
            <img
              src="https://randomuser.me/api/portraits/men/2.jpg"
              alt="Team member"
              className="w-8 h-8 rounded-full border-2 border-card"
            />
            <div className="w-8 h-8 rounded-full border-2 border-card bg-secondary flex items-center justify-center text-xs font-semibold">
              +5
            </div>
          </div>
        </div>

        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

       
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </Button>

       
        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <img
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt="Dylan Hunter"
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Dylan Hunter</p>
            <p className="text-xs text-muted-foreground">Admin Profile</p>
          </div>
        </div>
      </div>
    </header>
  )
}
