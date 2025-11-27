import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Status = "Working" | "Break" | "Meeting" | "Offline"

export interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  status: Status
  activeTasks: number
  role: "lead" | "member"
}

interface TeamState {
  members: TeamMember[]
  currentRole: "lead" | "member"
  currentUserId: string
  darkMode: boolean
}

const initialState: TeamState = {
  members: [],
  currentRole: "lead",
  currentUserId: "user-1",
  darkMode: false,
}

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeamMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload
    },
    updateMemberStatus: (state, action: PayloadAction<{ memberId: string; status: Status }>) => {
      const member = state.members.find((m) => m.id === action.payload.memberId)
      if (member) {
        member.status = action.payload.status
      }
    },
    switchRole: (state, action: PayloadAction<"lead" | "member">) => {
      state.currentRole = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    setCurrentUserId: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload
    },
    incrementActiveTasks: (state, action: PayloadAction<string>) => {
      const member = state.members.find((m) => m.id === action.payload)
      if (member) {
        member.activeTasks += 1
      }
    },
    decrementActiveTasks: (state, action: PayloadAction<string>) => {
      const member = state.members.find((m) => m.id === action.payload)
      if (member && member.activeTasks > 0) {
        member.activeTasks -= 1
      }
    },
  },
})

export const {
  setTeamMembers,
  updateMemberStatus,
  switchRole,
  toggleDarkMode,
  setCurrentUserId,
  incrementActiveTasks,
  decrementActiveTasks,
} = teamSlice.actions

export default teamSlice.reducer
