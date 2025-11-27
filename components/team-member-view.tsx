"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { StatusButtons } from "./status-buttons"
import { MemberTaskList } from "./member-task-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TeamMemberView({ currentUserId }: { currentUserId: string }) {
  const { members } = useSelector((state: RootState) => state.team)
  const currentUser = members.find((m) => m.id === currentUserId)
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  const assignedTasks = tasks.filter((t) => t.assignedTo === currentUserId && !t.completed)

  if (!currentUser) {
    return <div className="text-center py-12">User not found</div>
  }

  const statusColors = {
    Working:
      "from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10 border-green-200 dark:border-green-900/30",
    Break:
      "from-yellow-50 to-yellow-50/50 dark:from-yellow-950/20 dark:to-yellow-950/10 border-yellow-200 dark:border-yellow-900/30",
    Meeting:
      "from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-950/10 border-blue-200 dark:border-blue-900/30",
    Offline:
      "from-gray-50 to-gray-50/50 dark:from-gray-950/20 dark:to-gray-950/10 border-gray-200 dark:border-gray-900/30",
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      <Card className={`bg-gradient-to-br ${statusColors[currentUser.status]} border-2`}>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full object-cover border-3 border-white dark:border-card"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{currentUser.email}</p>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold">Current Status</p>
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium ${
                currentUser.status === "Working"
                  ? "bg-green-600"
                  : currentUser.status === "Break"
                    ? "bg-yellow-600"
                    : currentUser.status === "Meeting"
                      ? "bg-blue-600"
                      : "bg-gray-600"
              }`}
            >
              {currentUser.status}
            </div>
          </div>

          <StatusButtons currentUserId={currentUserId} />
        </CardContent>
      </Card>

      
      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
          <CardDescription>
            {assignedTasks.length} active task{assignedTasks.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {assignedTasks.length > 0 ? (
            <MemberTaskList tasks={assignedTasks} />
          ) : (
            <div className="text-center text-muted-foreground py-12 rounded-lg bg-secondary/30">
              <p className="font-medium">No active tasks assigned</p>
              <p className="text-sm mt-1">Check back soon for new assignments</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
