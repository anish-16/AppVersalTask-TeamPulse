import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Task {
  id: string
  title: string
  description?: string
  assignedTo: string
  dueDate: string
  progress: number 
  completed: boolean
  createdAt: string
}

interface TasksState {
  tasks: Task[]
}

const initialState: TasksState = {
  tasks: [],
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    updateTaskProgress: (state, action: PayloadAction<{ taskId: string; progress: number }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId)
      if (task) {
        task.progress = Math.min(100, Math.max(0, action.payload.progress))
        if (task.progress === 100) {
          task.completed = true
        }
      }
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (task) {
        task.completed = true
        task.progress = 100
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload)
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
  },
})

export const { addTask, updateTaskProgress, completeTask, deleteTask, setTasks } = tasksSlice.actions
export default tasksSlice.reducer
