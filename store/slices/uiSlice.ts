import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type FilterStatus = "All" | "Working" | "Break" | "Meeting" | "Offline"

interface UIState {
  filterStatus: FilterStatus
  sortBy: "activeTasks" | "name" | "status"
  searchTerm: string
}

const initialState: UIState = {
  filterStatus: "All",
  sortBy: "activeTasks",
  searchTerm: "",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.filterStatus = action.payload
    },
    setSortBy: (state, action: PayloadAction<"activeTasks" | "name" | "status">) => {
      state.sortBy = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
})

export const { setFilterStatus, setSortBy, setSearchTerm } = uiSlice.actions

export default uiSlice.reducer
