"use client";

import { useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import type { TeamMember } from "@/store/slices/teamSlice"
import { setFilterStatus, setSortBy } from "@/store/slices/uiSlice"
import { MemberCard } from "./member-card"
import { AssignTaskForm } from "./assign-task-form"
import { StatusChart } from "./status-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Users, Clock, CheckCircle2 } from "lucide-react"

export function TeamLeadView({ members }: { members: TeamMember[] }) {
  const dispatch = useDispatch()
  const { filterStatus, sortBy } = useSelector((state: RootState) => state.ui)
  const [showAssignForm, setShowAssignForm] = useState(false)

  const filteredAndSortedMembers = useMemo(() => {
    let filtered = members

    if (filterStatus !== "All") {
      filtered = filtered.filter((m) => m.status === filterStatus)
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "activeTasks") return b.activeTasks - a.activeTasks
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "status") return a.status.localeCompare(b.status)
      return 0
    })

    return sorted
  }, [members, filterStatus, sortBy])

  const statusCounts = useMemo(() => {
    return {
      Working: members.filter((m) => m.status === "Working").length,
      Break: members.filter((m) => m.status === "Break").length,
      Meeting: members.filter((m) => m.status === "Meeting").length,
      Offline: members.filter((m) => m.status === "Offline").length,
    }
  }, [members])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Team Pulse Dashboard</h1>
        <Button onClick={() => setShowAssignForm(true)} className="gap-2 px-6 py-5 text-base">
          <Plus size={20} />
          Assign Task
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-950/10 border-blue-200 dark:border-blue-900/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Members</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-2">{members.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10 border-green-200 dark:border-green-900/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Working</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-2">{statusCounts.Working}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-50/50 dark:from-yellow-950/20 dark:to-yellow-950/10 border-yellow-200 dark:border-yellow-900/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">On Break</p>
                <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-300 mt-2">{statusCounts.Break}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-50/50 dark:from-indigo-950/20 dark:to-indigo-950/10 border-indigo-200 dark:border-indigo-900/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">In Meeting</p>
                <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mt-2">{statusCounts.Meeting}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

     
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Team Status Distribution</CardTitle>
          <CardDescription>Real-time overview of team member statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <StatusChart statusCounts={statusCounts} />
        </CardContent>
      </Card>

      
      {showAssignForm && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle>Assign New Task</CardTitle>
              <CardDescription>Create and assign a task to a team member</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAssignForm(false)}>
              Cancel
            </Button>
          </CardHeader>
          <CardContent>
            <AssignTaskForm onClose={() => setShowAssignForm(false)} members={members} />
          </CardContent>
        </Card>
      )}

    
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div>
          <p className="text-sm font-semibold mb-3">Filter by Status</p>
          <div className="flex flex-wrap gap-2">
            {(["All", "Working", "Break", "Meeting", "Offline"] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setFilterStatus(status))}
                className="text-xs md:text-sm"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-sm font-semibold mb-3">Sort by</p>
          <div className="flex flex-wrap gap-2">
            {(["activeTasks", "name", "status"] as const).map((option) => (
              <Button
                key={option}
                variant={sortBy === option ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setSortBy(option))}
                className="text-xs md:text-sm"
              >
                {option === "activeTasks" ? "Task Count" : option.charAt(0).toUpperCase() + option.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

     
      <div>
        <h2 className="text-xl font-bold mb-4">Team Members ({filteredAndSortedMembers.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSortedMembers.map((member) => (
            <MemberCard key={member.id} member={member} isLead={true} />
          ))}
        </div>
      </div>
    </div>
  )
}
