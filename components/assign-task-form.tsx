"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "@/store/slices/tasksSlice"
import { incrementActiveTasks } from "@/store/slices/teamSlice"
import type { TeamMember } from "@/store/slices/teamSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AssignTaskFormProps {
  members: TeamMember[]
  onClose: () => void
}

export function AssignTaskForm({ members, onClose }: AssignTaskFormProps) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: members[0]?.id || "",
    dueDate: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.assignedTo) {
      alert("Please fill in all required fields")
      return
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      assignedTo: formData.assignedTo,
      dueDate: formData.dueDate,
      progress: 0,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    dispatch(addTask(newTask))
    dispatch(incrementActiveTasks(formData.assignedTo))

    // Reset form
    setFormData({
      title: "",
      description: "",
      assignedTo: members[0]?.id || "",
      dueDate: new Date().toISOString().split("T")[0],
    })

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Task Title *</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter task description (optional)"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Assign To *</label>
          <select
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md text-sm"
            required
          >
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date *</label>
          <Input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Assign Task
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
