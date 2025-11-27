"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { updateMemberStatus } from "@/store/slices/teamSlice"
import type { Status } from "@/store/slices/teamSlice"
import { Button } from "@/components/ui/button"

interface StatusButtonsProps {
  currentUserId: string
}

export function StatusButtons({ currentUserId }: StatusButtonsProps) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.team.members.find((m) => m.id === currentUserId))

  const statuses: Status[] = ["Working", "Break", "Meeting", "Offline"]

  const handleStatusChange = (status: Status) => {
    dispatch(updateMemberStatus({ memberId: currentUserId, status }))
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={currentUser?.status === status ? "default" : "outline"}
          onClick={() => handleStatusChange(status)}
          className="text-xs md:text-sm"
        >
          {status}
        </Button>
      ))}
    </div>
  )
}
