"use client"

import type { TeamMember } from "@/store/slices/teamSlice"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

interface MemberCardProps {
  member: TeamMember
  isLead?: boolean
}

export function MemberCard({ member, isLead = false }: MemberCardProps) {
  const statusConfig = {
    Working: {
      bg: "bg-green-50 dark:bg-green-950/20",
      border: "border-green-200 dark:border-green-900/30",
      badge: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
      dot: "bg-green-600",
    },
    Break: {
      bg: "bg-yellow-50 dark:bg-yellow-950/20",
      border: "border-yellow-200 dark:border-yellow-900/30",
      badge: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
      dot: "bg-yellow-600",
    },
    Meeting: {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-200 dark:border-blue-900/30",
      badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      dot: "bg-blue-600",
    },
    Offline: {
      bg: "bg-gray-50 dark:bg-gray-950/20",
      border: "border-gray-200 dark:border-gray-900/30",
      badge: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300",
      dot: "bg-gray-600",
    },
  }

  const config = statusConfig[member.status]

  return (
    <Card className={`${config.bg} ${config.border} border-2 hover:shadow-lg transition-shadow`}>
      <CardContent className="p-5 space-y-4">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative">
              <img
                src={member.avatar || "/placeholder.svg"}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-card"
              />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 ${config.dot} rounded-full border-2 border-white dark:border-card`}
              ></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{member.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{member.email}</p>
            </div>
          </div>
        </div>

       
        <div>
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.badge}`}
          >
            <div className={`w-2 h-2 rounded-full ${config.dot}`}></div>
            {member.status}
          </span>
        </div>

       
        <div className="flex items-center justify-between pt-2 border-t border-current/10">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Users size={14} />
            Active Tasks
          </span>
          <span className="font-bold text-lg text-primary">{member.activeTasks}</span>
        </div>
      </CardContent>
    </Card>
  )
}
