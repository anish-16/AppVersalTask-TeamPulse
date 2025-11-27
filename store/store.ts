import { configureStore } from "@reduxjs/toolkit"
import teamReducer from "./slices/teamSlice"
import tasksReducer from "./slices/tasksSlice"
import uiReducer from "./slices/uiSlice"
import inactivityReducer from "./slices/inactivitySlice"

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action)
  const state = store.getState()
  
  try {
    localStorage.setItem(
      "team-pulse-state",
      JSON.stringify({
        team: state.team,
        tasks: state.tasks,
        ui: state.ui,
      })
    )
  } catch (e) {
    console.error("Failed to save state to localStorage:", e)
  }
  
  return result
}

const loadInitialState = () => {
  try {
    const saved = localStorage.getItem("team-pulse-state")
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        team: parsed.team,
        tasks: parsed.tasks,
        ui: parsed.ui,
        inactivity: undefined,
      }
    }
  } catch (e) {
    console.error("Failed to load state from localStorage:", e)
  }
  return {}
}

export const store = configureStore({
  reducer: {
    team: teamReducer,
    tasks: tasksReducer,
    ui: uiReducer,
    inactivity: inactivityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: loadInitialState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
