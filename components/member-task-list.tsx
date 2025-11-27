"use client"

import { useDispatch } from "react-redux"
import { type Task, updateTaskProgress, completeTask } from "@/store/slices/tasksSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

interface MemberTaskListProps {
  tasks: Task[]
}

export function MemberTaskList({ tasks }: MemberTaskListProps) {
  const dispatch = useDispatch()

  const handleProgressChange = (taskId: string, increment: number) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      const newProgress = Math.max(0, Math.min(100, task.progress + increment))
      dispatch(updateTaskProgress({ taskId, progress: newProgress }))
    }
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {task.completed ? (
                  <CheckCircle2 className="text-green-600" size={20} />
                ) : (
                  <Circle className="text-muted-foreground" size={20} />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm md:text-base">{task.title}</h4>
                {task.description && (
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{task.description}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span className="font-semibold">{task.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleProgressChange(task.id, -10)}
                disabled={task.progress === 0 || task.completed}
                className="text-xs"
              >
                -10%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleProgressChange(task.id, 10)}
                disabled={task.progress === 100 || task.completed}
                className="text-xs"
              >
                +10%
              </Button>
              <Button
                variant={task.completed ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(completeTask(task.id))}
                disabled={task.completed}
                className="text-xs"
              >
                {task.completed ? "Done" : "Complete"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
