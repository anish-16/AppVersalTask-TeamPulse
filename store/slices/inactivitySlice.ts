import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface InactivityState {
  lastActivityTime: number
  inactivityTimeout: number 
}

const initialState: InactivityState = {
  lastActivityTime: Date.now(),
  inactivityTimeout: 10 * 60 * 1000, 
}

const inactivitySlice = createSlice({
  name: "inactivity",
  initialState,
  reducers: {
    updateActivityTime: (state) => {
      state.lastActivityTime = Date.now()
    },
    setInactivityTimeout: (state, action: PayloadAction<number>) => {
      state.inactivityTimeout = action.payload
    },
  },
})

export const { updateActivityTime, setInactivityTimeout } = inactivitySlice.actions

export default inactivitySlice.reducer
