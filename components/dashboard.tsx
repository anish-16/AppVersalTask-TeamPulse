"use client"

import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { setTeamMembers, updateMemberStatus } from "@/store/slices/teamSlice"
import { updateActivityTime } from "@/store/slices/inactivitySlice"
import { TeamLeadView } from "./team-lead-view"
import { TeamMemberView } from "./team-member-view"
import { fetchTeamData } from "@/utils/api"
import { Sidebar } from "./sidebar"
import { TopHeader } from "./top-header"

export function Dashboard() {
  const dispatch = useDispatch()
  const { currentRole, members, darkMode, currentUserId } = useSelector((state: RootState) => state.team)
  const inactivityRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const data = await fetchTeamData()
        dispatch(setTeamMembers(data))
      } catch (error) {
        console.error("Failed to load team data:", error)
        dispatch(setTeamMembers(getMockTeamData()))
      }
    }

    loadTeamData()
  }, [dispatch])

  useEffect(() => {
    const handleUserActivity = () => {
      dispatch(updateActivityTime())
      if (inactivityRef.current) {
        clearTimeout(inactivityRef.current)
      }

      inactivityRef.current = setTimeout(
        () => {
          dispatch(updateMemberStatus({ memberId: currentUserId, status: "Offline" }))
        },
        10 * 60 * 1000,
      )
    }

    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"]
    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity)
    })

    handleUserActivity()

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity)
      })
      if (inactivityRef.current) {
        clearTimeout(inactivityRef.current)
      }
    }
  }, [dispatch, currentUserId])

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar />
        <TopHeader />

        <main className="ml-56 mt-20 p-8 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {currentRole === "lead" && members.length > 0 ? (
              <TeamLeadView members={members} />
            ) : members.length > 0 ? (
              <TeamMemberView currentUserId={currentUserId} />
            ) : (
              <div className="text-center py-12">Loading team data...</div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function getMockTeamData() {
  return [
    {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      status: "Working" as const,
      activeTasks: 3,
      role: "lead" as const,
    },
    {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      status: "Working" as const,
      activeTasks: 2,
      role: "member" as const,
    },
    {
      id: "user-3",
      name: "Bob Johnson",
      email: "bob@example.com",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      status: "Break" as const,
      activeTasks: 1,
      role: "member" as const,
    },
    {
      id: "user-4",
      name: "Alice Williams",
      email: "alice@example.com",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      status: "Meeting" as const,
      activeTasks: 4,
      role: "member" as const,
    },
  ]
}
